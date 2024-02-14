import axios, { AxiosInstance } from "axios";

const BASE_URL = "https://gmw-taa.com";
const API_VERSION = "api/v1";

export const publicRequest = axios.create({
  baseURL: BASE_URL + "/" + API_VERSION,
});

export async function createUserService(data: FormData) {
  try {
    const res = await publicRequest.post(`/auth/create-user`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  } catch (error: any) {
    throw error;
  }
}

export async function verifyAccountService({
  data,
}: {
  data: { otp: string; email: string };
}) {
  try {
    const res = await publicRequest.post(`/auth/email-verification`, data);
    return res.data;
  } catch (error: any) {
    throw error;
  }
}

export async function loginService({
  authInstance,
  email,
  password,
}: {
  authInstance: AxiosInstance;
  email: string;
  password: string;
}) {
  try {
    const res = await authInstance.post(`/auth/login`, {
      email: email,
      password: password,
    });
    return res.data;
  } catch (error: any) {
    throw error;
  }
}
