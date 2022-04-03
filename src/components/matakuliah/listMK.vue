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
          <div class="dropdown">
                <label tabindex="0" class="btn btn-xs btn-default">
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
                      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </label>
                <ul
                  tabindex="0"
                  class="
                    dropdown-content
                    menu
                    p-2
                    shadow
                    bg-base-100
                    rounded-box
                    w-52
                  "
                >
                  <li><a :href="`/matakuliah/form/${mk.id_matkul}`">Edit</a></li>
                  <li><a>Delete</a></li>
                </ul>
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