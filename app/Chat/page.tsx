import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
import ChatHeader from "../ChatHeader/page";
import ChatInput from "../ChatInput/page";

 
const CHAT = () => {
    return ( 
        <Accordion type="single" collapsible className=" text-zinc-900 bg-white relative p-0 m-0 border-none z-40 shadow ">
        <AccordionItem value="item-1">
            <div className="fixed w-80 bottom-8 right-8 bg-white rounded-md border-gray-200 overflow-hidden " >
                <div className="w-full h-full flex flex-col" >
                <AccordionTrigger className="px-6 border-b bg-white border-zinc-300 hover:no-underline" >
                    <ChatHeader />
                </AccordionTrigger>
                <AccordionContent>
                    <div className="flex flex-col h-80" >
                        messages
                        <ChatInput  />
                    </div>
                </AccordionContent>
                </div>
            </div>
         </AccordionItem>
      </Accordion>
     )
}
 
export default CHAT;