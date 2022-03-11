<template>
  <div class="home">
    <h1 class="text-3xl font-semibold">
      {{ profil.kode_perguruan_tinggi }} - {{ profil.nama_perguruan_tinggi }}
    </h1>
    <span class="text-sm text-gray-400">{{ profil.jalan }}</span>
    <div class="mt-4">
      <ul class="grid grid-cols-3 gap-2">
        <li
          v-for="prodi in profil.prodi"
          :key="prodi.id_prodi"
          class="bg-white flex p-2 space-x-2 items-center"
        >
          <div class="px-2">
            {{ prodi.nama_jenjang_pendidikan }}
          </div>
          <div class="grow">
            <p>{{ prodi.nama_program_studi }}</p>
            <span class="text-xs text-gray-300">{{ prodi.id_prodi }}</span>
          </div>
          <button
            v-if="prodi.status === 'A'"
            class="btn btn-sm bg-white text-gray-400"
            title="Copy id_prodi"
            type="button"
            @click="copyID(prodi.id_prodi)"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"
              />
            </svg>
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { onMounted, reactive, toRefs } from "@vue/runtime-core";
// import { profilPT } from "../composable/profilPT";
import { getData } from "../lib/pddikti";
import { useLocalStorage } from "vue-composable";

export default {
  name: "Home",
  setup() {
    let profil = reactive({});
    let prodiList = reactive([]);
    let persistentProfil = {};
    const { supported, storage, setSync } = useLocalStorage(
      "wsProfil",
      false,
      true
    );
    async function fetchProfil() {
      // if (!Object.entries(profil).length) {
      const data = await getData({ act: "GetProfilPT", limit: null });
      if (data.status) {
        Object.assign(profil, data["data"][0]);
        // storage.value =data['data'][0]
        Object.assign(persistentProfil, data["data"][0]);
      } else {
        alert(data.message);
      }
    }
    // }
    async function fetchProdi() {
      // if (!prodiList.length) {
      const data = await getData({ act: "GetProdi", limit: null });
      if (data.status) {
        data.data.forEach((el) => {
          prodiList.push(el);
        });
        persistentProfil["prodi"] = data.data;
      } else {
        alert(data.message);
      }
      // }
    }
    async function initProfil() {
      if (supported && !!storage.value === true) {
        const val = storage.value;
        Object.assign(profil, storage.value);
        const prodi = storage.value["prodi"];

        console.log(prodi);
        // prodi.foreach((el) => {
        //   //   prodiList.push(el)
        //   console.log(el);
        // });
      } else {
        await fetchProfil();
        await fetchProdi();
        storage.value = persistentProfil;
      }
    }
    const copyID = async (val) => {
      await navigator.clipboard.writeText(val);
    };
    onMounted(() => {
      // fetchProfil();
      // fetchProdi();
      initProfil();
    });
    return {
      profil,
      prodiList,
      copyID,
    };
  },
};
</script>

<style>
</style>