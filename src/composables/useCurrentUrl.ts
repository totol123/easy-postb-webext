export function useCurrentUrl() {
  const currentUrl = ref()

  onMounted(async () => {
    const tabs = await browser.tabs.query({ active: true, currentWindow: true })
    currentUrl.value = tabs[0].url
  })

  return currentUrl
}
