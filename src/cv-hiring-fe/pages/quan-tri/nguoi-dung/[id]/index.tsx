import React, { useState } from "react";
import { Row, Col, Card, message } from "antd";
import style from "../../thong-tin-cong-ty/style.module.scss";
import Head from "next/head";
import { useMutation, useQuery } from "@apollo/client";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import { ModeView, validationSchemaCompany } from "../../thong-tin-cong-ty";
import LayoutAdmin from "../../../../components/layouts/LayoutAdmin";
import { LoadingApp } from "../../../../components/LoadingApp";
import FormEditCompany from "../../thong-tin-cong-ty/FormEditCompany";
import { User } from "../../../../data";

import { useAppSelector } from "../../../../store/hook";
import { UPDATE_COMPANY } from "../../../../GraphQL/Mutation/UpdateCompany";
import BackButton from "../../../../components/BackButton";
import { FETCH_USER_DETAIL_MANAGER } from "../../../../GraphQL/Query/User";
import FormEditUser from "./FormEditUser";

interface DataQuery {
  user: User;
}

const ManageUserDetail = () => {
  const userLoggedIn = useAppSelector((state) => state.user.user);
  const router = useRouter();
  const { data, loading } = useQuery<DataQuery>(FETCH_USER_DETAIL_MANAGER, {
    variables: {
      id: router.query.id,
    },
    skip: !router.query.id,
    fetchPolicy: "network-only",
    nextFetchPolicy: "cache-and-network",
  });
  const [updateUserDetail, { loading: loadingSubmit }] =
    useMutation(UPDATE_COMPANY);
  const [mode, setMode] = useState<ModeView>("view");
  const user = data?.user;

  return (
    <LayoutAdmin>
      <Head>
        <title>Kết nối lao động việt | Quản trị </title>
      </Head>
      {loading || !user ? (
        <LoadingApp />
      ) : (
        <div className="site-statistic-demo-card">
          <Row gutter={16}>
            <Col span={24} className={style.statistic}>
              <BackButton />
              <Card title="Thông tin người dùng">
                <div>
                  <Formik
                    initialValues={{
                      id: user.id,
                      email: user.email,
                      password: "",
                      role_id: user.role.id,
                      company_id: user.company?.id,
                    }}
                    validationSchema={validationSchemaCompany}
                    onSubmit={async (values) => {
                      const { data } = await updateUserDetail({
                        variables: {
                          id: values.id,
                          password: values.password || null,
                          role_id: values.role_id,
                          company_id: values.company_id || null,
                        },
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
                        <FormEditUser
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

export default ManageUserDetail;
