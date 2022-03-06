import React, { useState } from "react";
import { Row, Col, Card, message } from "antd";
import style from "../../thong-tin-cong-ty/style.module.scss";
import styles from "./style.module.scss";
import Head from "next/head";
import { useMutation, useQuery } from "@apollo/client";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/router";
import { ModeView, validationSchemaCompany } from "../../thong-tin-cong-ty";
import LayoutAdmin from "../../../../components/layouts/LayoutAdmin";
import { LoadingApp } from "../../../../components/LoadingApp";
import FormEditCompany from "../../thong-tin-cong-ty/FormEditCompany";
import { Company } from "../../../../data";
import { useAppSelector } from "../../../../store/hook";
import { FETCH_COMPANY_DETAIL } from "../../../../GraphQL/Query/Comapany";
import { UPDATE_COMPANY } from "../../../../GraphQL/Mutation/UpdateCompany";
import BackButton from "../../../../components/BackButton";

interface DataQuery {
  companyDetail: Company;
}

const ManageCompanyDetail = () => {
  const userLoggedIn = useAppSelector((state) => state.user.user);
  const router = useRouter();
  const {
    data,
    loading,
    refetch: refetchCompanyInfo,
  } = useQuery<DataQuery>(FETCH_COMPANY_DETAIL, {
    variables: {
      id: router.query.id,
    },
    skip: !router.query.id,
    fetchPolicy: "network-only",
    nextFetchPolicy: "cache-and-network",
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
              <BackButton />
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
                      user_id: companyDetail.user?.id,
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

export default ManageCompanyDetail;
