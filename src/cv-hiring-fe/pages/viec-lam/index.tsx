import {
  Col,
  Row,
  Card,
  Breadcrumb,
  Pagination,
  Tag,
  Select,
  Button,
} from "antd";
import type { NextPage } from "next";
import Head from "next/head";
import { Container } from "react-bootstrap";
import Layout from "../../components/layouts";
import JobItem from "../../components/JobItem";
import style from "./style.module.scss";
import Search from "antd/lib/input/Search";
import { useQuery } from "@apollo/client";
import { PaginatorInfo, WorkJob } from "../../data";
import { FETCH_ALL_JOB_SEARCH } from "../../GraphQL/Query/WorkJob";
import { LoadingApp } from "../../components/LoadingApp";
import { useState } from "react";
import BreadcrumbCus from "../../components/BreadcrumbCus";
import NotFoundJob from "../../components/NotFoundJob";

const { Option } = Select;

interface DataQuery {
  getAllWorkJob: {
    paginatorInfo: PaginatorInfo;
    data: WorkJob[];
  };
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
const WorkJobs: NextPage = () => {
  const [page, setPage] = useState(1);
  const { data, loading } = useQuery<DataQuery>(FETCH_ALL_JOB_SEARCH, {
    variables: { page: page },
  });

  const listJob = data?.getAllWorkJob;

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
                    <h1>Việc làm tốt nhất</h1>
                    <p>
                      Tìm kiếm công việc mơ ước từ những cơ hội việc làm tốt
                      nhất
                    </p>
                    <Tag color="success">Lương cao</Tag>
                    <Tag color="success">Phúc lợi hấp dẫn</Tag>
                    <Tag color="success">Môi trường chuyên nghiệp</Tag>
                  </div>
                  <div className={style.searchJob}>
                    <Search
                      placeholder="Nhập tên công việc, vị trí, kĩ năng"
                      // onSearch={onSearch}

                      style={{ width: 200 }}
                    />
                    <Select
                      style={{ width: 200 }}
                      placeholder="Chọn ngành nghề"
                      // onChange={handleChange}
                    >
                      <Option value="">Chọn ngành nghề</Option>
                      {/* {data?.workCategories.map((category) => (
                        <Option value={category.id}>{category.name}</Option>
                      ))} */}
                    </Select>
                    <Select
                      style={{ width: 200 }}
                      placeholder="Chọn tỉnh thành"
                      // onChange={handleChange}
                    >
                      <Option value="">Chọn tỉnh thành</Option>
                      {/* {data?.provinces.map((province) => (
                        <Option value={province.id}>{province.name}</Option>
                      ))} */}
                    </Select>
                    <Button type="primary">Tìm kiếm</Button>
                  </div>

                  <Row>
                    <Col sm={18}>
                      {listJob?.data?.length ? (
                        <>
                          <p>
                            Tìm thấy{" "}
                            <span className={style.amount}>
                              {listJob?.paginatorInfo.total}
                            </span>{" "}
                            việc làm phù hợp với yêu cầu của bạn.
                          </p>
                          {loading && <LoadingApp />}
                          {listJob.data.map((job) => (
                            <JobItem
                              companySlug={job.company.slug}
                              slug={job.slug}
                              provinceName={job.province.name}
                              salary={job.salary}
                              deadlineDate={job.expired_date}
                              companyName={job.company.name}
                              title={job.name}
                              logoUrl={job.company.logo}
                              updatedAt={job.updated_at}
                            />
                          ))}
                          <Pagination
                            total={listJob?.paginatorInfo.total}
                            pageSize={10}
                            current={listJob?.paginatorInfo.currentPage}
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
                        <a target="_blank" href="https://www.topcv.vn/mau-cv">
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

export default WorkJobs;
