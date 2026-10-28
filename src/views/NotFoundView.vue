<template>
  <div class="not-found">
    <h1>Page not found</h1>
    <p>The page you're looking for doesn't exist.</p>
    <router-link to="/" class="primary-button">Back to home</router-link>
  </div>
</template>

<style scoped>
.not-found {
  text-align: center;
  padding: 4rem 1rem;
}

.not-found h1 {
  font-size: 1.8rem;
  margin-bottom: 0.5rem;
}

.not-found p {
  color: var(--color-muted);
  margin-bottom: 1.5rem;
}

.primary-button {
  display: inline-block;
}
</style>
