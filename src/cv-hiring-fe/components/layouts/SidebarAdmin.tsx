import { Menu, message } from "antd";
import Sider from "antd/lib/layout/Sider";
import style from "./style.module.scss";
import { UserOutlined, UploadOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import {
  setLoggedIn,
  setUserLoggedIn,
} from "../../store/features/userSlideder";
import { Sketch } from "@styled-icons/boxicons-logos/Sketch";
import { News } from "@styled-icons/boxicons-regular/News";
import { Dashboard } from "@styled-icons/material/Dashboard";
import { LayerGroup } from "@styled-icons/fa-solid/LayerGroup";
const SidebarAdmin = () => {
  const [collapsed, setColappsed] = useState(false);
  const [selectedKeys, setSelectedKeys] = useState(["1"]);
  const dispatch = useAppDispatch();
  const userLoggedIn = useAppSelector((state) => state.user.user);
  const router = useRouter();
  const handleLogout = () => {
    localStorage.removeItem("token");
    router.replace("/login");
    // @ts-ignore
    dispatch(setUserLoggedIn(null));
    dispatch(setLoggedIn(false));
    message.success("Đăng xuất thành công!");
  };

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
      case "/quan-tri/thong-tin-cong-ty":
        setSelectedKeys(["4"]);
        break;
      case "/quan-tri/cv":
        setSelectedKeys(["6"]);
        break;
      case "/quan-tri/nguoi-dung":
        setSelectedKeys(["7"]);
        break;
      case "/quan-tri/nganh-nghe":
        setSelectedKeys(["8"]);
        break;
      case "/quan-tri/cai-dat":
        setSelectedKeys(["9"]);
        break;
      default:
        setSelectedKeys(["1"]);
        break;
    }
  }, []);

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
          <Menu.Item key="1" icon={<Dashboard width={14} />}>
            <Link href="/quan-tri">
              <a type="link">Bảng tin</a>
            </Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<News width={14} />}>
            <Link href="/quan-tri/tuyen-dung">
              <a type="link">Tin tuyển dụng</a>
            </Link>
          </Menu.Item>
          {userLoggedIn?.role.name === "admin" && (
            <>
              <Menu.Item key="3" icon={<Sketch width={14} />}>
                <Link href="/quan-tri/cong-ty">
                  <a type="link">Công ty</a>
                </Link>
              </Menu.Item>
              <Menu.Item key="8" icon={<LayerGroup width={14} />}>
                <Link href="/quan-tri/nganh-nghe">
                  <a type="link">Ngành nghề</a>
                </Link>
              </Menu.Item>
              <Menu.Item key="7" icon={<UserOutlined />}>
                <Link href="/quan-tri/nguoi-dung">
                  <a type="link">Người dùng</a>
                </Link>
              </Menu.Item>
              <Menu.Item key="9" icon={<UserOutlined />}>
                <Link href="/quan-tri/cai-dat">
                  <a type="link">Cài đặt</a>
                </Link>
              </Menu.Item>
            </>
          )}

          {userLoggedIn?.role.name === "hr" && (
            <>
              <Menu.Item key="4" icon={<Sketch width={14} />}>
                <Link href="/quan-tri/thong-tin-cong-ty">
                  <a type="link">Thông tin công ty</a>
                </Link>
              </Menu.Item>
              <Menu.Item key="6" icon={<UploadOutlined />}>
                <Link href="/quan-tri/cv">
                  <a type="link">Quản lý CV</a>
                </Link>
              </Menu.Item>
            </>
          )}
          <Menu.Item key="5" icon={<UploadOutlined />}>
            <a type="link" onClick={handleLogout}>
              Đăng xuất
            </a>
          </Menu.Item>
        </Menu>
      </Sider>
    </div>
  );
};

export default SidebarAdmin;
