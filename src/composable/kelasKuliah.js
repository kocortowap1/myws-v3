import { deleteData, getData, postData, putData } from "../lib/pddikti"

export function useKelasKuliah() {
    async function getListKelasKuliah({ filter = '', limit = 10, offset = 0 }) {
        const list = await getData({ act: 'GetListKelasKuliah', filter: filter, limit: limit, offset: offset })
        if (list.status) {
            return list.data
        } else {
            return { status: false, message: list.message }
        }
    }
    async function getIDKelas(kode_mata_kuliah = '', id_prodi = '', nama_kelas = '') {
        const search = await getData({ act: 'GetDetailKelasKuliah', filter: `id_prodi='${id_prodi}' AND kode_mata_kuliah='${kode_mata_kuliah}' AND nama_kelas_kuliah='${nama_kelas}'`, limit: null })
        if (search.status) {
            return search.data[0]
        } else {
            return search.message
        }
    }
    async function insertKelas(data) {
        const save = await postData({ act: 'InsertKelasKuliah', record: data })
        if (save.status) {
            return Object.assign(data, { ...save['data'][0] })
        } else {
            return { status: false, message: save.message }
        }
    }
    async function updateKelas(data, key) {
        const update = await putData({ act: 'UpdateKelasKuliah', keys: key, record: data })
        if (update.status) {
            return Object.assign(data, { ...update['data'][0] })
        } else {
            return { status: false, message: update.message }
        }
    }
    async function deleteKelas(key) {
        const del = await deleteData({ act: 'DeleteKelasKuliah', keys: key })
        if (del.status) {
            return Object.assign(data, { ...del['data'][0] })
        } else {
            return { status: false, message: del.message }
        }
    }
    return {
        getListKelasKuliah,
        getIDKelas,
        insertKelas,
        updateKelas,
        deleteKelas
    }
}