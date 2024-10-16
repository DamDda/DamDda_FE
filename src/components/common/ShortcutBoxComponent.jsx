import React from 'react';
import { Box, Typography, Grid, Card } from '@mui/material';
import styles from '../css/ShortcutBoxComponent.module.css'; // CSS 모듈 가져오기

export const ShortcutBoxComponent = ({ services }) => {
  return (
    <Box className={styles.container}>
      <Grid container justifyContent="center" spacing={5} className={styles.gridContainer}>
        {services.map((service, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              className={styles.card}
              style={{ backgroundColor: service.backgroundColor }}
            >
              <Box className={styles.textBox}>
                <Typography variant="subtitle2" className={styles.title}>
                  {service.title}
                </Typography>
                <Typography variant="body1" className={styles.description}>
                  {service.description}
                </Typography>
              </Box>
              <Box className={styles.iconBox}>{service.icon}</Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

