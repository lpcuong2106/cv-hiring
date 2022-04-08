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
import FormEditCompany from "../../thong-tin-cong-ty/FormEditCompany";
import { useAppSelector } from "../../../../store/hook";
import { CREATE_COMPANY } from "../../../../GraphQL/Mutation/UpdateCompany";
import BackButton from "../../../../components/BackButton";

interface DataQuery {
  createCompany: {
    status: "OK" | "ERROR";
    message: string;
  };
}
const validationSchemaCompany = Yup.object().shape({
  name: Yup.string()
    .min(8, "Tên công ty ít nhất 8 kí tự")
    .required("Tên công ty là bắt buộc"),
  description: Yup.string()
    .min(8, "Mô tả công ty ít nhất 8 kí tự")
    .required("Mô tả công ty là bắt buộc"),
  amount_employee: Yup.string().nullable(),
  website: Yup.string(),
  fanpage: Yup.string(),
  address: Yup.string(),
  gg_map: Yup.string(),
  logo: Yup.mixed().required("Vui lòng upload logo"),
  banner: Yup.mixed().required("Vui lòng upload banner"),
  user_id: Yup.number()
    .required("Vui lòng chọn người quản trị")
    .typeError("Vui lòng chọn người quản trị"),
});

const ManageCompanyAdd = () => {
  const userLoggedIn = useAppSelector((state) => state.user.user);
  const router = useRouter();

  const [createCompany, { loading: loadingSubmit }] =
    useMutation<DataQuery>(CREATE_COMPANY);
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
            <Card title="Thông tin công ty">
              <div>
                <Formik
                  initialValues={{
                    name: "",
                    description: "",
                    amount_employee: null,
                    website: "",
                    fanpage: "",
                    address: "",
                    gg_map: "",
                    logo: "",
                    banner: "",
                    user_id: null,
                  }}
                  validationSchema={validationSchemaCompany}
                  onSubmit={async (values) => {
                    const { data } = await createCompany({
                      variables: values,
                    });

                    if (data?.createCompany.status === "ERROR") {
                      message.error(data.createCompany.message);
                      return;
                    }
                    message.success(data?.createCompany.message);
                    router.push("/quan-tri/cong-ty");
                    return;
                  }}
                >
                  {({ handleSubmit }) => (
                    <Form onSubmit={handleSubmit}>
                      <FormEditCompany
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

export default ManageCompanyAdd;
