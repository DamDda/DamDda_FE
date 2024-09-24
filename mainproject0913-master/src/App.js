import React, { useState, useEffect } from "react";  
import Header from "./components/Header";  // Header 컴포넌트
import ProfileStatistics from "./components/ProfileStatistics";  // 프로필 조회 컴포넌트
import ProfileEditPage from "./components/ProfileEditPage";  // 프로필 수정 컴포넌트
import SupportedProjects from "./components/SupportedProjects"; // 내가 후원한 프로젝트 탭 컴포넌트
import Tabs from "./components/Tabs";  // 탭 컴포넌트
import MyProject from "./components/MyProject";
import MyProjectDetail from "./components/MyProjectDetail";
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';  // react-router-dom 사용
// import axios from 'axios';  // API 호출을 위해 axios 사용 (백엔드 준비되면 사용)

const App = () => {
  const [profileData, setProfileData] = useState(null); // 프로필 데이터 상태
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태

  // 가짜 데이터를 사용하여 프로필 데이터 설정
  const mockFetchProfileData = () => {
    const mockData = {
      loginId: "shine2462",
      name: "김철수",  // 사용자 이름
      email: "shine2462@naver.com",
      nickname: "수세미",
      phoneNumber: "010-1234-5678",
      address: "서울시 성동구 oo동",
    };
    setProfileData(mockData);
    setIsLoading(false); // 로딩 완료
  };

  // 실제 API 호출 부분 (백엔드가 준비되면 주석 해제)
/*
  const fetchProfileData = async () => {
    try {
      const response = await axios.get('/api/members/profile?id=shine2462'); // 백엔드에서 프로필 정보 가져오기
      const profile = response.data;
      setProfileData(profile);
      setIsLoading(false); // 로딩 완료
    } catch (error) {
      console.error('프로필 데이터를 불러오는 중 오류 발생:', error);
      setIsLoading(false); // 로딩 오류 처리 후 완료
    }
  };
*/

  useEffect(() => {
    mockFetchProfileData(); // 가짜 데이터 로드 (백엔드 준비되면 fetchProfileData로 대체)
    // fetchProfileData(); // 실제 API 호출 (백엔드 준비되면 이 부분을 사용)
  }, []);

  // 데이터를 로딩 중일 때 표시할 화면
  if (isLoading) {
    return <p>로딩 중...</p>;
  }

  return (
    <Router>
      <div>
        {/* 헤더와 탭은 공통으로 표시됩니다 */}
        <Header nickname={profileData.nickname || "사용자"} />  {/* nickname 값을 Header로 전달 */}
        <Tabs />
        <Routes>
          {/* 기본 경로에 접근할 때 자동으로 프로필 조회 페이지로 이동 */}
          <Route path="/" element={<Navigate to="/profile" />} />
          
          {/* 프로필 조회 페이지 */}
          <Route path="/profile" element={<ProfileStatistics profile={profileData} />} />

          {/* 프로필 수정 페이지 */}
          <Route path="/profileEdit" element={<ProfileEditPage profile={profileData} />} />

          {/* 내가 후원한 프로젝트 페이지 */}
          <Route path="/supportedProjects" element={<SupportedProjects />} />

          {/* 내가 올린 프로젝트 */}
          <Route path="/myproject" element={<MyProject/>}/>
        
          {/* 내가 올린 프로젝트 상세페이지 */}
          <Route path="/project/:id" element={<MyProjectDetail/>}/>
        
        </Routes>
      </div>
    </Router>
  );
};

export default App;
