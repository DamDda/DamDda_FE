import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FormControl,
  FormHelperText,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import styled from "styled-components";
import { InputLargeBox } from "components/common/InputBoxComponent";
import {
  BlueButtonComponent,
  BlueBorderButtonComponent,
} from "components/common/ButtonComponent";
import { Layout } from "components/layout/DamDdaContainer";
import { SERVER_URL } from "constants/URLs";

const Background = styled.div`
  background-color: #3366cc;
  color: white;
  height: 800px; /* 배경 높이 고정 */
  width: 100%; 
  position: absolute; /* 배경을 최상단에 고정 */
  top: 0;
  left: 0;
  z-index: 1; /* 배경의 z-index 설정 */
`;

//디자인 적용
const FormHelperTexts = styled(FormHelperText)`
  width: 100%;
  padding-left: 16px;
  font-weight: 700 !important;
  color: ${({ color }) => color || "#d32f2f"} !important;
`;

export const Join = () => {
  ////////////////////////////////////////////
  const navigate = useNavigate();

  //체크박스
  const [checked, setChecked] = useState(false);
  const handleCheckChange = (event) => {
    setChecked(event.target.checked);
  };

  //중복확인 메세지
  const [statusMessages, setStatusMessages] = useState({
    id: "",
    nickname: "",
    register: "",
  });

  //에러체크
  const [errors, setErrors] = useState({});

  //form
  const [formData, setFormData] = useState({
    id: "",
    password: "",
    password_confirm: "",
    name: "",
    nickname: "",
    email: "",
    phone_number: "",
    address: "",
    detailed_address: "",
    postcode: "",
  });

  // 주소 API
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  //변화가 일어나면 반응
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleAgree = (event) => {
    setChecked(event.target.checked);
  };

  const handleCancel = () => {
    navigate(-1);
  };

  // 아이디 유효성 체크
  const checkIdDuplicate = async (event) => {
    event.preventDefault();
    const { id } = formData;

    if (id.length < 4) {
      setStatusMessages((prev) => ({
        ...prev,
        id: "아이디는 4자 이상이어야 합니다.",
      }));
      setErrors({ id: "아이디는 4자 이상이어야 합니다." });
      return;
    }

    try {

      const response = await axios.get(`${SERVER_URL}/member/check/id?loginId=${id}`);
      const available = response.data;
      setStatusMessages((prev) => ({
        ...prev,
        id:
          response.data === "available"
            ? "사용 가능한 아이디입니다."
            : "이미 사용 중인 아이디입니다.",
      }));
      setErrors({ id: available ? "" : "이미 사용 중인 아이디입니다." });
    } catch (err) {
      console.error(err);
      setStatusMessages((prev) => ({
        ...prev,
        id: "아이디 확인 중 오류가 발생했습니다. 다시 시도해주세요.",
      }));
      setErrors({ id: "아이디 확인 중 오류가 발생했습니다." });
    }
  };

  //닉네임 유효성 체크
  const checkNickNameDuplicate = async (event) => {
    event.preventDefault(); // Prevent default action
    const { nickname } = formData;
    try {

   
      const response = await axios.get(
           `${SERVER_URL}/member/check/nickname?nickname=${nickname}`
      );
      console.log(response.data);
      setStatusMessages((prev) => ({
        ...prev,
        nickname:
          response.data === "available"
            ? "사용 가능한 닉네임입니다."
            : "이미 사용중인 닉네임입니다.",
      }));
      setErrors((prev) => ({
        ...prev,
        nickname: response.data ? "" : "중복된 닉네임입니다.",
      }));
    } catch (err) {
      console.error(err);
      setStatusMessages((prev) => ({
        ...prev,
        nickname: "닉네임 확인에 실패했습니다.",
      }));
    }
  };

  const handleAddressSearch = () => {
    new window.daum.Postcode({
      oncomplete: function (data) {
        let addr = ""; // 주소 변수
        let extraAddr = ""; // 참고항목 변수

        // 사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
        if (data.userSelectedType === "R") {
          addr = data.roadAddress; // 도로명 주소
        } else {
          addr = data.jibunAddress; // 지번 주소
        }

        // 참고항목 조합
        if (data.userSelectedType === "R") {
          if (data.bname !== "" && /[동|로|가]$/g.test(data.bname)) {
            extraAddr += data.bname;
          }
          if (data.buildingName !== "" && data.apartment === "Y") {
            extraAddr +=
              extraAddr !== "" ? `, ${data.buildingName}` : data.buildingName;
          }
          if (extraAddr !== "") {
            extraAddr = ` (${extraAddr})`;
          }
        }

        // 주소 데이터 업데이트
        setFormData({
          ...formData,
          postcode: data.zonecode,
          address: addr,
          detailed_address: extraAddr,
        });

        // 상세주소 필드로 커서 이동
        document.getElementById("detailAddress").focus();
      },
    }).open();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {
      id,
      password,
      password_confirm,
      name,
      nickname,
      email,
      phone_number,
      address,
      detailed_address,
      postcode,
    } = formData;

    const currentErrors = {
      id: id.length < 4 ? "아이디는 4자 이상이어야 합니다." : "",
      password: !/^.{8,16}$/.test(password)
        ? "비밀번호는 8-16자리 이상 입력해주세요!"
        : "",
      password_confirm:
        password !== password_confirm ? "비밀번호가 일치하지 않습니다." : "",
      name:
        /^[가-힣a-zA-Z]+$/.test(name) && name.length >= 1
          ? ""
          : "올바른 이름을 입력해주세요.",
      nickname: nickname.length >= 1 ? "" : "닉네임을 입력해주세요.",
      email: /^[A-Za-z0-9._-]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]{2,6}$/.test(email)
        ? ""
        : "올바른 이메일 형식이 아닙니다.",
      phone_number: /^([0-9]{2,4})-([0-9]{3,4})-([0-9]{4})$/.test(phone_number)
        ? ""
        : "올바른 연락처를 입력해주세요.",
      address: address.length >= 1 ? "" : "주소를 입력해주세요.",
      detailed_address:
        address && detailed_address.length < 1
          ? "상세주소를 입력해주세요."
          : "",
    };

    // 아이디와 닉네임 중복 확인
    if (!statusMessages.id.includes("사용 가능한 아이디입니다.")) {
      if (window.confirm("닉네임 중복 확인이 필요합니다. ")) {
        return;
      }
    }
    if (!statusMessages.nickname.includes("사용 가능한 닉네임입니다.")) {
      if (window.confirm("닉네임 중복 확인이 필요합니다. ")) {
        return;
      }
    }

    // statusMessages에서 중복 확인 결과 가져오기
    if (
      statusMessages.id &&
      !statusMessages.id.includes("사용 가능한 아이디입니다.")
    ) {
      currentErrors.id = statusMessages.id;
    }
    if (
      statusMessages.nickname &&
      !statusMessages.nickname.includes("사용 가능한 닉네임입니다.")
    ) {
      currentErrors.nickname = statusMessages.nickname;
    }

    setErrors(currentErrors);

    // 에러가 없는 경우에만 폼 제출
    if (!Object.values(currentErrors).some((error) => error)) {
      console.log("폼 제출 가능: 에러 없음");
      onhandlePost(formData);
    } else {
      console.log("폼 제출 불가: 다음 에러가 있습니다", currentErrors);
      // 에러 메시지를 사용자에게 표시
      const errorMessages = Object.entries(currentErrors)
        .filter(([_, value]) => value !== "")
        .map(([field, message]) => `${message}`)
        .join("\n");
      alert(`다음 오류를 해결해주세요:\n\n${errorMessages}`);
    }
  };

  const onhandlePost = async (data) => {
    const formattedJoin = {
      loginId: data.id,
      password: data.password,
      nickname: data.nickname,
      name: data.name,
      email: data.email,
      phoneNumber: data.phone_number,
      address: data.address,
      detailedAddress: data.detailed_address,
      postCode: data.postcode,
    };

    try {
      const response = await axios.post(`${SERVER_URL}/member`, formattedJoin, {
        withCredentials: true,
      });

      console.log(response + "성공");
      navigate("/login");
    } catch (err) {
      console.log(err);
      setStatusMessages((prev) => ({
        ...prev,
        register: "회원가입에 실패하였습니다. 다시 한 번 확인해 주세요.",
      }));
    }
  };
// 컨테이너가 배경 위에 오도록 조정
const FormContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  flex-direction: column;
  z-index: 10; /* 배경 위로 나오도록 설정 */
  position: relative; /* 배경과의 위치 조정 */
  margin-top: -100px; /* 배경과 겹치지 않게 조정 */
`;

const FormRow = styled.div`
  display: flex;
  gap: 20px; /* 필드 사이의 간격 */
  width: 100%;
  justify-content: space-between;
`;

const HalfWidthBox = styled(InputLargeBox)`
  flex: 1; /* 각 필드가 균등한 너비를 가지도록 설정 */
`;
  ////////////////////////////////////////////

  return (
    <>
    <Background style={{
        width:"3000px",
        height:"500px"
         }}>
          </Background>
    <Layout>
         
      <div className="container">
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh",
            flexDirection: "column",
            marginTop: "150px",
            zIndex: 10, // 배경 위로 나오도록 설정 (숫자 값으로 전달)
        }}
        >
            <FormContainer> {/* 컨테이너가 배경 위에 배치 */}
          <h2 style={{ fontWeight: "bold",color:"white" }}>회원가입</h2>
          
          <form
            noValidate
            onSubmit={handleSubmit}
            style={{
              width: "720px", // 컨테이너를 좀 더 크게 조정
              padding: "70px",
              border: "1px solid lightgray",
              borderRadius: "10px",
              backgroundColor: "#fff",
              scale:"0.7",
            marginTop: "-150px",

            }}
          >
            <FormControl
              component="fieldset"
              variant="standard"
              sx={{
                gap: 3,
                display: "flex",
                flexDirection: "column",
                width: "100%",
              }} // Form 전체 크기 조절
            >
              <div
                style={{
                  display: "flex",
                  gap: "10px",

                }}
              >
                <InputLargeBox
                  id="id"
                  name="id"
                  label="아이디"
                  value={formData.id}
                  onChange={handleChange}
                  error={Boolean(errors.id)}
                  helperText={errors.id}
                  sx={{ flex: 1 }} // 필드와 버튼의 크기를 균일하게 유지
                />
                <BlueButtonComponent
                  text="중복 확인"
                  onClick={checkIdDuplicate}
                  sx={{ width: "120px", height: "56px" }} // 버튼 크기 고정
                />
              </div>
              <FormHelperTexts
                color={
                  statusMessages.id.includes("사용 가능한 아이디입니다.")
                    ? "green"
                    : "red"
                }
              >
                {statusMessages.id}
              </FormHelperTexts>

              <InputLargeBox
                required
                id="password"
                name="password"
                type="password"
                label="비밀번호"
                value={formData.password}
                onChange={handleChange}
                error={Boolean(errors.password)}
                helperText={errors.password}
                sx={{ width: "100%" }} // 필드의 너비 조절
              />
              <InputLargeBox
                required
                id="password_confirm"
                name="password_confirm"
                type="password"
                label="비밀번호 확인"
                value={formData.password_confirm}
                onChange={handleChange}
                error={Boolean(errors.password_confirm)}
                helperText={errors.password_confirm}
                sx={{ width: "100%" }}
              />

              <InputLargeBox
                required
                fullWidth
                id="name"
                name="name"
                label="이름"
                variant="standard"
                value={formData.name}
                onChange={handleChange}
                error={Boolean(errors.name)}
                helperText={errors.name}
              />
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                }}
              >
                <InputLargeBox
                  id="nickname"
                  name="nickname"
                  label="닉네임"
                  value={formData.nickname}
                  onChange={handleChange}
                  error={Boolean(errors.nickname)}
                  helperText={errors.nickname}
                  sx={{ flex: 1 }} // 필드와 버튼의 크기를 균일하게 유지
                />
                <BlueButtonComponent
                  text="중복 확인"
                  onClick={checkNickNameDuplicate}
                  sx={{ width: "120px", height: "56px" }} // 버튼 크기 고정
                />
              </div>
              <FormHelperTexts
                color={
                  statusMessages.nickname.includes("사용 가능한 닉네임입니다.")
                    ? "green"
                    : "red"
                }
              >
                {statusMessages.nickname}
              </FormHelperTexts>

              <InputLargeBox
                required
                id="email"
                name="email"
                label="이메일"
                value={formData.email}
                onChange={handleChange}
                error={Boolean(errors.email)}
                helperText={errors.email}
                sx={{ width: "100%" }}
              />
              <InputLargeBox
                required
                id="phone_number"
                name="phone_number"
                label="연락처"
                value={formData.phone_number}
                onChange={handleChange}
                error={Boolean(errors.phone_number)}
                helperText={errors.phone_number}
                sx={{ width: "100%" }}
              />

              <div style={{ display: "flex", gap: "10px" }}>
                <InputLargeBox
                  required
                  id="postcode"
                  name="postcode"
                  label="우편번호"
                  value={formData.postcode}
                  onChange={handleChange}
                  sx={{ flex: 1 }} // Flex로 크기 조절
                />
                <BlueButtonComponent
                  text="우편번호 검색"
                  onClick={handleAddressSearch}
                  sx={{ width: "30%" }} // 버튼 크기 조절
                />
              </div>

              <InputLargeBox
                required
                id="address"
                name="address"
                label="주소"
                value={formData.address}
                onChange={handleChange}
                sx={{ width: "100%" }}
              />
              <InputLargeBox
                required
                id="detailed_address"
                name="detailed_address"
                label="상세주소"
                value={formData.detailed_address}
                onChange={handleChange}
                sx={{ width: "100%" }}
              />

              <FormControlLabel
                required
                control={
                  <Checkbox checked={checked} onChange={handleCheckChange} />
                }
                label="담따 이용약관과 개인정보처리방침에 동의합니다."
                // sx={{ marginTop: "10px" }}
                onChange={handleChange}
              />

              <div
                style={{
                  display: "flex",
                  justifyContent:"flex-end",
                  gap: "10px",

                }}
              >
                <BlueBorderButtonComponent text="취소" onClick={handleCancel} />
                <BlueButtonComponent
                  text="회원가입"
                  variant="contained"
                  type="submit"
                />
              </div>
            </FormControl>
            <FormHelperTexts>{statusMessages.register}</FormHelperTexts>
          </form>      
          
          
          
          
          
          </FormContainer>

        </div>
      </div>

    </Layout>
    </>
  );
};
