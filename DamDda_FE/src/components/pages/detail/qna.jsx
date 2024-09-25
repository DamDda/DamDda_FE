import React, { useState } from "react";
import {
  Typography,
  Card,
  CardContent,
  Button,
  TextField,
  IconButton,
} from "@mui/material";
import { Delete, Comment } from "@mui/icons-material";

const Qna = () => {
  const [questions, setQuestions] = useState([
    {
      id: 1,
      author: "사용자A",
      title: "첫 번째 문의",
      content: "첫 번째 문의에 대한 내용을 어쩌고 저쩌고 작성합니다.",
      comments: [
        { id: 1, content: "첫 번째 댓글입니다." },
        { id: 2, content: "첫 번째 문의에 대한 두 번째 댓글입니다." },
      ],
    },
    {
      id: 2,
      author: "사용자B",
      title: "두 번째 문의",
      content: "두 번째 문의 내용도 어쩌고 저쩌고 작성합니다.",
      comments: [{ id: 1, content: "두 번째 문의에 대한 첫 번째 댓글입니다." }],
    },
    {
      id: 3,
      author: "사용자C",
      title: "세 번째 문의",
      content: "세 번째 문의의 내용입니다. 질문을 남겨보았습니다.",
      comments: [],
    },
  ]);

  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [showComments, setShowComments] = useState({});

  const handleAddQuestion = () => {
    const newQuestion = {
      id: questions.length + 1,
      author: "사용자D",
      title: newTitle || "문의제목입니다",
      content: newContent || "문의 내용을 입력해주세요.",
      comments: [],
    };
    setQuestions((prevQuestions) => [...prevQuestions, newQuestion]);
    setNewTitle("");
    setNewContent("");
  };

  const toggleComments = (id) => {
    setShowComments((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleDeleteQuestion = (id) => {
    setQuestions(questions.filter((question) => question.id !== id));
  };

  return (
    <div style={{ padding: "20px" }}>
      {/* 질문 등록 폼 */}
      <Card
        style={{
          marginBottom: "40px",
          padding: "20px",
          border: "1px solid #c0c0c0",
          borderRadius: "10px",
          maxWidth: "600px",
          margin: "0 auto",
        }}
      >
        <Typography variant="h6" style={{ marginBottom: "10px" }}>
          사용자이름
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
          onClick={handleAddQuestion}
          style={{ float: "right" }}
        >
          문의하기
        </Button>
      </Card>
      {/* 등록된 질문 리스트 */}s
      <div style={{ maxWidth: "600px", margin: "0 auto" }}>
        {questions.map((question) => (
          <Card
            key={question.id}
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
              <Typography variant="h6">{question.title}</Typography>
              <Typography variant="body1" style={{ marginTop: "10px" }}>
                {question.content}
              </Typography>
              <div style={{ marginTop: "10px" }}>
                <IconButton onClick={() => toggleComments(question.id)}>
                  <Comment fontSize="small" />
                  {showComments[question.id] ? " 댓글 숨기기" : " 댓글보기"}
                </IconButton>
                <IconButton onClick={() => handleDeleteQuestion(question.id)}>
                  <Delete fontSize="small" />
                  삭제
                </IconButton>
              </div>

              {/* 댓글 목록 */}
              {showComments[question.id] && question.comments.length > 0 && (
                <div style={{ marginTop: "10px", marginLeft: "20px" }}>
                  {question.comments.map((comment) => (
                    <Typography
                      key={comment.id}
                      variant="body2"
                      style={{ marginBottom: "5px" }}
                    >
                      {comment.content}
                    </Typography>
                  ))}
                </div>
              )}

              {/* 댓글이 없을 경우 */}
              {showComments[question.id] && question.comments.length === 0 && (
                <Typography
                  variant="body2"
                  color="textSecondary"
                  style={{ marginTop: "10px" }}
                >
                  아직 댓글이 없습니다.
                </Typography>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Qna;
