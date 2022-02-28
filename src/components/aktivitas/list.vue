<template>
  <div v-if="isLoading.value">sedang mengambil data...</div>
  <div v-else>
    <select v-model="requestParams.limit" @change="getAktivitas">
      <option value="10">10</option>
      <option value="20">20</option>
      <option value="50">50</option>
      <option value="100">100</option>
    </select>
    <table class="border-collapse border border-gray-400">
      <thead class="bg-gray-200 text-sm tracking-wide">
        <tr>
          <th></th>
          <th >Prodi</th>
          <th>Periode</th>
          <th>Jenis</th>
          <th>Tipe</th>
          <th>Judul</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="i in list" :key="i.id_aktivitas">
          <td></td>
          <td>{{ i.nama_prodi }}</td>
          <td>{{ i.id_semester }}</td>
          <td>{{ i.nama_jenis_aktivitas }}</td>
          <td>{{ i.nama_jenis_anggota }}</td>
          <td>{{ i.judul }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { onMounted, reactive, ref } from "vue";
import { getData } from "../../lib/pddikti";
export default {
  setup() {
    const requestParams = reactive({
      filter: "",
      limit: 10,
      offset: 0,
    });
    // let list = reactive([]);
    let list = ref(null);
    const selectedList = reactive([]);
    const isLoading = ref(false);
    // const { exec, json } = useFetch();

    const getAktivitas = async () => {
      const res = await getData({
        act: "GetListAktivitasMahasiswa",
        limit: requestParams.limit,
      });
      if (res.status) {
        list.value = res.data;
      }
    };
    const getAnggota = async(id) => {
       const res = await getData({
        act: "GetListAnggotaAktivitasMahasiswa",
        filter: `id_aktivitas='${id}'`,
        limit: null
      });
      if (res.status) {
        return res.data;
      }else{
        return []
      }
    }
    const getPembimbing= async(id) => {
       const res = await getData({
        act: "GetListBimbingMahasiswa",
        filter: `id_aktivitas='${id}'`,
        limit: null
      });
      if (res.status) {
        return res.data;
      }else{
        return []
      }
    }
    const getPenguji =  async(id) => {
       const res = await getData({
        act: "GetListUjiMahasiswa",
        filter: `id_aktivitas='${id}'`,
        limit: null
      });
      if (res.status) {
        return res.data;
      }else{
        return []
      }
    }


    onMounted(() => {
      getAktivitas();
    });

    return {
      list,
      isLoading,
      requestParams,
      getAktivitas,
    };
  },
};
</script>

<style>
</style>