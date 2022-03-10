import React from "react";
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
  // const auth = useAuth();
  const userLoggedIn = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    // auth.setIsLogged(false);

    // auth.user = null;
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
          <Col span={4}>
            <Link href={"/"}>
              <a>
                <img
                  src={"/logo.png"}
                  alt="TopCV tuyen dung tai TopCV"
                  title="TopCV tuyển dụng tại TopCV"
                  width={100}
                  className={styles.logoImg}
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
              <Menu.Item key="3">
                <Link href={"/xu-huong"}>
                  <a>Xu hướng tuyển dụng</a>
                </Link>
              </Menu.Item>
            </Menu>
          </Col>
          <Col span={6}>
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
