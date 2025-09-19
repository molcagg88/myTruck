import { UserType } from "@/constants/data";
import { createContext } from "react";

type AuthContextType = {
  user_id: number | null;
  user_type: UserType | null;
  isAuth: boolean;
  token: string | null;
  login: (newToken: string) => void;
  logout: () => void;
  loading: boolean;
};

const defaultAuthContext: AuthContextType = {
  user_id: null,
  user_type: null,
  isAuth: false,
  token: null,
  login: () => {},
  logout: () => {},
  loading: true,
};

export const AuthContext = createContext<AuthContextType>(defaultAuthContext);
