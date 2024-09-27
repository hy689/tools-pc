import { RequestConfig } from "../types/axios-request";
import Request from "./axios-request";
import store from "./store";

const request = new Request({
    baseURL: import.meta.env.VITE_BASE_URL,
    timeout: 1000 * 60 * 5,
    headers: {
      Authorization: store.getItem('__token__') || '',
    },
    interceptors: {
      // 请求拦截器
      requestInterceptors: config => {
  
        return config
      },
      // 响应拦截器
      responseInterceptors: result => {
        return result
      },
    },
  })
  
interface IResponseData<T> extends RequestConfig{
  data: T
}

interface IResponse<T> {
  errorCode: number
  message: string
  data: T
  success: boolean
}

const axios = <D, T = any>(config: IResponseData<D>) => {
  const { method = 'GET' } = config
  if (method === 'get' || method === 'GET') {
    config.params = config.data
  }
  config.headers = {
    ...config.headers,
    Authorization: store.getItem('__token__') || '',
  }
  return request.request<IResponse<T>>(config)
}

export default axios

