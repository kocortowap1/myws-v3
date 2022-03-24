<template>
  <div class="min-w-full flex bg-gray-100">
    <!-- sidebar -->
    <aside class="flex w-64 min-h-screen items-stretch">
      <sidebar />
    </aside>
    <div class="container px-5 py-5 mx-auto">
      <router-view />
    </div>
  </div>
</template>
<script>
import { onMounted, onUnmounted } from "@vue/runtime-core";
import sidebar from "../components/Sidebar.vue";
export default {
  name: "AdminLayout",
  components: {
    sidebar,
  },
  setup() {
    onMounted(() => {
      if (!sessionStorage.getItem("token")) {
        this.$router.push("/login");
      } else if (sessionStorage.getItem("tokenRenderAt") < Date.now()) {
        this.$router.push("/login");
      } else {
        return;
      }
    });
    onUnmounted(() => {
      console.log('layout close')
    })
  },
};
</script>