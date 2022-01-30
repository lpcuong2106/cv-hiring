import React, { useState } from "react";
import { Button, Input, Select } from "antd";
import Search from "antd/lib/input/Search";
import { Province, WorkCategory } from "../../data";
import { useQuery } from "@apollo/client";
import { FETCH_ALL_PROVINCE_CATEGORY } from "../../GraphQL/Query/FetchData";
import { LoadingApp } from "../LoadingApp";
import style from "./style.module.scss";
const { Option } = Select;

interface DataQuery {
  provinces: Province[];
  workCategories: WorkCategory[];
}
interface Props {
  onSearch: (variables: any) => Promise<any>;
}

function SearchJobForm({ onSearch }: Props) {
  const { data, loading } = useQuery<DataQuery>(FETCH_ALL_PROVINCE_CATEGORY);
  const [search, setSearch] = useState({
    name: "",
    provinceId: "",
    categoryId: "",
  });

  const handleSearch = () => {
    onSearch({
      name: search.name,
      provinceId: search.provinceId,
      categoryId: search.categoryId,
      page: 1,
    });
  };
  const handleSearchField = (e: any) => {
    setSearch({
      ...search,
      name: e.target.value,
    });
  };
  const changeProvince = (value: string) => {
    setSearch({
      ...search,
      provinceId: value,
    });
  };
  const changeCategory = (value: string) => {
    setSearch({
      ...search,
      categoryId: value,
    });
  };
  if (loading) {
    return <LoadingApp />;
  }

  return (
    <div>
      <Input
        placeholder="Nhập tên công việc, vị trí, kĩ năng"
        onChange={handleSearchField}
        size="large"
        className={style.searchInput}
        style={{ width: 300 }}
      />
      <Select
        className={style.searchInput}
        placeholder="Chọn ngành nghề"
        onChange={changeCategory}
        value={search.categoryId}
        size="large"
        showSearch
        filterOption={(input: any, option: any) =>
          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
        filterSort={(optionA: any, optionB: any) => {
          if (
            optionA.children === "Chọn ngành nghề" ||
            optionB.children === "Chọn ngành nghề"
          ) {
            return true;
          }
          return optionA.children
            .toLowerCase()
            .localeCompare(optionB.children.toLowerCase());
        }}
      >
        <Option value="">Chọn ngành nghề</Option>
        {data?.workCategories.map((category) => (
          <Option value={category.id}>{category.name}</Option>
        ))}
      </Select>
      <Select
        style={{ width: 200 }}
        showSearch
        placeholder="Chọn tỉnh thành"
        onChange={changeProvince}
        value={search.provinceId}
        size="large"
        className={style.searchInput}
        filterOption={(input: any, option: any) =>
          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
        filterSort={(optionA: any, optionB: any) => {
          if (
            optionA.children === "Chọn tỉnh thành" ||
            optionB.children === "Chọn tỉnh thành"
          ) {
            return true;
          }
          return optionA.children
            .toLowerCase()
            .localeCompare(optionB.children.toLowerCase());
        }}
      >
        <Option value="">Chọn tỉnh thành</Option>
        {data?.provinces.map((province) => (
          <Option value={province.id}>{province.name}</Option>
        ))}
      </Select>
      <Button size="large" type="primary" onClick={handleSearch}>
        Tìm kiếm
      </Button>
    </div>
  );
}

export default SearchJobForm;
