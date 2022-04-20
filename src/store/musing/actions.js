import { api } from "@/boot/axios";
import qs from 'qs'

export function all(context, params = {}) {
  return api.get('/musings', {
    params,
    paramsSerializer: (params) => {
      return qs.stringify(params, { arrayFormat: 'repeat', encodeValuesOnly: true, })
    }
  })
}

export function create(context, data) {
  return api.post('/musings', {data}).catch((error) => {
      return error.response.data
  })
}

export function update(context, data) {
  const {id} = data
  return api.put('/musings/' + id, {data}).catch((error) => {
      return error.response.data
  })
}

export function deleteOne(context, data) {
  const { id } = data
  return api.delete('/musings/' + id).catch((error) => {
    return error.response.data
  })
}