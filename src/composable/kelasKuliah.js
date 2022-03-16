import { getData } from "../lib/pddikti"

export function useKelasKuliah() {
    async function getIDKelas({ kode_mata_kuliah, id_prodi }) {
        const search = await getData({ act: 'GetDetailKelasKuliah', filter: `id_prodi=${id_prodi} AND kode_mata_kuliah=${kode_mata_kuliah}`, limit: null })
        if (search.status) {
            return search.data
        } else {
            return search.message
        }
    }
    return {
        getIDKelas
    }
}