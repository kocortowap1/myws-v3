import { getData, postData, putData, deleteData } from "../lib/pddikti";

export function useMatakuliah() {

    async function getListMatakuliah({ filter = '', limit = 10, offset = 0 }) {
        const list = await getData({ act: 'GetListMataKuliah', filter: filter, limit: limit, offset: offset })
        if (list.status) {
            return list.data
        } else {
            return { status: false, message: list.message }
        }
    }
    async function getCountMataKuliah(filter = "") {
        const total = await getData({ act: 'GetCountMataKuliah', filter: filter })
        if (total.status) {
            return parseInt(total.data)
        } else {
            return { status: false, message: total.message }
        }
    }
    async function getIDMKByKodeMK(kode_mata_kuliah = '') {
        const search = await getData({ act: 'GetDetailMataKuliah', filter: `kode_mata_kuliah='${kode_mata_kuliah}'`, limit: null })
        if (search.status) {
            return search.data[0]
        } else {
            return { ...search }
        }
    }
    async function getIDMKByNamaSKS(id_prodi = '', mk = '', sks = 0) {
        const search = await getData({ act: 'GetDetailMataKuliah', filter: `id_prodi='${id_prodi}' AND nama_mata_kuliah ilike '%${mk}%' AND sks='${sks}'` })
        if (search.status) {
            return search.data[0]
        } else {
            return { ...search }
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
    function hitungTotalSKS(mk = {}) {
        if (mk['sks_praktek'] === undefined) {
            mk['sks_praktek'] = 0
        }
        if (mk['sks_praktek_lapangan'] === undefined) {
            mk['sks_praktek_lapangan'] = 0
        }
        if (mk['sks_simulasi'] === undefined) {
            mk['sks_simulasi'] = 0
        }
        if (mk['sks_tatap_muka'] === undefined) {
            mk['sks_tatap_muka'] = 0
        }
        return { ...mk, sks_mata_kuliah: mk['sks_praktek'] + mk['sks_praktek_lapangan'] + mk['sks_simulasi'] + mk['sks_tatap_muka'] }
    }
    return {
        getListMatakuliah,
        getIDMKByKodeMK,
        insertMatakuliah,
        updateMatakuliah,
        deleteMatakuliah,
        getCountMataKuliah,
        hitungTotalSKS,
        getIDMKByNamaSKS
    }
}