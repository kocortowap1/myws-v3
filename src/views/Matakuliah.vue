<template>
  <div class="mb-4">
    <header class="flex items-center justify-between">
      <h1 class="text-2xl font-bold">Matakuliah</h1>
      <div class="space-x-2">
        <a class="btn btn-primary text-white" href="/matakuliah/import"
          >Import</a
        >
        <a
          class="btn btn-accent text-white"
          @click="createTemplate"
          >Template</a>
          <!-- href="./assets/xlsx/matakuliah.xlsx" -->
      </div>
    </header>
  </div>
  <div class="container bg-white shadow-lg rounded-lg p-4">
    <!-- <span class="text-3xl">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-32 w-32"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
        />
      </svg>
    </span>
    <span class="text-4xl"> Fitur Matakuliah sedang diperbaiki </span>-->
    <list-mk></list-mk>
  </div>
</template>
<script>
import listMK from "../components/matakuliah/listMK.vue";
import { useExcelTemplate } from "../composable/excelTemplate";
export default {
  name: "Matakuliah",
  components: {
    "list-mk": listMK,
  },
  setup() {
    const { downloadTemplate } = useExcelTemplate();
    const createTemplate = async ()=> {
      await downloadTemplate('InsertKelasKuliah')
    }
    return { createTemplate };
  },
};
</script>