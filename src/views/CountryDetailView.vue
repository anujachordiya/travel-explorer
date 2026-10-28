<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useCountriesStore } from '../stores/countries'
import StateMessage from '../components/StateMessage.vue'

const props = defineProps<{ code: string }>()

const store = useCountriesStore()
const { status, errorMessage } = storeToRefs(store)

onMounted(() => store.load())

const country = computed(() => store.findByCode(props.code))

const neighbours = computed(() => {
  if (!country.value) return []
  return country.value.borders
    .map((code) => store.findByCode(code))
    .filter((c) => c != null) as { code: string; name: string }[]
})
</script>

<template>
  <div class="detail">
    <router-link to="/" class="back-link">← Back to all countries</router-link>

    <StateMessage v-if="status === 'loading'" variant="loading" title="Loading country" message="Just a moment…" />

    <StateMessage v-else-if="status === 'error'" variant="error" title="Could not load country" :message="errorMessage">
      <button class="primary-button" type="button" @click="store.load()">Try again</button>
    </StateMessage>

    <StateMessage v-else-if="!country" variant="empty" title="Country not found" message="We couldn't find a country with that code." />

    <article v-else class="country">
      <img class="country-flag" :src="country.flagLarge" :alt="country.flagAlt" />

      <div class="country-info">
        <h1>{{ country.name }}</h1>
        <p class="official">{{ country.officialName }}</p>

        <dl class="facts">
          <div>
            <dt>Population</dt>
            <dd>{{ country.population.toLocaleString('en-US') }}</dd>
          </div>
          <div>
            <dt>Region</dt>
            <dd>{{ country.region }}</dd>
          </div>
          <div>
            <dt>Subregion</dt>
            <dd>{{ country.subregion || '—' }}</dd>
          </div>
          <div>
            <dt>Capital</dt>
            <dd>{{ country.capital || '—' }}</dd>
          </div>
          <div>
            <dt>Area</dt>
            <dd>{{ country.area ? country.area.toLocaleString('en-US') + ' km²' : '—' }}</dd>
          </div>
          <div>
            <dt>Languages</dt>
            <dd>{{ country.languages.length ? country.languages.join(', ') : '—' }}</dd>
          </div>
          <div>
            <dt>Currencies</dt>
            <dd>{{ country.currencies.length ? country.currencies.join(', ') : '—' }}</dd>
          </div>
          <div>
            <dt>Top-level domain</dt>
            <dd>{{ country.tld.length ? country.tld.join(', ') : '—' }}</dd>
          </div>
        </dl>

        <div v-if="neighbours.length" class="neighbours">
          <h2>Bordering countries</h2>
          <ul>
            <li v-for="n in neighbours" :key="n.code">
              <router-link :to="{ name: 'country', params: { code: n.code } }">
                {{ n.name }}
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </article>
  </div>
</template>

<style scoped>
.back-link {
  display: inline-block;
  margin-bottom: 1.5rem;
  font-weight: 600;
}

.country {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1.2fr);
  gap: 2.5rem;
  align-items: start;
}

.country-flag {
  width: 100%;
  border-radius: var(--radius);
  border: 1px solid var(--color-border);
  box-shadow: var(--shadow);
}

.country-info h1 {
  font-size: 2rem;
  margin-bottom: 0.25rem;
}

.official {
  color: var(--color-muted);
  margin: 0 0 1.5rem;
}

.facts {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.9rem 1.5rem;
  margin: 0 0 2rem;
}

.facts dt {
  color: var(--color-muted);
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.03em;
}

.facts dd {
  margin: 0.15rem 0 0;
  font-weight: 600;
}

.neighbours h2 {
  font-size: 1.2rem;
  margin-bottom: 0.75rem;
}

.neighbours ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
}

.neighbours li a {
  display: inline-block;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 999px;
  padding: 0.35rem 0.9rem;
  font-size: 0.9rem;
  color: var(--color-text);
}

@media (max-width: 720px) {
  .country {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .facts {
    grid-template-columns: 1fr;
  }
}
</style>
