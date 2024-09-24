import React, { useState } from "react";
import {
  Typography,
  Card,
  CardContent,
  Button,
  TextField,
  IconButton,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";

const Notice = () => {
  const [notices, setNotices] = useState([
    {
      id: 1,
      title: "공지사항 제목을 입력해주세요.",
      content:
        "진행자가 내용을 입력합니다. 진행자가 내용을 입력합니다. 진행자가 내용을 입력합니다.",
    },
    {
      id: 2,
      title: "공지사항 2 제목",
      content: "두 번째 공지사항의 내용입니다.",
    },
    {
      id: 3,
      title: "공지사항 3 제목",
      content: "세 번째 공지사항의 내용입니다.",
    },
  ]);

  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");

  const handleAddNotice = () => {
    const newNotice = {
      id: notices.length + 1,
      title: newTitle || "공지사항 제목을 입력해주세요.",
      content: newContent || "진행자가 내용을 입력합니다.",
    };
    setNotices((prevNotices) => [...prevNotices, newNotice]);
    setNewTitle("");
    setNewContent("");
  };

  const handleDeleteNotice = (id) => {
    setNotices(notices.filter((notice) => notice.id !== id));
  };

  return (
    <div style={{ padding: "20px" }}>
      {/* 공지사항 입력 영역 */}
      <Card
        style={{
          marginBottom: "40px", // More margin to create space
          padding: "20px",
          border: "1px solid #c0c0c0",
          borderRadius: "10px",
          maxWidth: "600px",
          margin: "0 auto",
        }}
      >
        <Typography variant="h6" style={{ marginBottom: "10px" }}>
          진행자이름
        </Typography>
        <TextField
          label="제목을 입력해주세요."
          fullWidth
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          style={{ marginBottom: "10px" }}
        />
        <TextField
          label="내용을 입력해주세요."
          fullWidth
          multiline
          rows={4}
          value={newContent}
          onChange={(e) => setNewContent(e.target.value)}
          style={{ marginBottom: "10px" }}
        />
        <Button
          variant="contained"
          onClick={handleAddNotice}
          style={{ float: "right" }}
        >
          등록하기
        </Button>
      </Card>

      {/* 등록된 공지사항 리스트 */}
      <div style={{ maxWidth: "600px", margin: "0 auto" }}>
        {notices.map((notice) => (
          <Card
            key={notice.id}
            style={{
              marginBottom: "20px",
              backgroundColor: "#f9f9f9",
              borderRadius: "10px",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
              padding: "10px",
              position: "relative",
            }}
          >
            <CardContent>
              <Typography variant="h6">{notice.title}</Typography>
              <Typography variant="body1" style={{ marginTop: "10px" }}>
                {notice.content}
              </Typography>
              <div style={{ position: "absolute", top: "10px", right: "10px" }}>
                <IconButton>
                  <Edit fontSize="small" />
                </IconButton>
                <IconButton onClick={() => handleDeleteNotice(notice.id)}>
                  <Delete fontSize="small" />
                </IconButton>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Notice;
