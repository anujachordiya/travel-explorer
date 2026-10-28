import type { Country } from '../types'

const API_URL = '/api/countries'

export async function fetchCountries(): Promise<Country[]> {
  const res = await fetch(API_URL)

  if (!res.ok) {
    throw new Error(`Failed to fetch countries: ${res.status}`)
  }

  const data = await res.json()

  return data.map((item: any) => {
    const flag = item.flags?.png || item.flags?.svg || ''
    const currencies = Object.values(item.currencies || {}) as { name: string; symbol?: string }[]

    return {
      code: item.cca3,
      name: item.name.common,
      officialName: item.name.official,
      region: item.region,
      subregion: item.subregion || '',
      capital: item.capital?.[0] || '',
      population: item.population,
      flag,
      flagLarge: flag.replace('w320', 'w640'),
      flagAlt: item.flags?.alt || `Flag of ${item.name.common}`,
      currencies: currencies.map((c) => (c.symbol ? `${c.name} (${c.symbol})` : c.name)),
      languages: Object.values<string>(item.languages || {}),
      tld: item.tld || [],
      borders: item.borders || [],
      area: item.area || 0,
    }
  })
}
