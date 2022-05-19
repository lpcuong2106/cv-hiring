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
import FormEditCompany from "./FormEditCompany";
import { UPDATE_COMPANY } from "../../../GraphQL/Mutation/UpdateCompany";

interface DataQuery {
  companyDetail: Company;
}

export const validationSchemaCompany = Yup.object().shape({
  id: Yup.number().required(),
  name: Yup.string()
    .min(8, "Tên công ty ít nhất 8 kí tự")
    .required("Tên công ty là bắt buộc"),
  description: Yup.string()
    .min(8, "Mô tả công ty ít nhất 8 kí tự")
    .required("Mô tả công ty là bắt buộc")
    .typeError("Mô tả công ty là bắt buộc"),
  amount_employee: Yup.string().nullable(),
  website: Yup.string().nullable(),
  fanpage: Yup.string().nullable(),
  address: Yup.string(),
  gg_map: Yup.string(),
  logo: Yup.mixed().required("Vui lòng upload logo"),
  banner: Yup.mixed().required("Vui lòng upload banner"),
  user_id: Yup.number()
    .required("Vui lòng chọn người quản trị")
    .typeError("Vui lòng chọn người quản trị"),
});

export type ModeView = "edit" | "create" | "view";
const ManageCompany = () => {
  const userLoggedIn = useAppSelector((state) => state.user.user);

  const {
    data,
    loading,
    refetch: refetchCompanyInfo,
  } = useQuery<DataQuery>(FETCH_COMPANY_DETAIL, {
    variables: {
      id: userLoggedIn?.company?.id,
    },
    fetchPolicy: "network-only",
    nextFetchPolicy: "cache-and-network",
    skip: !userLoggedIn?.company?.id,
  });
  const [updateCompanyDetail, { loading: loadingSubmit }] =
    useMutation(UPDATE_COMPANY);
  const [mode, setMode] = useState<ModeView>("view");
  const companyDetail = data?.companyDetail;

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
                  <Formik
                    initialValues={{
                      id: companyDetail.id,
                      name: companyDetail.name,
                      description: companyDetail.description,
                      amount_employee: companyDetail.amount_employee,
                      website: companyDetail.website,
                      fanpage: companyDetail.fanpage,
                      address: companyDetail.address,
                      gg_map: companyDetail.gg_map,
                      logo: companyDetail.logo,
                      user_id: companyDetail.user?.id,
                      banner: companyDetail.banner,
                    }}
                    validationSchema={validationSchemaCompany}
                    onSubmit={async (values) => {
                      if (typeof values.logo === "string") {
                        // @ts-ignore
                        values.logo = null;
                      }
                      if (typeof values.banner === "string") {
                        // @ts-ignore
                        values.banner = null;
                      }
                      const { data } = await updateCompanyDetail({
                        variables: values,
                      });

                      if (data.updateCompany.status === "ERROR") {
                        message.error(data.updateCompany.message);
                        return;
                      }

                      message.success(data.updateCompany.message);
                      await refetchCompanyInfo();
                      setMode("view");
                    }}
                  >
                    {({ handleSubmit, errors }) => (
                      <Form onSubmit={handleSubmit}>
                        <FormEditCompany
                          loadingSubmit={loadingSubmit}
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
