import React, { useState } from "react";
import {
  Paper,
  IconButton,
  Button,
  Snackbar,
  Alert,
  Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/system";
import axios from "axios";
import Cookies from "js-cookie";
import { SERVER_URL } from "../../../../constants/URLs";

import "../../../styles/style.css";

const VisuallyHiddenInput = styled("input")({
  display: "none",
});

const FileContainer = styled("div")({
  display: "flex",
  flexWrap: "wrap",
  gap: "10px", // 간격 조정
  marginTop: "10px",
});

const FileItem = styled("div")({
  display: "flex",
  alignItems: "center",
  position: "relative",
});

const ProjectDocument = (props) => {
  const { docs, setDocs, saveProject, projectId } = props;
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleRemoveFile = (index) => {
    const newDocs = docs.filter((_, i) => i !== index); // 클릭된 이미지 제거
    setDocs(newDocs); // 이미지 배열 업데이트
  };
  const handleDownloadFile = async (doc) => {
    const splitted = doc.url.split("/");
    axios({
      method: "GET",
      url: `${SERVER_URL}/${splitted[0]}/${splitted[1]}/${splitted[2]}/${encodeURIComponent(splitted[3])}`,
      responseType: "blob",
      withCredentials: true,
    })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", doc.title);
        document.body.appendChild(link);
        link.click();
        link.remove();
      })
      .catch((e) => console.error(e));
  };

  const handleUploadFile = (e, prefix) => {
    const files = Array.from(e.target.files);
    files.forEach((_file) => {
      const newFile = new File([_file], prefix + _file.name, {
        type: _file.type,
      });
      setDocs([
        ...docs,
        {
          file: newFile,
          url: URL.createObjectURL(newFile),
          title: newFile.name,
        },
      ]);
    });
  };

  const handleSubmit = () => {
    if (window.confirm("정말로 제출하시겠습니까?")) {
      saveProject(projectId, "제출");
      setSnackbarMessage("제출되었습니다.");
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <div style={{ marginTop: "40px" }}>
      <h3>진행자 서류 제출</h3>
      <span>
        필수서류를 꼭 확인해주세요!
        <br />
        진행자의 신분을 증명할 수 있는 서류, 통장사본, 사업자등록증 등 필요한
        서류를 제출하세요.
      </span>
      <div>
        {/* 필수 서류 업로드 섹션 */}
        <Button
          className="primary-button"
          component="label"
          variant="contained"
        >
          📁 필수 서류 파일 업로드
          <VisuallyHiddenInput
            type="file"
            onChange={(event) => handleUploadFile(event, "[진행자]")}
            multiple
          />
        </Button>
        <Paper
          style={{
            padding: "20px",
            minHeight: "100px",
            position: "relative",
            border: "1px dashed #ccc",
          }}
        >
          <FileContainer>
            {docs
              .filter((doc) => doc.title.startsWith("[진행자]"))
              .map((doc, index) => (
                <FileItem key={index} sx={{ cursor: "pointer" }}>
                  <div onClick={() => handleDownloadFile(doc)}>{doc.title}</div>
                  <IconButton
                    onClick={() => handleRemoveFile(index)}
                    style={{ marginLeft: "5px" }}
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </FileItem>
              ))}
          </FileContainer>
        </Paper>
      </div>

      {/* 인증 서류 업로드 섹션 */}
      <h3 style={{ marginTop: "40px" }}>인증 서류 제출</h3>
      <span>
        후원자에게 제공할 모든 선물의 인증서류가 필요합니다.
        <br />
        필수서류를 제출하지 않으면 프로젝트가 반려될 수 있습니다.
      </span>
      <div>
        <Button
          className="primary-button"
          component="label"
          variant="contained"
          style={{ marginTop: "10px" }}
        >
          📁 인증서류 파일 업로드
          <VisuallyHiddenInput
            type="file"
            onChange={(event) => handleUploadFile(event, "[인증]")}
            multiple
          />
        </Button>
        <Paper
          style={{
            padding: "20px",
            minHeight: "100px",
            position: "relative",
            border: "1px dashed #ccc",
          }}
        >
          <FileContainer>
            {docs
              .filter((doc) => doc.title.startsWith("[인증]"))
              .map((doc, index) => (
                <FileItem key={index} sx={{ cursor: "pointer" }}>
                  <div onClick={() => handleDownloadFile(doc)}>{doc.title}</div>
                  <IconButton
                    onClick={() => handleRemoveFile(index)}
                    style={{ marginLeft: "5px" }}
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </FileItem>
              ))}
          </FileContainer>
        </Paper>
      </div>
      <Divider style={{ margin: "20px 0", width: "0" }} />
      <Divider style={{ margin: "20px 0", width: "0" }} />
      {/* /////////////////////////Register로 옮기기////////////////////// */}
      <div
        style={{
          marginTop: "20px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button
          className="primary-button-width"
          variant="contained"
          onClick={() => {
            console.log("!!!!!!!!!!!!!!!!");
          }}
        >
          미리보기
        </Button>
        <Button
          className="primary-button-width"
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          style={{ marginLeft: "10px" }}
        >
          제출하기
        </Button>
      </div>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity="success">
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default ProjectDocument;
