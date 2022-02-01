import { Col, Row } from "antd";
import type { NextPage } from "next";
import Head from "next/head";
import { Container } from "react-bootstrap";
import AppliedCVTable from "../../../components/AppliedCVTable";
import BreadcrumbCus from "../../../components/BreadcrumbCus";
import Layout from "../../../components/layouts";
import style from "./style.module.scss";

const CvAppliedManagement: NextPage = () => {
  return (
    <Layout>
      <div>
        <Head>
          <title>Kết nối lao động việt | TimViec</title>
        </Head>
        <main>
          <Container>
            <BreadcrumbCus />
            <Row>
              <Col md={24}>
                <div className={style.title}>
                  <h1>Công việc đã ứng tuyển</h1>
                </div>
                <AppliedCVTable />
              </Col>
            </Row>
          </Container>
        </main>
      </div>
    </Layout>
  );
};

export default CvAppliedManagement;
