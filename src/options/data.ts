export interface Environment {
  label: string
  value: string
  version: 'NGA' | 'legacy'
}

export type PageUrl = {
  [key in Environment['version']]: string
}

export interface Page {
  label: string
  url: PageUrl
}

export const environments: Environment[] = [
  {
    label: 'Int3',
    value: 'https://int3-all.accor.com/a/fr.html',
    version: 'NGA',
  },
  {
    label: 'Rec1',
    value: 'https://rec1-secure.accor.com/',
    version: 'legacy',
  },
  {
    label: 'Rec2',
    value: 'https://rec2-secure.accor.com/',
    version: 'legacy',
  },
  {
    label: 'Rec3',
    value: 'https://rec3-secure.accor.com/',
    version: 'legacy',
  },
  {
    label: 'Env FMR',
    value: 'https://postb-{id}.dev-booking-factory-retain.aws.accor.com/',
    version: 'NGA',
  },
  {
    label: 'Local',
    value: 'http://localhost:5173/',
    version: 'NGA',
  },
]

export const pages: Page[] = [
  {
    label: 'Search',
    url: {
      NGA: '/search',
      legacy: '/search',
    },
  },
  {
    label: 'Confirmation',
    url: {
      NGA: '/confirmation',
      legacy: '/confirmation',
    },
  },
  {
    label: 'Cancel',
    url: {
      NGA: '/cancel',
      legacy: '/cancel',
    },
  },
  {
    label: 'Details',
    url: {
      NGA: '/details/{triptych}',
      legacy: '/details/{triptych}',
    },
  },
]
