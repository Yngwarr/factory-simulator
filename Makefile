.PHONY: run build preview test format check

run:
	npm run dev

build:
	npm run build -- --outDir docs

preview:
	npm run preview

test:
	npm run test

format:
	biome check --fix

check:
	biome check
