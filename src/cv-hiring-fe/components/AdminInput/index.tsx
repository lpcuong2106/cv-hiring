import { DatePicker, Input, Select } from "antd";
import { DefaultOptionType } from "antd/lib/select";
import { FieldConfig, FormikProps, useField } from "formik";
import React from "react";
import style from "./style.module.scss";

type Props = SelectProps | InputProps | TextAreaProps | DatepickerProps;

type SelectProps = {
  Icon: any;
  name: string;
  placeholder: string;
  label: string;
  mode: "select";
  options: DefaultOptionType[];
};
type InputProps = {
  Icon: any;
  name: string;
  placeholder: string;
  label: string;
  mode: "input";
};
type TextAreaProps = {
  mode: "textarea";
  Icon: any;
  name: string;
  placeholder: string;
  label: string;
};

type DatepickerProps = {
  mode: "datepicker";
  Icon: any;
  name: string;
  placeholder: string;
  label: string;
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

        {props.mode === "datepicker" && (
          // @ts-ignore
          <DatePicker
            size="large"
            name={field.name}
            placeholder={props.placeholder}
            className={style.inputControl}
            onChange={onChange}
          />
        )}
        {meta.touched && meta.error ? (
          <div className="error">{meta.error}</div>
        ) : null}
      </div>
    </div>
  );
}

export default AdminInput;
