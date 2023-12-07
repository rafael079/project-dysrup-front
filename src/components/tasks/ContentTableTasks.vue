<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import dayjs from 'dayjs'
import LoadingBox from '@/components/shared/LoadingBox.vue'
import ModalContainer from '@/components/shared/ModalContainer.vue'
import CreateFormTask from '@/components/tasks/CreateFormTask.vue'
import ApiTasks from '@/api/tasks'
import AlertMessages from '../shared/AlertMessages.vue'

const project = ref(null)
const isLoading = ref(false)
const messageError = ref(null)
const componentKey = ref(0)

const openCreateModal = ref(false)

const route = useRoute()

const closeCreateModal = () => (openCreateModal.value = false)

const forceRerender = () => (componentKey.value += 1)

const finishCreate = () => {
  closeCreateModal()
  getGetTasks()
}

const getGetTasks = () => {
  isLoading.value = true

  ApiTasks.index(route.params.projectId).then((response) => {
    project.value = response.data
    isLoading.value = false
  })
}

const deleteTasks = (taskId) => {
  forceRerender()
  isLoading.value = true

  ApiTasks.delete(taskId)
    .then(() => {
      isLoading.value = false
      getGetTasks()
    })
    .catch(function (error) {
      messageError.value = error.response.data
      isLoading.value = false
    })
}

const completeTask = (taskId) => {
  forceRerender()
  ApiTasks.patch(taskId)
    .then(() => {
      isLoading.value = false
      getGetTasks()
    })
    .catch(function (error) {
      messageError.value = error.response.data
      isLoading.value = false
    })
}

onMounted(() => getGetTasks())
</script>
<template>
  <!-- alertas -->
  <AlertMessages
    v-if="messageError"
    :message="messageError.message ?? messageError.error"
    type="error"
    :key="componentKey"
  />
  <!-- alertas -->

  <section v-if="!project" class="bg-gray-200/60 backdrop-blur-sm rounded-lg bg-opacity-80">
    <div class="mx-auto max-w-screen-xl px-4 mb-1 py-5 lg:flex lg:items-center">
      <div class="mx-auto max-w-xl text-center">
        <h3 class="text-2xl text-gray-700 mb-2 font-semibold">Ops!</h3>
        <p class="mt-3 sm:text-lg/relaxed">
          Desculpe este projeto (#{{ $route.params.projectId }}) não existe! Veja a lista de
          <RouterLink to="/projects" class="hover:underline text-blue-600">Projetos</RouterLink>
          selecione um outro para gerenciar tarefas
        </p>
      </div>
    </div>
  </section>

  <LoadingBox v-else-if="isLoading" />

  <div v-else>
    <!-- modal -->
    <ModalContainer :show="openCreateModal" @close="closeCreateModal">
      <div class="p-5">
        <CreateFormTask :project="{ id: project.id, name: project.name }" @close="finishCreate()" />
      </div>
    </ModalContainer>
    <!-- modal -->

    <div class="w-full">
      <div class="bg-white py-4 md:py-7">
        <div class="sm:flex items-center justify-between">
          <div class="flex items-center">
            <p
              tabindex="0"
              class="focus:outline-none text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-red-800"
            >
              <span class="text-gray-300 font-medium">
                <RouterLink to="/projects" class="hover:underline">Projetos</RouterLink>
                ->
              </span>
              {{ project.name }}
            </p>
          </div>
          <button
            @click="openCreateModal = !openCreateModal"
            type="button"
            class="focus:ring-2 focus:ring-offset-2 focus:ring-gray-600 mt-4 sm:mt-0 inline-flex items-start justify-start px-7 py-4 bg-gray-800 hover:bg-gray-600 focus:outline-none rounded"
          >
            <p class="text-sm font-medium leading-none text-white">Adicionar uma nova Tarefa</p>
          </button>
        </div>
        <div class="mt-7 overflow-x-auto relative rounded">
          <div>
            <section
              v-if="project.tasks.length == 0"
              class="bg-gray-200/60 backdrop-blur-sm rounded-lg bg-opacity-80"
            >
              <div class="mx-auto max-w-screen-xl px-4 mb-1 py-5 lg:flex lg:items-center">
                <div class="mx-auto max-w-xl text-center">
                  <p class="mt-3 sm:text-lg/relaxed">
                    Ainda não há tarefas para este projeto cadastradas no sistema!
                  </p>

                  <div class="mt-2 flex flex-wrap justify-center gap-4">
                    <a
                      href="#"
                      @click="openCreateModal = !openCreateModal"
                      class="text-blue-600 hover:underline"
                    >
                      Crie um nova Tarefa
                    </a>
                  </div>
                </div>
              </div>
            </section>

            <!-- conteúdo  -->
            <table class="w-full whitespace-nowrap" v-else>
              <tbody>
                <tr
                  class="focus:outline-none h-16 border border-gray-100 rounded hover:bg-gray-100/40"
                  v-for="task in project.tasks"
                  :key="task.id"
                >
                  <td>
                    <div class="ml-5 text-gray-200 text-sm">#{{ task.id }}</div>
                  </td>
                  <td class="">
                    <div class="flex items-center pl-5">
                      <p class="text-base font-semibold leading-none text-gray-700 mr-2">
                        {{ task.title }}
                      </p>
                    </div>
                  </td>
                  <td class="pl-4">
                    <div class="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        class="h-5 w-5 text-indigo-300"
                        viewBox="0 0 16 16"
                      >
                        <path
                          d="m9.708 6.075-3.024.379-.108.502.595.108c.387.093.464.232.38.619l-.975 4.577c-.255 1.183.14 1.74 1.067 1.74.72 0 1.554-.332 1.933-.789l.116-.549c-.263.232-.65.325-.905.325-.363 0-.494-.255-.402-.704l1.323-6.208Zm.091-2.755a1.32 1.32 0 1 1-2.64 0 1.32 1.32 0 0 1 2.64 0"
                        />
                      </svg>
                      <small class="text-xs leading-none truncate w-44 text-gray-600 ml-2">
                        {{ task.description }}
                      </small>
                    </div>
                  </td>

                  <td class="pl-5">
                    <div class="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="h-5 w-5 text-gray-700"
                        viewBox="0 0 16 16"
                      >
                        <path
                          d="M8.515 1.019A7 7 0 0 0 8 1V0a8 8 0 0 1 .589.022zm2.004.45a7.003 7.003 0 0 0-.985-.299l.219-.976c.383.086.76.2 1.126.342zm1.37.71a7.01 7.01 0 0 0-.439-.27l.493-.87a8.025 8.025 0 0 1 .979.654l-.615.789a6.996 6.996 0 0 0-.418-.302zm1.834 1.79a6.99 6.99 0 0 0-.653-.796l.724-.69c.27.285.52.59.747.91l-.818.576zm.744 1.352a7.08 7.08 0 0 0-.214-.468l.893-.45a7.976 7.976 0 0 1 .45 1.088l-.95.313a7.023 7.023 0 0 0-.179-.483m.53 2.507a6.991 6.991 0 0 0-.1-1.025l.985-.17c.067.386.106.778.116 1.17l-1 .025zm-.131 1.538c.033-.17.06-.339.081-.51l.993.123a7.957 7.957 0 0 1-.23 1.155l-.964-.267c.046-.165.086-.332.12-.501zm-.952 2.379c.184-.29.346-.594.486-.908l.914.405c-.16.36-.345.706-.555 1.038l-.845-.535m-.964 1.205c.122-.122.239-.248.35-.378l.758.653a8.073 8.073 0 0 1-.401.432l-.707-.707z"
                        />
                        <path d="M8 1a7 7 0 1 0 4.95 11.95l.707.707A8.001 8.001 0 1 1 8 0z" />
                        <path
                          d="M7.5 3a.5.5 0 0 1 .5.5v5.21l3.248 1.856a.5.5 0 0 1-.496.868l-3.5-2A.5.5 0 0 1 7 9V3.5a.5.5 0 0 1 .5-.5"
                        />
                      </svg>
                      <p class="text-sm leading-none text-gray-600 ml-2">
                        {{ dayjs(task.start_date).format('DD/MM/YYYY') }}
                      </p>
                    </div>
                  </td>

                  <td>
                    <button
                      v-if="!task.is_completed"
                      @click="completeTask(task.id)"
                      class="focus:ring-2 me-2 focus:ring-offset-2 w-52 focus:ring-red-300 text-xs font-semibold leading-none text-indigo-700 py-2 px-2.5 bg-indigo-100 rounded hover:bg-green-200 hover:text-green-800 focus:outline-none"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        class="h-5 w-5 me-1 inline-block"
                        viewBox="0 0 16 16"
                      >
                        <path
                          d="M3 14.5A1.5 1.5 0 0 1 1.5 13V3A1.5 1.5 0 0 1 3 1.5h8a.5.5 0 0 1 0 1H3a.5.5 0 0 0-.5.5v10a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5V8a.5.5 0 0 1 1 0v5a1.5 1.5 0 0 1-1.5 1.5z"
                        />
                        <path
                          d="m8.354 10.354 7-7a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0"
                        />
                      </svg>
                      Definir como Concluída
                    </button>
                    <span
                      v-if="task.is_completed"
                      class="font-semibold inline-block text-center text-xs w-52 leading-none py-2 px-4 me-2 rounded-full text-green-700"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        class="h-5 w-5 me-1 inline-block"
                        viewBox="0 0 16 16"
                      >
                        <path
                          d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022"
                        />
                      </svg>
                      Tarefa foi Concluía
                    </span>
                    <button
                      @click="deleteTasks(task.id)"
                      class="focus:ring-2 focus:ring-offset-2 text-red-600 focus:ring-red-300 text-xs font-semibold leading-none py-3 px-5 bg-red-100 rounded hover:bg-red-200 focus:outline-none"
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
            <!-- conteúdo  -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
