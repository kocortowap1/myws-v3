import { getData } from '../lib/pddikti'
const token = sessionStorage.getItem('token')
export function profilPT() {
    // const profil = 
    // let profil = reactive([]) 
    let profil = []
    function fetchProfil () {
        const data =  getData({ act: 'GetProfilPT', limit: null })
        if (data.status) {
            // data.data.forEach(el => {
            //     profil.push(el)
            // });
            profil = data.data
        }
    }
    return {
        profil,
        fetchProfil
    }
}