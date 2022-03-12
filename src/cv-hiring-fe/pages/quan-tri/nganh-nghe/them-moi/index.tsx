import React, { useState } from "react";
import { Row, Col, Card, message } from "antd";
import style from "../../thong-tin-cong-ty/style.module.scss";
import Head from "next/head";
import { useMutation } from "@apollo/client";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import { ModeView } from "../../thong-tin-cong-ty";
import LayoutAdmin from "../../../../components/layouts/LayoutAdmin";
import { WorkCategory } from "../../../../data";

import BackButton from "../../../../components/BackButton";
import * as Yup from "yup";
import FormEditCategory from "../[id]/FormEditCategory";
import { CREATE_CATEGORY } from "../../../../GraphQL/Mutation/CreateCategory";

export const validationSchemaCategory = Yup.object().shape({
  name: Yup.string()
    .min(4, "Tên ngành nghề ít nhất 4 kí tự")
    .required("Tên ngành nghề là bắt buộc"),
});

const ManageAddCategoryDetail = () => {
  const router = useRouter();

  const [createWorkCategory, { loading: loadingSubmit }] =
    useMutation(CREATE_CATEGORY);
  const [mode, setMode] = useState<ModeView>("view");

  return (
    <LayoutAdmin>
      <Head>
        <title>Kết nối lao động việt | Quản trị </title>
      </Head>

      <div className="site-statistic-demo-card">
        <Row gutter={16}>
          <Col span={24} className={style.statistic}>
            <BackButton />
            <Card title="Thông tin ngành nghề">
              <div>
                <Formik
                  initialValues={{
                    name: "",
                  }}
                  validationSchema={validationSchemaCategory}
                  onSubmit={async (values) => {
                    const { data } = await createWorkCategory({
                      variables: values,
                    });

                    if (data?.createWorkCategory.status === "ERROR") {
                      message.error(data.createWorkCategory.message);
                      return;
                    }
                    message.success(data?.createWorkCategory.message);
                    router.push("/quan-tri/nganh-nghe");
                    return;
                  }}
                >
                  {({ handleSubmit }) => (
                    <Form onSubmit={handleSubmit}>
                      <FormEditCategory
                        loadingSubmit={loadingSubmit}
                        mode="create"
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

export default ManageAddCategoryDetail;
