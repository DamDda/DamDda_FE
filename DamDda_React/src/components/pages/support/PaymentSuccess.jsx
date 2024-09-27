import React from 'react';
import styles from './PaymentSuccess.css';  // CSS Modules import

const PaymentSuccess = () => {
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
            <tr>
              <td>상품명</td>
              <td>주문 일자</td>
              <td>수량</td>
              <td>가격(원)</td>
            </tr>
            <tr>
              <td>상품명</td>
              <td>주문 일자</td>
              <td>수량</td>
              <td>가격(원)</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className={styles['details-section']}>
        <div className={styles['shipping-info']}>
          <h3>배송지 정보</h3>
          <p>이름: 홍길동</p>
          <p>전화번호: 010-1234-5678</p>
          <p>배송지 주소: 서울특별시 강남구</p>
        </div>

        <div className={styles['payment-info']}>
          <h3>결제 정보</h3>
          <p>결제 수단: 카카오페이</p>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
