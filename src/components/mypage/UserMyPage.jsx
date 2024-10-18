import React, { useState, useEffect, useRef } from "react";
import ProfileEditPage from "./ProfileEditPage";
import Myproject from "./MyProject";
import MyProjectDetails from "./MyProjectDetail";
import ProfileStatistics from "./ProfileStatistics";
import SupportedProjects from "./SupportedProjects";
import Withdrawal from "./Withdrawal";
import TabsUnderlinePlacement from "./TabsUnderlinePlacement";
import CollaborationList from "./CollaborationList";
import LikeProject from "./LikeProject";
import MypageHeader from "./MypageHeader";
import axios from "axios";
import { useUser } from "UserContext";
import CollaborationDetail from "./CollaborationDetail";
import Cookies from "js-cookie";
import { SERVER_URL } from "constants/URLs";
import { TabComponent } from "components/common/TabComponent";


export const UserMyPage = () => {
  //////////Tab 관련 시작//////////////////////////////////
  const [tabIndex, setTabIndex] = useState(0);
  const [isClickProfile, setClickProfile] = useState(false);
  const [isClickOrder, setClickOrder] = useState(false);
  const [isClickMyproject, setClickMyproject] = useState(false);
  const [isClickCollb, setClickCollb] = useState(false);



  // 각 섹션에 대한 ref 정의
  const sectionRefs = {
    profileRef : useRef(null),
    OrderRef : useRef(null),
    MyProjectRef : useRef(null),
    LikedRef : useRef(null),
    CollbRef : useRef(null),
    UnsubscribeRef : useRef(null),
  };

  const labels = ["프로필", "나의 주문", "나의 프로젝트", "관심 프로젝트", "협업하기" ,"탈퇴하기"]; // 탭 레이블을 배열로 정의

  //탭 이동
  const handleTabClick = (index) => {
    alert(labels[index] + " 클릭함!")
    setTabIndex(index);

  };

  //////////Tab 관련 끝//////////////////////////////////

  //////////Tab 클릭 시 아래 랜더링 되는 부분 나타내기//////////////////////////////////

    // 각 탭에 맞는 내용을 렌더링하는 함수
    const renderTabContent = () => {
        switch (tabIndex) {
          case 0:
            return <div>프로필 정보가 여기에 나타납니다.</div>;
          case 1:
            return <div>나의 주문 내용이 여기에 나타납니다.</div>;
          case 2:
            return <div>나의 프로젝트 내용이 여기에 나타납니다.</div>;
          case 3:
            return <div>관심 프로젝트 내용이 여기에 나타납니다.</div>;
          case 4:
            return <div>협업하기 정보가 여기에 나타납니다.</div>;
          case 5:
            return <div>탈퇴하기 관련 정보가 여기에 나타납니다.</div>;
          default:
            return null;
        }
      };
  //////////Tab 관련 끝//////////////////////////////////




  return (
    <>
      <div ref={sectionRefs.qnaRef} style={{ margin: "150px 0px 50px 0px" }}>
        <TabComponent
          tabIndex={tabIndex}
          setTabIndex={(index) => handleTabClick(index)}
          labels={labels}
          sectionRefs={sectionRefs} // ref 전달
        />
        <div style={{width : "100%", height: "700px", backgroundColor: "gray"}}>
        {renderTabContent()}  {/* 탭에 맞는 내용 렌더링 */}

        </div>
      </div>
    </>
  );
};
