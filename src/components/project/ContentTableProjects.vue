<script setup>
import { ref, onMounted } from 'vue'
import dayjs from 'dayjs'
import LoadingBox from '@/components/shared/LoadingBox.vue'
import ModalContainer from '@/components/shared/ModalContainer.vue'
import AlertMessages from '@/components/shared/AlertMessages.vue'
import CreateFormProject from '@/components/project/CreateFormProject.vue'
import ApiProject from '@/api/project'
import { RouterLink } from 'vue-router'

const projects = ref([])
const isLoading = ref(false)
const openCreateModal = ref(false)
const messageError = ref([])

const closeCreateModal = () => (openCreateModal.value = false)

const finishCreate = () => {
  closeCreateModal()
  getProjects()
}

const getProjects = () => {
  isLoading.value = true

  ApiProject.index()
    .then((response) => {
      projects.value = response.data
      isLoading.value = false
    })
    .catch(function (error) {
      messageError.value = error.response.data
      isLoading.value = false
    })
}

onMounted(() => getProjects())
</script>
<template>
  <div>
    <!-- alertas -->
    <AlertMessages v-if="messageError.length > 0" :message="messageError.message" type="error" />
    <!-- alertas -->

    <!-- modal -->
    <ModalContainer :show="openCreateModal" @close="closeCreateModal">
      <div class="p-5">
        <CreateFormProject @close="finishCreate()" />
      </div>
    </ModalContainer>
    <!-- modal -->

    <div class="w-full">
      <div class="bg-white py-4 md:py-7">
        <div class="sm:flex items-center justify-between">
          <div class="flex items-center"></div>
          <button
            @click="openCreateModal = !openCreateModal"
            type="button"
            class="focus:ring-2 focus:ring-offset-2 focus:ring-gray-600 mt-4 sm:mt-0 inline-flex items-start justify-start px-7 py-4 bg-gray-800 hover:bg-gray-600 focus:outline-none rounded"
          >
            <p class="text-sm font-medium leading-none text-white">Adicionar novo Projeto</p>
          </button>
        </div>
        <div class="mt-7 overflow-x-auto rounded">
          <LoadingBox v-if="isLoading" />

          <template v-else>
            <section
              v-if="projects.length == 0"
              class="bg-gray-200/60 backdrop-blur-sm rounded-lg bg-opacity-80"
            >
              <div class="mx-auto max-w-screen-xl px-4 mb-1 py-10 lg:flex lg:items-center">
                <div class="mx-auto max-w-xl text-center">
                  <p class="mt-3 text-lg">Ainda não há projetos cadastrados no sistema!</p>

                  <div class="mt-2 flex flex-wrap justify-center gap-4">
                    <a
                      href="#"
                      @click="openCreateModal = !openCreateModal"
                      class="text-blue-600 font-semibold hover:underline"
                    >
                      Crie um novo Projeto
                    </a>
                  </div>
                </div>
              </div>
            </section>

            <!-- conteúdo  -->
            <table class="w-full" v-else>
              <tbody>
                <tr
                  tabindex="0"
                  class="focus:outline-none h-16 border border-gray-100 rounded hover:bg-gray-100/40 odd:bg-white even:bg-slate-50"
                  v-for="project in projects"
                  :key="project.id"
                >
                  <td>
                    <div class="ml-5 text-gray-300 text-sm">#{{ project.id }}</div>
                  </td>
                  <td class="">
                    <div class="flex items-center pl-5">
                      <p class="text-base font-semibold leading-none text-gray-700 mr-2">
                        {{ project.name }}
                      </p>
                    </div>
                  </td>
                  <td class="pl-24">
                    <div class="flex items-center">
                      <div class="group relative w-7">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          class="h-5 w-5 text-indigo-400"
                          viewBox="0 0 16 16"
                        >
                          <path
                            d="m9.708 6.075-3.024.379-.108.502.595.108c.387.093.464.232.38.619l-.975 4.577c-.255 1.183.14 1.74 1.067 1.74.72 0 1.554-.332 1.933-.789l.116-.549c-.263.232-.65.325-.905.325-.363 0-.494-.255-.402-.704l1.323-6.208Zm.091-2.755a1.32 1.32 0 1 1-2.64 0 1.32 1.32 0 0 1 2.64 0"
                          />
                        </svg>
                        <span
                          class="pointer-events-none absolute text-xs font-normal text-justify z-20 -top-7 left-0 w-52 whitespace-break-spaces bg-white border border-gray-200 p-3 rounded overflow-clip break-all shadow-sm opacity-0 transition-opacity group-hover:opacity-100"
                        >
                          {{ project.description }}
                        </span>
                      </div>

                      <small
                        class="text-xs leading-none truncate w-60 text-gray-600 ml-2 hover:overflow-ellipsis"
                      >
                        {{ project.description }}
                      </small>
                    </div>
                  </td>

                  <td class="px-5">
                    <div class="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="h-4 w-4 text-gray-700"
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
                        {{ dayjs(project.start_date).format('DD/MM/YYYY') }}
                      </p>
                    </div>
                  </td>
                  <td class="pl-4">
                    <RouterLink
                      :to="'/tasks/project/' + project.id"
                      class="focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 text-xs font-semibold leading-none text-gray-600 py-2.5 px-5 bg-gray-200 rounded hover:bg-gray-300 focus:outline-none"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        class="w-5 h-5 text-indigo-600 inline-block me-1"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M2 2.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5V3a.5.5 0 0 0-.5-.5zM3 3H2v1h1z"
                        />
                        <path
                          d="M5 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5M5.5 7a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1zm0 4a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1z"
                        />
                        <path
                          fill-rule="evenodd"
                          d="M1.5 7a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H2a.5.5 0 0 1-.5-.5zM2 7h1v1H2zm0 3.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm1 .5H2v1h1z"
                        />
                      </svg>
                      Ver Tarefas
                    </RouterLink>
                  </td>
                </tr>
              </tbody>
            </table>
            <!-- conteúdo  -->
          </template>
        </div>
      </div>
    </div>
  </div>
</template>
