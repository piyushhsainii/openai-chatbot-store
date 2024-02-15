"use client"
import { cn } from "@/lib/utils";
import { FC, HTMLAttributes } from "react";
import  TextareaAutosizeProps  from "react-textarea-autosize";
interface ChatInput extends HTMLAttributes<HTMLDivElement> {}

const ChatInput:FC<ChatInput> = ({className, ...props}) => {
    return ( 
        <div {...props} className={ cn('border-t border-zinc-300',className) } >
        <div className=" flex-1 overflow-hidden border-none outline-none" >
            <TextareaAutosizeProps 
                autoFocus
                rows={2}
                maxRows={4}
                className="resize-none peer pr-8  w-full p-2 disabled:opacity-50 block rounded-lg bg-zinc-200 text-gray-900
                focus:ring-0 sm:leading-6
                "
                placeholder="write a message..."
            />
        </div>
        </div>
     )
}
 
export default ChatInput;