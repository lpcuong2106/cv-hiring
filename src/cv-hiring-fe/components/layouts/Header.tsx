import React from "react";
import { Avatar, Button, Col, Dropdown, message, Row } from "antd";
import { Menu } from "antd";

import Link from "next/link";
import styles from "./style.module.scss";
import { Container } from "react-bootstrap";
import { useAuth } from "../AuthProvider";
import { useRouter } from "next/router";
import { DownOutlined } from "@ant-design/icons";
import { useAppSelector } from "../../store/hook";

function handleButtonClick(e: any) {
  message.info("Click on left button.");
  console.log("click left button", e);
}

function handleMenuClick(e: any) {
  message.info("Click on menu item.");
  console.log("click", e);
}

function HeaderNav() {
  const auth = useAuth();
  const userLoggedIn = useAppSelector((state) => state.user.user);

  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    auth.setIsLogged(false);

    auth.user = null;
    message.success("Đăng xuất thành công!");
    router.replace("/login");
  };

  const menu = (
    <Menu>
      {userLoggedIn?.role.name === "admin" && (
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
      <Menu.Item key="2">
        <Link href={"/viec-lam/ung-tuyen"}>
          <Button type="link">Ứng tuyển</Button>
        </Link>
      </Menu.Item>
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
          <Col span={4}>
            <Link href={"/"}>
              <a>
                <img
                  src={
                    "https://www.topcv.vn/v3/images/topcv-logo-4.png?v=1.0.1"
                  }
                  alt="TopCV tuyen dung tai TopCV"
                  title="TopCV tuyển dụng tại TopCV"
                  width={100}
                />
              </a>
            </Link>
          </Col>
          <Col span={14}>
            <Menu
              theme="light"
              mode="horizontal"
              defaultSelectedKeys={["1"]}
              className={styles.menu}
            >
              <Menu.Item key="1">
                <Link href={"/viec-lam"}>
                  <a>Việc làm</a>
                </Link>
              </Menu.Item>
              <Menu.Item key="3">Công cụ</Menu.Item>
            </Menu>
          </Col>
          <Col span={6}>
            <Menu
              theme="light"
              mode="horizontal"
              defaultSelectedKeys={["4"]}
              className={styles.menuU}
            >
              {!auth.isLogged ? (
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
                        <img src={userLoggedIn?.avatar} style={{ width: 32 }} />
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
