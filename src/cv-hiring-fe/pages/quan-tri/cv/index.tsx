import React, { useState } from "react";
import {
  Row,
  Col,
  message,
  Table,
  Button,
  Space,
  Tooltip,
  Tag,
  Drawer,
} from "antd";
import style from "./style.module.scss";
import Head from "next/head";
import { useMutation, useQuery } from "@apollo/client";
import * as Yup from "yup";
import LayoutAdmin from "../../../components/layouts/LayoutAdmin";
import { LoadingApp } from "../../../components/LoadingApp";
import Link from "next/link";
import { Company, PaginatorInfo, User, WorkApply } from "../../../data";
import { ColumnsType } from "antd/lib/table";
import { useAppSelector } from "../../../store/hook";
import { Edit } from "styled-icons/boxicons-regular";
import { REMOVE_COMPANY } from "../../../GraphQL/Mutation/RemoveCompany";
import { FETCH_ALL_CV_APPLIED } from "../../../GraphQL/Query/WorkJob";
import { useRouter } from "next/router";
import {
  formatStatusWorkJob,
  formatTypeWorkJob,
} from "../../../utils/formatTypeWorkJob";
import { FETCH_USER_DETAIL_MANAGER } from "../../../GraphQL/Query/User";

interface DataQuery {
  allCvApplied: {
    data: WorkApply[];
    paginatorInfo: PaginatorInfo;
  };
}
interface DataUserDetail {
  user: User;
}

export const validationSchemaWorkJob = Yup.object().shape({
  name: Yup.string()
    .min(8, "Tên công việc ít nhất 8 kí tự")
    .required("Tên công việc là bắt buộc"),
  benefit: Yup.string()
    .min(8, "Lợi ích công việc ít nhất 8 kí tự")
    .required("Lợi ích công việc là bắt buộc"),
  description: Yup.string()
    .min(8, "Mô tả công việc ít nhất 8 kí tự")
    .required("Mô tả công việc là bắt buộc"),
  requirement: Yup.string()
    .min(8, "Yêu cầu công việc ít nhất 8 kí tự")
    .required("Yêu cầu công việc là bắt buộc"),
  requirement_exp: Yup.string()
    .typeError("Vui lòng chọn yêu cầu kinh nghiệm")
    .required("Vui lòng chọn yêu cầu kinh nghiệm"),
  requirement_gender: Yup.string()
    .typeError("Vui lòng chọn yêu cầu giới tính")
    .required("Yêu cầu giới tính là bắt buộc"),
  requirement_age: Yup.string().required("Yêu cầu độ tuổi là bắt buộc"),
  amount_hiring: Yup.number()
    .typeError("Vui lòng nhập đúng định dạng số lượng tuyển")
    .min(1)
    .required("Số lượng tuyển dụng là bắt buộc"),
  address_work: Yup.string().required("Địa chỉ làm việc là bắt buộc"),
  salary: Yup.string().required("Chọn lương là bắt buộc"),
  type: Yup.string()
    .typeError("Vui lòng chọn loại công việc")
    .required("Vui lòng chọn loại công việc"),
  expired_date_hiring: Yup.string().required("Chọn ngày hết hạn là bắt buộc"),
  work_category_id: Yup.number()
    .typeError("Vui lòng chọn lĩnh vực")
    .required("Tên công việc là bắt buộc"),
  company_id: Yup.number().required("Công ty là bắt buộc"),
  province_id: Yup.number()
    .typeError("Vui lòng chọn tỉnh thành")
    .required("Vui lòng chọn tỉnh thành"),
});

const ManageCV = () => {
  const [page, setPage] = useState(1);
  const userLoggedIn = useAppSelector((state) => state.user.user);

  const { data, loading } = useQuery<DataQuery>(FETCH_ALL_CV_APPLIED, {
    variables: {
      company: userLoggedIn?.company?.id,
      page: page,
    },
    fetchPolicy: "network-only",
    nextFetchPolicy: "cache-and-network",
  });
  const { data: dataUser, refetch: refetchUser } = useQuery<DataUserDetail>(
    FETCH_USER_DETAIL_MANAGER,
    {
      fetchPolicy: "network-only",
      nextFetchPolicy: "cache-and-network",
    }
  );

  const [visible, setVisible] = useState(false);
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

  const columns: ColumnsType<WorkApply> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 100,
      render: (_, record: WorkApply) => (
        <div>
          <p>#ID_{record.id}</p>
        </div>
      ),
    },
    {
      title: "Người dùng",
      dataIndex: "name",
      align: "center",
      key: "name",
      render: (_: string, record: WorkApply) => {
        return <p>{record.user.lastname + " " + record.user.firstname}</p>;
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
        return <Tag color={statusWork.color}>{statusWork.status}</Tag>;
      },
    },
    {
      title: "Hành động",
      dataIndex: "contact",
      key: "contact",
      render: (_, record: WorkApply) => {
        return (
          <Space>
            <Link href={`/quan-tri/cong-ty/${record.id}`}>
              <Tooltip title="Xem hồ sơ CV">
                <Button className={style.cancelApply}>
                  <Edit width={16} />
                </Button>
              </Tooltip>
            </Link>
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
      {loading || !cvApplied ? (
        <LoadingApp />
      ) : (
        <div className="site-statistic-demo-card">
          <h1>Quản lý CV ứng viên</h1>
          <div className={style.actionAdd}>
            <Link href={"/quan-tri/cong-ty/them-moi"}>
              <Button type="primary">Thêm mới</Button>
            </Link>
          </div>

          <Row gutter={16}>
            <Col span={24} className={style.statistic}>
              <Table<WorkApply>
                columns={columns}
                dataSource={cvApplied.data}
                onRow={(record, rowIndex) => {
                  return {
                    onClick: (event) => {
                      showDrawer(record.user.id);
                      console.log(record, rowIndex);
                    }, // click row
                  };
                }}
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
            <img src={dataUser?.user.avatar} style={{ width: "100%" }} />
            <p>
              Họ và tên:{" "}
              {dataUser?.user.lastname + " " + dataUser?.user.firstname}
            </p>
            <p>Ngày sinh: {dataUser?.user.birthday}</p>
            <p>Giới tính: {dataUser?.user.gender}</p>
          </Drawer>
        </div>
      )}
    </LayoutAdmin>
  );
};

export default ManageCV;
