import Head from "next/head";
import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import style from "./style.module.scss";

function Layout({ children }: any) {
  return (
    <div className={style.wrapperLayout}>
      <Head>
        <meta
          name="description"
          content="TimViec - Nơi kết nối lao động việt nam với nhà tuyển dụng"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}

export default Layout;
