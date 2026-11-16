<script setup lang="ts">
import { FAQ_STATES, type FaqState, type ListQuery, MAX_Q } from '#shared/utils/listQuery'
import { type DepartmentOption, categoryOptions, stateLabel } from '~/utils/faqView'

const props = defineProps<{ query: ListQuery; departments: DepartmentOption[] }>()
const emit = defineEmits<{ search: [query: Omit<ListQuery, 'page'>] }>()

const q = ref('')
const department = ref('')
const category = ref('')
const state = ref<FaqState | ''>('')

// The form shows what the URL says, also after back and forward.
watch(
  () => props.query,
  (query) => {
    q.value = query.q ?? ''
    department.value = query.department ?? ''
    category.value = query.category ?? ''
    state.value = query.state ?? ''
  },
  { immediate: true },
)

const categories = computed(() => categoryOptions(props.departments, department.value || undefined, category.value))

// A category belongs to one department: changing the department clears it.
function chooseDepartment(code: string) {
  department.value = code
  category.value = ''
}

function submit() {
  emit('search', {
    q: q.value.trim() || undefined,
    department: department.value || undefined,
    category: category.value || undefined,
    state: state.value || undefined,
  })
}
</script>

<template>
  <form class="ff" role="search" @submit.prevent="submit">
    <input v-model="q" class="ff-q" type="search" :maxlength="MAX_Q" placeholder="ID・質問・回答で検索" aria-label="検索" />
    <select
      :value="department"
      class="ff-select"
      aria-label="部署"
      @change="chooseDepartment(($event.target as HTMLSelectElement).value)"
    >
      <option value="">すべての部署</option>
      <option v-for="d in departments" :key="d.code" :value="d.code">{{ d.name }}</option>
    </select>
    <select v-model="category" class="ff-select" aria-label="カテゴリ" :disabled="!department">
      <option value="">{{ department ? 'すべてのカテゴリ' : '部署を選ぶとカテゴリ' }}</option>
      <option v-for="c in categories" :key="c.value" :value="c.value">{{ c.label }}</option>
    </select>
    <select v-model="state" class="ff-select" aria-label="状態">
      <option value="">すべての状態</option>
      <option v-for="s in FAQ_STATES" :key="s" :value="s">{{ stateLabel(s) }}</option>
    </select>
    <button type="submit" class="ff-submit">検索</button>
  </form>
</template>

<style scoped>
.ff {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 16px;
}

.ff-q {
  flex: 1 1 240px;
}

.ff-q,
.ff-select {
  min-width: 0;
  padding: 6px 10px;
  border: 1px solid var(--line-strong);
  border-radius: var(--radius);
  background: var(--card);
  color: var(--ink);
  font: inherit;
}

.ff-select:disabled {
  color: var(--muted);
}

.ff-submit {
  padding: 6px 16px;
  border: 0;
  border-radius: var(--radius);
  background: var(--button);
  color: var(--on-button);
  font: inherit;
  font-weight: 700;
  cursor: pointer;
}

.ff-submit:hover {
  background: var(--button-hover);
}
</style>
