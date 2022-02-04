import React from "react";
import { Row, Col, Card, Input, Button, Select } from "antd";
import style from "./style.module.scss";
import LayoutAdmin from "../../../../components/layouts/LayoutAdmin";
import Head from "next/head";
import { useQuery } from "@apollo/client";
import { FETCH_ALL_WORKJOB_MANAGE } from "../../../../GraphQL/Query/WorkJob";
import { LoadingApp } from "../../../../components/LoadingApp";
import BackButton from "../../../../components/BackButton";
import { EditSettings } from "@styled-icons/fluentui-system-filled/EditSettings";
import AdminInput from "../../../../components/AdminInput";
import { Form, Formik } from "formik";
import FormEditWorkJob from "./FormEditWorkJob";

const AppliedCVEdit = () => {
  const { data, loading } = useQuery(FETCH_ALL_WORKJOB_MANAGE, {
    variables: {
      companyId: 1,
    },
  });
  const workJobByCompany = data?.workJobByCompany;

  return (
    <LayoutAdmin>
      <Head>
        <title>Kết nối lao động việt | Quản trị </title>
      </Head>
      {loading || !workJobByCompany ? (
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
                    work_category_id: "",
                    company_id: 0,
                    benefit: "",
                    requirement: "",
                    requirement_exp: "",
                    requirement_gender: null,
                    requirement_age: "",
                    amount_hiring: 0,
                    address_work: "",
                    salary: "",
                    type: "",
                    is_open: 0,
                    expired_date: "",
                    province_id: 0,
                  }}
                  onSubmit={(values, actions) => {
                    setTimeout(() => {
                      alert(JSON.stringify(values, null, 2));
                      actions.setSubmitting(false);
                    }, 1000);
                  }}
                >
                  {({ handleSubmit }) => (
                    <Form onSubmit={handleSubmit}>
                      <FormEditWorkJob />
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
