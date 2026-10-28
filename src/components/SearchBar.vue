<script setup lang="ts">
defineProps<{ modelValue: string }>()

const emit = defineEmits<{
  (event: 'update:modelValue', value: string): void
}>()

function onInput(event: Event) {
  emit('update:modelValue', (event.target as HTMLInputElement).value)
}
</script>

<template>
  <div class="search">
    <label for="country-search" class="sr-only">Search countries by name</label>
    <div class="search-field">
      <span aria-hidden="true">🔍</span>
      <input
        id="country-search"
        type="search"
        :value="modelValue"
        placeholder="Search countries by name…"
        autocomplete="off"
        @input="onInput"
      />
    </div>
  </div>
</template>

<style scoped>
.search-field {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  padding: 0.65rem 0.9rem;
  box-shadow: var(--shadow);
}

.search-field:focus-within {
  border-color: var(--color-accent);
}

input {
  flex: 1;
  border: none;
  outline: none;
  font-size: 1rem;
  background: transparent;
  color: var(--color-text);
}
</style>
