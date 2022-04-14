import { Rate, Tag } from "antd";
import Link from "next/link";
import React from "react";
import style from "./style.module.scss";
import { format, parse } from "date-fns";
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
  avgReview?: number;
}

function JobItem({
  logoUrl,
  title,
  companyName,
  deadlineDate,
  salary,
  provinceName,
  updatedAt,
  companySlug,
  slug,
  avgReview,
}: Props) {
  console.log(updatedAt);
  return (
    <div className={style.jobItem}>
      <div className={style.avatar}>
        <img
          src={logoUrl || "/company-default.svg"}
          onError={({ currentTarget }) => {
            currentTarget.onerror = null; // prevents looping
            currentTarget.src = "/company-default.svg";
          }}
        />
      </div>
      <div className={style.jobInfo}>
        <div className={style.info}>
          <p className={style.title}>
            <Link href={`/viec-lam/${slug}`}>
              <a>{title}</a>
            </Link>
          </p>
          <p className={style.company}>
            <Link href={`/cong-ty/${companySlug}`}>
              <a>{companyName}</a>
            </Link>
          </p>

          <p className={style.rating}>
            <Rate value={avgReview ?? 0} disabled />
          </p>

          <Tag color="success">{salary} (tr/tháng)</Tag>
          <Tag color="orange">{provinceName}</Tag>
        </div>
        <div className={style.action}>
          <p className={style.alignRight}>
            Hạn nộp:{" "}
            {format(
              parse(deadlineDate, "yyyy-MM-dd HH:m:s", new Date()),
              "dd-MM-yyyy"
            )}
          </p>
        </div>
      </div>
    </div>
  );
}

export default JobItem;
