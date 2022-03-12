import React from "react";
import LayoutAdmin from "../../components/layouts/LayoutAdmin";
import { Row, Col, Card, Statistic } from "antd";
import style from "./style.module.scss";
import Head from "next/head";
import { useQuery } from "@apollo/client";
import { ANALYST_ADMIN } from "../../GraphQL/Query/Analyst";
import { LoadingApp } from "../../components/LoadingApp";
import { useAppSelector } from "../../store/hook";

interface AnalystQuery {
  analystWorkJob: {
    total_work_job: number;
    total_work_job_hiring: number;
    total_cv_applied: number;
    total_cv_new_applied: number;
  };
}

const ManageDashboard = () => {
  const userLoggedIn = useAppSelector((state) => state.user.user);

  const { data, loading } = useQuery<AnalystQuery>(ANALYST_ADMIN, {
    variables: {
      companyId: userLoggedIn?.company?.id,
    },
    skip: !userLoggedIn?.company?.id && userLoggedIn?.role.name !== "admin",
    fetchPolicy: "network-only",
    nextFetchPolicy: "cache-and-network",
  });

  const analystWorkJob = data?.analystWorkJob;

  return (
    <LayoutAdmin>
      <div className="site-statistic-demo-card">
        <Head>
          <title>Kết nối lao động việt | Quản trị </title>
        </Head>

        {loading || !analystWorkJob ? (
          <LoadingApp />
        ) : (
          <Row gutter={16}>
            <Col span={12} className={style.statistic}>
              <Card>
                <Row>
                  <Col md={12}>
                    <Card className={style.blockStatistic3}>
                      <Statistic
                        title="Tổng tin đăng"
                        value={analystWorkJob.total_work_job}
                        valueStyle={{ color: "#4285f4" }}
                      />
                    </Card>
                  </Col>
                  <Col md={12}>
                    <Card className={style.blockStatistic4}>
                      <Statistic
                        title="Công việc đang tuyển"
                        value={analystWorkJob.total_work_job_hiring}
                        valueStyle={{ color: "#ffc107" }}
                      />
                    </Card>
                  </Col>
                  <Col md={12}>
                    <Card className={style.blockStatistic2}>
                      <Statistic
                        title="CV ứng tuyển mới"
                        value={analystWorkJob.total_cv_new_applied}
                        valueStyle={{ color: "#cf1322" }}
                      />
                    </Card>
                  </Col>
                  <Col md={12}>
                    <Card className={style.blockStatistic}>
                      <Statistic
                        title="CV đã nhận"
                        value={analystWorkJob.total_cv_applied}
                        valueStyle={{ color: "#3f8600" }}
                      />
                    </Card>
                  </Col>
                </Row>
              </Card>
            </Col>

            <Col span={12} className={style.statistic}>
              <Card className={style.profile}>
                <img
                  src={userLoggedIn?.avatar || "/avatarDefault.png"}
                  onError={({ currentTarget }) => {
                    currentTarget.onerror = null; // prevents looping
                    currentTarget.src = "/avatarDefault.png";
                  }}
                />
                <div>
                  <p>
                    <b>
                      {userLoggedIn?.lastname + " " + userLoggedIn?.firstname}
                    </b>
                  </p>
                  {userLoggedIn?.role.name !== "admin" && (
                    <span>Mã DN: #ID_{userLoggedIn?.company?.id} |</span>
                  )}{" "}
                  {userLoggedIn?.email} |
                  <p>SĐT: {userLoggedIn?.phone || "Chưa có thông tin"}</p>
                </div>
              </Card>
            </Col>
          </Row>
        )}
      </div>
    </LayoutAdmin>
  );
};

export default ManageDashboard;
