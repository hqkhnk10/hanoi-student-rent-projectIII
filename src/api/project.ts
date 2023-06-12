import request from '../axios'

export const getProject = async (params)=> {
  const res = await request.get({ url: 'Project', params: params })
  return res
}
export const postProject = async (data)=> {
  const res = await request.post({ url: 'Project', data: data })
  return res
}
export const putProject = async (data)=> {
  const res = await request.put({ url: 'Project', data: data })
  return res
}
export const deleteProject = async (params)=> {
  const res = await request.delete({ url: 'Project', params: params })
  return res
}
export const getProjectById = async (params)=> {
  const res = await request.get({ url: 'Project/ById', params: params })
  return res
}