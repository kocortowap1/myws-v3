<template>
  <div class="home">
    <h1 class="text-3xl font-semibold">
      {{ profil.kode_perguruan_tinggi }} - {{ profil.nama_perguruan_tinggi }}
    </h1>
    <span class="text-sm text-gray-400">{{ profil.jalan }}</span>
  </div>
</template>

<script>
import { onMounted, reactive } from "@vue/runtime-core";
// import { profilPT } from "../composable/profilPT";
import { getData } from "../lib/pddikti";

export default {
  name: "Home",
  setup() {
    let profil = reactive({});
    let prodiList = reactive([])
    async function fetchProfil() {
      const data = await getData({ act: "GetProfilPT", limit: null });
      if (data.status) {
        Object.assign(profil, data["data"][0]);
      }
    }
    async function fetchProdi(){
        const data = await getData({act: 'GetProdi', limit: null})
        if(data.status){
            data.data.forEach(el => {
                prodiList.push(el)
            });
        }
    }
    onMounted(() => {
      fetchProfil();
      fetchProdi()
    });
    return {
      profil,
      prodiList
    };
  },
};
</script>

<style>
</style>