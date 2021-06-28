import Axios, { AxiosInstance, AxiosRequestConfig } from 'axios'

export let axios: AxiosInstance

export const createAxiosInstance = (options: AxiosRequestConfig) => {
  axios = Axios.create(options)
}

export const setDefaultAxios = () => {
  axios = Axios.create({})
}