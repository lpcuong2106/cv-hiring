import React, { useCallback, useState } from "react";
import { Row, Col, Table, Button, Space, Tooltip, message, Input } from "antd";
import style from "./style.module.scss";
import Head from "next/head";
import { useMutation, useQuery } from "@apollo/client";
import LayoutAdmin from "../../../components/layouts/LayoutAdmin";
import { LoadingApp } from "../../../components/LoadingApp";
import Link from "next/link";
import { User, WorkCategory } from "../../../data";
import { ColumnsType } from "antd/lib/table";
import { useAppSelector } from "../../../store/hook";
import { Edit } from "styled-icons/boxicons-regular";
import { FETCH_ALL_CATEGORY } from "../../../GraphQL/Query/FetchData";
import { Trash } from "styled-icons/bootstrap";
import { REMOVE_WORKCATEGORY } from "../../../GraphQL/Mutation/RemoveCategory";
interface DataQuery {
  workCategories: WorkCategory[];
}

const ManageWorkCategory = () => {
  const [search, setSearch] = useState({
    name: "",
    page: 1,
  });
  const userLoggedIn = useAppSelector((state) => state.user.user);

  const { data, loading, refetch } = useQuery<DataQuery>(FETCH_ALL_CATEGORY, {
    variables: {
      companyId: userLoggedIn?.company?.id,
      name: search.name,
      page: search.page,
    },
    fetchPolicy: "network-only",
    nextFetchPolicy: "cache-and-network",
  });

  const [removeWorkCategory, { loading: loadingRemoveCategory }] =
    useMutation(REMOVE_WORKCATEGORY);

  const workCategories = data?.workCategories;

  const handleWorkCategory = async (id: string) => {
    const { data } = await removeWorkCategory({
      variables: {
        id,
      },
    });
    if (data?.removeCategory.status === "OK") {
      message.success(data?.removeCategory.message);
      await refetch();
      return;
    }
    message.error(data?.removeCategory.message);
  };

  const columns: ColumnsType<WorkCategory> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 100,
      render: (_, record: WorkCategory) => <p>#ID_{record.id}</p>,
    },

    {
      title: "Tên ngành",
      dataIndex: "name",
      align: "left",
      key: "name",
      render: (_: string, record: WorkCategory) => {
        return (
          <a>
            <p>{record.name}</p>
          </a>
        );
      },
    },
    {
      title: "Số lượng công việc",
      dataIndex: "amountJobHiring",
      align: "left",
      key: "amountJobHiring",
      render: (_: string, record: WorkCategory) => {
        return (
          <a>
            <p>{record.workJob.length}</p>
          </a>
        );
      },
    },
    {
      title: "Hành động",
      dataIndex: "contact",
      key: "contact",
      render: (_, record: WorkCategory) => {
        return (
          <Space>
            <Link href={`/quan-tri/nganh-nghe/${record.id}`}>
              <Tooltip title="Sửa ngành nghề">
                <Button className={style.cancelApply}>
                  <Edit width={16} />
                </Button>
              </Tooltip>
            </Link>
            <Tooltip title="Xóa ngành nghề">
              <Button
                className={style.cancelApply}
                onClick={() => handleWorkCategory(record.id)}
                loading={loadingRemoveCategory}
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
        <h1>Quản lý ngành nghề</h1>
        <div className={style.actionAdd}>
          <Link href={"/quan-tri/nganh-nghe/them-moi"}>
            <Button type="primary">Thêm mới</Button>
          </Link>
        </div>

        <Row gutter={16}>
          <Col span={24} className={style.statistic}>
            <Table<WorkCategory>
              columns={columns}
              dataSource={workCategories}
              loading={loading || !workCategories}
              title={() => {
                return (
                  <Row className={style.searchWrapper}>
                    <Col md={6}>
                      <Input
                        placeholder="Nhập tên ngành nghề..."
                        onChange={(e) => handleSearchField(e.target.value)}
                        size="large"
                        value={search.name}
                        className={style.searchInput}
                        style={{ width: 300 }}
                      />
                    </Col>
                  </Row>
                );
              }}
            />
          </Col>
        </Row>
      </div>
    </LayoutAdmin>
  );
};

export default ManageWorkCategory;
