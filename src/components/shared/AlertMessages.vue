<script setup>
import { ref } from 'vue'

const props = defineProps({
  message: {
    type: String,
    required: true
  },
  type: {
    type: String,
    default: 'success'
  }
})

const isOpen = ref(true)
</script>
<template>
  <div
    v-show="isOpen"
    class="border-t-2 rounded-md p-4"
    :class="[
      props.type === 'success' ? 'border-teal-500 bg-teal-100' : 'border-red-500 bg-red-100'
    ]"
    role="alert"
  >
    <div class="flex">
      <div class="ms-3">
        <h3 class="text-gray-800 font-semibold">
          {{ props.type === 'success' ? 'Tudo ocorreu como esperado!' : 'Ops! Deu algum erro' }}
        </h3>
        <p class="text-sm text-gray-700">{{ props.message }}</p>
      </div>
      <div class="ml-auto my-auto">
        <span
          @click="isOpen = false"
          class="text-xs font-medium bg-slate-700 text-white cursor-pointer rounded-full px-3 py-1 hover:bg-slate-900"
        >
          Fechar
        </span>
      </div>
    </div>
  </div>
</template>
