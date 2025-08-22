<script setup lang="ts">
import { storageDemo } from '~/logic/storage'
import { environments, pages } from '~/options/data'

defineProps<{
  url: string
}>()

function openOptionsPage() {
  browser.runtime.openOptionsPage()
}

const hasUrlATriptych = computed(() => {
  return false
})
</script>

<template>
  <main class="w-full px-4 py-5 text-left text-gray-700">
    <Logo />
    <h1 class="text-lg font-bold">
      URL Actuelle
    </h1>
    <div class="flex flex-col">
      <span class="truncate max-w-[3000px]">
        {{ url }}
      </span>
      <button class="btn mt-2" :disabled="!hasUrlATriptych" @click="openOptionsPage">
        Copier le triptych
      </button>
    </div>

    <div class="mt-4">
      <h1 class="text-lg font-bold">
        Environnements
      </h1>
      <ul class="grid grid-cols-2 gap-2">
        <li v-for="environment in environments" :key="environment.label">
          <a :href="environment.value" class="btn w-full text-center">
            {{ environment.label }}
          </a>
        </li>
      </ul>
    </div>

    <div class="mt-4">
      <h1 class="text-lg font-bold">
        Pages
      </h1>
      <ul class="grid grid-cols-2 gap-2">
        <li v-for="page in pages" :key="page.label">
          <a :href="page.label" class="btn w-full text-center">
            {{ page.label }}
          </a>
        </li>
      </ul>
    </div>

    <div class="mt-4">
      <h1 class="text-lg font-bold">
        Langue
      </h1>
      <LangInput />
    </div>

    <div class="mt-4">
      <h1 class="text-lg font-bold">
        Options
      </h1>
      <button class="btn mt-2" @click="openOptionsPage">
        Plus d'options
      </button>
    </div>

    <div class="mt-4">
      <div class="mt-2">
        <span class="opacity-50">Storage:</span> {{ storageDemo }}
      </div>
    </div>
  </main>
</template>

<style>
@import '~/styles/main.css';
@import '@unocss/reset/tailwind.css';
</style>
