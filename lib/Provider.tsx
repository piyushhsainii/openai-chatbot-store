'use client';
import { Dispatch, SetStateAction, createContext, useContext, useState } from 'react';

interface History {
  role: 'user' | 'model';
  parts: string;
}

export const TextContext = createContext<{ state: History[]; setState: Dispatch<SetStateAction<History[]>> } | null>(null);


export function HistoryProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<History[]>([
    {
      role: 'model',
      parts: 'Hello, how can i help you?',
    },
  ]);

  return <TextContext.Provider value={{ state, setState }}>{children}</TextContext.Provider>;
}
