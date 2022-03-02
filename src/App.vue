<!--
<template>
  <router-view />
</template>
-->
<template>
  <div>
    <component :is="layout"> </component>
  </div>
</template>

<script>
import Home from "./layouts/HomeLayout.vue";
import Admin from "./layouts/AdminLayout.vue";
export default {
  name: "App",
  components: {
    "home-layout": Home,
    "admin-layout": Admin,
  },
  data: () => ({
    //
  }),
  computed: {
    layout() {
      return `${this.$route.meta.layout || "home"}-layout`;
    },
  },
};
</script>


