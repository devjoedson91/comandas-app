import { useAppSelector } from "@/hooks/useAppSelector";
import { UserProps } from "@/types";
import { useDispatch } from "react-redux";
import { setUserAction } from ".";

export const useUserReducer = () => {
  const dispatch = useDispatch();
  const user = useAppSelector((state) => state.userReducer.user);

  const setUser = (currentUser: UserProps) => {
    dispatch(setUserAction(currentUser));
  };

  return {
    user,
    setUser,
  };
};
