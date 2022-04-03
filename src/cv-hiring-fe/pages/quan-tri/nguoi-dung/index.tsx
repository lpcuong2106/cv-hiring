import React, { useCallback, useState } from "react";
import {
  Row,
  Col,
  message,
  Table,
  Button,
  Space,
  Tooltip,
  Input,
  Select,
} from "antd";
import style from "./style.module.scss";
import Head from "next/head";
import { useMutation, useQuery } from "@apollo/client";
import LayoutAdmin from "../../../components/layouts/LayoutAdmin";
import Link from "next/link";
import { PaginatorInfo, User } from "../../../data";
import { ColumnsType } from "antd/lib/table";
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
  const [idRemove, setIdRemove] = useState<null | number>();

  const [search, setSearch] = useState({
    name: "",
    role: "",
    page: 1,
  });
  const { data, loading, refetch } = useQuery<DataQuery>(
    FETCH_ALL_USER_MANAGE,
    {
      variables: {
        page: search.page,
        name: search.name,
        role: search.role,
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
    setSearch({
      ...search,
      page: page,
    });
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
  const changeCategory = (value: string) => {
    setSearch({
      ...search,
      role: value,
      page: 1,
    });
  };
  const handleSearchField = useCallback((value: string) => {
    setSearch({
      ...search,
      name: value,
      page: 1,
    });
  }, []);
  return (
    <LayoutAdmin>
      <Head>
        <title>Kết nối lao động việt | Quản trị </title>
      </Head>

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
              loading={loading || !companies}
              dataSource={companies?.data}
              title={() => {
                return (
                  <Row className={style.searchWrapper}>
                    <Col md={6}>
                      <Input
                        placeholder="Nhập Email..."
                        onChange={(e) => handleSearchField(e.target.value)}
                        size="large"
                        value={search.name}
                        className={style.searchInput}
                        style={{ width: 300 }}
                      />
                    </Col>
                    <Col md={6}>
                      <Select
                        className={style.searchInput}
                        placeholder="Chọn vai trò"
                        onChange={changeCategory}
                        value={search.role}
                        size="large"
                        style={{ marginLeft: 20 }}
                      >
                        <Select.Option value="">Vai trò</Select.Option>
                        <Select.Option value="user">Người dùng</Select.Option>
                        <Select.Option value="hr">HR</Select.Option>
                        <Select.Option value="admin">Admin</Select.Option>
                      </Select>
                    </Col>
                  </Row>
                );
              }}
              pagination={{
                current: companies?.paginatorInfo.currentPage,
                total: companies?.paginatorInfo.total,
                onChange: handleChangePaginate,
              }}
            />
          </Col>
        </Row>
      </div>
    </LayoutAdmin>
  );
};

export default ManageUser;
