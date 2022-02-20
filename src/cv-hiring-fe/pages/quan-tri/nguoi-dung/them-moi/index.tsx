import React, { useState } from "react";
import { Row, Col, Card, message } from "antd";
import style from "../../thong-tin-cong-ty/style.module.scss";
import Head from "next/head";
import { useMutation } from "@apollo/client";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/router";
import { ModeView } from "../../thong-tin-cong-ty";
import LayoutAdmin from "../../../../components/layouts/LayoutAdmin";
import { useAppSelector } from "../../../../store/hook";
import BackButton from "../../../../components/BackButton";
import FormEditUser from "../[id]/FormEditUser";
import { CREATE_USER } from "../../../../GraphQL/Mutation/CreateUser";
import FormAddUser from "./FormAddUser";

interface DataQuery {
  createUser: {
    status: "OK" | "ERROR";
    message: string;
  };
}
const validationSchemaUser = Yup.object().shape({
  email: Yup.string()
    .email("Vui lòng nhập đúng định dạng email")
    .required("Vui lòng nhập email"),
  lastname: Yup.string().required("Vui lòng nhập họ"),
  firstname: Yup.string().required("Vui lòng nhập tên"),
  password: Yup.string()
    .min(8, "Mật khẩu ít nhất 8 kí tự")
    .required("Vui lòng nhập mật khẩu"),
  re_password: Yup.string()
    .oneOf(
      [Yup.ref("password"), null],
      "Xác nhận mật khẩu và mật khẩu không trùng khớp"
    )
    .required("Vui lòng nhập xác nhận mật khẩu"),
  role_id: Yup.number()
    .required("Vui lòng chọn vai trò")
    .typeError("Vui lòng chọn vai trò"),
});

const ManageUserAdd = () => {
  const userLoggedIn = useAppSelector((state) => state.user.user);
  const router = useRouter();

  const [createUser, { loading: loadingSubmit }] =
    useMutation<DataQuery>(CREATE_USER);
  const [mode, setMode] = useState<ModeView>("edit");

  return (
    <LayoutAdmin>
      <Head>
        <title>Kết nối lao động việt | Quản trị </title>
      </Head>

      <div className="site-statistic-demo-card">
        <Row gutter={16}>
          <Col span={24} className={style.statistic}>
            <BackButton />
            <Card title="Thông tin người dùng">
              <div>
                <Formik
                  initialValues={{
                    email: "",
                    firstname: "",
                    lastname: "",
                    password: "",
                    re_password: "",
                    role_id: null,
                    company_id: null,
                  }}
                  validationSchema={validationSchemaUser}
                  onSubmit={async (values) => {
                    const { data } = await createUser({
                      variables: values,
                    });

                    if (data?.createUser.status === "ERROR") {
                      message.error(data.createUser.message);
                    } else {
                      message.success(data?.createUser.message);
                      router.push("/quan-tri/nguoi-dung");
                    }
                  }}
                >
                  {({ handleSubmit }) => (
                    <Form onSubmit={handleSubmit}>
                      <FormAddUser
                        loadingSubmit={loadingSubmit}
                        mode={"create"}
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
    </LayoutAdmin>
  );
};

export default ManageUserAdd;
