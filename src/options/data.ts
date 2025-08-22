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
    value: 'https://int3-all.accor.com',
    version: 'NGA',
  },
  {
    label: 'Rec1',
    value: 'https://rec1-secure.accor.com',
    version: 'legacy',
  },
  {
    label: 'Rec2',
    value: 'https://rec2-secure.accor.com',
    version: 'legacy',
  },
  {
    label: 'Rec3',
    value: 'https://rec3-secure.accor.com',
    version: 'legacy',
  },
  {
    label: 'Env FMR',
    value: 'https://postb-{id}.dev-booking-factory-retain.aws.accor.com',
    version: 'NGA',
  },
  {
    label: 'Local',
    value: 'http://localhost:5173',
    version: 'NGA',
  },
]

export const pages: Page[] = [
  {
    label: 'Search',
    url: {
      NGA: '/my-stay/{lang}/search',
      legacy: '/managebookings/index.{lang}.shtml#/search',
    },
  },
  {
    label: 'Confirmation',
    url: {
      NGA: '/my-stay/{lang}/confirmation/{triptych}',
      legacy: '/managebookings/index.{lang}.shtml#/payment/confirmation/{triptych}',
    },
  },
  {
    label: 'Cancel',
    url: {
      NGA: '/my-stay/{lang}/cancel/{triptych}',
      legacy: '/managebookings/index.{lang}.shtml#/cancellation/{triptych}',
    },
  },
  {
    label: 'Details',
    url: {
      NGA: '/my-stay/{lang}/details/{triptych}',
      legacy: '/managebookings/index.{lang}.shtml#/details/{triptych}',
    },
  },
  {
    label: 'Options',
    url: {
      NGA: '/my-stay/{lang}/options/{triptych}',
      legacy: '/managebookings/index.{lang}.shtml#/options/{triptych}',
    },
  },
]
