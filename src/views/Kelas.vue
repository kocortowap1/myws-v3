<template>
  <div class="mb-4">
    <header class="flex items-center justify-between">
      <h1 class="text-2xl font-bold">Kelas Kuliah</h1>
      <a class="btn btn-primary text-white" href="/kelas/import">Import</a>
    </header>
  </div>
  <Suspense>
    <template #default>
      <list-kelas />
    </template>
    <template #fallback> Loading data.... </template>
  </Suspense>
</template>
<script>
import { defineAsyncComponent, ref, onErrorCaptured } from "vue";
const listKelas = defineAsyncComponent(() =>
  import("../components/kelas/listKelas.vue")
);
export default {
  name: "Kelas",
  components: {
    "list-kelas": listKelas,
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