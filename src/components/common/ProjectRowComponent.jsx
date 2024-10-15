import React, { useEffect, useState, useRef } from 'react'; // React 및 훅들
import { Box, Typography, IconButton } from '@mui/material'; // MUI 컴포넌트들
import axios from 'axios'; // axios
// import Cookies from 'js-cookie'; // Cookies
//import { useUser } from './hooks/useUser'; // 사용자 훅 (경로에 맞게 수정)
import { ProductCard } from './ProjectCard'; // ProductCard 컴포넌트 (경로에 맞게 수정)
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'; // 왼쪽 화살표 아이콘
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'; // 오른쪽 화살표 아이콘
// import { SERVER_URL } from './config'; // 서버 URL (경로에 맞게 수정)



export const ProjectRowComponent = ({ sortCondition, title, subTitle }) => {
  const initialProducts = [
    {
        id: 1,
        title: '프로젝트 A',
        description: '프로젝트 A에 대한 설명입니다.',
        targetFunding: 1000000,
        fundsReceive: 300000,
        endDate: '2024-12-31T23:59:59Z',
        thumbnailUrl: 'path/to/imageA.jpg', // 실제 이미지 경로
        liked: false,
        nickName: '작성자1',
    },
    {
        id: 2,
        title: '프로젝트 B',
        description: '프로젝트 B에 대한 설명입니다.',
        targetFunding: 1500000,
        fundsReceive: 700000,
        endDate: '2024-11-30T23:59:59Z',
        thumbnailUrl: 'path/to/imageB.jpg', // 실제 이미지 경로
        liked: true,
        nickName: '작성자2',
    },
    {
        id: 3,
        title: '프로젝트 C',
        description: '프로젝트 C에 대한 설명입니다.',
        targetFunding: 500000,
        fundsReceive: 200000,
        endDate: '2024-10-15T23:59:59Z',
        thumbnailUrl: 'path/to/imageC.jpg', // 실제 이미지 경로
        liked: false,
        nickName: '작성자3',
    },
    {
        id: 4,
        title: '프로젝트 D',
        description: '프로젝트 D에 대한 설명입니다.',
        targetFunding: 1200000,
        fundsReceive: 850000,
        endDate: '2024-10-20T23:59:59Z',
        thumbnailUrl: 'path/to/imageD.jpg', // 실제 이미지 경로
        liked: true,
        nickName: '작성자4',
    },
    {
        id: 5,
        title: '프로젝트 E',
        description: '프로젝트 E에 대한 설명입니다.',
        targetFunding: 2000000,
        fundsReceive: 1800000,
        endDate: '2024-12-01T23:59:59Z',
        thumbnailUrl: 'path/to/imageE.jpg', // 실제 이미지 경로
        liked: false,
        nickName: '작성자5',
    },
    {
        id: 6,
        title: '프로젝트 F',
        description: '프로젝트 F에 대한 설명입니다.',
        targetFunding: 800000,
        fundsReceive: 400000,
        endDate: '2024-11-15T23:59:59Z',
        thumbnailUrl: 'path/to/imageF.jpg', // 실제 이미지 경로
        liked: true,
        nickName: '작성자6',
    },
];

    // const { user } = useUser();
    const [products, setProducts] = useState([]);
    const itemsPerPage = 10;

    // const fetchProducts = async () => {
    //   try {
    //     const response = await axios.get(
    //       `${SERVER_URL}/api/projects/projects`,
    //       {
    //         params: {
    //           page: 1,
    //           sort: sortCondition,
    //           size: itemsPerPage,
    //         },
    //         headers: {
    //           ...(Cookies.get("accessToken") && { Authorization: `Bearer ${Cookies.get("accessToken")}` }),
    //         },
    //       }
    //     );

    //     if (response.data.dtoList !== null) {
    //       setProducts(response.data.dtoList);
          
    //     } else {
    //       setProducts([]);
    //     }
    //   } catch (error) {
    //     console.error("프로젝트 데이터를 가져오는 중 오류 발생:", error);
    //   }
    // };

    useEffect(() => {
      // fetchProducts();
      setProducts(initialProducts)      ////----------------> 이거 더미 데이터라서 나중에 삭제해야함
    }, []);

    const handleLike = async (project) => {
      try {
        // if (project.liked) {
        //   const response = await axios.delete(
        //     `${SERVER_URL}/api/projects/like`,
        //     {
        //       headers: {
        //         ...(Cookies.get("accessToken") && { Authorization: `Bearer ${Cookies.get("accessToken")}` }),
        //       },
        //       params: {
        //         projectId: project.id,
        //       },
        //     }
        //   );
        //   console.log("좋아요 취소 성공:", response.data);
        // } else {
        //   const response = await axios.post(
        //     `${SERVER_URL}/api/projects/like`,
        //     null,
        //     {
        //       headers: {
        //         ...(Cookies.get("accessToken") && { Authorization: `Bearer ${Cookies.get("accessToken")}` }),
        //       },
        //       params: {
        //         projectId: project.id,
        //       },
        //     }
        //   );
        //   console.log("좋아요 성공:", response.data);
        // }

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
              position: "relative",
            }}
          >
            <Typography
              variant="h4"
              component="div"
              sx={{
                fontWeight: "bold",
                maxWidth: "800px",
                backgroundColor: "white",
                zIndex: 1000,
              }}
            >
              <p className="text">
                <span className="text-wrapper">[담ː따] 의 </span>
                <span className="span">{title}</span>
              </p>
              <Typography variant="body2" color="text.secondary">
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
