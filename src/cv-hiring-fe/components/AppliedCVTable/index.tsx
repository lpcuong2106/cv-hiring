import { useQuery } from "@apollo/client";
import { Button, Space, Table, Tag, Timeline } from "antd";
import { ColumnsType } from "antd/lib/table";
import Link from "next/link";
import React, { useContext } from "react";
import { PaginatorInfo, WorkApply } from "../../data";
import { FETCH_USER_APPLIED_JOB } from "../../GraphQL/Query/WorkJob";
import { AuthContext } from "../AuthProvider";
import { LoadingApp } from "../LoadingApp";
import style from "./style.module.scss";
import { ClockCircleOutlined } from "@ant-design/icons";
import { Trash } from "@styled-icons/bootstrap/Trash";
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
    key: "status",
    render: (status: number, record: WorkApply) => {
      function handleColor(valueItem: number) {
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
      return (
        <Timeline mode="left">
          <Timeline.Item
            color={handleColor(4)}
            label={status === 4 ? record.updated_at : null}
            dot={handleDot(4)}
          >
            Từ chối việc làm
          </Timeline.Item>
          <Timeline.Item
            label={status === 3 ? record.updated_at : null}
            color={handleColor(3)}
            dot={handleDot(3)}
          >
            Đậu việc làm
          </Timeline.Item>
          <Timeline.Item
            label={status === 2 ? record.updated_at : null}
            color={handleColor(2)}
            dot={handleDot(2)}
          >
            Phỏng vấn
          </Timeline.Item>
          <Timeline.Item
            label={status === 1 ? record.updated_at : null}
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
    render: (text: string) => <p>{text}</p>,
  },
  {
    title: "Ngày ứng tuyển",
    dataIndex: "created_at",
    width: 150,
    key: "created_at",
  },
  {
    title: "Hành động",
    dataIndex: "contact",
    key: "contact",
    render: () => {
      return (
        <Button danger className={style.cancelApply}>
          <Trash width={16} />
          Hủy ứng tuyển
        </Button>
      );
    },
  },
];

// const data2 = [
//   {
//     key: "1",
//     name: "John Brown",
//     age: 32,
//     address: "New York No. 1 Lake Park",
//     tags: ["nice", "developer"],
//   },
//   {
//     key: "2",
//     name: "Jim Green",
//     age: 42,
//     address: "London No. 1 Lake Park",
//     tags: ["loser"],
//   },
//   {
//     key: "3",
//     name: "Joe Black",
//     age: 32,
//     address: "Sidney No. 1 Lake Park",
//     tags: ["cool", "teacher"],
//   },
// ];
interface DataQuery {
  workJobAppliedByUser: {
    paginatorInfo: PaginatorInfo;
    data: WorkApply[];
  };
}
function AppliedCVTable() {
  const context = useContext(AuthContext);

  const { data, loading } = useQuery<DataQuery>(FETCH_USER_APPLIED_JOB, {
    variables: {
      userId: context?.user?.id,
    },
    skip: !context?.user?.id,
  });
  const workJobsApplied = data?.workJobAppliedByUser;
  // console.log(data);
  if (loading || !workJobsApplied) {
    return <LoadingApp />;
  }
  console.log(workJobsApplied.data);

  return (
    <div>
      <Table<WorkApply> columns={columns} dataSource={workJobsApplied.data} />
    </div>
  );
}

export default AppliedCVTable;
