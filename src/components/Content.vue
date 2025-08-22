<script setup lang="ts">
import { useUrlParams } from '~/composables/useUrlParams'
import { buildEnvUrl, buildPageUrl } from '~/logic/buildUrl'
import { lang as defaultLang, triptych as defaultTriptych, storageDemo } from '~/logic/storage'
import { environments, pages } from '~/options/data'

const props = defineProps<{
  url: string | undefined
}>()

const { env, triptych, lang, route } = useUrlParams(toRef(props, 'url'))
const copyTriptychText = ref('Copier le triptych')

function openOptionsPage() {
  browser.runtime.openOptionsPage()
}

function copyTriptych() {
  navigator.clipboard.writeText(triptych.value || '')
  copyTriptychText.value = '✅'
  setTimeout(() => {
    copyTriptychText.value = 'Copier le triptych'
  }, 2000)
}

const params = computed(() => ([
  { param: 'triptych', value: triptych.value || defaultTriptych.value },
  { param: 'lang', value: lang.value || defaultLang.value },
]))
</script>

<template>
  <main class="w-full px-4 py-5 text-left text-gray-700">
    <Logo />
    <div class="grid grid-cols-[1fr_2fr] gap-2">
      <h2 class="text-lg font-bold">
        URL
      </h2>
      <span class="truncate max-w-[3000px]">
        {{ props.url }}
      </span>
      <h2 class="text-lg font-bold">
        Version
      </h2>
      <span class="truncate max-w-[3000px]">
        {{ env?.version }}
      </span>
      <h2 class="text-lg font-bold">
        Env
      </h2>
      <span class="truncate max-w-[3000px]">
        {{ env?.label }}
      </span>
      <h2 class="text-lg font-bold">
        Triptych
      </h2>
      <span class="truncate max-w-[3000px]">
        {{ triptych }}
      </span>
      <h2 class="text-lg font-bold">
        Langue
      </h2>
      <span class="truncate max-w-[3000px]">
        {{ lang }}
      </span>
      <h2 class="text-lg font-bold">
        Route
      </h2>
      <span class="truncate max-w-[3000px]">
        {{ route?.label }}
      </span>
    </div>
    <button class="btn mt-2 w-full" :disabled="!triptych" @click="copyTriptych">
      {{ copyTriptychText }}
    </button>

    <div class="mt-4">
      <h1 class="text-lg font-bold">
        Environnements
      </h1>
      <ul class="grid grid-cols-2 gap-2">
        <li v-for="env in environments" :key="env.label">
          <a :href="buildEnvUrl(route, env, ...params)" class="btn w-full text-center">
            {{ env.label }}
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
          <a :href="buildPageUrl(page, env, ...params)" class="btn w-full text-center">
            {{ page.label }}
          </a>
        </li>
      </ul>
    </div>

    <DefaultLang />
    <DefaultTriptych />

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
