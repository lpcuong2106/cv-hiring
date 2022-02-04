import React from "react";
import { Button, Col, Row, Select } from "antd";
import { EditSettings } from "@styled-icons/fluentui-system-filled/EditSettings";
import AdminInput from "../../../../components/AdminInput";
import { useFormikContext } from "formik";

interface FormValue {
  name: string;
  work_category_id: number;
  company_id: number;
  benefit: string;
  requirement: string;
  requirement_exp: string;
  requirement_gender: string;
  requirement_age: string;
  amount_hiring: number;
  address_work: string;
  salary: string;
  type: string;
  is_open: number;
  expired_date: Date;
  province_id: number;
  description: string;
}

const FormEditWorkJob = () => {
  const formikProps = useFormikContext<FormValue>();

  return (
    <Row>
      <Col md={24}>
        <AdminInput
          label="Tiêu đề tin tuyển dụng"
          Icon={<EditSettings width={16} />}
          name="name"
          mode="input"
          placeholder="Tiêu đề tuyển dụng"
          //   @ts-ignore
          value={formikProps.values.name}
        />
      </Col>
      <Col md={24}>
        {/* @ts-ignore */}
        <AdminInput
          name="work_category_id"
          label="Ngành nghề & Lĩnh vực"
          Icon={<EditSettings width={16} />}
          mode="select"
          // @ts-ignore
          value={formikProps.values.work_category_id}
          options={[
            {
              label: "Tùy chọn",
              value: 1,
            },
          ]}
        />
      </Col>
      <Col md={8}>
        <AdminInput
          label="Số lượng tuyển"
          Icon={<EditSettings width={16} />}
          name="amount_hiring"
          mode="input"
          placeholder="Tiêu đề tuyển dụng"
          //   @ts-ignore
          value={formikProps.values.amount_hiring}
        />
      </Col>
      <Col md={8}>
        <AdminInput
          label="Loại công việc"
          Icon={<EditSettings width={16} />}
          name="type"
          mode="select"
          placeholder="Tiêu đề tuyển dụng"
          //   @ts-ignore
          value={formikProps.values.type}
          options={[
            {
              label: "Toàn thời gian",
              value: "full-time",
            },
          ]}
        />
      </Col>
      <Col md={8}>
        <AdminInput
          label="Kinh nghiệm"
          Icon={<EditSettings width={16} />}
          name="requirement_exp"
          mode="select"
          placeholder="Tiêu đề tuyển dụng"
          //   @ts-ignore
          value={formikProps.values.requirement_exp}
        />
      </Col>
      <Col md={8}>
        <AdminInput
          label="Giới tính"
          Icon={<EditSettings width={16} />}
          name="requirement_gender"
          mode="select"
          options={[
            {
              label: "Chọn giới tính",
              value: null,
            },
            {
              label: "Nam",
              value: 1,
            },
            {
              label: "Nữ",
              value: 0,
            },
          ]}
          //   @ts-ignore
          value={formikProps.values.requirement_gender}
        />
      </Col>
      <Col md={8}>
        <AdminInput
          label="Kiểu lương"
          Icon={<EditSettings width={16} />}
          name="salary"
          mode="select"
          options={[
            {
              label: "Chọn kiểu lương",
              value: null,
            },
            {
              label: "Trong khoảng",
              value: 1,
            },
            {
              label: "Từ",
              value: 2,
            },
            {
              label: "Đến",
              value: 3,
            },
            {
              label: "Thỏa thuận",
              value: 4,
            },
          ]}
          //   @ts-ignore
          value={formikProps.values.salary}
        />
      </Col>
      <Col md={8}>
        <AdminInput
          label="Khu vực làm việc"
          Icon={<EditSettings width={16} />}
          name="province_id"
          placeholder="Nhập địa chỉ nơi làm việc"
          mode="select"
          options={[
            {
              label: "Chọn khu vực làm việc",
              value: null,
            },
            {
              label: "An Giang",
              value: 1,
            },
            {
              label: "Việt Name",
              value: 0,
            },
          ]}
          //   @ts-ignore
          value={formikProps.values.province_id}
        />
      </Col>
      <Col md={24}>
        <AdminInput
          label="Địa chỉ làm việc"
          Icon={<EditSettings width={16} />}
          name="address_work"
          placeholder="Nhập địa chỉ nơi làm việc"
          mode="input"
          //   @ts-ignore
          value={formikProps.values.address_work}
        />
      </Col>
      <Col md={24}>
        <AdminInput
          label="Mô tả công việc"
          Icon={<EditSettings width={16} />}
          name="description"
          placeholder="Nhập mô tả công việc"
          mode="textarea"
          //   @ts-ignore
          value={formikProps.values.description}
        />
      </Col>
      <Col md={24}>
        <AdminInput
          label="Yêu cầu công việc"
          Icon={<EditSettings width={16} />}
          name="requirement"
          placeholder="Nhập yêu cầu công việc"
          mode="textarea"
          //   @ts-ignore
          value={formikProps.values.requirement}
        />
      </Col>
      <Col md={24}>
        <AdminInput
          label="Quyền lợi của ứng viên"
          Icon={<EditSettings width={16} />}
          name="benefit"
          placeholder="Nhập quyền lợi của ứng viên"
          mode="textarea"
          //   @ts-ignore
          value={formikProps.values.benefit}
        />
      </Col>
      <Col md={8}>
        <AdminInput
          label="Hạn chót nhận CV"
          Icon={<EditSettings width={16} />}
          name="expired_date"
          placeholder="Nhập hạn chót nhận CV"
          mode="datepicker"
          //   @ts-ignore
          value={formikProps.values.expired_date}
        />
      </Col>
      <Col md={24}>
        <Button htmlType="submit">Lưu</Button>
        <Button htmlType="button">Hủy</Button>
      </Col>
    </Row>
  );
};

export default FormEditWorkJob;
