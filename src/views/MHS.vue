<template>
  <div class="mb-4">
    <header class="flex items-center justify-between">
      <h1 class="text-2xl font-bold">Mahasiswa</h1>
      <div class="space-x-2">
        <a class="btn btn-primary text-white" href="/mhs/import">Import</a>

      </div>
    </header>
  </div>
  <Suspense>
    <template #default>
      <list-mhs />
    </template>
    <template #fallback> Loading data.... </template>
  </Suspense>
</template>
<script>
import { defineAsyncComponent, onErrorCaptured, ref } from "vue";
const listMhs = defineAsyncComponent(() =>
  import("../components/mahasiswa/listMHS.vue")
);
export default {
  name: "MHS",
  components: {
    "list-mhs": listMhs,
  },
  setup() {
    let errorMessage = ref("");
    onErrorCaptured((e) => {
      errorMessage.value = e;
    });
    return {
      errorMessage,
    };
  },
};
</script>