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
import { WorkCategory } from "../../../../data";
import { useAppSelector } from "../../../../store/hook";
import { FETCH_CATEGORY_DETAIL } from "../../../../GraphQL/Query/WorkCategory";

import BackButton from "../../../../components/BackButton";
import NotFound from "../../../../components/NotFound";
import FormEditCategory from "./FormEditCategory";
import { UPDATE_CATEGORY } from "../../../../GraphQL/Mutation/UpdateCategory";
import * as Yup from "yup";
interface DataQuery {
  categoryDetail: WorkCategory;
}
export const validationSchemaCategory = Yup.object().shape({
  id: Yup.number().required(),
  name: Yup.string()
    .min(4, "Tên ngành nghề ít nhất 4 kí tự")
    .required("Tên ngành nghề là bắt buộc"),
});

const ManageCategoryDetail = () => {
  const userLoggedIn = useAppSelector((state) => state.user.user);
  const router = useRouter();
  const {
    data,
    loading,
    refetch: refetchCompanyInfo,
  } = useQuery<DataQuery>(FETCH_CATEGORY_DETAIL, {
    variables: {
      id: router.query.id,
    },
    skip: !router.query.id,
    fetchPolicy: "network-only",
    nextFetchPolicy: "cache-and-network",
  });
  const [updateCategoryDetail, { loading: loadingSubmit }] =
    useMutation(UPDATE_CATEGORY);
  const [mode, setMode] = useState<ModeView>("view");
  const categoryDetail = data?.categoryDetail;
  if (loading) {
    return <LoadingApp />;
  }
  if (!categoryDetail) {
    return <NotFound />;
  }

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
                    id: categoryDetail.id,
                    name: categoryDetail.name,
                  }}
                  validationSchema={validationSchemaCategory}
                  onSubmit={async (values) => {
                    console.log(values);
                    const { data } = await updateCategoryDetail({
                      variables: values,
                    });

                    if (data.updateWorkCategory.status === "ERROR") {
                      message.error(data.updateWorkCategory.message);
                      return;
                    }
                    message.success(data.updateWorkCategory.message);
                    await refetchCompanyInfo();
                    setMode("view");
                  }}
                >
                  {({ handleSubmit }) => (
                    <Form onSubmit={handleSubmit}>
                      <FormEditCategory
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
    </LayoutAdmin>
  );
};

export default ManageCategoryDetail;
