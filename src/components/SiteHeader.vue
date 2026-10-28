<template>
  <header>
    <div class="container header-inner">
      <router-link to="/" class="brand">🌍 Travel Explorer</router-link>
    </div>
  </header>
</template>

<style scoped>
header {
  background: var(--color-surface);
  border-bottom: 1px solid var(--color-border);
  position: sticky;
  top: 0;
  z-index: 5;
}

.header-inner {
  display: flex;
  align-items: center;
  height: 60px;
}

.brand {
  font-weight: 700;
  font-size: 1.15rem;
  color: var(--color-text);
}

.brand:hover {
  text-decoration: none;
}
</style>
