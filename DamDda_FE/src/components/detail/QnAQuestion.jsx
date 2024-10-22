import React, { useState } from "react";
import {
  Typography,
  Card,
  CardContent,
  IconButton,
  Avatar,
  Chip,
} from "@mui/material";
import { Delete, Edit, ArrowDropDown, ArrowDropUp } from "@mui/icons-material";
import { QnAComment } from "./QnAComment";
import { StandardInputBox } from "components/common/InputBoxComponent";
import { useUser } from "UserContext";
import {
  QnAButtonComponent,
  QnASmallButtonComponent,
} from "components/common/ButtonComponent";
import axios from "axios";
import { SERVER_URL } from "constants/URLs";
import Cookies from "js-cookie";

export const QnAQuestion = ({
  questions,
  setQuestions,
  question,
  replyingTo,
  setReplyingTo,
  replyContent,
  setReplyContent,
  memberId,
  nickName,
  projectId,
}) => {
  const [showComments, setShowComments] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editedTitle, setEditedTitle] = useState(question.title);
  const [editedContent, setEditedContent] = useState(question.content);
  const { user } = useUser();

  // 문의 수정
  const handleEditQuestion = async () => {
    console.log("1111111111111111111", user.key, memberId);
    console.log("Question ID:", question.id);
    try {
      const response = await axios.put(
        `${SERVER_URL}/qna/question/${Number(question.id)}`,
        {
          title: editedTitle,
          content: editedContent,
        },
        {
          headers: {
            ...(Cookies.get("accessToken") && {
              Authorization: `Bearer ${Cookies.get("accessToken")}`,
            }),
          },
        }
      );
      const updatedQuestions = questions.map((q) =>
        nickName || user.key === question.memberId
          ? { ...q, title: response.data.title, content: response.data.content }
          : q
      );

      setQuestions(updatedQuestions);
      alert("수정이 완료되었습니다");
    } catch (error) {
      console.error("수정 실패:", error);
      alert("수정에 실패했습니다.");
    }
  };

  // 문의 삭제
  const handleDeleteQuestion = async () => {
    const confirmed = window.confirm("삭제하시겠습니까?");
    if (confirmed) {
      try {
        await axios.delete(`${SERVER_URL}/qna/question/${question.id}`, {
          headers: {
            ...(Cookies.get("accessToken") && {
              Authorization: `Bearer ${Cookies.get("accessToken")}`,
            }),
          },
        });
        const updatedQuestions = questions.filter((q) => q.id !== question.id);
        setQuestions(updatedQuestions);
        alert("삭제가 완료되었습니다");
      } catch (error) {
        console.error("삭제 실패:", error);
        alert("삭제에 실패했습니다.");
      }
    }
  };

  const handleSaveEdit = () => {
    handleEditQuestion(question.id, editedTitle, editedContent);
    setEditMode(false);
  };

  const toggleComments = (id) => {
    setShowComments((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleAddComment = () => {
    if (!replyContent[question.id]) {
      alert("댓글 내용을 입력해주세요.");
      return;
    }

    const newComment = {
      id: question.comments.length + 1,
      author: user.nickname,
      profileImage: user.profile,
      date: new Date().toLocaleString(),
      content: replyContent[question.id],
      replies: [],
    };

    const updatedQuestions = questions.map((q) => {
      if (q.id === question.id) {
        return {
          ...q,
          comments: [...q.comments, newComment],
        };
      }
      return q;
    });

    setQuestions(updatedQuestions);
    setReplyContent((prev) => ({
      ...prev,
      [question.id]: "",
    }));
  };

  return (
    <Card
      style={{
        marginBottom: "20px",
        backgroundColor: "#fff",
        borderRadius: "10px",
        boxShadow: "none",
      }}
    >
      <CardContent>
        <div style={{ display: "flex", alignItems: "flex-start" }}>
          <Avatar
            src={question.profileImage}
            alt={question.author}
            style={{ marginRight: "10px" }}
          />
          <div style={{ flexGrow: 1 }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="subtitle1" style={{ fontWeight: "bold" }}>
                {question.author}
              </Typography>
              <div>
                <IconButton onClick={() => setEditMode(true)}>
                  <Edit fontSize="small" />
                </IconButton>
                <IconButton onClick={() => handleDeleteQuestion(question.id)}>
                  <Delete fontSize="small" />
                </IconButton>
              </div>
            </div>
            <Typography variant="caption" color="textSecondary">
              {question.date}
            </Typography>

            {editMode ? (
              <div
                style={{
                  padding: "10px",
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                }}
              >
                <StandardInputBox
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                  placeholder="수정할 제목"
                  style={{ margin: "5px 0" }}
                />
                <StandardInputBox
                  rows={4}
                  value={editedContent}
                  onChange={(e) => setEditedContent(e.target.value)}
                  placeholder="수정할 내용"
                  style={{ margin: "5px 0" }}
                />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    marginTop: "10px",
                  }}
                >
                  <QnAButtonComponent onClick={handleSaveEdit} text={"저장"} />
                </div>
              </div>
            ) : (
              <>
                <div
                  style={{
                    padding: "10px",
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                  }}
                >
                  <div style={{ margin: "5px" }}>
                    <Chip
                      label="질문"
                      style={{
                        backgroundColor: "#6A1B9A",
                        color: "#fff",
                      }}
                    />
                  </div>
                  <Typography variant="h6" style={{ marginBottom: "10px" }}>
                    {question.title}
                  </Typography>
                  <Typography
                    variant="body1"
                    color="textSecondary"
                    style={{ whiteSpace: "pre-wrap" }}
                  >
                    {question.content}
                  </Typography>
                </div>

                <div
                  onClick={() => toggleComments(question.id)}
                  style={{ cursor: "pointer", marginTop: "10px" }}
                >
                  <IconButton size="small">
                    {showComments ? <ArrowDropUp /> : <ArrowDropDown />}
                  </IconButton>
                  <Typography
                    variant="body2"
                    style={{ fontSize: "14px", marginLeft: "5px" }}
                  >
                    {question.comments.length} 댓글
                  </Typography>
                </div>

                {/* 댓글 목록 토글 */}
                {showComments && (
                  <>
                    <StandardInputBox
                      placeholder="댓글을 작성해주세요"
                      rows={2}
                      value={replyContent[question.id] || ""}
                      onChange={(e) =>
                        setReplyContent((prev) => ({
                          ...prev,
                          [question.id]: e.target.value,
                        }))
                      }
                      style={{ marginBottom: "10px" }}
                    />
                    <QnASmallButtonComponent
                      text={"댓글작성"}
                      onClick={handleAddComment}
                    />

                    {question.comments.length > 0 &&
                      question.comments.map((comment) => (
                        <QnAComment
                          key={comment.id}
                          comment={comment}
                          question={question}
                          questions={questions}
                          setQuestions={setQuestions}
                          replyingTo={replyingTo}
                          setReplyingTo={setReplyingTo}
                          replyContent={replyContent}
                          setReplyContent={setReplyContent}
                        />
                      ))}
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
