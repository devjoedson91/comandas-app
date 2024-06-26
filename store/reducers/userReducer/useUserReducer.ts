import { useEffect, useState } from "react";
import { SignInProps, UserProps } from "@/types";
import { useDispatch } from "react-redux";
import { setUserAction } from ".";
import { api } from "@/services/apiClient";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { useAppSelector } from "@/store/useAppSelector";

export const useUserReducer = () => {
  const router = useRouter();

  const { toast } = useToast();

  const dispatch = useDispatch();

  const user = useAppSelector((state) => state.userReducer.user);

  const [loadingAuth, setLoadingAuth] = useState(false);

  const setUser = (currentUser: UserProps) => {
    dispatch(setUserAction(currentUser));
  };

  useEffect(() => {
    const { "@frajola.token": cookie } = parseCookies();

    const hasUser: UserProps = JSON.parse(cookie || "{}");

    if (Object.keys(hasUser).length > 0) {
      api.defaults.headers.common["Authorization"] = `Bearer ${hasUser.token}`;

      setUser(hasUser);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function signIn({ email, password }: SignInProps) {
    try {
      setLoadingAuth(true);

      const response = await api.post("/session", {
        email,
        password,
      });

      const data = { ...response.data };

      setCookie(undefined, "@frajola.token", JSON.stringify(data), {
        maxAge: 60 * 60 * 24 * 30,
        path: "/",
      });

      setUser(data);

      api.defaults.headers["Authorization"] = `Bearer ${data.token}`;

      router.push("/menu");
    } catch (err: any) {
      toast({
        title: "Não foi possível realizar o login:",
        description: err.response?.data.error,
        variant: "destructive",
      });
    } finally {
      setLoadingAuth(false);
    }
  }

  function signOut() {
    try {
      destroyCookie(undefined, "@frajola.token");

      router.push("/");
    } catch (error: any) {
      toast({
        description: "Erro ao fazer Logout",
        variant: "destructive",
      });
    }
  }

  return {
    user,
    loadingAuth,
    signIn,
    signOut,
  };
};
