import axios, { AxiosInstance, AxiosResponse } from 'axios'
import type { Response } from '@/types/common'

interface ApiResponse<T> {
    success: boolean
    data?: T
    message?: string
}

class ApiClient {
    private readonly axiosInstance: AxiosInstance

    constructor(baseURL: string) {
        this.axiosInstance = axios.create({
            baseURL,
        })

        this.axiosInstance.interceptors.response.use(
            this.handleSuccessResponse,
            this.handleErrorResponse
        )
    }

    private handleSuccessResponse(response: AxiosResponse<ApiResponse<any>>): AxiosResponse<ApiResponse<any>> {
        const { success, message } = response.data;
        if (!success) {
            console.error(message)
        }
        return response;
    }

    private handleErrorResponse(error: any): ApiResponse<undefined> {
        const message = error.response?.data?.message || error.message

        console.error(message)

        return {
            success: false,
            message,
        }
    }

    public async get<T>(url: string): Promise<Response<T>> {
        const response = await this.axiosInstance.get<T>(url)
        return response.data as Response<T>
    }

    public async post<T>(url: string, data?: any): Promise<Response<T>> {
        const response = await this.axiosInstance.post<T>(url, data)
        return response.data as Response<T>
    }

    // 添加其他 HTTP 方法的实现
}

export const apiClient = new ApiClient('http://localhost:8080/api/photos/')