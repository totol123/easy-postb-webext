export const langs = [
  'ar',
  'de',
  'en',
  'es',
  'fr',
  'id',
  'it',
  'ja',
  'ko',
  'nl',
  'pl',
  'pt',
  'pt-br',
  'ru',
  'th',
  'tr',
  'zh',
  'vi',
] as const

export const langFlag = {
  'ar': 'ae',
  'de': 'de',
  'en': 'gb',
  'es': 'es',
  'fr': 'fr',
  'id': 'id',
  'it': 'it',
  'ja': 'jp',
  'ko': 'kr',
  'nl': 'nl',
  'pl': 'pl',
  'pt': 'pt',
  'pt-br': 'br',
  'ru': 'ru',
  'th': 'th',
  'tr': 'tr',
  'zh': 'cn',
  'vi': 'vn',
}

export function getLangFlag(lang: Lang) {
  return `https://flagcdn.com/w80/${langFlag[lang || 'en']}.png`
}

export type Lang = typeof langs[number]
