import { Carousel, Col, Row } from "antd";
import type { NextPage } from "next";
import Head from "next/head";
import { Container } from "react-bootstrap";
import Layout from "../components/layouts";
import style from "./style.module.scss";

import classNames from "classnames";
import { TopCompanyItem } from "../components/TopCompanyItem";
import { useQuery } from "@apollo/client";
import { FETCH_HOME_PAGE } from "../GraphQL/Query/FetchData";
import { LoadingApp } from "../components/LoadingApp";
import { CategoryJobList } from "../components/CategoryJob";
import { Company, Province, WorkCategory, WorkJob } from "../data";
import NewWorkJobItem from "../components/NewWorkJobItem";

interface HomeQuery {
  provinces: Province[];
  workCategories: WorkCategory[];
  topCompany: Company[];
  newWorkJob: WorkJob[];
}

const Home: NextPage = () => {
  const { data, loading } = useQuery<HomeQuery>(FETCH_HOME_PAGE, {
    fetchPolicy: "network-only",
    nextFetchPolicy: "cache-and-network",
  });

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
                  <img src={"/banner.png"} />
                </div>
              </Col>
            </Row>
          </Container>
          <Container>
            <Row style={{ marginTop: "50px" }}>
              <Col md={12} sm={24}>
                <div className={style.bannerMobileImage}>
                  <img src={"/BannerMobile.jpg"} />
                </div>
              </Col>
              <Col md={12} sm={24}>
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
                      <Col md={8} sm={12} xs={24} key={job.id}>
                        <NewWorkJobItem
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
                    <img
                      src={"/salary_banner.gif"}
                      alt=""
                      width={"100%"}
                      height={350}
                    />
                  </div>
                  <div className={style.slideItem}>
                    <img
                      src={"/nguyenkim_banner.png"}
                      alt=""
                      width={"100%"}
                      height={350}
                    />
                  </div>
                  <div className={style.slideItem}>
                    <img
                      src={"/shoppe_banner.png"}
                      alt=""
                      width={"100%"}
                      height={350}
                    />
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
