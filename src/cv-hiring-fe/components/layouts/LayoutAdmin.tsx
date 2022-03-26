import { Alert } from "antd";
import Layout, { Content } from "antd/lib/layout/layout";
import React, { ReactNode, useEffect } from "react";
import { useAppSelector } from "../../store/hook";
import SidebarAdmin from "./SidebarAdmin";

interface Props {
  children: ReactNode;
}

const LayoutAdmin = ({ children }: Props) => {
  const userLoggedIn = useAppSelector((state) => state.user);

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
        {userLoggedIn.user?.role.name === "hr" && (
          <Alert
            message="Giá dịch vụ"
            description={`Chi phí coin/lượt đăng tin tuyển dụng hiện tại là: ${userLoggedIn?.setting?.price_job} C (1C = 1000 VNĐ)`}
            type="info"
            showIcon
            closable
            style={{ marginBottom: 10 }}
          />
        )}

        <div>{children}</div>
      </Content>
    </Layout>
  );
};

export default LayoutAdmin;
