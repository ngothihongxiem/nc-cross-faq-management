<script setup lang="ts">
import StateBadge from '~/components/faq/StateBadge.vue'
import { formatDateTime } from '~/utils/faqView'

const route = useRoute()
const id = computed(() => String(route.params.id))

const { data: faq, error, refresh } = await useFetch(() => `/api/faqs/${encodeURIComponent(id.value)}`)

// An unknown ID is the app's 404 page.
if (error.value?.statusCode === 404) {
  throw createError({ statusCode: 404, statusMessage: 'Not found', fatal: true })
}

useHead({ title: () => id.value })
</script>

<template>
  <div class="fd">
    <NuxtLink to="/faqs" class="fd-back">← FAQ 一覧</NuxtLink>

    <div v-if="error" class="fd-note" role="alert">
      FAQ を読み込めませんでした。
      <button type="button" class="fd-link" @click="refresh()">再読み込み</button>
    </div>

    <template v-else-if="faq">
      <div class="fd-head">
        <h1 class="fd-id">{{ faq.id }}</h1>
        <StateBadge :state="faq.state" />
      </div>
      <dl class="fd-meta">
        <div><dt>部署</dt><dd>{{ faq.department.name }}</dd></div>
        <div><dt>カテゴリ</dt><dd>{{ faq.category }}</dd></div>
        <div><dt>バージョン</dt><dd>{{ faq.version }}</dd></div>
        <div><dt>更新日</dt><dd>{{ formatDateTime(faq.updated_at) }}</dd></div>
      </dl>

      <section class="fd-card">
        <h2 class="fd-label">質問</h2>
        <p class="fd-text">{{ faq.question }}</p>
        <h2 class="fd-label">回答</h2>
        <p class="fd-text">{{ faq.answer }}</p>
      </section>

      <section class="fd-card">
        <h2 class="fd-label">言い回し</h2>
        <ul v-if="faq.phrasings.length" class="fd-list">
          <li v-for="p in faq.phrasings" :key="p">{{ p }}</li>
        </ul>
        <p v-else class="fd-none">なし</p>
        <h2 class="fd-label">キーワード</h2>
        <ul v-if="faq.keywords.length" class="fd-list">
          <li v-for="k in faq.keywords" :key="k">{{ k }}</li>
        </ul>
        <p v-else class="fd-none">なし</p>
        <h2 class="fd-label">出典</h2>
        <ul v-if="faq.references.length" class="fd-list">
          <li v-for="(r, n) in faq.references" :key="n">
            <a v-if="r.url" :href="r.url" target="_blank" rel="noopener noreferrer">{{ r.title }}</a>
            <span v-else>{{ r.title }}</span>
            <span v-if="r.location" class="fd-none">（{{ r.location }}）</span>
          </li>
        </ul>
        <p v-else class="fd-none">なし</p>
        <h2 class="fd-label">備考 <span class="fd-none">— 編集者用、従業員には表示されません</span></h2>
        <p class="fd-text" :class="{ 'fd-none': !faq.note }">{{ faq.note || 'なし' }}</p>
      </section>

      <section class="fd-card">
        <h2 class="fd-label">版の履歴</h2>
        <details v-for="v in faq.versions" :key="v.version" class="fd-version" :open="v.version === faq.version">
          <summary>
            バージョン {{ v.version }} <span class="fd-none">{{ formatDateTime(v.created_at) }}</span>
          </summary>
          <p class="fd-text"><strong>質問</strong>　{{ v.question }}</p>
          <p class="fd-text"><strong>回答</strong>　{{ v.answer }}</p>
          <p v-if="v.note" class="fd-text fd-none">備考　{{ v.note }}</p>
        </details>
      </section>
    </template>
  </div>
</template>

<style scoped>
.fd {
  max-width: 880px;
}

.fd-back {
  color: var(--accent-ink);
  font-size: 14px;
}

.fd-head {
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 12px 0 8px;
}

.fd-id {
  margin: 0;
  font-size: 22px;
}

.fd-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 4px 24px;
  margin: 0 0 16px;
  color: var(--muted);
  font-size: 14px;
}

.fd-meta div {
  display: flex;
  gap: 6px;
}

.fd-meta dd {
  margin: 0;
  color: var(--ink);
}

.fd-card {
  margin-bottom: 16px;
  padding: 16px 20px;
  border: 1px solid var(--line);
  border-radius: var(--radius);
  background: var(--card);
}

.fd-label {
  margin: 12px 0 4px;
  color: var(--muted);
  font-size: 13px;
  font-weight: 700;
}

.fd-label:first-child {
  margin-top: 0;
}

/* Answers keep their line breaks, as employees see them. */
.fd-text {
  margin: 0 0 8px;
  white-space: pre-wrap;
  overflow-wrap: anywhere;
}

.fd-list {
  margin: 0 0 8px;
  padding-left: 20px;
}

/* Tailwind's reset makes links look like text. */
.fd-list a {
  color: var(--accent-ink);
  text-decoration: underline;
}

.fd-none {
  color: var(--muted);
  font-weight: 400;
}

.fd-version {
  padding: 8px 0;
  border-top: 1px solid var(--line);
}

.fd-version summary {
  cursor: pointer;
}

.fd-note {
  margin-top: 12px;
  padding: 16px;
  border-radius: var(--radius);
  background: var(--danger-wash);
  color: var(--danger);
}

.fd-link {
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
