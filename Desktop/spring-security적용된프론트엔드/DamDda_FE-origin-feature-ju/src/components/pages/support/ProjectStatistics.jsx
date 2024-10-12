import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { South } from '@mui/icons-material';
import Cookies from "js-cookie";
import { SERVER_URL } from "../../../constants/URLs";

function ProjectStatistics() {
  const [projectId, setProjectId] = useState(null);
  const [statistics, setStatistics] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

// 프로젝트 ID 가져오기
const fetchUserProjectId = async (memberId) => {
  try {
    console.log('API 요청 중...'); // 요청 전에 로그 출력
    // const response = await axios.get(`${SERVER_URL}/order/user/project?memberId=${memberId}`, {
      const response = await axios.get(`${SERVER_URL}/order/user/project`, {
      headers: {
        ...(Cookies.get("accessToken")&& { Authorization: `Bearer ${Cookies.get("accessToken")}` }),
       },

    });
    console.log('응답 데이터:', response.data); // 응답 로그 출력

    // 응답에서 projectId를 추출
    const userProjectId = response.data; // 단순히 ID를 반환하므로, 아래와 같이 수정
    setProjectId(userProjectId); // 상태에 저장
  } catch (error) {
    console.error('프로젝트 ID를 가져오는 중 오류 발생:', error);
  }
};

// 프로젝트 통계 정보를 가져오는 함수
const fetchProjectStatistics = async (projectId) => {
  if (!projectId) return; // projectId가 없으면 함수 종료
  try {
    console.log('projectId:', projectId); // projectId 확인
    const response = await axios.get(`${SERVER_URL}/order/statistics/${projectId}`);
    setStatistics(response.data); // 통계 정보를 상태에 저장
    setLoading(false); // 로딩 완료
  } catch (err) {
    setError('프로젝트 통계 정보를 가져오는 중 오류가 발생했습니다.');
    setLoading(false); // 로딩 완료
  }
};

useEffect(() => {
  const memberId = 8 // JWT로 변경
  fetchUserProjectId(memberId); // 사용자 프로젝트 ID 가져오기
}, []); // 빈 배열을 전달하여 컴포넌트가 처음 렌더링될 때만 호출

useEffect(() => {
  if (projectId) {
    fetchProjectStatistics(projectId); // projectId가 설정되면 통계 가져오기
  }
}, [projectId]); // projectId가 변경될 때마다 호출


  
  return (
    <div className="project-statistics">
      {loading && <p>데이터를 불러오는 중입니다...</p>}
      {error && <p>{error}</p>}
      {!loading && statistics ? ( // statistics가 null이 아닐 때만 접근
        <>
          <p>시작일: {new Date(statistics.startDate).toLocaleDateString()}</p>
          <p>마감일: {new Date(statistics.endDate).toLocaleDateString()}</p>
          <p>총 후원 금액: {statistics.totalSupportAmount.toLocaleString()}원</p>
          <p>달성률: {(statistics.totalSupportAmount / statistics.targetFunding) * 100}%</p>
          <p>후원자 수: {statistics.totalSupporters}명</p>
          <p>남은 기간: {statistics.remainingDays}일</p>
        </>
      ) : (
        <p>통계 정보를 불러오는 중입니다.</p>
      )}
    </div>
  );
  
}

export default ProjectStatistics;
