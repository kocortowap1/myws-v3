<template>
  <divc class="min-w-full flex bg-gray-100">
    <!-- sidebar -->
    <sidebar />
    <div class="container px-5 py-5 mx-auto">
      <router-view />
    </div>
  </divc>
</template>
<script>
import sidebar from "../components/Sidebar.vue";
export default {
  name: "AdminLayout",
  components: {
    sidebar,
  },
};
</script>