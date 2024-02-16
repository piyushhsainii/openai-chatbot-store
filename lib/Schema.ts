import zod from 'zod'

//Schema of the message
export const messageSchema = zod.object({
    id:zod.string(),
    isUserInput:zod.boolean(),
    text:zod.string()
})

//This is a schema which is an array of the message
export const MessageUserSchema = zod.array(messageSchema)