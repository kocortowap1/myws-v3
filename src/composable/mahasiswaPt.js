import { getData, postData, putData, deleteData } from "../lib/pddikti";

export function useMahasiswaPT() {
    async function getListMahasiswa({ filter = '', limit = 10, offset = 0 }) {
        const list = await getData({ act: 'GetDataLengkapMahasiswaProdi', filter: filter, limit: limit, offset: offset })
        if (list.status) {
            return list.data
        } else {
            return { status: false, message: list.message }
        }
    }
    async function getIDRegistrasiMahasiswa(id_prodi, nim) {
        const search = await getData({ act: 'GetListRiwayatPendidikanMahasiswa', filter: `id_prodi='${id_prodi} AND nim='${nim}'`, limit: null })
        if (search.status && !!search.data) {
            return search.data
        } else {
            return { status: false, message: 'NIM tidak ditemukan' }
        }
    }
    async function insertRiwayatPendidikanMahasiswa(data) {
        const save = await postData({ act: 'InsertRiwayatPendidikanMahasiswa', record: data })
        if (save.status) {
            return Object.assign(data, { ...save['data'][0] })
        } else {
            return { status: false, message: save.message }
        }
    }
    async function updateRiwayatPendidikanMahasiswa() {
        const update = await putData({ act: 'UpdateRiwayatPendidikanMahasiswa', keys: key, record: data })
        if (update.status) {
            return Object.assign(data, { ...update['data'][0] })
        } else {
            return { status: false, message: update.message }
        }
    }
    async function deleteRiwayatPendidikanMahasiswa() {
        const del = await deleteData({ act: 'DeleteRiwayatPendidikanMahasiswa', keys: key })
        if (del.status) {
            return Object.assign(data, { ...del['data'][0] })
        } else {
            return { status: false, message: del.message }
        }
    }
    async function countMahasiswa(filter) {
        const total = await getData({ act: 'GetCountMahasiswa', filter: filter, limit: null })
        if (total.status) {
            return parseInt(total.data)
        } else {
            return total
        }
    }
    return {
        getIDRegistrasiMahasiswa,
        insertRiwayatPendidikanMahasiswa,
        updateRiwayatPendidikanMahasiswa,
        deleteRiwayatPendidikanMahasiswa,
        getListMahasiswa,
        countMahasiswa
    }
}