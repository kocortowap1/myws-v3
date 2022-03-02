<template>
  <div class="min-w-full flex bg-gray-100">
    <!-- sidebar -->
    <aside class="flex-none w-64 h-full">
      <sidebar />
    </aside>
    <div class="container px-5 py-5 mx-auto">
      <router-view />
    </div>
  </div>
</template>
<script>
import sidebar from "../components/Sidebar.vue";
export default {
  name: "AdminLayout",
  components: {
    sidebar,
  },
  mounted(){
    if(!sessionStorage.getItem('token')){
      this.$router.push('/login')
    }else if(sessionStorage.getItem('tokenRenderAt') < Date.now()){
      this.$router.push('/login')
    }else{
      return
    }
  }
};
</script>