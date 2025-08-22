<script setup lang="ts">
import { useBrowserLocation, useToggle } from '@vueuse/core'

const [show, toggle] = useToggle(false)

const currentUrl = useBrowserLocation()

// Check if the current domain is allowed
const isAllowedDomain = computed(() => {
  if (!currentUrl.value?.hostname)
    return false

  const hostname = currentUrl.value.hostname.toLowerCase()

  // Allow .accor.com domains and localhost
  return hostname.endsWith('.accor.com')
    || hostname === 'localhost'
    || hostname === '127.0.0.1'
})
</script>

<template>
  <div
    v-if="isAllowedDomain"
    class="fixed right-0 bottom-0 m-5 z-100 flex items-end font-sans select-none leading-1em"
  >
    <div
      v-show="show"
      class="bg-white text-gray-800 rounded-lg shadow-2xl h-min "
      p="x-4 y-2"
      m="y-auto r-2"
      transition="opacity duration-300"
      :class="show ? 'opacity-100' : 'opacity-0'"
    >
      <h1 class="text-lg text-center text-bold">
        Easy PostB WebExt
      </h1>
      <Content :url="currentUrl?.href" />
    </div>
    <button
      class="flex rounded-full shadow cursor-pointer border-none text-white p-4 text-lg text-bold"
      bg="teal-600 hover:teal-700"
      @click="toggle()"
    >
      PostB-Tools
    </button>
  </div>
</template>
