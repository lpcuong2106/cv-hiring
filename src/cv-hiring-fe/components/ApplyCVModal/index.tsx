import { Breadcrumb, Button, message, Modal, Upload } from "antd";
import { useFormik } from "formik";
import { UploadOutlined } from "@ant-design/icons";

import React from "react";
import * as Yup from "yup";
import { FormItemInput } from "../FormItem";
import style from "./style.module.scss";

interface Props {
  isShowApply: boolean;
  setIsShowApply: (value: boolean) => void;
}

const validationSchema = Yup.object().shape({
  fileCV: Yup.mixed().required("Vui lòng chọn CV để nộp"),
  content: Yup.string()
    .min(8, "Vui lòng nhập ít nhất 8 kí tự")
    .required("Lý do muốn làm việc là bắt buộc"),
});

function ApplyCVModal({ isShowApply, setIsShowApply }: Props) {
  const form = useFormik({
    initialValues: {
      fileCV: "",
      content: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const { fileCV, content } = values;
      console.log(fileCV, content);
      //   const { data } = await login({ variables: { email, password } });

      //   if (data && data.login?.token) {
      //     localStorage.setItem("token", data.login?.token);
      //     auth.setIsLogged(true);
      //     message.success("Đăng nhập thành công!");
      //     Router.push("/");
      //     return;
      //   }

      setIsShowApply(false);
      message.error("Nộp CV thất bại!");
    },
  });

  const handleApplyCV = () => {
    form.submitForm();
  };
  function beforeUpload(file: any) {
    console.log(file.type);
    const isJpgOrPng =
      file.type === "application/pdf" ||
      file.type ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
    if (!isJpgOrPng) {
      message.error("Bạn chỉ được upload file định dạng pdf hoặc docx");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
    }
    return isJpgOrPng && isLt2M;
  }

  return (
    <Modal
      title="Ứng tuyển Giám Đốc Kinh Doanh Sản Phẩm Thương Mại"
      visible={isShowApply}
      onOk={handleApplyCV}
      // confirmLoading={confirmLoading}
      onCancel={() => setIsShowApply(false)}
      cancelText="Đóng lại"
      okText="Nộp CV"
    >
      <p>Tải lên CV từ máy tính</p>
      <span>File doc, docx, pdf. Tối đa 5MB.</span>
      <form onSubmit={form.handleSubmit}>
        <span className={style.titleLogin}>CV</span>
        <Upload
          beforeUpload={beforeUpload}
          name="fileCV"
          maxCount={1}
          customRequest={() => {}}
          accept=".pdf,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        >
          <Button icon={<UploadOutlined />}>Upload</Button>
        </Upload>
        {/* <input type="file" name="fileCV" onChange={form.handleChange} /> */}
        {form.errors.fileCV && form.touched.fileCV && (
          <span>{form.errors.fileCV}</span>
        )}
        <div className="wrap-input100 validate-input">
          <FormItemInput
            form={form}
            lable="Lý do muốn làm việc tại vị trí này"
            name="content"
            isError={(form.errors.content && form.touched.content) as boolean}
            type="text"
            error={form.errors.content}
            value={form.values.content}
          />
        </div>
      </form>
    </Modal>
  );
}

export default ApplyCVModal;
