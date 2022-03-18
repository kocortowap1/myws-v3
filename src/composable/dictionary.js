import { getDictionary } from "../lib/pddikti"

export function useDictionary() {

    async function parseRequest(fungsi) {
        let requestData = []
        const search = await getDictionary(fungsi)
        if (search.status) {
            for (const key in search['data']['request']) {
                if (key !== "error_code" && key !== "error_desc" && key !== "token") {
                    const pecah = key.split("[")
                    requestData.push({ fieldname: pecah[1].substring(0, pecah[1].length - 1), ...search['data']['request'][key] })

                }
            }
            return requestData
        } else {
            return { status: false, message: search.message }
        }

    }
    return { parseRequest }
}