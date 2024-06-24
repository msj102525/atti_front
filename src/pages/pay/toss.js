import React, { useEffect, useRef, useState } from "react";
import { loadPaymentWidget } from "@tosspayments/payment-widget-sdk";
import Head from "next/head";
import { useRouter } from 'next/router';

const TossPaymentPage = () => {
  const router = useRouter();
  const paymentMethodsWidgetRef = useRef(null);
  const agreementWidgetRef = useRef(null);
  const [paymentWidget, setPaymentWidget] = useState(null);
  const { amount, orderId, orderName, selectedTime } = router.query;

  useEffect(() => {
    // selectedTime을 localStorage에 저장
    if (selectedTime) {
      localStorage.setItem("selectedTime", selectedTime);
    }

    const initializePaymentWidget = async () => {
      try {
        const widgetClientKey = "test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm";
        const customerKey = "xO45gjeZ1eUW-O8w4xDkL";
        const widget = await loadPaymentWidget(widgetClientKey, customerKey);
        setPaymentWidget(widget);

        widget.renderPaymentMethods("#payment-method", { value: amount });
        widget.renderAgreement("#agreement");
      } catch (error) {
        console.error("Error initializing payment widget:", error);
      }
    };

    initializePaymentWidget();
  }, [amount, selectedTime]);

  const handlePaymentRequest = async () => {
    if (!paymentWidget) return;

    try {
      await paymentWidget.requestPayment({
        orderId,
        orderName,
        successUrl: `${window.location.origin}/pay/success`,
        failUrl: `${window.location.origin}/pay/fail`,
        customerEmail: "customer123@gmail.com",
        customerName: "김토스",
        customerMobilePhone: "01012341234",
      });
    } catch (error) {
      console.error("Error requesting payment:", error);
    }
  };

  return (
    <div className="bg-white flex flex-col items-center justify-center">
      <Head>
        <script src="https://js.tosspayments.com/v1/payment-widget"></script>
      </Head>
      <div className="w-full max-w-2xl p-8 border rounded-lg shadow-md">
        {/* 결제 UI, 이용약관 UI 영역 */}
        <div id="payment-method" ref={paymentMethodsWidgetRef} className="mb-4"></div>
        <div id="agreement" ref={agreementWidgetRef} className="mb-4"></div>
        {/* 결제하기 버튼 */}
        <button 
          id="payment-button" 
          onClick={handlePaymentRequest}
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
        >
          결제하기
        </button>
      </div>
    </div>
  );
};

export default TossPaymentPage;
