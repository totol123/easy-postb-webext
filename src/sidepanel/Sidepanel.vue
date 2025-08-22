<script setup lang="ts">
import { useCurrentUrl } from '~/composables/useCurrentUrl'

const currentUrl = useCurrentUrl()
</script>

<template>
  <Content :url="currentUrl" />
</template>
