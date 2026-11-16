<script setup lang="ts">
import { NAV_ITEMS, isActive } from '~/utils/navigation'

const route = useRoute()
</script>

<template>
  <nav class="as" aria-label="メニュー">
    <NuxtLink
      v-for="item in NAV_ITEMS"
      :key="item.to"
      :to="item.to"
      class="as-item"
      :class="{ 'as-item--active': isActive(item.to, route.path) }"
      :aria-current="isActive(item.to, route.path) ? 'page' : undefined"
    >
      {{ item.label }}
    </NuxtLink>
  </nav>
</template>

<style scoped>
.as {
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: var(--sidebar-width);
  padding: 16px 12px;
  border-right: 1px solid var(--line);
  background: var(--card);
  box-sizing: border-box;
}

.as-item {
  padding: 8px 12px;
  border-radius: var(--radius);
  color: var(--muted);
  text-decoration: none;
}

.as-item:hover {
  background: var(--paper);
  color: var(--ink);
}

.as-item--active,
.as-item--active:hover {
  background: var(--accent-wash);
  color: var(--accent-ink);
  font-weight: 700;
}

/* Narrow screens: the menu becomes a row under the header. */
@media (max-width: 760px) {
  .as {
    flex-direction: row;
    width: auto;
    padding: 8px var(--gutter);
    border-right: 0;
    border-bottom: 1px solid var(--line);
  }
}
</style>
