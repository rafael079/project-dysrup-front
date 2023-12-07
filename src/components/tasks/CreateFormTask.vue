<script setup>
import { ref } from 'vue'
import LoadingBox from '@/components/shared/LoadingBox.vue'
import ValidationMessageError from '@/components/shared/ValidationMessageError.vue'
import ApiTasks from '@/api/tasks'

const isLoading = ref(false)
const messageError = ref([])

const props = defineProps({
  project: {
    type: Object,
    required: true
  }
})

const form = ref({
  project: props.project.id,
  title: '',
  description: '',
  end_date: ''
})

const emit = defineEmits(['close'])

const create = async () => {
  isLoading.value = true
  await ApiTasks.insert(form.value)
    .then(() => {
      emit('close')
      isLoading.value = false
    })
    .catch(function (error) {
      isLoading.value = false

      if (error.response) {
        messageError.value = error.response.data
      } else {
        messageError.value = error
      }
    })
}
</script>
<template>
  <div>
    <LoadingBox v-if="isLoading" />

    <ValidationMessageError v-if="messageError.message" :messages="messageError" />

    <form @submit.prevent="create">
      <div class="mb-4">
        <label for="name" class="block mb-2 text-sm font-medium">Projeto:</label>
        <span class="text-gray-300 inline-block me-2">#{{ props.project.id }}</span
        ><span class="font-semibold text-red-600 text-lg">{{ props.project.name }}</span>
      </div>

      <div class="mb-4">
        <label for="name" class="block mb-2 text-sm font-medium">Titulo da Tarefa</label>
        <input
          type="text"
          id="name"
          name="name"
          v-model="form.title"
          class="py-4 px-4 block w-full border border-gray-300 rounded text-sm bg-neutral-50 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
          placeholder="Nome do Projeto"
        />
      </div>

      <div>
        <label for="description" class="block mb-2 text-sm font-medium">Descrição da Tarefa</label>
        <div class="mt-1">
          <textarea
            id="description"
            name="description"
            rows="3"
            v-model="form.description"
            class="py-3 px-4 block w-full border border-gray-300 bg-neutral-50 rounded text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
            placeholder="Deixe a descrição do projeto aqui..."
          ></textarea>
        </div>
      </div>

      <div class="mt-4">
        <label for="date" class="block mb-2 text-sm font-medium">Data de Termino</label>
        <input
          type="date"
          id="date"
          name="date"
          v-model="form.end_date"
          class="py-4 px-4 block w-full border border-gray-300 rounded text-sm bg-neutral-50 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
          placeholder="Nome do Projeto"
        />
      </div>

      <div class="mt-6 grid">
        <button
          type="submit"
          class="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent bg-gray-700 text-white hover:bg-gray-600 disabled:opacity-50 disabled:pointer-events-none"
        >
          Cadastrar Novo Projeto
        </button>
      </div>
    </form>
  </div>
</template>
