import Axios, { type AxiosInstance, type AxiosRequestConfig } from 'axios'

export let axios: AxiosInstance = Axios.create({})

export const createAxiosInstance = (options: AxiosRequestConfig) => {
  axios = Axios.create(options)
}

export const setDefaultAxios = () => {
  axios = Axios.create({})
}
