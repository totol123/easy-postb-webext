<script setup lang="ts">
import { env } from '~/logic/storage'
import { environments } from '~/options/data'
</script>

<template>
  <div class="mt-4">
    <h1 class="text-lg font-bold">
      Environnement par défaut
    </h1>
    <select v-model="env" class="border border-gray-400 rounded px-2 py-1 mt-2 w-full">
      <option v-for="env in environments" :key="env.label" :value="env.value">
        {{ env.label }}
      </option>
    </select>
  </div>
</template>
