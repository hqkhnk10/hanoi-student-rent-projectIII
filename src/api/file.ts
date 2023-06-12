import request from '../axios'

export const deleteFile = async (params) => {
  const res = await request.delete({ url: 'File', params: params })
  return res
}