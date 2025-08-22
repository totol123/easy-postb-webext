import { useWebExtensionStorage } from '~/composables/useWebExtensionStorage'

export const { data: storageDemo, dataReady: storageDemoReady } = useWebExtensionStorage('webext-demo', 'Storage Demo')

export const { data: lang, dataReady: langReady } = useWebExtensionStorage('lang', 'en')

export const { data: triptych, dataReady: triptychReady } = useWebExtensionStorage('triptych', 'mdH-8XFK2nxv2hrs9fqS-ynQsx1BoyRyr9aCdTEZx158l6RQt1Lj1GTBp7gEru_65I9sy6UzFaMTUe05lN6-aIG7Jcw')

export const { data: env, dataReady: envReady } = useWebExtensionStorage('env', 'FMR')
