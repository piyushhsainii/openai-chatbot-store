import { chatbotPrompt } from "@/app/helpers/constants/chatbotPrompt"
import { MessageUserSchema } from "@/lib/Schema"
import { ChatGPTMessage , OpenAISteam } from "@/lib/openai-stream"

export async function POST(req:Request){
    const { messages } = await req.json()

    const parsedMessages = MessageUserSchema.parse(messages)
    if(!parsedMessages){
        console.log(parsedMessages)
    }
    // storing the user inputs in an array after parsing it through validation
    const outBoundMessages:ChatGPTMessage[] = parsedMessages.map((message)=>{
        return {
            role:message.isUserInput ? 'user' :'system',
            content:message.text 
        }
    })
// adding an initial prompt so that API knows the context of our conversation
    outBoundMessages.unshift({
        role:'system',
        content:chatbotPrompt 
    })

    const payload = {
        model:'gpt-3.5-turbo',                 //model which version og chatgpt you want to use
        messages:outBoundMessages,          //list of messages
        temperature:0.4,                   //define s the levels of creativeness in the response
        top_p:1,
        frequency_penalty:0,                //how frequent the same word can appear,
        presence_penalty:0,
        max_tokens:150,                         //no of max words in a single response
        stream:true,
        n:1
    }

    const stream = await OpenAISteam(payload)   
    console.log(stream, "Stream console log") 
    return Response.json({stream:stream})
}