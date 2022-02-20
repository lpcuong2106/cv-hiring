import React, { useState } from "react";
import { Row, Col, message, Table, Button, Space, Tooltip } from "antd";
import style from "./style.module.scss";
import Head from "next/head";
import { useMutation, useQuery } from "@apollo/client";
import * as Yup from "yup";
import LayoutAdmin from "../../../components/layouts/LayoutAdmin";
import { LoadingApp } from "../../../components/LoadingApp";
import Link from "next/link";
import { Company, PaginatorInfo, User } from "../../../data";
import { ColumnsType } from "antd/lib/table";
import { RESUME_HIRING_JOB } from "../../../GraphQL/Mutation/StatusHiringWorkJob";
import { useAppSelector } from "../../../store/hook";
import { FETCH_ALL_USER_MANAGE } from "../../../GraphQL/Query/User";
import { Edit } from "styled-icons/boxicons-regular";
import { Trash } from "styled-icons/bootstrap";
import { REMOVE_USER } from "../../../GraphQL/Mutation/RemoveUser";
interface DataQuery {
  getAllUsers: {
    data: User[];
    paginatorInfo: PaginatorInfo;
  };
}

// export const validationSchemaWorkJob = Yup.object().shape({
//   name: Yup.string()
//     .min(8, "Tên công việc ít nhất 8 kí tự")
//     .required("Tên công việc là bắt buộc"),
//   benefit: Yup.string()
//     .min(8, "Lợi ích công việc ít nhất 8 kí tự")
//     .required("Lợi ích công việc là bắt buộc"),
//   description: Yup.string()
//     .min(8, "Mô tả công việc ít nhất 8 kí tự")
//     .required("Mô tả công việc là bắt buộc"),
//   requirement: Yup.string()
//     .min(8, "Yêu cầu công việc ít nhất 8 kí tự")
//     .required("Yêu cầu công việc là bắt buộc"),
//   requirement_exp: Yup.string()
//     .typeError("Vui lòng chọn yêu cầu kinh nghiệm")
//     .required("Vui lòng chọn yêu cầu kinh nghiệm"),
//   requirement_gender: Yup.string()
//     .typeError("Vui lòng chọn yêu cầu giới tính")
//     .required("Yêu cầu giới tính là bắt buộc"),
//   requirement_age: Yup.string().required("Yêu cầu độ tuổi là bắt buộc"),
//   amount_hiring: Yup.number()
//     .typeError("Vui lòng nhập đúng định dạng số lượng tuyển")
//     .min(1)
//     .required("Số lượng tuyển dụng là bắt buộc"),
//   address_work: Yup.string().required("Địa chỉ làm việc là bắt buộc"),
//   salary: Yup.string().required("Chọn lương là bắt buộc"),
//   type: Yup.string()
//     .typeError("Vui lòng chọn loại công việc")
//     .required("Vui lòng chọn loại công việc"),
//   expired_date_hiring: Yup.string().required("Chọn ngày hết hạn là bắt buộc"),
//   work_category_id: Yup.number()
//     .typeError("Vui lòng chọn lĩnh vực")
//     .required("Tên công việc là bắt buộc"),
//   company_id: Yup.number().required("Công ty là bắt buộc"),
//   province_id: Yup.number()
//     .typeError("Vui lòng chọn tỉnh thành")
//     .required("Vui lòng chọn tỉnh thành"),
// });

const ManageUser = () => {
  const [page, setPage] = useState(1);
  const [idRemove, setIdRemove] = useState<null | number>();
  const userLoggedIn = useAppSelector((state) => state.user.user);

  const { data, loading, refetch } = useQuery<DataQuery>(
    FETCH_ALL_USER_MANAGE,
    {
      variables: {
        page: page,
      },
      fetchPolicy: "network-only",
      nextFetchPolicy: "cache-and-network",
    }
  );

  const [removeUser, { loading: loadingRemoveCompany }] = useMutation<
    {
      removeUser: {
        status: string;
        message: string;
      };
    },
    { id: number }
  >(REMOVE_USER);

  const handleRemoveUser = async (id: number) => {
    setIdRemove(id);
    const { data } = await removeUser({
      variables: {
        id,
      },
    });
    setIdRemove(null);
    if (data?.removeUser.status === "OK") {
      message.success(data?.removeUser.message);
      await refetch();
      return;
    }
    message.error(data?.removeUser.message);
  };

  const companies = data?.getAllUsers;

  const handleChangePaginate = (page: number) => {
    setPage(page);
  };

  const columns: ColumnsType<User> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 100,
      render: (_, record: User) => (
        <div>
          <p>#ID_{record.id}</p>
        </div>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      align: "left",
      key: "email",
    },
    {
      title: "Vai trò",
      dataIndex: "role",
      key: "role",
      width: 230,
      render: (_: number, record: User) => {
        switch (record.role.name) {
          case "hr":
            return "Doanh nghiệp";
          case "admin":
            return "Quản trị";
          default:
            return "Người lao động";
        }
      },
    },
    {
      title: "Thuộc doanh nghiệp",
      dataIndex: "company",
      key: "company",
      width: 230,
      render: (_: number, record: User) => {
        return record.company?.name;
      },
    },
    {
      title: "Hành động",
      dataIndex: "contact",
      key: "contact",
      render: (_, record: User) => {
        return (
          <Space>
            <Link href={`/quan-tri/nguoi-dung/${record.id}`}>
              <Tooltip title="Sửa người dùng">
                <Button className={style.cancelApply}>
                  <Edit width={16} />
                </Button>
              </Tooltip>
            </Link>
            <Tooltip title="Xóa người dùng">
              <Button
                className={style.cancelApply}
                onClick={() => handleRemoveUser(record.id)}
                loading={idRemove === record.id && loadingRemoveCompany}
                danger
              >
                <Trash width={16} />
              </Button>
            </Tooltip>
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
      {loading || !companies ? (
        <LoadingApp />
      ) : (
        <div className="site-statistic-demo-card">
          <h1>Quản lý người dùng</h1>
          <div className={style.actionAdd}>
            <Link href={"/quan-tri/nguoi-dung/them-moi"}>
              <Button type="primary">Thêm mới</Button>
            </Link>
          </div>

          <Row gutter={16}>
            <Col span={24} className={style.statistic}>
              <Table<User>
                columns={columns}
                dataSource={companies.data}
                pagination={{
                  current: companies.paginatorInfo.currentPage,
                  total: companies.paginatorInfo.total,
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

export default ManageUser;
