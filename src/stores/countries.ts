import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type { Country } from '../types'
import { REGIONS } from '../types'
import { fetchCountries } from '../api/countries'

type Status = 'idle' | 'loading' | 'ready' | 'error'

export const useCountriesStore = defineStore('countries', () => {
  const countries = ref<Country[]>([])
  const status = ref<Status>('idle')
  const errorMessage = ref('')
  const searchTerm = ref('')

  async function load() {
    if (status.value === 'loading' || status.value === 'ready') return

    status.value = 'loading'
    errorMessage.value = ''
    try {
      countries.value = await fetchCountries()
      status.value = 'ready'
    } catch (error) {
      console.error('Failed to load countries:', error)
      errorMessage.value = 'Could not load countries. Please try again.'
      status.value = 'error'
    }
  }

  const filteredCountries = computed(() => {
    const term = searchTerm.value.trim().toLowerCase()
    if (!term) return countries.value
    return countries.value.filter((c) => c.name.toLowerCase().includes(term))
  })

  const countriesByRegion = computed(() => {
    const groups: Record<string, Country[]> = {}
    REGIONS.forEach((r) => (groups[r] = []))

    filteredCountries.value.forEach((c) => {
      if (groups[c.region]) groups[c.region].push(c)
    })

    REGIONS.forEach((r) => groups[r].sort((a, b) => b.population - a.population))
    return groups
  })

  const resultCount = computed(() => filteredCountries.value.length)

  function findByCode(code: string) {
    return countries.value.find((c) => c.code === code)
  }

  function setSearchTerm(value: string) {
    searchTerm.value = value
  }

  return {
    status,
    errorMessage,
    searchTerm,
    load,
    filteredCountries,
    countriesByRegion,
    resultCount,
    findByCode,
    setSearchTerm,
  }
})
