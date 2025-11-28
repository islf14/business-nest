import axios from 'axios'
import { base_api_url } from './constants'

export default {
  //AUTH
  getRegister: (data: object) =>
    axios.post(`${base_api_url}/auth/register`, data),
  getLogin: (data: object) => axios.post(`${base_api_url}/auth/login`, data),
  getLogout: (data: object, token: object) =>
    axios.post(`${base_api_url}/logout`, data, token),

  //ROL ADMIN
  getUserAll: (token: object) => axios.get(`${base_api_url}/users`, token),
  getUserById: (id: number, token: object) =>
    axios.get(`${base_api_url}/users/${id}`, token),
  getUserUpdate: (id: number, data: object, token: object) =>
    axios.patch(`${base_api_url}/users/${id}`, data, token),

  //CATEGORY
  getCategoryAll: (token: object) =>
    axios.get(`${base_api_url}/categories`, token),
  getCategoryStore: (data: object, token: object) =>
    axios.post(`${base_api_url}/categories`, data, token),
  getCategoryById: (id: number, token: object) =>
    axios.get(`${base_api_url}/categories/${id}`, token),
  getCategoryUpdate: (id: number, data: object, token: object) =>
    axios.patch(`${base_api_url}/categories/${id}`, data, token),
  getCategoryDelete: (id: number, token: object) =>
    axios.delete(`${base_api_url}/categories/${id}`, token),

  // IMAGE
  getCategoryImage: (name: string, token: object) =>
    axios.get(`${base_api_url}/file/${name}`, token)
}
