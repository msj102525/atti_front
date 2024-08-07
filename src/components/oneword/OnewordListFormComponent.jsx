import React, { useEffect } from 'react';
import { observer } from "mobx-react";
import { useQuery, useMutation, useQueryClient } from 'react-query';
import OnewordSubjectListComponent from "@/components/oneword/OnewordSubjectListComponent";
import { handleAxiosError } from "@/api/errorAxiosHandle";
import { getOnewordSubjectListAll } from "@/api/oneword/OnewordSubject";
import Link from 'next/link';

const OnewordListFormComponent = observer(() => {
  const [keyword, setKeyword] = React.useState("");
  const [page, setPage] = React.useState(1);
  const [size, setSize] = React.useState(10);

  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const queryClient = useQueryClient();
  const [isAdmin, setIsAdmin] = React.useState(false);

  const { data, isLoading } = useQuery(['onewordSubjectListAll'], () => getOnewordSubjectListAll(), {
    keepPreviousData: true,
  });

  useEffect(() => {
    setIsAdmin(localStorage.getItem("isAdmin") === "true");
  }, [])

  if (isLoading) return <div>Loading...</div>;
  if (!data) return <div>No data</div>;

  // 상하로 최대 10개까지만 표시
  // const displayCount = Math.min(data.length, 10);

  // const getClassNames = (rowIndex, colIndex) => {
  //   return `md:col-span-3 col-span-3 md:row-span-2 row-span-4 p-4 border border-gray-200 shadow-md hover:shadow-lg rounded-md flex flex-col justify-between ${rowIndex === 0 && colIndex === 0 ? 'mt-0' : 'mt-4'
  //     } ${colIndex === 0 ? 'ml-0' : 'ml-4'}`;
  // };

  // 미사용(2024.06.21)
  // return (
  //   <div className="grid grid-cols-3 gap-4"> {/* Changed grid-cols-4 to grid-cols-3 */}
  //     {data.slice(0, displayCount).map((onewordsubject, index) => (
  //       <div key={onewordsubject.owsjNum} className={getClassNames(Math.floor(index / 3), index % 3)}> {/* Adjusted calculation for class */}
  //         <h2 className="text-lg font-bold">{onewordsubject.owsjNum}</h2>
  //         <h2 className="text-lg font-bold">{onewordsubject.owsjSubject}</h2>
  //         <p className="mt-2 text-sm text-gray-600">{onewordsubject.owsjWriter}</p>
  //         {/* 추가적인 카드 내용 */}
  //       </div>
  //     ))}
  //   </div>
  // );

  // 사용(2024.06.21)
  // return (
  //   <div className="grid grid-cols-3 gap-4">
  //     {data.slice(0, displayCount).map((onewordsubject) => (
  //       <div key={onewordsubject.owsjNum} className="border p-4 rounded">
  //         <h2 className="text-lg font-bold">{onewordsubject.owsjNum}</h2>
  //         <h2 className="text-lg font-bold">{onewordsubject.owsjSubject}</h2>
  //         <p className="mt-2 text-sm text-gray-600">{onewordsubject.owsjWriter}</p>
  //         {/* 추가적인 카드 내용 */}
  //       </div>
  //     ))}
  //   </div>
  // );

  // sytle
  const roundedStyle = {
    borderRadius: '20% 20% 20% 20% / 70% 70% 70% 70%', // (수직 / 수평) 각 모서리의 둥근 정도를 설정합니다.
  };
  
  return (
    <div className="p-10">
      <div className="flex justify-center">
        <div className="grid grid-cols-3 gap-4">
          {data.map((onewordsubject) => (
            <Link key={onewordsubject.owsjNum} href={`/oneword/${onewordsubject.owsjNum}`} className="border p-4 flex flex-col items-start w-100 h-50 overflow-hidden"
              style={{ backgroundColor: '#F2EFE2', ...roundedStyle }} // Inline style to set background color
            >
              <div className="flex">
                <p className="mt-2 ml-5 text-sm text-gray-600">{onewordsubject.owsjWriter}</p>
                {/* <p className="mt-2 ml-10 text-sm text-gray-600">{onewordsubject.owsjNum}</p> */}
              </div>
              {onewordsubject && onewordsubject.owsjSubject && (
                <h2 className="mt-2 ml-5 text-lg font-bold">
                  {onewordsubject.owsjSubject.split('\n').map((line, index) => (
                    <React.Fragment key={index}>
                      {line}
                      <br />
                    </React.Fragment>
                  ))}
                </h2>
              )}
              {/* 추가적인 카드 내용 */}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );

});

export default OnewordListFormComponent;