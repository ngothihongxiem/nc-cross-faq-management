<script setup lang="ts">
import type { FaqState } from '#shared/utils/listQuery'
import StateBadge from '~/components/faq/StateBadge.vue'
import { formatDateTime } from '~/utils/faqView'

export interface FaqRow {
  id: string
  department: { code: string; name: string }
  category: string
  question: string
  state: FaqState
  updated_at: string
}

defineProps<{ items: FaqRow[] }>()
</script>

<template>
  <div class="ft-wrap">
    <table class="ft">
      <thead>
        <tr>
          <th>ID</th>
          <th>部署</th>
          <th>カテゴリ</th>
          <th>質問</th>
          <th>状態</th>
          <th>更新日</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in items" :key="item.id">
          <td class="ft-id">
            <NuxtLink :to="`/faqs/${encodeURIComponent(item.id)}`">{{ item.id }}</NuxtLink>
          </td>
          <td class="ft-nowrap">{{ item.department.name }}</td>
          <td>{{ item.category }}</td>
          <td class="ft-question">{{ item.question }}</td>
          <td><StateBadge :state="item.state" /></td>
          <td class="ft-nowrap ft-muted">{{ formatDateTime(item.updated_at) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.ft-wrap {
  overflow-x: auto;
  border: 1px solid var(--line);
  border-radius: var(--radius);
  background: var(--card);
}

.ft {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
}

.ft th,
.ft td {
  padding: 8px 12px;
  border-bottom: 1px solid var(--line);
  text-align: left;
  vertical-align: top;
}

.ft th {
  color: var(--muted);
  font-weight: 700;
  white-space: nowrap;
}

.ft tbody tr:last-child td {
  border-bottom: 0;
}

.ft-id a {
  color: var(--accent-ink);
  font-weight: 700;
  white-space: nowrap;
}

.ft-question {
  min-width: 280px;
}

.ft-nowrap {
  white-space: nowrap;
}

.ft-muted {
  color: var(--muted);
}
</style>
