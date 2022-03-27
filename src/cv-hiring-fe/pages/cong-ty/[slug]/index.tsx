import { Button, Col, Rate, Row, Tabs } from "antd";
import type { NextPage } from "next";
import Head from "next/head";
import { Container } from "react-bootstrap";
import Layout from "../../../components/layouts";
import style from "./style.module.scss";
import { Share } from "@styled-icons/heroicons-outline/Share";
import { FirefoxBrowser } from "@styled-icons/fa-brands/FirefoxBrowser";
import { useQuery } from "@apollo/client";
import { FETCH_COMPANY_DETAIL } from "../../../GraphQL/Query/Comapany";
import { LoadingApp } from "../../../components/LoadingApp";
import { Company, PaginatorInfo, Review, WorkJob } from "../../../data";
import { useRouter } from "next/router";
import BreadcrumbCus from "../../../components/BreadcrumbCus";
import { FacebookShareButton, FacebookShareCount } from "react-share";
import JobItem from "../../../components/JobItem";
import { FETCH_WORK_JOB_HIRING_COMPANY } from "../../../GraphQL/Query/WorkJob";
import NotFound from "../../404";
import CommentList from "../../../components/CommentList";
import { useAppSelector } from "../../../store/hook";

const { TabPane } = Tabs;

interface DataQuery {
  companyDetail: Company;
  companyReview: {
    data: Review[];
    paginatorInfo: PaginatorInfo;
  };
}
interface DataWorkJobQuery {
  workJobHiringOfCompany: WorkJob[];
}

const Company: NextPage = () => {
  const router = useRouter();
  const { slug } = router.query;

  const { data, loading, refetch } = useQuery<DataQuery>(FETCH_COMPANY_DETAIL, {
    variables: {
      slug,
      page: 1,
    },
  });
  const company = data?.companyDetail;
  const userLoggedIn = useAppSelector((state) => state.user);
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
                          <h1>{company?.name} </h1>
                          <p>
                            Xếp hạng công ty:{" "}
                            <Rate
                              value={company.avgReview}
                              allowHalf
                              disabled
                              style={{ marginRight: 10 }}
                            />{" "}
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
                          </p>
                          <div className={style.boxListMenu}>
                            <ul>
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
                            {company?.address && (
                              <p>
                                {company?.address + " "}
                                <a
                                  href={`https://www.google.com/maps?q=${company?.address}`}
                                  target={"_blank"}
                                >
                                  Xem bản đồ
                                </a>
                              </p>
                            )}
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
                          avgReview={company.avgReview}
                          updatedAt={job.updated_at}
                        />
                      ))}
                    </TabPane>
                    <TabPane tab="Bình luận" key="3">
                      <CommentList
                        refetchComment={refetch}
                        loadingData={loading}
                        comments={data.companyReview}
                        userId={userLoggedIn.user?.id ?? 0}
                        companyId={company.id}
                      />
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
