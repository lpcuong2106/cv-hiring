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
    .required("Mô tả công ty là bắt buộc"),
  amount_employee: Yup.string(),
  website: Yup.string(),
  fanpage: Yup.string(),
  address: Yup.string(),
  gg_map: Yup.string(),
  logo: Yup.string().url("Logo nên là giá trị đường dẫn"),
  banner: Yup.string().url("Banner nên là giá trị đường dẫn"),
  user_id: Yup.number().required(),
});

export type ModeView = "edit" | "create" | "view";
const ManageCompany = () => {
  const userLoggedIn = useAppSelector((state) => state.user.user);

  const { data, loading } = useQuery<DataQuery>(FETCH_COMPANY_DETAIL, {
    variables: {
      id: userLoggedIn?.company?.id,
    },
    skip: !userLoggedIn?.company?.id,
  });
  const [updateCompanyDetail, { loading: loadingSubmit }] =
    useMutation(UPDATE_COMPANY);
  const [mode, setMode] = useState<ModeView>("view");
  const companyDetail = data?.companyDetail;
  const router = useRouter();
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
                      banner: companyDetail.banner,
                    }}
                    validationSchema={validationSchemaCompany}
                    onSubmit={async (values) => {
                      const { data } = await updateCompanyDetail({
                        variables: values,
                      });

                      if (data.updateCompany.status === "ERROR") {
                        message.error(data.updateCompany.message);
                        return;
                      }
                      message.success(data.updateCompany.message);
                      setMode("view");

                      return;
                    }}
                  >
                    {({ handleSubmit }) => (
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
