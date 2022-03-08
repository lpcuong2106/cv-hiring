import { Button, Result } from "antd";
import Link from "next/link";
import Layout from "../../components/layouts";

function NotFound() {
  return (
    <Layout>
      <Result
        status="404"
        title="404"
        subTitle="Xin lỗi, trang bạn tìm hiện không tồn tại."
        extra={
          <Button type="primary">
            <Link href={"/"}>Trở về trang chủ</Link>
          </Button>
        }
      />
    </Layout>
  );
}
export default NotFound;
