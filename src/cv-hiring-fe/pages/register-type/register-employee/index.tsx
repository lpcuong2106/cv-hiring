import { useFormik } from "formik";
import Link from "next/link";
import React from "react";
import style from "./style.module.scss";
import * as Yup from "yup";
import { useMutation } from "@apollo/client";
import { Button, message } from "antd";
import Router from "next/router";
import { REGISTER_USER } from "./RegisterData";
import Head from "next/head";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { FormItemInput } from "../../../components/FormItem";
import { useAuth } from "../../../components/AuthProvider";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Vui lòng nhập đúng định dạng email")
    .required("Email là bắt buộc"),
  password: Yup.string()
    .min(8, "Vui lòng nhập ít nhất 8 kí tự")
    .required("Password là bắt buộc"),
  rePassword: Yup.string()
    .min(8, "Vui lòng nhập ít nhất 8 kí tự")
    .oneOf([Yup.ref("password"), null], "RePassword không trùng khớp")
    .required("RePassword là bắt buộc"),
});

const Register = () => {
  const [registerUser, { data, loading, error }] = useMutation(REGISTER_USER);
  const auth = useAuth();

  const form = useFormik({
    initialValues: {
      email: "",
      password: "",
      rePassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const { email, password } = values;
      const { data } = await registerUser({
        variables: { email, password },
      });

      if (data?.registerUser?.token) {
        localStorage.setItem("token", data.login?.token);
        auth.setIsLogged(true);
        message.success("Đăng ký thành công!");
        Router.push("/");
        return;
      }
      message.error("Đăng ký thất bại!");
    },
  });

  if (error) {
    return null;
  }
  return (
    <div className={style.wrapLogin}>
      <Head>
        <title>Đăng ký tài khoản</title>
      </Head>
      <div className="container-login100">
        <div className="wrap-login100">
          <div className="login100-pic js-tilt" data-tilt="">
            <img src="/login.png" alt="IMG" />
          </div>
          <form
            className="login100-form validate-form"
            onSubmit={form.handleSubmit}
          >
            <span className={style.titleLogin}>Đăng ký tài khoản</span>
            <div className="wrap-input100 validate-input">
              <FormItemInput
                form={form}
                prefix={<UserOutlined className="site-form-item-icon" />}
                lable="Email"
                name="email"
                isError={(form.errors.email && form.touched.email) as boolean}
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
                lable="Nhập lại mật khẩu"
                name="rePassword"
                isError={
                  (form.errors.rePassword && form.touched.rePassword) as boolean
                }
                value={form.values.rePassword}
                type="password"
                error={form.errors.rePassword}
              />
            </div>
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
