<script setup lang="ts">
import type { Country } from '../types'

defineProps<{
  country: Country
}>()
</script>

<template>
  <router-link
    :to="{ name: 'country', params: { code: country.code } }"
    class="card"
    :aria-label="`View details for ${country.name}`"
  >
    <img class="card-flag" :src="country.flag" :alt="country.flagAlt" loading="lazy" />
    <div class="card-body">
      <h3 class="card-name">{{ country.name }}</h3>
      <dl class="card-facts">
        <div>
          <dt>Population</dt>
          <dd>{{ country.population.toLocaleString('en-US') }}</dd>
        </div>
        <div>
          <dt>Capital</dt>
          <dd>{{ country.capital || '—' }}</dd>
        </div>
      </dl>
    </div>
  </router-link>
</template>

<style scoped>
.card {
  display: flex;
  flex-direction: column;
  width: 220px;
  flex: 0 0 auto;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  overflow: hidden;
  box-shadow: var(--shadow);
  color: var(--color-text);
}

.card:hover {
  border-color: var(--color-accent);
  text-decoration: none;
}

.card-flag {
  width: 100%;
  height: 120px;
  object-fit: cover;
  background: var(--color-bg);
}

.card-body {
  padding: 0.85rem 1rem 1rem;
}

.card-name {
  font-size: 1.05rem;
  margin-bottom: 0.6rem;
}

.card-facts {
  margin: 0;
  display: grid;
  gap: 0.4rem;
}

.card-facts div {
  display: flex;
  justify-content: space-between;
  gap: 0.5rem;
  font-size: 0.85rem;
}

.card-facts dt {
  color: var(--color-muted);
}

.card-facts dd {
  margin: 0;
  font-weight: 600;
  text-align: right;
}
</style>
