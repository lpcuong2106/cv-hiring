import { Col, Row } from "antd";
import type { NextPage } from "next";
import Head from "next/head";
import { Container } from "react-bootstrap";
import Layout from "antd/lib/layout/layout";

const Province: NextPage = () => {
  return (
    <Layout>
      <div>
        <Head>
          <title>Kết nối lao động việt | TimViec</title>
        </Head>
        <main>
          <Container>
            <Row>
              <Col md={24}>ihihi</Col>
            </Row>
          </Container>
        </main>
      </div>
    </Layout>
  );
};

export default Province;
