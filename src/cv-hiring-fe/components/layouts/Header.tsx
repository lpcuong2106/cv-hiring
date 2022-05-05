import React, { useEffect, useState } from "react";
import { Avatar, Button, Col, Dropdown, message, Row } from "antd";
import { Menu } from "antd";

import Link from "next/link";
import styles from "./style.module.scss";
import { Container } from "react-bootstrap";
import { useRouter } from "next/router";
import { DownOutlined } from "@ant-design/icons";
import { useAppSelector, useAppDispatch } from "../../store/hook";
import {
  setLoggedIn,
  setUserLoggedIn,
} from "../../store/features/userSlideder";

function HeaderNav() {
  const [activeMenu, setActiveMenu] = useState(["4"]);
  const userLoggedIn = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    switch (router.asPath) {
      case "/xu-huong":
        setActiveMenu(["5"]);
        break;
    }
  }, []);
  const handleLogout = () => {
    localStorage.removeItem("token");
    // @ts-ignore
    dispatch(setUserLoggedIn(null));
    dispatch(setLoggedIn(false));
    message.success("Đăng xuất thành công!");
    router.replace("/login");
  };

  const menu = (
    <Menu>
      {userLoggedIn?.user?.role.name !== "user" && (
        <Menu.Item key="4">
          <Link href={"/quan-tri"}>
            <Button type="link">Quản trị</Button>
          </Link>
        </Menu.Item>
      )}
      <Menu.Item key="1">
        <Link href={"/ca-nhan"}>
          <Button type="link">Cá nhân</Button>
        </Link>
      </Menu.Item>
      {userLoggedIn?.user?.role.name === "user" && (
        <Menu.Item key="2">
          <Link href={"/viec-lam/ung-tuyen"}>
            <Button type="link">Ứng tuyển</Button>
          </Link>
        </Menu.Item>
      )}
      <Menu.Item key="3">
        <Button onClick={handleLogout} type="link">
          Đăng xuất
        </Button>
      </Menu.Item>
    </Menu>
  );

  return (
    <Container>
      <header>
        <Row gutter={[16, 16]}>
          <Col span={4} md={4} sm={24} xs={24} className={styles.logoContainer}>
            <Link href={"/"}>
              <a>
                <img
                  src={userLoggedIn.setting?.logo_url ?? "/logo.png"}
                  alt={userLoggedIn.setting?.title_web}
                  title={userLoggedIn.setting?.title_web}
                  width={100}
                  className={styles.logoImg}
                />
              </a>
            </Link>
          </Col>
          <Col span={14} sm={24} md={12} xs={24}>
            <Menu
              theme="light"
              mode="horizontal"
              defaultSelectedKeys={["1"]}
              selectedKeys={activeMenu}
              className={styles.menu}
            >
              <Menu.Item key="4">
                <Link href={"/viec-lam"}>
                  <a>Việc làm</a>
                </Link>
              </Menu.Item>
              <Menu.Item key="5">
                <Link href={"/xu-huong"}>
                  <a>Xu hướng tuyển dụng</a>
                </Link>
              </Menu.Item>
            </Menu>
          </Col>
          <Col sm={24} md={8} xs={24}>
            <Menu
              theme="light"
              mode="horizontal"
              defaultSelectedKeys={["4"]}
              className={styles.menuU}
            >
              {!userLoggedIn.isLoggedIn ? (
                <>
                  <Menu.Item key="1">
                    <Link href={"/login"}>
                      <Button>Đăng nhập</Button>
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="2">
                    <Link href={"/register-type"}>
                      <Button>Đăng ký</Button>
                    </Link>
                  </Menu.Item>
                </>
              ) : (
                <Dropdown
                  overlay={menu}
                  trigger={["click"]}
                  placement="topCenter"
                >
                  <Button shape="round" type="link">
                    <Avatar
                      src={
                        <img
                          src={
                            userLoggedIn?.user?.avatar || "/avatarDefault.png"
                          }
                          style={{ width: 32 }}
                          onError={({ currentTarget }) => {
                            currentTarget.onerror = null; // prevents looping
                            currentTarget.src = "/avatarDefault.png";
                          }}
                        />
                      }
                    />
                    <DownOutlined />
                  </Button>
                </Dropdown>
              )}
            </Menu>
          </Col>
        </Row>
      </header>
    </Container>
  );
}

export default HeaderNav;
