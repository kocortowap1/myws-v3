import { getData } from "../lib/pddikti"

export function useMahasiswa() {
    async function getIDMahasiswa({ nama, tanggal_lahir, jk, nama_ibu }) {
        if (!nama || !tanggal_lahir || !jk) {
            return { status: false, message: 'Parameter harus terdiri dari Nama, Tanggal Lahir, Jenis Kelamin' }
        } else {
            let filter = `nama_mahasiswa='${nama}' AND tanggal_lahir='${tanggal_lahir}' AND jk='${jk}'`
            if (nama_ibu) {
                filter += ` AND nama_ibu_kandung=${nama_ibu}`
            }
            const search = await getData({ act: 'GetBiodataMahasiswa', filter: filter, limit: null })
            if (search.status) {
                return search.data[0]
            } else {
                return { status: false, message: 'Data tidak ditemukan' }
            }
        }
    }

    async function insertBiodataMahasiswa() {
        const save = await postData({ act: 'InsertBiodataMahasiswa', record: data })
        if (save.status) {
            return Object.assign(data, { ...save['data'][0] })
        } else {
            return { status: false, message: save.message }
        }
    }
    async function updateBiodataMahasiswa() {
        const update = await putData({ act: 'UpdateBiodataMahasiswa', keys: key, record: data })
        if (update.status) {
            return Object.assign(data, { ...update['data'][0] })
        } else {
            return { status: false, message: update.message }
        }
    }
    async function deleteBiodataMahasiswa() {
        const del = await deleteData({ act: 'DeleteBiodataMahasiswa', keys: key })
        if (del.status) {
            return Object.assign(data, { ...del['data'][0] })
        } else {
            return { status: false, message: del.message }
        }
    }

    return {
        getIDMahasiswa,
        insertBiodataMahasiswa,
        updateBiodataMahasiswa,
        deleteBiodataMahasiswa
    }
}