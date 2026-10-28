<script setup lang="ts">
import SiteHeader from './components/SiteHeader.vue'
</script>

<template>
  <SiteHeader />
  <main class="container">
    <router-view />
  </main>
</template>

<style scoped>
main {
  padding-top: 1.5rem;
  padding-bottom: 2.5rem;
  min-height: 60vh;
}
</style>
