<template>
  <div class="login">
    <form @submit.prevent="onSubmit">
      <input type="text" v-model="auth.username" placeholder="Username" />
      <input type="password" v-model="auth.password" placeholder="Password" />
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>
import { reactive } from "vue";
import {useRouter, onBeforeRouteUpdate} from 'vue-router'
import { useFetch } from "vue-composable";
const base = import.meta.env.VITE_PDDIKTI_PATH
export default {
  name: "Login",
  setup() {

    const auth = reactive({
      act: "GetToken",
      username: "",
      password: "",
    });
    const router = useRouter()
    const { json, loading, exec, status } = useFetch()
    const onSubmit = async () => {
      await exec(import.meta.env.VITE_PDDIKTI_PATH, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(auth),
      });

      if(status.value === 200){
          const data = json.value
          if(data['error_code']=== "0"){
              sessionStorage.setItem('token', data.data.token)
              // router.go(-1)
              let t = new Date()
              sessionStorage.setItem("tokenRenderAt",t.setTime(t.getTime() + (1*60*60*1000)))
              router.push('/')
          }
      }else{
          alert('Error Request');
      }
    };
    return { auth, onSubmit, base };
  },
};
</script>

<style>
</style>