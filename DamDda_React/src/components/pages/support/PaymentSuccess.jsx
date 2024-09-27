import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './PaymentSuccess.module.css';  // CSS Modules import

const PaymentSuccess = () => {
  const [orderData, setOrderData] = useState(null); // 주문 데이터를 저장할 상태
  const [loading, setLoading] = useState(true); // 로딩 상태 관리
  const [error, setError] = useState(null); // 에러 상태 관리

  // 주문 정보를 가져오는 함수
  const fetchOrderData = async () => {
    try {
      // 예시 API 요청 (실제 API 엔드포인트로 변경 필요)
      const response = await axios.get('http://localhost:9000/order/details/1'); // orderId 1234
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

  if (!orderData) {
    return <p>주문 정보를 불러오지 못했습니다.</p>; // 주문 정보가 없을 때
  }

  return (
    <div className={styles['success-container']}>
      <div className={styles['success-header']}>
        <img src="/path/to/cart-image.png" alt="Cart Icon" className={styles['success-image']} />
        <h1>주문이 완료되었습니다!</h1>
        <p>선물은 정상 접수 완료되었으며 배송을 시작합니다!</p>
        <div className={styles['success-buttons']}>
          <button className={styles['my-orders-btn']}>마이페이지</button>
          <button className={styles['other-projects-btn']}>후원한 프로젝트 보기</button>
        </div>
      </div>

      <div className={styles['order-summary-section']}>
        <h3>주문 상품</h3>
        <table>
          <thead>
            <tr>
              <th>상품명</th>
              <th>주문 일자</th>
              <th>수량</th>
              <th>결제 금액</th>
            </tr>
          </thead>
          <tbody>
            {orderData.items.map((item, index) => (
              <tr key={index}>
                <td>{item.productName}</td>
                <td>{new Date(orderData.orderDate).toLocaleDateString()}</td>
                <td>{item.quantity}</td>
                <td>{item.price.toLocaleString()}원</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className={styles['details-section']}>
        <div className={styles['shipping-info']}>
          <h3>배송지 정보</h3>
          <p>이름: {orderData.deliveryName}</p>
          <p>전화번호: {orderData.deliveryPhoneNumber}</p>
          <p>배송지 주소: {orderData.deliveryAddress}</p>
        </div>

        <div className={styles['payment-info']}>
          <h3>결제 정보</h3>
          <p>결제 수단: {orderData.paymentMethod}</p>
          <p>결제 금액: {orderData.totalAmount.toLocaleString()}원</p>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
