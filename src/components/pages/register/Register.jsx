import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Modal,
  Divider,
  Tabs,
  Tab,
  Chip,
  IconButton,
} from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import {
  Close as CloseIcon,
  ArrowBack,
  ArrowForward,
} from "@mui/icons-material";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import "./Register.css";
import "../../styles/style.css";
import { Header } from "../../layout/Header";
import { Footer } from "../../layout/Footer";
import DetailPage from "./detailPage";
import Package from "./package";
import ProjectDocument from "./projectDocument";

// 드래그 앤 드롭 가능한 개별 이미지 아이템
function SortableItem({ url, index, title, onRemove }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: url });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    margin: "0 8px",
    cursor: "pointer",
    width: "60px",
    height: "60px",
    objectFit: "cover",
    position: "relative",
    display: "inline-block",
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <img
        src={url}
        alt={`썸네일 ${index}`}
        style={{
          width: "100%",
          height: "100%",
        }}
        onClick={() => alert(`이미지 ${index + 1} 클릭`)}
      />
      {index === 0 && (
        <div
          className="representative-tag"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            backgroundColor: "rgba(255, 0, 0, 0.5)",
            color: "white",
            padding: "2px 5px",
            borderRadius: "10px",
          }}
        >
          대표
        </div>
      )}
      {/* 이미지 이름과 삭제 버튼 */}

      <div style={{ fontSize: "10px", textAlign: "center" }}>
        {title}
        <IconButton
          onClick={(e) => {
            e.stopPropagation(); // 클릭 이벤트 버블링 방지
            onRemove(index); // 삭제 버튼 클릭 시 이미지 삭제
          }}
          style={{
            position: "relative",
            top: "-5px",
            left: "5px",
            backgroundColor: "white",
            padding: "2px",
          }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </div>
    </div>
  );
}

//작성ㄹㄹㄹ중
const Register = () => {
  const [descriptionDetail, setDescriptionDetail] = useState("");

  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const [projectId, setProjectId] = useState(query.get("projectId") || 1);

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

  const [writeData, setWriteData] = useState([]);

  useEffect(() => {
    fetchWriteData();
    console.log(writeData);
  }, []);

  useEffect(() => {
    setFormData({
      category_id: writeData.category,
      subcategory: "",
      title: writeData.title,
      description: writeData.description,
      target_funding: writeData.targetFunding,
      // start_date: new Date(writeData.startDate),
      // end_date: new Date(writeData.endDate),
      delivery_date: null,
      // tags: writeData.tags,
    });

    writeData.descriptionDetail &&
      setDescriptionDetail(writeData.descriptionDetail);

    writeData.productImages && setProductImagesUrl(writeData.productImages);
    writeData.descriptionImages &&
      setDescriptionImagesUrl(writeData.descriptionImages);
    writeData.reqDocs && setReqDocsUrl(writeData.reqDocs);
    writeData.certDocs && setCertDocsUrl(writeData.certDocs);

    //url을 파일로 수정하는 코드

    // const fileLikeObjects = descriptionImages.map(createFileLikeObjectFromUrl);

    writeData.productImages && setProductImages(writeData.productImages);
    writeData.descriptionImages &&
      setDescriptionImages(writeData.descriptionImages);
    writeData.reqDocs && setReqDocs(writeData.reqDocs);
    writeData.certDocs && setCertDocs(writeData.certDocs);

    console.log(
      writeData.productImages + " : productImages : " + productImages
    );
    console.log("descriptionImages : " + descriptionImages);
    console.log("reqDocs : " + reqDocs);
    console.log("certDocs : " + certDocs);

    // setProductImages((productImages || []).map(createFileLikeObjectFromUrl));
    // setDescriptionImages((descriptionImages || []).map(createFileLikeObjectFromUrl));
    // setReqDocs((reqDocs || []).map(createFileLikeObjectFromUrl));
    // setCertDocs((certDocs || []).map(createFileLikeObjectFromUrl));

    convertUrlsToFileObjects();

    writeData.tags &&
      setTags(writeData.tags.slice(0, Math.ceil(writeData.tags.length / 2)));
  }, [writeData]);

  // 비동기 파일 변환 작업 처리
  async function convertUrlsToFileObjects() {
    console.log("productImages : " + productImages);

    const productFileObjects = await Promise.all(
      (productImages || []).map(createFileLikeObjectFromUrl)
    );

    console.log("descriptionImages : " + descriptionImages);
    const descriptionFileObjects = await Promise.all(
      (descriptionImages || []).map(createFileLikeObjectFromUrl)
    );

    console.log("reqDocs : " + reqDocs);
    const reqDocFileObjects = await Promise.all(
      (reqDocs || []).map(createFileLikeObjectFromUrl)
    );

    console.log("certDocs : " + certDocs);
    const certDocFileObjects = await Promise.all(
      (certDocs || []).map(createFileLikeObjectFromUrl)
    );

    // 상태 업데이트
    setProductImages(productFileObjects);
    setDescriptionImages(descriptionFileObjects);
    setReqDocs(reqDocFileObjects);
    setCertDocs(certDocFileObjects);
  }

  async function createFileLikeObjectFromUrl(url) {
    const fileName = url.split("/").pop(); // URL에서 파일 이름 추출
    console.log("이거이거이거이거");
    console.log(fileName);

    const response = await fetch(url);
    const blob = await response.blob();
    return new File([blob], fileName, { type: blob.type });
  }

  // URL을 File 객체와 유사한 객체로 변환하는 함수
  // function createFileLikeObjectFromUrl(url) {
  //   const fileName = url.split('/').pop(); // URL에서 파일 이름 추출
  //   return {
  //     name: fileName,         // 파일명
  //     url: url,               // 실제 URL
  //     size: 0,                // 크기는 알 수 없으므로 0으로 설정
  //     lastModified: new Date() // 임의로 현재 시간을 lastModified로 설정
  //   };
  // }

  const fetchWriteData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:9000/api/projects/write/${projectId}`
      );

      setWriteData(response.data || []);
      console.log(response.data);
    } catch (error) {
      console.error("프로젝트 데이터를 가져오는 중 오류 발생:", error);
    }
  };

  const [productImages, setProductImages] = useState([]); // 상품이미지
  const [descriptionImages, setDescriptionImages] = useState([]); // 설명이미지
  const [reqDocs, setReqDocs] = useState([]); // 필수 서류
  const [certDocs, setCertDocs] = useState([]); // 인증 서류
  const [docs, setDocs] = useState([]); // 태그 목록

  const [imageTitles, setImageTitles] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [productImagesUrl, setProductImagesUrl] = useState([]); // 상품이미지
  const [descriptionImagesUrl, setDescriptionImagesUrl] = useState([]); // 설명이미지
  const [reqDocsUrl, setReqDocsUrl] = useState([]); // 필수 서류
  const [certDocsUrl, setCertDocsUrl] = useState([]); // 인증 서류
  // const [docsUrl, setDocsUrl] = useState([]); // 태그 목록

  const [tags, setTags] = useState([]); // 태그 목록
  //const [selectedImage, setSelectedImage] = useState([]);
  const [aiModalOpen, setAiModalOpen] = useState(false);
  const [aiGeneratedDescription, setAiGeneratedDescription] =
    useState("DB에서 불러온 설명 내용");

  const scrollToSection = (id) => {
    const target = document.getElementById(id);
    target.scrollIntoView({ behavior: "smooth" });
  };

  // 이미지
  // 이미지 순서 변경 처리 함수
  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = productImagesUrl.indexOf(active.id);
      const newIndex = productImagesUrl.indexOf(over.id);
      setProductImagesUrl((items) => arrayMove(items, oldIndex, newIndex));
      setImageTitles((titles) => arrayMove(titles, oldIndex, newIndex));
    }
  };

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && formData.tags.trim() !== "") {
      event.preventDefault(); // 기본 Enter 동작 방지

      if (tags.length >= 5) {
        alert("입력 가능한 태그 개수를 초과했습니다. (최대 5개)");
      } else {
        setTags([...tags, formData.tags.trim()]); // 새로운 태그 추가
        setFormData({ ...formData, tags: "" }); // 태그 입력창 초기화
      }
    }
  };

  const handleTagDelete = (index) => {
    const updatedTags = [...tags];
    updatedTags.splice(index, 1); // 태그 삭제
    setTags(updatedTags);
  };

  const handleDateChange = (date, name) => {
    setFormData({ ...formData, [name]: date });
  };

  // 이미지 업로드 함수
  const handleProductImageChange = (e) => {
    const files = Array.from(e.target.files);
    const urls = files.map((file) => URL.createObjectURL(file));
    const titles = files.map((file) => file.name); // 파일 이름을 제목으로 사용
    setProductImagesUrl([...productImagesUrl, ...urls]);
    setImageTitles([...imageTitles, ...titles]);
  };

  // 이미지 삭제 함수
  const handleRemoveImage = (index) => {
    const newImages = productImagesUrl.filter((_, i) => i !== index); // 클릭된 이미지 제거
    const newTitles = imageTitles.filter((_, i) => i !== index); // 해당 이미지의 제목도 제거
    setProductImagesUrl(newImages); // 이미지 배열 업데이트
    setImageTitles(newTitles); // 제목 배열 업데이트
    if (currentImageIndex >= index && currentImageIndex > 0) {
      setCurrentImageIndex((prev) => prev - 1); // 삭제된 이미지가 미리보기 중이면 인덱스 조정
    }
  };

  // 미리보기에서 이전 이미지로 이동
  const handlePrevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? productImagesUrl.length - 1 : prev - 1
    );
  };

  // 미리보기에서 다음 이미지로 이동
  const handleNextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === productImagesUrl.length - 1 ? 0 : prev + 1
    );
  };

  useEffect(() => {
    setDocs([...reqDocs, ...certDocs]);
  }, [reqDocs, certDocs]);

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

  const saveProject = async (projectId, submit) => {
    if (!window.confirm("저장하시겠습니까?")) {
      return; // 사용자가 "취소"를 선택하면 함수 종료
    }

    console.log(formData);
    console.log(tags);

    const projectFormData = new FormData();

    // ProjectDetailDTO 데이터
    const projectDetailDTO = {
      id: projectId, // 프로젝트 ID
      title: formData.title, // formData에서 가져오는 값 예시
      description: formData.description, // formData에서 가져오는 값 예시
      descriptionDetail: descriptionDetail,
      fundsReceive: 0,
      targetFunding: formData.target_funding, // 목표 금액
      nickName: "testNickName", // 진행자 닉네임
      startDate: new Date(formData.start_date), // 시작 날짜 (적절하게 변환 필요)
      endDate: new Date(formData.end_date), // 종료 날짜 (적절하게 변환 필요)
      supporterCnt: 0,
      likeCnt: 0,
      category: formData.category_id,
      tags: tags.map((tag) => ({
        name: tag,
        usageFrequency: -1,
        projectIds: [0],
      })),
    };

    // projectDetailDTO를 JSON 문자열로 변환하여 FormData에 추가
    // projectFormData.append("projectDetailDTO", JSON.stringify(projectDetailDTO));
    projectFormData.append(
      "projectDetailDTO",
      new Blob([JSON.stringify(projectDetailDTO)], { type: "application/json" })
    );

    console.log(productImages);
    console.log(descriptionImages);
    console.log(docs);

    // 파일 데이터 (예시로 formData에서 가져오는 경우)
    // const productImages = []; // 여기에 productImage 파일 객체를 넣어주세요
    // const descriptionImages = []; // 여기에 descriptionImage 파일 객체를 넣어주세요
    // const docs = []; // 여기에 docs 파일 객체를 넣어주세요

    // productImages 파일 추가
    productImages.forEach((file, index) => {
      projectFormData.append(`productImages`, file);
    });

    // descriptionImages 파일 추가
    descriptionImages.forEach((file, index) => {
      projectFormData.append(`descriptionImages`, file);
    });

    // docs 파일 추가
    docs.forEach((file, index) => {
      projectFormData.append(`docs`, file);
    });

    // 추가적으로 필요한 텍스트 필드 데이터
    projectFormData.append("submit", submit); // "저장" 혹은 "제출"

    try {
      const response = await axios.put(
        `http://localhost:9000/api/projects/register/${projectId}`,
        projectFormData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true, // 쿠키 전송 (필요한 경우)
        }
      );
      console.log("프로젝트 업데이트 성공:", response.data);
      alert("저장이 완료되었습니다."); // 저장 완료 메시지
    } catch (error) {
      console.error("프로젝트 업데이트 중 오류 발생:", error);
      alert("저장을 성공하지 못했습니다."); // 저장 오류 메시지
    }
  };

  return (
    <>
      <Header />
      <div className="container">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <div>
            <div className="header-container">
              <h1>프로젝트 등록하기</h1>
              <div className="button-right">
                <Button
                  className="primary-button"
                  variant="contained"
                  onClick={() => saveProject(projectId, "저장")}
                >
                  저장
                </Button>
              </div>
            </div>

            <div className="info-container">
              {/* //////////////////////////////////카테고리//////////////////////// */}
              <div className="category">
                <FormControl>
                  <Select
                    className="category_id"
                    name="category_id"
                    value={formData.category_id}
                    onChange={handleChange}
                    displayEmpty // 빈값일 때 기본 텍스트 표시
                    renderValue={(selected) => {
                      // 선택된 값이 없을 때 기본 텍스트 표시
                      return selected ? (
                        selected
                      ) : (
                        <em>카테고리를 선택하세요</em>
                      );
                    }}
                    size="small"
                  >
                    <MenuItem value="" disabled>
                      <em>카테고리를 선택하세요</em>
                    </MenuItem>
                    <MenuItem value={"K-POP"}>K-POP</MenuItem>
                    <MenuItem value={"K-콘텐츠"}>K-콘텐츠</MenuItem>
                    <MenuItem value={"게임"}>게임</MenuItem>
                    <MenuItem value={"문화재"}>문화재</MenuItem>
                    <MenuItem value={"뷰티"}>뷰티</MenuItem>
                    <MenuItem value={"음식"}>음식</MenuItem>
                    <MenuItem value={"패션"}>패션</MenuItem>
                  </Select>
                </FormControl>
              </div>

              <div className="form-container">
                {/* 왼쪽: 이미지 미리보기 및 업로드 */}
                {/*<div className="section-container">
                  <div className="image-section">
                     <div className="image-preview" >
                      {productImagesUrl.length > 0 ? (
                        productImagesUrl.map((url, index) => (
                          <div
                            key={index}
                            style={{
                              position: "relative",
                              width: "150px",
                              height: "150px",
                            }}
                          >
                            <img
                              src={url}
                              alt={`미리보기 ${index}`}
                              style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                              }}
                            />
                            <IconButton
                              style={{
                                position: "absolute",
                                top: "5px",
                                right: "5px",
                                backgroundColor: "white",
                                padding: "2px",
                              }}
                              onClick={() => handleRemoveImage(index)}
                            >
                              <CloseIcon />
                            </IconButton>
                          </div>
                        ))
                      ) : (
                        <div className="preview-placeholder">
                          이미지 미리보기
                        </div>
                      )}
                    </div> */}

                {/* ////////////////////////////////이미지 업로드/////////////////////////// */}
                {/* <div style={{ marginTop: "16px" }}>
                      <Button
                        className="outlined-button"
                        variant="outlined"
                        component="label"
                      >
                        이미지 업로드
                        <input
                          type="file"
                          hidden
                          multiple
                          onChange={handleProductImageChange}
                        />{" "}
                      </Button>
                    </div>
                  </div>
                </div> */}

                {/* 미리보기 영역 */}
                <div className="section-container">
                  <div className="image-section">
                    <div
                      className="image-preview"
                      style={{ position: "relative", marginBottom: "20px" }}
                    >
                      {productImagesUrl.length > 0 && (
                        <>
                          <img
                            src={productImagesUrl[currentImageIndex]}
                            alt={`미리보기 ${currentImageIndex}`}
                            style={{
                              width: "400px",
                              height: "400px",
                              objectFit: "cover",
                            }}
                          />
                          <IconButton
                            onClick={handlePrevImage}
                            style={{
                              position: "absolute",
                              top: "50%",
                              left: "10px",
                              transform: "translateY(-50%)",
                            }}
                          >
                            <ArrowBack />
                          </IconButton>
                          <IconButton
                            onClick={handleNextImage}
                            style={{
                              position: "absolute",
                              top: "50%",
                              right: "10px",
                              transform: "translateY(-50%)",
                            }}
                          >
                            <ArrowForward />
                          </IconButton>
                        </>
                      )}
                    </div>

                    {/* 이미지 목록 */}
                    {productImagesUrl.length > 0 && (
                      <div
                        style={{
                          overflowX: "auto",
                          whiteSpace: "nowrap",
                          maxHeight: "80px",
                          maxWidth: "320px",
                          display: "flex",
                        }}
                      >
                        <DndContext
                          collisionDetection={closestCenter}
                          onDragEnd={handleDragEnd}
                        >
                          <SortableContext
                            items={productImagesUrl}
                            strategy={rectSortingStrategy}
                          >
                            <div
                              style={{
                                display: "flex",
                                overflowX: "auto",
                                maxWidth: "320px",
                              }}
                            >
                              {productImagesUrl
                                .slice(0, 5)
                                .map((url, index) => (
                                  <SortableItem
                                    key={url}
                                    url={url}
                                    index={index}
                                    title={imageTitles[index]}
                                    onRemove={handleRemoveImage}
                                    onClick={() => setCurrentImageIndex(index)} // 목록에서 클릭한 이미지로 변경
                                  />
                                ))}
                            </div>
                          </SortableContext>
                        </DndContext>
                      </div>
                    )}

                    {/* 이미지 업로드 버튼 */}
                    <div style={{ marginTop: "16px" }}>
                      <Button variant="outlined" component="label">
                        이미지 업로드
                        <input
                          type="file"
                          hidden
                          multiple
                          onChange={handleProductImageChange}
                        />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* 오른쪽: 입력 폼 */}
                <div className="input-section">
                  {/* 프로젝트 제목 */}
                  <div className="form-item">
                    <span className="form-div">프로젝트 제목 :</span>
                    <TextField
                      className="input-field"
                      label="프로젝트 제목"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                    />
                    <Tooltip
                      title="프로젝트 제목을 입력하세요."
                      placement="top"
                    >
                      <IconButton className="icon">
                        <InfoOutlinedIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </div>

                  {/* 프로젝트 설명 */}
                  <div className="form-item">
                    <span className="form-div">프로젝트 설명 :</span>
                    <TextField
                      className="input-field"
                      label="프로젝트 설명"
                      name="description"
                      multiline
                      rows={4}
                      value={formData.description}
                      onChange={handleChange}
                    />
                    <Tooltip
                      title="프로젝트의 간단한 설명을 입력하세요."
                      placement="top"
                    >
                      <IconButton className="icon">
                        <InfoOutlinedIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </div>

                  {/* 목표 금액 */}
                  <div className="form-item">
                    <span className="form-div">목표금액 :</span>
                    <TextField
                      className="input-field"
                      label="목표 금액"
                      name="target_funding"
                      value={formData.target_funding}
                      onChange={handleChange}
                    />
                    <span className="form-div-sub">원</span>
                    <Tooltip
                      title="이번 프로젝트의 목표금액을 입력하세요."
                      placement="top"
                    >
                      <IconButton className="icon">
                        <InfoOutlinedIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </div>

                  {/* 일정 선택 */}
                  <div className="form-item">
                    <span className="form-div">프로젝트 일정 :</span>
                    <div style={{ display: "flex", flex: 1 }}>
                      <DesktopDatePicker
                        label="시작일"
                        value={formData.start_date}
                        onChange={(date) =>
                          handleDateChange(date, "start_date")
                        }
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            style={{ marginRight: "8px", flex: 1 }}
                          />
                        )}
                      />
                      <span>~</span>
                      <DesktopDatePicker
                        label="종료일"
                        value={formData.end_date}
                        onChange={(date) => handleDateChange(date, "end_date")}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            style={{ marginLeft: "8px", flex: 1 }}
                          />
                        )}
                      />
                      <Tooltip
                        title="프로젝트의 시작일과 종료일을 선택하세요."
                        placement="top"
                      >
                        <IconButton className="icon">
                          <InfoOutlinedIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </div>
                  </div>

                  {/* 예상 전달일 */}
                  <div className="form-item">
                    <span className="form-div">예상전달일 :</span>

                    <TextField
                      className="input-field"
                      value="종료일로부터 30일 이내"
                      variant="outlined"
                    />
                    <Tooltip
                      title="선물은 종료일로부터 30일 이내에 전달이 되어야합니다."
                      placement="top"
                    >
                      <IconButton className="icon">
                        <InfoOutlinedIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </div>

                  {/* 태그 입력 */}
                  <div className="form-item">
                    <span className="form-div">태그 :</span>
                    <TextField
                      className="input-field"
                      label="태그"
                      name="tags"
                      value={formData.tags}
                      onChange={handleChange}
                      onKeyDown={handleKeyDown} // Enter 입력 처리
                      placeholder="태그를 입력하고 엔터를 눌러주세요"
                    />
                    <Tooltip
                      title="선물의 관련 태그를 입력하세요. (최대 5개)"
                      placement="top"
                    >
                      <IconButton className="icon">
                        <InfoOutlinedIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </div>

                  <div style={{ marginTop: "10px" }}>
                    {tags.map((tag, index) => (
                      <Chip
                        key={index}
                        label={tag}
                        onDelete={() => handleTagDelete(index)} // 태그 삭제 처리
                        style={{ margin: "5px" }}
                      />
                    ))}
                  </div>

                  {/* 미리보기 버튼 */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      marginTop: "10px",
                    }}
                  >
                    <Button
                      className="button"
                      variant="contained"
                      style={{ backgroundColor: "#7a82ed" }}
                    >
                      미리보기
                    </Button>
                  </div>
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

          {/* 상세설명 섹션 */}
          <div id="description">
            <Tabs value={0} indicatorColor="primary" textColor="primary">
              <Tab
                label="상세설명"
                onClick={() => scrollToSection("description")}
              />
              <Tab
                label="선물구성"
                onClick={() => scrollToSection("package")}
              />
              <Tab
                label="서류제출"
                onClick={() => scrollToSection("document")}
              />
            </Tabs>
            <Typography variant="body1" style={{ marginTop: "10px" }}>
              <DetailPage
                descriptionDetail={descriptionDetail}
                descriptionImagesUrl={descriptionImagesUrl}
                setDescriptionDetail={setDescriptionDetail}
                setDescriptionImages={setDescriptionImages}
              />
            </Typography>
          </div>

          <hr />

          {/* 패키지 섹션 */}
          <div id="package">
            <Tabs value={1} indicatorColor="primary" textColor="primary">
              <Tab
                label="상세설명"
                onClick={() => scrollToSection("description")}
              />
              <Tab
                label="선물구성"
                onClick={() => scrollToSection("package")}
              />
              <Tab
                label="서류제출"
                onClick={() => scrollToSection("document")}
              />
            </Tabs>
            <hr />
            <Typography variant="body1" style={{ marginTop: "10px" }}>
              <Package />
            </Typography>
          </div>

          <hr />

          {/* 서류 섹션 */}
          <div id="document">
            <Tabs value={2} indicatorColor="primary" textColor="primary">
              <Tab
                label="상세설명"
                onClick={() => scrollToSection("description")}
              />
              <Tab
                label="선물구성"
                onClick={() => scrollToSection("package")}
              />
              <Tab
                label="서류제출"
                onClick={() => scrollToSection("document")}
              />
            </Tabs>
            <hr />
            <Typography variant="body1" style={{ marginTop: "10px" }}>
              <ProjectDocument
                reqDocsUrl={reqDocsUrl}
                certDocsUrl={certDocsUrl}
                setReqDocs={setReqDocs}
                setCertDocs={setCertDocs}
                saveProject={saveProject}
                projectId={projectId}
              />
            </Typography>
          </div>
        </LocalizationProvider>
      </div>
      <Footer />
    </>
  );
};

export default Register;
