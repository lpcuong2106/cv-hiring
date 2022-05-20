import { Col, Row, Button, Tabs, Tooltip, Rate } from "antd";
import type { NextPage } from "next";
import Head from "next/head";
import { Container } from "react-bootstrap";
import Layout from "../../../components/layouts";
import style from "./style.module.scss";
import { TimeSlot } from "@styled-icons/entypo/TimeSlot";
import { Clock } from "@styled-icons/bootstrap/Clock";
import { JobInfoRequirement } from "../../../components/JobInfoRequirement";
import { useQuery } from "@apollo/client";
import {
  FETCH_USER_IS_APPLIED_WORKJOB,
  FETCH_WORKJOB_QUERY,
} from "../../../GraphQL/Query/WorkJob";
import { LoadingApp } from "../../../components/LoadingApp";
import { WorkApply, WorkJob } from "../../../data";
import BreadcrumbCus from "../../../components/BreadcrumbCus";
import { useRouter } from "next/router";
import format from "date-fns/format";
import parse from "date-fns/parse";
import { FacebookShareButton, FacebookShareCount } from "react-share";
import { useCallback, useState } from "react";
import ApplyCVModal from "../../../components/ApplyCVModal";
import Link from "next/link";
import { formatTypeWorkJob } from "../../../utils/formatTypeWorkJob";
import { useAppSelector } from "../../../store/hook";
import NotFound from "../../../components/NotFound";
import moment from "moment";

interface DataQuery {
  getWorkJobBySlug: WorkJob;
}
const { TabPane } = Tabs;
interface CompanyBoxProps {
  content: string;
  lable: string;
  icon: string;
}

interface DataAppliedQuery {
  userAppliedWorkJob: WorkApply;
}

const CompanyBox = ({ content, lable, icon }: CompanyBoxProps) => {
  return (
    <div className={style.boxItem}>
      <img src={icon} alt="" />
      <div>
        <p className={style.title}>{lable}</p>
        <p className={style.content}>{content}</p>
      </div>
    </div>
  );
};

const WorkJobPage: NextPage = () => {
  const router = useRouter();
  // const context = useContext(AuthContext);
  const userLoggedIn = useAppSelector((state) => state.user);
  const [isShowApply, setIsShowApply] = useState(false);
  const { slug } = router.query;
  const { data, loading } = useQuery<DataQuery>(FETCH_WORKJOB_QUERY, {
    variables: { slug },
  });
  const {
    data: userAppliedWorkJob,
    loading: userApplyLoading,
    refetch,
  } = useQuery<DataAppliedQuery>(FETCH_USER_IS_APPLIED_WORKJOB, {
    variables: {
      user_id: userLoggedIn?.user?.id,
      work_job_id: data?.getWorkJobBySlug?.id,
    },
    skip: !data?.getWorkJobBySlug?.id || !userLoggedIn?.user?.id,
  });

  const workJob = data?.getWorkJobBySlug;

  const renderButtonApply = useCallback(() => {
    if (!userLoggedIn.isLoggedIn) {
      return (
        <Link href="/login">
          <Button type="dashed" size="large">
            Vui lòng đăng nhập để ứng tuyển
          </Button>
        </Link>
      );
    }
    if (userLoggedIn.user?.role.name === "user") {
      if (userAppliedWorkJob?.userAppliedWorkJob?.id) {
        return (
          <Tooltip
            placement="topRight"
            title="Click vào để xem trạng thái xử lý"
          >
            <Link href="/viec-lam/ung-tuyen">
              <Button type="dashed" size="large">
                Bạn đã nộp vào vị trí này rồi
              </Button>
            </Link>
          </Tooltip>
        );
      }

      if (
        moment(data?.getWorkJobBySlug.expired_date_hiring).isBefore(moment())
      ) {
        return (
          <Tooltip title="Công việc này đã hết hạn tuyển dụng">
            <Button disabled type="primary" size="large">
              Nộp hồ sơ ngay
            </Button>
          </Tooltip>
        );
      }

      if (data?.getWorkJobBySlug.is_open == 0) {
        return (
          <Tooltip title="Công việc này đã dừng tuyển dụng">
            <Button disabled type="primary" size="large">
              Nộp hồ sơ ngay
            </Button>
          </Tooltip>
        );
      }
      if (
        data?.getWorkJobBySlug.is_open == 1 &&
        moment(data?.getWorkJobBySlug.expired_date_hiring).isAfter(moment())
      ) {
        return (
          <Button
            loading={userApplyLoading}
            type="primary"
            size="large"
            onClick={() => setIsShowApply(true)}
          >
            Nộp hồ sơ ngay
          </Button>
        );
      }
    }
  }, [data, userLoggedIn, userAppliedWorkJob, userApplyLoading]);

  if (loading) {
    return <LoadingApp />;
  }

  if (!workJob) {
    return <NotFound />;
  }

  return (
    <Layout>
      <div>
        <Head>
          <title>{workJob?.name} | Kết nối lao động việt | TimViec</title>
          <meta property="og:url" content={window.location.href} />
          <meta property="og:type" content="article" />
          <meta
            property="og:title"
            content={`${workJob?.name} | Kết nối lao động việt | TimViec`}
          />
          <meta
            property="og:description"
            content="How much does culture influence creative thinking?"
          />
          <meta property="og:image" content={"/company-default.svg"} />
        </Head>
        <main>
          <Container>
            <BreadcrumbCus />
            <ApplyCVModal
              refetchApply={refetch}
              jobId={workJob?.id ?? 1}
              companyName={workJob?.company.name ?? ""}
              jobName={workJob?.name ?? ""}
              isShowApply={isShowApply}
              setIsShowApply={setIsShowApply}
              companyLogo={workJob?.company.logo ?? ""}
            />
            <Row>
              <Col md={24}>
                <div className={style.boxContent}>
                  <div className={style.insight}>
                    <div className={style.companyLogo}>
                      <img
                        src={workJob?.company.logo || "/company-default.svg"}
                        onError={({ currentTarget }) => {
                          currentTarget.onerror = null; // prevents looping
                          currentTarget.src = "/company-default.svg";
                        }}
                      />
                    </div>
                    <div>
                      <h3 className={style.workJobTitle}>{workJob?.name}</h3>
                      <div className={style.companyTitle}>
                        <Link href={"/cong-ty/" + workJob?.company.slug}>
                          <a>
                            {workJob?.company.name}{" "}
                            <Rate
                              value={workJob.company.avgReview ?? 0}
                              disabled
                              style={{ marginLeft: 10 }}
                            />
                          </a>
                        </Link>
                      </div>
                      <div className={style.info}>
                        <div>
                          <TimeSlot width={16} />
                          <span>
                            Hạn nộp hồ sơ:{" "}
                            {workJob?.expired_date_hiring &&
                              format(
                                parse(
                                  workJob.expired_date_hiring,
                                  "yyyy-MM-dd HH:m:s",
                                  new Date()
                                ),
                                "dd-MM-yyyy"
                              )}{" "}
                          </span>
                        </div>

                        <div>
                          <Clock width={16} />
                          <span>
                            Đăng ngày:{" "}
                            {workJob?.created_at &&
                              format(
                                parse(
                                  workJob.created_at,
                                  "yyyy-MM-dd",
                                  new Date()
                                ),
                                "dd-MM-yyyy"
                              )}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className={style.btnAction}>
                      {renderButtonApply()}

                      <FacebookShareButton
                        url={window.location.href}
                        quote="hihi"
                        hashtag="ihih"
                      >
                        <Button type="primary" size="large">
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

                  <div className={style.detailJob}>
                    <Row style={{ marginTop: "24px" }}>
                      <JobInfoRequirement
                        label="Mức lương (tr/tháng)"
                        value={workJob?.salary ?? ""}
                      />
                      <JobInfoRequirement
                        label="Yêu cầu độ tuổi"
                        value={workJob?.requirement_age ?? ""}
                      />
                      <JobInfoRequirement
                        label="Khu vực tuyển"
                        value={workJob?.province.name ?? ""}
                      />
                      <JobInfoRequirement
                        label="Yêu cầu giới tính"
                        value={workJob?.requirement_gender ?? ""}
                      />

                      <JobInfoRequirement
                        label="Số lượng tuyển"
                        value={workJob?.amount_hiring?.toString() ?? "0"}
                      />
                      <JobInfoRequirement
                        label="Yêu cầu kinh nghiệm"
                        value={workJob?.requirement_exp ?? ""}
                      />
                      <JobInfoRequirement
                        label="Hình thức làm việc"
                        value={formatTypeWorkJob(workJob?.type ?? "")}
                      />
                      <JobInfoRequirement
                        label="Ngành"
                        // @ts-ignore
                        value={
                          <a href={`/danh-muc/${workJob?.work_category.id}`}>
                            {workJob?.work_category.name ?? ""}
                          </a>
                        }
                      />
                    </Row>
                  </div>
                </div>
                <Tabs>
                  <TabPane tab="Thông tin" key="1">
                    <div className={style.boxContent}>
                      <div className={style.detailJob}>
                        <h6>Mô tả công việc</h6>
                        <div>{workJob?.description}</div>
                      </div>
                      <div className={style.detailJob}>
                        <h6>Yêu cầu công việc</h6>
                        <div>{workJob?.requirement}</div>
                      </div>
                      <div className={style.detailJob}>
                        <h6>Quyền lợi của ứng viên</h6>
                        <div>{workJob?.benefit}</div>
                      </div>
                    </div>
                  </TabPane>
                  <TabPane tab="Công ty" key="2">
                    <div className={style.boxContent}>
                      <div className={style.detailJob}>
                        <h6>Thông tin công ty {workJob?.company.name}</h6>
                        <div className="box-info">
                          <CompanyBox
                            content={workJob?.company.description ?? ""}
                            lable="Giới thiệu"
                            icon="https://www.topcv.vn/v4/image/job-detail/icon/8.svg"
                          />
                          <CompanyBox
                            content={workJob?.company.amount_employee ?? ""}
                            lable="Quy mô"
                            icon="https://www.topcv.vn/v4/image/job-detail/icon/9.svg"
                          />
                          <CompanyBox
                            content={workJob?.company.address ?? ""}
                            lable="Địa điểm"
                            icon="https://www.topcv.vn/v4/image/job-detail/icon/10.svg"
                          />
                          <CompanyBox
                            // @ts-ignore
                            content={
                              <Rate
                                value={workJob.company.avgReview ?? 0}
                                disabled
                                style={{ marginLeft: 10 }}
                              />
                            }
                            lable="Đánh giá công ty"
                            icon="https://www.topcv.vn/v4/image/job-detail/icon/10.svg"
                          />
                        </div>
                      </div>
                    </div>
                  </TabPane>
                </Tabs>
              </Col>
            </Row>
          </Container>
        </main>
      </div>
    </Layout>
  );
};

export default WorkJobPage;
