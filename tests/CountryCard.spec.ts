import { describe, it, expect } from 'vitest'
import { mount, RouterLinkStub } from '@vue/test-utils'
import CountryCard from '../src/components/CountryCard.vue'
import type { Country } from '../src/types'

const india: Country = {
  code: 'IND',
  name: 'India',
  officialName: 'Republic of India',
  region: 'Asia',
  subregion: 'Southern Asia',
  capital: 'New Delhi',
  population: 1352617328,
  flag: 'https://flagcdn.com/w320/in.png',
  flagLarge: 'https://flagcdn.com/w640/in.png',
  flagAlt: 'Flag of India',
  currencies: ['Indian rupee (₹)'],
  languages: ['Hindi', 'English'],
  tld: ['.in'],
  borders: ['CHN', 'PAK'],
  area: 3287590,
}

function mountCard() {
  return mount(CountryCard, {
    props: { country: india },
    global: { stubs: { RouterLink: RouterLinkStub } }
  })
}

describe('CountryCard', () => {
  it('shows the country name, formatted population and capital', () => {
    const wrapper = mountCard()
    expect(wrapper.text()).toContain('India')
    expect(wrapper.text()).toContain('1,352,617,328')
    expect(wrapper.text()).toContain('New Delhi')
  })

  it('renders the flag with alt text', () => {
    const wrapper = mountCard()
    const img = wrapper.find('img')
    expect(img.attributes('src')).toBe(india.flag)
    expect(img.attributes('alt')).toBe('Flag of India')
  })

  it('links to the country detail route', () => {
    const wrapper = mountCard()
    const link = wrapper.findComponent(RouterLinkStub)
    expect(link.props('to')).toEqual({ name: 'country', params: { code: 'IND' } })
  })
})
