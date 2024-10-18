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
            title: '협업하기',
            description: '진행자와 함께 협업하고 성공적인 프로젝트를 만들어보세요.',
            icon: <img src={Image1} alt="Icon 1" className={styles.icon} />,
            route: 'mypage',
        },
        {
            title: '프로젝트 등록하기',
            description: '새로운 프로젝트를 등록하고 펀딩을 시작하세요.',
            icon: <img src={Image2} alt="Icon 2" className={styles.icon} />,
            route: 'register',
        },
        {
            title: '인기 프로젝트 가기',
            description: '가장 인기 있는 프로젝트에 참여하고 후원하세요.',
            icon: <img src={Image3} alt="Icon 3" className={styles.icon} />,
            route: 'entire',
        },
    ];

    return (
        <Box className={styles.container}>
            <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2, mt: 3 }}>
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
