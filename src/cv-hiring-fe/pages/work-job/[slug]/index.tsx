import { Col, Row, Card, Button, Breadcrumb } from "antd";
import type { NextPage } from "next";
import Head from "next/head";
import { Container } from "react-bootstrap";
import Layout from "../../../components/layouts";
import style from "./style.module.scss";
import { TimeSlot } from "@styled-icons/entypo/TimeSlot";
import { Clock } from "@styled-icons/bootstrap/Clock";
import { Eye } from "@styled-icons/bootstrap/Eye";
import { JobInfoRequirement } from "../../../components/JobInfoRequirement";

const WorkJob: NextPage = () => {
  return (
    <Layout>
      <div>
        <Head>
          <title>Kết nối lao động việt | TimViec</title>
        </Head>
        <main>
          <Container>
            <Row>
              <Breadcrumb>
                <Breadcrumb.Item>Trang chủ</Breadcrumb.Item>
                <Breadcrumb.Item>
                  <a href="">Application Center</a>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                  <a href="">Application List</a>
                </Breadcrumb.Item>
                <Breadcrumb.Item>An Application</Breadcrumb.Item>
              </Breadcrumb>
              <Col md={18}>
                <div className={style.boxContent}>
                  <h3>Nhân Viên Giao Hàng (Lao Động Phổ Thông) Tại Thủ Đức</h3>
                  <div className={style.info}>
                    <div>
                      <TimeSlot width={16} />
                      <span>Hạn nộp hồ sơ: 31/01/2022</span>
                    </div>
                    <div>
                      <Eye width={16} />
                      <span>Lượt xem: 2157</span>
                    </div>
                    <div>
                      <Clock width={16} />
                      <span>Đăng ngày: 24/01/2022</span>
                    </div>
                  </div>
                  <div className={style.btnAction}>
                    <Button type="primary" size="large">
                      Nộp hồ sơ
                    </Button>
                    <Button type="primary" size="large">
                      Chia sẻ
                    </Button>
                  </div>
                  <div className={style.detailJob}>
                    <h6>Thông tin</h6>
                    <Row>
                      <JobInfoRequirement label="Mức lương" value="7-20 tr" />
                      <JobInfoRequirement
                        label="Yêu cầu độ tuổi"
                        value="Không yêu cầu độ tuổi"
                      />
                      <JobInfoRequirement
                        label="Khu vực tuyển"
                        value="TP.HCM"
                      />
                      <JobInfoRequirement
                        label="Yêu cầu giới tính"
                        value="Nam"
                      />
                      <JobInfoRequirement
                        label="Yêu cầu bằng cấp"
                        value="Không yêu cầu"
                      />
                      <JobInfoRequirement label="Số lượng tuyển" value="3" />
                      <JobInfoRequirement
                        label="Yêu cầu kinh nghiệm"
                        value="Chưa có kinh nghiệm"
                      />
                      <JobInfoRequirement
                        label="Hình thức làm việc"
                        value="Toàn thời gian cố định"
                      />
                    </Row>
                  </div>
                </div>
                <div className={style.boxContent}>
                  <div className={style.detailJob}>
                    <h6>Mô tả công việc</h6>
                    <div>
                      <p>
                        - Lương từ 6.500.000đ đến 7.000.000đ nghỉ ngày chủ nhật
                      </p>
                      <p>
                        - Một năm tăng lương 1 lần tùy theo năng lực (trung bình
                        500.000đ)
                      </p>
                      <p>- Hỗ trợ xăng xe, phương tiện đi lại</p>
                      <p>- Nghỉ lễ, Tết theo quy định của Nhà nước</p>
                      <p>- Các chế độ thưởng, phụ cấp theo quy định cửa hàng</p>
                      <p>
                        - Hưởng đầy đủ chế độ phúc lợi theo quy định Công ty
                        BHXH, BHYT, BHTN, thưởng lễ, tết, lương tháng thứ 13,
                        hiếu, hỉ, nghỉ mát hàng năm...)
                      </p>
                      <p>- Môi trường làm việc năng động, trẻ trung</p>
                      <p>- Các quyền lợi khác trao đổi thêm khi phỏng vấn</p>
                    </div>
                    <h6>Yêu cầu công việc</h6>
                    <div>
                      <p>
                        - Lương từ 6.500.000đ đến 7.000.000đ nghỉ ngày chủ nhật
                      </p>
                      <p>
                        - Một năm tăng lương 1 lần tùy theo năng lực (trung bình
                        500.000đ)
                      </p>
                      <p>- Hỗ trợ xăng xe, phương tiện đi lại</p>
                      <p>- Nghỉ lễ, Tết theo quy định của Nhà nước</p>
                      <p>- Các chế độ thưởng, phụ cấp theo quy định cửa hàng</p>
                      <p>
                        - Hưởng đầy đủ chế độ phúc lợi theo quy định Công ty
                        BHXH, BHYT, BHTN, thưởng lễ, tết, lương tháng thứ 13,
                        hiếu, hỉ, nghỉ mát hàng năm...)
                      </p>
                      <p>- Môi trường làm việc năng động, trẻ trung</p>
                      <p>- Các quyền lợi khác trao đổi thêm khi phỏng vấn</p>
                    </div>
                    <h6>Quyền lợi</h6>
                    <div>
                      <p>
                        - Lương từ 6.500.000đ đến 7.000.000đ nghỉ ngày chủ nhật
                      </p>
                      <p>
                        - Một năm tăng lương 1 lần tùy theo năng lực (trung bình
                        500.000đ)
                      </p>
                      <p>- Hỗ trợ xăng xe, phương tiện đi lại</p>
                      <p>- Nghỉ lễ, Tết theo quy định của Nhà nước</p>
                      <p>- Các chế độ thưởng, phụ cấp theo quy định cửa hàng</p>
                      <p>
                        - Hưởng đầy đủ chế độ phúc lợi theo quy định Công ty
                        BHXH, BHYT, BHTN, thưởng lễ, tết, lương tháng thứ 13,
                        hiếu, hỉ, nghỉ mát hàng năm...)
                      </p>
                      <p>- Môi trường làm việc năng động, trẻ trung</p>
                      <p>- Các quyền lợi khác trao đổi thêm khi phỏng vấn</p>
                    </div>
                  </div>
                </div>
              </Col>
              <Col md={6}>
                <Card title="Việc làm tương tự">
                  <div className={style.sameJob}>
                    <a
                      href="/procurement-staff-nhan-vien-mua-hang-8-1461179-jv/?utm_source=jobdetail&amp;utm_medium=rightcorner&amp;utm_campaign=relevantjobs&amp;utm_content=SmartNaviIOP"
                      target="_blank"
                    >
                      <div className={style.sameJobItem}>
                        <img
                          className={style.logo}
                          src="https://images.vietnamworks.com/pictureofcompany/6d/10256033.png"
                          alt="Procurement Staff / Nhân Viên Mua Hàng"
                        />
                        <div className={style.info}>
                          <p className={style.title}>
                            Procurement Staff / Nhân Viên Mua Hàng
                          </p>
                          <p className={style.description}>
                            Sumitomo NACCO Forklift Vietnam Co., Ltd.
                          </p>
                        </div>
                      </div>
                    </a>
                  </div>
                </Card>
              </Col>
            </Row>
          </Container>
        </main>
      </div>
    </Layout>
  );
};

export default WorkJob;
