<script setup>
import { RouterView } from 'vue-router'
import HeaderNavigation from '@/components/shared/HeaderNavigation.vue'
</script>

<template>
  <div class="font-sans antialiased">
    <div class="min-h-full">
      <!-- navigation -->
      <HeaderNavigation />
      <!-- navigation -->

      <!-- content -->
      <RouterView />
      <!-- content -->
    </div>
  </div>
</template>
