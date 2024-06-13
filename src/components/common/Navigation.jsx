import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navigation() {
  const params = usePathname();
  console.log(`Navigation.jsx Path : ${params}`);

  const onChenge=()=>{
    
  }
  return (
    <div className={`p-2`}>
      <div className="container flex items-center justify-between mx-auto">
        <div className="text-lg font-bold">
          <Link href={"/"}>
            <div className="w-32">
              <img
                className="w-full"
                src="/common/header/attiLogo.png"
                alt="Atti Logo"
              />
            </div>
          </Link>
        </div>
        <nav className="space-x-4">
          <ul className="flex space-x-4">
            <li
              className={` hover:text-customBrown transition-all duration-150 ease-in-out text-base font-semibold p-1`}
            >
              <Link href={"/feed"}>커뮤니티</Link>
            </li>
            <li
              className={` hover:text-customBrown transition-all duration-150 ease-in-out text-base font-semibold p-1`}
            >
              <Link href="/doctor">전문가 찾기</Link>
            </li>
            <li
              className={` hover:text-customBrown transition-all duration-150 ease-in-out text-base font-semibold p-1`}
            >
              <Link href="#services">오늘 한 줄</Link>
            </li>
            <li
              className={` hover:text-customBrown transition-all duration-150 ease-in-out text-base font-semibold p-1`}
            >
              <Link href="#contact">AI 서비스</Link>
            </li>
            <li
              className={` hover:text-customBrown transition-all duration-150 ease-in-out text-base font-semibold p-1`}
            >
              <Link href="/board/boardList">공지사항</Link>
            </li>
            <li
              className={` hover:text-customBrown transition-all duration-150 ease-in-out text-base font-semibold p-1`}
            >
              <Link href="/faq/faqList">FAQ</Link>
            </li>
            <li
              className={` hover:text-customBrown transition-all duration-150 ease-in-out text-base font-semibold p-1`}
            >
              <Link href="#contact">문의하기</Link>
            </li>
          </ul>
        </nav>
        <div>
          <li
            className={` hover:text-customBrown transition-all duration-150 ease-in-out text-base font-semibold`}
          >
            <Link href={"login/"}>로그인</Link>
          </li>
          <li className={` hover:text-customBrown transition-all duration-150 ease-in-out text-base font-semibold`}
          >
          <Link href={"signup/"}>회원가입</Link>
          </li>
        </div>
      </div>
    </div>
  );
}
