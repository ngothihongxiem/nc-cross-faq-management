<script setup lang="ts">
import { APP_NAME } from '~/utils/pageTitle'
</script>

<template>
  <header class="ah">
    <NuxtLink to="/" class="ah-name">{{ APP_NAME }}</NuxtLink>
  </header>
</template>

<style scoped>
.ah {
  position: sticky;
  top: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  height: var(--header-height);
  padding: 0 var(--gutter);
  border-top: 4px solid var(--accent);
  border-bottom: 1px solid var(--line);
  background: var(--card);
  box-sizing: border-box;
}

.ah-name {
  color: var(--ink);
  font-weight: 700;
  font-size: 16px;
  text-decoration: none;
}
</style>
