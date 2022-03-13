import { Tag } from "antd";
import Link from "next/link";
import React from "react";
import style from "./style.module.scss";
import { Heart } from "@styled-icons/bootstrap/Heart";
import { formatDistance, format, parse } from "date-fns";
import vi from "date-fns/locale/vi";
interface Props {
  logoUrl: string;
  title: string;
  companyName: string;
  deadlineDate: string;
  salary: string;
  provinceName: string;
  slug: string;
  updatedAt: string;
  companySlug: string;
}

function NewWorkJobItem({
  logoUrl,
  title,
  companyName,
  deadlineDate,
  salary,
  provinceName,
  updatedAt,
  companySlug,
  slug,
}: Props) {
  return (
    <div className={style.jobItem}>
      <Link href={`/viec-lam/${slug}`}>
        <div className={style.info}>
          <p className={style.title}>
            <a>{title}</a>
          </p>
          <p className={style.company}>
            <Link href={`/cong-ty/${companySlug}`}>
              <a>{companyName}</a>
            </Link>
          </p>
          <Tag color="orange">{provinceName}</Tag>
          <Tag color="success">{salary} (tr/tháng)</Tag>
          <Tag color="magenta">
            {format(
              parse(deadlineDate, "yyyy-MM-dd HH:m:s", new Date()),
              "dd-MM-yyyy"
            )}
          </Tag>
        </div>
      </Link>
    </div>
  );
}

export default NewWorkJobItem;
