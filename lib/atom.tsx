import { atom } from "recoil"

export const text = atom({
    key:'text',
    default:[{
        role:'model',
        parts:"Hello, how can  i help you, today?"
    }]
})
