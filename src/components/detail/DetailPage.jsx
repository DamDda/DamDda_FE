import React, { useState, useRef } from "react"; // React
import { DetailDescroption } from "components/detail/DetailDescription";
import { Notice } from "components/detail/Notices";
import { Divider } from "@mui/material";
import { ProjectInfo } from "components/detail/ProjectInfo";
import { QnA } from "./QnA";
import { TabComponent } from "components/common/TabComponent";
import { CollabModal } from "components/detail/CollabModal";
import { ProjectTitle } from "./ProjectTitle";
import { ImageCarousel } from "components/common/ImageCarousel";
import { display, width } from "@mui/system";
import { GiftCompositionComponent } from "components/common/Gift/GiftCompositionComponent";

////////////////////////////////////////////////////////

export const DetailPage = ({ project }) => {
  //더미데이터

  //ImageCarousel
  const [Images] = useState([
    "https://img.freepik.com/free-vector/polygonal-city-elements_23-2147496342.jpg?ga=GA1.1.167959845.1724899652&semt=ais_hybrid",
    "https://img.freepik.com/free-vector/road-infographic-template_23-2147531975.jpg?ga=GA1.1.167959845.1724899652&semt=ais_hybrid",
    "https://img.freepik.com/free-vector/flat-people-doing-outdoor-activities_23-2147869120.jpg?ga=GA1.1.167959845.1724899652&semt=ais_hybrid",
  ]);

  const dummyProjectInfo = {
    fundsReceive: 11327000, // 모인 금액
    achievementRate: 2265.0, // 달성률 (퍼센트로 표현)
    daysLeft: 10, // 남은 일수
    supporterCnt: 320, // 후원자 수
    targetFunding: 5000000, // 목표 금액
    startDate: "2023-09-01", // 펀딩 시작일
    endDate: "2023-10-01", // 펀딩 종료일
    liked: true, // 사용자가 좋아요(하트)를 눌렀는지 여부
    liked_count: 120, // 좋아요를 누른 사람의 수
  };

  /////////////////////////////////////////////////////////
  const handleSponsorClick = () => {
    alert("후원하기 버튼 클릭!");
    // const giftSelected = true; // 실제 로직으로 변경
    // if (!giftSelected) {
    //   alert("선물구성을 선택하세요.");
    // } else {
    //   const confirmation = window.confirm("이 프로젝트를 후원하시겠습니까?");
    //   if (confirmation) {
    //     setSupporterCount((prev) => prev + 1); // 후원자 수 증가
    //     alert("결제 창으로 이동합니다.");
    //   }
    // }
  };

  //////////캐러셀//////////////////////////////
  const CarouselStyle = { width: "500px", height: "500px" };

  //////////Tab//////////////////////////////////
  //Tab
  const [tabIndex, setTabIndex] = useState(0);

  // 각 섹션에 대한 ref 정의
  const sectionRefs = {
    "상 세 설 명": useRef(null),
    "공 지 사 항": useRef(null),
    "Q & A": useRef(null),
  };

  const labels = ["상 세 설 명", "공 지 사 항", "Q & A"]; // 탭 레이블을 배열로 정의

  //////협업하기/////////////////////////////////////////////////

  const [modalOpen, setModalOpen] = useState(false);
  const [collabDetails, setCollabDetails] = useState({
    title: "project.title", //------------------> project.title로 수정하기
    name: "",
    phone: "",
    email: "",
    message: "",
    files: [],
  });

  const [errors, setErrors] = useState({
    name: false,
    phone: false,
    email: false,
    message: false,
  });

  const handleCollabClick = (isHearted) => {
    alert("협업하기 버튼 클릭!");
    setModalOpen(true);
  };

  const handleModalClose = () => {
    const confirmation = window.confirm("창을 닫으시겠습니까?");
    if (confirmation) {
      setModalOpen(false);
      setCollabDetails({
        name: "",
        phone: "",
        email: "",
        message: "",
        files: [],
      });
      setErrors({ name: false, phone: false, email: false, message: false });
    }
  };

  //////프로젝트 인포////////////////////////////////////////////////
  const handleHeartClick = async (isHearted) => {
    alert(isHearted ? "좋아요 취소!" : "좋아요!");
    // const newHeartedStatus = !prev; // 하트 상태 반전

    // try {
    //   if (prev) {
    //     // 좋아요 취소 요청
    //     const response = await axios.delete(
    //       ` ${SERVER_URL}/api/projects/like`,
    //       {
    //         params: {
    //           // memberId: user.key,
    //           projectId: productDetail.id,
    //         },
    //         headers: {
    //           ...(Cookies.get("accessToken") && {
    //             Authorization: `Bearer ${Cookies.get("accessToken")}`,
    //           }),
    //         },
    //       }
    //     );
    //     console.log("좋아요 취소 성공:", response.data);
    //     setLiked_count(liked_count - 1);
    //     // setLiked_count((prevCount) => prevCount - 1); // 함수형 업데이트로 좋아요 수 감소
    //   } else {
    //     // 좋아요 추가 요청
    //     const response = await axios.post(
    //       ` ${SERVER_URL}/api/projects/like`,
    //       null,
    //       {
    //         params: {
    //           // memberId: user.key,
    //           projectId: productDetail.id,
    //         },
    //         headers: {
    //           ...(Cookies.get("accessToken") && {
    //             Authorization: `Bearer ${Cookies.get("accessToken")}`,
    //           }),
    //         },
    //       }
    //     );
    //     console.log("좋아요 성공:", response.data);
    //     setLiked_count((prevCount) => prevCount + 1); // 함수형 업데이트로 좋아요 수 증가
    //   }
    //   // 좋아요 상태 업데이트
    //   setIsHearted(newHeartedStatus);
    // } catch (error) {
    //   console.error("좋아요 처리 중 오류 발생:", error);
    // }

    // return newHeartedStatus; // 새로운 상태 반환
  };

  return (
    <div style={{ width: "100%", margin: "0px auto" }}>
      <div style={{ marginTop: "150px" }}>
        <ProjectTitle
          projectTitle={{
            category: "description",
            nickname: "nickname",
            title: "title",
            description: "description",
          }}
        />
      </div>
      <div
        style={{
          display: "flex",
          flexFlow: "row wrap",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        <ImageCarousel images={Images} style={CarouselStyle} />
        <ProjectInfo
          projectInfo={dummyProjectInfo}
          handleSponsorClick={handleSponsorClick}
          handleHeartClick={handleHeartClick}
          handleCollabClick={handleCollabClick}
        />
      </div>

      <div style={{ margin: "100px 0px 50px 0px" }}>
        <TabComponent
          tabIndex={tabIndex}
          setTabIndex={setTabIndex}
          labels={labels}
          sectionRefs={sectionRefs} // ref 전달
        />
      </div>

      <div
        style={{
          display: "flex",
          flexFlow: "row wrap",
          justifyContent: "space-around",
          alignItems: "flex-start",
          height: "atuo",
        }}
      >
        {/* <DetailDescroption /> */}
        <div
          style={{
            width: "800px",
            height: "atuo",
          }}
        >
          <DetailDescroption
            descriptionDetail={
              "descriptionDdescriptionDetaildescriptionDetaildescriptionDetaildescriptionDetaildescriptionDetaildescriptionDetaildescriptionDetaildescriptionDetaildescriptionDetaildescriptionDetaildescriptionDetaildescriptionDetaildescriptionDetaildescriptionDetailetaildescriptionDetail"
            }
            descriptionImages={Images}
          />
        </div>
        <GiftCompositionComponent />
      </div>

      {modalOpen && (
        <CollabModal
          onClose={handleModalClose}
          setCollabDetails={setCollabDetails}
          collabDetails={collabDetails}
          errors={errors}
          setErrors={setErrors}
          projectId={"project.id"} //------------------------------>project.id로 수정
        />
      )}

      <div style={{ margin: "100px 0px 50px 0px" }}>
        <TabComponent
          tabIndex={tabIndex}
          setTabIndex={setTabIndex}
          labels={labels}
          sectionRefs={sectionRefs} // ref 전달
        />
      </div>
      <div style={{ padding: "20px", width: "90%", margin: "0 auto" }}>
        <Notice />
      </div>

      <div style={{ margin: "100px 0px 50px 0px" }}>
        <TabComponent
          tabIndex={tabIndex}
          setTabIndex={setTabIndex}
          labels={labels}
          sectionRefs={sectionRefs} // ref 전달
        />
      </div>
      <div style={{ padding: "20px", width: "90%", margin: "0 auto" }}>
        <QnA />
      </div>
    </div>
  );
};
