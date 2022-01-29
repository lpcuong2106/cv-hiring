import { Button, message, Modal, Upload } from "antd";
import { useFormik } from "formik";
import { UploadOutlined } from "@ant-design/icons";

import React, { useContext, useState } from "react";
import * as Yup from "yup";
import style from "./style.module.scss";
import { UploadChangeParam } from "antd/lib/upload";
import { UploadFile } from "antd/lib/upload/interface";
import TextArea from "antd/lib/input/TextArea";
import { useMutation } from "@apollo/client";
import { APPLY_CV } from "../../GraphQL/Mutation/ApplyCV";
import { AuthContext } from "../AuthProvider";

interface Props {
  isShowApply: boolean;
  setIsShowApply: (value: boolean) => void;
  companyLogo: string;
  jobName: string;
  companyName: string;
  jobId: number;
  refetchApply: (variables: any) => Promise<any>;
}
interface FormApply {
  fileCV: null | UploadFile<any>;
  content: string;
}

const validationSchema = Yup.object().shape({
  fileCV: Yup.mixed().required("Vui lòng chọn CV để nộp"),
  content: Yup.string()
    .min(8, "Vui lòng nhập ít nhất 8 kí tự")
    .required("Lý do muốn làm việc là bắt buộc"),
});

function ApplyCVModal({
  isShowApply,
  setIsShowApply,
  companyLogo,
  jobName,
  companyName,
  jobId,
  refetchApply,
}: Props) {
  const [fileList, setFileList] = useState<UploadFile<any>[]>([]);
  const [applyCV, { loading, error }] = useMutation(APPLY_CV);
  const context = useContext(AuthContext);

  const form = useFormik<FormApply>({
    initialValues: {
      fileCV: null,
      content: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const { fileCV, content } = values;

      const buffer = await fileCV?.originFileObj;

      const { data, errors } = await applyCV({
        variables: {
          fileCV: buffer,
          content,
          jobId: jobId,
        },
        context: {
          hasUpload: true,
        },
      });
      if (data.applyCV?.id) {
        setIsShowApply(false);
        form.resetForm();
        setFileList([]);
        refetchApply({
          user_id: context?.user?.id,
          work_job_id: jobId,
        });
        message.success("Nộp CV thành công!");
      }
      if (errors) {
        message.error("Nộp CV thất bại!" + errors);
      }
    },
  });

  const handleApplyCV = () => {
    form.submitForm();
  };

  function beforeUpload(file: any) {
    const allowFileType = [
      "application/msword",
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    const isJpgOrPng = allowFileType.includes(file.type);
    if (!isJpgOrPng) {
      message.error("Bạn chỉ được upload file định dạng pdf hoặc docx");
    }

    return isJpgOrPng;
  }

  const uploadFile = (info: UploadChangeParam<UploadFile<any>>) => {
    setFileList(info.fileList);
    if (info.fileList.length > 0) {
      form.setFieldValue("fileCV", info.file);
    } else {
      form.setFieldValue("fileCV", null);
    }
  };
  // const handleUpload = async (e: any) => {
  //   const file = e.target.files[0];
  //   console.log(file);

  //   applyCV({
  //     variables: {
  //       fileCV: file,
  //       content: "12312321312312",
  //       jobId: jobId,
  //     },
  //     context: {
  //       hasUpload: true,
  //     },
  //   });
  // };
  return (
    <Modal
      title="Nộp hồ sơ ứng tuyển"
      visible={isShowApply}
      onOk={handleApplyCV}
      confirmLoading={loading}
      onCancel={() => {
        setIsShowApply(false);
        setFileList([]);
        form.resetForm();
      }}
      cancelText="Đóng lại"
      okText="Nộp CV"
    >
      <div className={style.companyInfo}>
        <img src={companyLogo} alt="" className="img-fluid" />

        <div className={style.info}>
          <b>{jobName}</b>
          <p className={style.companyName}>{companyName}</p>
        </div>
      </div>
      <form onSubmit={form.handleSubmit} className={style.formSubmit}>
        <div className={style.formController}>
          <span className={style.label}>
            File CV: <span>*</span>
          </span>
          <Upload
            beforeUpload={beforeUpload}
            name="fileCV"
            fileList={fileList}
            maxCount={1}
            onChange={uploadFile}
            accept=".pdf,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          >
            <Button icon={<UploadOutlined />}>Upload</Button>
          </Upload>
          {/* <input type="file" name="fileCV" onChange={handleUpload} /> */}
          {form.errors.fileCV && form.touched.fileCV && (
            <p className={style.messageError}>{form.errors.fileCV}</p>
          )}
        </div>

        <div className={style.formController}>
          <span className={style.label}>
            Lý do muốn làm việc tại vị trí này: <span>*</span>
          </span>
          <TextArea
            style={{ marginTop: "10px" }}
            name="content"
            value={form.values.content}
            allowClear
            onChange={form.handleChange}
          />

          {form.errors.content && form.touched.content && (
            <p className={style.messageError}>{form.errors.content}</p>
          )}
        </div>
      </form>
    </Modal>
  );
}

export default ApplyCVModal;
