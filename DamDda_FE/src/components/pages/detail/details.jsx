import React, { useEffect, useState } from "react";
import { Typography, Card, CardContent, Button, IconButton, Divider, MenuItem, Select } from "@mui/material";
import { styled } from "@mui/system";
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const Container = styled("div")({
  padding: "20px",
  backgroundColor: "#f0f0f0",
  display: "flex",
});

const DetailSection = styled("div")({
  display: "flex",
  flexDirection: "column",
  marginBottom: "20px",
  flex: 2,
});

const PackageSection = styled("div")({
  display: "flex",
  flexDirection: "column",
  marginLeft: "20px",
  flex: 1,
});

const PackageCard = styled(Card)({
  backgroundColor: "#f9f9f9",
  marginBottom: "10px",
  width: "300px",
  cursor: "pointer",
});

const SelectedCard = styled(Card)({
  marginBottom: "10px",
  padding: "10px",
  backgroundColor: "#ffffff",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  borderRadius: "8px",
});

const CartSection = styled("div")({
  padding: "10px",
  backgroundColor: "#fff",
  borderRadius: "8px",
  marginBottom: "20px",
});

const ProjectDetail = () => {
  const [rewardOption, setRewardOption] = useState([]);
  const [selectedPackages, setSelectedPackages] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const packageData = [
        { id: 1, name: "선물 1", description: "설명 1", price: 5000, options: ['옵션 1', '옵션 2'], stock: 10 },
        { id: 2, name: "선물 2", description: "설명 2", price: 59000, stock: 100 },
      ];
      setRewardOption(packageData);
    };

    fetchData();
  }, []);

  const handleSelectPackage = (pkg) => {
    const exists = selectedPackages.find((p) => p.id === pkg.id);
    if (!exists) {
      setSelectedPackages([...selectedPackages, { ...pkg, count: 1, selectedOption: '' }]);
    }
  };

  const handleRemovePackage = (pkgId) => {
    setSelectedPackages(selectedPackages.filter((pkg) => pkg.id !== pkgId));
  };

  const handleChangeCount = (pkgId, delta) => {
    setSelectedPackages(
      selectedPackages.map((pkg) =>
        pkg.id === pkgId
          ? { ...pkg, count: Math.max(1, pkg.count + delta) }
          : pkg
      )
    );
  };

  const handleSelectOption = (pkgId, option) => {
    setSelectedPackages(
      selectedPackages.map((pkg) =>
        pkg.id === pkgId ? { ...pkg, selectedOption: option } : pkg
      )
    );
  };

  useEffect(() => {
    const total = selectedPackages.reduce((sum, pkg) => sum + pkg.price * pkg.count, 0);
    setTotalAmount(total);
  }, [selectedPackages]);

  return (
    <Container>
      {/* 상세 설명 섹션 */}
      <DetailSection>
        <Typography variant="h5" style={{ marginBottom: "10px" }}>상세 설명</Typography>
        <Typography variant="body1" style={{ marginTop: "10px" }}>상세 설명 내용</Typography>
      </DetailSection>

      <Divider orientation="vertical" flexItem />

      {/* 선물 구성 섹션 */}
      <PackageSection>
        <Typography variant="h5" style={{ marginBottom: "10px" }}>선물 구성 선택</Typography>
        {rewardOption.map((pkg) => (
          <PackageCard key={pkg.id} onClick={() => handleSelectPackage(pkg)}>
            <CardContent>
              <Typography variant="h6">{pkg.name}</Typography>
              <Typography variant="body2">{pkg.description}</Typography>
              <Typography variant="body1">{pkg.price.toLocaleString()}원</Typography>
            </CardContent>
          </PackageCard>
        ))}

        {/* 선택된 카드 목록 */}
        {selectedPackages.length > 0 && (
          <CartSection>
            <Typography variant="h6">선택한 선물</Typography>
            {selectedPackages.map((pkg) => (
              <SelectedCard key={pkg.id}>
                <div>
                  <Typography variant="h6">{pkg.name}</Typography>
                  <Typography variant="body2">
                    {pkg.price.toLocaleString()}원 × {pkg.count}개
                  </Typography>
                  {pkg.options && (
                    <Select
                      value={pkg.selectedOption}
                      onChange={(e) => handleSelectOption(pkg.id, e.target.value)}
                      displayEmpty
                      style={{ marginTop: "10px" }}
                    >
                      <MenuItem value="" disabled>옵션 선택</MenuItem>
                      {pkg.options.map((option, index) => (
                        <MenuItem key={index} value={option}>{option}</MenuItem>
                      ))}
                    </Select>
                  )}
                </div>
                <div>
                  <IconButton
                    onClick={() => handleChangeCount(pkg.id, -1)}
                    disabled={pkg.count === 1}
                    style={{ color: pkg.count === 1 ? "grey" : "black" }}
                  >
                    <RemoveIcon />
                  </IconButton>
                  <IconButton onClick={() => handleChangeCount(pkg.id, 1)}>
                    <AddIcon />
                  </IconButton>
                  <IconButton onClick={() => handleRemovePackage(pkg.id)}>
                    <DeleteIcon />
                  </IconButton>
                </div>
              </SelectedCard>
            ))}
            <Typography variant="h6">총 {totalAmount.toLocaleString()}원</Typography>
            <Button variant="contained" color="primary" fullWidth>
              프로젝트 후원하기
            </Button>
          </CartSection>
        )}
      </PackageSection>
    </Container>
  );
};

export default ProjectDetail;
