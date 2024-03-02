import { reversString } from "./utils";

const even = 'mess'
const odd = 'hello'
const single = 'z'

const evenResult = [
    ["s", "e", "s", "m"],
    ["s", "s", "e", "m"],
    ["s", "s", "s", "m"]
]

const oddResult = [
    ["o", "e", "l", "l", "h"],
    ["o", "l", "l", "e", "h"],
    ["o", "l", "l", "e", "h"],
    ["o", "l", "l", "l", "h"]
]

describe('Разворот строки', () => {
    it('С четным количеством символов', () => {
        expect(reversString(even)).toEqual(evenResult)
    })
    it('С нечетным количеством символов', () => {
        expect(reversString(odd)).toEqual(oddResult)
    })
    it('С одним символом', () => {
        expect(reversString(single)).toEqual([])
    })
    it('С пустой строкой', () => {
        expect(reversString('')).toEqual([])
    })
})