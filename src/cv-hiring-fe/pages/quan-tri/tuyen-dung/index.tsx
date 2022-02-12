import React, { useState } from "react";
import { Row, Col, Table, Button, Tag, Space, Tooltip, message } from "antd";
import style from "./style.module.scss";
import LayoutAdmin from "../../../components/layouts/LayoutAdmin";
import Head from "next/head";
import { useQuery, useMutation } from "@apollo/client";
import { FETCH_ALL_WORKJOB_MANAGE } from "../../../GraphQL/Query/WorkJob";
import { LoadingApp } from "../../../components/LoadingApp";
import { WorkJob } from "../../../data";
import { ColumnsType } from "antd/lib/table";
import { Trash } from "styled-icons/boxicons-regular";
import { Edit } from "@styled-icons/boxicons-regular/Edit";
import Link from "next/link";
import isBefore from "date-fns/isBefore";
import { Play } from "@styled-icons/bootstrap/Play";
import { PauseFill } from "@styled-icons/bootstrap/PauseFill";
import { formatStringToDate } from "../../../utils/formatStringToDate";
import { isExpiredDateHiring } from "../../../utils/formatTypeWorkJob";
import {
  PAUSE_HIRING_JOB,
  RESUME_HIRING_JOB,
} from "../../../GraphQL/Mutation/StatusHiringWorkJob";

type PropsMutation = {
  pauseHiring: {
    status: "OK" | "ERROR";
    message: string;
  };
};
const AppliedCVManage = () => {
  const [page, setPage] = useState(1);
  const { data, loading, refetch } = useQuery(FETCH_ALL_WORKJOB_MANAGE, {
    variables: {
      companyId: 1,
      page: page,
    },
  });
  const [pauseHiring, { loading: loadingPause }] = useMutation<
    PropsMutation,
    { id: number }
  >(PAUSE_HIRING_JOB);
  const [resumeHiring, { loading: loadingResume }] =
    useMutation(RESUME_HIRING_JOB);

  const workJobByCompany = data?.workJobByCompany;

  const handleChangePaginate = (page: number) => {
    setPage(page);
  };

  const handleStopHiring = async (id: number) => {
    const { data } = await pauseHiring({
      variables: {
        id: id,
      },
    });

    if (data?.pauseHiring.status === "OK") {
      message.success("Ngưng tuyển dụng thành công");
      await refetch();
      return;
    }
    message.error("Xảy ra lỗi không mong muốn");
  };

  const handleResumeHiring = async (id: number) => {
    const { data } = await resumeHiring({
      variables: {
        id: id,
      },
    });

    if (data?.pauseHiring.status === "OK") {
      message.success("Tiếp tục tuyển dụng thành công");
      await refetch();
      return;
    }
    message.error("Xảy ra lỗi không mong muốn");
  };

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
      render: (_: number, record: WorkJob) => {
        return <p>{record.work_applies.length}</p>;
      },
    },
    {
      title: "Trạng thái đăng tuyển",
      dataIndex: "is_open",
      key: "is_open",
      width: 200,
      render: (is_open: number, record: WorkJob) => {
        const date = formatStringToDate(record.expired_date);

        if (isBefore(date, new Date())) {
          return <Tag color={"red"}>Hết hạn tuyển dụng</Tag>;
        }
        if (is_open === 0) {
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
            {!isExpiredDateHiring(record.expired_date) && record.is_open === 1 && (
              <Tooltip title="Dừng đăng tuyển">
                <Button
                  danger
                  className={style.cancelApply}
                  onClick={() => handleStopHiring(record.id)}
                  loading={loadingPause}
                >
                  <PauseFill width={16} />
                </Button>
              </Tooltip>
            )}
            {!isExpiredDateHiring(record.expired_date) && record.is_open === 0 && (
              <Tooltip title="Tiếp tục đăng tuyển">
                <Button
                  danger
                  className={style.cancelApply}
                  onClick={() => handleResumeHiring(record.id)}
                  loading={loadingResume}
                >
                  <Play width={16} />
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
          <div className={style.actionAdd}>
            <Link href={"/quan-tri/tuyen-dung/them-moi"}>
              <Button type="primary">Thêm mới</Button>
            </Link>
          </div>

          <Row gutter={16}>
            <Col span={24} className={style.statistic}>
              <Table<WorkJob>
                columns={columns}
                dataSource={workJobByCompany.data}
                pagination={{
                  current: workJobByCompany.paginatorInfo.currentPage,
                  total: workJobByCompany.paginatorInfo.total,
                  onChange: handleChangePaginate,
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
