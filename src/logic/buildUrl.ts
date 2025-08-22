import { type Environment, type Page, environments } from '~/options/data'
import { env as defaultEnv } from '~/logic/storage'

export function buildPageUrl(page: Page | undefined, env: Environment | undefined, ...params: { param: string, value: string }[]) {
  if (!page)
    return

  const envFallback = env || environments.find(e => e.value === defaultEnv.value)

  let url = page.url[envFallback?.version || 'NGA']

  for (const param of params) {
    url = url.replace(`{${param.param}}`, param.value)
  }

  return `${envFallback?.value}${url}`
}
