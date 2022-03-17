import { getData } from '../lib/pddikti'
export function usePeriode() {
    async function getPeriodeAktifProdi(id_prodi) {
        const search = await getData({ act: 'GetPeriode', filter: `id_prodi=${id_prodi}` })
        if (search.status) {
            return search.data
        } else {
            return search.message
        }
    }
    return {
        getPeriodeAktifProdi
    }
}