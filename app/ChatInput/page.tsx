"use client"
import { cn } from "@/lib/utils";
import { useMutation, useMutationState } from "@tanstack/react-query";
import { nanoid } from "nanoid";
import { FC, HTMLAttributes, useState } from "react";
import  TextareaAutosizeProps  from "react-textarea-autosize";

interface ChatInput extends HTMLAttributes<HTMLDivElement> {}
interface Message {
    id:string,
    isUserInput:Boolean,
    text:string
}

const ChatInput:FC<ChatInput> = ({className, ...props}) => {
    const [Message, setMessage] = useState<string>('')
   const { isSuccess ,isPending , mutate:SendMessage   } =  useMutation({
        mutationFn: async(message:Message)=>{
            const response = await fetch('http://localhost:3000/api/message',{
                method:'POST',
                headers:{
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({messages:[message]})
            })
            return response.body
        },
        onSuccess: async(stream)=>{
            console.log(stream,"initial")
            if(!stream) throw new Error("No stream found")
            const reader =  stream.getReader()
            const decoder = new TextDecoder()
            let done = false
            while(!done){
                const { value, done:doneReading } = await reader.read()
                done = doneReading 
                const chunkValue = decoder.decode(value)
                console.log(chunkValue)
            }
            console.log('Success')
        }
    })

    return ( 
        <div {...props} className={ cn('border-t border-zinc-300',className) } >
        <div className=" flex-1 overflow-hidden border-none outline-none" >
            <TextareaAutosizeProps 
                autoFocus
                rows={2}
                onKeyDown={(E)=> {
                    if(E.key === 'Enter' && !E.shiftKey){
                        E.preventDefault()
                        const message = {
                            id:nanoid(),
                            isUserInput:true,
                            text:Message
                        }
                        SendMessage(message)
                    }
                } }
                maxRows={4}
                value={Message}
                onChange={(e)=>setMessage(e.target.value)}
                className="resize-none peer pr-8  w-full p-2 disabled:opacity-50 block rounded-sm outline-none bg-zinc-200 text-gray-900
                focus:ring-0 sm:leading-6"
                placeholder="write a message..."
            />
        </div>
        </div>
     )
}
 
export default ChatInput;