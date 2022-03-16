<template>
  <div class="container">
    <header class="flex items-center justify-between">
      <h1 class="text-2xl font-bold">Import Kelas</h1>
      <a class="btn bg-gray-600 text-white" href="/kelas">Kembali</a>
    </header>
    <div class="my-3 bg-white px-6 py-6">
      <ul class="steps mx-auto w-full">
        <li class="step" :class="step === 0 ? 'step-primary' : null">
          Upload file
        </li>
        <li class="step" :class="step === 1 ? 'step-primary' : null">
          Validasi
        </li>
        <li class="step" :class="step === 2 ? 'step-primary' : null">Import</li>
        <li class="step" :class="step === 3 ? 'step-primary' : null">Report</li>
      </ul>
      <!-- import file -->

      <div
        class="flex flex-col md:flex-row justify-around mt-5"
        v-if="step === 0"
      >
        <div class="w-full md:w-96">
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
              <span class="label-text">Periode</span>
            </label>
            <select
              class="select select-bordered select-sm"
              v-model="importParams.id_periode"
            >
              <option :value="null">Pilih Semester</option>
              <option
                v-for="smt in semesterList"
                :key="smt.id_periode"
                :value="smt.id_periode"
              >
                {{ smt.periode_pelaporan }}
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
              @change="getExcelData"
              accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            />
          </div>
          <!-- <span v-if="excelData.length">{{ excelData.length }} data</span> -->
          <button
            v-if="excelData.length"
            class="btn btn-primary text-white btn-md"
            type="button"
            @click="validasiExcel"
          >
            Validasi {{ excelData.length }} data
          </button>
        </div>
        <div class="h-72 w-full md:w-96 overflow-auto">
          <table v-if="excelData.length" class="table table-compact w-full">
            <thead>
              <tr>
                <th v-for="head in Object.keys(excelData[0])" :key="head">
                  {{ head }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(kelas, i) in excelData" :key="i">
                <td>{{ kelas.kode_mk }}</td>
                <td>{{ kelas.nama_mk }}</td>
                <td>{{ kelas.nama_kelas }}</td>
              </tr>
            </tbody>
          </table>
          <div v-else class="rounded-lg bg-orange-200 p-4 mx-3">
            <h5>Pastikan nama kolom pada file excel anda terdiri dari :</h5>
            <ul class="text-sm columns-2">
              <li><strong>kode_mk *</strong></li>
              <li><strong>nama_mk *</strong></li>
              <li><strong>nama_kelas *</strong></li>
              <li>bahasan</li>
              <li>tanggal_mulai</li>
              <li>tanggal_selesai</li>
              <li>pditt</li>
              <li>kapasitas</li>
              <li>lingkup</li>
              <li>mode</li>
            </ul>
            <span class="text-red-500 text-xs block">*) mandatory</span>
            <button class="btn btn-md btn-accent my-5">
              Download Template
            </button>
          </div>
        </div>
      </div>
      <div v-if="step === 1" class="flex flex-col md:flex-row mt-5">
        <div class="p-6 bg-gray-200 rounded-lg">
          <h1>
            {{ selectedProdi.nama_jenjang_pendidikan }} -
            {{ selectedProdi.nama_program_studi }}
          </h1>
          <span>periode : {{importParams.id_periode}}</span>
        </div>
        <div></div>
      </div>
    </div>
  </div>
</template>
<script>
import { useLocalStorage } from "vue-composable";
import { reactive, ref } from "@vue/reactivity";
import { getData } from "../../lib/pddikti";
import { useRoute, useRouter } from "vue-router";
// import { excelRead } from "../../lib/Excel";
import { useExcel } from "../../composable/excel";
import { computed } from "@vue/runtime-core";
export default {
  setup() {
    const { storage } = useLocalStorage("wsProfil");
    let profil = storage.value;
    const { params } = useRoute();
    const { replace } = useRouter();
    let step = ref(0);

    const { readExcel } = useExcel();
    let excelData = reactive([]);
    let totalExcelData = ref(0);
    let totalValidatedData = ref(0);
    let importParams = reactive({
      id_prodi: params.id || null,
      id_periode: null,
    });
    const selectedProdi = computed(() => {
      return profil["prodi"].find((k) => k.id_prodi === importParams.id_prodi);
    });
    const semesterList = reactive([]);
    const getSemester = async () => {
      const semester = await getData({
        act: "GetPeriode",
        filter: `id_prodi=${importParams.id_prodi}`,
      });
      if (semester.status) {
        semester.data.forEach((el) => {
          semesterList.push(el);
        });
      } else {
        alert(semester.message);
      }
    };
    const onChangeProdi = async () => {
      await replace({ path: `/kelas/import/${importParams.id_prodi}` });
      await getSemester();
    };
    const getExcelData = async (e) => {
      const files = (await e.target.files) || e.dataTransfer.files;
      if (!files.length) {
        return;
      }
      // console.log(files)
      const data = await readExcel(files[0]);
      excelData.splice(0);
      data.forEach((el) => {
        excelData.push(el);
      });
      totalExcelData.value = data.length;
    };
    const downloadTemplate = async () => {};
    const validasiExcel = async () => {
      step.value = 1;
    };
    return {
      profil,
      selectedProdi,
      step,
      onChangeProdi,
      semesterList,
      importParams,
      getExcelData,
      excelData,
      totalExcelData,
      totalValidatedData,
      validasiExcel,
    };
  },
};
</script>