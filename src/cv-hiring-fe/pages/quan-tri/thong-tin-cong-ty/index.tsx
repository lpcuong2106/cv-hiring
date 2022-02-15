import React from "react";
import { Row, Col, Card, message } from "antd";
import style from "./style.module.scss";
import Head from "next/head";
import { useMutation, useQuery } from "@apollo/client";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/router";
import LayoutAdmin from "../../../components/layouts/LayoutAdmin";
import { LoadingApp } from "../../../components/LoadingApp";
// interface DataQuery {
//   workCategories: WorkCategory[];
//   provinces: Province[];
// }

export const validationSchemaWorkJob = Yup.object().shape({
  name: Yup.string()
    .min(8, "Tên công việc ít nhất 8 kí tự")
    .required("Tên công việc là bắt buộc"),
  benefit: Yup.string()
    .min(8, "Lợi ích công việc ít nhất 8 kí tự")
    .required("Lợi ích công việc là bắt buộc"),
  description: Yup.string()
    .min(8, "Mô tả công việc ít nhất 8 kí tự")
    .required("Mô tả công việc là bắt buộc"),
  requirement: Yup.string()
    .min(8, "Yêu cầu công việc ít nhất 8 kí tự")
    .required("Yêu cầu công việc là bắt buộc"),
  requirement_exp: Yup.string()
    .typeError("Vui lòng chọn yêu cầu kinh nghiệm")
    .required("Vui lòng chọn yêu cầu kinh nghiệm"),
  requirement_gender: Yup.string()
    .typeError("Vui lòng chọn yêu cầu giới tính")
    .required("Yêu cầu giới tính là bắt buộc"),
  requirement_age: Yup.string().required("Yêu cầu độ tuổi là bắt buộc"),
  amount_hiring: Yup.number()
    .typeError("Vui lòng nhập đúng định dạng số lượng tuyển")
    .min(1)
    .required("Số lượng tuyển dụng là bắt buộc"),
  address_work: Yup.string().required("Địa chỉ làm việc là bắt buộc"),
  salary: Yup.string().required("Chọn lương là bắt buộc"),
  type: Yup.string()
    .typeError("Vui lòng chọn loại công việc")
    .required("Vui lòng chọn loại công việc"),
  expired_date_hiring: Yup.string().required("Chọn ngày hết hạn là bắt buộc"),
  work_category_id: Yup.number()
    .typeError("Vui lòng chọn lĩnh vực")
    .required("Tên công việc là bắt buộc"),
  company_id: Yup.number().required("Công ty là bắt buộc"),
  province_id: Yup.number()
    .typeError("Vui lòng chọn tỉnh thành")
    .required("Vui lòng chọn tỉnh thành"),
});

const ManageCompany = () => {
  // const { data, loading } = useQuery<DataQuery>(FETCH_ALL_PROVINCE_CATEGORY);
  // const workCategories = data?.workCategories;
  // const provinces = data?.provinces;
  // const router = useRouter();

  // const [createNewJob, { loading: loadingSubmit }] =
  //   useMutation(CREATE_WORKJOB);

  return (
    <LayoutAdmin>
      <Head>
        <title>Kết nối lao động việt | Quản trị </title>
      </Head>
      {/* {loading || !workCategories || !provinces ? (
        <LoadingApp />
      ) : ( */}
      <div className="site-statistic-demo-card">
        <Row gutter={16}>
          <Col span={24} className={style.statistic}>
            <Card title="Thông tin công ty">
              <div>
                <img src="https://static.topcv.vn/company_logos/cong-ty-co-phan-12-legions-61d90df611032.jpg" />
                <div>
                  <h6>CÔNG TY CỔ PHẦN 12 LEGIONS</h6>
                  <p>Quy mô công ty: 25-99</p>
                </div>
              </div>
              <div>
                <p>
                  Địa chỉ: 101 Hồ Bá Kiện, Phường 15, Quận 10, Thành phố Hồ Chí
                  Minh, Việt Nam
                </p>
              </div>
              {/* <Formik
                  initialValues={{
                    name: "",
                    benefit: "",
                    requirement: "",
                    requirement_exp: null,
                    requirement_gender: null,
                    requirement_age: null,
                    amount_hiring: 1,
                    address_work: "",
                    salary: null,
                    type: null,
                    expired_date_hiring: "",
                    work_category_id: null,
                    company_id: 1,
                    province_id: null,
                  }}
                  validationSchema={validationSchemaWorkJob}
                  onSubmit={async (values) => {
                    const { data } = await createNewJob({
                      variables: values,
                    });
                    if (data.createNewJob.status === "ERROR") {
                      message.error(data.message);
                      return;
                    }
                    message.success("Tạo mới việc làm thành công!");
                    router.replace("/quan-tri/tuyen-dung");
                    return;
                  }}
                >
                  {({ handleSubmit }) => (
                    <Form onSubmit={handleSubmit}>
                      <FormEditWorkJob
                        loadingSubmit={loadingSubmit}
                        workCategories={workCategories}
                        provinces={provinces}
                      />
                    </Form>
                  )}
                </Formik> */}
            </Card>
          </Col>
        </Row>
      </div>
      {/* )} */}
    </LayoutAdmin>
  );
};

export default ManageCompany;
