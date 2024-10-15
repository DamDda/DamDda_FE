// import { useEffect, useState } from "react";
// import { loadTossPayments, ANONYMOUS } from "@tosspayments/tosspayments-sdk";
// import { useLocation } from 'react-router-dom';

// const generateRandomString = () => window.btoa(Math.random()).slice(0, 20);

// const clientKey = "test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm";

// export default function TossReady() {
//   const [widgets, setWidgets] = useState(null);
//   const [ready, setReady] = useState(false); // 준비 상태 추가
//   const location = useLocation();
//   const { createdOrderId, createdOrderData } = location.state || {}; // orderId와 추가 정보 가져오기
//   console.log('넘어온 주문 ID:', createdOrderId);
//   console.log('넘어온 주문 DATA:', createdOrderData);

//   const [amount, setAmount] = useState({
//     currency: "KRW",
//     value: createdOrderData.totalAmount, // 결제 금액 수정 필요
//   });
//   // SDK를 초기화하고 위젯을 생성함
//   useEffect(() => {
//     async function fetchPaymentWidgets() {
//       const tossPayments = await loadTossPayments(clientKey);
//       const widgets = tossPayments.widgets({ customerKey: ANONYMOUS });
//       setWidgets(widgets);
//     }

//     fetchPaymentWidgets();
//   }, []);
//   //위젯이 준비되면 결제 금액을 설정하고 결제 방식, 동의 UI를 랜더링함

//   useEffect(() => {
//     async function renderPaymentWidgets() {
//       if (widgets == null) {
//         return;
//       }

//       await widgets.setAmount(amount);

//       await Promise.all([
//         widgets.renderPaymentMethods({
//           selector: "#payment-method",
//           variantKey: "DEFAULT",
//         }),
//         widgets.renderAgreement({
//           selector: "#agreement",
//           variantKey: "AGREEMENT",
//         }),
//       ]);

//       setReady(true); // 결제 위젯 준비 상태 설정
//     }

//     renderPaymentWidgets();
//   }, [widgets]);

//   return (
//     <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '10px', overflow: 'auto', width: '100%' }}>
//       <div style={{ maxWidth: '540px', width: '100%' }}>
//         <div id="payment-method" style={{ width: '100%' }} />
//         <div id="agreement" style={{ width: '100%' }} />
//         <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
//         <button
//             style={{
//               padding: '11px 22px',
//               border: 'none',
//               borderRadius: '8px',
//               backgroundColor: ready ? '#3282f6' : '#f2f4f6',
//               color: ready ? '#f9fcff' : '#4e5968',
//               fontWeight: '600',
//               fontSize: '17px',
//               cursor: ready ? 'pointer' : 'not-allowed',
//               width: '100%',
//               marginTop:'20px',
//               textAlign:'center',
//             }}
//             onClick={async () => {
//               if (!ready) {
//                 alert('결제 시스템이 아직 준비되지 않았습니다.');
//                 return;
//               }

//               try {
//                 const tossPayments = await loadTossPayments(clientKey);
//                 if (!tossPayments) {
//                   console.error("Toss Payments SDK 초기화 실패");
//                   return;
//                 }
                        
//                 await widgets.requestPayment({
//                     // amount: createdOrderData.totalAmount || 50_000,  // 결제 금액, 기본값 50,000
//                     orderId:  "DAMDDA-ORDER-" +createdOrderId.toString(),  // 서버에서 받은 주문 ID를 사용
//                     orderName: createdOrderData.projectTitle || '펀딩 결제',  // 프로젝트 제목, 기본값 '펀딩 결제'
//                     customerName: createdOrderData.name || '김토스',  // 사용자 이름, 기본값 '김토스'
//                     customerEmail: createdOrderData.email || 'customer123@gmail.com',  // 사용자 이메일, 기본값 'customer123@gmail.com'
//                     successUrl: `http://localhost:9000/payment/toss/success`,  // 성공 시 서버로 customOrderId 전달
//                     failUrl: `http://localhost:9000/payment/toss/fail`,  // 실패 시 customOrderId 전달
                    
//                 }).then(()=>{console.log('결제성공');})
//               } catch (error) {
//                 console.error('결제 에러 발생:', error);
//               }
//             }}
//             disabled={!ready} // 결제 시스템이 준비되지 않았을 경우 버튼 비활성화
//         >
//             결제하기
//           </button>
          
//         </div>
//       </div>
//     </div>
//   );
// }  

import { useEffect, useState } from "react";
import { loadTossPayments, ANONYMOUS } from "@tosspayments/tosspayments-sdk";
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from "js-cookie";
import { SERVER_URL } from "../../../constants/URLs";


const generateRandomString = () => window.btoa(Math.random()).slice(0, 20);
const clientKey = "test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm";

export default function TossReady() {
  const [widgets, setWidgets] = useState(null);
  const [ready, setReady] = useState(false); // 준비 상태 추가
  const location = useLocation();
  const navigate = useNavigate();
  const { createdOrderId, createdOrderData } = location.state || {}; // orderId와 추가 정보 가져오기
  console.log('넘어온 주문 ID:', createdOrderId);
  console.log('넘어온 주문 DATA:', createdOrderData);

  // const [amount, setAmount] = useState({
  //   currency: "KRW",
  //   value: createdOrderData.totalAmount, // 결제 금액 수정 필요
  // });

  // SDK를 초기화하고 위젯을 생성함
  useEffect(() => {
    async function fetchPaymentWidgets() {
      const tossPayments = await loadTossPayments(clientKey);
      const widgets = tossPayments.widgets({ customerKey: ANONYMOUS });
      setWidgets(widgets);
    }

    fetchPaymentWidgets();
  }, []);

  // 위젯이 준비되면 결제 금액을 설정하고 결제 방식, 동의 UI를 랜더링함
  useEffect(() => {
    async function renderPaymentWidgets() {
      if (!widgets) {
        return;
      }
  
      await widgets.setAmount({
        currency: "KRW",
        value: createdOrderData.totalAmount,
      });
  
      try {
        // 결제 방법 위젯을 렌더링
        await widgets.renderPaymentMethods({
          selector: "#payment-method",  // 이 선택자가 존재해야 합니다
          variantKey: "DEFAULT",
        });
  
        // 결제 동의 위젯을 렌더링
        await widgets.renderAgreement({
          selector: "#agreement",  // 이 선택자가 존재해야 합니다
          variantKey: "AGREEMENT",
        });
        
        setReady(true);  // 결제 위젯 준비 완료 상태 설정
      } catch (error) {
        console.error("결제 위젯 렌더링 중 오류 발생:", error);
      }
    }
  
    renderPaymentWidgets();
  }, [widgets]);  // `widgets`가 존재할 때 렌더링 시작
  

  //결제 관리
  const handlePayment = async () => {
    if (!ready) {
      alert('결제 시스템이 아직 준비되지 않았습니다.');
      return;
    }

  //   try {
  //     const tossPayments = await loadTossPayments(clientKey);
  //     if (!tossPayments) {
  //       console.error("Toss Payments SDK 초기화 실패");
  //       return;
  //     }

  //     await widgets.requestPayment({
  //       orderId: "DAMDDA-ORDER-" + createdOrderId.toString(),  // 서버에서 받은 주문 ID 사용
  //       orderName: createdOrderData.projectTitle || '펀딩 결제',  // 프로젝트 제목
  //       customerName: createdOrderData.name || '김토스',  // 사용자 이름
  //       customerEmail: createdOrderData.email || 'customer123@gmail.com',  // 사용자 이메일
  //       successUrl: `http://localhost:9000/payment/toss/success`,  // 성공 시 서버로 요청
  //       failUrl: `http://localhost:9000/payment/toss/fail`,  // 실패 시 서버로 요청
  //     }).then(() => {
  //       console.log('결제성공');
  //     });
  //   } catch (error) {
  //     console.error('결제 에러 발생:', error);
  //   }
  // };
      try {

         console.log("createdOrderId: "+createdOrderId)

         await widgets.requestPayment({
          orderId: "DAMDDA-ORDER-" + createdOrderId.toString(),  // 서버에서 받은 주문 ID 사용
          orderName: createdOrderData.projectTitle || '펀딩 결제',  // 프로젝트 제목
          customerName: createdOrderData.name || '김토스',  // 사용자 이름
          customerEmail: createdOrderData.email || 'customer123@gmail.com',  // 사용자 이메일
          successUrl: `${SERVER_URL}/payment/toss/success`,  // 성공 시 서버로 요청
          failUrl: `${SERVER_URL}/payment/toss/fail`,  // 실패 시 서버로 요청
        });

        console.log('반환완료');

       // 결제 결과 확인을 위해 successUrl에 리다이렉트된 후 결제 상태를 가져옴
      const response = await axios.get(`${SERVER_URL}/payment/toss/success/getOrder`, {
        params: {
          orderId: createdOrderId.toString(),
        },
        headers: {
          ...(Cookies.get("accessToken")&& { Authorization: `Bearer ${Cookies.get("accessToken")}` }),
         },
      });
      
      // 결제 상태 확인
      const { status } = response.data;
      if (status === 'DONE') {
        navigate('/payment/success');  // 결제 성공 시 성공 페이지로 이동
      } else {
        // navigate('/payment/fail');  // 결제 실패 시 실패 페이지로 이동
      }
    } catch (error) {
      console.error('결제 중 오류 발생:', error);
      // navigate('/payment/fail');  // 에러 발생 시 실패 페이지로 이동
    }}
 
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '10px', overflow: 'auto', width: '100%' }}>
      <div style={{ maxWidth: '540px', width: '100%' }}>
        <div id="payment-method" style={{ width: '100%' }} />
        <div id="agreement" style={{ width: '100%' }} />
        <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
          <button
            style={{
              padding: '11px 22px',
              border: 'none',
              borderRadius: '8px',
              backgroundColor: ready ? '#3282f6' : '#f2f4f6',
              color: ready ? '#f9fcff' : '#4e5968',
              fontWeight: '600',
              fontSize: '17px',
              cursor: ready ? 'pointer' : 'not-allowed',
              width: '100%',
              marginTop: '20px',
              textAlign: 'center',
            }}
            onClick={handlePayment}
            disabled={!ready}
          >
            결제하기
          </button>
        </div>
      </div>
    </div>
  );
}