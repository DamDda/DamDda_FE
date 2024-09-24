import React from "react"; 
import Box from '@mui/joy/Box';
import StatusButton from "./StatusButton";
import Typography from '@mui/joy/Typography';

const PaymentDeliveryInfo = ({ project }) => {
  return (
    <Box sx={{ padding: '20px' }}>
      {/* 배송 정보 */}
      <Box sx={{ marginBottom: '20px' }}>
        <Typography variant="h6" sx={{ marginBottom: '10px', fontWeight: 'bold', color:'black', fontSize: '20px' }}>
          배송 정보
        </Typography>
        <Box sx={{ display: 'flex', marginBottom: '5px' }}>
          <Typography sx={{ fontWeight: 'bold', color: 'gray', minWidth: '80px' }}>
            수령인:
          </Typography>
          <Typography sx={{ marginLeft: '50px' }}>
            {project.delivery.name}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', marginBottom: '5px' }}>
          <Typography sx={{ fontWeight: 'bold', color: 'gray', minWidth: '80px' }}>
            휴대폰:
          </Typography>
          <Typography sx={{ marginLeft: '50px' }}>
            {project.delivery.phoneNumber}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', marginBottom: '5px' }}>
          <Typography sx={{ fontWeight: 'bold', color: 'gray', minWidth: '80px' }}>
            주소:
          </Typography>
          <Typography sx={{ marginLeft: '50px' }}>
            {project.delivery.address}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', marginBottom: '5px' }}>
          <Typography sx={{ fontWeight: 'bold', color: 'gray', minWidth: '80px' }}>
            배송 요청 사항:
          </Typography>
          <Typography sx={{ marginLeft: '20px' }}>
            {project.delivery.message}
          </Typography>
        </Box>
      </Box>

      {/* 구분선 */}
      <Box sx={{ borderBottom: '1px solid #e0e0e0', marginBottom: '20px', width:'1000px'  }} />

      {/* 결제 정보 */}
      <Box sx={{ marginBottom: '20px' }}>
        <Typography variant="h6" sx={{ marginBottom: '10px', fontWeight: 'bold', color:'black', fontSize: '20px' }}>
          결제 내역
        </Typography>
        <Box sx={{ display: 'flex', marginBottom: '5px' }}>
          <Typography sx={{ fontWeight: 'bold', color: 'gray', minWidth: '80px' }}>
            결제 방법:
          </Typography>
          <Typography sx={{ marginLeft: '50px' }}>
            {project.payment.paymentMethod}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', marginBottom: '5px' }}>
          <Typography sx={{ fontWeight: 'bold', color: 'gray', minWidth: '80px' }}>
            총 상품 금액:
          </Typography>
          <Typography sx={{ marginLeft: '38px' }}>
            {project.projectPackage.packagePrice.toLocaleString()}원
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', marginBottom: '5px' }}>
          <Typography sx={{ fontWeight: 'bold', color: 'gray', minWidth: '80px' }}>
            결제 상태:
          </Typography>
          <Typography sx={{ marginLeft: '50px' }}>
            {project.payment.paymentStatus}
          </Typography>
        </Box>
      </Box>

      {/* 결제 취소 버튼 */}
      <Box sx={{ textAlign: 'right', position: 'relative', top: '-60px', left: '-180px' }}>
        <StatusButton
          status="결제 취소"
          label="결제 취소"
          sx={{
            backgroundColor: 'white', // 아주 연한 회색 배경색
            color: 'red',
            
            fontSize: '12px', // 폰트 크기 줄이기
            width: '90px', // 버튼 너비 줄이기
            height: '30px', // 버튼 높이 줄이기
          }}
        />
      </Box>
    </Box>
  );
};

export default PaymentDeliveryInfo;
