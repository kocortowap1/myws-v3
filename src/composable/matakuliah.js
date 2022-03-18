import { getData } from "../lib/pddikti"

export function useMatakuliah() {
    async function getIDMatakuliah(id_prodi = '', kode_mata_kuliah = '') {
        const search = await getData({ act: 'GetDetailMataKuliah', filter: `id_prodi='${id_prodi}' AND kode_mata_kuliah='${kode_mata_kuliah}'`, limit: null })
        if (search.status) {
            return search.data[0]
        } else {
            return search.message
        }
    }
    async function insertMatakuliah(data) {
        const save = await postData({ act: 'InsertMataKuliah', record: data })
        if (save.status) {
            return Object.assign(data, { ...save['data'][0] })
        } else {
            return { status: false, message: save.message }
        }
    }
    async function updateMatakuliah(data, key) {
        const update = await putData({ act: 'UpdateMatakuliah', keys: key, record: data })
        if (update.status) {
            return Object.assign(data, { ...update['data'][0] })
        } else {
            return { status: false, message: update.message }
        }
    }
    async function deleteMatakuliah(key) {
        const del = await deleteData({ act: 'DeleteMatakuliah', keys: key })
        if (del.status) {
            return Object.assign(data, { ...del['data'][0] })
        } else {
            return { status: false, message: del.message }
        }
    }
    return {
        getIDMatakuliah,
        insertMatakuliah,
        updateMatakuliah,
        deleteMatakuliah
    }
}