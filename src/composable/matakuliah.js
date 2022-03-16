import { getData } from "../lib/pddikti"

export function useMatakuliah() {
    async function getIDMatakuliah({ id_prodi, kode_mata_kuliah }) {
        const search = await getData({ act: 'GetDetailMataKuliah', filter: `id_prodi=${id_prodi} AND kode_mata_kuliah=${kode_mata_kuliah}`, limit: null })
        if (search.status) {
            return search.data
        } else {
            return search.message
        }
    }
    return {
        getIDMatakuliah
    }
}