import Vue from 'vue'
import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:1337/api/'
  // baseURL: process.env.API_URL
})

api.interceptors.response.use(
  function(response) {
    api.defaults.headers.post['Content-Type'] =
      'application/x-www-form-urlencoded'

    // console.log(response);
    return response
  },
  function(error) {
    // console.log(error);
    return Promise.reject(error)
  }
)

api.interceptors.request.use(function(config) {
  const token = localStorage.getItem('token')
  if (token !== null) {
    config.headers.common.Authorization =
      'Bearer ' + localStorage.getItem('token')
  }
  return config
})

Vue.prototype.$axios = api

// add axios to store
export default ({ store }) => {
  store.$axios = api
}

export const GET = async url => {
  try {
    const { data } = await api.get(url)
    return { status: true, data }
  } catch (error) {
    return { status: false, data: error?.response?.data }
  }
}

export { api }
