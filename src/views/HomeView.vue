<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useCountriesStore } from '../stores/countries'
import { REGIONS } from '../types'
import SearchBar from '../components/SearchBar.vue'
import RegionSection from '../components/RegionSection.vue'
import StateMessage from '../components/StateMessage.vue'

const store = useCountriesStore()
const { status, errorMessage, searchTerm, countriesByRegion, resultCount } = storeToRefs(store)

onMounted(() => store.load())

const visibleRegions = computed(() =>
  REGIONS.filter((r) => countriesByRegion.value[r].length > 0)
)
</script>

<template>
  <div>
    <section class="intro">
      <h1>Explore countries by region</h1>
      <p>Browse destinations grouped by region and sorted by population, or search by name.</p>
      <SearchBar :modelValue="searchTerm" @update:modelValue="store.setSearchTerm" />
    </section>

    <StateMessage v-if="status === 'loading'" variant="loading" title="Loading countries" />

    <StateMessage v-else-if="status === 'error'" variant="error" title="Could not load countries" :message="errorMessage">
      <button class="primary-button" type="button" @click="store.load()">Try again</button>
    </StateMessage>

    <StateMessage
      v-else-if="resultCount === 0"
      variant="empty"
      title="No matches"
      message="Try a different name."
    />

    <template v-else>
      <p class="result-summary">
        Showing {{ resultCount }} {{ resultCount === 1 ? 'country' : 'countries' }}
      </p>
      <RegionSection
        v-for="region in visibleRegions"
        :key="region"
        :region="region"
        :countries="countriesByRegion[region]"
      />
    </template>
  </div>
</template>

<style scoped>
.intro {
  margin-bottom: 2rem;
}

.intro h1 {
  font-size: 1.9rem;
  margin-bottom: 0.5rem;
}

.intro p {
  color: var(--color-muted);
  margin: 0 0 1.25rem;
}

.result-summary {
  color: var(--color-muted);
  font-size: 0.9rem;
  margin: 0 0 1.5rem;
}
</style>
