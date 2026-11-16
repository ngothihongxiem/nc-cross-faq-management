# nc-cross-faq-management

The management app of 管理部横断FAQ: where the FAQs are edited and maintained and where people get
their roles. Nuxt 4 with server-side rendering, Japanese only. For now, locally: the FAQ list with
search, filters and paging, and each FAQ's page with its versions, read from the backend.

## Run it

Node 24.x from 24.22.1 (`.nvmrc`, `engines`) and pnpm 11.22.0 (`packageManager`); an older Node or
Node 25 is refused.

```bash
make install   # the dependencies (after make audit)
make dev       # http://localhost:8200 with hot reload
```

It reads the backend's admin API at `http://localhost:8100` (`NUXT_BACKEND_URL` to change it):
start the backend with `make api` there, which turns that API on. Only the app's server routes
call the backend, never the browser.

| Target | Does |
|---|---|
| `make install` | Install the dependencies |
| `make dev` | Start the app with hot reload on port 8200 |
| `make build` | Build for production into `.output/` |
| `make preview` | Serve that build on port 8200 |
| `make test` | Vitest |
| `make check` | Type check (`vue-tsc`) |
| `make lint` | oxlint |
| `make audit` | Check the locked dependencies for known vulnerabilities |
| `make api-types` | Regenerate `server/types/backend.d.ts` from the running local backend |

To add or upgrade a package: change only the lock (`pnpm add --lockfile-only …`), `make audit`,
then `make install`.

## Layout of `src/`

| Folder | Holds |
|---|---|
| `pages/` | One file per screen (`faqs/index.vue` the list, `faqs/[id].vue` one FAQ, `users/`); `/` opens the FAQ list |
| `layouts/default.vue` | The header on top, the side menu on the left, the page beside it |
| `components/` | By feature: `layout/` (header, side menu), `common/` (page heading), `faq/` (filters, table, state, pager) |
| `utils/` | Plain logic with a `*.test.ts` beside each: the menu, the page title, the error page's words, the FAQ views' labels and dates |
| `assets/styles/main.css` | The only source of colours and sizes (light and dark); components read them in scoped styles |
| `error.vue` | 404 and other errors, in Japanese |

Beside `src/`: `server/` holds the routes the pages call (`api/`), which call the backend
(`utils/backend.ts`, typed by `types/backend.d.ts`); `shared/` holds what both sides use, such as
the FAQ list's query rules.

Logic stays in `utils/` (and later `composables/`) so tests run in plain Node without Nuxt.

## Security pins

`pnpm-workspace.yaml` overrides glob and minimatch to fixed versions, and patches deepmerge 4.3.1
(`patches/`), which has no fixed release; drop each when its parents move on.
