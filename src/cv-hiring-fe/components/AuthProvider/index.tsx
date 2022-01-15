import { useQuery } from "@apollo/client";
import { Spin } from "antd";
import React, { createContext, useEffect, useState } from "react";
import { FETCH_USER_LOGIN } from "../../GraphQL/Query/FetchData";
import styles from "./style.module.scss";

const AuthContext = createContext({});

export interface AuxProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuxProps) => {
  const [user, setUser] = useState();
  const { data, loading, error } = useQuery(FETCH_USER_LOGIN);
  const [isLogged, setIsLogged] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && data?.me) {
      setUser(data?.me);
      setIsLogged(true);
    }
  }, [data]);

  if (loading || error) {
    return (
      <div className={styles.wrapLoading}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, isLogged }}>
      {children}
    </AuthContext.Provider>
  );
};
