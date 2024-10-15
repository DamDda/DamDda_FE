import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Link, useNavigate } from "react-router-dom";
import logo from "assets/logo.png";

import { BlueButtonComponent } from "components/common/ButtonComponent";
import { BlueBorderButtonComponent } from "components/common/ButtonComponent";

import { SearchBoxComponent } from "components/common/SearchBoxComponent";
import { ProfileMenu } from "components/main/ProfileMenu";
import { ProjectList } from "components/main/ProjectList";
import { useUser } from "../../UserContext";

export function Header({ search, setSearch }) {
  const [showProjects, setShowProjects] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  // const { isLogin, user, logout } = useUser()
  const navigate = useNavigate();

  const handleShowProjects = () => {
    setShowProjects(!showProjects);
    setProfileOpen(false);
  };

  const handleProfileMenuOpen = () => {
    setProfileOpen(!profileOpen);
    setShowProjects(false);
  };

  return (
    <AppBar position="static" sx={{ bgcolor: "white", color: "black" }}>
      <Container maxWidth="1520px" sx={{ width: "70%", margin: "0 auto" }}>
        <Toolbar
          disableGutter
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <Link to="/">
            <img
              src={logo}
              alt="logo"
              style={{ width: "200px", height: "80px" }}
            />
          </Link>
          <Box
            sx={{
              width: {
                xs: "200px",
                sm: "250px",
                md: "350px",
                lg: "500px",
              },
            }}
          >
            <SearchBoxComponent search={search} setSearch={setSearch} />
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <BlueButtonComponent
              text="프로젝트 등록"
              onClick={handleShowProjects}
              style={{
                padding: "16px 32px", // 버튼 크기 조정
                fontSize: "1.2rem", // 글자 크기 조정
              }}
            />
            <BlueBorderButtonComponent
              style={{
                padding: "16px 32px",
                fontSize: "1.2rem",
              }}
              onClick={() => navigate("/login")}
            >
              로그인
            </BlueBorderButtonComponent>

            {/* <ProfileMenu
                            isOpen={profileOpen}
                            handleProfileMenuOpen={handleProfileMenuOpen}
                        /> */}
          </Box>
        </Toolbar>
      </Container>
      {showProjects && <ProjectList />}
    </AppBar>
  );
}

export default Header;
