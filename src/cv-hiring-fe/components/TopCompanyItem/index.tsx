import { Col, Row } from "antd";
import Link from "next/link";
import React from "react";
import { Company } from "../../data";
import style from "./style.module.scss";

interface Props {
  companyTop: Company[];
}

export const TopCompanyItem = ({ companyTop }: Props) => {
  return (
    <Row className={style.topCompany}>
      {companyTop.map((company) => (
        <Col md={8} key={company.id}>
          <Link href={"/cong-ty/" + company.slug}>
            <a>
              <div className={style.companyBox}>
                <img
                  src={company.logo}
                  onError={({ currentTarget }) => {
                    currentTarget.onerror = null; // prevents looping
                    currentTarget.src = "/company-default.svg";
                  }}
                />
                <p>{company.name}</p>
                <p>{company.amount_job_hiring} vị trí đang tuyển</p>
              </div>
            </a>
          </Link>
        </Col>
      ))}
    </Row>
  );
};
