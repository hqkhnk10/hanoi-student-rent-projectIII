import request from '../axios'

export const getApprove = async (params) => {
  const res = await request.get({ url: 'Approve', params: params })
  return res
}
export const approveAPI = async (data) => {
  const res = await request.post({ url: 'Approve', data: data })
  return res
}
export const approveAllAPI = async (data) => {
  const res = await request.post({ url: 'Approve/All', data })
  return res
}
