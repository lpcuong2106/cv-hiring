import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { Card, Col, Pagination, Row } from "antd";
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { Container } from "react-bootstrap";
import BreadcrumbCus from "../../../components/BreadcrumbCus";
import JobItem from "../../../components/JobItem";
import Layout from "../../../components/layouts";
import { LoadingApp } from "../../../components/LoadingApp";
import { WorkJob, PaginatorInfo, Province } from "../../../data";
import { FETCH_WORK_JOB_PROVINCE } from "../../../GraphQL/Query/WorkJob";
import style from "./style.module.scss";
import NotFoundJob from "../../../components/NotFoundJob";

interface DataQuery {
  workJobOfProvince: {
    paginatorInfo: PaginatorInfo;
    data: WorkJob[];
  };
  provinceDetail: Province;
}
function itemRender(current: any, type: any, originalElement: any) {
  if (type === "prev") {
    return <a>Xem trước</a>;
  }
  if (type === "next") {
    return <a>Xem sau</a>;
  }
  return originalElement;
}

const ProvincePage: NextPage = () => {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const { id } = router.query;

  const { data, loading } = useQuery<DataQuery>(FETCH_WORK_JOB_PROVINCE, {
    variables: {
      provinceId: id,
      page: page,
    },
    fetchPolicy: "network-only",
    nextFetchPolicy: "cache-and-network",
  });
  const workJobOfProvince = data?.workJobOfProvince;
  const provinceDetail = data?.provinceDetail;
  const changePagination = (page: number, _: number) => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
    setPage(page);
  };

  return (
    <Layout>
      <div>
        <Head>
          <title>Kết nối lao động việt | TimViec</title>
        </Head>
        <main className={style.wrapper}>
          <Container>
            <Row>
              <BreadcrumbCus />
              <Col md={24}>
                <Card>
                  <div className={style.headerCard}>
                    <h1>Việc làm tại {provinceDetail?.name}</h1>
                    <p>
                      Tìm kiếm công việc mơ ước từ những cơ hội việc làm tốt
                      nhất
                    </p>
                  </div>

                  <Row>
                    <Col sm={18}>
                      {loading ? (
                        <LoadingApp />
                      ) : workJobOfProvince?.data?.length ? (
                        <>
                          {workJobOfProvince.data.map((job) => (
                            <JobItem
                              key={job.id}
                              companySlug={job.company.slug}
                              slug={job.slug}
                              provinceName={job.province.name}
                              salary={job.salary}
                              deadlineDate={job.expired_date_hiring}
                              companyName={job.company.name}
                              title={job.name}
                              logoUrl={job.company.logo}
                              updatedAt={job.updated_at}
                            />
                          ))}
                          <Pagination
                            total={workJobOfProvince?.paginatorInfo.total}
                            pageSize={10}
                            current={page}
                            itemRender={itemRender}
                            className={style.pagination}
                            onChange={changePagination}
                          />
                        </>
                      ) : (
                        <NotFoundJob />
                      )}
                    </Col>
                    <Col sm={6}>
                      <aside className={style.sidebarListJob}>
                        <p>
                          <b>Có thể bạn quan tâm</b>
                        </p>
                        <a
                          rel="noreferrer"
                          target="_blank"
                          href="https://www.topcv.vn/mau-cv"
                        >
                          <img
                            src="https://static.topcv.vn/manual/cv-tim-viec-topcv.png"
                            alt="Apply việc gì cũng dễ"
                            title="Apply việc gì cũng dễ"
                            className=""
                          />
                        </a>
                      </aside>
                    </Col>
                  </Row>
                </Card>
              </Col>
            </Row>
          </Container>
        </main>
      </div>
    </Layout>
  );
};

export default ProvincePage;
