import { ApiResponse } from "@/lib/helpers/server-function-response";
import { TParking, TParkingMap, TUpdateUserPassword, TUpdateUserUsername, TUser } from "@/lib/types";
import axios, { AxiosResponse } from "axios";

axios.defaults.baseURL = '/api';

const responseBody = <T> (response: AxiosResponse<T>) => response.data;

const requests = {
    get: <T> (url: string) => axios.get<T>(url).then(responseBody),
    post: <T> (url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T> (url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    delete: <T> (url: string) => axios.delete<T>(url).then(responseBody),
}

const Parkings = {
    list: () => requests.get<ApiResponse<TParking[] | null>>('/parkings'),
    listForMap: () => requests.get<ApiResponse<TParkingMap[] | null>>('/parkings?formatting=map'),
    details: (id: string) => requests.get<TParking | null>(`/parkings/${id}`),
    create: (parking: TParking) => axios.post<void>('/parkings', parking),
    update: (parking: TParking) => axios.put<void>(`/parkings/${parking.id}`, parking),
    delete: (id: string) => axios.delete<void>(`/parkings/${id}`)
}

const Users = {
    updateUsernameByEmail: (email: string, updateUserUsername: TUpdateUserUsername) => axios.patch<ApiResponse<TUser | null>>(`/users/by-email?email=${email}`, updateUserUsername),
    updatePasswordByEmail: (email: string, updateUserPassword: TUpdateUserPassword) => axios.patch<ApiResponse<TUser | null>>(`/users/password-reset/by-email?email=${email}`, updateUserPassword),
}

const agent = {
    Parkings,
    Users,
}

export default agent;