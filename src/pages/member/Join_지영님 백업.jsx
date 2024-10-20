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
import { Layout } from "components/layout/DamDdaContainer";
import { SERVER_URL } from "constants/URLs";
import {
  StandardInputBox,
  PasswordInputBox,
} from "components/common/InputBoxComponent";
import {
  StyledBlueButtonComponent,
  BlueButtonComponent,
  BlueBorderButtonComponent,
} from "components/common/ButtonComponent";

const FormContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 110vh;
  flex-direction: column;
  z-index: 10;
  position: relative;
  margin-top: 140px;
  border-radius: 20px;
`;

const FormRow = styled.div`
  display: flex;
  align-items: flex-end; /* 수직 정렬 */
  gap: 10px; /* 필드와 버튼 사이 간격 */
  width: 100%;
`;

export const Join = () => {
  return (
    <>
      <Layout>
        <FormContainer>
          <h2 style={{ fontWeight: "bold", marginBottom: "30px" }}>회원가입</h2>
          <form
            onSubmit={handleSubmit}
            style={{
              width: "720px",
              padding: "70px",
              border: "1px solid lightgray",
              borderRadius: "10px",
              backgroundColor: "#fff",
            }}
          >
            <FormControl
              component="fieldset"
              sx={{
                gap: 3,
                display: "flex",
                flexDirection: "column",
                width: "100%",
              }}
            >
              {/* 아이디 입력 필드와 중복 확인 버튼 */}
              <FormRow>
                <StandardInputBox
                  title="아이디"
                  name="id"
                  value={formData.id}
                  onChange={handleChange}
                  error={Boolean(errors.id)}
                  errorMessage={statusMessages.id} // 여기에서 메시지가 표시되는지 확인
                />
                <StyledBlueButtonComponent
                  onClick={checkIdDuplicate}
                  text={"중복확인"}
                />
              </FormRow>

              {/* 비밀번호와 비밀번호 확인 입력 */}
              <PasswordInputBox
                title="비밀번호"
                name="password"
                placeholder="비밀번호를 입력해주세요"
                value={formData.password}
                onChange={handleChange}
                error={Boolean(errors.password)}
                errorMessage={errors.password}
              />
              <PasswordInputBox
                title="비밀번호 확인"
                name="password_confirm"
                placeholder="비밀번호 확인"
                value={formData.password_confirm}
                onChange={handleChange}
                error={Boolean(errors.password_confirm)}
                errorMessage={errors.password_confirm}
              />
              <FormRow>
                <StandardInputBox
                  title="이름"
                  name="name" // name 필드에 맞게 설정
                  value={formData.name} // formData의 name 필드와 매핑
                  onChange={handleChange}
                  placeholder="이름을 입력해주세요"
                  error={Boolean(errors.name)} // 오류가 name에 맞게 확인되도록 설정
                  errorMessage={errors.name} // 오류 메시지 전달
                />
              </FormRow>

              {/* 닉네임 입력 필드와 중복 확인 버튼 */}
              <FormRow
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "flex-end",
                }}
              >
                <StandardInputBox
                  title="닉네임"
                  name="nickname"
                  placeholder="ex) 홍길동"
                  value={formData.nickname}
                  onChange={handleChange}
                  error={Boolean(errors.nickname)}
                  errorMessage={statusMessages.nickname} // 메시지 표시 확인
                />
                <StyledBlueButtonComponent
                  onClick={checkNicknameDuplicate}
                  text={"중복확인"}
                />
              </FormRow>

              <StandardInputBox
                title="이메일"
                name="email"
                value={formData.email}
                placeholder="0000@naver.com"
                onChange={handleChange}
                error={Boolean(errors.email)}
                errorMessage={errors.email}
              />

              <StandardInputBox
                title="연락처"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleChange}
                placeholder="010-1234-5678"
                error={Boolean(errors.phone_number)}
                errorMessage={errors.phone_number}
              />

              <FormControlLabel
                control={
                  <Checkbox
                    checked={checked}
                    onChange={() => setChecked(!checked)}
                  />
                }
                label="이용약관에 동의합니다."
              />

              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: "10px",
                }}
              >
                <BlueBorderButtonComponent text="취소" onClick={handleCancel} />
                <BlueButtonComponent text="회원가입" type="submit" />
              </div>
            </FormControl>
          </form>
        </FormContainer>
      </Layout>
    </>
  );
};
