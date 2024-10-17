import { React, useState, useEffect } from "react";
import { MultiCategoryComponent } from "components/common/MultiCategoryComponent";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import {
  EntireProjectRowComponent,
  ProjectRowComponent,
} from "components/common/ProjectRowComponent";
import axios from "axios";
import { Layout } from "components/layout/DamDdaContainer";
import { PaginationComponent } from "components/common/PaginationComponent";
import { ProgressButton } from "components/common/ButtonComponent";
import { DropdownComponent } from "components/common/DropdownComponent";
import { useUser } from "UserContext";
import Cookies from "js-cookie";
import { SERVER_URL } from "constants/URLs";

export function Entire({ search, category }) {
  const { user } = useUser();
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [totalProductNum, setTotalProductNum] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const [progress, setProgress] = useState("all");
  const [sortCondition, setSortCondition] = useState("all");

  const itemsPerPage = 20;
  const recommendedItemPerPage = 5;

  const location = useLocation();
  const query = new URLSearchParams(location.search);

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

  // 페이지네이션 요청을 보내는 함수
  const fetchProducts = async (
    page,
    progress,
    sortCondition,
    category,
    search
  ) => {
    try {
      const response = await axios.get(
        ` ${SERVER_URL}/damdda/project/projects`,
        {
          headers: {
            ...(Cookies.get("accessToken") && {
              Authorization: `Bearer ${Cookies.get("accessToken")}`,
            }),
          },

          params: {
            search: search,
            category: category,
            sort: sortCondition,
            // memberId: user.key,
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

  //추천
  const fetchRecommendedProducts = async (page, progress) => {
    try {
      const response = await axios.get(` ${SERVER_URL}/project/project`, {
        headers: {
          ...(Cookies.get("accessToken") && {
            Authorization: `Bearer ${Cookies.get("accessToken")}`,
          }),
        },

        params: {
          page: page,
          sort: "recommend",
          // memberId: user.key,
          size: recommendedItemPerPage,
          progress: progress, // 진행 상태 필터 적용
        },
      });

      if (response.data.dtoList !== null) {
        setRecommendedProducts(response.data.dtoList); // 서버에서 받은 프로젝트 리스트
      } else {
        setRecommendedProducts([]); // 서버에서 받은 프로젝트 리스트
      }
    } catch (error) {
      console.error("추천 프로젝트 데이터를 가져오는 중 오류 발생:", error);
    }
  };

  // 좋아요 요청을 처리하는 함수
  const handleLike = async (project) => {
    try {
      if (project.liked) {
        // liked가 true이면 DELETE 요청
        const response = await axios.delete(` ${SERVER_URL}/project/like`, {
          headers: {
            ...(Cookies.get("accessToken") && {
              Authorization: `Bearer ${Cookies.get("accessToken")}`,
            }),
          },
          params: {
            // memberId: user.key,
            projectId: project.id,
          },
        });
        console.log("좋아요 취소 성공:", response.data);
      } else {
        // liked가 false이면 POST 요청
        const response = await axios.post(` ${SERVER_URL}/project/like`, null, {
          headers: {
            ...(Cookies.get("accessToken") && {
              Authorization: `Bearer ${Cookies.get("accessToken")}`,
            }),
          },
          params: {
            // memberId: user.key,
            projectId: project.id,
          },
        });
        console.log("좋아요 성공:", response.data);
      }

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

  // 클릭 핸들러
  const handleClick = (value) => {
    setProgress(value); // 클릭한 버튼에 따라 상태 변경
    setCurrentPage(1); // 새로운 필터로 처음 페이지부터 시작
  };

  //클릭핸들러
  const handleSortChange = (e) => {
    setSortCondition(e.target.value);
  };

  //반으로 쪼개기
  const halfIndex = Math.ceil(products.length / 2); // 절반 인덱스 계산
  const firstHalf = products.slice(0, halfIndex); // 첫 번째 절반
  const secondHalf = products.slice(halfIndex); // 두 번째 절반

  /////////////////////////////////////////////////
  return (
    <>
    <Layout>
   
        {/* 상품 카드 그리드 */}
        <Box
          sx={{
            margin: "0 auto",
            padding: 2,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: 1600,
            maxWidth: "100%",
            marginTop:"200px"
          }}
        >
          {/* 중간 텍스트 */}
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
              <FormControl sx={{ minWidth: 200 }}>
                <InputLabel id="sort-select-label">정렬 기준</InputLabel>
                <Select
                  labelId="sort-select-label"
                  id="sort-select"
                  value={sortCondition} // 현재 선택된 정렬 조건
                  label="정렬 기준"
                  onChange={handleSortChange} // 선택 시 호출
                >
                  <MenuItem value="all">----------</MenuItem>
                  <MenuItem value="fundsReceive">달성률순</MenuItem>
                  <MenuItem value="endDate">마감 임박순</MenuItem>
                  <MenuItem value="viewCnt">최다 조회순</MenuItem>
                  <MenuItem value="createdAt">등록순</MenuItem>
                  <MenuItem value="targetFunding">최다 후원금액순</MenuItem>
                  <MenuItem value="supporterCnt">최대 후원자순</MenuItem>
                  <MenuItem value="likeCnt">좋아요순</MenuItem>
                </Select>
              </FormControl>
            </Box>

            {/* 진행상황 버튼 */}

            <Box
              sx={{
                marginBottom: 3, // 아래쪽 여백
              }}
            >
              {/* 전체 프로젝트 버튼 */}
              <Button
                onClick={() => handleClick("all")}
                variant={progress === "all" ? "contained" : "outlined"} // 상태에 따라 variant 변경
                // color="secondary"
                size="small"
                sx={{
                  // backgroundColor: progress === "all" ? "#5a87f7" : "transparent", // 배경색도 동적으로
                  borderRadius: "12px",
                  fontSize: "0.75rem",
                  marginRight: "20px",
                }}
              >
                전체 프로젝트
              </Button>

              {/* 진행중인 프로젝트 버튼 */}
              <Button
                onClick={() => handleClick("ongoing")}
                variant={progress === "ongoing" ? "contained" : "outlined"} // 상태에 따라 variant 변경
                // color="secondary"
                size="small"
                sx={{
                  // backgroundColor: progress === "progress" ? "#5a87f7" : "transparent", // 배경색도 동적으로
                  borderRadius: "12px",
                  fontSize: "0.75rem",
                  marginRight: "20px",
                }}
              >
                진행중인 프로젝트
              </Button>

              {/* 종료된 프로젝트 버튼 */}
              <Button
                onClick={() => handleClick("completed")}
                variant={progress === "completed" ? "contained" : "outlined"} // 상태에 따라 variant 변경
                // color="secondary"
                size="small"
                sx={{
                  // backgroundColor: progress === "completed" ? "#5a87f7" : "transparent", // 배경색도 동적으로
                  borderRadius: "12px",
                  fontSize: "0.75rem",
                }}
              >
                종료된 프로젝트
              </Button>
            </Box>
          </Box>

          {/*-------------------------------------------------------*/}
          <Box
            sx={{
              // display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              height: "auto",
            }}
          >
            {/* 첫 번째 카드 그룹 */}
            <grid2
              container
              justifyContent="center"
              alignItems="center"
              spacing={2}
              sx={{ flexGrow: 0 }}
            >
              {firstHalf.map((product) => (
                <grid2
                  item
                  key={product.id}
                  xs={12}
                  sm={6}
                  md={4}
                  lg={3}
                  xl={2.4}
                  display="flex"
                  justifyContent="center"
                >
                   {/* <EntireProjectRowComponent
        product={product}
        search={search}
        category={category}
        handleLike={handleLike}
      /> */}
                </grid2>
              ))}
            </grid2>

            {/* 중간 텍스트 */}
            <Box
              sx={{
                paddingLeft: 2, // 왼쪽으로 살짝 이동 (2는 16px)
                textAlign: "left",
                fontSize: "0.875rem", // 글씨 크기 조정 (1rem = 16px -> 0.875rem = 14px)
              }}
            >
              <h2 style={{ fontSize: "1.25rem", margin: 0 }}>
                에디터 추천 상품
              </h2>{" "}
              {/* 글씨 크기 줄이기 */}
            </Box>

            {/* 회색 배경과 추천 상품 */}
            <Box
              sx={{
                width: "100%",
                backgroundColor: "#f0f0f0", // 회색 배경
                padding: 4,
                marginY: 2, // 위아래 여백
              }}
            >
              <grid2
                container
                justifyContent="center"
                alignItems="center"
                spacing={2}
              >
                {recommendedProducts.map((product) => (
                  <grid2
                    item
                    key={product.id}
                    xs={12}
                    sm={6}
                    md={4}
                    lg={3}
                    xl={2.4}
                    display="flex"
                    justifyContent="center"
                  >
                    <ProjectRowComponent
                      sortCondition={"recommend"}
                      title={"사용자 추천 프로젝트"}
                      subTitle={"나에게 딱 맞는 프로젝트."}
                    />
                  </grid2>
                ))}
              </grid2>
            </Box>

            {/* 두 번째 카드 그룹 */}
            <grid2
              container
              justifyContent="center"
              alignItems="center"
              spacing={2}
              sx={{ flexGrow: 0 }}
            >
              {secondHalf.map((product) => (
                <grid2
                  item
                  key={product.id}
                  xs={12}
                  sm={6}
                  md={4}
                  lg={3}
                  xl={2.4}
                  display="flex"
                  justifyContent="center"
                >
                  {/* <EntireProjectRowComponent
                    product={product}
                    handleLike={handleLike}
                  /> */}
                </grid2>
              ))}
            </grid2>
          </Box>
        </Box>
      </Layout>
    </>
  );
}
