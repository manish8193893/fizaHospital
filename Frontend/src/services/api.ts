import axios from "axios";

type ApiErrorResponse = {
  msgText?: string;
};

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export function getApiErrorMessage(error: unknown, fallback: string) {
  if (axios.isAxiosError<ApiErrorResponse>(error)) {
    return error.response?.data?.msgText || error.message || fallback;
  }

  return fallback;
}

export default api;
