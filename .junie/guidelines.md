# Bookmarkly Project Guidelines

This document outlines the coding standards, architectural patterns, and development practices for the Bookmarkly
project.

### 1. Project Overview

- **Framework**: React Native with Expo (SDK 54+).
- **Navigation**: Expo Router (File-based routing).
- **Styling**: NativeWind (Tailwind CSS for React Native).
- **State Management**: Redux Toolkit with Redux Persist.
- **API**: Axios with custom services.
- **Localization**: i18next with react-i18next.

### 2. Code Style & Standards

- **Language**: TypeScript (Strict mode).
- **Formatting**: Prettier (configured in `package.json`).
- **Naming Conventions**:
    - **Components**: PascalCase (e.g., `BottomSheet.tsx`).
    - **Hooks**: camelCase starting with `use` (e.g., `useColorScheme.ts`).
    - **Services/Utils**: camelCase (e.g., `auth.services.ts`).
    - **Types**: PascalCase, often prefixed with `T` (e.g., `TUser`, `TVerifyCodePayload`).
- **Styling**: Always use NativeWind `className`. Use `twMerge` for conditional or dynamic styles.

### 3. Architecture & Directory Structure

- `src/app`: Expo Router routes.
    - `(groups)`: Logical grouping of routes.
    - `_layout.tsx`: Layout definitions for segments.
- `src/components`: Reusable UI components.
    - `ui/`: Atom-level components (e.g., `ThemedText.tsx`, `ScreenContainer.tsx`).
    - `bottom-sheet/`: Specialized components like bottom sheets.
- `src/services`: API communication logic.
    - Use `axiosInstance` from `src/services/utils.ts`.
    - Define response and payload types in `src/types`.
- `src/store`: Redux slices and store configuration.
- `src/locales`: JSON files for internationalization (en, de, etc.).

### 4. Platform-Specific Development

- Use `.web.tsx` suffix for web-specific implementations when the standard `.tsx` doesn't suffice (e.g.,
  `BottomSheet.web.tsx`).
- Be mindful of React Native vs. Web differences, especially regarding libraries like `react-native-reanimated` or
  `expo-blur`.

### 5. Best Practices

- **UI Consistency**: Use `ThemedText` instead of standard `Text` to ensure font and size consistency across the app.
- **Type Safety**: Avoid `any`. Always define interfaces or types for API responses and component props.
- **Localization**: Never hardcode strings. Use the `useTranslation` hook or `i18n.t()`.
- **State**: Keep component local state minimal. Use Redux for global application state (user session, global settings).

### 6. Common Commands

- `npm run start`: Start Expo dev server.
- `npm run lint`: Run ESLint.
- `npm run test`: Run Jest tests.
- `npm run format`: Format code with Prettier.
