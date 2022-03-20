<template>
  <div class="flex justify-between"></div>
  <table class="table table-compact">
    <thead>
      <tr>
        <th>NO</th>
        <th>PRODI</th>
        <th>KODE MK</th>
        <th>MATAKULIAH</th>
        <th>SKS</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(mk, i) in listMK" :key="i">
        <td>{{ i + 1 }}</td>
        <td>{{ mk.nama_program_studi }}</td>
        <td>{{ mk.kode_mata_kuliah }}</td>
        <td>{{ mk.nama_mata_kuliah }}</td>
        <td>{{ mk.sks_mata_kuliah }}</td>
      </tr>
    </tbody>
  </table>
  <div class="btn-group my-4 flex flex-nowrap whitespace-nowrap overflow-auto">
    <button class="btn btn-sm" v-for="i in totalPages" :key="i">{{ i }}</button>
    <!-- <button class="btn btn-sm">1</button>
    <button class="btn btn-sm btn-active">2</button>
    <button class="btn btn-sm">3</button>
    <button class="btn btn-sm">4</button> -->
  </div>
</template>
<script>
import { reactive, ref } from "@vue/reactivity";
import { useMatakuliah } from "../../composable/matakuliah";
import { computed, onMounted } from "@vue/runtime-core";

export default {
  name: "ListMK",
  setup() {
    const { getListMatakuliah, getCountMataKuliah } = useMatakuliah();
    const listMK = reactive([]);
    const totalData = ref(0);
    const filterParams = reactive({
      id_prodi: "",
      limit: 10,
      offset: 0,
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

    onMounted(() => {
      getdata();
      getTotalData();
    });
    return {
      listMK,
      totalData,
      filterParams
    };
  },
};
</script>