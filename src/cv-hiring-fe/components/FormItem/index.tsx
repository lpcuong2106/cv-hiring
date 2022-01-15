import { Form, Input } from "antd";
import React from "react";
import style from "./style.module.scss";
import { LockOutlined } from "@ant-design/icons";

interface Props {
  form: any;
  lable: string;
  name: string;
  type: string;
  error?: string;
  isError: boolean;
  value: string;
  [key: string]: any;
}

function FormItemInput({
  form,
  lable,
  name,
  type,
  error,
  isError,
  value,
  ...props
}: Props) {
  return (
    <Form.Item name={name} label={lable} rules={[{ required: true }]}>
      <Input
        type={type}
        name={name}
        value={value}
        allowClear
        onChange={form.handleChange}
        {...props}
      />
      {isError ? <div className={style.errorMessage}>{error}</div> : null}
    </Form.Item>
  );
}

export { FormItemInput };
