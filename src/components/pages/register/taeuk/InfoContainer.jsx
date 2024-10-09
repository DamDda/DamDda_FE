import React, { useState } from "react";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  Chip,
  IconButton,
} from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import { DndContext, DragOverlay, closestCenter } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import "../Register.css";
import "../../../styles/style.css";
import SortableItem from "./SortableItem";

import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";
import { Close as CloseIcon } from "@mui/icons-material";

const InfoContainer = (props) => {
  const {
    tags,
    setTags,
    formData,
    setFormData,
    productImages,
    setProductImages,
  } = props;

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeId, setActiveId] = useState(null);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };
  // 미리보기에서 이전 이미지로 이동
  const handlePrevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? productImages.length - 1 : prev - 1
    );
  };

  // 미리보기에서 다음 이미지로 이동
  const handleNextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === productImages.length - 1 ? 0 : prev + 1
    );
  };

  // 이미지 삭제 함수
  const handleRemoveImage = (index) => {
    console.log("DELETE HERE ! ", index);
    const newImages = productImages.filter((_, i) => i !== index); // 클릭된 이미지 제거
    setProductImages(newImages); // 이미지 배열 업데이트
    if (currentImageIndex >= index && currentImageIndex > 0) {
      setCurrentImageIndex((prev) => prev - 1); // 삭제된 이미지가 미리보기 중이면 인덱스 조정
    }
  };
  // 이미지 업로드 함수
  const handleProductImageChange = (e) => {
    const files = Array.from(e.target.files);
    files.forEach((_file) =>
      setProductImages([
        ...productImages,
        {
          file: _file,
          url: URL.createObjectURL(_file),
          title: _file.name,
        },
      ])
    );
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

  const handleDragStart = (event) => {
    setActiveId(event.active.id); // 드래그 시작 시 activeId 설정
  };

  // 이미지 순서 변경 처리 함수
  const handleDragEnd = (event) => {
    const { active, over } = event;
    setActiveId(null); // 드래그 종료 시 activeId 초기화
    if (active.id !== over.id) {
      // const oldIndex = productImages.indexOf(active.id);
      // const newIndex = productImages.indexOf(over.id);

      const oldIndex = productImages.findIndex(
        (item) => item.url === active.id
      );
      const newIndex = productImages.findIndex((item) => item.url === over.id);

      setProductImages((items) => arrayMove(items, oldIndex, newIndex));
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

  return (
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
              return selected ? selected : <em>카테고리를 선택하세요</em>;
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
        {/* 미리보기 영역 */}
        <div className="section-container">
          <div className="image-section">
            <div
              className="image-preview"
              style={{ position: "relative", marginBottom: "20px" }}
            >
              {productImages.length > 0 && (
                <>
                  <img
                    src={
                      productImages[currentImageIndex].file === null
                        ? `http://localhost:9000/${productImages[currentImageIndex].url}`
                        : productImages[currentImageIndex].url
                    }
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
            {productImages.length > 0 && (
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
                  onDragStart={handleDragStart}
                  collisionDetection={closestCenter}
                  onDragEnd={handleDragEnd}
                >
                  <SortableContext
                    items={productImages}
                    strategy={rectSortingStrategy}
                  >
                    <div
                      style={{
                        display: "flex",
                        overflowX: "auto",
                        maxWidth: "320px",
                      }}
                    >
                      {productImages.slice(0, 5).map((image, index) => (
                        <SortableItem
                          key={image.url}
                          url={image.url}
                          index={index}
                          title={image.title}
                          onRemove={handleRemoveImage}
                          onClick={() => setCurrentImageIndex(index)} // 목록에서 클릭한 이미지로 변경
                        />
                      ))}
                      {/* DragOverlay로 잔상 처리 */}
                      <DragOverlay>
                        {activeId ? (
                          <div style={{ width: "60px", height: "60px" }}>
                            <img
                              src={
                                productImages.find(
                                  (item) => item.url === activeId
                                ).url
                              }
                              alt="Drag Image"
                              style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                              }}
                            />
                          </div>
                        ) : null}
                      </DragOverlay>
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
            <Tooltip title="프로젝트 제목을 입력하세요." placement="top">
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
                onChange={(date) => handleDateChange(date, "start_date")}
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
  );
};

export default InfoContainer;
