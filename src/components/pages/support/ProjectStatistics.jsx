import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ProjectStatistics({ projectId }) {
  const [statistics, setStatistics] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // 프로젝트 통계 정보를 가져오는 함수
  const fetchProjectStatistics = async () => {
    try {
      const response = await axios.get(`http://localhost:9000/order/statistics/2`);
      // const response = await axios.get(`http://localhost:9000/project/statistics/${projectId}`);
      setStatistics(response.data); // 통계 정보를 상태에 저장
      setLoading(false); // 로딩 완료
    } catch (err) {
      setError('프로젝트 통계 정보를 가져오는 중 오류가 발생했습니다.');
      setLoading(false); // 로딩 완료
    }
  };

  useEffect(() => {
    fetchProjectStatistics();
  }, [projectId]);

  
  return (
    <div className="project-statistics">
      <p>시작일: {new Date(statistics.startDate).toLocaleDateString()}</p>
      <p>마감일: {new Date(statistics.endDate).toLocaleDateString()}</p>
      <p>총 후원 금액: {statistics.totalSupportAmount.toLocaleString()}원</p>
      <p>달성률: {(statistics.totalSupportAmount/statistics.targetFunding)*100}%</p>
      <p>후원자 수: {statistics.totalSupporters}명</p>
      <p>남은 기간: {statistics.remainingDays}일</p>
    </div>
  );
}

export default ProjectStatistics;
