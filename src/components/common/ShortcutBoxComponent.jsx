import React from 'react';
import { Box, Typography, Grid, Card } from '@mui/material';
import styles from '../css/ShortcutBoxComponent.module.css'; // CSS 모듈 가져오기
import Image1 from '../../assets/Food-basket-with-groceries.png'; // 임의 이미지 경로
import Image2 from '../../assets/Food-basket-with-groceries.png'; // 임의 이미지 경로
import Image3 from '../../assets/Food-basket-with-groceries.png'; // 임의 이미지 경로
import { useNavigate } from 'react-router-dom';




export const ShortcutBoxComponent = () => {
  const navigate = useNavigate();

  const services = [
    {
      title: '국내 첫 은행 및 증권사 참여',
      description: '국내 최초로 금융기관과 협력한 신뢰의 파트너',
      icon: <img src={Image1} alt="Icon 1" className={styles.icon} />,
      route: '/bank-participation',
    },
    {
      title: '업계 최초 서비스 실시 (SINCE 1995)',
      description: '선구자적 서비스로 새로운 금융의 지평을 열다',
      icon: <img src={Image2} alt="Icon 2" className={styles.icon} />,
      route: '/first-service',
    },
    {
      title: '거래 건수 / 금액(연간) 10억건+ 110조원+',
      description: '압도적인 거래 규모와 신뢰를 바탕으로 한 서비스',
      icon: <img src={Image3} alt="Icon 3" className={styles.icon} />,
      route: '/transaction-info',
    },
  ];

  return (
    <Box className={styles.container}>
      <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 ,mt: 5 }}>
        신뢰와 안정의 금융결제원 CMS
      </Typography>
      <Typography variant="body1" sx={{ mb: 4 }}>
        30년간의 운영으로 쌓아온 안정적인 지급관리 솔루션을 경험해보세요.
      </Typography>

      <Grid container className={styles.gridContainer}>
        {services.map((service, index) => (
          <Grid item key={index}>
            <Card
              className={styles.card}
              onClick={() => navigate(service.route)} // 클릭 시 경로 이동
            >
              <Box className={styles.iconBox}>{service.icon}</Box>
              <Box className={styles.textBox}>
                <Typography variant="h6" className={styles.title}>
                  {service.title}
                </Typography>
                <Typography variant="body2" className={styles.description}>
                  {service.description}
                </Typography>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
