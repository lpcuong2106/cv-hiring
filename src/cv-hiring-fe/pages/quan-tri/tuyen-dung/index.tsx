import React, { useState, useEffect, useCallback } from "react";
import {
  Row,
  Col,
  Table,
  Button,
  Tag,
  Space,
  Tooltip,
  message,
  Select,
  Input,
} from "antd";
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
import { useAppSelector } from "../../../store/hook";
import moment from "moment";
import { useDebouncedCallback } from "use-debounce";

type PropsMutation = {
  pauseHiring: {
    status: "OK" | "ERROR";
    message: string;
  };
};
const AppliedCVManage = () => {
  const userLoggedIn = useAppSelector((state) => state.user.user);
  const [search, setSearch] = useState({
    name: "",
    status: "",
    page: 1,
  });
  const { data, loading, refetch } = useQuery(FETCH_ALL_WORKJOB_MANAGE, {
    variables: {
      companyId: userLoggedIn?.company?.id,
      name: search.name,
      status: search.status,
      page: search.page,
    },
    skip: !userLoggedIn?.company?.id && userLoggedIn?.role.name !== "admin",
    fetchPolicy: "network-only",
    nextFetchPolicy: "cache-and-network",
  });

  const [pauseHiring, { loading: loadingPause }] = useMutation<
    PropsMutation,
    { id: number }
  >(PAUSE_HIRING_JOB);
  const [resumeHiring, { loading: loadingResume }] =
    useMutation(RESUME_HIRING_JOB);

  const workJobByCompany = data?.workJobByCompany;

  const handleChangePaginate = async (page: number) => {
    setSearch({
      ...search,
      page: page,
    });
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
      render: (_, record: WorkJob) => {
        const date = formatStringToDate(record.expired_date_hiring);
        return (
          <div>
            {/* {!isBefore(date, new Date()) && record.is_open == 1 ? ( */}
            <a href={"/viec-lam/" + record.slug} target="_blank">
              <b>{record.name}</b>
            </a>
            {/* ) : (
              <b>{record.name}</b>
            )} */}

            <p>#ID_{record.id}</p>
          </div>
        );
      },
    },
    {
      title: "Thuộc công ty",
      dataIndex: "company",
      key: "company",
      render: (_, record: WorkJob) => (
        <div>
          <p>{record.company.name}</p>
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
        const date = formatStringToDate(record.expired_date_hiring);

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
      dataIndex: "expired_date_hiring",
      width: 150,
      key: "expired_date_hiring",
      render: (deadline: string) => {
        return <p>{moment(deadline).format("DD-MM-YYYY")}</p>;
      },
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
            {!isExpiredDateHiring(record.expired_date_hiring) &&
              record.is_open === 1 && (
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
            {!isExpiredDateHiring(record.expired_date_hiring) &&
              record.is_open === 0 && (
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

  const handleSearchField = useCallback((value: string) => {
    setSearch({
      ...search,
      name: value,
      page: 1,
    });
  }, []);

  const changeCategory = (value: string) => {
    setSearch({
      ...search,
      status: value,
      page: 1,
    });
  };

  return (
    <LayoutAdmin>
      <Head>
        <title>Kết nối lao động việt | Quản trị </title>
      </Head>

      <div className="site-statistic-demo-card">
        <h1>Tin tuyển dụng</h1>
        {userLoggedIn?.role.name !== "admin" && (
          <div className={style.actionAdd}>
            <Link href={"/quan-tri/tuyen-dung/them-moi"}>
              <Button type="primary">Thêm mới</Button>
            </Link>
          </div>
        )}

        <Row gutter={16}>
          <Col span={24} className={style.statistic}>
            <Table<WorkJob>
              columns={columns}
              loading={loading || !workJobByCompany}
              dataSource={workJobByCompany?.data}
              title={() => {
                return (
                  <Row className={style.searchWrapper}>
                    <Col md={6}>
                      <Input
                        placeholder="Nhập tên công việc..."
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
                        placeholder="Trạng thái đăng tuyển"
                        onChange={changeCategory}
                        value={search.status}
                        size="large"
                      >
                        <Select.Option value="">
                          Trạng thái đăng tuyển
                        </Select.Option>
                        <Select.Option value="stopHiring">
                          Dừng đăng tuyển
                        </Select.Option>
                        <Select.Option value="hiring">
                          Đang đăng tuyển
                        </Select.Option>
                        <Select.Option value="expire_hiring">
                          Hết hạn tuyển dụng
                        </Select.Option>
                      </Select>
                    </Col>
                  </Row>
                );
              }}
              pagination={{
                current: workJobByCompany?.paginatorInfo.currentPage,
                total: workJobByCompany?.paginatorInfo.total,
                onChange: handleChangePaginate,
              }}
            />
          </Col>
        </Row>
      </div>
    </LayoutAdmin>
  );
};

export default AppliedCVManage;
