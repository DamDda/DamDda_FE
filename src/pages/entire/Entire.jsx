import { React, useState, useEffect } from "react";
import { MultiCategoryComponent } from "components/common/MultiCategoryComponent";
import { useLocation } from "react-router-dom";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { ProjectRowComponent } from "components/common/ProjectRowComponent";
import axios from "axios";
import { Layout } from "components/layout/DamDdaContainer";
import { PaginationComponent } from "components/common/PaginationComponent";
import { ProgressButton } from "components/common/ButtonComponent";
import { DropdownComponent } from "components/common/DropdownComponent"
export function Entire() {
  ////////////////////////////////////
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const [category, setCategory] = useState(query.get("category") || "전체");
  const [search, setSearch] = useState(query.get("search") || "");
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const [products, setProducts] = useState([]); // 서버에서 가져온 프로젝트 데이터
  const [totalProductNum, setTotalProductNum] = useState(0); // 서버에서 가져온 프로젝트 데이터
  const [totalPages, setTotalPages] = useState(1); // 전체 페이지 수

  const [recommendedProducts, setRecommendedProducts] = useState([]); // 서버에서 가져온 프로젝트 데이터
  const [progress, setProgress] = useState("all"); // progress 상태 관리
  const [sortCondition, setSortCondition] = useState("all");

  const itemsPerPage = 20; // 페이지당 항목 수
  const recommendedItemPerPage = 5; //에디터 추천도 동일하게 있어야 할 듯

  const halfIndex = Math.ceil(products.length / 2); // 절반 인덱스 계산
  const firstHalf = products.slice(0, halfIndex); // 첫 번째 절반
  const secondHalf = products.slice(halfIndex); // 두 번째 절반

  // 페이지 번호 배열 생성
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  // 버튼 데이터 (OK)
  const buttonData = [
    { type: "all", label: "전체 프로젝트" },
    { type: "ongoing", label: "진행중인 프로젝트" },
    { type: "completed", label: "종료된 프로젝트" },
  ];

  // 정렬 기준 옵션 데이터 (OK)
  const sortOptions = [
    { value: "all", label: "---------" },
    { value: "fundsReceive", label: "달성률순" },
    { value: "endDate", label: "마감 임박순" },
    { value: "viewCnt", label: "최다 조회순" },
    { value: "createdAt", label: "등록순" },
    { value: "targetFunding", label: "최다 후원금액순" },
    { value: "supporterCnt", label: "최대 후원자순" },
    { value: "likeCnt", label: "좋아요순" },
  ];
//////////////////////////////////////
  const ProjectButtons = () => {
    const [progress, setProgress] = useState("all");

    const handleClick2 = (type) => {
      setProgress(type);
    };
  };
  const fetchRecommendedProducts = async (page, progress) => {
    try {
      const response = await axios.get(
        `http://localhost:9000/api/projects/projects`,
        {
          params: {
            page: page,
            memberId: 1,
            size: recommendedItemPerPage,
            progress: progress, // 진행 상태 필터 적용
          },
        }
      );

      if (response.data.dtoList !== null) {
        setRecommendedProducts(response.data.dtoList); // 서버에서 받은 프로젝트 리스트
      } else {
        setRecommendedProducts([]); // 서버에서 받은 프로젝트 리스트
      }
    } catch (error) {
      console.error("추천 프로젝트 데이터를 가져오는 중 오류 발생:", error);
    }
  };
  // 처음 마운트되었을 때 및 페이지 변경 시 데이터 가져오기
  useEffect(() => {
    fetchProducts(currentPage, progress, sortCondition, category, search);
    fetchRecommendedProducts(
      currentPage,
      progress,
      sortCondition,
      category,
      search
    );
  }, [currentPage, progress, sortCondition, category, search]);

  // 클릭 핸들러
  const handleClick = (value) => {
    setProgress(value); // 클릭한 버튼에 따라 상태 변경
    setCurrentPage(1); // 새로운 필터로 처음 페이지부터 시작
  };

  // 페이지네이션 요청을 보내는 함수
  const fetchProducts = async (
    page,
    progress,
    sortCondition,
    cartegory,
    search
  ) => {
    try {
      const response = await axios.get(
        `http://localhost:9000/api/projects/projects`,
        {
          params: {
            search: search,
            category: cartegory,
            sort: sortCondition,
            memberId: 1,
            page: page,
            size: itemsPerPage,
            progress: progress, // 진행 상태 필터 적용
          },
        }
      );

      if (response.data.dtoList !== null) {
        setProducts(response.data.dtoList); // 서버에서 받은 프로젝트 리스트
      } else {
        setProducts([]); // 서버에서 받은 프로젝트 리스트
      }
      setTotalPages(Math.ceil(response.data.total / itemsPerPage)); // 전체 페이지 수 업데이트
      setTotalProductNum(response.data.total);
    } catch (error) {
      console.error("프로젝트 데이터를 가져오는 중 오류 발생:", error);
    }
  };


  const handleSortChange = (e) => {
    setSortCondition(e.target.value);
  };
  const memberId = 1;

  // 좋아요 요청을 처리하는 함수
  const handleLike = async (project) => {
    try {
      if (project.liked) {
        // liked가 true이면 DELETE 요청
        const response = await axios.delete(
          `http://localhost:9000/api/projects/like`,
          {
            params: {
              memberId: memberId,
              projectId: project.id,
            },
          }
        );
        console.log("좋아요 취소 성공:", response.data);
      } else {
        // liked가 false이면 POST 요청
        const response = await axios.post(
          `http://localhost:9000/api/projects/like`,
          null,
          {
            params: {
              memberId: memberId,
              projectId: project.id,
            },
          }
        );
        console.log("좋아요 성공:", response.data);
      }

      fetchProducts(currentPage, progress);
      fetchRecommendedProducts(currentPage, progress)

      // 이후에 필요한 처리 (예: UI 업데이트)
      setProducts((prevProjects) =>
        prevProjects.map((prevProject) =>
          prevProject.id === project.id
            ? { ...prevProject, liked: !prevProject.liked }
            : prevProject
        )
      );
      // 이후에 필요한 처리 (예: UI 업데이트)
      setRecommendedProducts((prevProjects) =>
        prevProjects.map((prevProject) =>
          prevProject.id === project.id
            ? { ...prevProject, liked: !prevProject.liked }
            : prevProject
        )
      );
    } catch (error) {
      console.error("좋아요 요청 중 오류 발생:", error);
    }
  };

  //
  //////////////////////////////////////

  return (
    <>
      <Layout>

        <Box sx={{ marginTop: 20 }}>
          {" "}
          {/* marginTop으로 여백 조절 */}
          <MultiCategoryComponent setCartegory={setCategory} />
        </Box>

        <Box
          sx={{
            paddingLeft: 2, // 왼쪽으로 살짝 이동 (2는 16px)
            textAlign: "left",
            fontSize: "0.875rem", // 글씨 크기 조정 (1rem = 16px -> 0.875rem = 14px)
            width: "100%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between", // 요소들을 좌우로 배치
              alignItems: "center", // 수직 가운데 정렬
              width: "100%", // 컨테이너 너비를 100%로 설정
              marginBottom: 2, // 아래쪽 여백
            }}
          >
            {/* 좌측 타이틀 */}
            <Box>
              <h2 style={{ fontSize: "1.7rem", marginBottom: 20 }}>
                {category} 프로젝트
              </h2>
              <h4 style={{ fontSize: "1.1rem", margin: 5, marginBottom: 20 }}>
                {totalProductNum}개의 프로젝트가 있습니다.
              </h4>
            </Box>

            {/* 우측 드롭다운 (정렬 기준) */}
            <DropdownComponent
      inputLabel="정렬 기준"
      menuItems={sortOptions.map(option => option.label)} // 각 옵션의 label 사용
      selectValue={sortOptions.find(option => option.value === sortCondition)?.label || ""}
      onChange={(e) => {
        const selectedOption = sortOptions.find(option => option.label === e.target.value);
        handleSortChange({ target: { value: selectedOption?.value || "" } });
      }}
    />
          </Box>
        </Box>

        <Box sx={{}}>
            {/* 진행중버튼 */}
            {buttonData.map((button, index) => (
              <ProgressButton
                key={index}
                type={button.type}
                progress={progress}
                handleClick={handleClick}
              >
                {button.label}
              </ProgressButton>
            ))}
        </Box>
        <ProjectRowComponent
          category={category}
          search={search}
        ></ProjectRowComponent>
        <PaginationComponent
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </Layout>
    </>
  );
}
