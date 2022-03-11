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
import { Company, Setting } from "../../../data";
import { useAppSelector } from "../../../store/hook";
import { UPDATE_COMPANY } from "../../../GraphQL/Mutation/UpdateCompany";
import { ModeView } from "../thong-tin-cong-ty";
import FormEditSetting from "./FormEditSetting";
import { FETCH_SETTING } from "../../../GraphQL/Query/Analyst";
import { UPDATE_SETTING } from "../../../GraphQL/Mutation/UpdateSetting";

interface DataQuery {
  settingWebsite: Setting;
}

export const validationSchemaCompany = Yup.object().shape({
  id: Yup.number().required(),
  title_web: Yup.string()
    .min(1, "Tiêu đề web ít nhất 1 kí tự")
    .required("iêu đề web là bắt buộc"),
  description: Yup.string()
    .min(8, "Mô tả website ít nhất 8 kí tự")
    .required("Mô tả website là bắt buộc")
    .typeError("Mô tả website là bắt buộc"),
  logo_url: Yup.string().required("Logo website là bắt buộc"),
  fb_url: Yup.string(),
  youtube_url: Yup.string(),
  phone_contact: Yup.string(),
});

const Setting = () => {
  const {
    data,
    loading,
    refetch: refetchCompanyInfo,
  } = useQuery<DataQuery>(FETCH_SETTING, {
    fetchPolicy: "network-only",
    nextFetchPolicy: "cache-and-network",
  });
  const [updateSetting, { loading: loadingSubmit }] =
    useMutation(UPDATE_SETTING);
  const [mode, setMode] = useState<ModeView>("view");
  const settingWebsite = data?.settingWebsite;

  return (
    <LayoutAdmin>
      <Head>
        <title>Kết nối lao động việt | Quản trị </title>
      </Head>
      {loading || !settingWebsite ? (
        <LoadingApp />
      ) : (
        <div className="site-statistic-demo-card">
          <Row gutter={16}>
            <Col span={24} className={style.statistic}>
              <Card title="Cài đặt website">
                <div>
                  <Formik
                    initialValues={{
                      id: settingWebsite.id,
                      title_web: settingWebsite.title_web,
                      description: settingWebsite.description,
                      logo_url: settingWebsite.logo_url,
                      fb_url: settingWebsite.fb_url,
                      youtube_url: settingWebsite.youtube_url,
                      phone_contact: settingWebsite.phone_contact,
                    }}
                    validationSchema={validationSchemaCompany}
                    onSubmit={async (values) => {
                      const { data } = await updateSetting({
                        variables: values,
                      });

                      if (data.updateSetting.status === "ERROR") {
                        message.error(data.updateSetting.message);
                        return;
                      }

                      message.success(data.updateSetting.message);
                      await refetchCompanyInfo();
                      setMode("view");
                    }}
                  >
                    {({ handleSubmit, errors }) => (
                      <Form onSubmit={handleSubmit}>
                        <FormEditSetting
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

export default Setting;
