.PHONY: run build preview test format check

run:
	npm run dev

build:
	npm run build -- --outDir docs --base '/factory-simulator/'

preview:
	npm run preview

test:
	npm run test

format:
	biome check --fix

check:
	biome check
