import React, { useState } from "react";
import {
  Row,
  Col,
  Table,
  Button,
  Space,
  Tooltip,
  Tag,
  Drawer,
  message,
  Select,
} from "antd";
import style from "./style.module.scss";
import Head from "next/head";
import { useMutation, useQuery } from "@apollo/client";
import LayoutAdmin from "../../../components/layouts/LayoutAdmin";
import { LoadingApp } from "../../../components/LoadingApp";
import Link from "next/link";
import { PaginatorInfo, User, WorkApply } from "../../../data";
import { ColumnsType } from "antd/lib/table";
import { useAppSelector } from "../../../store/hook";
import { Edit } from "styled-icons/boxicons-regular";
import { Pageview } from "@styled-icons/material-rounded/Pageview";
import { FETCH_ALL_CV_APPLIED } from "../../../GraphQL/Query/WorkJob";
import { formatStatusWorkJob } from "../../../utils/formatTypeWorkJob";
import { FETCH_USER_DETAIL_MANAGER } from "../../../GraphQL/Query/User";
import moment from "moment";
import { Save } from "@styled-icons/boxicons-solid/Save";
import { UPDATE_STATUS_WORK_JOB } from "../../../GraphQL/Mutation/UpdateWorkJob";
interface DataQuery {
  allCvApplied: {
    data: WorkApply[];
    paginatorInfo: PaginatorInfo;
  };
}
interface DataUserDetail {
  user: User;
}

const { Option } = Select;

const ManageCV = () => {
  const [page, setPage] = useState(1);
  const userLoggedIn = useAppSelector((state) => state.user.user);

  const { data, loading, refetch } = useQuery<DataQuery>(FETCH_ALL_CV_APPLIED, {
    variables: {
      companyId: userLoggedIn?.company?.id,
      page: page,
    },
    fetchPolicy: "network-only",
    nextFetchPolicy: "cache-and-network",
  });
  const { data: dataUser, refetch: refetchUser } = useQuery<DataUserDetail>(
    FETCH_USER_DETAIL_MANAGER,
    {
      variables: {
        id: userLoggedIn?.id,
      },
      skip: !userLoggedIn?.id,
      fetchPolicy: "network-only",
      nextFetchPolicy: "cache-and-network",
    }
  );
  const [updateWorkApply, { loading: loadingSaveWorkApplied }] = useMutation(
    UPDATE_STATUS_WORK_JOB
  );

  const [visible, setVisible] = useState(false);
  const [workAppliedEdit, setWorkAppliedEdit] = useState<{
    workAppliedId: undefined | number;
    status: undefined | number;
  }>({
    workAppliedId: undefined,
    status: undefined,
  });
  const showDrawer = async (userId: number) => {
    setVisible(true);
    await refetchUser({
      id: userId,
    });
  };
  const onClose = () => {
    setVisible(false);
  };

  const cvApplied = data?.allCvApplied;

  const handleChangePaginate = (page: number) => {
    setPage(page);
  };
  const handleChangeStatus = async (status: number, workApplyId: number) => {
    const { data } = await updateWorkApply({
      variables: {
        id: workApplyId,
        status: status,
      },
    });
    if (data?.updateWorkApply?.status == "ERROR") {
      message.error("Lỗi duyệt hồ sơ" + data?.updateWorkApply.message);
    } else {
      refetch();
      message.success("Duyệt hồ sơ thành công");
    }

    setWorkAppliedEdit({
      status: undefined,
      workAppliedId: undefined,
    });
  };

  const columns: ColumnsType<WorkApply> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 100,
      render: (_, record: WorkApply) => <p>#ID_{record.id}</p>,
    },
    {
      title: "Người dùng",
      dataIndex: "name",
      align: "left",
      key: "name",
      render: (_: string, record: WorkApply) => {
        return (
          <a onClick={() => showDrawer(record.user.id)}>
            <p>
              Họ và tên: {record.user.lastname + " " + record.user.firstname}
            </p>
            <p>Email: {record.user.email} </p>
            <p>SĐT: {record.user.phone || "Chưa có thông tin"}</p>
          </a>
        );
      },
    },
    {
      title: "Vị trí",
      dataIndex: "position",
      key: "position",
      width: 230,
      render: (_: number, record: WorkApply) => {
        return (
          <a
            target={"_blank"}
            href={window.location.origin + "/viec-lam/" + record.work_job.slug}
          >
            {record.work_job.name}
          </a>
        );
      },
    },
    {
      title: "Nội dung ứng tuyển",
      dataIndex: "letter",
      key: "letter",
      width: 230,
    },
    {
      title: "Trạng thái ứng tuyển",
      dataIndex: "amount_job_hiring",
      key: "amount_job_hiring",
      width: 230,
      render: (_: number, record: WorkApply) => {
        const statusWork = formatStatusWorkJob(record.status);
        if (record.deleted_at) {
          return <Tag color="red">Đã hủy ứng tuyển</Tag>;
        }
        return workAppliedEdit?.workAppliedId === record.id ? (
          <Select<number>
            defaultValue={record.status}
            style={{ width: 120 }}
            onChange={(value) =>
              setWorkAppliedEdit({ ...workAppliedEdit, status: value })
            }
          >
            <Option value={1}>Ứng tuyển</Option>
            <Option value={2}>Phỏng vấn</Option>
            <Option value={3}>Đậu việc làm</Option>
            <Option value={4}>Từ chối việc làm</Option>
            <Option value={5} disabled>
              Hủy ứng tuyển
            </Option>
          </Select>
        ) : (
          <Tag color={statusWork.color}>{statusWork.status}</Tag>
        );
      },
    },
    {
      title: "Hành động",
      dataIndex: "contact",
      key: "contact",
      render: (_, record: WorkApply) => {
        return (
          <Space>
            {workAppliedEdit?.workAppliedId ? (
              <Tooltip title="Lưu">
                <Button
                  className={style.cancelApply}
                  onClick={() =>
                    handleChangeStatus(
                      workAppliedEdit.status || record.status,
                      record.id
                    )
                  }
                  loading={loadingSaveWorkApplied}
                >
                  <Save width={16} />
                </Button>
              </Tooltip>
            ) : (
              !record.deleted_at && (
                <Tooltip title="Duyệt hồ sơ">
                  <Button
                    className={style.cancelApply}
                    onClick={() =>
                      setWorkAppliedEdit({
                        workAppliedId: record.id,
                        status: record.status,
                      })
                    }
                  >
                    <Edit width={16} />
                  </Button>
                </Tooltip>
              )
            )}

            <a
              target="_blank"
              href={`http://localhost:8000/${record.cv_url.replace(
                "public/",
                "storage/"
              )}`}
            >
              <Tooltip title="Xem hồ sơ CV">
                <Button className={style.cancelApply}>
                  <Pageview width={16} />
                </Button>
              </Tooltip>
            </a>
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

      <div className="site-statistic-demo-card">
        <h1>Quản lý CV ứng viên</h1>

        {loading || !cvApplied ? (
          <LoadingApp />
        ) : (
          <>
            <Row gutter={16}>
              <Col span={24} className={style.statistic}>
                <Table<WorkApply>
                  columns={columns}
                  dataSource={cvApplied.data}
                  pagination={{
                    current: cvApplied.paginatorInfo.currentPage,
                    total: cvApplied.paginatorInfo.total,
                    onChange: handleChangePaginate,
                  }}
                />
              </Col>
            </Row>
            <Drawer
              title="Thông tin người ứng tuyển"
              placement="right"
              onClose={onClose}
              visible={visible}
            >
              <div className={style.containerImage}>
                <img src={dataUser?.user.avatar} className={style.avatarUser} />
              </div>
              <div>
                <p>
                  Họ và tên:{" "}
                  {dataUser?.user.lastname + " " + dataUser?.user.firstname}
                </p>
                <p>
                  Ngày sinh:{" "}
                  {dataUser?.user.birthday
                    ? moment(dataUser?.user.birthday).format("DD-MM-YYYY")
                    : null}
                </p>
                <p>
                  Giới tính: {dataUser?.user.gender === "male" ? "Nam" : "Nữ"}
                </p>
                <p>
                  Tuổi:{" "}
                  {dataUser?.user.birthday
                    ? moment().year() - moment(dataUser?.user.birthday).year()
                    : null}
                </p>
              </div>
            </Drawer>
          </>
        )}
      </div>
    </LayoutAdmin>
  );
};

export default ManageCV;
