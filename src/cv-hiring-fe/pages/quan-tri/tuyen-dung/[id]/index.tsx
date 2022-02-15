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
import { Province, WorkCategory, WorkJob } from "../../../../data";
import { useRouter } from "next/router";
import { validationSchemaWorkJob } from "../them-moi";
import { FETCH_WORK_JOB_EDIT } from "../../../../GraphQL/Query/WorkJob";
import { UPDATE_WORKJOB } from "../../../../GraphQL/Mutation/UpdateWorkJob";
interface DataQuery {
  workCategories: WorkCategory[];
  provinces: Province[];
}
interface DataWorkJob {
  getWorkJobById: WorkJob;
}

const AppliedCVEdit = () => {
  const router = useRouter();

  const { data, loading } = useQuery<DataQuery>(FETCH_ALL_PROVINCE_CATEGORY);
  const { data: dataWorkJob, loading: loadingWorkJob } = useQuery<DataWorkJob>(
    FETCH_WORK_JOB_EDIT,
    {
      variables: {
        id: router.query.id,
      },
      fetchPolicy: "network-only",
      nextFetchPolicy: "cache-and-network",
    }
  );
  const workCategories = data?.workCategories;
  const provinces = data?.provinces;
  const workJob = dataWorkJob?.getWorkJobById;

  const [updateNewJob, { loading: loadingSubmit }] =
    useMutation(UPDATE_WORKJOB);

  return (
    <LayoutAdmin>
      <Head>
        <title>Kết nối lao động việt | Quản trị </title>
      </Head>
      {loading ||
      !workCategories ||
      !provinces ||
      loadingWorkJob ||
      !workJob ? (
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
                    id: workJob.id,
                    name: workJob.name,
                    benefit: workJob.benefit,
                    requirement: workJob.requirement,
                    requirement_exp: workJob.requirement_gender ?? null,
                    requirement_gender: workJob.requirement_gender ?? null,
                    requirement_age: workJob.requirement_age ?? null,
                    amount_hiring: workJob.amount_hiring,
                    description: workJob.description,
                    address_work: workJob.address_work,
                    salary: workJob.salary ?? null,
                    type: workJob.type ?? null,
                    expired_date_hiring: workJob.expired_date_hiring,
                    work_category_id: workJob.work_category.id,
                    company_id: workJob.company.id,
                    province_id: workJob.province.id,
                  }}
                  validationSchema={validationSchemaWorkJob}
                  onSubmit={async (values, actions) => {
                    const { data } = await updateNewJob({
                      variables: values,
                    });
                    if (data.updateNewJob.status === "ERROR") {
                      message.error(data.message);
                      return;
                    }
                    message.success("Cập nhật việc làm thành công!");

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
                        mode="edit"
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
