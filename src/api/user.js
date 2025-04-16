import myAxios from './request'
export const getToken = (data) => {
  return myAxios.post('token/', data)
}
