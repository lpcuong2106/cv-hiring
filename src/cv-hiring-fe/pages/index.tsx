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

const { Option } = Select;
const Home: NextPage = () => {
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
                          <Option value="jack">Chọn ngành nghề</Option>
                          <Option value="lucy">Kế toán</Option>
                        </Select>
                        <Select
                          style={{ width: 200 }}
                          placeholder="Chọn tỉnh thành"
                          // onChange={handleChange}
                        >
                          <Option value="jack">An Giang</Option>
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
            <Row>
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

                <Row className={style.topCompany}>
                  <Col md={8}>
                    <Link href="/viec-lam-kinh-doanh-c23">
                      <div className={style.companyBox}>
                        <img
                          src="https://cdn.mywork.com.vn/images/employer_avatar/2022/01/13/images/164204274064.jpeg"
                          style={{ width: "63px", objectFit: "contain" }}
                        />
                        <p>8 vị trí đang tuyển</p>
                      </div>
                    </Link>
                  </Col>
                  <Col md={8}>
                    <Link href="/viec-lam-kinh-doanh-c23">
                      <div className={style.companyBox}>
                        <img
                          src="https://cdn.mywork.com.vn/images/employer_avatar/2022/01/13/images/164204274064.jpeg"
                          style={{ width: "63px", objectFit: "contain" }}
                        />
                        <p>8 vị trí đang tuyển</p>
                      </div>
                    </Link>
                  </Col>
                  <Col md={8}>
                    <Link href="/viec-lam-kinh-doanh-c23">
                      <div className={style.companyBox}>
                        <img
                          src="https://cdn.mywork.com.vn/images/employer_avatar/2022/01/13/images/164204274064.jpeg"
                          style={{ width: "63px", objectFit: "contain" }}
                        />
                        <p>8 vị trí đang tuyển</p>
                      </div>
                    </Link>
                  </Col>
                  <Col md={8}>
                    <Link href="/viec-lam-kinh-doanh-c23">
                      <div className={style.companyBox}>
                        <img
                          src="https://cdn.mywork.com.vn/images/employer_avatar/2022/01/13/images/164204274064.jpeg"
                          style={{ width: "63px", objectFit: "contain" }}
                        />
                        <p>8 vị trí đang tuyển</p>
                      </div>
                    </Link>
                  </Col>
                  <Col md={8}>
                    <Link href="/viec-lam-kinh-doanh-c23">
                      <div className={style.companyBox}>
                        <img
                          src="https://cdn.mywork.com.vn/images/employer_avatar/2022/01/13/images/164204274064.jpeg"
                          style={{ width: "63px", objectFit: "contain" }}
                        />
                        <p>8 vị trí đang tuyển</p>
                      </div>
                    </Link>
                  </Col>
                  <Col md={8}>
                    <Link href="/viec-lam-kinh-doanh-c23">
                      <div className={style.companyBox}>
                        <img
                          src="https://cdn.mywork.com.vn/images/employer_avatar/2022/01/13/images/164204274064.jpeg"
                          style={{ width: "63px", objectFit: "contain" }}
                        />
                        <p>8 vị trí đang tuyển</p>
                      </div>
                    </Link>
                  </Col>
                </Row>
              </Col>
              <Col md={24}>
                <div className={style.headerBoxList}>
                  <span className={style.title}>Việc làm theo ngành nghề</span>
                  <span className={style.line}></span>
                </div>
                <ul className={style.listCarrier}>
                  <Row>
                    <Col md={8}>
                      <li>
                        <Link href="/viec-lam-kinh-doanh-c23">
                          <span className={style.text}>Kinh doanh</span>
                        </Link>
                      </li>
                      <li>
                        <Link href="/viec-lam-kinh-doanh-c23">
                          <span className={style.text}>Kinh doanh</span>
                        </Link>
                      </li>
                    </Col>
                    <Col md={8}>
                      <li>
                        <Link href="/viec-lam-kinh-doanh-c23">
                          <span className={style.text}>Kinh doanh</span>
                        </Link>
                      </li>
                      <li>
                        <Link href="/viec-lam-kinh-doanh-c23">
                          <span className={style.text}>Kinh doanh</span>
                        </Link>
                      </li>
                    </Col>
                  </Row>
                </ul>
              </Col>
              <Col md={24}>
                <div className={style.headerBoxList}>
                  <span className={style.title}>Việc làm theo tỉnh thành</span>
                  <span className={style.line}></span>
                </div>
                <ul className={style.listCarrier}>
                  <Row>
                    <Col md={8}>
                      <li>
                        <Link href="/viec-lam-kinh-doanh-c23">
                          <span className={style.text}>Kinh doanh</span>
                        </Link>
                      </li>
                      <li>
                        <Link href="/viec-lam-kinh-doanh-c23">
                          <span className={style.text}>Kinh doanh</span>
                        </Link>
                      </li>
                    </Col>
                    <Col md={8}>
                      <li>
                        <Link href="/viec-lam-kinh-doanh-c23">
                          <span className={style.text}>Kinh doanh</span>
                        </Link>
                      </li>
                      <li>
                        <Link href="/viec-lam-kinh-doanh-c23">
                          <span className={style.text}>Kinh doanh</span>
                        </Link>
                      </li>
                    </Col>
                  </Row>
                </ul>
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
