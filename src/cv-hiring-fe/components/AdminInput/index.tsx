import { Button, DatePicker, Input, InputNumber, Select, Upload } from "antd";
import { DefaultOptionType } from "antd/lib/select";
import { FieldConfig, FormikProps, useField } from "formik";
import moment from "moment";
import React from "react";
import style from "./style.module.scss";
import { UploadOutlined } from "@ant-design/icons";
import { UploadChangeParam } from "antd/lib/upload";
import { UploadFile } from "antd/lib/upload/interface";

type Props =
  | SelectProps
  | InputProps
  | TextAreaProps
  | DatepickerProps
  | NumberProps
  | FileProps;

type SelectProps = {
  Icon: any;
  name: string;
  placeholder: string;
  label: string;
  mode: "select";
  disabled?: boolean;
  options: DefaultOptionType[];
};
type InputProps = {
  Icon: any;
  name: string;
  placeholder: string;
  label: string;
  mode: "input";
  disabled?: boolean;
};
type NumberProps = {
  Icon: any;
  name: string;
  placeholder: string;
  label: string;
  mode: "number";
  disabled?: boolean;
};
type TextAreaProps = {
  mode: "textarea";
  Icon: any;
  name: string;
  placeholder: string;
  label: string;
  disabled?: boolean;
};
type FileProps = {
  mode: "file";
  Icon: any;
  name: string;
  placeholder: string;
  label: string;
  disabled?: boolean;
  handleChangeFile: (value: UploadChangeParam<UploadFile<any>>) => void;
  onRemove: () => void;
};

type DatepickerProps = {
  mode: "datepicker";
  Icon: any;
  name: string;
  placeholder: string;
  label: string;
  disabled?: boolean;
};
function AdminInput(props: Props) {
  // @ts-ignore
  const [field, meta, helpers] = useField(props);
  const handleChangeSelect = (value: string) => {
    helpers.setValue(value);
  };
  function onChange(_: any, dateString: any) {
    helpers.setValue(dateString);
  }
  function onChangeInput(value: number) {
    helpers.setValue(value);
  }
  return (
    <div className={style.formControl}>
      <div className={style.label}>
        {props.Icon}
        <h6 className="">{props.label}</h6>
      </div>
      <div>
        {props.mode === "input" && (
          <Input
            size="large"
            bordered={false}
            className={style.inputControl}
            {...field}
            {...props}
          />
        )}
        {props.mode === "number" && (
          <InputNumber
            min={1}
            defaultValue={1}
            size="large"
            bordered={false}
            className={style.inputControl}
            {...field}
            {...props}
            onChange={onChangeInput}
          />
        )}
        {props.mode === "select" && (
          // @ts-ignore
          <Select
            {...field}
            {...props}
            bordered={false}
            options={props.options}
            onChange={handleChangeSelect}
            className={style.inputControl}
          />
        )}
        {props.mode === "textarea" && (
          <Input.TextArea
            size="large"
            {...field}
            {...props}
            showCount
            maxLength={100}
            className={style.inputControl}
          />
        )}
        {props.mode === "file" && (
          <Upload
            onChange={props.handleChangeFile}
            listType="picture"
            maxCount={1}
            accept="image/png, image/gif, image/jpeg"
            onRemove={props.onRemove}
          >
            <Button icon={<UploadOutlined />}>Tải lên</Button>
          </Upload>
        )}
        {props.mode === "datepicker" && (
          <DatePicker
            size="large"
            name={field.name}
            defaultValue={
              field.value ? moment(field.value) : moment().add("day", 1)
            }
            placeholder={props.placeholder}
            className={style.inputControl}
            onChange={onChange}
            disabledDate={(current) => {
              let customDate = moment().add(1, "day").format("YYYY-MM-DD");
              return current && current < moment(customDate, "YYYY-MM-DD");
            }}
          />
        )}
        {meta.touched && meta.error ? (
          <div className={style.error}>{meta.error}</div>
        ) : null}
      </div>
    </div>
  );
}

export default AdminInput;
