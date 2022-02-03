import { Breadcrumb, Menu, Button } from "antd";
import Layout, { Content, Header } from "antd/lib/layout/layout";
import Sider from "antd/lib/layout/Sider";
import style from "./style.module.scss";
import React, { ReactNode, useEffect, useState } from "react";
import Link from "next/link";
import SidebarAdmin from "./SidebarAdmin";

interface Props {
  children: ReactNode;
}

const LayoutAdmin = ({ children }: Props) => {
  return (
    <Layout>
      <SidebarAdmin />
      <Content
        className="site-layout-background"
        style={{
          margin: "24px 16px",
          padding: 24,
          minHeight: 280,
        }}
      >
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>Trang chủ</Breadcrumb.Item>
          <Breadcrumb.Item>Bill</Breadcrumb.Item>
        </Breadcrumb>
        <div>{children}</div>
      </Content>
    </Layout>
  );
};

export default LayoutAdmin;