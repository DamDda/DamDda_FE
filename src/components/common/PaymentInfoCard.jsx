import React, { useState } from "react";
import Box from "@mui/joy/Box";
import { StatusButton } from "./ButtonComponent";
import Typography from "@mui/joy/Typography";
import styles from "../css/PaymentInfoCard.module.css"; // Import CSS module

export const PaymentInfoCard = ({ project }) => {
  // Optional chaining으로 안전하게 paymentStatus 접근
  const [paymentStatus, setPaymentStatus] = useState(project?.supportingProject?.payment?.paymentStatus || ""); // 결제 상태 상태 추가

  // 결제 취소 로직
  const handleCancelPayment = async () => {
    const supportingProject = project?.supportingProject;
    alert("supportingProject ID: " + supportingProject?.payment?.paymentId); 

    const updatedPaymentStatus = {
      supportingProject: supportingProject, 
      paymentStatus: "결제 취소", 
    };
  };

  return (
    <Box className={styles.container}>
      <Box className={styles.deliveryInfo}>
        <Typography variant="h6" className={styles.title}>
          배송 정보
        </Typography>
        <Box className={styles.infoRow}>
          <Typography className={styles.label}>수령인:</Typography>
          <Typography>{project?.supportingProject?.user?.name}</Typography>
        </Box>
        <Box className={styles.infoRow}>
          <Typography className={styles.label}>휴대폰:</Typography>
          <Typography>{project?.supportingProject?.user?.phoneNumber}</Typography>
        </Box>
        <Box className={styles.infoRow}>
          <Typography className={styles.label}>주소:</Typography>
          <Typography>
            {project?.supportingProject?.delivery?.deliveryAddress} ({project?.supportingProject?.delivery?.deliveryDetailedAddress})
          </Typography>
        </Box>
        <Box className={styles.infoRow}>
          <Typography className={styles.label}>배송 요청 사항:</Typography>
          <Typography>{project?.supportingProject?.delivery?.deliveryMessage}</Typography>
        </Box>
      </Box>

      <Box className={styles.separator} />

      <Box className={styles.paymentInfo}>
        <Typography variant="h6" className={styles.title}>
          결제 내역
        </Typography>
        <Box className={styles.infoRow}>
          <Typography className={styles.label}>결제 방법:</Typography>
          <Typography>{project?.supportingProject?.payment?.paymentMethod}</Typography>
        </Box>
        <Box className={styles.infoRow}>
          <Typography className={styles.label}>총 상품 금액:</Typography>
          <Typography>{project?.supportingPackage?.packagePrice}</Typography>
        </Box>
        <Box className={styles.infoRow}>
          <Typography className={styles.label}>결제 상태:</Typography>
          <Typography>{paymentStatus}</Typography>
        </Box>
      </Box>

      <Box className={styles.cancelButtonBox}>
        <StatusButton
          status="결제 취소"
          label="결제 취소"
          onClick={handleCancelPayment} 
          className={styles.cancelButton}
        />
      </Box>
    </Box>
  );
};

