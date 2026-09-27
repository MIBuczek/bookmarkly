---
name: bookmarkly-dev
description: Project-specific guidance for Bookmarkly development (React Native, Expo, NativeWind).
---

# Bookmarkly Development Skill

This skill provides project-specific guidance for developing the Bookmarkly application, a React Native app built with
Expo.

## Project Overview

- **Framework**: React Native with Expo (SDK 54+).
- **Navigation**: Expo Router (File-based routing).
- **Styling**: NativeWind (Tailwind CSS for React Native).
- **State Management**: Redux Toolkit with Redux Persist.
- **API**: Axios with custom services.
- **Localization**: i18next with react-i18next.

## Directory Structure

- `src/app`: Expo Router routes.
    - `(groups)`: Logical grouping of routes.
    - `_layout.tsx`: Layout definitions for segments.
- `src/components`: Reusable UI components.
    - `ui/`: Atom-level components (e.g., `ThemedText.tsx`, `ScreenContainer.tsx`).
    - `bottom-sheet/`: Specialized components like bottom sheets.
- `src/services`: API communication logic.
    - Use `axiosInstance` from `src/services/utils.ts`.
- `src/store`: Redux slices and store configuration.
- `src/locales`: JSON files for internationalization.

## Coding Standards

### Naming Conventions

- **Components**: PascalCase (e.g., `BottomSheet.tsx`).
- **Hooks**: camelCase starting with `use` (e.g., `useColorScheme.ts`).
- **Services/Utils**: camelCase (e.g., `auth.services.ts`).
- **Types**: PascalCase, often prefixed with `T` (e.g., `TUser`).

### Styling

- Always use NativeWind `className`.
- Use `twMerge` for conditional or dynamic styles.
- Prefer `ThemedText` over standard `Text` for consistency.

### Types & State

- Use strict TypeScript. Avoid `any`.
- Define interfaces/types for all API payloads and responses.
- Keep local state minimal; use Redux for global state (session, settings).

### Localization

- Never hardcode strings.
- Use `useTranslation` hook or `i18n.t()`.
- Add new strings to `src/locales`.

## Common Commands

- `npm run start`: Start Expo dev server.
- `npm run lint`: Run ESLint.
- `npm run test`: Run Jest tests.
- `npm run format`: Format code with Prettier.
- `npm run junie:load-task -- <issue_number>`: Load a task directly from a GitHub issue. Requires `gh` and `jq` to be
  installed and authenticated.

## GitHub Task Template

Use the template at `.github/ISSUE_TEMPLATE/junie-task.md` when creating tasks for Junie. It is structured to provide
clear goals, technical requirements, and verification steps.
