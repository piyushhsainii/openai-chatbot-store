import { ParsedEvent , ReconnectInterval, createParser } from "eventsource-parser"

export type ChatGptAgent = "user" | "system"

export interface ChatGPTMessage {
    role:ChatGptAgent,
    content:string
}

export interface OpenAIPayload  {
    model:string,                 //model which version og chatgpt you want to use
    messages:ChatGPTMessage[],          //list of messages
    temperature:number,     //define s the levels of creativeness in the response
    top_p: number,                   
    frequency_penalty:number,                //how frequent the same word can appear,
    presence_penalty:number,
    max_tokens:number,                         //no of max words in a single response
    stream:Boolean,
    n:number
}

export async function OpenAISteam(payload:OpenAIPayload){
    const  encoder = new TextEncoder()
    const decoder = new TextDecoder()
    // sending the payload to ai
    const response = await fetch('https://api.openai.com/v1/chat/completions',{
        method:'POST',
        headers:{
            'Content-Type':"Application/json",
            Authorization: `Bearer ${process.env.API_OPEN_KEY} `
        },
        body: JSON.stringify(payload)
    })
    let counter = 0
    const stream = new ReadableStream({
        async start(controller){
            function onParse(event: ParsedEvent | ReconnectInterval){
                if(event.type === 'event'){
                    const data = event.data
                    if(data === '[DONE]'){
                        controller.close()
                        return
                    }
                    try {
                        const parsedData = JSON.parse(data)
                        console.log(parsedData, " this is parsed Data")
                        const TEXT = parsedData.choices[0].message.content || ""
                        console.log(TEXT, "Text hu bhai")
                        if(counter < 2 && (TEXT.match(/\n/)||[]).length){
                            return 
                        }
                        const queue = encoder.encode(TEXT)
                        controller.enqueue(queue)
                        counter++ 

                    } catch (error) {
                        console.log(error,"errorh")
                        controller.error(error)
                    }      
                } 
            }
           const parser = createParser(onParse)
           for await (const chunk of response.body as any) {
            parser.feed(decoder.decode(chunk))
           }
        }
    })
    console.log(stream,"stream h")
    return stream
}