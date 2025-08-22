import type { Environment, Page } from '~/options/data'

export function buildPageUrl(page: Page | undefined, env: Environment | undefined, ...params: { param: string, value: string }[]) {
  if (!page || !env)
    return

  let url = page.url[env?.version || 'NGA']

  for (const param of params) {
    url = url.replace(`{${param.param}}`, param.value)
  }

  return `${env?.value}${url}`
}

export function buildEnvUrl(page: Page | undefined, env: Environment | undefined, ...params: { param: string, value: string }[]) {
  if (!page || !env)
    return

  let url = page.url[env?.version || 'NGA']

  for (const param of params) {
    url = url.replace(`{${param.param}}`, param.value)
  }

  return `${env?.value}${url}`
}
