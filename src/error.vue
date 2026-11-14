<script setup lang="ts">
import type { NuxtError } from '#app'
import AppHeader from '~/components/layout/AppHeader.vue'
import { errorText } from '~/utils/errorPage'
import { pageTitle } from '~/utils/pageTitle'

const props = defineProps<{ error: NuxtError }>()

const text = computed(() => errorText(props.error.statusCode))

// Rendered in place of app.vue, so it sets the title template itself.
useHead({ title: () => text.value.title, titleTemplate: (title) => pageTitle(title) })

function backToFaqs() {
  clearError({ redirect: '/faqs' })
}
</script>

<template>
  <div class="ep">
    <AppHeader />
    <main class="ep-main">
      <p class="ep-code">{{ error.statusCode }}</p>
      <h1 class="ep-title">{{ text.title }}</h1>
      <p class="ep-lead">{{ text.lead }}</p>
      <button type="button" class="ep-back" @click="backToFaqs">FAQ へ戻る</button>
    </main>
  </div>
</template>

<style scoped>
.ep {
  min-height: 100vh;
}

.ep-main {
  padding: 48px var(--gutter);
}

.ep-code {
  margin: 0;
  color: var(--muted);
  font-size: 14px;
}

.ep-title {
  margin: 4px 0 8px;
  font-size: 22px;
}

.ep-lead {
  margin: 0 0 24px;
  color: var(--muted);
}

.ep-back {
  padding: 8px 16px;
  border: 0;
  border-radius: var(--radius);
  background: var(--button);
  color: var(--on-button);
  font: inherit;
  font-weight: 700;
  cursor: pointer;
}

.ep-back:hover {
  background: var(--button-hover);
}
</style>
