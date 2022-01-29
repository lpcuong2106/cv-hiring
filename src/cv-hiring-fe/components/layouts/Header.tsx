import React from "react";
import { Button, Col, message, Row } from "antd";
import { Menu } from "antd";

import Link from "next/link";
import styles from "./style.module.scss";
import { Container } from "react-bootstrap";
import { useAuth } from "../AuthProvider";
import { Router, useRouter } from "next/router";

function HeaderNav() {
  const auth = useAuth();
  console.log(auth);
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    auth.setIsLogged(false);
    auth.user = null;
    message.success("Đăng xuất thành công!");
    router.replace("/login");
  };

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
                <Menu.Item key="1">
                  <Link href={"/login"}>
                    <Button>Quan trị</Button>
                  </Link>
                  <Button onClick={handleLogout}>Đăng xuất</Button>
                </Menu.Item>
              )}
            </Menu>
          </Col>
        </Row>
      </header>
    </Container>
  );
}

export default HeaderNav;
