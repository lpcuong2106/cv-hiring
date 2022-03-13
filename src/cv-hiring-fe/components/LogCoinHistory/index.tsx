import React, { useState } from "react";
import { Table } from "antd";
import { useQuery } from "@apollo/client";
import { ColumnsType } from "antd/lib/table";
import { FETCH_HISTORY_COIN } from "../../GraphQL/Query/Analyst";
import { PaginatorInfo } from "../../data";
import { useAppSelector } from "../../store/hook";
interface DataQuery {
  historyCoin: {
    data: LogCoinHistory[];
    paginatorInfo: PaginatorInfo;
  };
}

interface LogCoinHistory {
  user_id: number;
  coin_used: number;
  message: string;
  created_at: string;
}
const LogCoinHistory = () => {
  const [page, setPage] = useState(1);
  const userLoggedIn = useAppSelector((state) => state.user.user);

  const { data, loading } = useQuery<DataQuery>(FETCH_HISTORY_COIN, {
    variables: {
      page: page,
      id: userLoggedIn?.id,
    },
    skip: !userLoggedIn?.id,
    fetchPolicy: "network-only",
    nextFetchPolicy: "cache-and-network",
  });

  const historyCoin = data?.historyCoin;

  const handleChangePaginate = (page: number) => {
    setPage(page);
  };

  const columns: ColumnsType<LogCoinHistory> = [
    {
      title: "Nội dung thay đổi coin",
      dataIndex: "message",
      key: "message",
      render: (name: string, record: LogCoinHistory) => {
        return <p>{record.message}</p>;
      },
    },
    {
      title: "Số lượng coin thay đổi",
      dataIndex: "coin_used",
      key: "coin_used",
      width: 230,
      render: (_: number, record: LogCoinHistory) => {
        return record.coin_used;
      },
    },
    {
      title: "Thời gian",
      dataIndex: "contact",
      key: "contact",
      render: (_, record: LogCoinHistory) => {
        return <p>{record.created_at}</p>;
      },
    },
  ];
  return (
    <Table<LogCoinHistory>
      columns={columns}
      dataSource={historyCoin?.data}
      loading={loading}
      pagination={{
        current: historyCoin?.paginatorInfo.currentPage,
        total: historyCoin?.paginatorInfo.total,
        onChange: handleChangePaginate,
      }}
    />
  );
};

export default LogCoinHistory;
