import { environments, pages } from '~/options/data'

function createUrlPattern(templateUrl: string): RegExp {
  const escaped = templateUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

  const pattern = escaped.replace(/\\\{[^}]+\\\}/g, '[^/]+')

  return new RegExp(pattern)
}

function matchesUrlTemplate(currentUrl: string, templateUrl: string): boolean {
  const pattern = createUrlPattern(templateUrl)
  return pattern.test(currentUrl)
}

export function useUrlParams(url: Ref<string | undefined>) {
  const env = computed(() => {
    if (!url.value)
      return

    return environments.find((env) => {
      if (!url.value)
        return false

      if (env.value.includes('{')) {
        return matchesUrlTemplate(url.value, env.value)
      }

      return url.value.includes(env.value)
    })
  })

  const route = computed(() => {
    if (!url.value)
      return
    const urlType = env.value?.version

    if (!urlType)
      return

    return pages.find((page) => {
      if (!url.value)
        return false

      const currentUrl = url.value
      const templateUrl = page.url[urlType]

      return templateUrl.includes('{')
        ? matchesUrlTemplate(currentUrl, templateUrl)
        : currentUrl.includes(templateUrl)
    })?.label
  })

  const triptych = computed(() => '')
  const lang = computed(() => '')

  return { env, triptych, lang, route }
}
