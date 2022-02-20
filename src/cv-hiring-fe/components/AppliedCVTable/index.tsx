import { useMutation, useQuery } from "@apollo/client";
import { Button, Table, Tag, Timeline } from "antd";
import { ColumnsType } from "antd/lib/table";
import Link from "next/link";
import React from "react";
import { PaginatorInfo, WorkApply } from "../../data";
import { FETCH_USER_APPLIED_JOB } from "../../GraphQL/Query/WorkJob";
import { LoadingApp } from "../LoadingApp";
import style from "./style.module.scss";
import { ClockCircleOutlined } from "@ant-design/icons";
import { Trash } from "@styled-icons/bootstrap/Trash";
import { format, parse } from "date-fns";
import { SOFT_DELETE_WORKJOB } from "../../GraphQL/Mutation/DeleteAppliedCV";
import { useAppSelector } from "../../store/hook";

interface DataQuery {
  workJobAppliedByUser: {
    paginatorInfo: PaginatorInfo;
    data: WorkApply[];
  };
}
function AppliedCVTable() {
  const userLoggedIn = useAppSelector((state) => state.user);
  const { data, loading, refetch } = useQuery<DataQuery>(
    FETCH_USER_APPLIED_JOB,
    {
      variables: {
        userId: userLoggedIn?.user?.id,
      },
      skip: !userLoggedIn?.user?.id,
    }
  );
  const [cancelWorkJob, { loading: loadingDelete }] =
    useMutation(SOFT_DELETE_WORKJOB);

  const workJobsApplied = data?.workJobAppliedByUser;
  const columns: ColumnsType<WorkApply> = [
    {
      title: "Công việc",
      dataIndex: "id",
      key: "id",
      render: (_, record: WorkApply) => (
        <div className={style.infoJob}>
          <div className={style.companyLogo}>
            <img src={record.work_job.company.logo} />
          </div>
          <div className={style.infoJob}>
            <Link href={record.work_job.slug}>
              <a className={style.jobName}>
                <p>{record.work_job.name}</p>
              </a>
            </Link>
            <Link href={"/cong-ty/" + record.work_job.company.slug}>
              <a>
                <p className={style.companyName}>
                  {record.work_job.company.name}
                </p>
              </a>
            </Link>
          </div>
        </div>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      width: 290,
      align: "center",
      key: "status",
      render: (status: number, record: WorkApply) => {
        function handleColor(valueItem: number) {
          if (status < valueItem && record.deleted_at) {
            return "grey";
          }
          if (status >= valueItem) {
            return "green";
          }
          return "red";
        }
        function handleDot(valueItem: number) {
          if (status < valueItem) {
            return <ClockCircleOutlined className="timeline-clock-icon" />;
          }
          return null;
        }
        const dataLastUpdate = (value: number, text: string) => {
          if ((status === value && !record.deleted_at) || value === -1) {
            return format(
              parse(text, "yyyy-MM-dd HH:mm:ss", new Date()),
              "dd-MM-yyyy HH:mm"
            );
          }
        };
        return (
          <Timeline mode="left">
            {record.deleted_at && (
              <Timeline.Item
                color="red"
                label={dataLastUpdate(-1, record.updated_at)}
              >
                Hủy ứng tuyển
              </Timeline.Item>
            )}
            <Timeline.Item
              color={handleColor(4)}
              label={dataLastUpdate(4, record.updated_at)}
              dot={handleDot(4)}
            >
              Từ chối việc làm
            </Timeline.Item>
            <Timeline.Item
              label={dataLastUpdate(3, record.updated_at)}
              color={handleColor(3)}
              dot={handleDot(3)}
            >
              Đậu việc làm
            </Timeline.Item>
            <Timeline.Item
              label={dataLastUpdate(2, record.updated_at)}
              color={handleColor(2)}
              dot={handleDot(2)}
            >
              Phỏng vấn
            </Timeline.Item>
            <Timeline.Item
              label={dataLastUpdate(1, record.updated_at)}
              color={handleColor(1)}
              dot={handleDot(1)}
            >
              Ứng tuyển
            </Timeline.Item>
          </Timeline>
        );
      },
    },
    {
      title: "Nội dung ứng tuyển",
      dataIndex: "letter",
      key: "letter",
      width: 200,
      render: (text: string) => <p>{text}</p>,
    },
    {
      title: "Ngày ứng tuyển",
      dataIndex: "created_at",
      width: 150,
      key: "created_at",
      render: (text: string) => {
        return (
          <p>
            {format(parse(text, "yyyy-MM-dd HH:m:s", new Date()), "dd-MM-yyyy")}
          </p>
        );
      },
    },
    {
      title: "Hành động",
      dataIndex: "contact",
      key: "contact",
      render: (_, record: WorkApply) => {
        return !record.deleted_at ? (
          <Button
            danger
            className={style.cancelApply}
            loading={loadingDelete}
            onClick={() => handleCancelAppliedCv(record.id)}
          >
            <Trash width={16} />
            Hủy ứng tuyển
          </Button>
        ) : (
          <Tag color="red">Đã hủy ứng tuyển</Tag>
        );
      },
    },
  ];

  const handleCancelAppliedCv = async (id: number) => {
    const { data } = await cancelWorkJob({
      variables: {
        workAppliedId: id,
      },
    });
    if (data?.cancelAppliedWorkJob.status === "OK") {
      refetch();
    }
  };

  if (loading || !workJobsApplied) {
    return <LoadingApp />;
  }

  return (
    <div>
      <Table<WorkApply>
        columns={columns}
        dataSource={workJobsApplied.data}
        pagination={{
          current: workJobsApplied.paginatorInfo.currentPage,
          total: workJobsApplied.paginatorInfo.total,
        }}
      />
    </div>
  );
}

export default AppliedCVTable;
