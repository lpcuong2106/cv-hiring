import { Breadcrumb } from "antd";
import Link from "next/link";
import React from "react";

function BreadcrumbCus() {
  return (
    <Breadcrumb>
      <Breadcrumb.Item>
        <Link href="/">
          <a>Trang chủ</a>
        </Link>
      </Breadcrumb.Item>

      <Breadcrumb.Item>Việc làm</Breadcrumb.Item>
    </Breadcrumb>
  );
}

export default BreadcrumbCus;
