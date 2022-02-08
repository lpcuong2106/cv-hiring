import React from "react";
import { Row, Col, Card, message } from "antd";
import style from "./style.module.scss";
import LayoutAdmin from "../../../../components/layouts/LayoutAdmin";
import Head from "next/head";
import { useMutation, useQuery } from "@apollo/client";
import { LoadingApp } from "../../../../components/LoadingApp";
import BackButton from "../../../../components/BackButton";
import { Form, Formik } from "formik";
import FormEditWorkJob from "./FormEditWorkJob";
import { CREATE_WORKJOB } from "../../../../GraphQL/Mutation/CreateWorkJob";
import { FETCH_ALL_PROVINCE_CATEGORY } from "../../../../GraphQL/Query/FetchData";
import { Province, WorkCategory } from "../../../../data";
import * as Yup from "yup";
interface DataQuery {
  workCategories: WorkCategory[];
  provinces: Province[];
}

const validationSchema = Yup.object().shape({
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
  expired_date: Yup.string().required("Chọn ngày hết hạn là bắt buộc"),
  work_category_id: Yup.number()
    .typeError("Vui lòng chọn lĩnh vực")
    .required("Tên công việc là bắt buộc"),
  company_id: Yup.number().required("Công ty là bắt buộc"),
  province_id: Yup.number()
    .typeError("Vui lòng chọn tỉnh thành")
    .required("Vui lòng chọn tỉnh thành"),
});

const AppliedCVEdit = () => {
  const { data, loading } = useQuery<DataQuery>(FETCH_ALL_PROVINCE_CATEGORY);
  const workCategories = data?.workCategories;
  const provinces = data?.provinces;

  const [createNewJob, { loading: loadingSubmit }] =
    useMutation(CREATE_WORKJOB);

  return (
    <LayoutAdmin>
      <Head>
        <title>Kết nối lao động việt | Quản trị </title>
      </Head>
      {loading || !workCategories || !provinces ? (
        <LoadingApp />
      ) : (
        <div className="site-statistic-demo-card">
          <BackButton />
          <h1>Chỉnh sửa tin tuyển dụng</h1>
          <Row gutter={16}>
            <Col span={24} className={style.statistic}>
              <Card title="Nội dung tuyển dụng">
                <Formik
                  initialValues={{
                    name: "",
                    benefit: "",
                    requirement: "",
                    requirement_exp: null,
                    requirement_gender: null,
                    requirement_age: "",
                    amount_hiring: 1,
                    address_work: "",
                    salary: "",
                    type: null,
                    expired_date: "",
                    work_category_id: null,
                    company_id: 1,
                    province_id: null,
                  }}
                  validationSchema={validationSchema}
                  onSubmit={async (values, actions) => {
                    // setTimeout(() => {
                    //   alert(JSON.stringify(values, null, 2));
                    //   actions.setSubmitting(false);
                    // }, 1000);

                    const { data } = await createNewJob({
                      variables: values,
                    });
                    if (data.createNewJob.status === "ERROR") {
                      message.error(data.message);
                      return;
                    }
                    message.success("Tạo mới việc làm thành công!");
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
                </Formik>
              </Card>
            </Col>
          </Row>
        </div>
      )}
    </LayoutAdmin>
  );
};

export default AppliedCVEdit;
