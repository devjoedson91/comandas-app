import axios, { AxiosError } from "axios";
import { parseCookies, destroyCookie } from "nookies";
import { AuthTokenError } from "./erros/AuthTokenError";

export function setupAPIClient(ctx = undefined) {
  let cookies = parseCookies(ctx);

  const cookie = JSON.parse(cookies["@frajola.token"] || "{}");

  const api = axios.create({
    baseURL: "https://hampix-server-gtvd.vercel.app",
    headers: {
      Authorization: `Bearer ${cookie.token}`,
    },
  });

  // criando middleware para interceptar possiveis falhas na requisição

  api.interceptors.response.use(
    (response) => {
      return response;
    },
    (error: AxiosError) => {
      if (error.response?.status === 401) {
        // qualquer erro 401 (não autorizado) devemos deslogar o usuario

        if (typeof window !== undefined) {
          // chamar a função para deslogar o usuario

          destroyCookie(undefined, "@frajola.token");
        } else {
          return Promise.reject(new AuthTokenError());
        }
      }

      return Promise.reject(error);
    }
  );

  return api;
}
