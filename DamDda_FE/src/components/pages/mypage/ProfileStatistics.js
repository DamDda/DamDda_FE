import React, { useState, useEffect } from "react";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardBody,
  MDBTypography,
} from "mdb-react-ui-kit";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Avatar from "@mui/joy/Avatar";
import Modal from "./EditModal"; // 비밀번호 모달 컴포넌트
import axios from "axios"; // API 호출을 위해 axios를 import
import Cookies from "js-cookie";
import { SERVER_URL } from "../../../constants/URLs";
import { useUser } from "../../../UserContext";

// *************
export default function ProfileStatistics({ setIsEditing }) {
  const [profile, setProfile] = useState(null); // 사용자 프로필 정보 상태
  const [isModalOpen, setIsModalOpen] = useState(false); // 비밀번호 모달 상태
  const [passwordError, setPasswordError] = useState(""); // 비밀번호 에러 메시지
  const [password, setPassword] = useState(""); // 초기 비밀번호
  const [passwordDisplay, setPasswordDisplay] = useState(""); // 비밀번호 표시 상태
  const { user } = useUser();

  // useEffect(() => {
  //   fetchProfileData(); // 프로필 데이터 로드
  // }, []);
  const fetchProfileData = async () => {
    console.log("fetchProfileData" + fetchProfileData);
    try {
      // const response = await axios.get(`${SERVER_URL}/members/profile?loginId=${user.id}`, {
      const response = await axios.get(`${SERVER_URL}/damdda/member/profile`, {
        headers: {
          ...(Cookies.get("accessToken") && {
            Authorization: `Bearer ${Cookies.get("accessToken")}`,
          }),
        },
        withCredentials: true,
      });
      console.log(response.data);
      // 로컬 스토리지에 데이터가 없을 때 초기 비밀번호 설정
      const initialProfileData = {
        loginId: response.data.loginId,
        name: response.data.name,
        email: response.data.email,
        nickname: response.data.nickname,
        phoneNumber: response.data.phoneNumber,
        password: response.data.password,
        address: response.data.address,
        //imageUrl: response.data.imageUrl,
      };
      setProfile(initialProfileData);
      setPassword(initialProfileData.password); // 비밀번호 설정
      setPasswordDisplay("*".repeat(initialProfileData.password.length)); // 비밀번호를 별표로 표시
    } catch (error) {
      console.error("프로필 데이터를 불러오는 중 오류 발생:", error);
    }
  };

  useEffect(() => {
    fetchProfileData(); // 프로필 데이터 로드
  }, []);

  // 프로필 수정 버튼 클릭 시 모달 열기
  const handleProfileEdit = () => {
    // setPassword("1234"); // 모달 열때마다 비밀번호 초기화
    setIsModalOpen(true); // 모달 열기
  };

  // // 비밀번호 모달에서 확인 버튼 클릭 시 처리 로직
  // const handlePasswordSubmit = (inputPassword) => {
  //   console.log("11111111111111111")
  //   if (inputPassword === password) {
  //     setPasswordError(""); // 에러 메시지 초기화
  //     setIsModalOpen(false); // 모달 닫기
  //     setIsEditing(true); // 프로필 수정 페이지로 이동
  //   } else {
  //     setPasswordError("비밀번호가 틀렸습니다. 다시 입력해주세요.");
  //   }
  // };

  const UserAvatar = ({ profile, defaultImageUrl, ...props }) => {
    return (
      <Avatar
        sx={{ width: 100, height: 100, marginTop: "20px" }}
        src={profile.imageUrl || defaultImageUrl}
        {...props}
      />
    );
  };
  if (!profile) {
    return <div>로딩 중...</div>;
  }

  const handleSubmit = async (inputPassword) => {
    console.log("handleSubmit 처음 부분:");
    // e.preventDefault();

    const formatLogin = {
      loginId: user.id,
      password: inputPassword,
    };
    try {
      let valid = true;
      console.log("트라이 처음 부분:");

      // 모든 필드가 입력되었을 때만 검증 진행
      if (valid) {
        console.log("if처음부분임:");
        const response = await axios.post(
          `${SERVER_URL}/damdda/member/login`,
          formatLogin,
          {
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
          }
        );
        // response.data에서 X-Nickname 값 가져오기
        const nickname = response.data["X-Nickname"];
        console.log("Nickname:", nickname);
        if (nickname === user.nickname) {
          setIsEditing(true); // 프로필 수정 페이지로 이동
          setPasswordError(""); // 에러 메시지 초기화
          setIsModalOpen(false); // 모달 닫기
        } else {
          setPasswordError("비밀번호가 틀렸습니다. 다시 입력해주세요.");
        }
      }
    } catch (error) {
      setPasswordError("비밀번호가 틀렸습니다. 다시 입력해주세요.");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        minHeight: "100vh",
        // backgroundColor: "#fff",
      }}
    >
      <MDBContainer style={{ width: "200%" }}>
        <MDBRow className="justify-content-center">
          <MDBCol md="8" xl="6" className="d-flex justify-content-center">
            <MDBCard
              style={{
                width: "100%",
                // maxWidth: "600px",
                // borderRadius: "15px",
                backgroundColor: "transparent",
                // boxShadow: "none",
              }}
            >
              <MDBCardBody
                className="text-center d-flex flex-column align-items-center"
                style={{ paddingBottom: "50px" }}
              >
                {/* 프로필 이미지 */}
                <div
                  className="mt-3 mb-4"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Avatar
                    sx={{ width: 100, height: 100, marginTop: "20px" }}
                    src={profile.imageUrl}
                  />
                  <MDBTypography tag="h4" className="mt-3 mb-4">
                    {profile.nickname}
                  </MDBTypography>
                </div>

                {/* 사용자 정보 입력 폼 */}
                <Box
                  component="form"
                  sx={{
                    "& .MuiTextField-root": { m: 2, width: "90%" },
                    marginTop: 3,
                    marginLeft: "10px",
                  }}
                  noValidate
                  autoComplete="off" // 자동 완성 끄기
                >
                  <TextField
                    label="아이디"
                    value={profile.loginId}
                    size="small"
                    variant="standard"
                    fullWidth
                    InputProps={{ readOnly: true }}
                  />
                  <TextField
                    label="이름"
                    value={profile.name}
                    size="small"
                    variant="standard"
                    fullWidth
                    InputProps={{ readOnly: true }}
                  />
                  <TextField
                    label="이메일"
                    value={profile.email}
                    size="small"
                    variant="standard"
                    fullWidth
                    InputProps={{ readOnly: true }}
                  />
                  <TextField
                    label="닉네임"
                    value={profile.nickname}
                    size="small"
                    variant="standard"
                    fullWidth
                    InputProps={{ readOnly: true }}
                  />

                  {/* <TextField
                    label="비밀번호"
                    value={passwordDisplay} // 비밀번호 길이에 맞춘 별표 표시
                    size="small"
                    variant="standard"
                    fullWidth
                    type="password" // 입력 시에도 비밀번호는 *로 표시
                    InputProps={{ readOnly: true }}
                  /> */}
                  <TextField
                    label="휴대폰 번호"
                    value={profile.phoneNumber}
                    size="small"
                    variant="standard"
                    fullWidth
                    InputProps={{ readOnly: true }}
                  />
                  <TextField
                    label="배송지"
                    value={profile.address}
                    size="small"
                    variant="standard"
                    fullWidth
                    InputProps={{ readOnly: true }}
                  />
                </Box>
                {/* 프로필 수정 버튼 */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "10px",
                  }}
                >
                  <MDBTypography
                    tag="span"
                    onClick={handleProfileEdit} // 수정 버튼 클릭 시 모달 열기
                    style={{
                      color: "#999",
                      textDecoration: "underline",
                      cursor: "pointer",
                      fontSize: "12px",
                    }}
                  >
                    프로필 수정
                  </MDBTypography>
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>

      {/* 비밀번호 입력 모달 */}
      <Modal
        open={isModalOpen} // 모달이 열려 있는지 여부
        onClose={() => setIsModalOpen(false)} // 모달 닫기
        onSubmit={handleSubmit} // 비밀번호 확인 로직
        // onSubmit={handlePasswordSubmit} // 비밀번호 확인 로직
        currentPassword={password}
        errorMessage={passwordError} // 비밀번호 오류 메시지
        setError={setPasswordError}
        error={passwordError}
      />
      {/* 취소 버튼 */}
      {/* <button onClick={() => setIsModalOpen(false)}>취소</button> */}

      {/* 확인 버튼에 handleSubmit 연결 */}
      {/* <button onClick={handleSubmit}>확인</button> */}
    </div>
  );
}
