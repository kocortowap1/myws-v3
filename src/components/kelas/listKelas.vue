<template>
  <div class="bg-white px-4 py-2">
      <div v-if="error">{{error}}</div>
    <div class="overlow-auto">
      <table class="table table-compact w-full">
        <thead>
          <tr>
            <th></th>
            <th>Prodi</th>
            <th>Kode MK</th>
            <th>Matakuliah</th>
            <th>Kelas</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(k, i) in list" :key="i">
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
                  <li><a :href="`/kelas/form/${k.id_kelas_kuliah}`">Edit</a></li>
                  <li><a>Delete</a></li>
                </ul>
              </div>
            </td>
            <td>{{ k.nama_program_studi }}</td>
            <td>{{ k.kode_mata_kuliah }}</td>
            <td>{{ k.nama_mata_kuliah }}</td>
            <td>{{ k.nama_kelas_kuliah }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { reactive, ref } from "@vue/reactivity";
import { useKelasKuliah } from "../../composable/kelasKuliah";
export default {
  name: "listKelas",
  async setup() {
    const list = reactive([]);
    const error = ref('')
    const requestParams = reactive({})
    const { getListKelasKuliah } = useKelasKuliah();
    const prepare = await getListKelasKuliah({});
    if (prepare["status"] === undefined) {
      for (const l of prepare) {
        list.push(l);
      }
    }else{
        error.value = prepare['message']
    }
    return {
      list,
    };
  },
};
</script>
