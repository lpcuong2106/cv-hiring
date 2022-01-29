import { Button, Carousel, Col, Row, Select } from "antd";
import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { Container } from "react-bootstrap";
import Layout from "../components/layouts";
import style from "./style.module.scss";
import SalaryBanner from "./salary_banner.gif";
import NguyenKimBanner from "./nguyenkim_banner.png";
import NguyenKim2Banner from "./shoppe_banner.png";
import Image from "next/image";
import Banner from "./banner.png";
import Search from "antd/lib/input/Search";
import classNames from "classnames";
import { TopCompanyItem } from "../components/TopCompanyItem";
import { useQuery } from "@apollo/client";
import { FETCH_HOME_PAGE } from "../GraphQL/Query/FetchData";
import { LoadingApp } from "../components/LoadingApp";
import { CategoryJobList } from "../components/CategoryJob";
import { Company, Province, WorkCategory, WorkJob } from "../data";
import JobItem from "../components/JobItem";
import NewWorkJobItem from "../components/NewWorkJobItem";

const { Option } = Select;

interface HomeQuery {
  provinces: Province[];
  workCategories: WorkCategory[];
  topCompany: Company[];
  newWorkJob: WorkJob[];
}

const Home: NextPage = () => {
  const { data, loading } = useQuery<HomeQuery>(FETCH_HOME_PAGE);

  if (loading) {
    return <LoadingApp />;
  }

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
                <div className={style.blockSearchWrap}>
                  <Image src={Banner} />
                  <div className={style.blockSearch}>
                    <div className={style.searchBox}>
                      <p>
                        Tìm kiếm<b> 194 </b>việc làm mới trong
                        <b> 4,583 </b>việc đang tuyển dụng
                      </p>
                      <div>
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
                          {data?.workCategories.map((category) => (
                            <Option value={category.id}>{category.name}</Option>
                          ))}
                        </Select>
                        <Select
                          style={{ width: 200 }}
                          placeholder="Chọn tỉnh thành"
                          // onChange={handleChange}
                        >
                          <Option value="">Chọn tỉnh thành</Option>
                          {data?.provinces.map((province) => (
                            <Option value={province.id}>{province.name}</Option>
                          ))}
                        </Select>
                        <Button type="primary">Tìm kiếm</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
          <Container>
            <Row style={{ marginTop: "50px" }}>
              <Col md={12}>
                <Carousel className={style.slide}>
                  <div className={style.slideItem}>
                    <Image src={SalaryBanner} />
                  </div>
                  <div className={style.slideItem}>
                    <Image src={NguyenKimBanner} />
                  </div>
                  <div className={style.slideItem}>
                    <Image src={NguyenKim2Banner} />
                  </div>
                </Carousel>
              </Col>
              <Col md={12}>
                <div
                  className={classNames(
                    style.headerBoxList,
                    style.topCompanyTitle
                  )}
                >
                  <span className={style.title}>Top công ty hàng đầu</span>
                  <span className={style.line}></span>
                </div>
                <TopCompanyItem companyTop={data?.topCompany ?? []} />
              </Col>
              <Col md={24}>
                <div style={{ marginTop: "20px" }}>
                  <div className={style.headerBoxList}>
                    <span className={style.title}>Việc làm mới nhất</span>
                    <span className={style.line}></span>
                  </div>
                  <Row>
                    {data?.newWorkJob.map((job) => (
                      <Col md={6}>
                        <NewWorkJobItem
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
                      </Col>
                    ))}
                  </Row>
                </div>
              </Col>
              <Col md={24}>
                {data?.workCategories && (
                  <CategoryJobList
                    type="categoryJob"
                    label="Việc làm theo ngành nghề"
                    data={data?.workCategories}
                  />
                )}
              </Col>
              <Col md={24}>
                {data?.provinces && (
                  <CategoryJobList
                    type="province"
                    label="Việc làm theo tỉnh thành"
                    data={data?.provinces}
                  />
                )}
              </Col>
              <Col md={24}>
                <Carousel className={style.slide}>
                  <div className={style.slideItem}>
                    <Image src={SalaryBanner} />
                  </div>
                  <div className={style.slideItem}>
                    <Image src={NguyenKimBanner} />
                  </div>
                  <div className={style.slideItem}>
                    <Image src={NguyenKim2Banner} />
                  </div>
                </Carousel>
              </Col>
            </Row>
          </Container>
        </main>
      </div>
    </Layout>
  );
};

export default Home;
