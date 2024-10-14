import React from "react";
import { Card, CardContent, Typography, Button, Box, Grid } from "@mui/material";
import CheckIcon from "@mui/icons-material/CheckCircle";

export const RewardCard = ({ amount, title, description, selectedCount, remainingCount }) => {
  return (
    <Card sx={{ mb: 2, borderRadius: 2, borderColor: selectedCount > 0 ? "#FF4081" : "#E0E0E0", borderWidth: 2 }}>
      <CardContent>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={10}>
            <Box>
              {selectedCount > 0 && (
                <Box sx={{ display: "flex", alignItems: "center", color: "#FF4081" }}>
                  <CheckIcon sx={{ mr: 1 }} />
                  <Typography variant="body2">{selectedCount}개 선택</Typography>
                </Box>
              )}
              <Typography variant="h5" sx={{ fontWeight: "bold", mt: 1 }}>
                {amount.toLocaleString()}원 +
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                {title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {description}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={2} sx={{ textAlign: "right" }}>
            <Button
              size="small"
              variant="outlined"
              color={remainingCount === 0 ? "error" : "primary"}
              disabled={remainingCount === 0}
            >
              {remainingCount === 0 ? "품절" : `${remainingCount}개 남음`}
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};