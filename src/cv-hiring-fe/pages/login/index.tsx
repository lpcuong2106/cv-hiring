import { useFormik } from "formik";
import Link from "next/link";
import React, { useEffect } from "react";
import style from "./style.module.scss";
import * as Yup from "yup";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "./QueryData";
import { Button, message } from "antd";
import Router from "next/router";
import Head from "next/head";
import { useAuth } from "../../components/AuthProvider";
import { FormItemInput } from "../../components/FormItem";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useAppDispatch } from "../../store/hook";
import { setUserLoggedIn } from "../../store/features/userSlideder";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Vui lòng nhập đúng định dạng email")
    .required("Email là bắt buộc"),
  password: Yup.string()
    .min(8, "Vui lòng nhập ít nhất 8 kí tự")
    .required("Password là bắt buộc"),
});

const Login = () => {
  const [login, { loading, error }] = useMutation(LOGIN_USER);
  const auth = useAuth();
  const dispatch = useAppDispatch();
  const form = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const { email, password } = values;
      const { data } = await login({ variables: { email, password } });

      if (data && data.login?.token) {
        localStorage.setItem("token", data.login?.token);
        auth.setIsLogged(true);
        dispatch(setUserLoggedIn(data.login.user));
        message.success("Đăng nhập thành công!");
        Router.push("/");
        return;
      }
      message.error("Đăng nhập thất bại!");
    },
  });

  if (error) {
    return null;
  }
  return (
    <div className={style.wrapLogin}>
      <Head>
        <title>Đăng nhập</title>
      </Head>
      <div className="container-login100">
        <div className="wrap-login100">
          <div className="login100-pic js-tilt" data-tilt="">
            <img src="./login.png" alt="IMG" />
          </div>
          <form onSubmit={form.handleSubmit}>
            <span className={style.titleLogin}>Đăng nhập</span>
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
            <div className="container-login100-form-btn">
              <Button
                type="primary"
                className="login100-form-btn"
                loading={loading}
                htmlType="submit"
              >
                Đăng nhập
              </Button>
            </div>

            <div className="text-center p-t-136">
              <Link href={"/register-type"}>Tạo tài khoản mới</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Login;
