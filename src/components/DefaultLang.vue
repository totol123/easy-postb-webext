<script setup lang="ts">
import { lang } from '~/logic/storage'
import type { Lang } from '~/options/lang'
import { getLangFlag, langs } from '~/options/lang'

defineProps<{
  updateUrl: string
}>()
</script>

<template>
  <div class="mt-4">
    <div class="flex gap-2 items-center">
      <h1 class="text-lg font-bold">
        Langue par défaut
      </h1>
      <a :href="updateUrl" target="_blank" class="btn flex items-center gap-2">
        <img :src="getLangFlag(lang as Lang)" class="w-6 h-6 rounded-full">

        Actualiser la langue
      </a>
    </div>
    <select v-model="lang" class="border border-gray-400 rounded px-2 py-1 mt-2 w-full">
      <option v-for="lang in langs" :key="lang" :value="lang">
        {{ lang }}
      </option>
    </select>
  </div>
</template>
