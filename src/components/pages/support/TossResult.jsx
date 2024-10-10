import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const TossResult = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkPaymentResult = async () => {
      try {
        const searchParams = new URLSearchParams(location.search);
        const orderId = searchParams.get('orderId');  // 쿼리 파라미터로 orderId를 가져옴

        const response = await axios.get('http://localhost:9000/payment/toss/success/getOrder', {
          params: {
            orderId: orderId
          }
        });

        if (response.data.status === 'DONE') {
          navigate('/payment/success');
        console.log('success로 이동');
        } else {
        //   navigate('/payment/fail');
        }
      } catch (error) {
        console.error('결제 결과 처리 중 오류 발생:', error);
        // navigate('/payment/fail');  // 에러 발생 시 실패 페이지로 이동
      }
    };

    checkPaymentResult();
  }, [location, navigate]);

  return <div>결제 결과를 확인 중입니다...</div>;
};

export default TossResult;
