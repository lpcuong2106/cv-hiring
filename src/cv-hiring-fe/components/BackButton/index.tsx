import { Button } from "antd";
import { useRouter } from "next/router";

export default function BackButton() {
  const router = useRouter();

  return <Button onClick={() => router.back()}>Quay lại</Button>;
}
