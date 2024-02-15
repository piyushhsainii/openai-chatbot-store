    
 
const ChatHeader = () => {
    return ( 
        <div className="w-full flex gap-3 justify-start items-center  ">
            <div className="flex flex-col ">
                <div className="flex justify-start pl-3 text-sm" >Chat With</div>
                <div className="flex justify-start items-center gap-2">
                    <p className="h-2 w-2 bg-green-500 rounded-lg" ></p>
                    <div>BookBot Support</div>
                </div>
            </div>
        </div>
     );
}
 
export default ChatHeader;