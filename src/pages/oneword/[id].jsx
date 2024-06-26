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

  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery(['onewordSubjectDetail', owsjNum], () => getOnewordSubjectDetail(owsjNum),
    {
      enabled: !!owsjNum,
      keepPreviousData: true,
      initialData: () => undefined,
      onSuccess: () => {
        // 이 부분은 필요 없을 수 있습니다.
      },
    },
    [owsjNum] // owsjNum 값이 변할 때만 새로운 쿼리 호출
  );

  if (isLoading) return <div>Loading...</div>;
  if (!data) return <div>No data</div>;

  return (
    <div>
      <div className="sticky top-0 z-50">
        <Header />
      </div>
      <div className="flex justify-center">
        <div className="border-solid border flex justify-between w-[1536px] gap-x-10">
          <div className="border-solid border flex-1  relative z-[0]">
            <h1>Reply Page for {owsjNum}</h1>
            <OnewordSJDeatilComponent data={data} />
          </div>
        </div>
      </div>
    </div>
  );
});

export default ReplyPage;
