import { useRouter } from 'next/router';

const FailPage = () => {
  const router = useRouter();
  const { message, code } = router.query;

  return (
    <div>
      <h2> 결제 실패 </h2>
      <p id="code">에러코드: {code}</p>
      <p id="message">실패 사유: {message}</p>
    </div>
  );
};

export default FailPage;
