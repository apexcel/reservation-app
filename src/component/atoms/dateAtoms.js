import { atom } from 'recoil'

export const maxDateAtom = atom({
    key: 'maxDateAtom',
    default: new Date()
})

export const minDateAtom = atom({
    key: 'minDateAtom',
    default: new Date()
})