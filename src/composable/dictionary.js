import { getData } from "../lib/pddikti"

export function useDictionary() {
    async function getDictionary() {
        const search = await getData({act: 'GetDictionary', f})
    }
    return { getDictionary }
}