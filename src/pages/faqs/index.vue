<script setup lang="ts">
import { type ListQuery, PER_PAGE, parseListQuery, toRouteQuery } from '#shared/utils/listQuery'
import PageHeading from '~/components/common/PageHeading.vue'
import FaqFilters from '~/components/faq/FaqFilters.vue'
import FaqTable from '~/components/faq/FaqTable.vue'
import ListPager from '~/components/faq/ListPager.vue'

useHead({ title: 'FAQ' })

const route = useRoute()
const query = computed(() => parseListQuery(route.query))
const filtered = computed(() => Boolean(query.value.q || query.value.department || query.value.category || query.value.state))

const { data, status, error, refresh } = await useFetch('/api/faqs', {
  query: computed(() => toRouteQuery(query.value)),
})
const { data: departments, refresh: refreshDepartments } = await useFetch('/api/departments', {
  default: () => [],
})

// Both: the department filter fails with the list when the backend is down.
function retry() {
  return Promise.all([refresh(), refreshDepartments()])
}

function search(next: Omit<ListQuery, 'page'>) {
  navigateTo({ query: toRouteQuery({ ...next, page: 1 }) })
}

async function go(page: number) {
  await navigateTo({ query: toRouteQuery({ ...query.value, page }) })
  // Paging happens at the bottom of the list: start the next page at its top.
  window.scrollTo({ top: 0 })
}
</script>

<template>
  <div>
    <PageHeading title="FAQ" />
    <FaqFilters :query="query" :departments="departments" @search="search" />

    <div v-if="error" class="fl-note fl-note--error" role="alert">
      FAQ を読み込めませんでした。
      <button type="button" class="fl-link" @click="retry()">再読み込み</button>
    </div>
    <p v-else-if="status === 'pending' && !data" class="fl-note">読み込み中…</p>
    <template v-else-if="data">
      <FaqTable v-if="data.items.length" :items="data.items" />
      <p v-else-if="data.total > 0" class="fl-note">
        このページに FAQ はありません。
        <button type="button" class="fl-link" @click="go(1)">最初のページへ</button>
      </p>
      <p v-else class="fl-note">
        該当する FAQ はありません。
        <NuxtLink v-if="filtered" to="/faqs" class="fl-link">条件をクリア</NuxtLink>
      </p>
      <ListPager v-if="data.total > 0" :page="query.page" :total="data.total" :per-page="PER_PAGE" @go="go" />
    </template>
  </div>
</template>

<style scoped>
.fl-note {
  padding: 16px;
  border: 1px solid var(--line);
  border-radius: var(--radius);
  background: var(--card);
  color: var(--muted);
}

.fl-note--error {
  border-color: transparent;
  background: var(--danger-wash);
  color: var(--danger);
}

.fl-link {
  margin-left: 8px;
  padding: 0;
  border: 0;
  background: none;
  color: var(--accent-ink);
  font: inherit;
  text-decoration: underline;
  cursor: pointer;
}
</style>
