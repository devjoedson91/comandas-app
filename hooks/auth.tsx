"use client";
import { createContext, ReactNode, useState, useEffect } from "react";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import { useRouter } from "next/navigation";
import Router from "next/router";
import { api } from "@/services/apiClient";
import { toast, useToast } from "@/components/ui/use-toast";

type UserProps = {
  id: string;
  name: string;
  email: string;
};

type SignInProps = {
  email: string;
  password: string;
};

type AuthProviderProps = {
  children: ReactNode;
};

type AuthContextData = {
  user?: UserProps;
  isAuthenticated: boolean;
  signIn: (credentials: SignInProps) => Promise<void>;
};

export const Auth = createContext({} as AuthContextData);

export function signOut() {
  try {
    destroyCookie(undefined, "@frajola.token");

    Router.push("/");
  } catch (error: any) {
    toast({
      description: error.response?.data.error,
      variant: "destructive",
    });
  }
}

export function AuthProvider({ children }: AuthProviderProps) {
  const { toast } = useToast();

  const [user, setUser] = useState<UserProps>();

  const isAuthenticated = !!user;

  const router = useRouter();

  useEffect(() => {
    const { "@frajola.token": token } = parseCookies();

    if (token) {
      api
        .get("/userinfo")
        .then((response) => {
          const { id, name, email } = response.data;
          setUser({ id, name, email });
        })
        .catch(() => {
          signOut();
        });
    }
  }, []);

  async function signIn({ email, password: senha }: SignInProps) {
    try {
      const response = await api.post("/session", {
        email,
        senha,
      });

      const { id, name, token } = response.data;

      setCookie(undefined, "@frajola.token", token, {
        maxAge: 60 * 60 * 24 * 30,
        path: "/",
      });

      setUser({ id, name, email });

      api.defaults.headers["Authorization"] = `Bearer ${token}`;

      router.push("/menu");
    } catch (err: any) {
      toast({
        title: "Não foi possível realizar o login:",
        description: err.response?.data.error,
        variant: "destructive",
      });
    }
  }

  return (
    <Auth.Provider value={{ signIn, isAuthenticated, user }}>
      {children}
    </Auth.Provider>
  );
}
