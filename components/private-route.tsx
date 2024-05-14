import { ReactNode, useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { APP_ROUTES } from "@/constants/app-routes";
import { Auth } from "@/hooks/auth";

interface PrivateRouteProps {
  children: ReactNode;
}

export default function PrivateRoute({ children }: PrivateRouteProps) {
  const { push } = useRouter();

  const { isAuthenticated } = useContext(Auth);

  useEffect(() => {
    if (!isAuthenticated) {
      push(APP_ROUTES.public.home);
    }
  }, [isAuthenticated, push]);

  return (
    <>
      {!isAuthenticated && null}
      {isAuthenticated && children}
    </>
  );
}
