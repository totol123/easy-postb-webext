<script setup lang="ts">
import { useBrowserLocation, useToggle } from '@vueuse/core'

const [show, toggle] = useToggle(false)

const currentUrl = useBrowserLocation()
</script>

<template>
  <div class="fixed right-0 bottom-0 m-5 z-100 flex items-end font-sans select-none leading-1em">
    <div
      v-show="show"
      class="bg-white text-gray-800 rounded-lg shadow h-min "
      p="x-4 y-2"
      m="y-auto r-2"
      transition="opacity duration-300"
      :class="show ? 'opacity-100' : 'opacity-0'"
    >
      <h1 class="text-lg">
        Easy PostB WebExt
      </h1>
      <button class="btn">
        test
      </button>
      <Content :url="currentUrl?.href" />
    </div>
    <button
      class="flex w-10 h-10 rounded-full shadow cursor-pointer border-none"
      bg="teal-600 hover:teal-700"
      @click="toggle()"
    >
      <pixelarticons-power class="block m-auto text-white text-lg" />
    </button>
  </div>
</template>
