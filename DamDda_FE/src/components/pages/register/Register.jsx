import React, { useState, useRef } from "react";
import {
  TextField,
  Button,
  Typography,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Modal,
  Box,
} from "@mui/material";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

// 각 섹션
const SECTIONS = {
  DESCRIPTION: "description",
  PACKAGE: "package",
  DOCUMENT: "document",
};

const Register = () => {
  const [formData, setFormData] = useState({
    category_id: "",
    subcategory: "",
    title: "",
    description: "",
    target_funding: "",
    start_date: null,
    end_date: null,
    delivery_date: null,
    tags: "",
  });

  const [selectedImage, setSelectedImage] = useState(null);
  const [currentTab, setCurrentTab] = useState(SECTIONS.DESCRIPTION);
  const [aiModalOpen, setAiModalOpen] = useState(false);
  const [aiGeneratedDescription, setAiGeneratedDescription] =
    useState("DB에서 불러온 설명 내용");
  
  const descriptionRef = useRef(null);
  const packageRef = useRef(null);
  const documentRef = useRef(null);

  const handleTabChange = (newValue) => {
    setCurrentTab(newValue);
    // 섹션으로 스크롤 이동
    if (newValue === SECTIONS.DESCRIPTION && descriptionRef.current) {
      descriptionRef.current.scrollIntoView({ behavior: "smooth" });
    } else if (newValue === SECTIONS.PACKAGE && packageRef.current) {
      packageRef.current.scrollIntoView({ behavior: "smooth" });
    } else if (newValue === SECTIONS.DOCUMENT && documentRef.current) {
      documentRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDateChange = (date, name) => {
    setFormData({ ...formData, [name]: date });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
    }
  };

  const openAiModal = () => {
    setAiModalOpen(true);
  };

  const closeAiModal = () => {
    setAiModalOpen(false);
  };

  const confirmDescriptionRegistration = () => {
    const confirmed = window.confirm("정말로 등록하시겠습니까?");
    if (confirmed) {
      setFormData({ ...formData, description: aiGeneratedDescription });
      closeAiModal();
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div style={{ padding: '20px' }}>
        <Typography variant="h5">프로젝트 등록하기</Typography>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={() => console.log(formData)}
        >
          저장
        </Button>

        <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: '16px' }}>
          {/* 카테고리 선택 */}
          <div style={{ flex: '1 1 50%', padding: '8px' }}>
            <FormControl fullWidth>
              <InputLabel>카테고리</InputLabel>
              <Select
                name="category_id"
                value={formData.category_id}
                onChange={handleChange}
              >
                <MenuItem value={"카테고리1"}>카테고리1</MenuItem>
                <MenuItem value={"카테고리2"}>카테고리2</MenuItem>
                <MenuItem value={"카테고리3"}>카테고리3</MenuItem>
              </Select>
            </FormControl>
          </div>

          <div style={{ flex: '1 1 50%', padding: '8px' }}>
            <FormControl fullWidth>
              <InputLabel>세부항목</InputLabel>
              <Select
                name="subcategory"
                value={formData.subcategory}
                onChange={handleChange}
              >
                <MenuItem value={"세부항목1"}>세부항목1</MenuItem>
                <MenuItem value={"세부항목2"}>세부항목2</MenuItem>
                <MenuItem value={"세부항목3"}>세부항목3</MenuItem>
              </Select>
            </FormControl>
          </div>

          {/* 왼쪽: 이미지 미리보기 및 업로드 */}
          <div style={{ flex: '1 1 100%', padding: '8px', display: 'flex', justifyContent: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div>
                {selectedImage ? (
                  <img
                    src={selectedImage}
                    alt="미리보기"
                    style={{
                      width: "100%",
                      height: "auto",
                      maxHeight: "300px",
                    }}
                  />
                ) : (
                  <div
                    style={{
                      width: "100%",
                      height: "300px",
                      backgroundColor: "#f0f0f0",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    이미지 미리보기
                  </div>
                )}
              </div>
              <div style={{ marginTop: "16px" }}>
                <Button variant="outlined" component="label">
                  이미지 업로드
                  <input type="file" hidden onChange={handleImageChange} />
                </Button>
              </div>
            </div>
          </div>

          {/* 오른쪽: 입력 폼 */}
          <div style={{ flex: '1 1 100%', padding: '8px' }}>
            {/* 프로젝트 제목 */}
            <div>
              프로젝트 제목 :
              <TextField
                label="프로젝트 제목"
                name="title"
                fullWidth
                value={formData.title}
                onChange={handleChange}
              />
            </div>

            {/* 프로젝트 설명 */}
            <div ref={descriptionRef}>
              프로젝트 설명 :
              <TextField
                label="프로젝트 설명"
                name="description"
                fullWidth
                multiline
                rows={4}
                value={formData.description}
                onChange={handleChange}
              />
            </div>

            {/* 목표 금액 */}
            <div>
              목표금액 :
              <TextField
                label="목표 금액"
                name="target_funding"
                fullWidth
                value={formData.target_funding}
                onChange={handleChange}
              />
            </div>

            {/* 일정 선택 */}
            <div style={{ display: 'flex', alignItems: 'center' }}>
              프로젝트 일정 :
              <DesktopDatePicker
                label="시작일"
                value={formData.start_date}
                onChange={(date) => handleDateChange(date, "start_date")}
                renderInput={(params) => <TextField {...params} fullWidth />}
              />
              ~
              <DesktopDatePicker
                label="종료일"
                value={formData.end_date}
                onChange={(date) => handleDateChange(date, "end_date")}
                renderInput={(params) => <TextField {...params} fullWidth />}
              />
            </div>

            {/* 예상 전달일 */}
            <div>
              예상전달일 :
              <DesktopDatePicker
                label="예상 전달일"
                value={formData.delivery_date}
                onChange={(date) => handleDateChange(date, "delivery_date")}
                renderInput={(params) => <TextField {...params} fullWidth />}
              />
            </div>

            {/* 태그 입력 */}
            <div>
              태그 :
              <TextField
                label="태그"
                name="tags"
                fullWidth
                value={formData.tags}
                onChange={handleChange}
              />
            </div>

            {/* 미리보기 버튼 */}
            <div>
              <Button fullWidth variant="outlined">
                미리보기
              </Button>
            </div>
          </div>
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
            <Typography>AI 도움받기 결과</Typography>
            <TextField
              fullWidth
              multiline
              rows={4}
              value={aiGeneratedDescription}
              onChange={(e) => setAiGeneratedDescription(e.target.value)}
            />
            <Button onClick={closeAiModal}>닫기</Button>
            <Button
              variant="contained"
              style={{ marginLeft: "10px" }}
              onClick={confirmDescriptionRegistration}
            >
              설명으로 등록
            </Button>
          </div>
        </Modal>
      </div>
      <hr />
      <Box sx={{ width: "100%", typography: "body1" }}>
        {/* Tab 관련 코드 */}
        <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '16px' }}>
          <Button onClick={() => handleTabChange(SECTIONS.DESCRIPTION)}>설명</Button>
          <Button onClick={() => handleTabChange(SECTIONS.PACKAGE)}>패키지</Button>
          <Button onClick={() => handleTabChange(SECTIONS.DOCUMENT)}>서류</Button>
        </div>

        {/* 섹션 내용 */}
        <div ref={packageRef}>
          <Typography variant="h6">패키지 섹션</Typography>
          {/* 패키지 관련 컴포넌트 내용 추가 */}
        </div>
        <div ref={documentRef}>
          <Typography variant="h6">서류 섹션</Typography>
          {/* 서류 관련 컴포넌트 내용 추가 */}
        </div>
      </Box>
    </LocalizationProvider>
  );
};

export default Register;
