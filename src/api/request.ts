import { AxiosRequestConfig } from "axios";
import service from "./service";

interface CustomSuccessData<T>{
  data:T
  success:boolean
  message:string
}

export const get = <T>(url: string, params?: any,config?:AxiosRequestConfig): Promise<CustomSuccessData<T>> => {
  return service({
    url,
    method: "get",
    params,
    ...config
  });
}

export const post = <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<CustomSuccessData<T>> => {
  return service({
    url,
    method: "post",
    data,
    ...config
  });
}