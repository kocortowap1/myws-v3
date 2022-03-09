<template>
  <div class="bg-white mt-4 px-4 py-4">
    <div class="flex justify-between items-center py-2">
      <div class="flex-none">
        <select
          class="select max-w-xs select-xs select-ghost"
          v-model="perpage"
        >
          <option v-for="(p, i) in perpageList" :key="i" :value="p">
            {{ p }}
          </option>
        </select>
        <span class="text-sm"> dari 100 data</span>
      </div>
      <div class="flex gap-x-2 items-center">
        <div class="form-control">
          <div class="input-group input-group-sm">
            <input
              type="text"
              placeholder="Cari berdasarkan NIM"
              class="input input-bordered input-sm"
            />
            <button class="btn btn-square btn-sm" @click="showModal">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </div>
        </div>
        <button class="btn btn-sm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
            />
          </svg>
        </button>
      </div>
    </div>
    <table class="table table-compact w-full" v-if="listKRS.length">
      <thead>
        <tr>
          <th></th>
          <th>NIM</th>
          <th>NAMA</th>
          <th>PERIODE</th>
          <th>MATAKULIAH</th>
          <th>SKS</th>
          <th>KELAS</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(d, i) in listKRS" :key="i">
          <td>
            <button
              class="btn btn-xs text-white btn-error"
              @click="hapusKRS(d.id_registrasi_mahasiswa, d.id_kelas)"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
          </td>
          <td>{{ d.nim }}</td>
          <td>{{ d.nama_mahasiswa }}</td>
          <td>{{ d.id_periode }}</td>
          <td>{{ d.nama_mata_kuliah }}</td>
          <td>{{ d.sks_mata_kuliah }}</td>
          <td>{{ d.nama_kelas_kuliah }}</td>
        </tr>
      </tbody>
    </table>
    <div class="mx-auto">
      <div class="btn-group">
        <button class="btn btn-sm">1</button>
        <button class="btn btn-sm btn-active">2</button>
        <button class="btn btn-sm">3</button>
        <button class="btn btn-sm">4</button>
      </div>
    </div>
  </div>
  <div class="modal" v-if="isFilter">
    <div class="modal-box">
      <h3 class="font-bold text-lg">Congratulations random Interner user!</h3>
      <p class="py-4">
        You've been selected for a chance to get one year of subscription to use
        Wikipedia for free!
      </p>
      <div class="modal-action">
        <label for="my-modal" class="btn">Yay!</label>
      </div>
    </div>
  </div>
</template>

<script>
// import sampleJson from '../../sample/nilai.json'
const token = sessionStorage.getItem("token");
import { onMounted, reactive, ref } from "vue";
import { useFetch } from "vue-composable";
const base = import.meta.env.VITE_PDDIKTI_PATH;
export default {
  name: "krs_list",
  setup() {
    const listKRS = reactive([]);
    const isFilter = ref(false)
    const perpageList = [10, 25, 50, 100];
    const perpage = ref(10);
    const page = ref(1);
    const totalKRS = ref(0);
    const { exec, json } = useFetch();
    const requestParams = reactive({
      token: token,
      act: "GetKRSMahasiswa",
      filter: "",
      limit: perpage.value,
      offset: perpage.value * (page.value - 1),
    });
    // const sampleData = sampleJson
    const sampleData = [];
    const getKRS = async () => {
      await exec(base, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestParams),
      });
      const data = json.value;
      if (data["error_code"] == "0") {
        data["data"].forEach((el) => {
          listKRS.push(el);
        });
      } else {
        alert(data["error_desc"]);
      }
    };
    const getCountKRS = async () => {
      await exec(base, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: token,
          act: "GetCountPesertaKelasKuliah",
          filter: "",
          limit: perpage.value,
          offset: perpage.value * (page.value - 1),
        }),
      });
      const data = json.value;
      if (data["error_code"] == "0") {
        totalKRS.value = parseInt(data.data);
      } else {
        alert(data["error_desc"]);
      }
    };

    const hapusKRS = async (val, val2) => {
      console.log(val);
      console.log(val2);
    };
    function showModal ()  {
      isFilter.value = true
    }

    onMounted(() => {
      getKRS();
      // getCountKRS();
      // getCountKRS
    });
    return {
      listKRS,
      perpage,
      page,
      hapusKRS,
      sampleData,
      perpageList,
      totalKRS,
      isFilter,
      showModal
    };
  },
};
</script>

<style>
</style>