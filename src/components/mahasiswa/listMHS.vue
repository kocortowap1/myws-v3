<template></template>
<script>
import { reactive } from "vue";
import { useMahasiswaPT } from "../../composable/mahasiswaPt";
export default {
  name: "ListMHS",
  async setup() {
    let listMhs = reactive([]);
    const { getListMahasiswa } = useMahasiswaPT();
    return {};
  },
};
</script>