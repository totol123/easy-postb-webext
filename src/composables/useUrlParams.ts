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

  const afterUrl = computed(() => {
    if (!env.value || !url.value)
      return

    return url.value.replace(env.value.value, '')
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
    })
  })

  const searchForArg = (template: string, url: string, arg: string) => {
    if (!template.includes(arg))
      return

    const findArgPositionInUrl = template.split('/')

    const position = findArgPositionInUrl.findIndex(part => part.includes(arg))

    if (position === -1)
      return

    const argValue = url.split('/')[position]

    return argValue.replace('index.', '').replace('.shtml#', '')
  }

  const triptych = computed(() => {
    if (!url.value || !env.value || !route.value || !afterUrl.value)
      return

    return searchForArg(route.value.url[env.value.version], afterUrl.value, 'triptych')
  })

  const lang = computed(() => {
    if (!url.value || !env.value || !route.value || !afterUrl.value)
      return

    return searchForArg(route.value.url[env.value.version], afterUrl.value, 'lang')
  })

  return { env, triptych, lang, route }
}
