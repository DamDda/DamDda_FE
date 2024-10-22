import React, { useState } from "react";
import { Typography, IconButton, Avatar } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { StandardInputBox } from "components/common/InputBoxComponent";
import { QnASmallButtonComponent } from "components/common/ButtonComponent";
import axios from "axios";
import { SERVER_URL } from "constants/URLs";
import Cookies from "js-cookie";
export const QnAComment = ({
  comment,
  question,
  questions,
  setQuestions,
  qnaQuestionId,
  nickName,
  projectId,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.content);

  const handleEditComment = async () => {
    if (isEditing) {
      try {
        const response = await axios.put(
          `${SERVER_URL}/qna/question/${qnaQuestionId}`,
          { content: editedContent },
          {
            headers: {
              ...(Cookies.get("accessToken") && {
                Authorization: `Bearer ${Cookies.get("accessToken")}`,
              }),
            },
          }
        );
        const updatedQuestions = questions.map((q) =>
          q.id === qnaQuestionId
            ? {
                ...q,
                comments: q.comments.map((c) =>
                  c.id === qnaQuestionId
                    ? { ...c, content: response.data.content }
                    : c
                ),
              }
            : q
        );
        setQuestions(updatedQuestions);
        alert("댓글이 수정되었습니다.");
      } catch (error) {
        console.error("댓글 수정 실패:", error);
      }
    }
    setIsEditing((prev) => !prev);
  };

  const handleDeleteComment = async () => {
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

        const updatedQuestions = questions.map((q) =>
          q.id === question.id
            ? {
                ...q,
                comments: q.comments.filter((c) => c.id !== comment.id),
              }
            : q
        );
        setQuestions(updatedQuestions);
        alert("댓글이 삭제되었습니다.");
      } catch (error) {
        console.error("댓글 삭제 실패:", error);
      }
    }
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      <div style={{ display: "flex", alignItems: "flex-start" }}>
        <Avatar
          src={comment.profileImage}
          alt={comment.author}
          style={{ marginRight: "10px" }}
        />
        <div style={{ flexGrow: 1 }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="subtitle1" style={{ fontWeight: "bold" }}>
              {comment.author}
            </Typography>
            <div>
              <IconButton onClick={handleEditComment}>
                <Edit fontSize="small" />
              </IconButton>
              <IconButton
                onClick={() =>
                  handleDeleteComment(comment.questionId, comment.id)
                }
              >
                <Delete fontSize="small" />
              </IconButton>
            </div>
          </div>
          <Typography variant="caption" color="textSecondary">
            {comment.date}
          </Typography>
          {isEditing ? (
            <div style={{ marginTop: "10px" }}>
              <StandardInputBox
                multiline
                rows={3}
                variant="outlined"
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
                style={{ width: "100%", marginBottom: "10px" }}
              />
              <QnASmallButtonComponent
                text={"저장"}
                onClick={handleEditComment}
              />
            </div>
          ) : (
            <Typography
              variant="body1"
              color="textSecondary"
              style={{ marginTop: "10px", whiteSpace: "pre-wrap" }}
            >
              {comment.content}
            </Typography>
          )}
        </div>
      </div>
    </div>
  );
};
