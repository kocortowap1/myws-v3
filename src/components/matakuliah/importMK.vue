<template>
  <div class="container">
    <header class="flex items-center justify-between">
      <h1 class="text-2xl font-bold">Import Matakuliah</h1>
      <a class="btn bg-gray-600 text-white" href="/matakuliah">Kembali</a>
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
          class="btn btn-primary btn-md text-white hover:text-gray-200"
          v-if="excelData.length"
          @click="validasi"
        >
          Validasi
        </button>
      </div>
      <div v-if="step === 1" class="mt-4">
        <div class="flex justify-between items-center my-3">
          <h1 class="text-xl text-center font-semibold">Validasi Data</h1>
          <div>
            <button
              v-if="bisaImport"
              class="btn btn-primary btn-md"
              :disabled="!bisaImport"
              @click="importExcel"
            >
              Import
            </button>
            <p v-else class="text-red-500 font-semibold">
              Tidak ada data yang bisa diimport
            </p>
          </div>
        </div>
        <div class="overflow-auto">
          <table class="table table-compact table-sm w-full">
            <thead>
              <tr>
                <th rowspan="2">KODE MK</th>
                <th rowspan="2">NAMA MK</th>
                <th colspan="5" class="text-center">SKS</th>
                <th rowspan="2">STATUS</th>
              </tr>
              <tr>
                <th>PRAKTEK</th>
                <th>PRAKTEK LAP</th>
                <th>SIMULASI</th>
                <th>TATAP MUKA</th>
                <th>TOTAL</th>
              </tr>
            </thead>
            <tbody v-if="validateData.length">
              <tr
                v-for="(v, i) in validateData"
                :key="i"
                :class="v.error ? 'bg-red-600 text-white' : null"
              >
                <td>
                  {{ v.kode_mata_kuliah }}
                </td>
                <td>
                  {{ v.nama_mata_kuliah }}
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
      <div v-if="step === 2">
        <div class="overflow-auto">
          <table class="table table-compact table-sm w-full">
            <thead>
              <tr>
                <th rowspan="2">KODE MK</th>
                <th rowspan="2">NAMA MK</th>
                <th colspan="5" class="text-center">SKS</th>
                <th rowspan="2">STATUS</th>
              </tr>
              <tr>
                <th>PRAKTEK</th>
                <th>PRAKTEK LAP</th>
                <th>SIMULASI</th>
                <th>TATAP MUKA</th>
                <th>TOTAL</th>
              </tr>
            </thead>
            <tbody v-if="importedData.length">
              <tr
                v-for="(v, i) in importedData"
                :key="i"
                :class="[
                  v.error ? 'bg-red-600 text-white' : null,
                  v.id_matkul ? 'bg-green-400' : null,
                ]"
              >
                <td>
                  {{ v.kode_mata_kuliah }}
                </td>
                <td>
                  {{ v.nama_mata_kuliah }}
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
      <div v-if="step === 3" class="mt-4">
        <div class="stats shadow">
          <div class="stat">
            <div class="stat-figure text-primary">
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
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
            </div>
            <div class="stat-title">Total Data Excel</div>
            <div class="stat-value text-primary">{{ excelData.length }}</div>
            <!-- <div class="stat-desc">21% more than last month</div> -->
          </div>

          <div class="stat">
            <div class="stat-figure text-secondary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                class="inline-block w-8 h-8 stroke-current"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                ></path>
              </svg>
            </div>
            <div class="stat-title">Validasi Data</div>
            <div class="stat-value text-secondary">
              {{ validateData.length }}
            </div>
            <div class="stat-desc text-secondary">
              {{ dataInvalid.length }} data tidak valid
            </div>
          </div>

          <div class="stat">
            <div class="stat-figure text-secondary">
              <div class="avatar online">
                <div class="w-16 rounded-full">
                  <img src="https://api.lorem.space/image/face?w=128&h=128" />
                </div>
              </div>
            </div>
            <div class="stat-value">{{ importedData.length }}</div>
            <div class="stat-title">Data diimport</div>
            <div class="stat-desc text-secondary">
              {{ dataGagal.length }} data gagal import
            </div>
          </div>
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
import { computed } from "@vue/runtime-core";
export default {
  name: "ImportMK",
  setup() {
    const { supported, storage } = useLocalStorage("wsProfil");
    const { params } = useRoute();
    const { replace } = useRouter();
    const { readExcel } = useExcel();
    const excelData = reactive([]);
    const validateData = reactive([]);
    const importedData = reactive([]);
    const { hitungTotalSKS, getIDMKByKodeMK, insertMatakuliah } =
      useMatakuliah();
    const importParams = reactive({
      id_prodi: params.id || null,
    });
    const onChangeProdi = async () => {
      await replace({ path: `/matakuliah/import/${importParams.id_prodi}` });
    };
    let step = ref(0);
    let profil = storage.value;
    const bisaImport = computed(() => {
      return validateData.some((k) => k.error === false);
    });
    const dataInvalid = computed(() => {
      return validateData.filter((k) => k.error);
    });
    const dataGagal = computed((k) => {
      return importedData.filter((k) => k.error);
    });
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
        const check = await getIDMKByKodeMK(mk["kode_mata_kuliah"]);

        if (check === undefined) {
          validateData.push({
            kode_mata_kuliah: mk["kode_mata_kuliah"],
            nama_mata_kuliah: mk["nama_mata_kuliah"],
            ...mk,
            error: false,
            message: "ok",
          });
        } else {
          validateData.push({
            kode_mata_kuliah: mk["kode_mata_kuliah"],
            nama_mata_kuliah: mk["nama_mata_kuliah"],
            ...mk,
            error: true,
            message:
              check["message"] ||
              `kode ${mk["kode_mata_kuliah"]} sudah digunakan`,
          });
        }
      }
    };
    const importExcel = async () => {
      const importData = validateData.filter((k) => !k.error);
      for (const d of importData) {
        d["id_prodi"] = importParams.id_prodi;
        const da = await insertMatakuliah(d);
        let status = "ok";
        if (da["status"] === false) {
          status = da.message;
          status = { error: true, message: da.message };
        } else {
          status = { error: false, message: "ok" };
        }
        importedData.push({ ...d, ...status });
        // console.log(da);
      }
      await nextStep();
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
      bisaImport,
      dataInvalid,
      dataGagal,
    };
  },
};
</script>