import { Button, Col, Row, Tabs } from "antd";
import type { NextPage } from "next";
import Head from "next/head";
import { Container } from "react-bootstrap";
import Layout from "../../../components/layouts";
import style from "./style.module.scss";
import { EyeShow } from "@styled-icons/fluentui-system-filled/EyeShow";
import { Share } from "@styled-icons/heroicons-outline/Share";
import { Location } from "@styled-icons/entypo/Location";
import { FirefoxBrowser } from "@styled-icons/fa-brands/FirefoxBrowser";
import Link from "next/link";
import { useQuery } from "@apollo/client";
import { FETCH_COMPANY_DETAIL } from "../../../GraphQL/Query/Comapany";
import { LoadingApp } from "../../../components/LoadingApp";
import { Company, WorkJob } from "../../../data";
import { useRouter } from "next/router";
import BreadcrumbCus from "../../../components/BreadcrumbCus";
import { FacebookShareButton, FacebookShareCount } from "react-share";
import JobItem from "../../../components/JobItem";
import { FETCH_WORK_JOB_HIRING_COMPANY } from "../../../GraphQL/Query/WorkJob";
import NotFound from "../../404";
const { TabPane } = Tabs;

interface DataQuery {
  companyDetail: Company;
}
interface DataWorkJobQuery {
  workJobHiringOfCompany: WorkJob[];
}

const Company: NextPage = () => {
  const router = useRouter();
  const { slug } = router.query;

  const { data, loading } = useQuery<DataQuery>(FETCH_COMPANY_DETAIL, {
    variables: {
      slug,
    },
  });
  const company = data?.companyDetail;

  const { data: workJobs } = useQuery<DataWorkJobQuery>(
    FETCH_WORK_JOB_HIRING_COMPANY,
    {
      variables: {
        companyId: company?.id,
      },
      skip: !company?.id,
    }
  );
  if (loading) {
    return <LoadingApp />;
  }
  if (!company) {
    return <NotFound />;
  }

  return (
    <Layout>
      <div>
        <Head>
          <title>Kết nối lao động việt | TimViec</title>
        </Head>

        <main className={style.wrapCompanyDetail}>
          <Container>
            <BreadcrumbCus />
            <Row>
              <Col md={24}>
                <div className={style.banner}>
                  <img
                    src={company?.banner || "/company-default-banner.jpg"}
                    className={style.bannerImg}
                    onError={({ currentTarget }) => {
                      currentTarget.onerror = null; // prevents looping
                      currentTarget.src = "/company-default-banner.jpg";
                    }}
                  />
                  <div className={style.introControl}>
                    <div className={style.logo}>
                      <div className={style.nameCompany}>
                        <img
                          src={company?.logo || "/company-default.svg"}
                          alt=""
                          className={style.logoImage}
                          onError={({ currentTarget }) => {
                            currentTarget.onerror = null; // prevents looping
                            currentTarget.src = "/company-default.svg";
                          }}
                        />
                        <div className={style.introCompany}>
                          <h1>{company?.name}</h1>
                          <div className={style.boxListMenu}>
                            <ul>
                              <li>
                                <Location width={16} />
                                <Link href="/">
                                  <a className={style.locationText}>Hà Nội</a>
                                </Link>
                              </li>
                              <li>
                                <FirefoxBrowser width={16} />
                                <a
                                  className={style.locationText}
                                  href={company?.website}
                                  target="_blank"
                                >
                                  {company?.website}
                                </a>
                              </li>
                            </ul>
                            <p>
                              {company?.address + " "}
                              <a
                                href={`https://www.google.com/maps?q=${company?.address}`}
                                target={"_blank"}
                              >
                                Xem bản đồ
                              </a>
                            </p>

                            <FacebookShareButton
                              url={window.location.href}
                              quote="hihi"
                              hashtag="ihih"
                            >
                              <Button type="primary">
                                <Share width={16} />
                                Chia sẻ
                                <FacebookShareCount url={router.asPath}>
                                  {(shareCount) => (
                                    <span className="myShareCountWrapper">
                                      {shareCount}
                                    </span>
                                  )}
                                </FacebookShareCount>
                              </Button>
                            </FacebookShareButton>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className={style.companyBox}>
                  <Tabs defaultActiveKey="1">
                    <TabPane tab="Thông tin" key="1">
                      <div
                        className="text-base break-words text-se-neutral-80 font-light BoxIntroduction_contentIntroductionShow__3i1ES"
                        id="qc-content-introduction"
                      >
                        {company?.description}
                      </div>
                    </TabPane>
                    <TabPane tab="Việc làm" key="2">
                      {workJobs?.workJobHiringOfCompany?.map((job) => (
                        <JobItem
                          companySlug={company?.slug}
                          slug={job.slug}
                          provinceName={job.province.name}
                          salary={job.salary}
                          deadlineDate={job.expired_date_hiring}
                          companyName={company?.name}
                          title={job.name}
                          logoUrl={company?.logo}
                          updatedAt={job.updated_at}
                        />
                      ))}
                    </TabPane>
                  </Tabs>
                </div>
              </Col>
            </Row>
          </Container>
        </main>
      </div>
    </Layout>
  );
};

export default Company;
