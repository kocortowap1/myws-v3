import { read, utils, writeFile } from "xlsx";

export function useExcel() {
    async function readExcel(file) {
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
     function writeExcel({ filename, sheetname = "Sheet 1", data = [] }) {
        let wb =  utils.book_new()
        wb.Props = {
            Title: 'Template PDDIKTI',
            Subject: 'Import Data PDDIKTI',
            Author: "Anshari As'adi",
            CreatedDate: new Date()
        }

        const ws =  utils.json_to_sheet(data)
         utils.book_append_sheet(wb, ws, sheetname)
         writeFile(wb, `${filename}.xlsx`, {})
        // writeFileXLSX(wb, `${filename}.xlsx`)
    }
    return {
        readExcel,
        writeExcel
    }
}