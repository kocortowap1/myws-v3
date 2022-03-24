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
        <button
          class="btn btn-primary btn-md text-white hover: text-gray-200"
          v-if="excelData.length"
          @click="validasi"
        >
          Validasi
        </button>
      </div>
      <div v-if="step === 1" class="mt-4">
        <div class="flex justify-between items-center">
          <h1 class="text-xl text-center">Validasi Data</h1>
          <button class="btn btn-primary btn-md" @click="importExcel">
            Import
          </button>
        </div>
        <div class="overflow-auto" v-if="validateData.length">
          <table class="table table-compact table-sm w-full">
            <thead>
              <tr>
                <td>KODE MK</td>
                <td>NAMA MK</td>
                <td>SKS PRAKTEK</td>
                <td>SKS PRAKTEK LAP</td>
                <td>SKS SIMULASI</td>
                <td>SKS TATAP MUKA</td>
                <td>SKS TOTAL</td>
                <td>STATUS</td>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(v, i) in validateData"
                :key="i"
                :class="v.error ? 'bg-red-600 text-white' : null"
              >
                <td>
                  {{ v.kode_mk }}
                </td>
                <td>
                  {{ v.nama_mk }}
                </td>
                <td>
                  {{ v.sks_praktek }}
                </td>
                <td>
                  {{ v.sks_praktek_lapangan }}
                </td>
                <td>
                  {{ v.sks_simulasi }}
                </td>
                <td>
                  {{ v.sks_tatap_muka }}
                </td>
                <td>
                  {{ v.sks_mata_kuliah }}
                </td>
                <td>
                  {{ v.message }}
                </td>
              </tr>
            </tbody>
          </table>
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
import { useMatakuliah } from "../../composable/matakuliah";
export default {
  name: "ImportMK",
  setup() {
    const { supported, storage } = useLocalStorage("wsProfil");
    const { params } = useRoute();
    const { replace } = useRouter();
    const { readExcel } = useExcel();
    const excelData = reactive([]);
    const validateData = reactive([]);
    const { hitungTotalSKS, getIDMKByKodeMK } = useMatakuliah();
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
      const d = await readExcel(files[0]);
      d.forEach((el) => {
        excelData.push(hitungTotalSKS(el));
      });
      // console.log(excelData);
    };
    const validasi = async () => {
      await nextStep();
      for (const mk of excelData) {
        const check = await getIDMKByKodeMK(mk["kode_mk"]);

        if (check.status && check === undefined) {
          validateData.push({
            kode_mata_kuliah: mk["kode_mk"],
            nama_mata_kuliah: mk["nama_mk"],
            ...mk,
            error: false,
            message: "ok",
          });
        } else {
          validateData.push({
            kode_mata_kuliah: mk["kode_mk"],
            nama_mata_kuliah: mk["nama_mk"],
            ...mk,
            error: true,
            message: `Kode ${mk["kode_mk"]} telah digunakan`,
          });
        }
      }
    };
    const importExcel = async () => {
      await nextStep();
      const importData = validateData.filter((k) => !!k.error);
      console.log(importData);
    };
    async function nextStep() {
      step.value = step.value + 1;
    }
    async function prevStep() {
      step.value = step.value - 1;
    }
    return {
      profil,
      importParams,
      step,
      onUpload,
      excelData,
      onChangeProdi,
      nextStep,
      prevStep,
      validasi,
      validateData,
      importExcel,
    };
  },
};
</script>