import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { SERVER_URL } from "../../../constants/URLs";

function SupportingSearch() {
  const [orders, setOrders] = useState([]); // 모든 주문 정보를 저장할 상태
  const [error, setError] = useState(null); // 에러 상태 관리
  const [loading, setLoading] = useState(true); // 로딩 상태 관리

  // 주문 정보를 가져오는 함수
  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${SERVER_URL}/damdda/order/all`);
      setOrders(response.data); // 가져온 주문 정보를 상태에 저장
      setLoading(false); // 로딩 완료
    } catch (err) {
      setError("주문 정보를 가져오는 중 오류가 발생했습니다.");
      setLoading(false); // 로딩 완료
    }
  };

  // 컴포넌트가 마운트될 때 주문 정보 가져오기
  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="order-list-container">
      <h1>주문자 목록</h1>
      <table className="order-list-table">
        <thead>
          <tr>
            <th>후원번호</th>
            <th>주문자 이름</th>
            <th>후원날짜</th>
            <th>선물 정보</th>
            <th>연락처</th>
            <th>배송지 정보</th>
            <th>배송요청사항</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={index}>
              <td>{order.supportingProject.supportingProjectId}</td>
              <td>{order.delivery.deliveryName}</td>
              <td>
                {new Date(order.supportingProject.supportedAt).toLocaleString()}
              </td>
              <td>{order.supportingPackage.packageName}</td>
              <td>{order.delivery.deliveryPhoneNumber}</td>
              <td>{order.delivery.deliveryAddress}</td>
              <td>{order.delivery.deliveryMessage}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SupportingSearch;
