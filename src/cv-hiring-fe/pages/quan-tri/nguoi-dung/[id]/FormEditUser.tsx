import React, { useState } from "react";
import { Button, Col, Row, Select, Space } from "antd";
import { EditSettings } from "@styled-icons/fluentui-system-filled/EditSettings";

import { useFormikContext } from "formik";
import style from "./style.module.scss";
import { ModeView } from "../../thong-tin-cong-ty";
import { User } from "../../../../data";
import { useQuery } from "@apollo/client";
import { useAppSelector } from "../../../../store/hook";
import { FETCH_ALL_USER } from "../../../../GraphQL/Query/User";
import AdminInput from "../../../../components/AdminInput";

interface FormValue {
  email: string;
  password: string;
  role_id: string;
  company_id: string;
}
interface Props {
  loadingSubmit: boolean;
  mode: ModeView;
  setMode: React.Dispatch<React.SetStateAction<ModeView>>;
}
interface PropsQuery {
  users: User[];
}

const FormEditUser = ({ loadingSubmit, mode = "create", setMode }: Props) => {
  const formikProps = useFormikContext<FormValue>();
  const isView = mode === "view";
  const userLoggedIn = useAppSelector((state) => state.user.user);

  const handleModeView = (mode: ModeView) => {
    setMode(mode);
  };

  return (
    <Row>
      <Col md={24}>
        <AdminInput
          label="Email"
          Icon={<EditSettings width={16} />}
          name="email"
          disabled
          mode="input"
          placeholder="Email"
          //   @ts-ignore
          value={formikProps.values.email}
        />
      </Col>

      <Col md={24}>
        <AdminInput
          label="Vai trò"
          Icon={<EditSettings width={16} />}
          name="role_id"
          mode="select"
          disabled={isView}
          placeholder="Vai trò"
          // @ts-ignore
          // onChange={haneldeChangeRole}
          value={formikProps.values.role_id}
          options={[
            {
              label: "Chọn vai trò",
              value: null,
            },
            {
              label: "Admin",
              value: "1",
            },
            {
              label: "Doanh nghiệp",
              value: "3",
            },
            {
              label: "Người lao động",
              value: "2",
            },
          ]}
        />
      </Col>
      {formikProps.values.role_id === "3" && (
        <Col md={24}>
          <AdminInput
            label="Công ty quản lý"
            Icon={<EditSettings width={16} />}
            name="company_id"
            mode="select"
            disabled={isView}
            placeholder="Công ty quản lý"
            //   @ts-ignore
            value={formikProps.values.company_id}
            options={[
              {
                label: "Chọn công ty quản lý",
                value: null,
              },
              {
                label: "Admin",
                value: "1",
              },
              {
                label: "Doanh nghiệp",
                value: "3",
              },
              {
                label: "Người lao động",
                value: "2",
              },
            ]}
          />
        </Col>
      )}
      <Col md={8}>
        <AdminInput
          label="Mật khẩu"
          // @ts-ignore
          type="password"
          Icon={<EditSettings width={16} />}
          name="password"
          mode="input"
          disabled={isView}
          placeholder="Nhập mật khẩu"
          //   @ts-ignore
          value={formikProps.values.password}
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

export default FormEditUser;
