import { useQuery } from "@apollo/client";
import Router, { useRouter } from "next/router";
import React, { createContext, useContext, useEffect, useState } from "react";
import { User } from "../../data";
import { FETCH_USER_LOGIN } from "../../GraphQL/Query/FetchData";
import { setUserLoggedIn } from "../../store/features/userSlideder";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import { LoadingApp } from "../LoadingApp";

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

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && data?.me) {
      setUser(data?.me);
      setIsLogged(true);
      dispatch(setUserLoggedIn(data.me));
    }
  }, [data]);

  if (loading || error) {
    return <LoadingApp />;
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
  const protectedRoute = ["/login", "/register"];
  const protectedAcceptRoute = [
    "/viec-lam/ung-tuyen",
    "/quan-tri",
    "/quan-tri/tuyen-dung",
    "/quan-tri/cong-ty",
  ];
  const router = useRouter();

  useEffect(() => {
    if (context.isLogged && protectedRoute.includes(router.asPath)) {
      Router.replace("/");
    }
    // console.log("chjay day", router);
    // if (
    //   (!context.isLogged || userLoggedIn.user?.role.name !== "admin") &&
    //   protectedAcceptRoute.includes(router.asPath)
    // ) {
    //   Router.replace("/404");
    // }
  }, [context, userLoggedIn]);

  return context;
};
