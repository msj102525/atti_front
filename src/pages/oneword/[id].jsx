import Header from "../common/Header";
import { useRouter } from 'next/router';
import { observer } from "mobx-react";
import { useQuery, useMutation, useQueryClient } from 'react-query';

import { getOnewordSubjectDetail } from "../../api/oneword/OnewordSubject";
import { handleAxiosError } from "../../api/errorAxiosHandle";
import OnewordSJDeatilComponent from "@/components/oneword/OnewordSJDeatilComponent";

const ReplyPage = observer(() => {
  const router = useRouter();
  const { id: owsjNum } = router.query;

  // const { owsjNum } = router.query; // owsjNum 값 가져오기

  console.log('owsjNum:', owsjNum); // owsjNum 값을 로그로 출력

  const { data, isLoading } = useQuery(['onewordSubjectDetail', { owsjNum }], () => getOnewordSubjectDetail(owsjNum), {
    keepPreviousData: true,
  });

  if (isLoading) return <div>Loading...</div>;
  if (!data) return <div>No data</div>;

  // //// 상세 조회
  // const readSubjectDetailMutation = useMutation(getOnewordSubjectDetail, {
  //   onSuccess: () => {
  //     // queryClient.invalidateQueries('onewordSubjectList').then();
  //   },
  //   onError: handleAxiosError,
  // });

  // id를 기반으로 해당 카드의 정보를 가져와 렌더링할 수 있음

  return (
    <div>
      <div className="sticky top-0 z-50">
        <Header />
      </div>
      <div className="flex justify-center">
        <div className="border-solid border flex justify-between w-[1536px] gap-x-10">
          <div className="border-solid border flex-1  relative z-[0]">
            <h1>Reply Page for {owsjNum}</h1>
            {/* <OnewordSJDeatilComponent data={data} /> */}
            <OnewordSJDeatilComponent data={data} />
            {/* <ReplyWriteForm user={user} data={data} fetchData={fetchData} />
            <ReplyList user={user} data={data} fetchData={fetchData} /> */}
          </div>
        </div>
      </div>
    </div>
  );

});

export default ReplyPage;
