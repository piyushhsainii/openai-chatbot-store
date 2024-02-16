'use client'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { FC, ReactNode } from "react";

interface Props {
    children:ReactNode
}
 
const Provider: FC<Props> = ({children}) => {
    const clientQuery = new QueryClient()
    return ( 
    <QueryClientProvider client={clientQuery} >{children}</QueryClientProvider>
     );
}
 
export default Provider;