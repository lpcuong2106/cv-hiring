import React from "react";
import { Button, Col, Row, Space } from "antd";
import { EditSettings } from "@styled-icons/fluentui-system-filled/EditSettings";

import { useFormikContext } from "formik";
import { User } from "../../data";
import { useAppSelector } from "../../store/hook";
import AdminInput from "../../components/AdminInput";

interface FormValue {
  email: string;
  firstname: string;
  lastname: string;
  birthday: string;
  avatar: string;
  gender: string;
  address: string;
  phone: string;
  password: string;
  re_password: string;
}
interface Props {
  loadingSubmit: boolean;
}
interface PropsQuery {
  user: User;
}

const FormEditProfileUser = ({ loadingSubmit }: Props) => {
  const formikProps = useFormikContext<FormValue>();

  const userLoggedIn = useAppSelector((state) => state.user.user);

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

      <Col md={12}>
        <AdminInput
          label="Họ"
          Icon={<EditSettings width={16} />}
          name="lastname"
          mode="input"
          placeholder="Vui lòng nhập họ"
          //   @ts-ignore
          value={formikProps.values.lastname}
        />
      </Col>
      <Col md={12}>
        <AdminInput
          label="Tên"
          Icon={<EditSettings width={16} />}
          name="firstname"
          mode="input"
          placeholder="Vui lòng nhập tên"
          //   @ts-ignore
          value={formikProps.values.firstname}
        />
      </Col>

      <Col md={12}>
        <AdminInput
          label="Avatar"
          Icon={<EditSettings width={16} />}
          name="avatar"
          mode="input"
          placeholder="Vui lòng nhập avatar"
          //   @ts-ignore
          value={formikProps.values.avatar}
        />
      </Col>
      <Col md={12}>
        <AdminInput
          label="Giới tính"
          Icon={<EditSettings width={16} />}
          name="gender"
          mode="select"
          placeholder="Vui lòng nhập giới tính"
          //   @ts-ignore
          value={formikProps.values.gender}
          options={[
            {
              label: "Chọn giới tính",
              value: null,
            },
            {
              label: "Nam",
              value: "male",
            },
            {
              label: "Nữ",
              value: "female",
            },
          ]}
        />
      </Col>
      <Col md={12}>
        <AdminInput
          label="Địa chỉ"
          Icon={<EditSettings width={16} />}
          name="address"
          mode="input"
          placeholder="Vui lòng nhập địa chỉ"
          //   @ts-ignore
          value={formikProps.values.address}
        />
      </Col>
      <Col md={12}>
        <AdminInput
          label="Số điện thoại"
          Icon={<EditSettings width={16} />}
          name="phone"
          mode="input"
          placeholder="Vui lòng nhập số điện thoại"
          //   @ts-ignore
          value={formikProps.values.phone}
        />
      </Col>
      <Col md={12}>
        <AdminInput
          label="Ngày sinh"
          Icon={<EditSettings width={16} />}
          name="date"
          mode="datepicker"
          placeholder="Vui lòng ngày sinh"
          //   @ts-ignore
          value={formikProps.values.firstname}
        />
      </Col>

      <Col md={24}>
        <Space>
          <>
            <Button htmlType="submit" loading={loadingSubmit}>
              Cập nhật
            </Button>
            <Button
              htmlType="button"
              onClick={() => {
                formikProps.resetForm();
              }}
            >
              Hủy
            </Button>
          </>
        </Space>
      </Col>
    </Row>
  );
};

export default FormEditProfileUser;
