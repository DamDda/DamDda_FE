import React, { useEffect, useState, useRef } from 'react'; // React 및 훅들
import { Box, Typography, IconButton } from '@mui/material'; // MUI 컴포넌트들
import axios from 'axios'; // axios
import Cookies from 'js-cookie'; // Cookies
import { useUser } from '../../UserContext'; // UserContext에서 useUser 가져오기
import { ProductCard } from './ProjectCard'; // ProductCard 컴포넌트 (경로에 맞게 수정)
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'; // 왼쪽 화살표 아이콘
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'; // 오른쪽 화살표 아이콘
import { SERVER_URL } from "constants/URLs";


///메인 추천 범벅
export const ProjectRowComponent = ({ sortCondition, title, subTitle }) => {

//////////////////////////////
    // const { user } = useUser();
    const [products, setProducts] = useState([]);
    const itemsPerPage = 10;

    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `${SERVER_URL}/api/projects/projects`,
          {
            params: {
              page: 1,
              sort: sortCondition,
              size: itemsPerPage,
            },
            headers: {
              ...(Cookies.get("accessToken") && { Authorization: `Bearer ${Cookies.get("accessToken")}` }),
            },
          }
        );

        if (response.data.dtoList !== null) {
          setProducts(response.data.dtoList);
          
        } else {
          setProducts([]);
        }
      } catch (error) {
        console.error("프로젝트 데이터를 가져오는 중 오류 발생:", error);
      }
    };

    const handleLike = async (project) => {
      try {
        if (project.liked) {
          const response = await axios.delete(
            `${SERVER_URL}/api/projects/like`,
            {
              headers: {
                ...(Cookies.get("accessToken") && { Authorization: `Bearer ${Cookies.get("accessToken")}` }),
              },
              params: {
                projectId: project.id,
              },
            }
          );
          console.log("좋아요 취소 성공:", response.data);
        } else {
          const response = await axios.post(
            `${SERVER_URL}/api/projects/like`,
            null,
            {
              headers: {
                ...(Cookies.get("accessToken") && { Authorization: `Bearer ${Cookies.get("accessToken")}` }),
              },
              params: {
                projectId: project.id,
              },
            }
          );
          console.log("좋아요 성공:", response.data);
        }

        setProducts((prevProjects) =>
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
    const scrollContainerRef = useRef(null);

    const handleScroll = (direction) => {
      if (direction === "left") {
        scrollContainerRef.current.scrollLeft -= 648;
      } else {
        scrollContainerRef.current.scrollLeft += 648;
      }
    };
//////////////////////////////

    return (
      <>
        <Box
          sx={{
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            flexWrap: "nowrap",
            alignItems: "center",
            justifyContent: "center",
            padding: 0,
            width: "100%",
            marginTop: 4,
          }}
        >
          <Box
            sx={{
              margin: "0 auto",
              padding: 2,
              display: "flex",
              flexDirection: "column",
              flexWrap: "nowrap",
              justifyContent: "flex-start",
              alignItems: "flex-start",
              width: "100%",
              marginLeft:"10px",

              position: "relative",
            }}
          >
            <Typography
              variant="h4"
              component="div"
              sx={{
                fontWeight: "bold",
                maxWidth: "600px",
                backgroundColor: "white",
                zIndex: 1000,
                fontSize:"24px"
              }}
            >
              <p className="text">
                <span className="text-wrapper">[담ː따] 의 </span>
                <span className="span">{title}</span>
              </p>
              <Typography variant="body2" color="text.secondary" sx={{
               
                fontSize:"15px",
                marginLeft:"10px",
                marginTop:"-6px"
              }}>
                {subTitle}
              </Typography>
            </Typography>
          </Box>
    
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
              height: "auto",
            }}
          >
            <IconButton onClick={() => handleScroll("left")} >
              <ArrowBackIosNewIcon />
            </IconButton>
    
            <Box
              sx={{
                display: "flex",
                overflowX: "hidden",
                scrollBehavior: "smooth",
                maxWidth: "100%",
              }}
              ref={scrollContainerRef}
            >
              {products.map((product) => (
                <Box key={product.id}>
                  <ProductCard product={product} handleLike={handleLike} />
                </Box>
              ))}
            </Box>
    
            <IconButton onClick={() => handleScroll("right")} sx={{ marginLeft: "10px" }}>
              <ArrowForwardIosIcon />
            </IconButton>
          </Box>
        </Box>
      </>
    );
    
  };


///entire 추천에서 가져와서 써야함
export const ProductRecommendations = ({ search, cartegory }) => {
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지

  const [products, setProducts] = useState([]); // 서버에서 가져온 프로젝트 데이터
  const [totalProductNum, setTotalProductNum] = useState(0); // 서버에서 가져온 프로젝트 데이터
  const [totalPages, setTotalPages] = useState(1); // 전체 페이지 수

  const [recommendedProducts, setRecommendedProducts] = useState([]); // 서버에서 가져온 프로젝트 데이터

  const [progress, setProgress] = useState("all"); // progress 상태 관리

  const [sortCondition, setSortCondition] = useState("all");
  // const location = useLocation();
  // const query = new URLSearchParams(location.search);
  // const [cartegory, setCartegory] = useState(query.get('category') || 'all');

  const itemsPerPage = 20; // 페이지당 항목 수
  const recommendedItemPerPage = 5; //에디터 추천도 동일하게 있어야 할 듯

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
    fetchProducts(currentPage, progress, sortCondition, cartegory, search);
    fetchRecommendedProducts(
      currentPage,
      progress,
      sortCondition,
      cartegory,
      search
    );
  }, [currentPage, progress, sortCondition, cartegory, search]);

  // 클릭 핸들러
  const handleClick = (value) => {
    setProgress(value); // 클릭한 버튼에 따라 상태 변경
    setCurrentPage(1); // 새로운 필터로 처음 페이지부터 시작
  };

  /////////////////////********************** */

  const halfIndex = Math.ceil(products.length / 2); // 절반 인덱스 계산
  const firstHalf = products.slice(0, halfIndex); // 첫 번째 절반
  const secondHalf = products.slice(halfIndex); // 두 번째 절반

  // 페이지 번호 배열 생성
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  // 처음 페이지로 이동
  const handleFirstPage = () => {
    setCurrentPage(1);
  };

  // 이전 페이지로 이동
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // 다음 페이지로 이동
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // 끝 페이지로 이동
  const handleEndPage = () => {
    setCurrentPage(totalPages);
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

      // fetchProducts(currentPage, progress);
      // fetchRecommendedProducts(currentPage, progress)

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

  // return (
  //   <>
    
       
       
  //         <Box
  //           sx={{
  //             // display: "flex",
  //             justifyContent: "center",
  //             alignItems: "center",
  //             width: "100%",
  //             height: "auto",
  //           }}
  //         >
  //           <Grid
  //             container
  //             justifyContent="center"
  //             alignItems="center"
  //             spacing={2}
  //             sx={{ flexGrow: 0 }}
  //           >
  //             {firstHalf.map((product) => (
  //               <Grid
  //                 item
  //                 key={product.id}
  //                 xs={12}
  //                 sm={6}
  //                 md={4}
  //                 lg={3}
  //                 xl={2.4}
  //                 display="flex"
  //                 justifyContent="center"
  //               >
  //                 <ProductCard product={product} handleLike={handleLike} />
  //               </Grid>
  //             ))}
  //           </Grid>

  //           {/* 중간 텍스트 */}
  //           <Box
  //             sx={{
  //               paddingLeft: 2, // 왼쪽으로 살짝 이동 (2는 16px)
  //               textAlign: "left",
  //               fontSize: "0.875rem", // 글씨 크기 조정 (1rem = 16px -> 0.875rem = 14px)
  //             }}
  //           >
  //             <h2 style={{ fontSize: "1.25rem", margin: 0 }}>
  //               에디터 추천 상품
  //             </h2>{" "}
  //             {/* 글씨 크기 줄이기 */}
  //           </Box>

  //           {/* 회색 배경과 추천 상품 */}
  //           <Box
  //             sx={{
  //               width: "100%",
  //               backgroundColor: "#f0f0f0", // 회색 배경
  //               padding: 4,
  //               marginY: 2, // 위아래 여백
  //             }}
  //           >
  //             <Grid
  //               container
  //               justifyContent="center"
  //               alignItems="center"
  //               spacing={2}
  //             >
  //               {recommendedProducts.map((product) => (
  //                 <Grid
  //                   item
  //                   key={product.id}
  //                   xs={12}
  //                   sm={6}
  //                   md={4}
  //                   lg={3}
  //                   xl={2.4}
  //                   display="flex"
  //                   justifyContent="center"
  //                 >
  //                   <ProductCard product={product} handleLike={handleLike} />
  //                 </Grid>
  //               ))}
  //             </Grid>
  //           </Box>
  //           {/* 두 번째 카드 그룹 */}
  //           <Grid
  //             container
  //             justifyContent="center"
  //             alignItems="center"
  //             spacing={2}
  //             sx={{ flexGrow: 0 }}
  //           >
  //             {secondHalf.map((product) => (
  //               <Grid
  //                 item
  //                 key={product.id}
  //                 xs={12}
  //                 sm={6}
  //                 md={4}
  //                 lg={3}
  //                 xl={2.4}
  //                 display="flex"
  //                 justifyContent="center"
  //               >
  //                 <ProductCard product={product} handleLike={handleLike} />
  //               </Grid>
  //             ))}
  //           </Grid>

  //     </Box>
  //   </>
  // );
};


  