import React from "react";
import style from "./style.module.scss";

function NotFoundJob() {
  return (
    <div className={style.notFound}>
      <p>Không tìm thấy việc làm phù hợp với yêu cầu tìm kiếm của bạn</p>
    </div>
  );
}

export default NotFoundJob;
