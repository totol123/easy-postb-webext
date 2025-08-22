<script setup lang="ts">
import { triptych } from '~/logic/storage'
</script>

<template>
  <div class="mt-4">
    <h1 class="text-lg font-bold">
      Triptych par défaut <a>
        <a
          class=" text-blue hover:underline text-sm"
          target="_blank" href="https://www.notion.so/87f167e6d3c246c39d75dcc9783ff060?v=ca0a18d2445b459d91e5a06f21e09abd"
        >(Tous les jeux de données)</a>
      </a>
    </h1>
    <input v-model="triptych" class="border border-gray-400 rounded px-2 py-1 mt-2 w-full">
  </div>
</template>
