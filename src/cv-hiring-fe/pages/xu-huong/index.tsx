import { Col, Row } from "antd";
import type { NextPage } from "next";
import Head from "next/head";
import { Container } from "react-bootstrap";

import style from "./style.module.scss";
import Layout from "../../components/layouts";
import BreadcrumbCus from "../../components/BreadcrumbCus";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { ANALYST_TRENDING } from "../../GraphQL/Query/Analyst";
import { useQuery } from "@apollo/client";
import { LoadingApp } from "../../components/LoadingApp";

ChartJS.register(ArcElement, Tooltip, Legend);

interface DataQuery {
  analystTrend: {
    category: {
      name: string;
      amountJob: number;
    }[];
  };
}
const TrendWorkJob: NextPage = () => {
  const { data, loading, refetch } = useQuery<DataQuery>(ANALYST_TRENDING, {
    fetchPolicy: "network-only",
    nextFetchPolicy: "cache-and-network",
  });
  const dataGraph = {
    labels: data?.analystTrend.category.map((cate) => cate.name),
    datasets: [
      {
        label: "# of Votes",
        data: data?.analystTrend.category.map((cate) => cate.amountJob),
        backgroundColor: [
          "#00BFFF",
          "#FF1493",
          "#87CEFF",
          "#53868B",
          "#4EEE94",
          "#9ACD32",
          "#1E90FF",
          "#00EE76",
          "#FFFF00",
          "#E6E6FA",
          "#FFE1FF",
          "#CD6090",
          "#FFAEB9",
          "#B0171F",
          "#8E8E38",
          "#FF8247",
          "#8B7355",
          "#FFDEAD",
          "#698B22",
        ],
        borderColor: [
          "#00BFFF",
          "#FF1493",
          "#87CEFF",
          "#53868B",
          "#4EEE94",
          "#9ACD32",
          "#1E90FF",
          "#00EE76",
          "#FFFF00",
          "#E6E6FA",
          "#FFE1FF",
          "#CD6090",
          "#FFAEB9",
          "#B0171F",
          "#8E8E38",
          "#FF8247",
          "#8B7355",
          "#FFDEAD",
          "#698B22",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <Layout>
      <div>
        <Head>
          <title>Kết nối lao động việt | TimViec</title>
        </Head>
        <main>
          <Container>
            <Row>
              <Col md={24}>
                <div className={style.title}>
                  <h1>Xu hướng tuyển dụng</h1>
                </div>
                {loading ? (
                  <LoadingApp />
                ) : (
                  <div style={{ width: 500, height: 500, margin: "auto" }}>
                    <Pie data={dataGraph} height={100} options={{}} />
                  </div>
                )}

                {/* <AppliedCVTable /> */}
              </Col>
            </Row>
          </Container>
        </main>
      </div>
    </Layout>
  );
};

export default TrendWorkJob;
