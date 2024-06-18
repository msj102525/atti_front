import Link from "next/link";
import { usePathname } from "next/navigation";
import AuthStatus from "../user/AuthStore";

export default function Navigation() {
  const params = usePathname();
  console.log(`Navigation.jsx Path : ${params}`);

  const links = [
    { href: "/feed", label: "커뮤니티" },
    { href: "/doctor", label: "전문가 찾기" },
    { href: "/oneword/OnewordSubject", label: "오늘 한 줄" },
    { href: "/ai", label: "AI 서비스" },
    { href: "/board/boardList", label: "공지사항" },
    { href: "/faq/faq", label: "FAQ" },
    { href: "#contact", label: "문의하기" },
  ];

  return (
    <div className="p-2">
      <div className="container flex items-center justify-between mx-auto">
        <div className="text-lg font-bold">
          <Link href="/">
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
            {links.map((link) => (
              <li
                key={link.href}
                className="hover:text-customBrown transition-all duration-150 ease-in-out text-base font-semibold p-1"
              >
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <li className="hover:text-customBrown transition-all duration-150 ease-in-out text-base font-semibold">
            <AuthStatus />
          </li>
          <li className="hover:text-customBrown transition-all duration-150 ease-in-out text-base font-semibold">
            <Link href="signup/">회원가입</Link>
          </li>
        </div>
      </div>
    </div>
  );
}
