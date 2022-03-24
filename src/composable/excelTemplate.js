import { useDictionary } from './dictionary.js';
import { useExcel } from './excel'
export function useExcelTemplate() {
    const { parseRequest } = useDictionary();
    const { writeExcel } = useExcel()
    const downloadTemplate = async (fungsi) => {
        const d = await parseRequest(fungsi);
        if (d['status'] !== false) {
            let data = []
            d.forEach(el => {
                // console.log(el['fieldname'])
                data.push({ [el['fieldname']]: el['keterangan'] })
            })
            console.log(data)
             writeExcel({ filename: `${fungsi}.xlsx`, data: data })
        } else {
            alert(d.message)
        }
    }
    return { downloadTemplate }
}