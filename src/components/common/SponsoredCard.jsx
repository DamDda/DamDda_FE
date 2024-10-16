import React, { useState } from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import { StatusButton } from "./ButtonComponent"; // named export로 가져오기
import { PaymentInfoCard } from "../common/PaymentInfoCard";
import Typography from "@mui/joy/Typography";
import Box from "@mui/joy/Box";
import styles from "../css/SponsoredCard.module.css";

export const SponsoredCard = ({ project }) => {
  const [showDetails, setShowDetails] = useState(false);
  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <>
      <Card className={styles["project-card"]} variant="outlined">
        <Box className={styles["thumbnail-box"]}>
          <AspectRatio ratio="1" className={styles["thumbnail-box"]}>
            <img
              // src={project.supportingProject.project.thumbnailUrl}
              alt="프로젝트 썸네일"
              style={{ objectFit: "cover", borderRadius: "8px" }}
            />
          </AspectRatio>
        </Box>

        <CardContent className={styles["card-content"]}>
          <Typography variant="h5" className={styles["typography-h5"]}>
            [{project.supportingProject.project.title}]
          </Typography>
          <Typography variant="body2" className={styles["typography-body2"]}>
            선물 구성: {project.supportingPackage.packageName}
          </Typography>
          <Typography variant="body2" className={styles["typography-body2"]}>
            후원 금액: {parseInt(project.supportingPackage.packagePrice).toLocaleString()}원
          </Typography>
        </CardContent>

        <Box className={styles["right-info"]}>
          <Box className={styles["right-info-text"]}>
            <Typography variant="body2" className={styles["right-info-typography"]}>
              후원번호: {project.delivery.deliveryId}
            </Typography>
            <Typography variant="body2" className={styles["right-info-typography"]}>
              결제 날짜: {new Date(project.supportingProject.supportedAt).toLocaleString()}
            </Typography>
          </Box>

          <Box className={styles["buttons-box"]}>
            <StatusButton
              status={project.status}
              label={project.status === "진행중" ? "진행중" : "마감"}
            />
            <StatusButton
              status="결제/배송 정보"
              label="결제/배송 정보"
              onClick={toggleDetails} 
            />
          </Box>
        </Box>
      </Card>

      {showDetails && (
        <div className={styles.dropdownContent}> 
          <PaymentInfoCard project={project} />
        </div>
      )}
    </>
  );
};
