<script setup lang="ts">
import type { Country } from '../types'
import CountryCard from './CountryCard.vue'

defineProps<{
  region: string
  countries: Country[]
}>()
</script>

<template>
  <section class="region">
    <div class="region-head">
      <h2>{{ region }}</h2>
      <span class="region-count">{{ countries.length }} countries</span>
    </div>

    <ul class="region-list">
      <li v-for="country in countries" :key="country.code">
        <CountryCard :country="country" />
      </li>
    </ul>
  </section>
</template>

<style scoped>
.region {
  margin-bottom: 2.5rem;
}

.region-head {
  display: flex;
  align-items: baseline;
  gap: 0.75rem;
  margin-bottom: 0.9rem;
}

.region-head h2 {
  font-size: 1.4rem;
}

.region-count {
  color: var(--color-muted);
  font-size: 0.85rem;
}

.region-list {
  list-style: none;
  margin: 0;
  padding: 0.25rem 0.25rem 1rem;
  display: flex;
  gap: 1rem;
  overflow-x: auto;
}
</style>
