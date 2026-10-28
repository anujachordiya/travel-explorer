import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import type { Country } from '../src/types'
import { fetchCountries } from '../src/api/countries'
import { useCountriesStore } from '../src/stores/countries'

vi.mock('../src/api/countries', () => ({
  fetchCountries: vi.fn()
}))

const mockedFetch = vi.mocked(fetchCountries)

function makeCountry(overrides: Partial<Country>): Country {
  return {
    code: 'XXX',
    name: 'Example',
    officialName: 'Example',
    region: 'Europe',
    subregion: '',
    capital: '',
    population: 0,
    flag: '',
    flagLarge: '',
    flagAlt: '',
    currencies: [],
    languages: [],
    tld: [],
    borders: [],
    area: 0,
    ...overrides
  }
}

const sample: Country[] = [
  makeCountry({ code: 'FRA', name: 'France', region: 'Europe', population: 67 }),
  makeCountry({ code: 'DEU', name: 'Germany', region: 'Europe', population: 83 }),
  makeCountry({ code: 'IND', name: 'India', region: 'Asia', population: 1352 }),
  makeCountry({ code: 'JPN', name: 'Japan', region: 'Asia', population: 125 })
]

describe('countries store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    mockedFetch.mockReset()
  })

  it('loads countries and marks status ready', async () => {
    mockedFetch.mockResolvedValue(sample)
    const store = useCountriesStore()

    expect(store.status).toBe('idle')
    await store.load()

    expect(store.status).toBe('ready')
    expect(store.resultCount).toBe(4)
  })

  it('records an error when loading fails', async () => {
    mockedFetch.mockRejectedValue(new Error('Network down'))
    const store = useCountriesStore()

    await store.load()

    expect(store.status).toBe('error')
    expect(store.errorMessage).toBe('Could not load countries. Please try again.')
  })

  it('does not fetch again once data is ready', async () => {
    mockedFetch.mockResolvedValue(sample)
    const store = useCountriesStore()

    await store.load()
    await store.load()

    expect(mockedFetch).toHaveBeenCalledTimes(1)
  })

  it('groups countries by region and sorts by population descending', async () => {
    mockedFetch.mockResolvedValue(sample)
    const store = useCountriesStore()
    await store.load()

    expect(store.countriesByRegion.Europe.map((c) => c.name)).toEqual(['Germany', 'France'])
    expect(store.countriesByRegion.Asia.map((c) => c.name)).toEqual(['India', 'Japan'])
  })

  it('filters by name (case-insensitive)', async () => {
    mockedFetch.mockResolvedValue(sample)
    const store = useCountriesStore()
    await store.load()

    store.setSearchTerm('ind')
    expect(store.resultCount).toBe(1)
    expect(store.filteredCountries[0].name).toBe('India')
  })

  it('finds a country by code', async () => {
    mockedFetch.mockResolvedValue(sample)
    const store = useCountriesStore()
    await store.load()

    expect(store.findByCode('JPN')?.name).toBe('Japan')
    expect(store.findByCode('ZZZ')).toBeUndefined()
  })
})
