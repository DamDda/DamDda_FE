import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Button, Typography, Tabs, Tab } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import axios from "axios";

import "../Register.css";
import "../../../styles/style.css";
import { Header } from "../../../layout/Header";
import { Footer } from "../../../layout/Footer";
import DetailPage from "../detailPage";
import Package from "../package";
import ProjectDocument from "../projectDocument";

// taeuk
import InfoContainer from "./InfoContainer";
import AIModal from "./AIModal";

const Register = () => {
  ////////////////////////////
  // DEFINE STATE VARIABLES //
  ////////////////////////////
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const [projectId, setProjectId] = useState(query.get("projectId") || 1);
  const [writeData, setWriteData] = useState([]);

  const [tags, setTags] = useState([]); // 태그 목록
  const [formData, setFormData] = useState({
    // 기본 폼 데이터
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
  const [descriptionDetail, setDescriptionDetail] = useState(""); // 상세설명

  const [productImages, setProductImages] = useState([]); // 상품이미지
  const [productImagesUrl, setProductImagesUrl] = useState([]); // 상품이미지
  const [descriptionImages, setDescriptionImages] = useState([]); // 설명이미지
  const [descriptionImagesUrl, setDescriptionImagesUrl] = useState([]); // 설명이미지

  const [docs, setDocs] = useState([]);
  const [reqDocs, setReqDocs] = useState([]); // 필수 서류
  const [reqDocsUrl, setReqDocsUrl] = useState([]); // 필수 서류
  const [certDocs, setCertDocs] = useState([]); // 인증 서류
  const [certDocsUrl, setCertDocsUrl] = useState([]); // 인증 서류

  const [aiModalOpen, setAiModalOpen] = useState(false);

  //////////////////////
  // DEFINE CALLBACKS //
  //////////////////////

  // fetch writing data from server
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

  useEffect(() => {
    fetchWriteData();
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

    writeData.productImages && setProductImages(writeData.productImages);
    writeData.descriptionImages &&
      setDescriptionImages(writeData.descriptionImages);
    writeData.reqDocs && setReqDocs(writeData.reqDocs);
    writeData.certDocs && setCertDocs(writeData.certDocs);
    writeData.tags &&
      setTags(writeData.tags.slice(0, Math.ceil(writeData.tags.length / 2)));
  }, []);

  const scrollToSection = (id) => {
    const target = document.getElementById(id);
    target.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    setDocs([...reqDocs, ...certDocs]);
  }, [reqDocs, certDocs]);

  /////////////////////////////
  // Request of project save //
  /////////////////////////////
  const saveProject = async (projectId, submit) => {
    if (!window.confirm("저장하시겠습니까?")) {
      return; // 사용자가 "취소"를 선택하면 함수 종료
    }

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

    projectFormData.append(
      "projectDetailDTO",
      new Blob([JSON.stringify(projectDetailDTO)], { type: "application/json" })
    );

    // productImages 파일 추가
    const productMetaDatas = [];
    productImages.forEach((image, index) => {
      projectFormData.append(`productImages`, image.file);
      productMetaDatas.push({
        url: "",
        ord: index + 1,
      });
    });
    console.log(productMetaDatas);
    projectFormData.append(
      `productImagesMeta`,
      new Blob([JSON.stringify(productMetaDatas)], {
        type: "application/json",
      })
    );

    // checking
    for (let [key, value] of projectFormData.entries()) {
      console.log(`${key} : ${value}`);
    }

    /*
    // descriptionImages 파일 추가
    descriptionImages.forEach((file, index) => {
      projectFormData.append(`descriptionImages`, file);
    });

    // docs 파일 추가
    docs.forEach((file, index) => {
      projectFormData.append(`docs`, file);
    });
    */
    // 추가적으로 필요한 텍스트 필드 데이터
    projectFormData.append("submit", submit); // "저장" 혹은 "제출"

    try {
      const response = await axios({
        method: "PUT",
        url: `http://localhost:9000/api/projects/register/${projectId}`,
        data: projectFormData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("프로젝트 업데이트 성공:", response.data);
      alert("저장이 완료되었습니다."); // 저장 완료 메시지
    } catch (error) {
      console.error("프로젝트 업데이트 중 오류 발생:", error);
      alert("저장을 성공하지 못했습니다."); // 저장 오류 메시지
    }
  };
  const openAiModal = () => {
    setAiModalOpen(true);
  };

  const closeAiModal = () => {
    setAiModalOpen(false);
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

            <InfoContainer
              tags={tags}
              setTags={setTags}
              formData={formData}
              setFormData={setFormData}
              productImages={productImages}
              setProductImages={setProductImages}
            />

            <AIModal
              aiModalOpen={aiModalOpen}
              closeAiModal={closeAiModal}
              formData={formData}
              setFormData={setFormData}
            />
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
