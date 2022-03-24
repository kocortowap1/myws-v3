<template>
  <div class="container">
    <header class="flex items-center justify-between">
      <h1 class="text-2xl font-bold">Import Kelas</h1>
      <a class="btn bg-gray-600 text-white" href="/kelas">Kembali</a>
    </header>
    <div class="my-3 bg-white px-6 py-6">
      <ul class="steps mx-auto w-full">
        <li
          class="step cursor-pointer"
          :class="step == 0 ? 'step-primary' : null"
        >
          Upload file
        </li>
        <li
          class="step cursor-pointer"
          :class="step == 1 ? 'step-primary' : null"
        >
          Validasi
        </li>
        <li
          class="step cursor-pointer"
          :class="step == 2 ? 'step-primary' : null"
        >
          Import
        </li>
        <li
          class="step cursor-pointer"
          :class="step == 3 ? 'step-primary' : null"
        >
          Report
        </li>
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
            ref="excelFile"
            @change="onUpload"
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
import { useExcel } from "../../composable/excel";
import { useRoute, useRouter } from "vue-router";
export default {
  name: "ImportMK",
  setup() {
    const { supported, storage } = useLocalStorage("wsProfil");
    const { params } = useRoute();
    const { replace } = useRouter();
    const { readExcel } = useExcel();
    const importParams = reactive({
      id_prodi: params.id || null,
    });
    const onChangeProdi = async () => {
      await replace({ path: `/matakuliah/import/${importParams.id_prodi}` });
    };
    let step = ref(0);
    let profil = storage.value;
    let excelFile = ref();
    const onUpload = async (e) => {
      const files = (await e.target.files) || e.dataTransfer.files;
      if (!files.length) {
        return;
      }
      const excelData = await readExcel(files[0]);
      console.log(excelData);
    };
    return {
      profil,
      importParams,
      step,
      onUpload,
      onChangeProdi,
    };
  },
};
</script>