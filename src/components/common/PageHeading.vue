<script setup lang="ts">
defineProps<{ title: string }>()
</script>

<template>
  <div class="ph">
    <h1 class="ph-title">{{ title }}</h1>
    <slot />
  </div>
</template>

<style scoped>
.ph {
  margin-bottom: 20px;
}

.ph-title {
  margin: 0 0 4px;
  font-size: 22px;
  font-weight: 700;
}
</style>
