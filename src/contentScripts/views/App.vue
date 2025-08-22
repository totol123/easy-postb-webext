<script setup lang="ts">
import { useBrowserLocation, useToggle } from '@vueuse/core'
import { onMessage } from 'webext-bridge/content-script'

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

// Listen for toggle command from background script
onMessage('toggle-extension', () => {
  console.log('toggle-extension', isAllowedDomain.value)
  if (isAllowedDomain.value) {
    toggle()
  }
})
</script>

<template>
  <div
    v-if="isAllowedDomain"
    class="fixed right-0 bottom-0 m-5 z-100 flex items-end flex-col gap-4 z-[9999]! font-sans select-none leading-1em max-w-[50vw] md:max-w-[25vw]"
  >
    <div
      v-show="show"
      class="bg-white text-gray-800 rounded-lg shadow-2xl h-min "
      p="x-4 y-2"
      m="y-auto r-2"
      transition="opacity duration-300"
      :class="show ? 'opacity-100' : 'opacity-0'"
    >
      <h1 class="text-lg text-center font-bold">
        EZ PostB WebExt
      </h1>
      <Content :url="currentUrl?.href" />
    </div>
    <button
      class="hover:opacity-80 hover:scale-105 transition-all duration-300 flex rounded-full shadow cursor-pointer border-none text-white text-lg text-bold w-24 h-24"
      @click="toggle()"
    >
      <img src="/assets/icon-512.png" class="w-full h-full">
    </button>
  </div>
</template>
