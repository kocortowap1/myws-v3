<template>
  <div class="relative bg-white dark:bg-gray-800">
    <div class="flex flex-col sm:flex-row sm:justify-around">
      <div class="w-64 h-full overflow-y-auto">
        <div class="flex items-center justify-start mx-6 mt-10">
          <img class="h-10" src="../assets/transfer.png" />
          <span
            class="text-gray-600 dark:text-gray-300 ml-4 text-2xl font-bold"
          >
            MyWS
          </span>
        </div>
        <nav class="mt-10 px-4">
          <router-link to="/" v-slot="{ href, navigate, isActive }">
            <a
              :href="href"
              @click="navigate"
              :class="isActive ? 'bg-gray-100' : null"
              class="
                hover:text-gray-800 hover:bg-gray-100
                flex
                items-center
                p-2
                my-2
                transition-colors
                dark:hover:text-white dark:hover:bg-gray-600
                duration-200
                text-gray-600
                dark:text-gray-400
                rounded-lg
              "
            >
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
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              <span class="mx-4 text-md font-normal"> Home </span>
              <span class="flex-grow text-right"> </span>
            </a>
          </router-link>
          <router-link to="/mhs" v-slot="{ href, navigate, isActive }">
            <a
              :href="href"
              @click="navigate"
              :class="isActive ? 'bg-gray-100' : null"
              class="
                hover:text-gray-800 hover:bg-gray-100
                flex
                items-center
                p-2
                my-2
                transition-colors
                dark:hover:text-white dark:hover:bg-gray-600
                duration-200
                text-gray-600
                dark:text-gray-400
                rounded-lg
              "
            >
              <svg
                width="20"
                height="20"
                fill="currentColor"
                class="m-auto"
                viewBox="0 0 2048 1792"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1024 1131q0-64-9-117.5t-29.5-103-60.5-78-97-28.5q-6 4-30 18t-37.5 21.5-35.5 17.5-43 14.5-42 4.5-42-4.5-43-14.5-35.5-17.5-37.5-21.5-30-18q-57 0-97 28.5t-60.5 78-29.5 103-9 117.5 37 106.5 91 42.5h512q54 0 91-42.5t37-106.5zm-157-520q0-94-66.5-160.5t-160.5-66.5-160.5 66.5-66.5 160.5 66.5 160.5 160.5 66.5 160.5-66.5 66.5-160.5zm925 509v-64q0-14-9-23t-23-9h-576q-14 0-23 9t-9 23v64q0 14 9 23t23 9h576q14 0 23-9t9-23zm0-260v-56q0-15-10.5-25.5t-25.5-10.5h-568q-15 0-25.5 10.5t-10.5 25.5v56q0 15 10.5 25.5t25.5 10.5h568q15 0 25.5-10.5t10.5-25.5zm0-252v-64q0-14-9-23t-23-9h-576q-14 0-23 9t-9 23v64q0 14 9 23t23 9h576q14 0 23-9t9-23zm256-320v1216q0 66-47 113t-113 47h-352v-96q0-14-9-23t-23-9h-64q-14 0-23 9t-9 23v96h-768v-96q0-14-9-23t-23-9h-64q-14 0-23 9t-9 23v96h-352q-66 0-113-47t-47-113v-1216q0-66 47-113t113-47h1728q66 0 113 47t47 113z"
                ></path>
              </svg>
              <span class="mx-4 text-md font-normal"> Mahasiswa </span>
              <span class="flex-grow text-right"> </span>
            </a>
          </router-link>
          <router-link to="/matakuliah" v-slot="{ href, navigate, isActive }">
            <a
              :href="href"
              @click="navigate"
              :class="isActive ? 'bg-gray-100' : null"
              class="
                hover:text-gray-800 hover:bg-gray-100
                flex
                items-center
                p-2
                my-2
                transition-colors
                dark:hover:text-white dark:hover:bg-gray-600
                duration-200
                text-gray-600
                dark:text-gray-400
                rounded-lg
              "
            >
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
                  d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                />
              </svg>
              <span class="mx-4 text-md font-normal"> Matakuliah </span>
              <span class="flex-grow text-right"> </span>
            </a>
          </router-link>
          <router-link to="/kelas" v-slot="{ href, navigate, isActive }">
            <a
              :href="href"
              @click="navigate"
              :class="isActive ? 'bg-gray-100' : null"
              class="
                hover:text-gray-800 hover:bg-gray-100
                flex
                items-center
                p-2
                my-2
                transition-colors
                dark:hover:text-white dark:hover:bg-gray-600
                duration-200
                text-gray-600
                dark:text-gray-400
                rounded-lg
              "
            >
              <svg
                width="20"
                height="20"
                fill="currentColor"
                class="m-auto"
                viewBox="0 0 2048 1792"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M960 0l960 384v128h-128q0 26-20.5 45t-48.5 19h-1526q-28 0-48.5-19t-20.5-45h-128v-128zm-704 640h256v768h128v-768h256v768h128v-768h256v768h128v-768h256v768h59q28 0 48.5 19t20.5 45v64h-1664v-64q0-26 20.5-45t48.5-19h59v-768zm1595 960q28 0 48.5 19t20.5 45v128h-1920v-128q0-26 20.5-45t48.5-19h1782z"
                ></path>
              </svg>
              <span class="mx-4 text-md font-normal"> Kelas </span>
              <span class="flex-grow text-right"> </span> </a
          ></router-link>
          <router-link to="/krs" v-slot="{ href, navigate, isActive }">
            <a
              :href="href"
              @click="navigate"
              :class="isActive ? 'bg-gray-100' : null"
              class="
                hover:text-gray-800 hover:bg-gray-100
                flex
                items-center
                p-2
                my-2
                transition-colors
                dark:hover:text-white dark:hover:bg-gray-600
                duration-200
                text-gray-600
                dark:text-gray-400
                rounded-lg
              "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                />
              </svg>
              <span class="mx-4 text-md font-normal"> KRS & Nilai </span>
              <span class="flex-grow text-right"> </span>
            </a>
          </router-link>
          <router-link to="/akm" v-slot="{ href, navigate, isActive }">
            <a
              :href="href"
              @click="navigate"
              :class="isActive ? 'bg-gray-100' : null"
              class="
                hover:text-gray-800 hover:bg-gray-100
                flex
                items-center
                p-2
                my-2
                transition-colors
                dark:hover:text-white dark:hover:bg-gray-600
                duration-200
                text-gray-600
                dark:text-gray-400
                rounded-lg
              "
            >
              <svg
                width="20"
                height="20"
                class="m-auto"
                fill="currentColor"
                viewBox="0 0 2048 1792"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1070 1178l306-564h-654l-306 564h654zm722-282q0 182-71 348t-191 286-286 191-348 71-348-71-286-191-191-286-71-348 71-348 191-286 286-191 348-71 348 71 286 191 191 286 71 348z"
                ></path>
              </svg>
              <span class="mx-4 text-md font-normal"> Aktivitas Kuliah </span>
              <span class="flex-grow text-right"> </span>
            </a>
          </router-link>
          <router-link to="/aktivitas" v-slot="{ href, navigate, isActive }">
            <a
              :href="href"
              @click="navigate"
              :class="isActive ? 'bg-gray-100' : null"
              class="
                hover:text-gray-800 hover:bg-gray-100
                flex
                items-center
                p-2
                my-2
                transition-colors
                dark:hover:text-white dark:hover:bg-gray-600
                duration-200
                text-gray-600
                dark:text-gray-400
                rounded-lg
              "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                />
              </svg>
              <span class="mx-4 text-md font-normal">
                Aktivitas Mahasiswa
              </span>
              <span class="flex-grow text-right"> </span>
            </a>
          </router-link>
          <hr>
            <router-link to="/kamus" v-slot="{ href, navigate, isActive }">
            <a
              :href="href"
              @click="navigate"
              :class="isActive ? 'bg-gray-100' : null"
              class="
                hover:text-gray-800 hover:bg-gray-100
                flex
                items-center
                p-2
                my-2
                transition-colors
                dark:hover:text-white dark:hover:bg-gray-600
                duration-200
                text-gray-600
                dark:text-gray-400
                rounded-lg
              "
            >
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
              <span class="mx-4 text-md font-normal">
                Kamus WS2
              </span>
              <span class="flex-grow text-right"> </span>
            </a>
          </router-link>
        </nav>
      </div>
    </div>
  </div>
</template>