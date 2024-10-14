import React, { useEffect, useState, useRef } from 'react'; // React 및 훅들
import { Box, Typography, IconButton } from '@mui/material'; // MUI 컴포넌트들
import axios from 'axios'; // axios
import Cookies from 'js-cookie'; // Cookies
import { useUser } from './hooks/useUser'; // 사용자 훅 (경로에 맞게 수정)
import ProductCard from './ProductCard'; // ProductCard 컴포넌트 (경로에 맞게 수정)
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'; // 왼쪽 화살표 아이콘
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'; // 오른쪽 화살표 아이콘
import { SERVER_URL } from './config'; // 서버 URL (경로에 맞게 수정)

export const ProductRecommendations = ({ sortCondition, title, subTitle }) => {
    const { user } = useUser();
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

    useEffect(() => {
      fetchProducts();
    }, []);

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
            width: "80%",
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
            <IconButton
              onClick={() => handleScroll("left")}
              sx={{ marginRight: "10px" }}
            >
              <ArrowBackIosNewIcon />
            </IconButton>

            <Box
              sx={{
                display: "flex",
                overflowX: "hidden",
                scrollBehavior: "smooth",
                maxWidth: "90%",
                width: "90%",
              }}
              ref={scrollContainerRef}
            >
              {products.map((product) => (
                <Box key={product.id}>
                  <ProductCard product={product} handleLike={handleLike} />
                </Box>
              ))}
            </Box>

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
