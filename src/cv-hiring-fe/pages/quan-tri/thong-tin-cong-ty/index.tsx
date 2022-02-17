import React, { useState } from "react";
import { Row, Col, Card, message } from "antd";
import style from "./style.module.scss";
import Head from "next/head";
import { useMutation, useQuery } from "@apollo/client";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/router";
import LayoutAdmin from "../../../components/layouts/LayoutAdmin";
import { LoadingApp } from "../../../components/LoadingApp";
import { FETCH_COMPANY_DETAIL } from "../../../GraphQL/Query/Comapany";
import { Company } from "../../../data";
import { useAppSelector } from "../../../store/hook";
import FormEditWorkJob from "../tuyen-dung/[id]/FormEditWorkJob";
import FormEditCompany from "./FormEditCompany";

interface DataQuery {
  companyDetail: Company;
}

// export const validationSchemaWorkJob = Yup.object().shape({
//   name: Yup.string()
//     .min(8, "Tên công việc ít nhất 8 kí tự")
//     .required("Tên công việc là bắt buộc"),
//   benefit: Yup.string()
//     .min(8, "Lợi ích công việc ít nhất 8 kí tự")
//     .required("Lợi ích công việc là bắt buộc"),
//   description: Yup.string()
//     .min(8, "Mô tả công việc ít nhất 8 kí tự")
//     .required("Mô tả công việc là bắt buộc"),
//   requirement: Yup.string()
//     .min(8, "Yêu cầu công việc ít nhất 8 kí tự")
//     .required("Yêu cầu công việc là bắt buộc"),
//   requirement_exp: Yup.string()
//     .typeError("Vui lòng chọn yêu cầu kinh nghiệm")
//     .required("Vui lòng chọn yêu cầu kinh nghiệm"),
//   requirement_gender: Yup.string()
//     .typeError("Vui lòng chọn yêu cầu giới tính")
//     .required("Yêu cầu giới tính là bắt buộc"),
//   requirement_age: Yup.string().required("Yêu cầu độ tuổi là bắt buộc"),
//   amount_hiring: Yup.number()
//     .typeError("Vui lòng nhập đúng định dạng số lượng tuyển")
//     .min(1)
//     .required("Số lượng tuyển dụng là bắt buộc"),
//   address_work: Yup.string().required("Địa chỉ làm việc là bắt buộc"),
//   salary: Yup.string().required("Chọn lương là bắt buộc"),
//   type: Yup.string()
//     .typeError("Vui lòng chọn loại công việc")
//     .required("Vui lòng chọn loại công việc"),
//   expired_date_hiring: Yup.string().required("Chọn ngày hết hạn là bắt buộc"),
//   work_category_id: Yup.number()
//     .typeError("Vui lòng chọn lĩnh vực")
//     .required("Tên công việc là bắt buộc"),
//   company_id: Yup.number().required("Công ty là bắt buộc"),
//   province_id: Yup.number()
//     .typeError("Vui lòng chọn tỉnh thành")
//     .required("Vui lòng chọn tỉnh thành"),
// });
export type ModeView = "edit" | "create" | "view";
const ManageCompany = () => {
  const userLoggedIn = useAppSelector((state) => state.user.user);

  const { data, loading } = useQuery<DataQuery>(FETCH_COMPANY_DETAIL, {
    variables: {
      id: userLoggedIn?.company?.id,
    },
    skip: !userLoggedIn?.company?.id,
  });
  const [mode, setMode] = useState<ModeView>("view");
  const companyDetail = data?.companyDetail;
  // const provinces = data?.provinces;
  // const router = useRouter();

  // const [createNewJob, { loading: loadingSubmit }] =
  //   useMutation(CREATE_WORKJOB);

  return (
    <LayoutAdmin>
      <Head>
        <title>Kết nối lao động việt | Quản trị </title>
      </Head>
      {loading || !companyDetail ? (
        <LoadingApp />
      ) : (
        <div className="site-statistic-demo-card">
          <Row gutter={16}>
            <Col span={24} className={style.statistic}>
              <Card title="Thông tin công ty">
                <div>
                  <div className={style.logoCompany}>
                    <img src={companyDetail.logo} />
                  </div>

                  <Formik
                    initialValues={{
                      name: companyDetail.name,
                      description: companyDetail.description,
                      amount_employee: companyDetail.amount_employee,
                      website: companyDetail.website,
                      fanpage: companyDetail.fanpage,
                      address: companyDetail.address,
                      gg_map: companyDetail.gg_map,
                      logo: companyDetail.logo,
                      banner: companyDetail.banner,
                    }}
                    // validationSchema={validationSchemaWorkJob}
                    onSubmit={async (values) => {
                      // const { data } = await createNewJob({
                      //   variables: values,
                      // });
                      alert(values);
                      console.log(values);
                      setMode("view");
                      // if (data.createNewJob.status === "ERROR") {
                      //   message.error(data.message);
                      //   return;
                      // }
                      // message.success("Tạo mới việc làm thành công!");
                      // router.replace("/quan-tri/tuyen-dung");
                      return;
                    }}
                  >
                    {({ handleSubmit }) => (
                      <Form onSubmit={handleSubmit}>
                        <FormEditCompany
                          loadingSubmit={false}
                          mode={mode}
                          setMode={setMode}
                        />
                      </Form>
                    )}
                  </Formik>
                </div>
              </Card>
            </Col>
          </Row>
        </div>
      )}
    </LayoutAdmin>
  );
};

export default ManageCompany;
