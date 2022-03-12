import Layout, { Content } from "antd/lib/layout/layout";
import React, { ReactNode } from "react";
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
        {/* <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>
            <Link href={"/quan-tri"}>Trang chủ</Link>
          </Breadcrumb.Item>
        </Breadcrumb> */}
        <div>{children}</div>
      </Content>
    </Layout>
  );
};

export default LayoutAdmin;
