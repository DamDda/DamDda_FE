import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // useNavigate와 useLocation 훅을 import
import { loadTossPayments } from "@tosspayments/payment-sdk";
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
} from "@mui/material";
import kakaopay from "../../assets/kakao.png"; // 로고 파일
import tosspay from "../../assets/toss.png"; // 로고 파일

import axios from "axios";
import "./payment.css";
import { Header } from "../../layout/Header";

function Payment() {
  const navigate = useNavigate();
  const location = useLocation(); // 이전 페이지에서 전달된 데이터 접근
  const [orderInfo, setOrderInfo] = useState(
    location.state || {
      // 전달된 state가 없을 경우 기본값 설정
      projectTitle: "",
      giftSet: "",
      options: "",
      price: 0,
      quantity: 1,
      name: "",
      phoneNumber: "",
      email: "",
    }
  );

  const [shippingInfo, setShippingInfo] = useState({
    postalCode: "",
    address: "",
    extraAddress: "",
    detailAddress: "",
    request: "",
  });

  const [paymentMethod, setPaymentMethod] = useState(""); // 결제 수단 상태
  const [showCustomMessageInput, setShowCustomMessageInput] = useState(false); // 배송 메시지 입력 필드 상태
  const [customMessage, setCustomMessage] = useState(""); // 사용자 입력 배송 메시지

  // Dynamically load Daum Postcode script when the component mounts
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleOrderChange = (e) => {
    setOrderInfo({
      ...orderInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleShippingChange = (e) => {
    setShippingInfo({
      ...shippingInfo,
      [e.target.name]: e.target.value,
    });
  };

  // 결제 수단 변경 처리
  const handlePaymentChange = (e) => {
    setPaymentMethod(e.target.value); // 선택한 결제 수단 반영
  };

  const handleDeliveryMessageChange = (e) => {
    const selectedValue = e.target.value;
    if (selectedValue === "직접 입력") {
      setShowCustomMessageInput(true); // 직접 입력 필드 보이기
    } else {
      setShowCustomMessageInput(false); // 직접 입력 필드 숨기기
    }
  };

  const handleCustomMessageChange = (e) => {
    setCustomMessage(e.target.value); // 사용자 정의 메시지 반영
  };

  // 주문 정보 제출 및 결제 처리
  const handleSubmit = async () => {
    const orderData = {
      delivery: {
        deliveryName: orderInfo.name,
        deliveryPhoneNumber: orderInfo.phoneNumber,
        deliveryEmail: orderInfo.email,
        deliveryAddress: shippingInfo.address,
        deliveryDetailedAddress: shippingInfo.detailAddress,
        deliveryPostCode: shippingInfo.postalCode, // 우편번호 확인
        deliveryMessage: customMessage || shippingInfo.request,
      },
      payment: {
        paymentMethod: paymentMethod,
        paymentStatus: "결제 대기중", // 초기 상태
      },
      supportingProject: {
        title: orderInfo.projectTitle, // 프로젝트명
        // 추가적으로 필요한 필드가 있다면 여기에 포함
      },
      supportingPackage: {
        packageName: orderInfo.options, // 패키지 이름
        packagePrice: orderInfo.price * orderInfo.quantity, // 결제 금액
        packageCount: orderInfo.quantity, // 패키지 수량 추가
      },
      packageCount: orderInfo.quantity, // 패키지 수량
    };

    try {
      // 주문 정보 생성 POST 요청
      const response = await axios.post(
        "http://localhost:9000/order/create",
        orderData
      );
      console.log("Order Data:", orderData); // 서버로 전송 전에 데이터 확인

      // 결제 수단에 따른 처리
      if (paymentMethod === "tossPay") {
        const tossPayments = await loadTossPayments(
          "test_ck_D5GePWvyJnrK0W0k6q8gLzN97Eoq"
        );
        tossPayments
          .requestPayment("카드", {
            amount: orderInfo.price * orderInfo.quantity + 3000,
            orderId: response.data.orderId, // 서버에서 받은 주문 ID 사용
            orderName: orderInfo.projectTitle || "펀딩 결제",
            customerName: orderInfo.name || "테스트 사용자",
            successUrl: "http://localhost:9000/toss/success",
            failUrl: "http://localhost:9000/toss/fail",
          })
          .then(() => {
            navigate("/TossSuccess"); // 결제 성공 시 리다이렉트
          })
          .catch(function (error) {
            console.error("결제 실패:", error);
          });
      } else if (paymentMethod === "kakaoPay") {
        // 카카오페이 결제창 호출
        axios
          .post("http://localhost:9000/payment/kakao/ready", {
            orderId: response.data.orderId,
          })
          .then((res) => {
            window.location.href = res.data.next_redirect_pc_url; // 카카오페이 결제 페이지로 리디렉션
          })
          .catch((error) => {
            console.error("Error initiating payment:", error);
          });
      }
    } catch (error) {
      console.error("There was an error creating the order:", error);
    }
  };

  const sample6_execDaumPostcode = () => {
    new window.daum.Postcode({
      oncomplete: function (data) {
        let addr = ""; // Address
        let extraAddr = ""; // Extra information

        if (data.userSelectedType === "R") {
          addr = data.roadAddress;
        } else {
          addr = data.jibunAddress;
        }

        if (data.userSelectedType === "R") {
          if (data.bname !== "" && /[동|로|가]$/g.test(data.bname)) {
            extraAddr += data.bname;
          }
          if (data.buildingName !== "" && data.apartment === "Y") {
            extraAddr +=
              extraAddr !== "" ? ", " + data.buildingName : data.buildingName;
          }
          if (extraAddr !== "") {
            extraAddr = " (" + extraAddr + ")";
          }
        }

        // 우편번호와 주소 정보를 업데이트
        setShippingInfo((prevState) => ({
          ...prevState,
          postalCode: data.zonecode || "", // zonecode가 없을 경우 빈 값 처리
          address: addr,
          extraAddress: extraAddr,
        }));

        // 디버깅을 위한 콘솔 출력
        console.log("주소 정보:", {
          postalCode: data.zonecode,
          address: addr,
          extraAddress: extraAddr,
        });
      },
    }).open();
  };

  return (
    <div className="big-container">
      <div className="container">
        <div className="order-summary">
          <h2>{orderInfo.projectTitle || "프로젝트 이름"}</h2>
          <p>선물 구성/옵션: {orderInfo.giftSet}</p>
          <p>가격 (원): {orderInfo.price}</p>
          <p>수량: {orderInfo.quantity}</p>
        </div>

        <div className="form-section">
          <h3>주문자 정보 수정</h3>
          <input
            type="text"
            name="name"
            placeholder="마이페이지에 등록된 이름"
            value={orderInfo.name}
            onChange={handleOrderChange}
            className="input"
          />
          <input
            type="text"
            name="phoneNumber"
            placeholder="마이페이지에 등록된 전화번호"
            value={orderInfo.phoneNumber}
            onChange={handleOrderChange}
            className="input"
          />
          <input
            type="email"
            name="email"
            placeholder="마이페이지에 등록된 이메일"
            value={orderInfo.email}
            onChange={handleOrderChange}
            className="input"
          />
        </div>

        <div className="form-section">
          <h3>배송지 정보</h3>
          <div className="address-group">
            <input
              type="text"
              id="sample6_postcode"
              name="postalCode"
              placeholder="우편번호"
              value={shippingInfo.postalCode}
              readOnly
              className="input"
            />
            <button
              type="button"
              className="button"
              onClick={sample6_execDaumPostcode}
            >
              우편번호 찾기
            </button>
          </div>
          <input
            type="text"
            id="sample6_address"
            name="address"
            placeholder="주소"
            value={shippingInfo.address}
            readOnly
            className="input"
          />
          <input
            type="text"
            id="sample6_detailAddress"
            name="detailAddress"
            placeholder="상세 주소"
            value={shippingInfo.detailAddress}
            onChange={handleShippingChange}
            className="input"
          />

          <div>
            <h4>Delivery Message</h4>
            <select
              value={shippingInfo.deliveryMessage}
              onChange={handleDeliveryMessageChange}
            >
              <option value="문앞에 놓아주세요">문앞에 놓아주세요</option>
              <option value="경비실에 맡겨주세요">경비실에 맡겨주세요</option>
              <option value="직접 받을 거예요">직접 받을 거예요</option>
              <option value="직접 입력">직접 입력</option>
            </select>
          </div>
          {showCustomMessageInput && (
            <div>
              <textarea
                value={customMessage}
                onChange={handleCustomMessageChange}
                maxLength={100}
                placeholder="직접 입력 (최대 100자)"
              />
            </div>
          )}
        </div>

        <div className="form-section">
          <h3>결제 수단</h3>
          <FormControl component="fieldset">
            <RadioGroup
              aria-label="payment-method"
              name="payment-method"
              value={paymentMethod}
              onChange={handlePaymentChange}
            >
              <FormControlLabel
                value="naverPay"
                control={<Radio color="success" size="medium" />}
                label={
                  <>
                    <span>네이버 페이</span>
                    <img src="naverpay.png" alt="네이버페이" />
                  </>
                }
              />
              <FormControlLabel
                value="kakaoPay"
                control={<Radio color="success" size="medium" />}
                label={
                  <>
                    <span>카카오페이</span>
                    <img src={kakaopay} alt="카카오페이" />
                  </>
                }
              />
              <FormControlLabel
                value="tossPay"
                control={<Radio color="success" size="medium" />}
                label={
                  <>
                    <span>토스 페이</span>
                    <img src={tosspay} alt="토스페이" />
                  </>
                }
              />
            </RadioGroup>
          </FormControl>
        </div>
      </div>

      <div className="small-container">
        <div className="payment-summary">
          <h3>최종 펀딩 금액</h3>
          <p>상품 금액: {orderInfo.price} 원</p>
          <p>배송비: 3000 원</p>
          <p>최종 금액: {orderInfo.price * orderInfo.quantity + 3000} 원</p>

          <div className="checkbox-group">
            <label>
              <input type="checkbox" />
              전체 동의
            </label>
            <label>
              <input type="checkbox" />
              구매조건, 결제 진행 및 결제 서비스 동의
            </label>
            <label>
              <input type="checkbox" />
              개인정보 제 3자 제공 동의
            </label>
          </div>
        </div>

        <button onClick={handleSubmit} className="button">
          간편 결제 하기
        </button>
      </div>
    </div>
  );
}
export default Payment;
