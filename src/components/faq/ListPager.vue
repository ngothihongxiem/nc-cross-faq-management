<script setup lang="ts">
import { pageCount } from '~/utils/faqView'

const props = defineProps<{ page: number; total: number; perPage: number }>()
const emit = defineEmits<{ go: [page: number] }>()

const pages = computed(() => pageCount(props.total, props.perPage))
</script>

<template>
  <nav class="lp" aria-label="ページ">
    <span class="lp-total">全 {{ total }} 件</span>
    <button type="button" class="lp-button" :disabled="page <= 1" @click="emit('go', page - 1)">前へ</button>
    <span class="lp-where">{{ page }} / {{ pages }}</span>
    <button type="button" class="lp-button" :disabled="page >= pages" @click="emit('go', page + 1)">次へ</button>
  </nav>
</template>

<style scoped>
.lp {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 16px;
}

.lp-total {
  margin-right: auto;
  color: var(--muted);
}

.lp-button {
  padding: 4px 12px;
  border: 1px solid var(--line-strong);
  border-radius: var(--radius);
  background: var(--card);
  color: var(--ink);
  font: inherit;
  cursor: pointer;
}

.lp-button:disabled {
  color: var(--muted);
  cursor: default;
  opacity: 0.6;
}
</style>
