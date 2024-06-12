// next/router : 현재 경로의 정보를 들고 올 수 있는 모듈
import { useRouter } from "next/router";

export default function DoctorDetail() {
  const router = useRouter();
  // 동적 라우팅에서 경로 이름
  const { id } = router.query;

  return <p>닥터의 아이디는?: {id}</p>;
}
