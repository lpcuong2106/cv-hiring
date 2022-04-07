import React, { useState } from "react";
import { Button, Input, Select, Row, Col } from "antd";
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
type Search = {
  name: string;
  provinceId: string;
  categoryId: string;
  rating: string;
  requirementGender: string;
  type: string;
};
interface Props {
  search: Search;
  setSearch: any;
}

function SearchJobForm({ search, setSearch }: Props) {
  const { data } = useQuery<DataQuery>(FETCH_ALL_PROVINCE_CATEGORY);

  const handleSearchField = (e: any) => {
    setSearch({
      ...search,
      name: e.target.value,
      page: 1,
    });
  };
  const changeProvince = (value: string) => {
    setSearch({
      ...search,
      provinceId: value,
      page: 1,
    });
  };
  const changeCategory = (value: string) => {
    setSearch({
      ...search,
      categoryId: value,
      page: 1,
    });
  };
  const changeRating = (value: string) => {
    setSearch({
      ...search,
      rating: value,
      page: 1,
    });
  };
  const changeRequirementGender = (value: string) => {
    setSearch({
      ...search,
      requirementGender: value,
      page: 1,
    });
  };
  const changeType = (value: string) => {
    setSearch({
      ...search,
      type: value,
      page: 1,
    });
  };

  return (
    <Row className={style.searchWrapper}>
      <Col md={24}>
        <Input
          placeholder="Nhập tên công việc, vị trí, kĩ năng"
          onChange={handleSearchField}
          size="large"
          className={style.searchInput}
        />
      </Col>
      <Col md={24}>
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
            <Option value={category.id} key={category.id}>
              {category.name}
            </Option>
          ))}
        </Select>
      </Col>
      <Col md={24}>
        <Select
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
            <Option value={province.id} key={province.id}>
              {province.name}
            </Option>
          ))}
        </Select>
      </Col>
      <Col md={24}>
        <Select
          placeholder="Sắp xếp theo đánh giá"
          onChange={changeRating}
          value={search.rating}
          size="large"
          className={style.searchInput}
        >
          <Option value="">Sắp xếp theo đánh giá</Option>
          <Option value="desc">Từ cao đến thấp</Option>
          <Option value="asc">Từ thấp đến cao</Option>
        </Select>
      </Col>
      <Col md={24}>
        <Select
          showSearch
          placeholder="Hình thức làm việc"
          onChange={changeType}
          value={search.type}
          size="large"
          className={style.searchInput}
        >
          <Option value="">Hình thức làm việc</Option>
          <Option value="full-time">Toàn thời gian</Option>
          <Option value="part-time">Bán thời gian</Option>
        </Select>
      </Col>
      <Col md={24}>
        <Select
          placeholder="Yêu cầu giới tính"
          onChange={changeRequirementGender}
          value={search.requirementGender}
          size="large"
          className={style.searchInput}
        >
          <Option value="">Yêu cầu giới tính</Option>
          <Option value="Yêu cầu giới tính nam">Nam</Option>
          <Option value="Yêu cầu giới tính nữ">Nữ</Option>
        </Select>
      </Col>
    </Row>
  );
}

export default SearchJobForm;
