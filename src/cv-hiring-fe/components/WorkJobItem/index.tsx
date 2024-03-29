import { Col, Row } from "antd";
import Link from "next/link";
import React from "react";
import { Company } from "../../data";
import style from "./style.module.scss";

interface Props {
  companyTop: Company[];
}

export const WorkJobItem = ({ companyTop }: Props) => {
  return (
    <Row className={style.topCompany}>
      {companyTop.map((company) => (
        <Col md={8} sm={12} xs={24} key={company.id}>
          <Link href={"/company/" + company.slug}>
            <a>
              <div className={style.companyBox}>
                <img
                  src={company.logo}
                  style={{ width: "63px", objectFit: "contain" }}
                />
                <p>{company.amount_job_hiring} vị trí đang tuyển</p>
              </div>
            </a>
          </Link>
        </Col>
      ))}
    </Row>
  );
};
