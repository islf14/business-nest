import axios from 'axios'
import { base_api_url } from './constants'

export default {
  //AUTH
  register: (data: object) => axios.post(`${base_api_url}/auth/register`, data),
  login: (data: object) => axios.post(`${base_api_url}/auth/login`, data),
  logout: (data: object, token: object) =>
    axios.post(`${base_api_url}/logout`, data, token),

  //ROL ADMIN
  allUsers: (token: object) => axios.get(`${base_api_url}/users`, token),
  findUser: (id: number, token: object) =>
    axios.get(`${base_api_url}/users/${id}`, token),
  updateUser: (id: number, data: object, token: object) =>
    axios.patch(`${base_api_url}/users/${id}`, data, token),

  //CATEGORY
  allCategories: (token: object) =>
    axios.get(`${base_api_url}/categories`, token),
  createCategory: (data: object, token: object) =>
    axios.post(`${base_api_url}/categories`, data, token),
  findCategory: (id: number, token: object) =>
    axios.get(`${base_api_url}/categories/${id}`, token),
  updateCategory: (id: number, data: object, token: object) =>
    axios.patch(`${base_api_url}/categories/${id}`, data, token),
  deleteCategory: (id: number, token: object) =>
    axios.delete(`${base_api_url}/categories/${id}`, token),

  // IMAGE
  getCategoryImage: (name: string, token: object) =>
    axios.get(`${base_api_url}/file/${name}`, token),

  // COMPANY
  allCompanies: (token: object) =>
    axios.get(`${base_api_url}/companies`, token),
  createCompany: (data: object, token: object) =>
    axios.post(`${base_api_url}/companies`, data, token),
  findCompany: (id: number, token: object) =>
    axios.get(`${base_api_url}/companies/${id}`, token),
  updateCompany: (id: number, data: object, token: object) =>
    axios.patch(`${base_api_url}/companies/${id}`, data, token),
  deleteCompany: (id: number, token: object) =>
    axios.delete(`${base_api_url}/companies/${id}`, token)
}
