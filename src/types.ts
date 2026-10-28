export interface Country {
  code: string 
  name: string 
  officialName: string
  region: string
  subregion: string
  capital: string
  population: number
  flag: string 
  flagLarge: string 
  flagAlt: string
  currencies: string[]
  languages: string[]
  tld: string[]
  borders: string[] 
  area: number
}

export type Region = 'Africa' | 'Americas' | 'Asia' | 'Europe' | 'Oceania'

export const REGIONS: Region[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania']
