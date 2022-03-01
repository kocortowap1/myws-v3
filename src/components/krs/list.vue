<template>
  <div class="mx-auto px-4 sm:px-2 ">
    <div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
      <div class="shadow rounded-lg overflow-auto">
        <table class="w-full">
          <thead>
            <tr>
              <th
                scope="col"
                class="
                  px-5
                  py-3
                  bg-white
                  border-b border-gray-200
                  text-gray-800 text-left text-sm
                  uppercase
                  font-semibold
                "
              >
                Prodi
              </th>
              <th
                scope="col"
                class="
                  px-5
                  py-3
                  bg-white
                  border-b border-gray-200
                  text-gray-800 text-left text-sm
                  uppercase
                  font-semibold
                  w-8
                "
              >
                Periode
              </th>
              <th
                scope="col"
                class="
                  px-5
                  py-3
                  bg-white
                  border-b border-gray-200
                  text-gray-800 text-left text-sm
                  uppercase
                  font-semibold
                "
              >
                Nama
              </th>
              <th
                scope="col"
                class="
                  px-5
                  py-3
                  bg-white
                  border-b border-gray-200
                  text-gray-800 text-left text-sm
                  uppercase
                  font-semibold
                "
              >
                Matakuliah
              </th>
              <th
                scope="col"
                class="
                  px-5
                  py-3
                  bg-white
                  border-b border-gray-200
                  text-gray-800 text-left text-sm
                  uppercase
                  font-semibold
                "
              >
                Angka
              </th>
              <th
                scope="col"
                class="
                  px-5
                  py-3
                  bg-white
                  border-b border-gray-200
                  text-gray-800 text-left text-sm
                  uppercase
                  font-semibold
                "
              >
                Huruf
              </th>
              <th
                scope="col"
                class="
                  px-5
                  py-3
                  bg-white
                  border-b border-gray-200
                  text-gray-800 text-left text-sm
                  uppercase
                  font-semibold
                "
              >
                Index
              </th>

            </tr>
          </thead>
          <tbody>
            <tr v-for="(n,i) in sampleData" :key="i">
              <td class="px-3 py-2 border-b border-gray-200 bg-white text-sm">
                <p class="text-gray-900 whitespace-nowrap">{{n.nama_program_studi}}</p>
              </td>
              <td class="px-3 py-2 border-b border-gray-200 bg-white text-sm">
                <p class="text-gray-900 whitespace-nowrap">{{n.id_semester}}</p>
              </td>
              <td class="px-3 py-2 border-b border-gray-200 bg-white text-sm">
                <p class="text-gray-900 whitespace-nowrap">{{n.nama_mahasiswa}}</p>
              </td>
              <td class="px-3 py-2 border-b border-gray-200 bg-white text-sm">
                <p class="text-gray-900 whitespace-nowrap">{{n.nama_mata_kuliah}} - {{n.kode_mata_kuliah}}</p>
              </td>
              <td class="px-3 py-2 border-b border-gray-200 bg-white text-sm">
                <p class="text-gray-900 whitespace-nowrap">{{n.nilai_angka}}</p>
              </td>
              <td class="px-3 py-2 border-b border-gray-200 bg-white text-sm">
                <p class="text-gray-900 whitespace-nowrap">{{n.nilai_huruf}}</p>
              </td>
              <td class="px-3 py-2 border-b border-gray-200 bg-white text-sm">
                <p class="text-gray-900 whitespace-nowrap">{{n.nilai_indeks}}</p>
              </td>


            </tr>

          </tbody>
        </table>
        <div
          class="
            px-5
            bg-white
            py-5
            flex flex-col
            xs:flex-row
            items-center
            xs:justify-between
          "
        >
          <div class="flex items-center">
            <button
              type="button"
              class="
                w-full
                p-4
                border
                text-base
                rounded-l-xl
                text-gray-600
                bg-white
                hover:bg-gray-100
              "
            >
              <svg
                width="9"
                fill="currentColor"
                height="8"
                class=""
                viewBox="0 0 1792 1792"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1427 301l-531 531 531 531q19 19 19 45t-19 45l-166 166q-19 19-45 19t-45-19l-742-742q-19-19-19-45t19-45l742-742q19-19 45-19t45 19l166 166q19 19 19 45t-19 45z"
                ></path>
              </svg>
            </button>
            <button
              type="button"
              class="
                w-full
                px-4
                py-2
                border-t border-b
                text-base text-indigo-500
                bg-white
                hover:bg-gray-100
              "
            >
              1
            </button>
            <button
              type="button"
              class="
                w-full
                px-4
                py-2
                border
                text-base text-gray-600
                bg-white
                hover:bg-gray-100
              "
            >
              2
            </button>
            <button
              type="button"
              class="
                w-full
                px-4
                py-2
                border-t border-b
                text-base text-gray-600
                bg-white
                hover:bg-gray-100
              "
            >
              3
            </button>
            <button
              type="button"
              class="
                w-full
                px-4
                py-2
                border
                text-base text-gray-600
                bg-white
                hover:bg-gray-100
              "
            >
              4
            </button>
            <button
              type="button"
              class="
                w-full
                p-4
                border-t border-b border-r
                text-base
                rounded-r-xl
                text-gray-600
                bg-white
                hover:bg-gray-100
              "
            >
              <svg
                width="9"
                fill="currentColor"
                height="8"
                class=""
                viewBox="0 0 1792 1792"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1363 877l-742 742q-19 19-45 19t-45-19l-166-166q-19-19-19-45t19-45l531-531-531-531q-19-19-19-45t19-45l166-166q19-19 45-19t45 19l742 742q19 19 19 45t-19 45z"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- <button @click="getKRS">load</button>
<table class="ws-table" v-if="listKRS.length">
    <thead>
        <tr>
            <th></th>
            <th>NIM</th>
            <th>NAMA</th>
            <th>PERIODE</th>
            <th>MATAKULIAH</th>
            <th>SKS</th>
            <th>KELAS</th>
        </tr>
    </thead>
    <tbody>
        <tr v-for="(d,i) in listKRS" :key="i">
            <td>
                <button @click="hapusKRS(d.id_registrasi_mahasiswa, d.id_kelas)">x</button>
            </td>
            <td>{{d.nim}}</td>
            <td>{{d.nama_mahasiswa}}</td>
            <td>{{d.id_periode}}</td>
            <td>{{d.nama_mata_kuliah}}</td>
            <td>{{d.sks_mata_kuliah}}</td>
        </tr>
    </tbody>
</table> -->
</template>

<script>
import sampleJson from '../../sample/nilai.json'
const token = localStorage.getItem("token");
import { reactive } from "vue";
import { useFetch } from "vue-composable";
export default {
  name: "krs_list",
  setup() {
    const listKRS = reactive([]);
    const perpage = reactive([]);
    const { exec, json } = useFetch();
    const requestParams = reactive({
      token: token,
      act: "GetKRSMahasiswa",
      filter: "",
      limit: 10,
      offset: 0,
    });
    const sampleData = sampleJson
    const getKRS = async () => {
      await exec("/ws/sandbox2.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestParams),
      });
      const data = json.value;
      if (data["error_code"] === "0") {
        data["data"].forEach((el) => {
          listKRS.push(el);
        });
      } else {
        alert(data["error_desc"]);
      }
    };
    const hapusKRS = async (val, val2) => {
      console.log(val);
      console.log(val2);
    };
    return {
      listKRS,
      getKRS,
      perpage,
      hapusKRS,
      sampleData
    };
  },
};
</script>

<style>
</style>