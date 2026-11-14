<script setup lang="ts">
import type { FaqState } from '#shared/utils/listQuery'
import { stateLabel } from '~/utils/faqView'

defineProps<{ state: FaqState }>()
</script>

<template>
  <span class="sb" :class="`sb--${state}`">{{ stateLabel(state) }}</span>
</template>

<style scoped>
.sb {
  display: inline-block;
  padding: 1px 8px;
  border: 1px solid var(--line-strong);
  border-radius: 999px;
  color: var(--muted);
  font-size: 12px;
  white-space: nowrap;
}

.sb--published {
  border-color: transparent;
  background: var(--accent-wash);
  color: var(--accent-ink);
}

.sb--retired {
  border-color: transparent;
  background: var(--danger-wash);
  color: var(--danger);
}
</style>
