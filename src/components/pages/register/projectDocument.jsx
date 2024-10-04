import React, { useEffect, useState } from "react";
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

import "../../styles/style.css";

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

const ProjectDocument = ({
  reqDocsUrl,
  certDocsUrl,
  setReqDocs,
  setCertDocs,
  saveProject,
  projectId,
}) => {
  const [requiredDocs, setRequiredDocs] = useState([]); // 필수 서류
  const [certificationDocs, setCertificationDocs] = useState([]); // 인증 서류
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  useEffect(() => {
    setRequiredDocs(reqDocsUrl);
    setCertificationDocs(certDocsUrl);
  }, [reqDocsUrl, certDocsUrl]);

  const handleFileUpload = (event, setFileList, setDocList, type) => {
    const files = Array.from(event.target.files);
    // 새로운 파일 객체 생성 시 파일명에 [type] 추가
    const newFilesWithType = files.map((file) => {
      const newFileName = `[${type}] ${file.name}`;
      return new File([file], newFileName, { type: file.type });
    });
    const newFileNames = files.map((file) => file.name);
    // const newFileNames = files.map((file) => `[${type}] ${file.name}`);
    setFileList((prev) => [...prev, ...newFileNames]);
    setDocList((prev) => [...prev, ...newFilesWithType]);
    // setDocList에 [type]이 포함된 파일명으로 저장
    // setDocList((prev) => [
    //   ...prev,
    //   ...files.map((file) => ({
    //     name: `[${type}] ${file.name}`,
    //     file: file,
    //   })),
    // ]);
    event.target.value = null; // Clear input
  };

  const handleFileDelete = (index, fileList, setFileList, setDocList) => {
    if (window.confirm("정말로 삭제하시겠습니까?")) {
      const updatedFileList = fileList.filter((_, i) => i !== index);
      setFileList(updatedFileList);
      setDocList((prevDocs) => {
        const newDocs = prevDocs.slice();
        newDocs.splice(index, 1);
        return newDocs;
      });
      setSnackbarMessage("삭제되었습니다.");
      setSnackbarOpen(true);
    }
  };

  const handlePreview = () => {
    console.log("Previewing Required Docs:", requiredDocs);
    console.log("Previewing Certification Docs:", certificationDocs);
  };

  const handleSubmit = () => {
    if (window.confirm("정말로 제출하시겠습니까?")) {
      console.log("Submitting Required Docs:", requiredDocs);
      console.log("Submitting Certification Docs:", certificationDocs);
      saveProject(projectId, "제출");
      setSnackbarMessage("제출되었습니다.");
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    // <div className="image-section">
    //               {/* 프로젝트 제목 */}
    //               <div className="form-item">
    //                 <span className="form-div">프로젝트 제목 :</span>
    //                 <TextField
    //                   className="input-field"
    //                   label="프로젝트 제목"
    //                   name="title"
    //                   value={formData.title}
    //                   onChange={handleChange}
    //                 />
    //                 <Tooltip
    //                   title="프로젝트 제목을 입력하세요."
    //                   placement="top"
    //                 >
    //                   <IconButton className="icon">
    //                     <InfoOutlinedIcon fontSize="small" />
    //                   </IconButton>
    //                 </Tooltip>
    //               </div>

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
            onChange={(event) =>
              handleFileUpload(event, setRequiredDocs, setReqDocs, "진행자")
            }
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
            {requiredDocs.map((fileName, index) => (
              <FileItem key={index}>
                {fileName}
                <IconButton
                  onClick={() =>
                    handleFileDelete(
                      index,
                      requiredDocs,
                      setRequiredDocs,
                      setReqDocs
                    )
                  }
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
            onChange={(event) =>
              handleFileUpload(event, setCertificationDocs, setCertDocs, "인증")
            }
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
            {certificationDocs.map((fileName, index) => (
              <FileItem key={index}>
                {fileName}
                <IconButton
                  onClick={() =>
                    handleFileDelete(
                      index,
                      certificationDocs,
                      setCertificationDocs,
                      setCertDocs
                    )
                  }
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
          onClick={handlePreview}
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
