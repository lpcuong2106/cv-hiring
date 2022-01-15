import React from "react";
import style from "./style.module.scss";
import Head from "next/head";
import { useAuth } from "../../components/AuthProvider";
import { Col, Container, Row } from "react-bootstrap";
import { Button, Card } from "antd";
import Layout from "../../components/layouts";
import Check from "./check.png";
import Image from "next/image";
import { useRouter } from "next/router";
const Register = () => {
  useAuth();
  const router = useRouter();
  return (
    <Layout>
      <Head>
        <title>Đăng ký tài khoản</title>
      </Head>
      <Container>
        <Row>
          <Col md={6}>
            <div className="site-card-border-less-wrapper">
              <Card
                title="Dành cho ứng viên"
                bordered
                style={{ width: 400 }}
                className={style.cardBlockRegister}
              >
                <ul
                  className={"list-unstyled fs-14 pr-15 lh-28"}
                  style={{ minHeight: "110px" }}
                >
                  <li>
                    <Image src={Check} width={14} height={14} />
                    <span className={style.checkImage}>
                      Công việc được cập nhật thường xuyên
                    </span>
                  </li>
                  <li>
                    <Image src={Check} width={14} height={14} />
                    <span className={style.checkImage}>
                      Ứng tuyển công việc yêu thích HOÀN TOÀN MIỄN PHÍ
                    </span>
                  </li>
                  <li>
                    <Image src={Check} width={14} height={14} />
                    <span className={style.checkImage}>
                      Hiển thị thông tin hồ sơ với nhà tuyển dụng hàng đầu
                    </span>
                  </li>
                </ul>
                <Button
                  onClick={() =>
                    router.push("/register-type/register-employee")
                  }
                  type="primary"
                  className={style.btnRegister}
                >
                  Đăng ký dành cho ứng viên
                </Button>
              </Card>
            </div>
          </Col>
          <Col md={6}>
            <div className="site-card-border-less-wrapper">
              <Card
                title="Dành cho doanh nghiệp"
                bordered
                style={{ width: 400 }}
                className={style.cardBlockRegister}
              >
                <ul
                  className="list-unstyled fs-14 pr-15 lh-28 color-white"
                  style={{ minHeight: "110px" }}
                >
                  <li>
                    <Image src={Check} width={14} height={14} />
                    <span className={style.checkImage}>
                      Ứng viên sẵn sàng tiếp cận thông tin tuyển dụng
                    </span>
                  </li>
                  <li>
                    <Image src={Check} width={14} height={14} />
                    <span className={style.checkImage}>
                      Không giới hạn tương tác với ứng viên
                    </span>
                  </li>
                </ul>
                <Button
                  onClick={() =>
                    router.push("/register-type/register-business")
                  }
                  type="primary"
                  className={style.btnRegister}
                >
                  Đăng ký dành cho doanh nghiệp
                </Button>
              </Card>
            </div>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};
export default Register;
