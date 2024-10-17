import React, { useEffect, useState, useRef } from 'react'; // React 및 훅들
import { Box, Typography, IconButton } from '@mui/material'; // MUI 컴포넌트들
import axios from 'axios'; // axios
import Cookies from 'js-cookie'; // Cookies
import { useUser } from '../../UserContext'; // UserContext에서 useUser 가져오기
import { ProductCard } from './ProjectCard'; // ProductCard 컴포넌트 (경로에 맞게 수정)
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'; // 왼쪽 화살표 아이콘
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'; // 오른쪽 화살표 아이콘
import { SERVER_URL } from "constants/URLs";
import { useNavigate } from 'react-router-dom';

//추천
export const ProjectRowComponent = ({ sortCondition, title, subTitle }) => {
  const { user } = useUser();
  const [products, setProducts] = useState([]); // 서버에서 가져온 프로젝트 데이터
  const itemsPerPage = 10; // 페이지당 항목 수



  // 로그인 여부에 따라 사용자 상태를 한 번만 업데이트
  // useEffect(() => {
  //   if (!isLogin) {
  //     console.log("Setting user key to 0");
  //     setUser((prevUser) => ({ ...prevUser, key: 0 }));
  //   }
  // }, [isLogin, setUser]); // isLogin이 변경될 때만 실행

  // 페이지네이션 요청을 보내는 함수
  const fetchProducts = async () => {
    console.log("user.id : " + user.id);
    console.log("user.key : " + user.key);
    console.log("user.profile : " + user.profile);
    console.log("user.nickname : " + user.nickname);
    console.log("Cookies.get(accessToken)" + Cookies.get("accessToken"));
    try {
      const response = await axios.get(
      `${SERVER_URL}/project/projects`,
        {
          params: {
            memberId: user.key,
            page: 1,
            sort: sortCondition,
            size: itemsPerPage,
          },
          headers: {
            ...(Cookies.get("accessToken") && {
              Authorization: `Bearer ${Cookies.get("accessToken")}`,
            }),
          },
        }
      );

      if (response.data.dtoList !== null) {
        setProducts(response.data.dtoList); // 서버에서 받은 프로젝트 리스트
      } else {
        setProducts([]); // 서버에서 받은 프로젝트 리스트
      }
    } catch (error) {
      console.log(window.location.hostname);
      console.error("프로젝트 데이터를 가져오는 중 오류 발생:", error);
    }
  };

  // 처음 마운트되었을 때 및 페이지 변경 시 데이터 가져오기
  useEffect(() => {
    fetchProducts();
  }, []);

  
// // 좋아요 요청을 처리하는 함수
const handleLike = async (project) => {
  try {
    if (project.liked) {
      // liked가 true이면 DELETE 요청
      const response = await axios.delete(
       `${SERVER_URL}/project/like`,
        {
          headers: {
            ...(Cookies.get("accessToken") && {
              Authorization: `Bearer ${Cookies.get("accessToken")}`,
            }),
          },

          params: {
            memberId: user.key,
            projectId: project.id,
          },
        }
      );
      console.log("좋아요 취소 성공:", response.data);
    } else {
      // liked가 false이면 POST 요청
      const response = await axios.post(
        `${SERVER_URL}/project/projects`,
        null,
        {
          headers: {
            ...(Cookies.get("accessToken") && {
              Authorization: `Bearer ${Cookies.get("accessToken")}`,
            }),
          },
          params: {
            memberId: user.key,
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
  } catch (error) {
    console.error("좋아요 요청 중 오류 발생:", error);
  }
};
  const scrollContainerRef = useRef(null);

  const handleScroll = (direction) => {
    if (direction === "left") {
      scrollContainerRef.current.scrollLeft -= 648; // 왼쪽으로 200px 스크롤
    } else {
      scrollContainerRef.current.scrollLeft += 648; // 오른쪽으로 200px 스크롤
    }
  };
  console.log(products);

//////////////////////////////

return (
  <>
    {/* 타이틀과 서브타이틀 부분 */}
    <Box
      sx={{
        margin: "0 auto",

        display: "flex",
        flexDirection: "column",
        flexWrap: "nowrap",
        alignItems: "center",
        justifyContent: "center",

        padding: 0,
        // height: 20,
        width: "80%",
        // minWidth: '600px',

        marginTop: 1,
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
        }}
      >
        <Typography
          variant="h5"
          component="div"
          sx={{ fontWeight: "bold", mb: 1 }}
        >
          <p className="text">
            <span className="text-wrapper">[담ː따] 의 </span>
            <span className="span">{title}</span>
          </p>{" "}
          <Typography variant="body2" color="text.secondary">
            {subTitle}
          </Typography>
        </Typography>
      </Box>

      {/* 상품 카드 그리드 */}
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


        {/* 왼쪽 화살표 */}
        <IconButton
          onClick={() => handleScroll("left")}
          sx={{ marginRight: "10px" }}
        >
          <ArrowBackIosNewIcon />
        </IconButton>


        {/* 카드들을 감싸는 박스 */}
        <Box
          sx={{
            display: "flex",
            overflowX: "hidden", // 스크롤 감추기
            scrollBehavior: "smooth", // 스크롤 부드럽게
            maxWidth: "90%", // 한 줄로 제한
            width: "90%",
          }}
          ref={scrollContainerRef}
        >
        {products.map((product) => {
  // console.group(`Product ID: ${product.id}`);
  // Object.entries(product).forEach(([key, value]) => {
  //   console.log(`${key}:`, value);
  // });
  // console.groupEnd();

  return (
    <Box key={product.id}>
      <ProductCard product={product} handleLike={handleLike} />
    </Box>
  );
})}

        </Box>

     

        {/* 오른쪽 화살표 */}
        <IconButton
          onClick={() => handleScroll("right")}
          sx={{ marginLeft: "10px" }}
        >
          <ArrowForwardIosIcon />
        </IconButton>
      </Box>
    </Box>
  </>
);
    
  };


///entire 추천에서 가져와서 써야함
export const EntireProjectRowComponent = ({ search, category }) => {







  // return (
  //   <>
  //     {/* 타이틀과 서브타이틀 부분 */}
  //     <Box
  //       sx={{
  //         margin: "0 auto",
  
  //         display: "flex",
  //         flexDirection: "column",
  //         flexWrap: "nowrap",
  //         alignItems: "center",
  //         justifyContent: "center",
  
  //         padding: 0,
  //         // height: 20,
  //         width: "80%",
  //         // minWidth: '600px',
  
  //         marginTop: 1,
  //       }}
  //     >
  //       <Box
  //         sx={{
  //           margin: "0 auto",
  //           padding: 2,
  //           display: "flex",
  //           flexDirection: "column",
  //           flexWrap: "nowrap",
  //           justifyContent: "flex-start",
  //           alignItems: "flex-start",
  //           width: "100%",
  //         }}
  //       >
  //         <Typography
  //           variant="h5"
  //           component="div"
  //           sx={{ fontWeight: "bold", mb: 1 }}
  //         >
  //           <p className="text">
  //             <span className="text-wrapper">[담ː따] 의 </span>
  //             <span className="span">{title}</span>
  //           </p>{" "}
  //           <Typography variant="body2" color="text.secondary">
  //             {subTitle}
  //           </Typography>
  //         </Typography>
  //       </Box>
  
  //       {/* 상품 카드 그리드 */}
  //       <Box
  //         sx={{
  //           display: "flex",
  //           flexDirection: "row",
  //           justifyContent: "space-between",
  //           alignItems: "center",
  //           width: "100%",
  //           height: "auto",
  //         }}
  //       >
  
  
  //         {/* 왼쪽 화살표 */}
  //         <IconButton
  //           onClick={() => handleScroll("left")}
  //           sx={{ marginRight: "10px" }}
  //         >
  //           <ArrowBackIosNewIcon />
  //         </IconButton>
  
  
  //         {/* 카드들을 감싸는 박스 */}
  //         <Box
  //           sx={{
  //             display: "flex",
  //             overflowX: "hidden", // 스크롤 감추기
  //             scrollBehavior: "smooth", // 스크롤 부드럽게
  //             maxWidth: "90%", // 한 줄로 제한
  //             width: "90%",
  //           }}
  //           ref={scrollContainerRef}
  //         >
  //           {products.map((product) => (
  //             <Box
  //               key={product.id}
  //             >
  //               <ProductCard product={product} handleLike={handleLike} />
  //             </Box>
              
  //           ))}
  //         </Box>
  
       
  
  //         {/* 오른쪽 화살표 */}
  //         <IconButton
  //           onClick={() => handleScroll("right")}
  //           sx={{ marginLeft: "10px" }}
  //         >
  //           <ArrowForwardIosIcon />
  //         </IconButton>
  //       </Box>
  //     </Box>
  //   </>
  // );
};


  