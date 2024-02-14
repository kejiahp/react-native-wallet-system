import React, { PropsWithChildren, createContext, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import axios, { AxiosInstance } from "axios";
import { securekeys } from "../utils/async.keys";
import { saveToSecureStore } from "../storage/secure.storage";

const BASE_URL = "https://gmw-taa.com";
const API_VERSION = "api/v1";
const API_URL = BASE_URL + "/" + API_VERSION;

type AxiosContextType = {
  authAxios: AxiosInstance | null;
  publicAxios: AxiosInstance | null;
};

export const AxiosContext = createContext<AxiosContextType>({
  authAxios: null,
  publicAxios: null,
});

function AxiosProvider({ children }: PropsWithChildren) {
  const AUTH_CONTEXT = useContext(AuthContext);

  const authAxios = axios.create({
    baseURL: API_URL,
  });

  const publicAxios = axios.create({
    baseURL: API_URL,
  });

  const refreshToken = async () => {
    try {
      const REFRESH_TOKEN = AUTH_CONTEXT.authState.refreshToken;
      const response = await axios.post(`${API_URL}/auth/refresh`, {
        refresh_token: REFRESH_TOKEN,
      });
      AUTH_CONTEXT.setAuthState((oldState) => ({
        ...oldState,
        accessToken: response.data.data.access_token,
      }));

      await saveToSecureStore(
        securekeys.auth_tokens,
        JSON.stringify({
          accessToken: response.data.data.access_token,
          refreshToken: AUTH_CONTEXT.authState.refreshToken,
        })
      );

      return response.data.data.access_token;
    } catch (error: any) {
      if (error.response?.status === 401 || error) {
        AUTH_CONTEXT.setAuthState({
          accessToken: undefined,
          refreshToken: undefined,
          authenticated: false,
        });
      }
    }
  };

  authAxios.interceptors.request.use(
    async (config) => {
      const access_token = AUTH_CONTEXT.authState.accessToken;
      if (!config.headers["Authorization"]) {
        config.headers["Authorization"] = `Bearer ${access_token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  authAxios.interceptors.response.use(
    (response) => response,
    async (error) => {
      const prevRequest = error?.config;
      if (error?.response?.status === 401 && !prevRequest?.sent) {
        prevRequest.sent = true;
        const newAccessToken = await refreshToken();
        prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return authAxios(prevRequest);
      }
      return Promise.reject(error);
    }
  );

  return (
    <AxiosContext.Provider value={{ authAxios, publicAxios }}>
      {children}
    </AxiosContext.Provider>
  );
}

export default AxiosProvider;
