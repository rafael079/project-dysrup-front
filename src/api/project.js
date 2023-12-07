import axios from 'axios'

const instance = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL
})

export default {
  index() {
    return instance.get('/project')
  },
  insert(data) {
    return instance.post('/project', data)
  }
}
