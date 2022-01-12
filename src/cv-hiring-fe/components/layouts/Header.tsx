import React from "react";
import { Button, Col, Row } from "antd";
import { Menu } from "antd";

import Link from "next/link";
import styles from "./style.module.scss";
import { Container } from "react-bootstrap";

function HeaderNav() {
  return (
    <Container>
      <header>
        <Row gutter={[16, 16]}>
          <Col span={4}>
            <Link href={"/"}>
              <img
                src={"https://www.topcv.vn/v3/images/topcv-logo-4.png?v=1.0.1"}
                alt="TopCV tuyen dung tai TopCV"
                title="TopCV tuyển dụng tại TopCV"
                width={100}
              />
            </Link>
          </Col>
          <Col span={14}>
            <Menu
              theme="light"
              mode="horizontal"
              defaultSelectedKeys={["1"]}
              className={styles.menu}
            >
              <Menu.Item key="1">Tìm việc làm</Menu.Item>
              <Menu.Item key="2">Danh sách công ty</Menu.Item>
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
              <Menu.Item key="1">
                <Link href={"/login"}>
                  <Button>Đăng nhập</Button>
                </Link>
              </Menu.Item>
              <Menu.Item key="2">
                <Button>Đăng ký</Button>
              </Menu.Item>
            </Menu>
          </Col>
        </Row>
      </header>
    </Container>
  );
}

export default HeaderNav;
