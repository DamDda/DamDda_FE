import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardMedia, IconButton, Button, LinearProgress, Box, Typography } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';

export const ProductCard = ({ product, handleLike }) => {
  const formattedTargetFunding = new Intl.NumberFormat().format(product.targetFunding);

  const achievementRate = Math.min((product.fundsReceive / product.targetFunding) * 100, 100);

  const currentTime = new Date();
  const endDate = new Date(product.endDate);
  const timeDifference = endDate - currentTime;
  const daysLeft = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

  const navigate = useNavigate();

  return (
    <>
      <Card
        sx={{
          borderRadius: "15px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          padding: 1,
          margin: '0px 10px',
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          overflow: "visible",
          width: "320px",
          height: "480px",
          transform: "scale(0.95)",
          transformOrigin: "top left",
        }}
        onClick={() => navigate(`/detail?projectId=${product.id}`)}
      >
        <Box sx={{ position: "relative" }}>
          <CardMedia
            component="img"
            image={`http://${window.location.hostname}:9000/${product.thumbnailUrl}`}
            sx={{ height: "187.5px", borderRadius: "5px", width: "100%" }}
          />
          <IconButton
            sx={{
              position: "absolute",
              top: 10,
              right: 10,
              color: product.liked ? "red" : "gray",
            }}
            onClick={(event) => {
              event.stopPropagation();
              handleLike(product);
            }}
          >
            <FavoriteIcon />
          </IconButton>
        </Box>

        <CardContent
          sx={{
            width:"270px",
            height: "230px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
            alignItems: "flex-start",
          }}
        >
          {/* Title */}
          <Typography
            component="div"
            sx={{ fontWeight: "bold", fontSize: "1.4rem"}} 
          >
            {product.title}
          </Typography>

          {/* Description */}
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ fontSize: "1rem", mb: 2 }} 
          >
            {product.description}
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Typography
              variant="body2"
              sx={{ fontWeight: "bold", fontSize: "1.1rem" }} 
            >
              달성률 {achievementRate.toFixed(2)}%
            </Typography>
            <Typography
              variant="body2"
              sx={{ fontWeight: "bold", fontSize: "0.85rem" }} 
            >
              {formattedTargetFunding}원
            </Typography>
          </Box>

          <Box sx={{ width: "100%", height: "auto", display: "block", overflow: "visible" }}>
            <LinearProgress
              variant="determinate"
              value={achievementRate}
              sx={{ height: 10, borderRadius: "5px", mt: 1, mb: 2 }}
            />
          </Box>

          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%",marginTop:"15px" }}>
            <Button
              variant="contained"
              color="secondary"
              size="small"
              sx={{
                backgroundColor: "#5a87f7",
                borderRadius: "12px",
                fontSize: "1rem", 
                width:"130px",
                height:"40px",
              }}
            >
              마감임박 D - {daysLeft}
            </Button>

            <Typography variant="body2" sx={{ fontWeight: "300", fontSize: "0.85rem" }}>
              진행자: {product.nickName}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </>
  );
};
