<script setup>
import { RouterView } from 'vue-router'
import HeaderNavigation from '@/components/shared/HeaderNavigation.vue'
</script>

<template>
  <div class="font-sans antialiased">
    <!--
  This example requires updating your template:

  ```
  <html class="h-full bg-gray-100">
  <body class="h-full">
  ```
-->
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
