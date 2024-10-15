import React, { useState } from "react"; // React
import { Typography, Box } from "@mui/material";
import { PackageCard } from "components/common/Gift/PackageCard";

export const GiftCompositionComponent = ({ rewardData }) => {

  // 더미 데이터
  const packageData = [
    {
      id: 1,
      name: "패키지 A",
      price: 20000,
      quantityLimited: 5,
      salesQuantity: 10, // 판매 수량 추가
      RewardDTO: [
        {
          id: 1,
          name: "보상 A1",
          count: 2,
          option: ["옵션 1", "옵션 2"],
        },
        {
          id: 2,
          name: "보상 A2",
          count: 1,
          option: ["옵션 A", "옵션 B"],
        },
      ],
    },
    {
      id: 2,
      name: "패키지 B",
      price: 30000,
      quantityLimited: 0, // 품절
      salesQuantity: 5, // 판매 수량 추가
      RewardDTO: [
        {
          id: 1,
          name: "보상 B1",
          count: 3,
          option: ["옵션 X", "옵션 Y"],
        },
        {
          id: 2,
          name: "보상 B2",
          count: 2,
          option: null, // 옵션 없음
        },
      ],
    },
    {
      id: 3,
      name: "패키지 C",
      price: 15000,
      quantityLimited: 10,
      salesQuantity: 7, // 판매 수량 추가
      RewardDTO: [
        {
          id: 1,
          name: "보상 C1",
          count: 1,
          option: ["옵션 A", "옵션 B", "옵션 C"],
        },
      ],
    },
    {
      id: 4,
      name: "패키지 D",
      price: 25000,
      quantityLimited: 2,
      salesQuantity: 3, // 판매 수량 추가
      RewardDTO: [
        {
          id: 1,
          name: "보상 D1",
          count: 1,
          option: ["옵션 1"],
        },
        {
          id: 2,
          name: "보상 D2",
          count: 2,
          option: ["옵션 1", "옵션 2", "옵션 3"],
        },
      ],
    },
    {
      id: 5,
      name: "패키지 E",
      price: 50000,
      quantityLimited: 7,
      salesQuantity: 12, // 판매 수량 추가
      RewardDTO: [
        {
          id: 1,
          name: "보상 E1",
          count: 5,
          option: ["옵션 A", "옵션 B"],
        },
      ],
    },
    {
      id: 6,
      name: "패키지 F",
      price: 45000,
      quantityLimited: 0, // 품절
      salesQuantity: 8, // 판매 수량 추가
      RewardDTO: [
        {
          id: 1,
          name: "보상 F1",
          count: 3,
          option: ["옵션 X", "옵션 Y", "옵션 Z"],
        },
      ],
    },
  ];

  // useState로 초기값 설정
const [selectPackages, setSelectPackages] = useState([]);
const handleOrder = (packageName, selectOption) => {
  setSelectPackages((prevSelectPackages) => [
    ...prevSelectPackages, 
    { packageName: packageName, selectOption: selectOption, selectedCount: 1 }
  ]);
};

  const findSelectCount = (packageName) => {
    let count = 0; // 'let'으로 변경하여 재할당 가능하게 설정
    selectPackages?.forEach((selectPackage) => { // forEach를 사용하여 각 요소에 대해 처리
      if (selectPackage.packageName === packageName) {
        count += selectPackage.selectedCount; // 선택된 수량을 합산
      }
    });
    return count; // 최종 count 반환
  };


  const handleOption = (packageId, rewardId, option) => {
    console.log(
      `Package ID: ${packageId}, Reward ID: ${rewardId}, Option: ${option}`
    );
    // 추가 로직을 구현할 수 있습니다.
  };

  return (
    <div>
      {packageData.map((packageDTO) => (
        <PackageCard
          key={packageDTO.id}
          packageDTO={packageDTO}
          selectedCount={findSelectCount(packageDTO.name)}
          handleOrder={handleOrder}
        />
      ))}
    </div>
  );
};
