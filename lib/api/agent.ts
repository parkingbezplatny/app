import { ApiResponse } from "@/lib/helpers/server-function-response";
import {
  TCreateParking,
  TParking,
  TParkingMap,
  TSignUpForm,
  TUpdateParking,
  TUpdateUserPassword,
  TUpdateUserUsername,
  TUser,
} from "@/lib/types";
import axios, { AxiosResponse } from "axios";

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
  get: <T>(url: string) => axios.get<T>(url).then(responseBody),
  post: <T>(url: string, body: {}) =>
    axios.post<T>(url, body).then(responseBody),
  put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
  patch: <T>(url: string, body: {}) =>
    axios.patch<T>(url, body).then(responseBody),
  delete: <T>(url: string) => axios.delete<T>(url).then(responseBody),
};

const Parkings = {
  list: () => requests.get<ApiResponse<TParking[] | null>>("/api/parkings"),
  listForMap: () =>
    requests.get<ApiResponse<TParkingMap[] | null>>(
      "/api/parkings?formatting=map"
    ),
  details: (id: string) =>
    requests.get<ApiResponse<TParking | null>>(`/api/parkings/${id}`),
  create: (parking: TCreateParking) =>
    requests.post<ApiResponse<TParking | null>>("/api/parkings", parking),
  update: (id: string, parking: TUpdateParking) =>
    requests.patch<ApiResponse<TParking | null>>(
      `/api/parkings/${id}`,
      parking
    ),
  delete: (id: string) =>
    requests.delete<ApiResponse<null>>(`/api/parkings/${id}`),
};

const Users = {
  updateUsernameByEmail: (
    email: string,
    updateUserUsername: TUpdateUserUsername
  ) =>
    requests.patch<ApiResponse<TUser | null>>(
      `/api/users/by-email?email=${email}`,
      updateUserUsername
    ),
  updatePasswordByEmail: (
    email: string,
    updateUserPassword: TUpdateUserPassword
  ) =>
    requests.patch<ApiResponse<TUser | null>>(
      `/api/users/password-reset/by-email?email=${email}`,
      updateUserPassword
    ),
};

const Auth = {
  signUpWithCredentials: (sigupFrom: TSignUpForm) =>
    axios.post<ApiResponse<TUser | null>>(`/api/account`, sigupFrom),
};

const agent = {
  Parkings,
  Users,
  Auth,
};

export default agent;
