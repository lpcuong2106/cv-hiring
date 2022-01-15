import { useQuery } from "@apollo/client";
import { Spin } from "antd";
import Router, { useRouter } from "next/router";
import React, { createContext, useContext, useEffect, useState } from "react";
import { FETCH_USER_LOGIN } from "../../GraphQL/Query/FetchData";
import styles from "./style.module.scss";

const AuthContext = createContext<{
  isLogged: boolean;
  user: any;
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
  const [user, setUser] = useState();
  const { data, loading, error } = useQuery(FETCH_USER_LOGIN);
  const [isLogged, setIsLogged] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && data?.me) {
      setUser(data?.me);
      setIsLogged(true);
    }
  }, [data]);

  // useEffect(() => {
  //   console.log(router.pathname);
  //   const publicRoute
  // }, [router.pathname]);
  if (loading || error) {
    return (
      <div className={styles.wrapLoading}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, isLogged, setIsLogged }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  useEffect(() => {
    if (context.isLogged) {
      Router.replace("/");
    }
  }, [context.isLogged]);

  return context;
};
