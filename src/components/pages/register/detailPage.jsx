import React, { useState, useRef, useEffect } from "react";
import {
  TextField,
  Button,
  Typography,
  Modal,
  Snackbar,
  IconButton,
  Paper,
  Input,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import CloseIcon from "@mui/icons-material/Close";
import Alert from "@mui/material/Alert";

import styled from "styled-components";
import "./Register.css";
import "../../styles/style.css";

const DetailPage = ({
  descriptionImagesUrl,
  descriptionDetail,
  setDescriptionDetail,
  setDescriptionImages,
}) => {
  const [formData, setFormData] = useState({
    description: "",
  });
  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      description: descriptionDetail, // description 필드를 업데이트
    }));
    setImagePreviews(descriptionImagesUrl);
  }, [descriptionDetail]);
  const [aiModalOpen, setAiModalOpen] = useState(false);
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [aiText, setAiText] = useState("AI가 생성한 설명 내용");

  console.log(imagePreviews);
  console.log(formData.description, "1 ", descriptionDetail);

  const inputRef = useRef(null);

  const openAiModal = () => {
    setAiModalOpen(true);
  };

  const closeAiModal = () => {
    setAiModalOpen(false);
  };

  const handleRegisterDescription = () => {
    setConfirmationOpen(true);
    closeAiModal();
  };

  const handleConfirmRegister = () => {
    setFormData({
      ...formData,
      description: aiText,
    });
    setConfirmationOpen(false);
    setSnackbarOpen(true);
  };

  const handleCloseConfirmation = () => {
    setConfirmationOpen(false);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);

    const filePreviews = files.map((file) => {
      return URL.createObjectURL(file);
    });

    setDescriptionImages((prevImages) => [...prevImages, ...files]);
    setImagePreviews((prevImages) => [...prevImages, ...filePreviews]);
    console.log(imagePreviews);
  };

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  const handleImageDelete = (index) => {
    setImagePreviews((prevImages) => {
      const newImages = prevImages.slice();
      newImages.splice(index, 1);
      return newImages;
    });
    setDescriptionImages((prevImages) => {
      const newImages = prevImages.slice();
      newImages.splice(index, 1);
      return newImages;
    });
  };

  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* 페이지 제목과 버튼 */}
          <div
            style={{
              width: "100%",
              marginTop: "20px",
            }}
          >
            <h1>상세설명</h1>
            <div className="button-right">
              <Button
                className="outlined-button"
                variant="outlined"
                onClick={openAiModal}
              >
                AI 도움받기
              </Button>
            </div>
          </div>

          {/* 상세설명 인풋창 */}
          <div
            style={{
              width: "100%",
              marginTop: "20px",
              display: "flex",
              alignItems: "flex-end",
            }}
          >
            <TextField
              label="상세 설명"
              name="description"
              fullWidth
              multiline
              rows={4}
              value={formData.description}
              onChange={(e) => {
                setDescriptionDetail(e.target.value);
                setFormData({ ...formData, description: e.target.value });
              }}
            />
          </div>

          {/* AI 도움받기 모달 */}
          <Modal open={aiModalOpen} onClose={closeAiModal}>
            <div
              style={{
                padding: "20px",
                backgroundColor: "#fff",
                margin: "auto",
                width: "400px",
                marginTop: "100px",
              }}
            >
              <Typography variant="h6">AI 도움받기</Typography>
              <TextField
                fullWidth
                multiline
                rows={4}
                value={aiText}
                InputProps={{
                  readOnly: true,
                }}
                style={{ marginTop: "20px" }}
              />
              <Button onClick={closeAiModal}>닫기</Button>
              <Button
                variant="contained"
                style={{ marginLeft: "10px" }}
                onClick={handleRegisterDescription}
              >
                상세설명으로 등록
              </Button>
            </div>
          </Modal>

          {/* 등록 확인 모달 */}
          <Modal open={confirmationOpen} onClose={handleCloseConfirmation}>
            <div
              style={{
                padding: "20px",
                backgroundColor: "#fff",
                margin: "auto",
                width: "400px",
                marginTop: "100px",
              }}
            >
              <Typography>정말로 등록하시겠습니까?</Typography>
              <Button
                onClick={handleConfirmRegister}
                variant="contained"
                style={{ marginRight: "10px" }}
              >
                확인
              </Button>
              <Button onClick={handleCloseConfirmation}>취소</Button>
            </div>
          </Modal>

          {/* 성공 메시지 스낵바 */}
          <Snackbar
            open={snackbarOpen}
            autoHideDuration={6000}
            onClose={handleSnackbarClose}
          >
            <Alert onClose={handleSnackbarClose} severity="success">
              상세설명이 등록되었습니다!
            </Alert>
          </Snackbar>

          {/* 이미지 미리보기 및 업로드 */}
          <div style={{ width: "100%", marginTop: "40px" }}>
            <Typography variant="h6">이미지</Typography>
            <Paper
              style={{
                padding: "20px",
                minHeight: "100px",
                position: "relative",
              }}
            >
              {imagePreviews.map((preview, index) => (
                <div
                  key={index}
                  style={{
                    position: "relative",
                    display: "inline-block",
                    margin: "10px",
                  }}
                >
                  <img
                    src={preview}
                    alt={`preview-${index}`}
                    style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "cover",
                    }}
                  />
                  <IconButton
                    onClick={() => handleImageDelete(index)}
                    style={{ position: "absolute", top: 0, right: 0 }}
                  >
                    <CloseIcon />
                  </IconButton>
                </div>
              ))}
              <Input
                type="file"
                inputProps={{ multiple: true }}
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  opacity: 0,
                  width: 0,
                  height: 0,
                }}
                ref={inputRef}
                onChange={handleImageUpload}
              />
            </Paper>
            <Button
              className="primary-button"
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              onClick={() => inputRef.current.click()}
            >
              📤이미지 업로드
              <VisuallyHiddenInput
                type="file"
                onChange={handleImageUpload}
                multiple
              />
            </Button>
          </div>
        </div>
      </LocalizationProvider>
    </div>
  );
};

export default DetailPage;
