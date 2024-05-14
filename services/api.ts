import axios, { AxiosError } from "axios";
import { parseCookies } from "nookies";
import { AuthTokenError } from "./erros/AuthTokenError";
import { signOut } from "@/hooks/auth";

export function setupAPIClient(ctx = undefined) {
  let cookies = parseCookies(ctx);

  const api = axios.create({
    baseURL:
      "https://hampix-server-gtvd-3j1neuy12-devjoedson91s-projects.vercel.app",
    headers: {
      Authorization: `Bearer ${cookies["@frajola.token"]}`,
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

          signOut();
        } else {
          return Promise.reject(new AuthTokenError());
        }
      }

      return Promise.reject(error);
    }
  );

  return api;
}
