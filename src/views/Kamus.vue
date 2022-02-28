<template>
  <div class="kamus">
    <select v-model="dictionaryParams.fungsi" @change="getDictionary">
      <option :value="null">Pilih Fungsi</option>
      <option v-for="(f, i) in listFungsi" :key="i" :value="f.method">
        {{ f.description }}
      </option>
    </select>
    <p>{{dictionaryParams.fungsi}}</p>
    <hr>
    Request :
    <pre>
      {{ schemas.request }}
    </pre>
    response :
    <pre>
      {{ schemas.response }}
    </pre>
  </div>
</template>

<script>
import { onMounted, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { useFetch } from "vue-composable";

const token = localStorage.getItem("token");
export default {
  name: "Kamus",
  setup() {
    const router = useRouter();
    const dictionaryParams = reactive({
      act: "GetDictionary",
      token: localStorage.getItem("token"),
      fungsi: null,
    });
    const schemas = reactive({});
    const listFungsi = reactive([]);
    const { exec, text, json } = useFetch();
    const getFungsi = async () => {
      await exec("/ws/sandbox2.php");
      parseText(text.value);
    };
    const parseText = (text) => {
      const perline = text.split("<br>");
      let newArray = [];
      for (let i = 1; i < perline.length; i++) {
        const split = perline[i].split(":");
        newArray.push({ method: split[0], description: split[1] });
        listFungsi.push({ method: split[0], description: split[1] });
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
        if (json.value["error_code"] === "0") {
          for (const key in json.value["data"]) {
            schemas[key] = json.value["data"][key];
          }
        }
      }
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
    };
  },
};
</script>

<style>
</style>