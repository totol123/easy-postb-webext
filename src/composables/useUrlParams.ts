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

    const env = environments.find((env) => {
      if (!url.value)
        return false

      if (env.value.includes('{')) {
        return matchesUrlTemplate(url.value, env.value)
      }

      return url.value.includes(env.value)
    })

    return env
  })

  const afterUrl = computed(() => {
    if (!env.value || !url.value)
      return

    const envValue = env.value.value

    // Handle environment URLs with wildcards like {id}
    if (envValue.includes('{')) {
      // Create a regex pattern from the environment template
      // Replace wildcards with regex patterns to match any value
      let pattern = envValue.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') // Escape special chars
      pattern = pattern.replace(/\\\{[^}]+\\\}/g, '[^/]+') // Replace {id} with [^/]+ to match any non-slash chars

      const regex = new RegExp(`^${pattern}`)
      const match = url.value.match(regex)

      if (match) {
        // Remove the matched environment part to get the path
        return url.value.replace(match[0], '')
      }

      // Fallback: extract protocol and host from actual URL
      try {
        const urlObj = new URL(url.value)
        return urlObj.pathname + urlObj.search + urlObj.hash
      }
      catch {
        return url.value
      }
    }
    else {
      // Simple case: no wildcards, direct replacement
      return url.value.replace(envValue, '')
    }
  })

  const fmrId = computed(() => {
    if (!url.value || !env.value)
      return

    if (env.value.label === 'FMR') {
      return url.value
        .replace(env.value.value, '')
        .replace('https://', '')
        .replace(afterUrl.value || '', '')
        .replace('.dev-booking-factory-retain.aws.accor.com', '')
    }

    return undefined
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
    if (!template.includes(`{${arg}}`))
      return

    const templateParts = template.split('/')
    const urlParts = url.split('/')

    const position = templateParts.findIndex(part => part.includes(`{${arg}}`))

    if (position === -1 || !urlParts[position])
      return

    let argValue = urlParts[position]

    // Handle special cases for legacy URLs
    if (argValue.includes('.')) {
      // For patterns like "index.{lang}.shtml#" -> extract the lang part
      const templatePart = templateParts[position]
      if (templatePart.includes('index.') && templatePart.includes('.shtml')) {
        // Extract language from "index.fr.shtml#"
        const match = argValue.match(/index\.([^.]+)\.shtml/)
        if (match) {
          argValue = match[1]
        }
      }
    }

    return argValue
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

  return { env, triptych, lang, route, fmrId }
}
