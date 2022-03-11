import React from "react";
import { Button, Col, Row, Space } from "antd";
import { EditSettings } from "@styled-icons/fluentui-system-filled/EditSettings";

import { useFormikContext } from "formik";
import { ModeView } from "../../thong-tin-cong-ty";
import { User } from "../../../../data";
import { useAppSelector } from "../../../../store/hook";
import AdminInput from "../../../../components/AdminInput";

interface FormValue {
  id: string;
  name: string;
}
interface Props {
  loadingSubmit: boolean;
  mode: ModeView;
  setMode: React.Dispatch<React.SetStateAction<ModeView>>;
}
interface PropsQuery {
  users: User[];
}

const FormEditCategory = ({
  loadingSubmit,
  mode = "create",
  setMode,
}: Props) => {
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
          label="Tên ngành nghề"
          Icon={<EditSettings width={16} />}
          name="name"
          mode="input"
          disabled={isView}
          placeholder="Tên ngành nghề"
          //   @ts-ignore
          value={formikProps.values.name}
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

export default FormEditCategory;
