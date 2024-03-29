import { useMutation, useQuery } from "@apollo/client";
import { Button, message, Table, Tag, Timeline } from "antd";
import { ColumnsType } from "antd/lib/table";
import Link from "next/link";
import React, { useState } from "react";
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
  const [search, setSearch] = useState({
    page: 1,
  });

  const { data, loading, refetch } = useQuery<DataQuery>(
    FETCH_USER_APPLIED_JOB,
    {
      variables: {
        page: search.page,
        userId: userLoggedIn?.user?.id,
      },
      skip: !userLoggedIn?.user?.id,
      fetchPolicy: "network-only",
      nextFetchPolicy: "cache-and-network",
    }
  );
  const [cancelWorkJobId, setCancelWorkJobId] = useState<number>();
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
            <img
              src={record.work_job.company.logo}
              onError={({ currentTarget }) => {
                currentTarget.onerror = null; // prevents looping
                currentTarget.src = "/company-default.svg";
              }}
            />
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
          if (status == 4 && valueItem == 4) {
            return "red";
          }
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
            {record.status != 3 && (
              <Timeline.Item
                color={handleColor(4)}
                label={dataLastUpdate(4, record.updated_at)}
                dot={handleDot(4)}
              >
                Từ chối việc làm
              </Timeline.Item>
            )}
            {record.status != 4 && (
              <Timeline.Item
                label={dataLastUpdate(3, record.updated_at)}
                color={handleColor(3)}
                dot={handleDot(3)}
              >
                Đậu việc làm
              </Timeline.Item>
            )}
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
        if (record.status == 3) {
          return <Tag color="success">Đã được duyệt</Tag>;
        }
        if (record.status == 4) {
          return <Tag color="red">Đã bị từ chối</Tag>;
        }

        return !record.deleted_at &&
          record.status != 4 &&
          record.status != 3 ? (
          <Button
            danger
            className={style.cancelApply}
            loading={loadingDelete && record.id === cancelWorkJobId}
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
  const handleChangePaginate = (page: number) => {
    setSearch({
      ...search,
      page: page,
    });
  };

  const handleCancelAppliedCv = async (id: number) => {
    setCancelWorkJobId(id);
    const { data } = await cancelWorkJob({
      variables: {
        workAppliedId: id,
      },
    });
    if (data?.cancelAppliedWorkJob.status === "OK") {
      message.success("Hủy ứng tuyển thành công");
      refetch();
    } else {
      message.success(
        "Hủy ứng tuyển thất bại" + data?.cancelAppliedWorkJob?.message
      );
    }
    setCancelWorkJobId(undefined);
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
          onChange: handleChangePaginate,
        }}
      />
    </div>
  );
}

export default AppliedCVTable;
