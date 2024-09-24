import React from "react";
import { Link } from "react-router-dom";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

export default function TabsUnderlinePlacement() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
      <Box sx={{ borderBottom: "none", paddingRight: "300px" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="Tabs with underline"
          textColor="primary"
          TabIndicatorProps={{
            style: {
              backgroundColor: "blue", // 선택된 탭에 파란색 밑줄
            },
          }}
        >
          <Tab
            label="Tab 1. 프로필"
            sx={{
              minWidth: "150px",
              borderBottom: value === 0 ? "2px solid blue" : "none",
            }}
            component={Link}
            to="/profile"
          />
          <Tab
            label="Tab 2. 후원한 프로젝트"
            sx={{
              minWidth: "150px",
              borderBottom: value === 1 ? "2px solid blue" : "none",
            }}
            component={Link}
            to="/supportedProjects"
          />
          <Tab
            label="Tab 3. 나의 프로젝트"
            sx={{
              minWidth: "150px",
              borderBottom: value === 2 ? "2px solid blue" : "none",
            }}
            component={Link}
            to="/myproject"
          />
          <Tab
            label="Tab 4. 관심 프로젝트"
            sx={{
              minWidth: "150px",
              borderBottom: value === 3 ? "2px solid blue" : "none",
            }}
            component={Link}
            to="/favoriteProjects"
          />
          <Tab
            label="Tab 5. 협업하기"
            sx={{
              minWidth: "150px",
              borderBottom: value === 4 ? "2px solid blue" : "none",
            }}
          />
          <Tab
            label="Tab 6. 탈퇴하기"
            sx={{
              minWidth: "150px",
              borderBottom: value === 5 ? "2px solid blue" : "none",
            }}
          />
        </Tabs>
      </Box>
    </Box>
  );
}
