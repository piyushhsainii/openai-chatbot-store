// import { chatbotPrompt } from "@/app/helpers/constants/chatbotPrompt"
// import { MessageUserSchema } from "@/lib/Schema"
// import { ChatGPTMessage , OpenAISteam } from "@/lib/openai-stream"

// export async function POST(req:Request){
//     const { messages } = await req.json()

//     const parsedMessages = MessageUserSchema.parse(messages)
//     if(!parsedMessages){
//         console.log(parsedMessages)
//     }
//     // storing the user inputs in an array after parsing it through validation
//     const outBoundMessages:ChatGPTMessage[] = parsedMessages.map((message)=>{
//         return {
//             role:message.isUserInput ? 'user' :'system',
//             content:message.text 
//         }
//     })
// // adding an initial prompt so that API knows the context of our conversation
//     outBoundMessages.unshift({
//         role:'system',
//         content:chatbotPrompt 
//     })

//     const payload = {
//         model:'gpt-3.5-turbo',                 //model which version og chatgpt you want to use
//         response_format: { type: "json_object" },
//         messages:outBoundMessages,          //list of messages
//         temperature:0.4,                   //define s the levels of creativeness in the response
//         top_p:1,
//         frequency_penalty:0,                //how frequent the same word can appear,
//         presence_penalty:0,
//         max_tokens:150,                         //no of max words in a single response
//         stream:true,
//         n:1
//     }

//     const stream = await OpenAISteam(payload)   
//     console.log(stream, "Stream console log") 
//     return Response.json({stream:stream})
// }


//TRYING OUT GEMINI MODEL

// import { GoogleGenerativeAI } from '@google/generative-ai'
// // Access your API key as an environment variable (see "Set up your API key" above)
// const APIKEY = process.env.API_KEY
// if(!APIKEY) throw new Error("Could not fetch api key")
// const genAI = new GoogleGenerativeAI(APIKEY);

// // ...
// const model = genAI.getGenerativeModel({ model: "gemini-pro"});

// async function run() {
//     // For text-only input, use the gemini-pro model
//     const model = genAI.getGenerativeModel({ model: "gemini-pro"});
  
//     const prompt = "Write a story about a magic backpack."
  
//     const result = await model.generateContent(prompt);
//     const response = await result.response;
//     const text = response.text();
//     console.log(text);
//   }
  
//   run();