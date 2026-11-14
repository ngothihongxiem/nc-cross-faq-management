<script setup lang="ts">
import AppHeader from '~/components/layout/AppHeader.vue'
import AppSidebar from '~/components/layout/AppSidebar.vue'
</script>

<template>
  <div class="shell">
    <AppHeader />
    <div class="shell-body">
      <AppSidebar />
      <main class="shell-main">
        <slot />
      </main>
    </div>
  </div>
</template>

<style scoped>
.shell {
  min-height: 100vh;
}

.shell-body {
  display: flex;
  min-height: calc(100vh - var(--header-height));
}

.shell-main {
  flex: 1;
  min-width: 0;
  padding: var(--gutter);
}

@media (max-width: 760px) {
  .shell-body {
    flex-direction: column;
  }
}
</style>
