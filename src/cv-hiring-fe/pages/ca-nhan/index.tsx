import React, { useState } from "react";
import Layout from "../../components/layouts";
import Head from "next/head";
import { Container } from "react-bootstrap";
import { Row, Col, Card, message, Avatar, Button } from "antd";
import { Formik, Form, FormikProps } from "formik";
import FormProfileEdit from "./FormProfileEdit";
import { useMutation, useQuery } from "@apollo/client";
import { FETCH_PROFILE, FETCH_USER_LOGIN } from "../../GraphQL/Query/FetchData";
import { User } from "../../data";
import { LoadingApp } from "../../components/LoadingApp";
import { UPDATE_PROFILE } from "../../GraphQL/Mutation/UpdateProfile";
import { useRouter } from "next/router";
import * as Yup from "yup";
import style from "./style.module.scss";
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
interface FormValues {
  email: string;
  firstname: string;
  lastname: string;
  birthday: string;
  avatar: string;
  gender: string;
  address: string;
  phone: string;
}
function Profile() {
  const { data, loading } = useQuery<DataQuery>(FETCH_PROFILE, {
    fetchPolicy: "network-only",
    nextFetchPolicy: "cache-and-network",
  });
  const [updateProfile, { loading: loadingSubmit }] =
    useMutation<UpdateProfile>(UPDATE_PROFILE);
  const { refetch } = useQuery(FETCH_USER_LOGIN);
  const [avatarFile, setAvatar] = useState();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const profile = data?.me;
  const hiddenFileInput = React.useRef(null);
  const form = React.useRef<FormikProps<FormValues>>(null);

  if (loading || !profile) {
    return <LoadingApp />;
  }

  const changeAvatar = () => {
    // @ts-ignore
    hiddenFileInput.current?.click();
  };
  const handleChange = (event: any) => {
    const fileUploaded = event.target.files[0];
    const url = URL.createObjectURL(fileUploaded);
    form.current?.setFieldValue("avatar", url);
    setAvatar(fileUploaded);
  };
  return (
    <Layout>
      <div>
        <Head>
          <title>Kết nối lao động việt | TimViec</title>
        </Head>
        <div>
          <Container style={{ marginTop: 40 }}>
            <Formik
              innerRef={form}
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
                const newValue = {
                  ...values,
                  avatar: avatarFile,
                };
                const { data } = await updateProfile({
                  variables: newValue,
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
              {({ handleSubmit, values }) => (
                <Row>
                  <Col md={24}>
                    <Card title="Thông tin cá nhân">
                      <div className={style.profileAvatar}>
                        <Avatar src={values.avatar} size={150} />
                        <input
                          type="file"
                          hidden
                          ref={hiddenFileInput}
                          onChange={handleChange}
                          style={{ display: "none" }}
                          accept="image/png, image/gif, image/jpeg"
                        />
                        <Button
                          size="small"
                          style={{ margin: "0 16px", verticalAlign: "middle" }}
                          onClick={changeAvatar}
                        >
                          Đổi ảnh đại diện
                        </Button>
                      </div>
                      <div>
                        <Form onSubmit={handleSubmit}>
                          <FormProfileEdit loadingSubmit={loadingSubmit} />
                        </Form>
                      </div>
                    </Card>
                  </Col>
                </Row>
              )}
            </Formik>
          </Container>
        </div>
      </div>
    </Layout>
  );
}

export default Profile;
