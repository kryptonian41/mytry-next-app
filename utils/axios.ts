import Axios, { AxiosRequestConfig } from 'axios'

export let axios

export const createAxiosInstance = (options: AxiosRequestConfig) => {
	axios = Axios.create(options)
}