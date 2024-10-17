import React, { useState } from "react";
import { Link as MuiLink } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../../UserContext";
import {
  BlueButtonComponent,
  BlueBorderButtonComponent,
} from "components/common/ButtonComponent";
import { InputLargeBox,PasswordInputBox } from "components/common/InputBoxComponent";
import { Layout } from "components/layout/DamDdaContainer"; // Layout 컴포넌트 import
import PersonIcon from "@mui/icons-material/Person"; // 사람 아이콘
import axios from "axios";
import { SERVER_URL } from "constants/URLs";
import Cookies from "js-cookie";

export const Login = () => {
  const [formData, setFormData] = useState({ id: "", password: "" });
  const [idError, setIdError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loginError, setLoginError] = useState(""); // 로그인 오류 메시지 추가
  const { login } = useUser();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setLoginError(""); // 입력할 때마다 로그인 오류 메시지 초기화
  };

  const fetchUserInfo = async (accessToken) => {
    const response = await axios.get(`${SERVER_URL}/member/userinfo`, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const contextInfo = {
      id: response.data.id,
      key: response.data.key,
      profile: response.data.imageUrl,
      nickname: response.data.nickname,
    };
    login(contextInfo);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formatLogin = {
      loginId: formData.id,
      password: formData.password,
    };
  
    try {
      let valid = true;
  
      // 유효성 검사
      if (!formData.id) {
        setIdError("아이디를 입력해주세요.");
        valid = false;
      } else {
        setIdError("");
      }
  
      if (!formData.password) {
        setPasswordError("비밀번호를 입력해주세요.");
        valid = false;
      } else {
        setPasswordError("");
      }
  
    
    // 모든 필드가 입력되었을 때만 검증 진행
    if (valid) {
      const response = await axios.post(
        `${SERVER_URL}/member/login`,
        formatLogin,
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );

      const accessToken = response.headers["authorization"].split(" ")[1];
      if (accessToken) {
        // 토큰을 제대로 저장
        Cookies.set("accessToken", accessToken);
      }
      fetchUserInfo(accessToken); // 토큰을 제대로 전달

      // login(userData);
      navigate("/", { state: { id: formData.id } });
    }
  } catch (error) {
    setLoginError("로그인 정보가 틀렸습니다. 다시 입력해주세요.");
  }
};


    

  

  const handleJoinClick = () => {
    navigate("/join"); // 회원가입 페이지로 이동
  };

  return (
    <Layout>
      <div className="container">
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh",
            flexDirection: "column",
          }}
        >
          <h2 style={{ fontWeight: "bold", marginBottom: "30px" }}>로그인</h2>
          <form
            onSubmit={handleSubmit}
            style={{
              width: "420px", // 컨테이너를 좀 더 크게 조정
              padding: "50px",
              border: "1px solid lightgray",
              borderRadius: "10px",
              backgroundColor: "#fff",
            }}
          >
            {/* 아이디 입력란에 사람 아이콘 추가 */}
            <div style={{ position: "relative", marginBottom: "15px" }}>
              <InputLargeBox
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
                margin="normal"
                readOnly={false} // readOnly 속성을 false로 설정
              />
            </div>

            {/* 비밀번호 입력란에 잠금열쇠 아이콘 추가 */}
            <div style={{ position: "relative", marginBottom: "20px" }}>
            <PasswordInputBox
                title="비밀번호"
                name="password"
                value={formData.password}
                onChange={handleChange}
                error={Boolean(passwordError)}
                errorMessage={passwordError}
                id="password"
                required={true}
              />
            </div>

            {/* 로그인 에러 메시지 */}
            {loginError && (
              <div
                style={{ color: "red", marginTop: "5px", marginLeft: "5px" }}
              >
                {loginError}
              </div>
            )}

            <div
              style={{
                marginTop: "30px",
                display: "flex",
                justifyContent: "flex-end", // 버튼을 오른쪽 정렬
                alignItems: "center",
              }}
            >
              <BlueBorderButtonComponent
                text="회원가입"
                onClick={handleJoinClick}
                sx={{ margin: "20px", width: "250px", height: "50px" }} // 추가 스타일
              />
              <div style={{ margin: "0px 5px" }}></div> {/* 버튼 사이 간격 */}
              <BlueButtonComponent
                text="로그인"
                onClick={handleSubmit}
                sx={{ width: "1500px", height: "50px" }} // 추가 스타일
              />
            </div>

            <div
              style={{ margin: "30px 0", borderBottom: "1px solid lightgray" }}
            />

            <div style={{ marginTop: "20px", textAlign: "right" }}>
              <div>
                아이디를 잊어버리셨나요?{" "}
                <MuiLink component={Link} to="/find-id" variant="body2">
                  아이디 찾기
                </MuiLink>
              </div>

              <div>
                비밀번호를 잊어버리셨나요?{" "}
                <MuiLink component={Link} to="/reset-password" variant="body2">
                  비밀번호 재설정하기
                </MuiLink>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};
