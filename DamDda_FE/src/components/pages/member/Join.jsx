import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Button,
  CssBaseline,
  TextField,
  FormControl,
  FormControlLabel,
  Checkbox,
  FormHelperText,
  Typography,
  Container,
  Grid,
} from "@mui/material/";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import styled from "styled-components";

const FormHelperTexts = styled(FormHelperText)`
  width: 100%;
  padding-left: 16px;
  font-weight: 700 !important;
  color: ${({ color }) => color || "#d32f2f"} !important;
`;

const Join = () => {
  const theme = createTheme();
  const [checked, setChecked] = useState(false);
  const [idStatus, setIdStatus] = useState("");
  const [idError, setIdError] = useState("");
  const [passwordState, setPasswordState] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [nameError, setNameError] = useState("");
  const [nickNameStatus, setNickNameStatus] = useState("");
  const [nickNameError, setNickNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [addressError, setAddressError] = useState("");
  const [detailed_addressError, setDetailed_addressError] = useState("");
  const [registerError, setRegisterError] = useState("");

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
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Daum Postcode API 스크립트 로드
    const script = document.createElement("script");
    script.src =
      "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    script.async = true;
    script.onload = () => {
      console.log("Daum Postcode script loaded successfully.");
    };
    script.onerror = () => {
      console.error("Failed to load Daum Postcode script.");
    };
    document.body.appendChild(script);

    // Cleanup function to remove the script if needed
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // 인풋칸에 있는 값을 불러오기
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleAgree = (event) => {
    setChecked(event.target.checked);
  };

  // 취소버튼 누르면 이전페이지
  const handleCancel = () => {
    navigate(-1);
  };

  // 아이디 중복검사
  const checkIdDuplicate = async () => {
    const { id } = formData;
    try {
      const response = await axios.post("/member/check-id", { id });
      if (response.data.available) {
        setIdStatus("사용 가능한 아이디입니다.");
      } else {
        setIdStatus("이미 사용 중인 아이디입니다.");
      }
    } catch (err) {
      console.error(err);
      setIdStatus("아이디 확인에 실패했습니다.");
    }
  };

  // 닉네임 중복검사
  const checkNickNameDuplicate = async () => {
    const { nickname } = formData;
    try {
      const response = await axios.post("/member/check-nickname", { nickname });
      if (response.data.available) {
        setNickNameStatus("사용 가능한 닉네임입니다.");
      } else {
        setNickNameStatus("이미 사용 중인 닉네임입니다.");
      }
    } catch (err) {
      console.error(err);
      setNickNameStatus("닉네임 확인에 실패했습니다.");
    }
  };

  // 다음 주소 검색 API 호출
  const handleAddressSearch = () => {
    new window.daum.Postcode({
      oncomplete: function (data) {
        // 도로명 주소 또는 지번 주소를 설정
        const address =
          data.userSelectedType === "R" ? data.roadAddress : data.jibunAddress;

        // 상세주소는 빈 문자열로 초기화
        const extraAddress =
          data.userSelectedType === "R"
            ? data.bname
              ? `${data.bname}${
                  data.buildingName ? `, ${data.buildingName}` : ""
                }`
              : data.buildingName || ""
            : "";

        // 상태 업데이트
        setFormData({
          ...formData,
          address: address,
          detailed_address: extraAddress,
        });
      },
    }).open();
  };

  const onhandlePost = async (data) => {
    const {
      id,
      password,
      name,
      nickname,
      email,
      phone_number,
      address,
      detailed_address,
    } = data;
    const postData = {
      id,
      password,
      name,
      nickname,
      email,
      phone_number,
      ...(address && { address }), // 주소가 입력된 경우
      ...(detailed_address && { detailed_address }), // 상세주소가 입력된 경우
    };

    try {
      const response = await axios.post("/member/join", postData);
      console.log(response, "성공");
      navigate("/login");
    } catch (err) {
      console.log(err);
      setRegisterError("회원가입에 실패하였습니다. 다시 한 번 확인해 주세요.");
    }
  };

  const handleSubmit = (e) => {
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
    } = formData;

    // 아이디 유효성 체크 (4자 이상)
    if (id.length < 4) setIdError("아이디는 4자 이상이어야 합니다.");
    else setIdError("");

    // 비밀번호 유효성 체크 (8-16자)
    const passwordRegex = /^.{8,16}$/; // 비밀번호는 8자 이상, 16자 이하
    if (!passwordRegex.test(password))
      setPasswordState("비밀번호는 8-16자리 이상 입력해주세요!");
    else setPasswordState("");

    // 비밀번호 확인
    if (password !== password_confirm)
      setPasswordError("비밀번호가 일치하지 않습니다.");
    else setPasswordError("");

    // 이름 유효성 검사
    const nameRegex = /^[가-힣a-zA-Z]+$/;
    if (!nameRegex.test(name) || name.length < 1)
      setNameError("올바른 이름을 입력해주세요.");
    else setNameError("");

    // 닉네임 유효성 검사
    if (nickname.length < 1) setNickNameError("닉네임을 입력해주세요.");
    else setNickNameError("");

    // 이메일 유효성 체크
    const emailRegex = /^[A-Za-z0-9._-]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]{2,6}$/;
    if (!emailRegex.test(email))
      setEmailError("올바른 이메일 형식이 아닙니다.");
    else setEmailError("");

    // 연락처 유효성 검사
    const phoneNumberRegex = /([0-9]{2,4})-([0-9]{3,4})-([0-9]{4})$/;
    if (!phoneNumberRegex.test(phone_number))
      setPhoneNumberError("올바른 연락처를 입력해주세요.");
    else setPhoneNumberError("");

    // 주소 유효성 검사
    if (address.length < 1) setAddressError("주소를 입력해주세요.");
    else setAddressError("");

    // 상세 주소 유효성 검사
    if (detailed_address.length < 1)
      setDetailed_addressError("상세주소를 입력해주세요.");
    else setDetailed_addressError("");

    // 회원가입 동의 체크
    if (!checked) {
      alert("회원가입 약관에 동의해주세요.");
      return;
    }

    if (
      id.length >= 4 &&
      passwordRegex.test(password) &&
      password === password_confirm &&
      nameRegex.test(name) &&
      nickname.length > 0 &&
      emailRegex.test(email) &&
      phoneNumberRegex.test(phone_number) &&
      (address.length > 0 || !address) &&
      (detailed_address.length > 0 || !detailed_address) &&
      checked
    ) {
      onhandlePost(formData);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Typography component="h1" variant="h5">
          회원가입
        </Typography>
        <div component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <FormControl component="fieldset" variant="standard">
            <Grid container spacing={2}>
              <TextField
                required
                fullWidth
                id="id"
                name="id"
                label="아이디"
                variant="standard"
                value={formData.id}
                onChange={handleChange}
                error={Boolean(idError)}
                helperText={idError}
              />
              <Button
                variant="outlined"
                onClick={checkIdDuplicate}
                sx={{ mt: 1 }}
              >
                중복 확인
              </Button>
              <FormHelperTexts
                color={
                  idStatus.includes("사용 가능한 아이디입니다.")
                    ? "green"
                    : "red"
                }
              >
                {idStatus}
              </FormHelperTexts>

              <TextField
                required
                fullWidth
                type="password"
                id="password"
                name="password"
                label="비밀번호"
                variant="standard"
                value={formData.password}
                onChange={handleChange}
                error={Boolean(passwordState)}
                helperText={passwordState}
              />
              <TextField
                required
                fullWidth
                type="password"
                id="password_confirm"
                name="password_confirm"
                label="비밀번호 확인"
                variant="standard"
                value={formData.password_confirm}
                onChange={handleChange}
                error={Boolean(passwordError)}
                helperText={passwordError}
              />

              <TextField
                required
                fullWidth
                id="name"
                name="name"
                label="이름"
                variant="standard"
                value={formData.name}
                onChange={handleChange}
                error={Boolean(nameError)}
                helperText={nameError}
              />

              <TextField
                required
                fullWidth
                id="nickname"
                name="nickname"
                label="닉네임"
                variant="standard"
                value={formData.nickname}
                onChange={handleChange}
                error={Boolean(nickNameError)}
                helperText={nickNameError}
              />
              <Button
                variant="outlined"
                onClick={checkNickNameDuplicate}
                sx={{ mt: 1 }}
              >
                중복 확인
              </Button>
              <FormHelperTexts
                color={
                  nickNameStatus.includes("사용 가능한 닉네임입니다.")
                    ? "green"
                    : "red"
                }
              >
                {nickNameStatus}
              </FormHelperTexts>

              <TextField
                required
                fullWidth
                id="email"
                name="email"
                label="이메일 주소"
                variant="standard"
                value={formData.email}
                onChange={handleChange}
                error={Boolean(emailError)}
                helperText={emailError}
              />

              <TextField
                required
                fullWidth
                id="phone_number"
                name="phone_number"
                label="연락처"
                variant="standard"
                value={formData.phone_number}
                onChange={handleChange}
                error={Boolean(phoneNumberError)}
                helperText={phoneNumberError}
              />

              <TextField
                required
                fullWidth
                id="address"
                name="address"
                label="주소"
                variant="standard"
                value={formData.address}
                onChange={handleChange}
                error={Boolean(addressError)}
                helperText={addressError}
              />
              <Button
                variant="outlined"
                onClick={handleAddressSearch}
                sx={{ mt: 1 }}
              >
                주소 검색
              </Button>

              <TextField
                required
                fullWidth
                id="detailed_address"
                name="detailed_address"
                label="상세주소"
                variant="standard"
                value={formData.detailed_address}
                onChange={handleChange}
                error={Boolean(detailed_addressError)}
                helperText={detailed_addressError}
              />

              <FormControlLabel
                control={<Checkbox onChange={handleAgree} color="primary" />}
                label="회원가입 약관에 동의합니다."
              />
            </Grid>
            <Button
              fullWidth
              variant="outlined"
              sx={{ mt: 3, mb: 2 }}
              size="large"
              onClick={handleCancel}
            >
              취소
            </Button>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              size="large"
            >
              회원가입
            </Button>
          </FormControl>
          <FormHelperTexts>{registerError}</FormHelperTexts>
        </div>
      </Container>
    </ThemeProvider>
  );
};

export default Join;
