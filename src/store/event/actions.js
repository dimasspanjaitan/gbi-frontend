import { api } from "@/boot/axios";
import qs from 'qs'

export function all(context, params = {}) {
  return api.get('/events', {
    params,
    paramsSerializer: (params) => {
      return qs.stringify(params, { arrayFormat: 'repeat', encodeValuesOnly: true, })
    }
  })
}

export function create(context, data) {
  return api.post('/events', {data}).catch((error) => {
      return error.response.data
  })
}

export function update(context, data) {
  const {id} = data
  return api.put('/events/' + id, {data}).catch((error) => {
      return error.response.data
  })
}

export function deleteOne(context, data) {
  const { id } = data
  return api.delete('/events/' + id).catch((error) => {
    return error.response.data
  })
}