import got from 'got';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    // 클라이언트에서 받은 JSON 요청 바디입니다.
    const { paymentKey, orderId, amount, selectedTime } = req.body;

    // 토스페이먼츠 API는 시크릿 키를 사용자 ID로 사용하고, 비밀번호는 사용하지 않습니다.
    // 비밀번호가 없다는 것을 알리기 위해 시크릿 키 뒤에 콜론을 추가합니다.
    const widgetSecretKey = 'test_gsk_docs_OaPz8L5KdmQXkzRz3y47BMw6';
    const encryptedSecretKey =
      'Basic ' + Buffer.from(widgetSecretKey + ':').toString('base64');

    try {
      // 결제를 승인하면 결제수단에서 금액이 차감돼요.
      const response = await got.post(
        'https://api.tosspayments.com/v1/payments/confirm',
        {
          headers: {
            Authorization: encryptedSecretKey,
            'Content-Type': 'application/json',
          },
          json: {
            orderId: orderId,
            amount: amount,
            paymentKey: paymentKey,
          },
          responseType: 'json',
        }
      );

      // 결제 성공 비즈니스 로직을 구현하세요.
      console.log(response.body);
      // selectedTime을 추가하여 클라이언트로 반환
      res.status(response.statusCode).json({ ...response.body, selectedTime });
    } catch (error) {
      // 결제 실패 비즈니스 로직을 구현하세요.
      console.log(error.response.body);
      res.status(error.response.statusCode || 500).json(error.response.body);
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
