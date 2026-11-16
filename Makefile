.DEFAULT_GOAL := help

.PHONY: help install dev build preview test check lint audit

help: ## List the targets
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "  %-10s %s\n", $$1, $$2}'

install: ## Install the dependencies
	pnpm install

dev: ## Start the app with hot reload → http://localhost:8200
	pnpm dev

build: ## Build for production → .output/
	pnpm build

preview: ## Serve the production build → http://localhost:8200
	pnpm preview

test: ## Run the tests
	pnpm test

check: ## Type-check
	pnpm typecheck

lint: ## Lint
	pnpm lint:check

audit: ## Check the locked dependencies for known vulnerabilities
	pnpm audit
