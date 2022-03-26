import { Col, Row } from "antd";
import Link from "next/link";
import React from "react";
import { Container } from "react-bootstrap";
import { useAppSelector } from "../../store/hook";
import style from "./style.module.scss";

function Footer() {
  const setting = useAppSelector((state) => state.user.setting);
  return (
    <footer className={style.footer}>
      <Container>
        <Row>
          <Col span={8} md={8}>
            <b>Về {setting?.title_web}</b>
            <p>{setting?.description}</p>
          </Col>
          <Col md={4}></Col>
          <Col span={6}>
            <b>Liên hệ hỗ trợ/mua coin</b>
            <p>SĐT: {setting?.phone_contact}</p>
          </Col>
          <Col span={6}>
            <b>Kết nối với chúng tôi</b>
            <div className="flex">
              {setting?.fb_url && (
                <a href={setting?.fb_url} target="_blank" rel="noreferrer">
                  <svg
                    width="40"
                    height="40"
                    viewBox="0 0 40 40"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="mr-3 cursor-pointer"
                  >
                    <rect width="40" height="40" fill="#F6F9FC"></rect>
                    <path
                      d="M26 16.25H21.5V13.25C21.5 12.422 22.172 11.75 23 11.75H24.5V8H21.5C19.0145 8 17 10.0145 17 12.5V16.25H14V20H17V32H21.5V20H24.5L26 16.25Z"
                      fill="#1976D2"
                    ></path>
                  </svg>
                </a>
              )}
              {setting?.youtube_url && (
                <a href={setting?.youtube_url} target="_blank" rel="noreferrer">
                  <svg
                    width="40"
                    height="40"
                    viewBox="0 0 40 40"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="cursor-pointer"
                  >
                    <rect width="40" height="40" fill="#F6F9FC"></rect>
                    <path
                      d="M30.98 13.34C30.329 12.182 29.6225 11.969 28.184 11.888C26.747 11.7905 23.1335 11.75 20.003 11.75C16.8665 11.75 13.2515 11.7905 11.816 11.8865C10.3805 11.969 9.6725 12.1805 9.0155 13.34C8.345 14.4965 8 16.4885 8 19.9955C8 19.9985 8 20 8 20C8 20.003 8 20.0045 8 20.0045V20.0075C8 23.4995 8.345 25.5065 9.0155 26.651C9.6725 27.809 10.379 28.019 11.8145 28.1165C13.2515 28.2005 16.8665 28.25 20.003 28.25C23.1335 28.25 26.747 28.2005 28.1855 28.118C29.624 28.0205 30.3305 27.8105 30.9815 26.6525C31.658 25.508 32 23.501 32 20.009C32 20.009 32 20.0045 32 20.0015C32 20.0015 32 19.9985 32 19.997C32 16.4885 31.658 14.4965 30.98 13.34Z"
                      fill="#F44336"
                    ></path>
                    <path
                      d="M17 24.5V15.5L24.5 20L17 24.5Z"
                      fill="#FAFAFA"
                    ></path>
                  </svg>
                </a>
              )}
            </div>
            <img
              src={setting?.logo_url}
              alt={setting?.title_web}
              title={setting?.title_web}
              width={100}
              className={style.logoImageFooter}
            />
          </Col>

          <hr />
          <Col span={18}>
            <p>
              ©2022 - <b>Le Phu Cuong B1805744</b>
            </p>
          </Col>
          <Col span={6}></Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
