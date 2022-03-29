<template>
  <div class="bg-white px-4 py-2">
    <div class="flex justify-between items-center my-2">
      <div>
        <select v-model="filterParams.limit" class="p-1 appearance-none">
          <option value="10">10</option>
          <option value="25">25</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
        <span>data perhalaman</span>
      </div>
      <div>
        <label for="" class="input-group input-group-sm">
          <select v-model="searchCat">
            <option value="nim">NIM</option>
            <option value="nama_mahasiswa">Nama</option>
          </select>
          <input
            type="text"
            placeholder="Pencarian Mahasiwa"
            @keypress.enter="getCustomFilter"
            class="input input-sm input-bordered"
            v-model="searchVal"
          />
        </label>
      </div>
    </div>
    <div class="overflow-auto">
      <table class="table table-compact w-full">
        <thead>
          <tr>
            <th></th>
            <th>NIM</th>
            <th>Nama</th>
            <th>Prodi</th>
            <th>Angkatan</th>
            <th>Nama Ibu</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(v, i) in listMhs" :key="i">
            <td>
              <button class="btn btn-xs btn-primary">
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
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              </button>
            </td>
            <td>{{ v.nim }}</td>
            <td>{{ v.nama_mahasiswa }}</td>
            <td>{{ v.nama_program_studi }}</td>
            <td>{{ v.nama_periode_masuk }}</td>
            <td>{{ v.nama_ibu_kandung }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import { computed, onMounted, reactive, ref } from "vue";
import { useMahasiswaPT } from "../../composable/mahasiswaPt";
import { useRoute, useRouter } from "vue-router";
export default {
  name: "ListMHS",
  async setup() {
    const { query } = useRoute();
    const { replace } = useRouter();
    let listMhs = reactive([]);
    let filterParams = reactive({
      limit: query["perpage"] || 10,
      offset: query["page"] - 1 || 0,
    });
    const searchCat = ref("nim");
    const searchVal = ref("");
    const totalMhs = ref(0)
    const buildSearch = computed(() => {
      if (searchVal.value) {
        return `${searchCat.value} ilike '%${searchVal.value}%'`;
      } else {
        return ``;
      }
    });
    const { getListMahasiswa, countMahasiswa  } = useMahasiswaPT();
    const prepare = await getListMahasiswa({});
    if (prepare["status"] === undefined) {
      for (const l of prepare) {
        listMhs.push(l);
      }
    }
    const getTotalMahasiswa = async() => {
      const total = await countMahasiswa(buildSearch.value)
      totalMhs.value = total
    }
    const getCustomFilter = async () => {
      let newFilter = "";
      if(searchVal.value.length){
        await replace({ query: { ...query, [searchCat.value]: searchVal.value } });
        newFilter = buildSearch.value;

      }


      const newData = await getListMahasiswa({
        filter: newFilter,
        limit: filterParams.limit,
        offset: filterParams.offset,
      });

      // console.log(newData);
      if (newData["status"] === undefined) {
        for (const l of newData) {
          listMhs.push(l);
        }
      }else{
        alert(newData['message'])
      }
    };

    return {
      listMhs,
      filterParams,
      searchCat,
      searchVal,
      getCustomFilter,
      buildSearch,
      totalMhs
    };
  },
};
</script>