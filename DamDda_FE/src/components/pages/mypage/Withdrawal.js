import React, { useEffect, useState } from "react";
import { Typography, Box, Checkbox, FormControlLabel } from "@mui/material";
import Modal from "./EditModal"; // 비밀번호 모달 컴포넌트
import StatusButton from "./StatusButton";
import axios from "axios"; // API 호출을 위해 axios를 import
import Cookies from "js-cookie";
import { SERVER_URL } from "../../../constants/URLs";
import { useUser } from "../../../UserContext";
import { borderRadius } from "@mui/system";
import { useNavigate } from "react-router-dom";

const Withdrawal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 열기 상태 관리
  const [password, setPassword] = useState(""); // 비밀번호 입력 상태
  const [passwordError, setPasswordError] = useState(""); // 비밀번호 에러 메시지
  const [checked, setChecked] = useState(false);
  const { user, setUser } = useUser();
  const navigate = useNavigate();
  const { logout, isLogin } = useUser();

  // 모달 열기
  useEffect(() => {
    setIsModalOpen(true);
  }, []);

  // 비밀번호 확인 함수
  const handleSubmit = async () => {
    const formatLogin = {
      loginId: user.id,
      password: password,
    };
    try {
      // let valid = true;

      const response = await axios.post(
        `${SERVER_URL}/member/login`,
        formatLogin,
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      // response.data에서 X-Nickname 값 가져오기
      const nickname = response.data["X-Nickname"];
      if (nickname === user.nickname) {
        setPasswordError(""); // 에러 메시지 초기화
        setIsModalOpen(false); // 모달 닫기
      } else {
        setPasswordError("비밀번호가 틀렸습니다. 다시 입력해주세요.");
      }
    } catch (error) {
      setPasswordError("비밀번호가 틀렸습니다. 다시 입력해주세요.");
    }
  };

  // 모달을 닫을 수 없도록 비활성화
  const handleCloseModal = () => {
    // 아무 동작도 하지 않음
  };

  // 회원탈퇴 요청 함수
  const handleDeleteAccount = async () => {
    try {
      const response = await axios.delete(`${SERVER_URL}/member/${user.id}`, {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      });
      if (response.status === 200) {
        alert("회원탈퇴가 완료되었습니다.");
        // 로그아웃 처리
        setUser(null);
        // 메인페이지로 리다이렉트
        navigate("/");
      }
    } catch (error) {
      alert("회원탈퇴 중 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  // 체크박스 상태 변경
  const handleCheck = (event) => {
    setChecked(event.target.checked);
  };

  // 회원탈퇴 버튼 클릭 처리
  const handleWithdrawlCilck = () => {
    if (checked) {
      alert("회원탈퇴가 완료되었습니다.");
    } else {
      alert("탈퇴 동의가 필요합니다");
    }
  };

  return (
    <Box>
      {/* 비밀번호 확인 모달 */}
      <Modal
        open={isModalOpen} // 모달이 열려 있는지 여부
        onClose={handleCloseModal} // 모달 닫히지 않도록 설정
        // onClose={() => setIsModalOpen(false)} // 모달 닫기
        disableEscapeKeyDown // 외부클릭으로 모달 닫힘 방지
        onSubmit={handleSubmit} // 비밀번호 확인 로직
        currentPassword={password}
        errorMessage={passwordError} // 비밀번호 오류 메시지
        setError={setPasswordError}
        error={passwordError}
      />

      {/* 모달이 닫힌 후에만 탈퇴 내용 표시 */}
      {!isModalOpen && <></>}
      {/* 탈퇴하기 창 */}
      <Typography
        variant="h6"
        gutterBottom
        style={{
          fontWeight: "bold",
          marginTop: "-20px",
          padding: "50px",
          marginLeft: "250px",
        }}
      >
        회원탈퇴
      </Typography>

      {/* 빨간색 박스 */}
      <Box
        sx={{
          border: "1px solid gray",
          padding: "5px",
          marginTop: "-50px",
          backgroundColor: "#fff5f5", // 연한 빨강 배경
          width: "800px",
          marginLeft: "300px",
        }}
      >
        {/* 탈퇴 경고 메세지 */}
        <Typography
          variant="body1"
          color="error"
          gutterBottom
          style={{
            color: "red",
            fontSize: "16px",
            marginTop: "10px",
            fontWeight: "bold",
            marginLeft: "25px",
          }}
        >
          회원 탈퇴 시, 회원님의 모든 개인 정보 및 관련 데이터는 즉시
          삭제됩니다. 이로 인해 회원님이 진행 중이던 <br /> 모든 프로젝트와 후원
          내역이 더 이상 관리되지 않으며, 해당 데이터는 복구할 수 없습니다.{" "}
          <br />
          회원 탈퇴 전, 유의사항을 확인해 주시기 바랍니다.
        </Typography>
      </Box>

      <Typography
        variant="h6"
        gutterBottom
        style={{
          fontWeight: "bold",
          marginTop: "-20px",
          padding: "50px",
          marginLeft: "250px",
        }}
      >
        유의사항
      </Typography>

      {/* 유의사항 박스 */}
      <Box
        sx={{
          border: "1px solid gray",
          padding: "15px",
          marginTop: "-50px",
          backgroundColor: "#f2f2f2", // 연한 회색 배경
          width: "800px",
          marginLeft: "300px",
        }}
      >
        {/* 유의사항 메세지 */}
        <Typography
          variant="body2"
          style={{
            color: "black",
            fontSize: "16px",
            marginTop: "10px",

            marginLeft: "0px",
          }}
        >
          ・ 회원 탈퇴 이후에는 로그인 및 사이트 내 서비스 이용이 불가능하며,
          탈퇴된 계정은 재사용할 수 없습니다. <br />
          ・ 탈퇴 시 회원님의 후원 내역 및 프로젝트 관리 권한은 삭제되며, 더
          이상 수정이나 확인이 불가합니다.
          <br />
          ・ 후원이 진행 중인 프로젝트가 있을 경우, 탈퇴 전 반드시 후원 상태를
          확인하시기 바랍니다. <br />
          ・ 진행 중인 펀딩이 있는 경우 환불이 불가할 수 있습니다.
          <br />
          ・ 탈퇴 후에도 사용자가 올린 프로젝트는 사이트에서 유지될 수 있으며,
          이와 관련한 책임은 탈퇴 후에도 <br />{" "}
          <span style={{ display: "inline-block", marginLeft: "20px" }}></span>
          사용자에게 남을 수 있습니다.
          <br />・ 재가입을 원할 경우, 신규 가입 절차를 진행해야 하며, 이전 계정
          정보는 복구되지 않습니다.
        </Typography>
      </Box>

      {/* 체크박스 */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          // marginLeft: "150px",
        }}
      />

      {/* 체크박스와 라벨 */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      ></Box>
      <FormControlLabel
        style={{
          marginLeft: "285px",
        }}
        control={
          <Checkbox
            checked={checked}
            onChange={handleCheck}
            style={{ marginTop: "20px" }}
          />
        }
        label="해당 내용을 모두 확인했으며, 회원탈퇴에 동의합니다."
        sx={{
          "& .MuiFormControlLabel-label": {
            marginTop: "20px", // 텍스트를 아래로 내림
          },
        }}
      />

      {/* 회원탈퇴 버튼 */}
      <Box></Box>
      <StatusButton
        status="회원탈퇴"
        label="회원탈퇴"
        onClick={handleWithdrawlCilck}
        sx={{
          marginTop: "10px",
          marginLeft: "650px",
          borderRadius: "5px",
        }}
      ></StatusButton>
    </Box>
  );
};

export default Withdrawal;
