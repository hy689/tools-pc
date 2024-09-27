import axios from "axios";
import type { AxiosResponse, AxiosRequestConfig } from 'axios'
import { RequestInterceptors, RequestConfig, CoverAxiosInstace } from "../types/axios-request";

class Request {
    instance: CoverAxiosInstace
    interceptorsObj?: RequestInterceptors

    constructor(config: RequestConfig) {
        this.instance = axios.create(config)
        this.interceptorsObj = config.interceptors

        this.instance.interceptors.request.use(
            (res: AxiosRequestConfig) => {
                return res
            },
            (err: any) => err,
        )

        this.instance.interceptors.request.use(
            this.interceptorsObj?.requestInterceptors,
            this.interceptorsObj?.requestInterceptorsCatch,
        )

        this.instance.interceptors.response.use(
            this.interceptorsObj?.responseInterceptors,
            this.interceptorsObj?.responseInterceptorsCatch,
        )

        this.instance.interceptors.response.use(
            // 因为我们接口的数据都在res.data下，所以我们直接返回res.data
            (res: AxiosResponse) => {
                return res.data
            },
            (err: any) => err,
        )
    }

    request<T>(config: RequestConfig): Promise<T> {
        return new Promise((resolve, reject) => {
            // 如果我们为单个请求设置拦截器，这里使用单个请求的拦截器
            if (config.interceptors?.requestInterceptors) {
                config = config.interceptors.requestInterceptors(config)
            }
            this.instance
                .request<any, T>(config)
                .then(res => {
                    // 如果我们为单个响应设置拦截器，这里使用单个响应的拦截器
                    if (config.interceptors?.responseInterceptors) {
                        res = config.interceptors.responseInterceptors<T>(res)
                    }

                    resolve(res)
                })
                .catch((err: any) => {
                    reject(err)
                })
        })
    }

}




export default Request

