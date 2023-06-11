import request from '../axios'

export const getUsers = async (params)=> {
  const res = await request.get({ url: 'Users', params: params })
  return res
}
export const addUsers = async (data)=> {
  const res = await request.post({ url: 'Users', data: data })
  return res
}
export const updateUsers = async (data)=> {
  const res = await request.put({ url: 'Users', data: data })
  return res
}
export const deleteUsers = async (params)=> {
  const res = await request.delete({ url: 'Users', params: params })
  return res
}
export const getUserById = async (params)=> {
  const res = await request.get({ url: 'Users/ById', params: params })
  return res
}
