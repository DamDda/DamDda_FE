import React, { useState } from "react";
import { Card, CardContent, Typography, Button, Box, Grid } from "@mui/material";
import CheckIcon from "@mui/icons-material/CheckCircle";
import { DropdownComponent } from 'components/common/DropdownComponent';
import { BlueButtonComponent } from "../ButtonComponent";

export const PackageCard = ({ packageDTO, selectedCount, handleOrder }) => {



// useState로 초기값 설정
const [selectOptions, setSelectOptions] = useState(
  packageDTO?.RewardDTO?.map((reward) => ({
    rewardName: reward.name,
    selectOption: reward.option ? reward.option[0] : null,
  })) || [] // 만약 RewardDTO가 undefined일 경우 빈 배열 반환
);

const handleSelectOptions = (index, e) => {
  const newSelectOptions = [...selectOptions]; 
  newSelectOptions[index].selectOption = e.target.value; // 선택된 옵션 업데이트
  setSelectOptions(newSelectOptions); // 새로운 배열로 상태 업데이트
}

    return (
      <Card
        sx={{
          mb: 2,
          borderRadius: 2,
          borderColor: selectedCount > 0 ? "#FF4081" : "#E0E0E0",
          borderWidth: 2,
          margin: "20px",
          width: "480px",
        }}
      >
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={10}>
              <Box>
                {selectedCount > 0 && (
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      color: "#FF4081",
                    }}
                  >
                    <CheckIcon sx={{ mr: 1 }} />
                    <Typography variant="body2">
                      {selectedCount}개 선택
                    </Typography>
                  </Box>
                )}

                <Typography variant="h5" sx={{ fontWeight: "bold", mt: 1 }}>
                  {packageDTO.price}원 +
                </Typography>

                <Typography variant="body2" sx={{ mb: 1 }}>
                  {packageDTO.name}
                </Typography>

                <Typography variant="body2" color="text.secondary">
                  {packageDTO.RewardDTO &&
                    packageDTO.RewardDTO.map((reward, index) => (
                      <div key={reward.id}>
                        <div style={{ width: "100px" }}>
                          {reward.name} --- {reward.count}개
                        </div>

                        {Array.isArray(reward.option) &&
                          reward.option.length > 0 && (
                            <DropdownComponent
                              inputLabel={packageDTO.name + "의 옵션"}
                              menuItems={reward.option}
                              selectValue={selectOptions[index].selectOption} // 기본 선택값
                              onChange={(e) => handleSelectOptions(index, e) }
                            />
                          )}
                      </div>
                    ))}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={2} sx={{ textAlign: "right" }}>
              <Button
                size="small"
                variant="outlined"
                color={packageDTO.quantityLimited === 0 ? "error" : "primary"}
                disabled={packageDTO.quantityLimited === 0}
              >
                {packageDTO.quantityLimited === 0
                  ? "품절"
                  : `${packageDTO.quantityLimited}개 남음`}
              </Button>
            </Grid>
          </Grid>
          <Box display="flex" justifyContent="flex-end">
            <BlueButtonComponent text={"구매하기"} onClick={() => handleOrder(packageDTO.name, selectOptions)} />
          </Box>
        </CardContent>
      </Card>
    );
};
