import React, { useState } from "react";
import {
  Typography,
  Button,
  TextField,
  IconButton,
  Divider,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";

const Notice = () => {
  // 공지사항 리스트를 관리하는 상태 (처음에는 세 개의 더미 데이터로 초기화)
  const [notices, setNotices] = useState([
    {
      id: 1,
      title: "1번째 예시 공지사항 제목",
      content:
        "1번째 예시 공지사항 내용입니다. ---------------------------------------------------여러 줄 테스트----------------------------------------.",
      date: new Date().toLocaleString(), // 등록일시 추가
    },
    {
      id: 2,
      title: "2번째 예시 공지사항 제목",
      content: "2번째 예시 공지사항 내용입니다.",
      // 2023년 8월 1일 오전 10시
      date: new Date(2023, 7, 1, 10, 0).toLocaleString(),
    },
    {
      id: 3,
      title: "3번째 예시 공지사항 제목",
      content: "3번째 예시 공지사항 내용입니다.",
      // 2024년 5월 10일 오후 3시
      date: new Date(2024, 4, 10, 15, 0).toLocaleString(),
    },
  ]);

  // 새롭게 추가할 공지사항의 제목과 내용을 관리하는 상태
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");

  // 새로운 공지사항을 추가하는 함수
  const handleAddNotice = () => {
    const newNotice = {
      id: notices.length + 1, // 고유한 ID 생성 (공지사항 개수에 +1)
      title: newTitle || "공지사항 제목을 입력해주세요.", // 제목이 없으면 기본값 설정
      content: newContent || "진행자가 내용을 입력합니다.", // 내용이 없으면 기본값 설정
      date: new Date().toLocaleString(), // 현재 날짜 및 시간을 등록일시로 설정
    };
    setNotices((prevNotices) => [...prevNotices, newNotice]); // 기존 공지사항 목록에 새로운 공지사항 추가
    setNewTitle(""); // 제목 입력란 초기화
    setNewContent(""); // 내용 입력란 초기화
  };

  // 공지사항을 삭제하는 함수 (ID를 기준으로 필터링하여 삭제)
  const handleDeleteNotice = (id) => {
    setNotices(notices.filter((notice) => notice.id !== id));
  };

  // 최신순으로 공지사항을 정렬하는 함수
  const sortedNotices = notices.sort(
    (a, b) => new Date(b.date) - new Date(a.date) // 날짜를 기준으로 내림차순 정렬
  );

  return (
    <div style={{ padding: "20px" }}>
      {/* 공지사항 입력 영역 */}
      <div
        style={{
          marginBottom: "50px", // 아래쪽에 여유 공간 추가
          maxWidth: "700px", // 입력 영역의 최대 너비 설정
          margin: "0 auto", // 가운데 정렬
        }}
      >
        {/* 공지사항 입력하기 제목 추가 */}
        <Typography
          variant="h6"
          style={{ fontWeight: "bold", marginBottom: "20px" }}
        >
          공지사항 입력하기
        </Typography>

        {/* 제목 입력 필드 */}
        <TextField
          label="제목을 입력해주세요." // 입력 필드의 라벨
          fullWidth // 입력 필드를 전체 너비로 설정
          value={newTitle} // 입력된 제목 값
          onChange={(e) => setNewTitle(e.target.value)} // 제목 변경 시 상태 업데이트
          style={{ marginBottom: "10px" }} // 입력 필드 아래 여백 추가
        />
        {/* 내용 입력 필드 */}
        <TextField
          label="내용을 입력해주세요." // 입력 필드의 라벨
          fullWidth // 입력 필드를 전체 너비로 설정
          multiline // 여러 줄 입력 가능
          rows={4} // 입력 필드의 초기 줄 수 설정
          value={newContent} // 입력된 내용 값
          onChange={(e) => setNewContent(e.target.value)} // 내용 변경 시 상태 업데이트
          style={{ marginBottom: "10px" }} // 입력 필드 아래 여백 추가
        />
        {/* 공지사항 등록 버튼 */}
        <Button
          variant="contained" // 버튼 스타일 (채워진 버튼)
          onClick={handleAddNotice} // 버튼 클릭 시 공지사항 추가 함수 호출
          style={{ float: "right" }} // 버튼을 오른쪽으로 정렬
        >
          등록하기
        </Button>
      </div>

      {/* 등록된 공지사항 리스트 */}
      <div style={{ maxWidth: "700px", margin: "0 auto" }}>
        {sortedNotices.map((notice, index) => (
          <React.Fragment key={notice.id}>
            {/* 공지사항 제목, 아이콘 버튼, 내용 */}
            <div style={{ padding: "10px 0" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                {/* 공지사항 제목 */}
                <Typography
                  variant="h6"
                  style={{ fontWeight: "bold", marginBottom: "15px" }}
                >
                  {notice.title}
                </Typography>
                {/* 수정/삭제 버튼 */}
                <div>
                  <IconButton>
                    <Edit fontSize="small" /> {/* 수정 아이콘 */}
                  </IconButton>
                  <IconButton onClick={() => handleDeleteNotice(notice.id)}>
                    <Delete fontSize="small" /> {/* 삭제 아이콘 */}
                  </IconButton>
                </div>
              </div>
              {/* 공지사항 내용 */}
              <Typography variant="body1">{notice.content}</Typography>
              {/* 등록일시 (아래쪽에 배치) */}
              <Typography
                variant="caption"
                style={{
                  display: "block",
                  marginTop: "5px",
                  color: "#888",
                  marginBottom: "20px",
                }}
              >
                {notice.date}
              </Typography>
            </div>
            {/* 공지사항 구분선 */}
            {index < notices.length - 1 && (
              <Divider style={{ marginBottom: "20px" }} />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Notice;
