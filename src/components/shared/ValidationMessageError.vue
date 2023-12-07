<script setup>
const props = defineProps({
  messages: {
    type: [Array, Object],
    required: true
  }
})
</script>
<template>
  <div>
    <div
      class="bg-red-50 border border-red-200 text-sm text-red-800 rounded-lg p-4 mb-4"
      role="alert"
    >
      <div class="flex">
        <div class="flex-shrink-0">
          <svg
            class="flex-shrink-0 h-4 w-4 mt-0.5"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="m15 9-6 6" />
            <path d="m9 9 6 6" />
          </svg>
        </div>
        <div class="ms-4">
          <h3 class="text-sm font-semibold">Ocorreu um problema na validação dos dados.</h3>
          <div class="mt-2 text-sm text-red-700 dark:text-red-400">
            <ul class="list-disc space-y-1 ps-5">
              <li v-for="(msg, index) in props.messages.message" :key="index">{{ msg }}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
