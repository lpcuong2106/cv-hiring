import React from "react";
import { Row, Col } from "antd";
import style from "./style.module.scss";
import LayoutAdmin from "../../../components/layouts/LayoutAdmin";
import Head from "next/head";

const AppliedCVManage = () => {
  return (
    <LayoutAdmin>
      <div className="site-statistic-demo-card">
        <Head>
          <title>Kết nối lao động việt | Quản trị </title>
        </Head>
        <Row gutter={16}>
          <Col span={12} className={style.statistic}>
            Tuyen dung
          </Col>
        </Row>
      </div>
    </LayoutAdmin>
  );
};

export default AppliedCVManage;
