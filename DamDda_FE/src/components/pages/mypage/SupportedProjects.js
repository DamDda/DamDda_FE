import React, { useState, useEffect } from "react";
import ProjectCard from "./ProjectCard"; // ProjectCard 컴포넌트
import "./css/SupportedProjects.css"; // CSS 파일 경로 수정
import axios from "axios";
import { useUser } from "../../../UserContext";
import Cookies from "js-cookie";
import { SERVER_URL } from "../../../constants/URLs";

export default function SupportedProjects() {
  const { user } = useUser();
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [order, setOrder] = useState(true);

  const userId = 3; // jwt 적용후에 바꿔야함

  // 백엔드에서 후원한 프로젝트 목록을 가져오는 함수 (주석 처리)
  const fetchOrders = async () => {
    try {
      // const response = await axios.get(`${SERVER_URL}/order/supportingprojects?userId=${userId}`);
      const response = await axios.get(
        `${SERVER_URL}/damdda/order/supportingprojects`,
        {
          headers: {
            ...(Cookies.get("accessToken") && {
              Authorization: `Bearer ${Cookies.get("accessToken")}`,
            }),
          },
        }
      );

      setProjects(response.data);
      setLoading(false);
    } catch (err) {
      console.error("후원한 프로젝트 데이터를 불러오는 중 오류 발생:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [userId]);

  return (
    <div className="supported-projects-container">
      <div className="projects-list">
        {projects.map(
          (project, index) => (
            console.log(project), // project 값을 콘솔에 출력
            (<ProjectCard key={index} project={project} />)
          )
        )}
      </div>
    </div>
  );
}
