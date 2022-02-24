import React from "react";
import Layout from "../../components/layouts";
import Head from "next/head";
import { Container } from "react-bootstrap";
import { Row, Col, Card, message } from "antd";
import { Formik, Form } from "formik";
import FormProfileEdit from "./FormProfileEdit";
import { useMutation, useQuery } from "@apollo/client";
import { FETCH_PROFILE, FETCH_USER_LOGIN } from "../../GraphQL/Query/FetchData";
import { User } from "../../data";
import { LoadingApp } from "../../components/LoadingApp";
import { UPDATE_PROFILE } from "../../GraphQL/Mutation/UpdateProfile";
import { useRouter } from "next/router";
import * as Yup from "yup";
import { useAppDispatch } from "../../store/hook";
import { setUserLoggedIn } from "../../store/features/userSlideder";
interface DataQuery {
  me: User;
}
interface UpdateProfile {
  updateProfile: {
    status: "OK" | "ERROR";
    message: string;
  };
}

const validationSchemaProfile = Yup.object().shape({
  email: Yup.string().email().required("Email là bắt buộc"),
  firstname: Yup.string()
    .min(1, "Tên người dùng ít nhất 1 kí tự")
    .required("Vui lòng nhập tên người dùng"),
  lastname: Yup.string()
    .min(1, "Họ người dùng ít nhất 1 kí tự")
    .required("Vui lòng nhập họ người dùng"),
  birthday: Yup.string()
    .required("Ngày sinh là bắt buộc")
    .typeError("Vui lòng chọn ngày sinh"),

  avatar: Yup.string().required("Avatar là bắt buộc"),
  gender: Yup.string()
    .required("Vui lòng chọn giới tính")
    .typeError("Vui lòng chọn giới tính"),
  address: Yup.string().typeError("Vui lòng nhập địa chỉ bạn đang sinh sống"),
  phone: Yup.string()
    .min(10, "Số điện thoại bắt buộc 10 kí tự")
    .max(10, "Số điện thoại bắt buộc 10 kí tự")
    .required("Vui lòng nhập thông tin số điện thoại")
    .typeError("Vui lòng nhập thông tin số điện thoại"),
});

function Profile() {
  const { data, loading } = useQuery<DataQuery>(FETCH_PROFILE, {
    fetchPolicy: "network-only",
    nextFetchPolicy: "cache-and-network",
  });
  const [updateProfile, { loading: loadingSubmit }] =
    useMutation<UpdateProfile>(UPDATE_PROFILE);
  const { refetch } = useQuery(FETCH_USER_LOGIN);

  const dispatch = useAppDispatch();
  const router = useRouter();
  const profile = data?.me;
  if (loading || !profile) {
    return <LoadingApp />;
  }

  return (
    <Layout>
      <div>
        <Head>
          <title>Kết nối lao động việt | TimViec</title>
        </Head>
        <div>
          <Container style={{ marginTop: 40 }}>
            <Row>
              <Col md={24}>
                <Card title="Thông tin cá nhân">
                  <div>
                    <Formik
                      initialValues={{
                        email: profile.email,
                        firstname: profile.firstname,
                        lastname: profile.lastname,
                        birthday: profile.birthday,
                        avatar: profile.avatar,
                        gender: profile.gender,
                        address: profile.address,
                        phone: profile.phone,
                      }}
                      validationSchema={validationSchemaProfile}
                      onSubmit={async (values) => {
                        const { data } = await updateProfile({
                          variables: values,
                        });

                        if (data?.updateProfile.status === "ERROR") {
                          message.error(data.updateProfile.message);
                        } else {
                          const { data: dataMe } = await refetch();

                          dispatch(setUserLoggedIn(dataMe.me));
                          message.success(data?.updateProfile.message);
                        }
                      }}
                    >
                      {({ handleSubmit }) => (
                        <Form onSubmit={handleSubmit}>
                          <FormProfileEdit loadingSubmit={loadingSubmit} />
                        </Form>
                      )}
                    </Formik>
                  </div>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </Layout>
  );
}

export default Profile;
