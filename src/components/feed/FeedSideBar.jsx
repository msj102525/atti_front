import { useState, useEffect } from "react";
import { top5FeedContent } from "@/api/feed/feed";
import Link from "next/link";

export default function FeedSideBar() {
    const [top5FeedContentResult, setTop5FeedContentResult] = useState([]);

    const TOP5FEEDCONTENT = [];

    for (let feedContent of top5FeedContentResult) {
        TOP5FEEDCONTENT.push(feedContent.feedContent);
    }

    const searchFeed = (event) => {
        console.log(event.target.value);
    }


    useEffect(() => {
        top5FeedContent()
            .then((res) => {
                // console.log("Top 5 feeds:", res);
                setTop5FeedContentResult(res);
            })
            .catch((err) => {
                console.error("Error fetching top 5 feeds:", err);
            });
    }, []);


    return (
        <div className="flex flex-col border-solid border-2 w-64 p-2 flex-auto pt-4 sticky top-36">
            <div className="searchBox p-1 text-center text-xl">
                <p>커뮤니티 사연보기</p>
            </div>
            <div className="flex flex-row p-1">
                <div className="flex-auto w-8 hover-grow" onClick={searchFeed}>
                    <img className="w-full block cursor-pointer"
                        src="data:image/svg+xml;base64,PHN2ZyBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGZpbGwtcnVsZT0iZXZlbm9kZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLW1pdGVybGltaXQ9IjIiIHZpZXdCb3g9IjAgMCAyNCAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJtMTUuOTcgMTcuMDMxYy0xLjQ3OSAxLjIzOC0zLjM4NCAxLjk4NS01LjQ2MSAxLjk4NS00LjY5NyAwLTguNTA5LTMuODEyLTguNTA5LTguNTA4czMuODEyLTguNTA4IDguNTA5LTguNTA4YzQuNjk1IDAgOC41MDggMy44MTIgOC41MDggOC41MDggMCAyLjA3OC0uNzQ3IDMuOTg0LTEuOTg1IDUuNDYxbDQuNzQ5IDQuNzVjLjE0Ni4xNDYuMjE5LjMzOC4yMTkuNTMxIDAgLjU4Ny0uNTM3Ljc1LS43NS43NS0uMTkyIDAtLjM4NC0uMDczLS41MzEtLjIyem0tNS40NjEtMTMuNTNjLTMuODY4IDAtNy4wMDcgMy4xNC03LjAwNyA3LjAwN3MzLjEzOSA3LjAwNyA3LjAwNyA3LjAwN2MzLjg2NiAwIDcuMDA3LTMuMTQgNy4wMDctNy4wMDdzLTMuMTQxLTcuMDA3LTcuMDA3LTcuMDA3eiIgZmlsbC1ydWxlPSJub256ZXJvIi8+PC9zdmc+" />
                </div>
                <div className="flex-auto ">
                    <input className="border-solid border-2 w-full" type="text" />
                </div>
            </div>
            <div className="text-xl text-center pt-2">
                <p className="py-2">지금 주목 받는 사연</p>
                <ul>
                    {top5FeedContentResult.map((feed, idx) => {
                        const sanitizedContent = feed.feedContent.replace(/<\/?[^>]+(>|$)/g, " ");
                        return (
                            <li
                                key={idx}
                                className="hover-grow cursor-pointer hover:text-customBrown transition-all duration-150 ease-in-out text-start font-semibold p-1 pl-6 truncate text-slate-500 text-lg"
                            >
                                <Link href={`/feed/${feed.feedNum}`}>
                                    {idx + 1}. {sanitizedContent}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    )
}