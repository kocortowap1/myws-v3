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
import { getData } from "../../lib/pddikti";
import { useRoute, useRouter } from "vue-router";
export default {
  setup() {
    const { supported, storage } = useLocalStorage("wsProfil");
    const { params } = useRoute();
    const { replace } = useRouter();
    let profil = storage.value;
    let step = ref(0);
    let importParams = reactive({
      id_prodi: params.id || null,
      id_periode: null,
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
    return {
      profil,
      step,
      onChangeProdi,
      semesterList,
      importParams,
    };
  },
};
</script>