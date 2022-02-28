<template>
<button @click="getKRS">load</button>
<table class="ws-table" v-if="listKRS.length">
    <thead>
        <tr>
            <th></th>
            <th>NIM</th>
            <th>NAMA</th>
            <th>PERIODE</th>
            <!-- <th>KODE MK</th> -->
            <th>MATAKULIAH</th>
            <th>SKS</th>
            <th>KELAS</th>
        </tr>
    </thead>
    <tbody>
        <tr v-for="(d,i) in listKRS" :key="i">
            <td>
                <button @click="hapusKRS(d.id_registrasi_mahasiswa, d.id_kelas)">x</button>
            </td>
            <td>{{d.nim}}</td>
            <td>{{d.nama_mahasiswa}}</td>
            <td>{{d.id_periode}}</td>
            <td>{{d.nama_mata_kuliah}}</td>
            <td>{{d.sks_mata_kuliah}}</td>
        </tr>
    </tbody>
</table>
</template>

<script>
const token = localStorage.getItem('token')
import { reactive } from 'vue'
import { useFetch } from 'vue-composable'
export default {
    name: 'krs_list',
    setup(){
        const listKRS = reactive([])
        const perpage = reactive([])
        const {exec, json} = useFetch()
        const requestParams = reactive({
            token: token,
            act: 'GetKRSMahasiswa',
            filter: "",
            limit: 10,
            offset : 0
        });

        const getKRS  = async() => {
            await exec('/ws/sandbox2.php', {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify(requestParams)
            })
                const data = json.value
            if(data['error_code'] === '0'){
                data['data'].forEach(el => {
                    listKRS.push(el)
                });
            }else{
                alert(data['error_desc'])
            }
        }
        const hapusKRS = async(val, val2) => {
            console.log(val)
            console.log(val2)
        }
        return {
            listKRS,
            getKRS,
            perpage,
            hapusKRS
        }
    }
}
</script>

<style>

</style>