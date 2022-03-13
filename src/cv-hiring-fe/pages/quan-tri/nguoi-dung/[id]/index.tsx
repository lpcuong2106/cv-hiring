import React, { useState } from "react";
import { Row, Col, Card, message } from "antd";
import style from "../../thong-tin-cong-ty/style.module.scss";
import Head from "next/head";
import { useMutation, useQuery } from "@apollo/client";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import { ModeView } from "../../thong-tin-cong-ty";
import LayoutAdmin from "../../../../components/layouts/LayoutAdmin";
import { LoadingApp } from "../../../../components/LoadingApp";
import { User } from "../../../../data";

import { useAppSelector } from "../../../../store/hook";
import BackButton from "../../../../components/BackButton";
import { FETCH_USER_DETAIL_MANAGER } from "../../../../GraphQL/Query/User";
import FormEditUser from "./FormEditUser";
import { UPDATE_USER } from "../../../../GraphQL/Mutation/UpdateUser";
import * as Yup from "yup";
interface DataQuery {
  user: User;
}

const validationSchemaUser = Yup.object().shape({
  id: Yup.number().required(),
  password: Yup.string().min(8, "Mật khẩu ít nhất 8 kí tự"),
  role_id: Yup.number().required("Vui lòng chọn vai trò"),
  coin: Yup.number()
    .min(0, "Số coin tối thiểu là 0")
    .required("Vui lòng nhập coin"),
});

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
    useMutation(UPDATE_USER);
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
                      coin: user.coin,
                    }}
                    validationSchema={validationSchemaUser}
                    onSubmit={async (values) => {
                      const { data } = await updateUserDetail({
                        variables: {
                          id: values.id,
                          password: values.password || null,
                          role_id: values.role_id,
                          coin: values.coin,
                        },
                      });

                      if (data.updateUser.status === "ERROR") {
                        message.error(data.updateUser.message);
                        return;
                      }
                      message.success(data.updateUser.message);
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
