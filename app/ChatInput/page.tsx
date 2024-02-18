'use client';
import { cn } from '@/lib/utils';
import { useMutation, useMutationState } from '@tanstack/react-query';
import { nanoid } from 'nanoid';
import { FC, HTMLAttributes, useEffect, useState } from 'react';
import TextareaAutosizeProps from 'react-textarea-autosize';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { chatbotPrompt } from "@/app/helpers/constants/chatbotPrompt"
import { Item } from '@radix-ui/react-accordion';

interface ChatInput extends HTMLAttributes<HTMLDivElement> {}
interface Message {
  id: string;
  isUserInput: Boolean;
  text: string;
}

interface History {
  role: 'user' | 'model';
  parts: string;
}

const ChatInput: FC<ChatInput> = ({ className, ...props }) => {
  // Env
  const NEXT_PUBLIC_API_KEY = process.env.NEXT_PUBLIC_API_KEY;

  if (!NEXT_PUBLIC_API_KEY) throw new Error('Could not fetch api key');
  // instantiate
  const genAI = new GoogleGenerativeAI(NEXT_PUBLIC_API_KEY);

  const [message, setMessage] = useState<string>('');
  const [text, setText] = useState<History[]>([{
    role:'model',
    parts:'Hello, how can i help you?'
  }])

  const {
    isSuccess,
    isPending,
    mutate: SendMessage,
  } = useMutation({
    mutationFn: async (message: Message) => {
      // Access your API key as an environment variable (see "Set up your API key" above)
      const prompt = chatbotPrompt;
      const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
      
      const chat = model.startChat({
        history: [
          {
            role: 'user',
            parts:prompt
          },
          {
            role: 'model',
            parts:'OK'
          }
        ],
        generationConfig: {
          maxOutputTokens: 300,
        },
      });

      const msg = {
        role:'user',
        parts : message.text,
      };
      const result = await chat.sendMessageStream(msg.parts);
      setText(prev=>[...prev,msg as History]);
      let textMess = {
        role:'model',
        parts:''
      }
      for await (const chunk of result.stream) {
        const chunkText = {
          role:'model',
          parts:chunk.text()
        }
        textMess.parts += chunkText.parts;
      }
      setText(prev=>[...prev,textMess as History])
    },
  });
  useEffect(()=>{
  },[text])
  return (
    <div {...props} className={cn('border-t border-zinc-300', className)}>
      <div className=' flex-1 overflow-hidden border-none outline-none'>
        <div className=' h-[17rem]   border border-gray-200 overflow-y-auto ' >
        {
        text.map((text)=>(
          <div className={``}>
             <div className={` ${text.role==='model' ? 'flex justify-start px-2 mx-2 my-1 text-[13px]  ' : 'flex justify-end p-2  mx-2 my-1 text-[13px]  rounded-md '}`}>
              <div className={`break-words px-2 max-w-[270px]  py-1  rounded-md  ${text.role==='model' ? 'bg-green-600 ' : 'bg-blue-500 text-slate-100' } `} >
               {text.parts}
              </div>
             </div>
          </div>
        ))
        }
        </div>
        <TextareaAutosizeProps
          autoFocus
          rows={2}
          onKeyDown={(E) => {
            if (E.key === 'Enter' && !E.shiftKey) {
              E.preventDefault();
              const messageObj = {
                id: nanoid(),
                isUserInput: true,
                text: message,
              };
              SendMessage(messageObj);
            }
          }}
          maxRows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className='resize-none peer pr-8  w-full p-2 disabled:opacity-50 block rounded-sm outline-none bg-zinc-200 text-gray-900
                focus:ring-0 sm:leading-6'
          placeholder='write a message...'
        />
      </div>
    </div>
  );
};
export default ChatInput;
