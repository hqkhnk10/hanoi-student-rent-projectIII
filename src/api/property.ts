import request from '../axios'

export const getProperties = async (params)=> {
  const res = await request.get({ url: 'GetProperty', params: params })
  return res
}
export const postProperties = async (data)=> {
  const res = await request.post({ url: 'InsertProperty', data: data })
  return res
}
export const putProperties = async (data)=> {
  const res = await request.put({ url: 'UpdateProperty', data: data })
  return res
}
export const deleteProperties = async (params)=> {
  const res = await request.delete({ url: 'DeleteProperty', params: params })
  return res
}
export const getPropertyById = async (params)=> {
  const res = await request.get({ url: 'GetDetailProperty', params: params })
  return res
}