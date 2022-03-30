<template>
  <div class="flex justify-between items-center my-2">
    <div>
      <select v-model="filterParams.limit" class="p-1 appearance-none">
        <option value="10">10</option>
        <option value="25">25</option>
        <option value="50">50</option>
        <option value="100">100</option>
      </select>
      <span> data perhalaman</span>
    </div>
    <div>
      <div class="form-control w-full sm:w-72 md:w-3/4">
        <label for="" class="input-group input-group-sm">
          <select class="select select-bordered select-sm" v-model="searchCat">
            <option value="kode_mata_kuliah">KODE MK</option>
            <option value="nama_mata_kuliah">MATAKULIAH</option>
          </select>
          <input
            type="text"
            placeholder="Cari Kode MK/Matakuliah"
            class="input input-bordered input-sm"
            v-model="seachVal"
          />
        </label>
      </div>
    </div>
  </div>
  <table class="table table-compact w-full">
    <thead>
      <tr>
        <th></th>
        <th>PRODI</th>
        <th>KODE MK</th>
        <th>MATAKULIAH</th>
        <th>SKS</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(mk, i) in listMK" :key="i">
        <td>
          <div class="btn-group btn-group-xs">
            <a :href="`/matakuliah/form/${mk.id_matkul}`" class="btn btn-xs btn-primary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
            </a>
            <button class="btn btn-xs btn-secondary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
          </div>
        </td>
        <td>{{ mk.nama_program_studi }}</td>
        <td>{{ mk.kode_mata_kuliah }}</td>
        <td>{{ mk.nama_mata_kuliah }}</td>
        <td>{{ mk.sks_mata_kuliah }}</td>
      </tr>
    </tbody>
  </table>
  <div class="btn-group my-4 flex flex-nowrap whitespace-nowrap overflow-auto">
    <!-- <button class="btn btn-sm" v-for="i in totalPages" :key="i">{{ i }}</button> -->
    <!-- <button class="btn btn-sm">1</button>
    <button class="btn btn-sm btn-active">2</button>
    <button class="btn btn-sm">3</button>
    <button class="btn btn-sm">4</button> -->
  </div>
</template>
<script>
import { reactive, ref } from "@vue/reactivity";
import { useMatakuliah } from "../../composable/matakuliah";
import { computed, onMounted, watch } from "@vue/runtime-core";
import { useRoute, useRouter } from "vue-router";

export default {
  name: "ListMK",
  setup() {
    const { getListMatakuliah, getCountMataKuliah } = useMatakuliah();
    const listMK = reactive([]);
    const totalData = ref(0);
    const searchCat = ref("kode_mata_kuliah");
    const seachVal = ref("");
    const { query } = useRoute();
    const { replace } = useRouter();
    const filterParams = reactive({
      id_prodi: "",
      limit: 10,
      offset: 0,
    });

    const buildSearch = computed(() => {
      if (seachVal.value) {
        return `${searchCat.value} ilike '%${seachVal.value}%'`;
      }
      return ``;
    });
    const getdata = async function () {
      const data = await getListMatakuliah({});
      if (data["status"] === false) {
        alert(data["message"]);
      } else {
        data.forEach((el) => {
          listMK.push(el);
        });
      }
    };

    const getTotalData = async function () {
      let filterText = ``;
      if (filterParams.id_prodi) {
        filterText = `id_prodi='${filterParams.id_prodi}'`;
      }
      const total = await getCountMataKuliah(filterText);
      if (total["status"] !== false) {
        totalData.value = total;
      }
    };
    watch(query, console.log(query));
    onMounted(() => {
      getdata();
      getTotalData();
    });
    return {
      listMK,
      totalData,
      filterParams,
      searchCat,
      seachVal,
      buildSearch,
    };
  },
};
</script>