<script setup lang="ts">
import { storageDemo } from '~/logic/storage'
import { useCurrentUrl } from '~/composables/useCurrentUrl'
import { environments, pages } from '~/options/data'

function openOptionsPage() {
  browser.runtime.openOptionsPage()
}

const currentUrl = useCurrentUrl()

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
      {{ currentUrl }}
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

    <SharedSubtitle />

    <button class="btn mt-2" @click="openOptionsPage">
      Open Options
    </button>
    <div class="mt-2">
      <span class="opacity-50">Storage:</span> {{ storageDemo }}
    </div>
  </main>
</template>
