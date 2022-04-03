<template>
  <div class="mb-4">
    <header class="flex items-center justify-between">
      <h1 class="text-2xl font-bold">Matakuliah</h1>
      <div class="space-x-2">
        <a class="btn btn-primary text-white" href="/matakuliah/import"
          >Import</a
        >
        <a class="btn btn-accent text-white" @click="createTemplate"
          >Template</a
        >
        <!-- href="./assets/xlsx/matakuliah.xlsx" -->
      </div>
    </header>
  </div>
  <div class="container bg-white shadow-lg rounded-lg p-4">
    <Suspense>
      <template #default>
        <list-mk />
      </template>
      <template #fallback>Loading Data</template>
    </Suspense>
  </div>
</template>
<script>
// import listMK from "../components/matakuliah/listMK.vue";
import { useExcelTemplate } from "../composable/excelTemplate";
import { defineAsyncComponent } from "vue";
const listMK = defineAsyncComponent(() =>
  import("../components/matakuliah/listMK.vue")
);
export default {
  name: "Matakuliah",
  components: {
    "list-mk": listMK,
  },
  setup() {
    const { downloadTemplate } = useExcelTemplate();
    const createTemplate = async () => {
      await downloadTemplate("InsertKelasKuliah");
    };
    return { createTemplate };
  },
};
</script>