import XLSX from 'xlsx'
const excel = {
    read: (file) => {
        const reader = new FileReader()
        let excelData = []
        reader.onload = () => {
            const data = new Uint8Array(reader.result)
            const wb = XLSX.read(data, { type: 'array' })
            const sheet = wb.SheetNames[0]
            const rows = XLSX.utils.sheet_to_json(wb.Sheets[sheet])

            for (const key in rows) {
                excelData.push(rows[key])
            }
        }
        reader.readAsArrayBuffer(file)
        return excelData
    },
    exportTemplate(filename, data, SheetName) {
        let wb = XLSX.utils.book_new()
        wb.Props = {
            Title: 'Template PDDIKTI',
            Subject: 'Import Data PDDIKTI',
            Author: "Anshari As'adi",
            CreatedDate: new Date()
        }
        const ws = XLSX.utils.json_to_sheet(data)
        XLSX.utils.book_append_sheet(wb, ws, SheetName)
        XLSX.writeFile(wb, filename)

    }

}

export default excel