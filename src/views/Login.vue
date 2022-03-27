<template>
  <div>
    <section class="text-gray-600 body-font">
      <div class="container px-5 py-24 mx-auto flex flex-wrap items-center">
        <div class="lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0">
          <h1
            class="
              title-font
              font-medium
              tracking-widest
              text-3xl text-gray-900
            "
          >
            MYWS
            <span class="text-gray-500 text-sm block tracking-normal"
              >Importer data ke Neo Feeder</span
            >
          </h1>
          <p class="leading-relaxed mt-4">
            Merupakan aplikasi bantu untuk import data ke Feeder menggunakan
            Excel
          </p>
        </div>
        <div
          class="
            lg:w-2/6
            md:w-1/2
            bg-gray-100
            rounded-lg
            p-8
            flex flex-col
            md:ml-auto
            w-full
            mt-10
            md:mt-0
          "
        >
          <h2 class="text-gray-900 text-2xl font-medium title-font mb-5">
            {{ wsConfig.baseUrl ? "Login" : "Konfigurasi server Feeder" }}
          </h2>
          <!-- <p class="">Silakan masukkan URL Feeder terlebih dahulu</p> -->
          <form v-if="wsConfig.baseUrl" @submit.prevent="onSubmit">
            <div class="relative mb-4">
              <label for="full-name" class="leading-7 text-sm text-gray-600"
                >Username</label
              >
              <input
                v-model="auth.username"
                type="text"
                id="username"
                name="username"
                class="
                  w-full
                  bg-white
                  rounded
                  border border-gray-300
                  focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200
                  text-base
                  outline-none
                  text-gray-700
                  py-1
                  px-3
                  leading-8
                  transition-colors
                  duration-200
                  ease-in-out
                "
                autofocus
                placeholder="Username/Kode PT"
              />
            </div>
            <div class="relative mb-4">
              <label for="email" class="leading-7 text-sm text-gray-600"
                >Password</label
              >
              <input
                v-model="auth.password"
                type="password"
                id="password"
                name="password"
                class="
                  w-full
                  bg-white
                  rounded
                  border border-gray-300
                  focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200
                  text-base
                  outline-none
                  text-gray-700
                  py-1
                  px-3
                  leading-8
                  transition-colors
                  duration-200
                  ease-in-out
                "
                placeholder="Password"
              />
            </div>
            <div class="flex flex-row justify-between">
              <button
                class="
                  text-white
                  bg-indigo-500
                  border-0
                  py-2
                  px-8
                  focus:outline-none
                  hover:bg-indigo-600
                  rounded
                  text-lg
                "
                type="submit"
              >
                Login
              </button>
              <button
                class="
                  bg-gray-100
                  border-0
                  p-2
                  focus:outline-none
                  hover:bg-gray-300
                  rounded
                  text-lg
                "
                type="button"
                title="Konfigurasi Server"
                @click="clearConfig"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"
                  />
                </svg>
              </button>
            </div>
          </form>
          <form @submit.prevent="setWsConfig" v-else>
            <div class="relative mb-4">
              <label for="full-name" class="leading-7 text-sm text-gray-600"
                >URL</label
              >
              <input
                v-model="tempWsConfig.baseUrl"
                type="text"
                id="baseurl"
                name="baseurl"
                class="
                  w-full
                  bg-white
                  rounded
                  border border-gray-300
                  focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200
                  text-base
                  outline-none
                  text-gray-700
                  py-1
                  px-3
                  leading-8
                  transition-colors
                  duration-200
                  ease-in-out
                "
                placeholder="Masukkan Alamat Feeder"
              />
            </div>
            <button
              class="
                text-white
                bg-indigo-500
                border-0
                py-2
                px-8
                focus:outline-none
                hover:bg-indigo-600
                rounded
                text-lg
              "
              type="submit"
            >
              Simpan
            </button>
          </form>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { onMounted, reactive } from "vue";
import { useRouter, onBeforeRouteUpdate } from "vue-router";
import { useFetch } from "vue-composable";
const base = import.meta.env.VITE_PDDIKTI_PATH;
export default {
  name: "Login",
  setup() {
    const auth = reactive({
      act: "GetToken",
      username: "",
      password: "",
    });
    const wsConfig = reactive({
      ...JSON.parse(localStorage.getItem("wsConfig")),
    });
    const tempWsConfig = reactive({});
    const { push } = useRouter();
    const { json, loading, exec, status } = useFetch();
    const onSubmit = async () => {
      await exec(import.meta.env.VITE_PDDIKTI_PATH, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(auth),
      });
      if (status.value === 200) {
        const data = json.value;

        if (data["error_code"] == "0") {
          sessionStorage.setItem("token", data.data.token);
          // router.go(-1)
          let t = new Date();
          sessionStorage.setItem(
            "tokenRenderAt",
            t.setTime(t.getTime() + 1 * 60 * 60 * 1000)
          );
          push({path: '/'});
        }
      } else {
        console.log(status);
        alert("Error Request");
      }
    };
    const clearConfig = () => {
      Object.assign(wsConfig, {});
      wsConfig.baseUrl = "";
      localStorage.removeItem("wsConfig");
    };

    const setWsConfig = () => {
      localStorage.setItem("wsConfig", JSON.stringify(tempWsConfig));
      wsConfig["baseUrl"] = tempWsConfig.baseUrl;
      Object.assign(tempWsConfig, {});
    };
    return {
      auth,
      onSubmit,
      base,
      wsConfig,
      setWsConfig,
      tempWsConfig,
      clearConfig,
    };
  },
};
</script>

<style>
</style>