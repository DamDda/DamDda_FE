import React, { useEffect, useState } from "react";
import {
  Typography,
  Card,
  CardContent,
  Button,
  IconButton,
  Divider,
  MenuItem,
  Select,
  Checkbox,
} from "@mui/material";
import { styled } from "@mui/system";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

import '../../styles/style.css'
import { Header } from "../../layout/Header";
import { Footer } from "../../layout/Footer";
const Container = styled("div")({
  padding: "20px",
  backgroundColor: "#f0f0f0",
  display: "flex",
});

// 왼쪽섹션
const DetailSection = styled("div")({
  display: "flex",
  flexDirection: "column",
  marginBottom: "20px",
  flex: 2,
});

// 오른쪽세션
const PackageSection = styled("div")({
  display: "flex",
  flexDirection: "column",
  marginLeft: "20px",
  flex: 1,
});

// 카드(선물구성)
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

const ImageContainer = styled("img")({
  width: "750px",
  height: "auto",
});

const CountButton = styled(IconButton)({
  padding: "2px", // 버튼 크기 축소
  margin: "0 5px", // 숫자 사이 여백 설정
});

const ProjectDetail2 = () => {
  const [rewardOption, setRewardOption] = useState([]);
  const [selectedPackages, setSelectedPackages] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [selectedPackage, setSelectedPackage] = useState(null); // 선택한 카드
  const [selectedOptions, setSelectedOptions] = useState({}); // 각 카드의 옵션 선택
  const [detailedDescription, setDetailedDescription] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      // Mock 데이터
      const packageData = [
        {
          id: 1,
          name: "선물 1",
          description: "설명 1",
          price: 5000,
          options: ["옵션 1", "옵션 2"],
          stock: 10,
        },
        {
          id: 2,
          name: "선물 2",
          description: "설명 2",
          price: 59000,
          stock: 100,
        },
      ];

      const details = [
        {
          id: 1,
          text: "상세 설명 내용",
          image: "https://via.placeholder.com/800",
        },
      ];

      setRewardOption(packageData);
      setDetailedDescription(details);
    };

    fetchData();
  }, []);

  const handleCardClick = (pkg) => {
    setSelectedPackage(pkg);
  };

  const handleSelectPackage = () => {
    if (selectedPackage) {
      const exists = selectedPackages.find((p) => p.id === selectedPackage.id);
      if (!exists) {
        setSelectedPackages([
          ...selectedPackages,
          {
            ...selectedPackage,
            count: 1,
            selectedOption: selectedOptions[selectedPackage.id] || [],
          },
        ]);
      }
      setSelectedPackage(null);
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
    setSelectedOptions((prevOptions) => {
      const currentOptions = prevOptions[pkgId] || [];
      if (currentOptions.includes(option)) {
        return {
          ...prevOptions,
          [pkgId]: currentOptions.filter((opt) => opt !== option),
        };
      } else {
        return { ...prevOptions, [pkgId]: [...currentOptions, option] };
      }
    });
  };

  useEffect(() => {
    const total = selectedPackages.reduce(
      (sum, pkg) => sum + pkg.price * pkg.count,
      0
    );
    setTotalAmount(total);
  }, [selectedPackages]);

  return (
    <>
    <Header />
     	 <div className="container">

    <Container>
      {/* 상세 설명 섹션 */}
      <DetailSection>
        <Typography variant="h5" style={{ marginBottom: "10px" }}>
          상세 설명
        </Typography>
        {detailedDescription.map((detail) => (
          <div key={detail.id} style={{ marginBottom: "20px" }}>
            <Typography variant="body1" style={{ marginTop: "10px" }}>
              {detail.text}
            </Typography>
            <ImageContainer
              src={detail.image}
              alt={`Detail Image ${detail.id}`}
            />
          </div>
        ))}
      </DetailSection>

      <Divider orientation="vertical" flexItem />

      {/* 선물 구성 섹션 */}
      <PackageSection>
        <Typography variant="h5" style={{ marginBottom: "10px" }}>
          선물 구성 선택
        </Typography>
        {rewardOption.map((pkg) => (
          <PackageCard key={pkg.id} onClick={() => handleCardClick(pkg)}>
            <CardContent>
              <Typography variant="h6">{pkg.name}</Typography>
              <Typography variant="body2">{pkg.description}</Typography>
              <Typography variant="body1">
                {pkg.price.toLocaleString()}원
              </Typography>
            </CardContent>
            {/* 옵션 드롭다운 */}
            {selectedPackage?.id === pkg.id && pkg.options && (
              <div>
                {pkg.options.map((option) => (
                  <div key={option}>
                    <Checkbox
                      checked={selectedOptions[pkg.id]?.includes(option) || false}
                      onChange={() => handleSelectOption(pkg.id, option)}
                    />
                    <Typography variant="body2">{option}</Typography>
                  </div>
                ))}
                <Button variant="contained" onClick={handleSelectPackage}>
                  이 선물 구성 선택하기
                </Button>
              </div>
            )}
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
                  {pkg.selectedOption && (
                    <Typography variant="body2">
                      옵션: {pkg.selectedOption.join(", ")}
                    </Typography>
                  )}
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <CountButton
                    onClick={() => handleChangeCount(pkg.id, -1)}
                    disabled={pkg.count === 1}
                    style={{ color: pkg.count === 1 ? "grey" : "black" }}
                  >
                    <RemoveIcon />
                  </CountButton>
                  <Typography>{pkg.count}</Typography>
                  <CountButton onClick={() => handleChangeCount(pkg.id, 1)}>
                    <AddIcon />
                  </CountButton>
                  <IconButton onClick={() => handleRemovePackage(pkg.id)}>
                    <DeleteIcon />
                  </IconButton>
                </div>
              </SelectedCard>
            ))}
            <Typography variant="h6">
              총 {totalAmount.toLocaleString()}원
            </Typography>
            <Button variant="contained" color="primary" fullWidth>
              프로젝트 후원하기
            </Button>
          </CartSection>
        )}
      </PackageSection>
    </Container>
    </div>
    <Footer />
    </>

  );
};

export default ProjectDetail2;
