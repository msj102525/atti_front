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

export default function FeedNav({ getData, user }) {
    const path = usePathname();
    const [category, setCategory] = useState("");
    const [subCategory, setSubCategory] = useState("");
    const show = path !== "/feed/create";


    let loginUser = {
        userId: user.userId,
        userProfileUrl: user.userProfileUrl
    }
    

    const handleCategoryClick = (event) => {
        const clickedCategory = event.target.textContent;
        setCategory(clickedCategory);
    };

    const subHandleCategoryClick = (event) => {
        const clickedCategory = event.target.textContent;
        setSubCategory(clickedCategory);
    };

    useEffect(() => {
        getData({ category, subCategory });
    }, [category, subCategory]);

    return (
        <div className="text-black after:content-[''] after:bg-gray-300 after:block after:w-full after:h-[1px] after:left-0 after-bottom-0 flex-auto sticky top-[7.65rem] bg-white">
            <div className="">
                <div className="container mx-auto flex-row items-center">
                    <div className="space-x-7 p-4">
                        <ul className="flex space-x-10">
                            {CATEGORIES.map((categoryItem) => (
                                <li
                                    key={categoryItem}
                                    onClick={handleCategoryClick}
                                    className={`cursor-pointer hover:text-customBrown transition-all duration-150 ease-in-out text-base font-semibold p-1 text-center ${path === "/feed/create" && categoryItem === "모든 사연" ? "hidden" : ""}`}
                                >
                                    {categoryItem}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="p-4" style={{ display: show ? "block" : "none" }}>
                        <ul className="flex space-x-10">
                            {SUBCATEGORIES.map((categoryItem) => (
                                <li
                                    key={categoryItem}
                                    onClick={subHandleCategoryClick}
                                    className="cursor-pointer hover:text-customBrown transition-all duration-150 ease-in-out text-base font-semibold p-1"
                                >
                                    {categoryItem}
                                </li>
                            ))}
                            <li className={`${loginUser.userId !== "" ? "" : "hidden"} pl-96 cursor-pointer hover:text-customBrown transition-all duration-150 ease-in-out text-base font-semibold p-1`}>
                                <Link href="/feed/create">글쓰기</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

