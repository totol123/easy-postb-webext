export function useCurrentUrl() {
  const currentUrl = ref<string | undefined>(undefined)

  const getCurrentUrl = async () => {
    try {
      // Check if we're in a content script context
      if (typeof window !== 'undefined' && window.location && window.location.href.startsWith('http')) {
        // In content script, we can get the current URL directly
        return window.location.href
      }
      else {
        // In popup/sidepanel/options context, use browser API
        if (typeof browser !== 'undefined' && browser.tabs) {
          const tabs = await browser.tabs.query({ active: true, currentWindow: true })
          return tabs[0]?.url
        }
      }
    }
    catch (error) {
      console.error('Failed to get current URL:', error)
      return undefined
    }
  }

  const updateCurrentUrl = async () => {
    currentUrl.value = await getCurrentUrl()
  }

  onMounted(async () => {
    await updateCurrentUrl()

    if (typeof browser !== 'undefined' && browser.tabs) {
      browser.tabs.onActivated.addListener(updateCurrentUrl)

      browser.tabs.onUpdated.addListener((tabId, changeInfo, _tab) => {
        if (changeInfo.url || changeInfo.status === 'complete') {
          updateCurrentUrl()
        }
      })
    }
  })

  onUnmounted(() => {
    if (typeof browser !== 'undefined' && browser.tabs) {
      try {
        browser.tabs.onActivated.removeListener(updateCurrentUrl)
        browser.tabs.onUpdated.removeListener(updateCurrentUrl)
      }
      catch {
      }
    }
  })

  return currentUrl
}
