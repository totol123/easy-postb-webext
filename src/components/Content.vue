<script setup lang="ts">
import { useUrlParams } from '~/composables/useUrlParams'
import { buildEnvUrl, buildPageUrl } from '~/logic/buildUrl'
import { lang as defaultLang, triptych as defaultTriptych } from '~/logic/storage'
import { envFMR, environments, pages } from '~/options/data'
import type { Lang } from '~/options/lang'
import { getLangFlag, langs } from '~/options/lang'

const props = defineProps<{
  url: string | undefined
}>()

const { env, triptych, lang, route, fmrId } = useUrlParams(toRef(props, 'url'))
const copyTriptychText = ref('Copier le triptych')

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

const envFMRUrl = ref('POSTB-')
</script>

<template>
  <main class="w-full px-4 py-5 text-left text-gray-700">
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
      <div v-if="env?.version" class="flex items-center">
        <span
          v-if="env.version === 'NGA'"
          class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200"
        >
          NGA
        </span>
        <span
          v-else-if="env.version === 'legacy'"
          class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800 border border-orange-200"
        >

          Legacy
        </span>
        <span v-else class="text-gray-500">{{ env.version }}</span>
      </div>
      <h2 class="text-lg font-bold">
        Env
      </h2>
      <span class="truncate max-w-[3000px]">
        {{ env?.label }}<span v-if="fmrId">({{ fmrId }})</span>
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
      <div class="flex gap-2 items-center">
        <img v-if="lang && langs.includes(lang as Lang)" :src="getLangFlag(lang as Lang)" class="w-6 h-6 rounded-full">
        <span class="truncate max-w-[3000px]">
          {{ lang }}
        </span>
      </div>
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
          <a v-if="buildEnvUrl(route, env, ...params)" target="_blank" :href="buildEnvUrl(route, env, ...params)" class="btn w-full text-center">
            {{ env.label }}
          </a>
        </li>
      </ul>
    </div>
    <div class="mt-4">
      <h1 class="text-lg font-bold">
        Env FMR
      </h1>
      <li class="flex gap-2">
        <input v-model="envFMRUrl" class="border border-gray-400 rounded px-2 py-1 mt-2 w-full">
        <a
          target="_blank"
          :href="buildEnvUrl(route, {
            ...envFMR,
            value: envFMR.value.replace('{id}', envFMRUrl),
          }, ...params)" class="btn w-full text-center flex items-center justify-center"
        >
          Aller à l'env {{ envFMRUrl }}
        </a>
      </li>
    </div>

    <div class="mt-4">
      <h1 class="text-lg font-bold">
        Pages
      </h1>
      <ul class="grid grid-cols-2 gap-2">
        <li v-for="page in pages" :key="page.label">
          <a
            :href="buildPageUrl(page,
                                {
                                  ...envFMR,
                                  value: envFMR.value.replace('{id}', fmrId || ''),
                                },
                                ...params)"
            class="btn w-full text-center"
          >
            {{ page.label }}
          </a>
        </li>
      </ul>
    </div>

    <DefaultTriptych />
    <DefaultLang />
    <DefaultEnv />
  </main>
</template>

<style>
@import '~/styles/main.css';
@import '@unocss/reset/tailwind.css';
</style>
