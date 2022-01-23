import { Col, Row } from "antd";
import Link from "next/link";
import React from "react";
import { Province, WorkCategory } from "../../data";
import style from "./style.module.scss";

interface Props {
  data: Province[] | WorkCategory[];
  label: string;
  type: "province" | "categoryJob";
}

export const CategoryJobList = ({ data, label, type }: Props) => {
  const url = type == "province" ? "/province/" : "/category/";

  return (
    <div>
      <div className={style.headerBoxList}>
        <span className={style.title}>{label}</span>
        <span className={style.line}></span>
      </div>
      <ul className={style.listCarrier}>
        <Row>
          {data.map((item) => (
            <Col md={8} key={parseInt(item.id.toString())}>
              <li>
                <Link href={url + item.id}>
                  <a>
                    <span className={style.text}>{item.name}</span>
                  </a>
                </Link>
              </li>
            </Col>
          ))}
        </Row>
      </ul>
    </div>
  );
};
