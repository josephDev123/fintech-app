# Repository Guidelines

## Introduction:

The Complete Fintech Backend Engineering

## Project Structure & Module Organization

This is a NestJS TypeScript service. Core application code lives in `src/`, with the main bootstrap in `src/main.ts`, the root module in `src/app.module.ts`, and feature code grouped under `src/module/` (for example `src/module/Auth/`). Unit tests sit beside implementation files as `*.spec.ts`, and end-to-end tests live in `test/`. Build output is written to `dist/`.

## Build, Test, and Development Commands

- `npm install`: install dependencies.
- `npm run start:dev`: run the API in watch mode for local development.
- `npm run build`: compile TypeScript with Nest CLI into `dist/`.
- `npm run start:prod`: start the compiled server from `dist/main`.
- `npm run test`: run unit tests with Jest.
- `npm run test:e2e`: run end-to-end tests from `test/jest-e2e.json`.
- `npm run test:cov`: generate coverage output in `coverage/`.
- `npm run lint`: run ESLint and apply safe fixes.
- `npm run format`: format `src/**/*.ts` and `test/**/*.ts` with Prettier.

## Coding Style & Naming Conventions

Use TypeScript, 2-space indentation, single quotes, and trailing commas, matching `.prettierrc`. Prefer NestJS conventions: `*.module.ts`, `*.controller.ts`, `*.service.ts`, and `*.spec.ts`. Keep class names in `PascalCase` and methods/variables in `camelCase`. Follow the existing file naming pattern in `src/module/Auth/`, including the current capitalized filenames.

## Testing Guidelines

Jest is configured in `package.json`. Unit tests use `src/**/*.spec.ts`; e2e tests use `test/app.e2e-spec.ts`. Name tests after the unit under test, and keep assertions focused on observable behavior. Run `npm run test` before committing, and use `npm run test:cov` when changing shared logic or request handling.

## Commit & Pull Request Guidelines

No Git commit history is available yet, so there is no repository-specific commit convention to follow. Use short, imperative commit messages such as `Add auth login endpoint`. Pull requests should include a brief summary, the commands you ran, and screenshots or response samples when API behavior changes.

## Configuration & Secrets

Do not commit local secrets from `.env`. Keep environment-specific values out of source control, and document any new required variables in the README or PR notes.
