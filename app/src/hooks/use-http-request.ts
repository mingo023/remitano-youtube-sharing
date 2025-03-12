import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { toast } from "react-toastify";

let instance: AxiosInstance;

const headers: Readonly<Record<string, string | boolean>> = {
  Accept: "application/json",
  "Content-Type": "application/json; charset=utf-8",
};

const handleRequest = (
  config: InternalAxiosRequestConfig,
): InternalAxiosRequestConfig => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
};

export default function httpRequest<T>(
  config: Partial<AxiosRequestConfig>,
): Promise<T> {
  if (!instance) {
    instance = axios.create({
      baseURL: import.meta.env.VITE_API_URL as string,
      headers,
    });

    instance.interceptors.request.use(handleRequest);
    instance.interceptors.response.use(
      handleResponseSuccess,
      handleResponseError,
    );
  }

  return instance(config) as Promise<T>;
}

const handleResponseSuccess = (response: AxiosResponse) => {
  return response.data;
};

const handleResponseError = (error: AxiosError) => {
  toast.error((error.response?.data as any).message || "An error occurred");
  throw error;
};
