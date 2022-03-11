<template>
  <div class="kamus">
    <header class="px-2 py-2">
      <h1 class="text-3xl flex items-center gap-2 font-semibold">
        <span class="">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
            />
          </svg>
        </span>
        Dictionary
      </h1>
      <span class="text-sm text-gray-600"
        >Mendapatkan informasi schema request-response WS2</span
      >
    </header>
    <div class="bg-white p-8">
      <div class="form-control">
        <select
          v-model="dictionaryParams.fungsi"
          @change="getDictionary"
          class="select select-bordered"
        >
          <option :value="null">Pilih Fungsi</option>
          <option v-for="(f, i) in listFungsi" :key="i" :value="f.method">
            {{ f.description }} [{{ f.method }}]
          </option>
        </select>
      </div>
      <div class="flex flex-col md:flex-row my-4 space-x-6">
        <div class="form-control">
          <label class="label">
            <span class="label-text">Request :</span>
            <button class="label-text-alt text-gray-400" @click="copySchema">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"
                />
              </svg>
            </button>
          </label>
          <textarea
            class="textarea textarea-bordered"
            placeholder="Schema Request"
            cols="50"
            rows="8"
            :value="JSON.stringify(schemas.request, null, 4)"
          ></textarea>
        </div>
        <div class="form-control">
          <label class="label">
            <span class="label-text">Response :</span>
          </label>
          <textarea
           cols="50"
            rows="8"
            class="textarea textarea-ghost bg-gray-300"
            placeholder="Schema Response"
            :value="JSON.stringify(schemas.response, null,2)"
          ></textarea>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { useFetch } from "vue-composable";

const token = sessionStorage.getItem("token");
export default {
  name: "Kamus",
  setup() {
    const router = useRouter();
    const dictionaryParams = reactive({
      act: "GetDictionary",
      token: sessionStorage.getItem("token"),
      fungsi: null,
    });
    const schemas = reactive({});
    const listFungsi = reactive([]);
    const { exec, text, json } = useFetch();
    const getFungsi = async () => {
      await exec("/ws/live2.php");
      parseText(text.value);
    };
    const parseText = (text) => {
      const perline = text.split("<br>\n");
      let newArray = [];
      for (let i = 1; i < perline.length; i++) {
        const split = perline[i].split(":");
        newArray.push({ method: split[0].trim(), description: split[1] });
        listFungsi.push({ method: split[0].trim(), description: split[1] });
      }
      return newArray;
    };
    const parseBracket = (text) => {
      const pattern = new RegExp("(?<=[).+?(?=])");
      const m = pattern.exec(text);
      console.log(m);
    };
    const getDictionary = async () => {
      if (dictionaryParams.fungsi) {
        await exec("/ws/sandbox2.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dictionaryParams),
        });
        // console.log(json.value);
        if (json.value["error_code"] == "0") {
          for (const key in json.value["data"]) {
            schemas[key] = json.value["data"][key];
          }
          schemas["request"]["act"] = dictionaryParams["fungsi"];
        }
      }
    };
    const copySchema = async () => {
      await navigator.clipboard.writeText(JSON.stringify(schemas.request));
    };
    onMounted(() => {
      getFungsi();
      if (!token) {
        router.push("/login");
      }
    });
    return {
      token,
      listFungsi,
      dictionaryParams,
      schemas,
      getDictionary,
      copySchema,
    };
  },
};
</script>

<style>
</style>