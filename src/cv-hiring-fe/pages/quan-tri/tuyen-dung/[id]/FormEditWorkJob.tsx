import React from "react";
import { Button, Col, Row, Space } from "antd";
import { EditSettings } from "@styled-icons/fluentui-system-filled/EditSettings";
import AdminInput from "../../../../components/AdminInput";
import { useFormikContext } from "formik";
import { Province, WorkCategory } from "../../../../data";

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
  expired_date_hiring: Date;
  province_id: number;
  description: string;
}
interface Props {
  loadingSubmit: boolean;
  workCategories: WorkCategory[];
  provinces: Province[];
  mode?: "edit" | "create";
}

const FormEditWorkJob = ({
  loadingSubmit,
  workCategories,
  provinces,
  mode = "create",
}: Props) => {
  const formikProps = useFormikContext<FormValue>();
  const provinceOptions = provinces.map((province) => ({
    label: province.name,
    value: province.id,
  }));
  const categoryOptions = workCategories.map((cateogry) => ({
    label: cateogry.name,
    value: cateogry.id,
  }));

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
        <AdminInput
          name="work_category_id"
          label="Ngành nghề & Lĩnh vực"
          Icon={<EditSettings width={16} />}
          mode="select"
          // @ts-ignore
          value={formikProps.values.work_category_id}
          options={[
            {
              label: "Chọn loại ngành nghề",
              value: null,
            },
            ...categoryOptions,
          ]}
        />
      </Col>
      <Col md={8}>
        <AdminInput
          label="Số lượng tuyển"
          Icon={<EditSettings width={16} />}
          name="amount_hiring"
          mode="number"
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
              label: "Chọn loại công việc",
              value: null,
            },
            {
              label: "Toàn thời gian",
              value: "full-time",
            },
            {
              label: "Bán thời gian",
              value: "part-time",
            },
          ]}
        />
      </Col>
      <Col md={8}>
        <AdminInput
          label="Yêu cầu kinh nghiệm"
          Icon={<EditSettings width={16} />}
          name="requirement_exp"
          mode="select"
          placeholder="Tiêu đề tuyển dụng"
          //   @ts-ignore
          value={formikProps.values.requirement_exp}
          options={[
            {
              label: "Chọn loại yêu cầu kinh nghiệm",
              value: null,
            },
            {
              label: "Không yêu cầu kinh nghiệm",
              value: "Không yêu cầu kinh nghiệm",
            },
            {
              label: "Ít nhất 1 năm kinh nghiệm",
              value: "Ít nhất 1 năm kinh nghiệm",
            },
            {
              label: "Ít nhất 2 năm kinh nghiệm",
              value: "Ít nhất 2 năm kinh nghiệm",
            },
            {
              label: "Ít nhất 5 năm kinh nghiệm",
              value: "Ít nhất 5 năm kinh nghiệm",
            },
            {
              label: "Ít nhất 10 năm kinh nghiệm",
              value: "Ít nhất 10 năm kinh nghiệm",
            },
          ]}
        />
      </Col>
      <Col md={8}>
        <AdminInput
          label="Yêu cầu giới tính"
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
              value: "Yêu cầu giới tính nam",
            },
            {
              label: "Nữ",
              value: "Yêu cầu giới tính nữ",
            },
            {
              label: "Không có yêu cầu",
              value: "Không có yêu cầu",
            },
          ]}
          //   @ts-ignore
          value={formikProps.values.requirement_gender}
        />
      </Col>
      <Col md={8}>
        <AdminInput
          label="Yêu cầu độ tuổi"
          Icon={<EditSettings width={16} />}
          name="requirement_age"
          mode="select"
          options={[
            {
              label: "Chọn độ tuổi",
              value: null,
            },
            {
              label: "Không yêu cầu độ tuổi",
              value: "Không yêu cầu độ tuổi",
            },
            {
              label: "Từ 18 đên 24 tuổi",
              value: "Từ 18 đên 24 tuổi",
            },
            {
              label: "Từ 25 đên 30 tuổi",
              value: "Từ 25 đên 30 tuổi",
            },
            {
              label: "Lớn hơn 30 tuổi",
              value: "Lớn hơn 30 tuổi",
            },
          ]}
          //   @ts-ignore
          value={formikProps.values.requirement_age}
        />
      </Col>
      <Col md={8}>
        <AdminInput
          label="Lương (tr/tháng)"
          Icon={<EditSettings width={16} />}
          name="salary"
          mode="input"
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
            ...provinceOptions,
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
          name="expired_date_hiring"
          placeholder="Nhập hạn chót nhận CV"
          mode="datepicker"
          //   @ts-ignore
          value={formikProps.values.expired_date_hiring}
        />
      </Col>
      <Col md={24}>
        <Space>
          <Button htmlType="submit" loading={loadingSubmit}>
            {mode === "edit" ? "Cập nhật" : "Lưu"}
          </Button>
          <Button htmlType="reset">Hủy</Button>
        </Space>
      </Col>
    </Row>
  );
};

export default FormEditWorkJob;
