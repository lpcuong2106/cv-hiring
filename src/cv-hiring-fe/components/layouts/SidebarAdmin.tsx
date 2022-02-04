import { Breadcrumb, Menu, Button } from "antd";
import Layout, { Content, Header } from "antd/lib/layout/layout";
import Sider from "antd/lib/layout/Sider";
import style from "./style.module.scss";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import React, { ReactNode, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const SidebarAdmin = () => {
  const [collapsed, setColappsed] = useState(false);
  const [selectedKeys, setSelectedKeys] = useState(["1"]);
  const router = useRouter();
  useEffect(() => {
    const asPath = router.asPath;
    switch (asPath) {
      case "/quan-tri":
        setSelectedKeys(["1"]);
        break;
      case "/quan-tri/tuyen-dung":
        setSelectedKeys(["2"]);
        break;
      case "/quan-tri/cong-ty":
        setSelectedKeys(["3"]);
        break;
      default:
        setSelectedKeys(["1"]);
        break;
    }
  }, [router]);

  const handleChangeSlide = (e: any) => {
    setSelectedKeys(e.keyPath);
  };

  return (
    <div>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        className={style.sliderCollapse}
      >
        <div
          className="logo"
          style={{ textAlign: "center", marginBottom: 20, marginTop: 20 }}
        >
          <img
            src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
            style={{ width: 60 }}
          />
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={selectedKeys}
          selectedKeys={selectedKeys}
          className={style.menuAdmin}
          onClick={handleChangeSlide}
        >
          <Menu.Item key="1" icon={<UserOutlined />}>
            <Link href="/quan-tri">
              <Button type="link">Bảng tin</Button>
            </Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<VideoCameraOutlined />}>
            <Link href="/quan-tri/tuyen-dung">
              <Button type="link">Tin tuyển dụng</Button>
            </Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<UploadOutlined />}>
            <Link href="/quan-tri/cong-ty">
              <Button type="link">Công ty</Button>
            </Link>
          </Menu.Item>
          <Menu.Item key="4" icon={<UploadOutlined />}>
            <Button type="link">Đăng xuất</Button>
          </Menu.Item>
        </Menu>
      </Sider>
    </div>
  );
};

export default SidebarAdmin;
