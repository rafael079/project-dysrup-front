import axios from 'axios'

const instance = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL
})

export default {
  index(projectId) {
    return instance.get('/task/project/' + projectId)
  },
  insert(data) {
    return instance.post('/task', data)
  },
  delete(taskId) {
    return instance.delete('/task/' + taskId)
  },
  patch(taskId) {
    return instance.patch('/task/' + taskId, { is_completed: true })
  }
}
