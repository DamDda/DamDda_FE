import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import styles from './PaymentSuccess.module.css';  // CSS Modules import

import '../../styles/style.css'
import { Header } from "../../layout/Header";
import { Footer } from "../../layout/Footer";

import cart from '../../assets/cart.png'
const PaymentFail = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const orderId = queryParams.get('orderId');  // URL 쿼리에서 orderId 가져옴

  const [orderData, setOrderData] = useState([]); // 주문 데이터를 저장할 상태
  const [loading, setLoading] = useState(true); // 로딩 상태 관리
  const [error, setError] = useState(null); // 에러 상태 관리

  // 주문 정보를 가져오는 함수
  const fetchOrderData = async () => {
    try {
      // if (!orderId) {
      //   throw new Error('주문 ID가 없습니다.');
      // }
      // orderId로 주문 정보 요청
      // const response = await axios.get(`http://localhost:9000/order/details/${orderId}`);

      const response = await axios.get(`http://localhost:9000/order/details/${orderId}`);
      setOrderData(response.data);
      setLoading(false); // 데이터를 가져왔으므로 로딩 완료
    } catch (err) {
      setError(err.message);
      setLoading(false); // 에러가 발생해도 로딩 완료
    }
  };

  // 컴포넌트가 마운트될 때 주문 정보 가져오기
  useEffect(() => {
    fetchOrderData();
  }, []);

  if (loading) {
    return <p>로딩 중...</p>; // 로딩 중일 때 표시할 내용
  }

  if (error) {
    return <p>에러 발생: {error}</p>; // 에러 발생 시 표시할 내용
  }


  // if (!orderData || !orderData.supportingPackage || !orderData.delivery || !orderData.payment) {
  //   return <p>주문 정보를 불러오는 중입니다...</p>;
  // }
  
  return (
    <>
      <Header />
      <div className="container">
        <div className={styles['success-container']}>
          <div className={styles['success-header']}>
            <img src={cart} alt="Cart Icon" className={styles['success-image']} />
            <h1>주문이 실패!!</h1>
            <p>선물은 정상 접수 완료되었으며 배송을 시작합니다!</p>
            <div className={styles['success-buttons']}>
              <button className={styles['my-orders-btn']}>마이페이지</button>
              <button className={styles['other-projects-btn']}>후원한 프로젝트 보기</button>
            </div>
          </div>

          <div className={styles['order-summary-section']}>
            <div className={styles['order-title']}>주문 상품</div>
            <table>
              <thead>
                <tr>
                  <th>상품명</th>
                  <th>주문 일자</th>
                  <th>수량</th>
                  <th>결제 금액</th>
                </tr>
              </thead>
  

            </table>
          </div>

        </div>
      </div>
      <Footer />
    </>
  );
};

export default PaymentFail;
