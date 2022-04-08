import React from "react";
import { Button, Col, Row, Space } from "antd";
import { EditSettings } from "@styled-icons/fluentui-system-filled/EditSettings";

import { useFormikContext } from "formik";
import { ModeView } from "../thong-tin-cong-ty";
import AdminInput from "../../../components/AdminInput";
import { Setting } from "../../../data";

interface Props {
  loadingSubmit: boolean;
  mode: ModeView;
  setMode: React.Dispatch<React.SetStateAction<ModeView>>;
}

const FormEditSetting = ({
  loadingSubmit,
  mode = "create",
  setMode,
}: Props) => {
  const formikProps = useFormikContext<Setting>();
  const isView = mode === "view";

  const handleModeView = (mode: ModeView) => {
    setMode(mode);
  };

  return (
    <Row>
      <Col md={24}>
        <AdminInput
          label="Tên website"
          Icon={<EditSettings width={16} />}
          name="title_web"
          mode="input"
          disabled={isView}
          placeholder="Tên website"
          //   @ts-ignore
          value={formikProps.values.title_web}
        />
      </Col>
      <Col md={24}>
        <AdminInput
          label="Mô tả website"
          Icon={<EditSettings width={16} />}
          name="description"
          mode="input"
          disabled={isView}
          placeholder="Mô tả website"
          //   @ts-ignore
          value={formikProps.values.description}
        />
      </Col>
      <Col md={24}>
        <AdminInput
          label="Chi phí coin/1 tin đăng tuyển dụng"
          Icon={<EditSettings width={16} />}
          name="price_job"
          mode="number"
          disabled={isView}
          placeholder="Chi phí coin/1 tin đăng tuyển dụng"
          //   @ts-ignore
          value={formikProps.values.price_job}
        />
      </Col>
      <Col md={24}>
        <AdminInput
          label="Logo website"
          Icon={<EditSettings width={16} />}
          name="logo_url"
          mode="input"
          disabled={isView}
          placeholder="Logo website"
          //   @ts-ignore
          value={formikProps.values.logo_url}
        />
      </Col>
      <Col md={24}>
        <AdminInput
          label="Fanpage Facebook"
          Icon={<EditSettings width={16} />}
          name="fb_url"
          mode="input"
          disabled={isView}
          placeholder="Fanpage Facebook"
          //   @ts-ignore
          value={formikProps.values.fb_url}
        />
      </Col>
      <Col md={24}>
        <AdminInput
          label="Youtube Channel"
          Icon={<EditSettings width={16} />}
          name="youtube_url"
          mode="input"
          disabled={isView}
          placeholder="Youtube Channel"
          //   @ts-ignore
          value={formikProps.values.youtube_url}
        />
      </Col>
      <Col md={24}>
        <AdminInput
          label="Số điện thoại liên hệ"
          Icon={<EditSettings width={16} />}
          name="phone_contact"
          mode="input"
          disabled={isView}
          placeholder="Số điện thoại liên hệ"
          //   @ts-ignore
          value={formikProps.values.phone_contact}
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

export default FormEditSetting;
