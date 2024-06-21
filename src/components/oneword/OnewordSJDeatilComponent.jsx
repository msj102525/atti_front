import { useState } from 'react';
import dynamic from 'next/dynamic';
import Button from "../common/Button";
import { useRouter } from 'next/router';

const OnewordSJDeatilComponent = (data) => {
    console.log(data);
    console.log("번호 : " + data.data.owsjNum);

    const router = useRouter();
    const goBack = () => {
      router.back(); // 이전 페이지로 이동
    };
  
    const [comments, setComments] = useState([]);

    const addComment = () => {
        // 여기서 새 댓글을 추가하는 로직을 구현합니다.
        // 예를 들어, 임시로 현재 시간을 댓글 내용으로 넣는 예시입니다.
        const newComment = {
            id: comments.length + 1,
            content: `새 댓글 ${new Date().toLocaleString()}`
        };
        setComments([...comments, newComment]);
    };

    return (
        <div className="border max-w-screen-lg p-4 mx-auto">
            <div className="after:content-[''] after:bg-gray-300 after:block after:w-full after:h-[2px] after:left-0 after-bottom-0">
                <div className="flex p-4 gap-x-2">
                    <p>홈화면&gt;</p>
                    <p>오늘 한 줄&gt;</p>
                </div>
            </div>
            <div className="border p-4 rounded">
                <div className="cursor-pointer">
                    <h2 className="text-lg font-bold">{data.data.owsjNum}</h2>
                    <h2 className="text-lg font-bold">{data.data.owsjSubject}</h2>
                    <p className="mt-2 text-sm text-gray-600">{data.data.owsjWriter}</p>
                </div>
            </div>

            {/* 댓글 추가 버튼 */}
            <button onClick={addComment} className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
                추가
            </button>

            {/* 댓글 목록 */}
            <div className="mt-4">
                <h3 className="text-lg font-bold mb-2">댓글</h3>
                {comments.length === 0 ? (
                    <p>댓글이 없습니다.</p>
                ) : (
                    <ul>
                        {comments.map(comment => (
                            <li key={comment.id} className="border p-2 mb-2">
                                <p>{comment.content}</p>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <br></br>
            <br></br>
            <button onClick={goBack}>돌아가기</button>

        </div>
    )
}

export default OnewordSJDeatilComponent;