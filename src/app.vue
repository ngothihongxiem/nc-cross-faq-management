<script setup lang="ts">
import { pageTitle } from '~/utils/pageTitle'

useHead({ titleTemplate: (title) => pageTitle(title) })
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
