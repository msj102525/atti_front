import { useState, useEffect } from "react";

export default function FeedSideBar() {
    const [keyword, setKeyword] = useState("");
    const onChange = (event) => setKeyword(event.target.value);

    const searchFeed = (event) => {
        console.log(event.target);
        console.log(keyword);
    }

    // useEffect(() => {
    //     console.log(`effect : ${keyword}`);
    // }, [keyword]);

    return (
        <div className="flex flex-col border-solid border-2 max-w-64 p-2 flex-auto pt-4">
            <div className="searchBox p-1 text-center">
                <p>커뮤니티 사연보기</p>
            </div>
            <div className="flex flex-row p-1">
                <div className="flex-auto w-8" onClick={searchFeed}>
                    <img className="w-full block"
                        src="data:image/svg+xml;base64,PHN2ZyBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGZpbGwtcnVsZT0iZXZlbm9kZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLW1pdGVybGltaXQ9IjIiIHZpZXdCb3g9IjAgMCAyNCAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJtMTUuOTcgMTcuMDMxYy0xLjQ3OSAxLjIzOC0zLjM4NCAxLjk4NS01LjQ2MSAxLjk4NS00LjY5NyAwLTguNTA5LTMuODEyLTguNTA5LTguNTA4czMuODEyLTguNTA4IDguNTA5LTguNTA4YzQuNjk1IDAgOC41MDggMy44MTIgOC41MDggOC41MDggMCAyLjA3OC0uNzQ3IDMuOTg0LTEuOTg1IDUuNDYxbDQuNzQ5IDQuNzVjLjE0Ni4xNDYuMjE5LjMzOC4yMTkuNTMxIDAgLjU4Ny0uNTM3Ljc1LS43NS43NS0uMTkyIDAtLjM4NC0uMDczLS41MzEtLjIyem0tNS40NjEtMTMuNTNjLTMuODY4IDAtNy4wMDcgMy4xNC03LjAwNyA3LjAwN3MzLjEzOSA3LjAwNyA3LjAwNyA3LjAwN2MzLjg2NiAwIDcuMDA3LTMuMTQgNy4wMDctNy4wMDdzLTMuMTQxLTcuMDA3LTcuMDA3LTcuMDA3eiIgZmlsbC1ydWxlPSJub256ZXJvIi8+PC9zdmc+" />
                </div>
                <div className="flex-auto ">
                    <input className="border-solid border-2 w-full" type="text" value={keyword} onChange={onChange} />
                </div>
            </div>
            <div className="text-center pt-5">
                <p>지금 주목 받는 사연</p>
                <ul>
                    {/* {SUBCATEGORIES.map((top5) => (
                        <li key={category} onClick={handleCategoryClick} className="cursor-pointer hover:text-customBrown transition-all duration-150 ease-in-out text-base font-semibold p-1">
                            {category}
                        </li>
                    ))} */}
                </ul>
            </div>
        </div>
    )
}