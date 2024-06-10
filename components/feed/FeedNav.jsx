import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const CATEGORIES = [
    "모든 사연",
    "일반 고민",
    "취업/진로",
    "연애",
    "대인관계",
    "외모",
    "정신건강",
    "자아/성격"
];

const SUBCATEGORIES = [
    "최신순",
    "전문 답변",
    "공감순"
];

export default function FeedNav({ getData }) {
    const path = usePathname();
    let show = true;
    if (path === "/feed/create") {
        show = false;
    }

    const handleCategoryClick = (event) => {
        const clickedCategory = event.target.textContent;
        setCategory(clickedCategory);
    };
    const [category, setCategory] = useState("모든 사연");

    console.log(`FeedNav.jsx: ${category}`);

    const postData = (data) => {
        getData(data);
    };

    useEffect(() => {
        postData(category);
    }, [category]);

    return (
        <div className="text-black relative after:content-[''] after:block after:w-full after:h-px after:bg-gray-400 flex-auto">
            <div className="pl-6">
                <div className="container mx-auto flex-row items-center pl-60">
                    <div className="space-x-7 p-4">
                        <ul className="flex space-x-10">
                            {CATEGORIES.map((category) => (
                                <li key={category} onClick={handleCategoryClick} className="cursor-pointer hover:text-customBrown transition-all duration-150 ease-in-out text-base font-semibold p-1 text-center">
                                    {category}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="p-4" style={{ display: show ? "block" : "none" }}>
                        <ul className="flex space-x-10">
                            {SUBCATEGORIES.map((category) => (
                                <li key={category} onClick={handleCategoryClick} className="cursor-pointer hover:text-customBrown transition-all duration-150 ease-in-out text-base font-semibold p-1">
                                    {category}
                                </li>
                            ))}
                            <li className="pl-96 cursor-pointer hover:text-customBrown transition-all duration-150 ease-in-out text-base font-semibold p-1">
                                <Link href="/feed/create">글쓰기</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}