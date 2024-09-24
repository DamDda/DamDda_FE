import React, { useState, useEffect } from "react";
import ProjectCard from "./ProjectCard"; // ProjectCard 컴포넌트
import './css/SupportedProjects.css'; // CSS 파일 경로 수정

export default function SupportedProjects({ memberId }) {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // 임시로 사용할 가짜 데이터 함수
  const mockFetchSupportedProjects = () => {
    const mockData = [
      {
        title: "프로젝트 제목 1",
        thumbnailUrl: "https://via.placeholder.com/150",
        packageName: "선물 구성 1",
        packagePrice: 50000,
        paymentDate: "2024-09-05T11:30:00",
        supportNumber: 18236915671,
        status: '진행중'
      },
      {
        title: "프로젝트 제목 2",
        thumbnailUrl: "https://via.placeholder.com/150",
        packageName: "선물 구성 2",
        packagePrice: 100000,
        paymentDate: "2023-12-20T18:30:00",
        supportNumber: 17534789126,
        status: '마감'
      },
      {
        title: "프로젝트 제목 3",
        thumbnailUrl: "https://via.placeholder.com/150",
        packageName: "선물 구성 3",
        packagePrice: 10000,
        paymentDate: "2024-09-05T11:30:00",
        supportNumber: 16236915671,
        status: '진행중'
      },
    ];
    setProjects(mockData);
    setIsLoading(false); // 로딩 완료
  };

  useEffect(() => {
    mockFetchSupportedProjects(); // 가짜 데이터 로드 (백엔드 준비되면 fetchSupportedProjects로 대체)
  }, []);

  // 백엔드에서 후원한 프로젝트 목록을 가져오는 함수 (주석 처리)
  /*
  const fetchSupportedProjects = async () => {
    try {
      const response = await axios.get(`/orders/list/${memberId}`, {
        params: {
          page: 1,
          size: 2
        }
      });
      setProjects(response.data); // 받아온 데이터를 상태로 설정
      setIsLoading(false); // 로딩 완료
    } catch (error) {
      console.error('후원한 프로젝트 데이터를 불러오는 중 오류 발생:', error);
      setIsLoading(false); // 오류 발생 시 로딩 종료
    }
  };
  */

  if (isLoading) {
    return <p>로딩 중...</p>;
  }

  return (
    <div className="supported-projects-container">
      <div className="projects-list">
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} />
        ))}
      </div>
    </div>
  );
}
