import { Col, Row } from "antd";
import Link from "next/link";
import React from "react";
import { Container } from "react-bootstrap";
import style from "./style.module.scss";

function Footer() {
  return (
    <footer className={style.footer}>
      <Container>
        <Row>
          <Col span={6}>
            <b>Về Sàn kết nối việc làm</b>
            <p>
              Sàn kết nối việc làm mang đến một nền tảng toàn diện, giúp ứng
              viên phát triển được các kỹ năng cá nhân, xây dựng hình ảnh chuyên
              nghiệp trong mắt nhà tuyển dụng và tiếp cận với các cơ hội việc
              làm phù hợp.
            </p>
          </Col>
          <hr />
          <Col span={20}>
            <p>
              ©2022 - <b>Le Phu Cuong B1805744</b>
            </p>
          </Col>
          <Col span={4}>
            <img
              src={"https://www.topcv.vn/v3/images/topcv-logo-4.png?v=1.0.1"}
              alt="TopCV tuyen dung tai TopCV"
              title="TopCV tuyển dụng tại TopCV"
              width={100}
            />
            {/* <Link href={"/"}>
            
            </Link> */}
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
