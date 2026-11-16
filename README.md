# nc-cross-faq-management

The management app of 管理部横断FAQ: where the FAQs are edited and maintained and where people get
their roles. Nuxt 4 with server-side rendering, Japanese only. For now it is the skeleton — header,
side menu, placeholder pages and the error page; it calls no backend yet.

## Run it

Node 24.x from 24.22.1 (`.nvmrc`, `engines`) and pnpm 11.22.0 (`packageManager`); an older Node or
Node 25 is refused.

```bash
make install   # the dependencies (after make audit)
make dev       # http://localhost:8200 with hot reload
```

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

To add or upgrade a package: change only the lock (`pnpm add --lockfile-only …`), `make audit`,
then `make install`.

## Layout of `src/`

| Folder | Holds |
|---|---|
| `pages/` | One file per screen (`faqs/`, `users/`); `/` opens the FAQ list |
| `layouts/default.vue` | The header on top, the side menu on the left, the page beside it |
| `components/` | By feature: `layout/` (header, side menu), `common/` (page heading) |
| `utils/` | Plain logic with a `*.test.ts` beside each: the menu, the page title, the error page's words |
| `assets/styles/main.css` | The only source of colours and sizes (light and dark); components read them in scoped styles |
| `error.vue` | 404 and other errors, in Japanese |

Logic stays in `utils/` (and later `composables/`) so tests run in plain Node without Nuxt.

## Security pins

`pnpm-workspace.yaml` overrides glob and minimatch to fixed versions, and patches deepmerge 4.3.1
(`patches/`), which has no fixed release; drop each when its parents move on.
