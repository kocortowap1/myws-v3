import { getDictionary } from "../lib/pddikti"

export function useDictionary() {
    // async function getDictionary(fungsi) {
    //     const search = await getData({ act: 'GetDictionary', fungsi: fungsi })
    // }
    async function parseRequest(fungsi) {
        let requestData = []
        const search = await getDictionary(fungsi)
        if (search.status) {
            let requestData = []
            for (const key in search['data']['request']) {
                if (key !== "error_code" && key !== "error_desc" && key !== "token") {
                    const pecah = key.split("[")
                    // if(pecah[0]=== "data" || pecah[0] === "Data"){
                    requestData.push({ fieldname: pecah[1].substring(0, pecah[1].length - 1), ...search['data']['request'][key] })
                    // }else{

                    // }
                }
            }
            return requestData
        } else {
            return { status: false, message: search.message }
        }

    }
    return { getDictionary, parseRequest }
}