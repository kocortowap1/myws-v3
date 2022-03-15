<template>
  <div class="container">
    <header class="flex items-center justify-between">
      <h1 class="text-2xl font-bold">Import Kelas</h1>
      <a class="btn bg-gray-600 text-white" href="/kelas">Kembali</a>
    </header>
    <div class="my-3 bg-white px-6 py-6">
      <ul class="steps mx-auto w-full">
        <li class="step step-primary">Upload file</li>
        <li class="step">Validasi</li>
        <li class="step">Import</li>
        <li class="step">Report</li>
      </ul>
      <!-- import file -->
      <div class="w-72" v-if="step === 0">
        <div class="form-control">
          <label for="label">
            <span class="label-text">Program Studi</span>
          </label>
          <select
            class="select select-bordered select-sm"
            v-model="importParams.id_prodi"
            @change="onChangeProdi"
          >
            <option :value="null">Pilih Prodi</option>
            <option
              v-for="prodi in profil['prodi']"
              :key="prodi.id_prodi"
              :value="prodi.id_prodi"
            >
              {{ prodi.nama_jenjang_pendidikan }} -
              {{ prodi.nama_program_studi }}
            </option>
          </select>
        </div>

        <div class="form-control">
          <label for="" class="label">
            <span class="label-text">Pilih file Excel</span>
          </label>
          <input
            class="input"
            placeholder=""
            type="file"
            name=""
            id=""
            accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { useLocalStorage } from "vue-composable";
import { reactive, ref } from "@vue/reactivity";
// import { excelRead } from "../../lib/Excel";
export default {
  name: "ImportMK",
  setup() {
    const { supported, storage } = useLocalStorage();
    const { read } = Excel;
    const importParams = reactive({
      id_prodi: params || null,
    });
    let profil = storage.value;
    let excelFile = ref();
    return {
      profil,
      excelFile,
    };
  },
};
</script>