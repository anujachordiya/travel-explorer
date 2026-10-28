import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import SearchBar from '../src/components/SearchBar.vue'

describe('SearchBar', () => {
  it('has an accessible label tied to the input', () => {
    const wrapper = mount(SearchBar, { props: { modelValue: '' } })
    const label = wrapper.find('label')
    const input = wrapper.find('input')
    expect(label.attributes('for')).toBe('country-search')
    expect(input.attributes('id')).toBe('country-search')
  })

  it('shows the current value', () => {
    const wrapper = mount(SearchBar, { props: { modelValue: 'India' } })
    expect((wrapper.find('input').element as HTMLInputElement).value).toBe('India')
  })

  it('emits update:modelValue as the user types', async () => {
    const wrapper = mount(SearchBar, { props: { modelValue: '' } })
    await wrapper.find('input').setValue('jap')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['jap'])
  })
})
