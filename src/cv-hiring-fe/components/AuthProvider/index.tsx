import { useQuery } from "@apollo/client";
import Router, { useRouter } from "next/router";
import React, { createContext, useContext, useEffect, useState } from "react";
import { User } from "../../data";
import { FETCH_USER_LOGIN } from "../../GraphQL/Query/FetchData";
import { useRedirect } from "../../hooks/useRedirect";
import {
  setLoggedIn,
  setSettingWebsite,
  setUserLoggedIn,
} from "../../store/features/userSlideder";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import { LoadingApp } from "../LoadingApp";
import NotFound from "../NotFound";

export const AuthContext = createContext<{
  isLogged: boolean;
  user: User | null;
  setIsLogged: React.Dispatch<React.SetStateAction<boolean>>;
}>({
  user: null,
  isLogged: false,
  setIsLogged: () => {},
});

export interface AuxProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuxProps) => {
  const [user, setUser] = useState<User | null>(null);
  const { data, loading, error } = useQuery(FETCH_USER_LOGIN);
  const [isLogged, setIsLogged] = useState(false);
  const dispatch = useAppDispatch();
  const shouldRedirect = useRedirect();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && data?.me) {
      dispatch(setUserLoggedIn(data.me));
      dispatch(setLoggedIn(true));
    }
    if (data?.settingWebsite) {
      dispatch(setSettingWebsite(data.settingWebsite));
    }
  }, [data]);
  useAuth();

  if (loading || error) {
    return <LoadingApp />;
  }
  if (shouldRedirect) {
    return <NotFound />;
  }

  return (
    <AuthContext.Provider value={{ user, isLogged, setIsLogged }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  const userLoggedIn = useAppSelector((state) => state.user);
  // da dang nhap => khong vao duoc login, reigster
  const protectedRoute = ["/login", "/register-type"];
  const router = useRouter();

  useEffect(() => {
    if (userLoggedIn.isLoggedIn && protectedRoute.includes(router.asPath)) {
      Router.replace("/");
    }
  }, [userLoggedIn]);

  return context;
};
