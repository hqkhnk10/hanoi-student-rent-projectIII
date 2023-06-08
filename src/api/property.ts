import request from '../axios'

export const getProperties = async (params)=> {
  const res = await request.get({ url: 'GetProperty', params: params })
  return res
}
