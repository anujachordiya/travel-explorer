<script setup lang="ts">
defineProps<{
  variant: 'loading' | 'error' | 'empty'
  title?: string
  message?: string
}>()
</script>

<template>
  <div class="state" role="status" aria-live="polite">
    <div v-if="variant === 'loading'" class="spinner" aria-hidden="true"></div>
    <p v-if="title" class="state-title">{{ title }}</p>
    <p v-if="message" class="state-message">{{ message }}</p>
    <slot />
  </div>
</template>

<style scoped>
.state {
  text-align: center;
  padding: 3rem 1rem;
  color: var(--color-muted);
}

.state-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--color-text);
  margin: 0.5rem 0 0.25rem;
}

.state-message {
  margin: 0 0 1rem;
}

.spinner {
  width: 40px;
  height: 40px;
  margin: 0 auto 1rem;
  border: 4px solid var(--color-border);
  border-top-color: var(--color-accent);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>
