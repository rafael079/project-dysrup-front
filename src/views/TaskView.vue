<script setup>
import ContentTableTasks from '@/components/tasks/ContentTableTasks.vue'
</script>
<template>
  <div>
    <header class="bg-white shadow">
      <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <h1 class="text-3xl font-bold tracking-tight text-gray-900">Tarefas</h1>
      </div>
    </header>
    <main>
      <div class="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
        <!-- content table -->
        <ContentTableTasks />
        <!-- content table -->
      </div>
    </main>
  </div>
</template>
