import React, { useState, useEffect } from "react";
import {
  Typography,
  Button,
  IconButton,
  Divider,
  Chip,
  TextField,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import axios from "axios"; // axios import
import Cookies from "js-cookie"; // 쿠키를 다루기 위해 js-cookie 사용
import { jwtDecode } from "jwt-decode";

const Notice = ({ projectId }) => {
  // JWT 토큰에서 사용자 정보를 추출하는 함수
  const getMemberIdFromToken = () => {
    const token = Cookies.get("accessToken"); // 쿠키에서 토큰 추출
    if (token) {
      const decodedToken = jwtDecode(token); // JWT 토큰 디코딩
      return decodedToken.memberId; // memberId를 추출
    }
    return null; // 토큰이 없으면 null 반환
  };

  // 현재 로그인한 사용자의 memberId
  const memberId = getMemberIdFromToken();

  // 공지사항 리스트를 관리하는 상태 (초기에는 빈 배열로 설정)
  const [notices, setNotices] = useState([]);
  const [editNotice, setEditNotice] = useState(null); // 수정할 공지사항 상태
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");

  // 공지사항 목록을 불러오는 함수 (GET 요청)
  const fetchNotices = async () => {
    try {
      const response = await axios.get(
        `http://localhost:9000/api/notices?projectId=${projectId}`
      );
      setNotices(response.data);
    } catch (error) {
      console.error("공지사항 목록 불러오기 중 오류 발생:", error);
    }
  };

  useEffect(() => {
    fetchNotices(); // 컴포넌트가 렌더링될 때 공지사항 목록을 불러옴
  }, [projectId]);

  // 새로운 공지사항을 추가하는 함수 (POST 요청)
  const handleAddNotice = async () => {
    if (!memberId) {
      alert("로그인 후에 공지사항을 등록할 수 있습니다.");
      return;
    }

    const newNotice = {
      title: newTitle || "공지사항 제목을 입력해주세요.",
      content: newContent || "진행자가 내용을 입력합니다.",
      projectId: projectId, // 프로젝트 ID
    };

    try {
      const response = await axios.post(
        "http://localhost:9000/api/notices",
        newNotice,
        {
          headers: {
            "x-damdda-authorization": `Bearer ${Cookies.get("accessToken")}`, // JWT 토큰을 Authorization 헤더로 전송
            "Content-Type": "application/json", // JSON 형식으로 데이터 전송
          },
        }
      );

      setNotices((prevNotices) => [...prevNotices, response.data]);
      setNewTitle("");
      setNewContent("");
      alert("공지사항이 성공적으로 등록되었습니다.");
    } catch (error) {
      console.error("공지사항 등록 중 오류 발생:", error);
      alert("공지사항 등록 중 오류가 발생했습니다.");
    }
  };

  // 공지사항을 삭제하는 함수 (DELETE 요청)
  const handleDeleteNotice = async (id) => {
    try {
      await axios.delete(`http://localhost:9000/api/notices/${id}`, {
        headers: {
          "x-damdda-authorization": `Bearer ${Cookies.get("accessToken")}`,
        },
      });
      setNotices((prevNotices) =>
        prevNotices.filter((notice) => notice.id !== id)
      );
    } catch (error) {
      console.error("공지사항 삭제 중 오류 발생:", error);
    }
  };

  // 공지사항을 수정하는 함수 (PUT 요청)
  const handleEditNotice = async () => {
    if (!editNotice) return;

    const updatedNotice = {
      ...editNotice,
      title: newTitle,
      content: newContent,
    };

    try {
      const response = await axios.put(
        `http://localhost:9000/api/notices/${editNotice.id}`,
        updatedNotice,
        {
          headers: {
            "x-damdda-authorization": `Bearer ${Cookies.get("accessToken")}`,
            "Content-Type": "application/json",
          },
        }
      );

      setNotices((prevNotices) =>
        prevNotices.map((notice) =>
          notice.id === editNotice.id ? response.data : notice
        )
      );
      setEditNotice(null); // 수정 모드 종료
      setNewTitle("");
      setNewContent("");
      alert("공지사항이 성공적으로 수정되었습니다.");
    } catch (error) {
      console.error("공지사항 수정 중 오류 발생:", error);
    }
  };

  // 수정 버튼 클릭 시 호출
  const startEditNotice = (notice) => {
    setEditNotice(notice);
    setNewTitle(notice.title);
    setNewContent(notice.content);
  };

  // 최신순으로 공지사항을 정렬하는 함수
  const sortedNotices = notices.sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  return (
    <div style={{ padding: "20px", maxWidth: "1000px", margin: "0 auto" }}>
      {/* 공지사항 입력 영역 */}
      <div
        style={{
          marginBottom: "50px", // 아래쪽에 여유 공간 추가
          maxWidth: "700px", // 입력 영역의 최대 너비 설정
          margin: "0 auto", // 가운데 정렬
        }}
      >
        <Typography
          variant="h6"
          style={{ fontWeight: "bold", marginBottom: "20px" }}
        >
          {editNotice ? "공지사항 수정하기" : "공지사항 입력하기"}
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
        {editNotice ? (
          <Button
            variant="contained"
            onClick={handleEditNotice}
            style={{ float: "right" }}
          >
            수정 완료
          </Button>
        ) : (
          <Button
            variant="contained"
            onClick={handleAddNotice}
            style={{ float: "right" }}
          >
            등록하기
          </Button>
        )}
      </div>

      {/* 등록된 공지사항 리스트 */}
      <div style={{ clear: "both" }}>
        {sortedNotices.map((notice, index) => (
          <React.Fragment key={notice.id}>
            {/* 공지사항 카드 */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "15px",
                alignItems: "center",
                borderBottom: "1px solid #e0e0e0",
              }}
            >
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  {/* 공지, 중요 뱃지 */}
                  <Chip
                    label="공지"
                    style={{
                      marginRight: "5px",
                      backgroundColor: "#007bff",
                      color: "#fff",
                    }}
                    size="small"
                  />
                  <Chip
                    label="중요"
                    style={{
                      marginRight: "5px",
                      backgroundColor: "#ff9800",
                      color: "#fff",
                    }}
                    size="small"
                  />
                  {/* 제목 */}
                  <Typography
                    variant="h6"
                    style={{
                      fontWeight: "bold",
                      marginRight: "10px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {notice.title}
                  </Typography>
                </div>
                {/* 내용 */}
                <Typography variant="body1" style={{ marginTop: "10px" }}>
                  {notice.content}
                </Typography>
                {/* 작성일자 및 작성자 */}
                <Typography
                  variant="body2"
                  style={{ color: "#888", marginTop: "5px" }}
                >
                  작성자: {notice.author} | {notice.date}
                </Typography>
              </div>

              {/* 이미지 */}
              <div style={{ marginLeft: "20px" }}>
                <img
                  src={notice.imageUrl}
                  alt="공지 이미지"
                  style={{
                    width: "80px",
                    height: "60px",
                    borderRadius: "5px",
                  }}
                />
              </div>

              {/* 수정/삭제 버튼 */}
              <div style={{ marginLeft: "20px" }}>
                <IconButton onClick={() => startEditNotice(notice)}>
                  <Edit fontSize="small" />
                </IconButton>
                <IconButton onClick={() => handleDeleteNotice(notice.id)}>
                  <Delete fontSize="small" />
                </IconButton>
              </div>
            </div>
            {/* 구분선 */}
            {index < notices.length - 1 && (
              <Divider style={{ margin: "0px" }} />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Notice;
