import { Modal, Typography, TextField, Button } from "@mui/material";
import { useState } from "react";

const AIModal = (props) => {
  const { formData, setFormData, aiModalOpen, closeAiModal } = props;
  const [aiGeneratedDescription, setAiGeneratedDescription] =
    useState("DB에서 불러온 설명 내용");

  const confirmDescriptionRegistration = () => {
    const confirmed = window.confirm("정말로 등록하시겠습니까?");
    if (confirmed) {
      setFormData({ ...formData, description: aiGeneratedDescription });
      closeAiModal();
    }
  };
  return (
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
  );
};

export default AIModal;
