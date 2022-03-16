import { read, utils } from "xlsx";

export  function useExcel(){
    async function readExcel(file){
        let excelData = []
        const data = await file.arrayBuffer();
        const wb = read(data)    
        const sheetName = wb.SheetNames[0]
        const json = utils.sheet_to_json(wb.Sheets[sheetName])
        
        for (const key in json) {
            excelData.push(json[key])
        }
        return excelData
    }
    return {
        readExcel
    }
}