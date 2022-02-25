import { useFormik } from "formik";
import Link from "next/link";
import React from "react";
import style from "../register-employee/style.module.scss";
import styles from "./style.module.scss";
import * as Yup from "yup";
import { useMutation } from "@apollo/client";
import { Button, Col, Form, message, Row, Select } from "antd";
import Router, { useRouter } from "next/router";
import Head from "next/head";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { FormItemInput } from "../../../components/FormItem";
import { useAuth } from "../../../components/AuthProvider";
import { setUserLoggedIn } from "../../../store/features/userSlideder";
import { useAppDispatch } from "../../../store/hook";
import { REGISTER_USER_HR } from "../register-employee/RegisterData";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Vui lòng nhập đúng định dạng email")
    .required("Vui lòng nhập email"),
  firstname: Yup.string().required("Vui lòng nhập tên"),
  lastname: Yup.string().required("Vui lòng nhập họ"),
  password: Yup.string()
    .min(8, "Vui lòng nhập ít nhất 8 kí tự")
    .required("Password là bắt buộc"),
  rePassword: Yup.string()
    .min(8, "Vui lòng nhập ít nhất 8 kí tự")
    .oneOf([Yup.ref("password"), null], "RePassword không trùng khớp")
    .required("RePassword là bắt buộc"),
  name: Yup.string().required("Vui lòng chọn quy mô"),
  address: Yup.string().required("Vui lòng nhập địa chỉ công ty"),
  amount_employee: Yup.string().required("Vui lòng chọn quy mô công ty"),
});

const Register = () => {
  const [registerUserHr, { loading }] = useMutation(REGISTER_USER_HR);
  const auth = useAuth();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const form = useFormik({
    initialValues: {
      email: "",
      firstname: "",
      lastname: "",
      password: "",
      rePassword: "",
      name: "",
      address: "",
      amount_employee: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const {
        email,
        password,
        firstname,
        lastname,
        address,
        amount_employee,
        name,
      } = values;
      const { data } = await registerUserHr({
        variables: {
          email,
          password,
          firstname,
          lastname,
          address,
          amount_employee,
          name,
        },
      });

      if (data.registerUserHr?.token) {
        localStorage.setItem("token", data.registerUserHr?.token);
        auth.setIsLogged(true);
        dispatch(setUserLoggedIn(data.registerUserHr?.user));
        message.success("Đăng ký thành công!");
        router.push("/");
      } else {
        message.error(data.registerUserHr.message);
      }
    },
  });

  return (
    <div className={style.wrapLogin}>
      <Head>
        <title>Đăng ký tài khoản</title>
      </Head>
      <div className="container-login100">
        <div className="wrap-login100">
          <form onSubmit={form.handleSubmit} style={{ width: "100%" }}>
            <span className={style.titleLogin}>
              Đăng ký tài khoản dành cho doanh nghiệp
            </span>

            <Row>
              <Col md={24}>
                <h6>Tài khoản</h6>
                <div>
                  <FormItemInput
                    form={form}
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    lable="Họ"
                    name="lastname"
                    isError={
                      (form.errors.lastname && form.touched.lastname) as boolean
                    }
                    type="text"
                    error={form.errors.lastname}
                    value={form.values.lastname}
                  />
                </div>
                <div>
                  <FormItemInput
                    form={form}
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    lable="Tên"
                    name="firstname"
                    isError={
                      (form.errors.firstname &&
                        form.touched.firstname) as boolean
                    }
                    type="text"
                    error={form.errors.firstname}
                    value={form.values.firstname}
                  />
                </div>
                <div>
                  <FormItemInput
                    form={form}
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    lable="Email"
                    name="email"
                    isError={
                      (form.errors.email && form.touched.email) as boolean
                    }
                    type="email"
                    error={form.errors.email}
                    value={form.values.email}
                  />
                </div>
                <div className="wrap-input100 validate-input">
                  <FormItemInput
                    form={form}
                    lable="Mật khẩu"
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    name="password"
                    isError={
                      (form.errors.password && form.touched.password) as boolean
                    }
                    value={form.values.password}
                    type="password"
                    error={form.errors.password}
                  />
                </div>
                <div className="wrap-input100 validate-input">
                  <FormItemInput
                    form={form}
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    lable="Xác nhận mật khẩu"
                    name="rePassword"
                    isError={
                      (form.errors.rePassword &&
                        form.touched.rePassword) as boolean
                    }
                    value={form.values.rePassword}
                    type="password"
                    error={form.errors.rePassword}
                  />
                </div>
              </Col>
              <Col md={24}>
                <h6>Thông tin nhà tuyển dụng</h6>
                <div>
                  <FormItemInput
                    form={form}
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    lable="Tên công ty"
                    name="name"
                    isError={(form.errors.name && form.touched.name) as boolean}
                    type="text"
                    error={form.errors.name}
                    value={form.values.name}
                  />
                </div>
                <div className="wrap-input100 validate-input">
                  <FormItemInput
                    form={form}
                    lable="Địa chỉ công ty"
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    name="address"
                    isError={
                      (form.errors.address && form.touched.address) as boolean
                    }
                    value={form.values.address}
                    type="text"
                    error={form.errors.address}
                  />
                </div>
                <div>
                  <Form.Item
                    name="amount_employee"
                    label="Quy mô công ty"
                    rules={[{ required: true }]}
                  >
                    <Select
                      value={form.values.amount_employee}
                      style={{ width: "100%" }}
                      onChange={(value) =>
                        form.setFieldValue("amount_employee", value)
                      }
                    >
                      <Select.Option value={""}>Chọn quy mô</Select.Option>
                      <Select.Option value={"10 - 100 nhân viên"}>
                        10 - 100 nhân viên
                      </Select.Option>
                      <Select.Option value={"100 - 1000 nhân viên"}>
                        100 - 1000 nhân viên
                      </Select.Option>
                      <Select.Option value={"> 1000 nhân viên"}>
                        {">"} 1000 nhân viên
                      </Select.Option>
                    </Select>
                    {form.errors.amount_employee ? (
                      <div className={styles.errorMessage}>
                        {form.errors.amount_employee}
                      </div>
                    ) : null}
                  </Form.Item>
                </div>
              </Col>
            </Row>

            <div className="container-login100-form-btn">
              <Button
                type="primary"
                className="login100-form-btn"
                loading={loading}
                htmlType="submit"
              >
                Đăng ký
              </Button>
            </div>

            <div className="text-center p-t-136">
              Bạn đã có tài khoản? <Link href={"/login"}>Đăng nhập ngay</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Register;
