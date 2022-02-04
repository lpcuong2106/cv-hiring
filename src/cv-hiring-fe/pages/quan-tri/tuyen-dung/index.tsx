import React from "react";
import { Row, Col, Table, Button, Tag, Space, Tooltip } from "antd";
import style from "./style.module.scss";
import LayoutAdmin from "../../../components/layouts/LayoutAdmin";
import Head from "next/head";
import { useQuery } from "@apollo/client";
import { FETCH_ALL_WORKJOB_MANAGE } from "../../../GraphQL/Query/WorkJob";
import { LoadingApp } from "../../../components/LoadingApp";
import { WorkJob } from "../../../data";
import { ColumnsType } from "antd/lib/table";
import { Trash } from "styled-icons/boxicons-regular";
import { Edit } from "@styled-icons/boxicons-regular/Edit";
import Link from "next/link";
const AppliedCVManage = () => {
  const { data, loading } = useQuery(FETCH_ALL_WORKJOB_MANAGE, {
    variables: {
      companyId: 1,
    },
  });
  const workJobByCompany = data?.workJobByCompany;
  const columns: ColumnsType<WorkJob> = [
    {
      title: "Tin tuyển dụng",
      dataIndex: "name",
      key: "name",
      render: (_, record: WorkJob) => (
        <div>
          <b>{record.name}</b>
          <p>#ID_{record.id}</p>
        </div>
      ),
    },
    {
      title: "Số lượng CV đã nộp",
      dataIndex: "status",
      width: 290,
      align: "center",
      key: "status",
      render: (status: number, record: WorkJob) => {
        return <p>hi</p>;
      },
    },
    {
      title: "Trạng thái đăng tuyển",
      dataIndex: "is_open",
      key: "is_open",
      width: 200,
      render: (status: number) => {
        if (status === 0) {
          return <Tag color={"red"}>Dừng đăng tuyển</Tag>;
        } else {
          return <Tag color={"success"}>Đang đăng tuyển</Tag>;
        }
      },
    },
    {
      title: "Hạn ứng tuyển",
      dataIndex: "expired_date",
      width: 150,
      key: "expired_date",
      // render: (text: string) => {
      //   return (
      //     <p>
      //       {format(parse(text, "yyyy-MM-dd HH:m:s", new Date()), "dd-MM-yyyy")}
      //     </p>
      //   );
      // },
    },
    {
      title: "Hành động",
      dataIndex: "contact",
      key: "contact",
      render: (_, record: WorkJob) => {
        return (
          <Space>
            <Link href={`/quan-tri/tuyen-dung/${record.id}`}>
              <Tooltip title="Sửa tin tuyển dụng">
                <Button className={style.cancelApply}>
                  <Edit width={16} />
                </Button>
              </Tooltip>
            </Link>
            {record.is_open === 1 && (
              <Tooltip title="Dừng đăng tuyển">
                <Button danger className={style.cancelApply}>
                  <Trash width={16} />
                </Button>
              </Tooltip>
            )}
          </Space>
        );
      },
    },
  ];
  return (
    <LayoutAdmin>
      <Head>
        <title>Kết nối lao động việt | Quản trị </title>
      </Head>
      {loading || !workJobByCompany ? (
        <LoadingApp />
      ) : (
        <div className="site-statistic-demo-card">
          <h1>Tin tuyển dụng</h1>
          <Row gutter={16}>
            <Col span={24} className={style.statistic}>
              <Table<WorkJob>
                columns={columns}
                dataSource={workJobByCompany.data}
                pagination={{
                  current: workJobByCompany.paginatorInfo.currentPage,
                  total: workJobByCompany.paginatorInfo.total,
                }}
              />
            </Col>
          </Row>
        </div>
      )}
    </LayoutAdmin>
  );
};

export default AppliedCVManage;
