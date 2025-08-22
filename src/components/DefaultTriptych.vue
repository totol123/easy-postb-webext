<script setup lang="ts">
import { triptych } from '~/logic/storage'
</script>

<template>
  <div class="mt-4">
    <h1 class="text-lg font-bold">
      Triptych par défaut
    </h1>
    <input v-model="triptych" class="border border-gray-400 rounded px-2 py-1 mt-2 w-full">
  </div>
</template>
