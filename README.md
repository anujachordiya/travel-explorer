# Travel Destination Explorer

A Vue 3 app that lets you browse countries grouped by region, search by name, and view details for each country.

## Stack

- Vue 3 (Composition API, `<script setup>`)
- TypeScript
- Pinia — state management
- Vue Router — navigation
- Vite — dev/build tool
- Vitest + Vue Test Utils — unit tests
- Plain CSS (no UI framework)

## Versions

- Node.js: 20.11.1
- npm: 10.2.4

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:5173

## Other scripts

```bash
npm run build       # production build
npm run preview     # preview the build locally
npm run test        # run unit tests
npm run typecheck   # TypeScript check only
```

## How data is fetched

The app calls the REST Countries v3.1 dataset (the same data the assignment references). The official `restcountries.com` endpoints have moved to a paid v5 API, so we fetch from the community-maintained v3.1 source on GitLab. In dev, Vite proxies `/api/countries` to that URL so there are no CORS issues. All of this is in `vite.config.ts` and `src/api/countries.ts`.

## Project structure

```
src/
  api/
    countries.ts       # fetch call + mapping raw API response to our Country type
  stores/
    countries.ts       # Pinia store — loads data once, handles search + grouping
  components/
    SiteHeader.vue     # sticky top bar with the app logo/link
    SearchBar.vue      # search input (v-model)
    CountryCard.vue    # a single country card shown in the list
    RegionSection.vue  # region heading + horizontal scrollable list of cards
    StateMessage.vue   # reused for loading, error, and empty states
  views/
    HomeView.vue       # dashboard — search bar + all region sections
    CountryDetailView.vue  # full detail page for a single country
    NotFoundView.vue   # 404
  assets/
    base.css           # global styles + CSS variables
  types.ts             # Country interface + Region type
  router.ts
  main.ts
```

## How it works

1. On app load, `HomeView` triggers `store.load()` which fetches all ~250 countries once.
2. The store groups them by region and sorts each group by population (largest first).
3. Search filters the list in memory — no extra API calls.
4. Clicking a country goes to `/country/:code` where the detail page looks up the country from the already-loaded data.

## What happens if the API fails

If the fetch fails (network error, server down, bad response), the store sets its status to `error` and stores the error message. The UI then shows a `StateMessage` with a "Try again" button that re-triggers the load. There is no fallback data — the user sees the error state, not a half-filled page.

## Tests

```bash
npm run test
```

Covers:
- Store: loading, error, no-refetch, grouping by region, sorting by population, search, lookup by code
- CountryCard: renders name, population and capital; flag with alt text; links to the detail route
- SearchBar: accessible label, current value, emits on input
