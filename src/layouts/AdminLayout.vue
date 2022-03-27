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
import { onMounted, onUnmounted, onUpdated } from "@vue/runtime-core";
import sidebar from "../components/Sidebar.vue";
import { useRouter } from "vue-router";
export default {
  name: "AdminLayout",
  components: {
    sidebar,
  },
  setup() {
    const { push } = useRouter();
    const checkToken = async () => {
      if (!sessionStorage.getItem("token")) {
        push("/login");
      } else if (sessionStorage.getItem("tokenRenderAt") < Date.now()) {
        push("/login");
      } else {
        return;
      }
    };
    onMounted(() => {
      checkToken();
    });
    onUpdated(() => {
      // checkToken();
      console.log("layout change");
    });
    onUnmounted(() => {
      console.log("layout close");
    });
  },
};
</script>