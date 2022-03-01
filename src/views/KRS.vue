<template>
  <div>
    <h1 class="text-2xl font-bold">KRS & NILAI</h1>
    <list-krs />
  </div>
</template>

<script>
import ListKrs from "../components/krs/list.vue";
export default {
  name: "KRS",
  components: {
    ListKrs,
  },
};
</script>

<style>
</style>