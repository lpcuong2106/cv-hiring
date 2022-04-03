import React, { useCallback, useState } from "react";
import { Row, Col, message, Table, Button, Space, Tooltip, Input } from "antd";
import style from "./style.module.scss";
import Head from "next/head";
import { useMutation, useQuery } from "@apollo/client";
import * as Yup from "yup";
import LayoutAdmin from "../../../components/layouts/LayoutAdmin";
import { LoadingApp } from "../../../components/LoadingApp";
import Link from "next/link";
import { Company, PaginatorInfo } from "../../../data";
import { ColumnsType } from "antd/lib/table";
import { FETCH_ALL_COMPANY_MANAGE } from "../../../GraphQL/Query/Comapany";
import { Edit } from "styled-icons/boxicons-regular";
import { Trash } from "styled-icons/bootstrap";
import { REMOVE_COMPANY } from "../../../GraphQL/Mutation/RemoveCompany";
interface DataQuery {
  getAllCompany: {
    data: Company[];
    paginatorInfo: PaginatorInfo;
  };
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

const ManageCompany = () => {
  const [search, setSearch] = useState({
    name: "",
    page: 1,
  });
  const { data, loading, refetch } = useQuery<DataQuery>(
    FETCH_ALL_COMPANY_MANAGE,
    {
      variables: {
        page: search.page,
        name: search.name,
      },
      fetchPolicy: "network-only",
      nextFetchPolicy: "cache-and-network",
    }
  );
  const [removeCompany, { loading: loadingRemoveCompany }] = useMutation<
    {
      removeCompany: {
        status: string;
        message: string;
      };
    },
    { id: number }
  >(REMOVE_COMPANY);

  const handleRemoveCompany = async (id: number) => {
    const { data } = await removeCompany({
      variables: {
        id,
      },
    });
    if (data?.removeCompany.status === "OK") {
      message.success(data?.removeCompany.message);
      await refetch();
      return;
    }
    message.error(data?.removeCompany.message);
  };

  const companies = data?.getAllCompany;

  const handleChangePaginate = (page: number) => {
    setSearch({
      ...search,
      page: page,
    });
  };

  const columns: ColumnsType<Company> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 100,
      render: (_, record: Company) => (
        <div>
          <p>#ID_{record.id}</p>
        </div>
      ),
    },
    {
      title: "Tên công ty",
      dataIndex: "name",
      // width: 0,
      align: "center",
      key: "name",
      render: (name: string, record: Company) => {
        return (
          <a href={"/cong-ty/" + record.slug} target="_blank">
            <div className={style.logoItem}>
              <img
                src={record.logo}
                onError={({ currentTarget }) => {
                  console.log("chay error");
                  currentTarget.onerror = null; // prevents looping
                  currentTarget.src = "/company-default.svg";
                }}
              />
              {name}
            </div>
          </a>
        );
      },
    },
    {
      title: "Số lượng công việc đang tuyển",
      dataIndex: "amount_job_hiring",
      key: "amount_job_hiring",
      width: 230,
      render: (_: number, record: Company) => {
        return record.amount_job_hiring;
      },
    },
    {
      title: "Hành động",
      dataIndex: "contact",
      key: "contact",
      render: (_, record: Company) => {
        return (
          <Space>
            <Link href={`/quan-tri/cong-ty/${record.id}`}>
              <Tooltip title="Sửa công ty">
                <Button className={style.cancelApply}>
                  <Edit width={16} />
                </Button>
              </Tooltip>
            </Link>
            <Tooltip title="Xóa công ty">
              <Button
                className={style.cancelApply}
                onClick={() => handleRemoveCompany(record.id)}
                loading={loadingRemoveCompany}
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
        <h1>Danh sách công ty</h1>

        <div className={style.actionAdd}>
          <Link href={"/quan-tri/cong-ty/them-moi"}>
            <Button type="primary">Thêm mới</Button>
          </Link>
        </div>

        <Row gutter={16}>
          <Col span={24} className={style.statistic}>
            <Table<Company>
              columns={columns}
              loading={loading || !companies}
              dataSource={companies?.data}
              title={() => {
                return (
                  <Row className={style.searchWrapper}>
                    <Col md={6}>
                      <Input
                        placeholder="Nhập tên công ty..."
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

export default ManageCompany;
