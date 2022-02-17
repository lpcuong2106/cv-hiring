import React, { useState } from "react";
import { Button, Col, Row, Select, Space } from "antd";
import { EditSettings } from "@styled-icons/fluentui-system-filled/EditSettings";

import { useFormikContext } from "formik";
import AdminInput from "../../../components/AdminInput";
import { ModeView } from ".";

interface FormValue {
  name: string;
  description: string;
  amount_employee: string;
  website: string;
  fanpage: string;
  address: string;
  gg_map: string;
  logo: string;
  banner: string;
}
interface Props {
  loadingSubmit: boolean;
  mode: ModeView;
  setMode: React.Dispatch<React.SetStateAction<ModeView>>;
}

const FormEditCompany = ({
  loadingSubmit,
  mode = "create",
  setMode,
}: Props) => {
  const formikProps = useFormikContext<FormValue>();
  const isView = mode === "view";
  // const provinceOptions = provinces.map((province) => ({
  //   label: province.name,
  //   value: province.id,
  // }));
  // const categoryOptions = workCategories.map((cateogry) => ({
  //   label: cateogry.name,
  //   value: cateogry.id,
  // }));
  const handleModeView = (mode: ModeView) => {
    setMode(mode);
  };

  return (
    <Row>
      <Col md={24}>
        <AdminInput
          label="Tên công ty"
          Icon={<EditSettings width={16} />}
          name="name"
          disabled={isView}
          mode="input"
          placeholder="Tên công ty"
          //   @ts-ignore
          value={formikProps.values.name}
        />
      </Col>

      <Col md={24}>
        <AdminInput
          label="Mô tả công ty"
          Icon={<EditSettings width={16} />}
          name="description"
          mode="textarea"
          disabled={isView}
          placeholder="Mô tả công ty"
          //   @ts-ignore
          value={formikProps.values.description}
        />
      </Col>
      <Col md={8}>
        <AdminInput
          label="Quy mô công ty"
          Icon={<EditSettings width={16} />}
          name="amount_employee"
          mode="select"
          disabled={isView}
          placeholder="Quy mô công ty"
          //   @ts-ignore
          value={formikProps.values.amount_employee}
          options={[
            {
              label: "Chọn quy mô",
              value: null,
            },
            {
              label: "10 - 20 nhân viên",
              value: "full-time",
            },
            {
              label: "20 - 100 nhân viên",
              value: "part-time",
            },
          ]}
        />
      </Col>
      <Col md={8}>
        <AdminInput
          label="Địa chỉ"
          Icon={<EditSettings width={16} />}
          name="address"
          mode="input"
          disabled={isView}
          placeholder="Tiêu đề tuyển dụng"
          //   @ts-ignore
          value={formikProps.values.address}
        />
      </Col>
      <Col md={8}>
        <AdminInput
          label="Website"
          Icon={<EditSettings width={16} />}
          name="website"
          mode="input"
          disabled={isView}
          //   @ts-ignore
          value={formikProps.values.website}
        />
      </Col>
      <Col md={8}>
        <AdminInput
          label="Fanpage"
          Icon={<EditSettings width={16} />}
          name="fanpage"
          mode="input"
          disabled={isView}
          //   @ts-ignore
          value={formikProps.values.fanpage}
        />
      </Col>
      <Col md={8}>
        <AdminInput
          label="GoogleMap"
          Icon={<EditSettings width={16} />}
          name="gg_map"
          disabled={isView}
          mode="input"
          //   @ts-ignore
          value={formikProps.values.gg_map}
        />
      </Col>
      <Col md={8}>
        <AdminInput
          label="Logo"
          Icon={<EditSettings width={16} />}
          name="logo"
          disabled={isView}
          placeholder="Nhập địa chỉ nơi làm việc"
          mode="input"
          //   @ts-ignore
          value={formikProps.values.logo}
        />
      </Col>
      <Col md={24}>
        <AdminInput
          label="Ảnh bìa"
          disabled={isView}
          Icon={<EditSettings width={16} />}
          name="banner"
          placeholder="Ảnh bìa"
          mode="input"
          //   @ts-ignore
          value={formikProps.values.banner}
        />
      </Col>
      <Col md={24}>
        <Space>
          {mode === "view" && (
            <Button htmlType="button" onClick={() => handleModeView("edit")}>
              Chỉnh sửa
            </Button>
          )}
          {(mode === "edit" || mode === "create") && (
            <>
              <Button htmlType="submit" loading={loadingSubmit}>
                {mode === "edit" ? "Cập nhật" : "Lưu"}
              </Button>
              <Button
                htmlType="button"
                onClick={() => {
                  handleModeView("view");
                  formikProps.resetForm();
                }}
              >
                Hủy
              </Button>
            </>
          )}
        </Space>
      </Col>
    </Row>
  );
};

export default FormEditCompany;
