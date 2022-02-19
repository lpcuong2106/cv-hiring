import React, { useState } from "react";
import { Button, Col, Row, Select, Space } from "antd";
import { EditSettings } from "@styled-icons/fluentui-system-filled/EditSettings";

import { useFormikContext } from "formik";
import AdminInput from "../../../components/AdminInput";
import { ModeView } from ".";
import style from "./style.module.scss";
import { useAppSelector } from "../../../store/hook";
import { useQuery } from "@apollo/client";
import { FETCH_ALL_USER } from "../../../GraphQL/Query/User";
import { User } from "../../../data";

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
interface PropsQuery {
  users: User[];
}

const FormEditCompany = ({
  loadingSubmit,
  mode = "create",
  setMode,
}: Props) => {
  const formikProps = useFormikContext<FormValue>();
  const isView = mode === "view";
  const userLoggedIn = useAppSelector((state) => state.user.user);
  const { data, loading } = useQuery<PropsQuery>(FETCH_ALL_USER);
  const users = data?.users ?? [];

  const usersOptions = users?.map((user) => ({
    label: user.lastname + " " + user.firstname,
    value: user.id,
  }));
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
          placeholder="Nhập địa chỉ"
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
          placeholder="Nhập url website"
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
          placeholder="Nhập url Fanpage"
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
          placeholder="Nhập embed bản đồ"
          disabled={isView}
          mode="input"
          //   @ts-ignore
          value={formikProps.values.gg_map}
        />
      </Col>
      {userLoggedIn?.role.name === "admin" && (
        <Col md={8}>
          <AdminInput
            label="Chọn người quản trị doanh nghiệp"
            Icon={<EditSettings width={16} />}
            name="user_id"
            placeholder="Chọn người quản trị doanh nghiệp"
            disabled={isView}
            mode="select"
            options={[
              {
                label: "Chọn người quản trị",
                value: null,
              },

              ...usersOptions,
            ]}
            //   @ts-ignore
            value={formikProps.values.user_id}
          />
        </Col>
      )}
      <Col md={12}>
        {isView ? (
          <div className={style.image}>
            <div className={style.label}>
              <EditSettings width={16} />
              <h6 className="">Logo</h6>
            </div>
            <img src={formikProps.values.logo} />
          </div>
        ) : (
          <AdminInput
            label="Logo"
            Icon={<EditSettings width={16} />}
            name="logo"
            disabled={isView}
            placeholder="Nhập url logo"
            mode="input"
            //   @ts-ignore
            value={formikProps.values.logo}
          />
        )}
      </Col>
      <Col md={12}>
        {isView ? (
          <div className={style.image}>
            <div className={style.label}>
              <EditSettings width={16} />
              <h6 className="">Ảnh bìa</h6>
            </div>
            <img src={formikProps.values.banner} />
          </div>
        ) : (
          <AdminInput
            label="Ảnh bìa"
            disabled={isView}
            Icon={<EditSettings width={16} />}
            name="banner"
            placeholder="Nhập url ảnh bìa"
            mode="input"
            //   @ts-ignore
            value={formikProps.values.banner}
          />
        )}
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
