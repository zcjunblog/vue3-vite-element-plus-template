import {AxiosRequestConfig} from "axios";

/**
 * @Created By zhaozc
 * @date 2021/5/28
 * @Description:
 */
declare module 'axios' {
    interface AxiosInstance {
        (config: AxiosRequestConfig): Promise<any>
    }
}
