<template>
  <div class="mb-4">
    <header class="flex items-center justify-between">
      <h1 class="text-2xl font-bold">
        {{ mk.id_matkul ? "Edit" : "Form" }} Matakuliah
      </h1>
      <div class="space-x-2">
        <a class="btn btn-sm" href="/matakuliah">Kembali</a>
      </div>
    </header>
  </div>
  <div class="bg-white shadow-sm px-4 py-4">
    <form @submit.prevent="saveMK">
      <div class="flex flex-col md:flex-row space-y-1 md:space-x-2">
        <div class="flex-1">
          <div class="form-control w-full max-w-sm mb-1">
            <label class="label mb-0 p-1">
              <span class="label-text"
                >Prodi <small class="text-red-500">*</small></span
              >
            </label>
            <select
              v-model="mk.id_prodi"
              class="select select-sm select-bordered"
            >
              <option :value="null">Pilih Prodi</option>
              <option
                v-for="(p, i) in profil['prodi']"
                :key="i"
                :value="p.id_prodi"
              >
                {{ p.nama_jenjang_pendidikan }} - {{ p.nama_program_studi }}
              </option>
            </select>
          </div>
          <div class="form-control w-full max-w-sm mb-1">
            <label class="label mb-0 p-1">
              <span class="label-text"
                >Kode MK <small class="text-red-500">*</small></span
              >
            </label>
            <input
              type="text"
              placeholder="Kode MK"
              v-model="mk.kode_mata_kuliah"
              required
              class="input input-bordered input-sm w-full max-w-sm"
            />
          </div>
          <div class="form-control w-full max-w-sm mb-1">
            <label class="label mb-0 p-1">
              <span class="label-text"
                >Matakuliah <small class="text-red-500">*</small></span
              >
            </label>
            <input
              type="text"
              placeholder="Matakuliah"
              v-model="mk.nama_mata_kuliah"
              required
              class="input input-bordered input-sm w-full max-w-sm"
            />
          </div>
          <div class="py-2">
            <p>
              SKS Matakuliah : <strong>{{ totalSKS }}</strong>
            </p>
          </div>
        </div>
        <div class="flex-1">
          <div class="form-control">
            <label class="label mb-0 p-1">
              <span class="label-text">SKS Tatap Muka</span>
            </label>
            <input
              type="number"
              placeholder="SKS Praktek"
              v-model.number="mk.sks_tatap_muka"
              min="0"
              class="input input-bordered input-sm w-32"
            />
          </div>
          <div class="form-control">
            <label class="label mb-0 p-1">
              <span class="label-text">SKS Praktek</span>
            </label>
            <input
              type="number"
              placeholder="SKS Praktek"
              v-model.number="mk.sks_praktek"
              min="0"
              class="input input-bordered input-sm w-32"
            />
          </div>

          <div class="form-control">
            <label class="label mb-0 py-1">
              <span class="label-text">SKS Praktek Lapangan</span>
            </label>
            <input
              type="number"
              placeholder="SKS Praktek Lapang"
              v-model.number="mk.sks_praktek_lapangan"
              min="0"
              class="input input-bordered input-sm w-44"
            />
          </div>
          <div class="form-control">
            <label class="label mb-0 p-1">
              <span class="label-text">SKS Simulasi</span>
            </label>
            <input
              type="number"
              placeholder="SKS Simulasi"
              v-model.number="mk.sks_simulasi"
              min="0"
              class="input input-bordered input-sm w-32"
            />
          </div>
        </div>
        <div class="flex-none">
          <div class="form-control">
            <label class="cursor-pointer label">
              <input
                type="checkbox"
                true-value="1"
                false-value="0"
                class="toggle toggle-accent"
                v-model="mk.ada_bahan_ajar"
              />
              <span class="label-text ml-2"
                >{{ mk.ada_bahan_ajar === "1" ? "Ada" : "Tidak ada" }} Bahan
                Ajar</span
              >
            </label>
          </div>
          <div class="form-control">
            <label class="cursor-pointer label">
              <input
                type="checkbox"
                true-value="1"
                false-value="0"
                class="toggle toggle-accent"
                v-model="mk.ada_diktat"
              />
              <span class="label-text"
                >{{ mk.ada_diktat === "1" ? "Ada" : "Tidak ada" }} Diktat</span
              >
            </label>
          </div>
          <div class="form-control">
            <label class="cursor-pointer label">
              <input
                type="checkbox"
                true-value="1"
                false-value="0"
                class="toggle toggle-accent"
                v-model="mk.ada_sap"
              />
              <span class="label-text"
                >{{ mk.ada_sap === "1" ? "Ada" : "Tidak ada" }} SAP</span
              >
            </label>
          </div>
          <div class="form-control">
            <label class="cursor-pointer label">
              <input
                type="checkbox"
                true-value="1"
                false-value="0"
                class="toggle toggle-accent"
                v-model="mk.ada_silabus"
              />
              <span class="label-text"
                >{{
                  mk.ada_silabus === "1" ? "Ada" : "Tidak ada"
                }}
                Silabus</span
              >
            </label>
          </div>
          <div>
            <button type="submit" class="btn btn-primary">Simpan</button>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { reactive } from "@vue/reactivity";
import { useRoute, useRouter } from "vue-router";
import { useMatakuliah } from "../../composable/matakuliah";
import { computed, onMounted } from "@vue/runtime-core";
import { useLocalStorage } from "vue-composable";
export default {
  name: "FormMK",
  setup() {
    const { params } = useRoute();
    const mk = reactive({});
    const { storage } = useLocalStorage("wsProfil");
    const profil = storage.value;
    const { getListMatakuliah, insertMatakuliah, updateMatakuliah } =
      useMatakuliah();
    const initMK = async () => {
      if (params.id) {
        const cek = await getListMatakuliah({
          filter: `id_matkul='${params.id}'`,
        });
        // console.log(cek)
        if (cek["status"] === undefined) {
          Object.assign(mk, cek[0]);
        } else {
          alert(mk["message"]);
        }
      }
    };
    const totalSKS = computed(() => {
      const tm = parseInt(mk["sks_tatap_muka"]) || 0;
      const p = parseInt(mk["sks_praktek"]) || 0;
      const pl = parseInt(mk["sks_praktek_lapangan"]) || 0;
      const s = parseInt(mk["sks_simulasi"]) || 0;
      return tm + p + pl + s;
    });
    const saveMK = async () => {
      let action = null;
      let record = {
        kode_mata_kuliah: mk["kode_mata_kuliah"],
        nama_mata_kuliah: mk["nama_mata_kuliah"],
        id_prodi: mk["id_prodi"],
        sks_mata_kuliah: totalSKS.value,
        sks_praktek: mk["sks_praktek"],
        sks_praktek_lapangan: mk["sks_praktek_lapangan"],
        sks_simulasi: mk["sks_simulasi"],
        sks_tatap_muka: parseInt(mk["sks_tatap_muka"]),
      };
      if (params.id) {
        //update
        action = await updateMatakuliah(record, { id_matkul: params.id });
      } else {
        //insert
        action = await insertMatakuliah(record);
      }
      console.log(action);
    };
    onMounted(() => {
      initMK();
    });
    return {
      mk,
      saveMK,
      profil,
      totalSKS,
    };
  },
};
</script>

<style>
</style>