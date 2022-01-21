import { Spin } from "antd";
import React from "react";
import styles from "./style.module.scss";

export const LoadingApp = () => {
  return (
    <div className={styles.wrapLoading}>
      <Spin size="large" />
    </div>
  );
};
