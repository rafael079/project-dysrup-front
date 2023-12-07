<template>
  <Teleport to="body">
    <TransitionRoot appear as="template" :show="props.show">
      <Dialog as="div" @close="close" class="relative z-30">
        <!-- backdrop -->
        <TransitionChild
          as="template"
          enter="duration-300 ease-out"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="duration-200 ease-in"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-neutral-900 backdrop-blur-sm bg-opacity-40" />
        </TransitionChild>
        <!-- backdrop -->

        <!-- content -->
        <div class="fixed inset-x-0 overflow-y-auto top-1 2xl:top-7">
          <div class="flex items-center justify-center min-h-full p-5 text-center">
            <TransitionChild
              as="template"
              enter="transition ease-out duration-100"
              enter-from="transform opacity-0 scale-95"
              enter-to="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leave-from="transform opacity-100 scale-100"
              leave-to="transform opacity-0 scale-95"
            >
              <DialogPanel
                class="w-full sm:max-w-3xl p-4 relative text-left align-middle transition-all transform bg-white rounded shadow shadow-gray-500"
              >
                <DialogTitle>
                  <button
                    type="button"
                    @click="$emit('close')"
                    title="Fechar"
                    class="absolute top-2 right-2.5 inline-flex items-center rounded-full text-neutral-800 p-1.5 hover:bg-neutral-300 shadow-sm shadow-gray-300"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="w-5 h-5 opacity-90 text-inherit"
                      viewBox="0 0 16 16"
                    >
                      <path
                        d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"
                      />
                    </svg>
                    <span class="sr-only"> Fechar </span>
                  </button>
                </DialogTitle>
                <DialogDescription>
                  <slot />
                </DialogDescription>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
        <!-- content -->
      </Dialog>
    </TransitionRoot>
  </Teleport>
</template>
<script setup>
import { onMounted, onUnmounted } from 'vue'
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
  DialogDescription
} from '@headlessui/vue'

const props = defineProps({
  show: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['close'])

const close = () => emit('close')

const closeOnEscape = (e) => {
  if (e.key === 'Escape' && props.show) {
    close()
  }
}

onMounted(() => document.addEventListener('keydown', closeOnEscape))

onUnmounted(() => {
  document.removeEventListener('keydown', closeOnEscape)
  document.body.style.overflow = null
})
</script>
