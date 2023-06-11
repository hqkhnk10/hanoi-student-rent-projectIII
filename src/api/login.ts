import request from '../axios'

export const loginAPI = async (data) => {
  const res = await request.post({ url: 'Login', data: data })
  return res
}
export const registerAPI = async (data) => {
  const res = await request.post({ url: 'Register', data: data })
  return res
}
