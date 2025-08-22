<script setup lang="ts">
import { lang } from '~/logic/storage'
import { langs } from '~/options/lang'
</script>

<template>
  <div class="mt-4">
    <h1 class="text-lg font-bold">
      Langue par défaut
    </h1>
    <select v-model="lang" class="border border-gray-400 rounded px-2 py-1 mt-2 w-full">
      <option v-for="lang in langs" :key="lang" :value="lang">
        {{ lang }}
      </option>
    </select>
  </div>
</template>
