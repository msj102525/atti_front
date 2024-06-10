import Link from 'next/link';
import { usePathname } from "next/navigation";

export default function Navigation() {
    const params = usePathname();
    console.log(`Navigation.jsx Path : ${params}`);

    return (
        <div className={`p-2`}>
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-lg font-bold">
                    <Link href={"/"}>
                        <div className="w-32">
                            <img className="w-full" src="/common/header/attiLogo.png" alt="Atti Logo" />
                        </div>
                    </Link>
                </div>
                <nav className="space-x-4">
                    <ul className="flex space-x-4">
                        <li className={` hover:text-customBrown transition-all duration-150 ease-in-out text-base font-semibold p-1`}>
                            <Link href={"/feed"}>커뮤니티</Link>
                        </li>
                        <li className={` hover:text-customBrown transition-all duration-150 ease-in-out text-base font-semibold p-1`}>
                            <Link href="#about">전문가 찾기</Link>
                        </li>
                        <li className={` hover:text-customBrown transition-all duration-150 ease-in-out text-base font-semibold p-1`}>
                            <Link href="#services">오늘 한 줄</Link>
                        </li>
                        <li className={` hover:text-customBrown transition-all duration-150 ease-in-out text-base font-semibold p-1`}>
                            <Link href="#contact">AI 서비스</Link>
                        </li>
                        <li className={` hover:text-customBrown transition-all duration-150 ease-in-out text-base font-semibold p-1`}>
                            <Link href="#contact">공지사항</Link>
                        </li>
                        <li className={` hover:text-customBrown transition-all duration-150 ease-in-out text-base font-semibold p-1`}>
                            <Link href="#contact">FAQ</Link>
                        </li>
                        <li className={` hover:text-customBrown transition-all duration-150 ease-in-out text-base font-semibold p-1`}>
                            <Link href="#contact">문의하기</Link>
                        </li>
                    </ul>
                </nav>
                <div>
                    <li className={` hover:text-customBrown transition-all duration-150 ease-in-out text-base font-semibold`}>
                        <Link href={"signup/"}>로그인</Link>
                    </li>
                </div>
            </div>
        </div>
    );
}
