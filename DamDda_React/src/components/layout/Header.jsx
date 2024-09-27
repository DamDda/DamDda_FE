import * as React from 'react';
import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import TextField from '@mui/material/TextField'; // 검색바를 위해 추가
import { Card, CardMedia, CardContent, Grid } from '@mui/material'; // MUI 컴포넌트 사용
import CloseIcon from '@mui/icons-material/Close'; // 프로젝트 삭제 버튼을 위한 CloseIcon
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png'; // 로고 파일
import { SearchBar } from './SearchBar';

const pages = ['카테고리'];

export function Header({setSearch}) {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [showProfileCard, setShowProfileCard] = useState(false); // 프로필 카드 표시 여부
  const [showProjects, setShowProjects] = useState(false); // 프로젝트 목록 표시 여부
  const [projects, setProjects] = useState([
    { name: '프로젝트 이름 1', id: 1 },
    { name: '프로젝트 이름 2', id: 2 },
  ]);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false); // 로그인 상태 관리


  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = () => {
    setShowProfileCard(!showProfileCard); // 클릭 시 프로필 카드 표시 토글
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav();
  };
  const handleCloseUserMenu = () => {
    setAnchorElNav();
  };

  const handleShowProjects = () => {
    setShowProjects(!showProjects); // 버튼을 누를 때마다 프로젝트 리스트 표시 여부 토글
  };

  const handleDeleteProject = (id) => {
    // 프로젝트 삭제 기능
    setProjects(projects.filter((project) => project.id !== id));
  };

  return (
    <AppBar position="static" sx={{ bgcolor: 'white', color: 'black' }}>
      <Container
        maxWidth='1520px' // maxWidth를 false로 설정하여 100%가 기본값이 되지 않도록 설정
        sx={{
          width: '70%', // 네브바의 너비를 전체의 70%로 설정
          margin: '0 auto', // 네브바를 중앙에 배치
        }}
      >
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            <Link to="/">
              <img className="link" alt="Link" src={logo} style={{ width: '200px', height: '80px' }} />
            </Link>
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              <MenuItem onClick={handleCloseNavMenu}>
                <Typography sx={{ textAlign: 'center', fontWeight: 400 }}>카테고리</Typography>
              </MenuItem>
            </Menu>
          </Box>
         
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, marginLeft: 2, mt: 2, alignItems: 'center' }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{
                  my: 2,
                  color: 'black',
                  display: 'block',
                  fontWeight: '900', // 폰트를 엄청 진하게 설정
                  fontSize: '1.2rem', // 폰트 크기도 키움
                  textTransform: 'none', // 버튼 텍스트의 대문자 자동 변환 방지
                }}
              >
                {page}
              </Button>
            ))}
          </Box>

          {/* 검색 바 */}
          <Box width={300}>          
            <SearchBar setSearch={setSearch}></SearchBar>
          </Box>

          {/* 프로젝트 등록 버튼 및 프로젝트 목록 표시 */}
          <Box sx={{ flexGrow: 0, mr: 2, position: 'relative' }}>
         
          <Button
            variant="contained"
            onClick={handleShowProjects}
            sx={{
              backgroundColor: '#7a82ed',
              color: 'white',
              fontWeight: 'bold',
              borderRadius: '10px',
              padding: '8px 16px',
              boxShadow: 'none',
              '&:hover': {
                backgroundColor: '#33C2E2',
              },
            }}
          >
            프로젝트 등록
          </Button>

      {showProjects && (
        <Box
          sx={{
            marginTop: '10px',
            padding: '10px',
            border: '1px solid #ccc',
            borderRadius: '10px',
            backgroundColor: 'white',
            boxShadow: '0px 4px 12px rgba(0,0,0,0.1)',
            position: 'absolute', // 버튼 아래에 위치시키기 위해 절대 위치 지정
            top: '100%', // 버튼 바로 아래에 위치
            left: '50%', // 수평 중앙 정렬
            transform: 'translateX(-50%)', // 중앙 정렬 보정
            width: '200px', // 원하는 너비로 설정
            zIndex: 1000, // 다른 요소보다 상위에 위치하도록 zIndex를 크게 설정

          }}
        >
      <Typography variant="subtitle1" sx={{ fontWeight: 'bold', marginBottom: '10px' }}>
        +   새로운 프로젝트
      </Typography>
      {projects.map((project) => (
        <Box
          key={project.id}
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '5px',
          }}
        >
          <Typography>{project.name}</Typography>
          <IconButton size="small" onClick={() => handleDeleteProject(project.id)}>
            <CloseIcon sx={{ color: '#f44e38' }} />
          </IconButton>
        </Box>
      ))}
    </Box>
  )}
</Box>


          {/* 프로필 카드 부분 */}
         <Box sx={{ position: 'relative' }}>
            {isLoggedIn ? (
              // 로그인 후 프로필 카드
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
            ) : (
              // 로그인 전에는 로그인 버튼
              <Button
                variant="contained"
                color="primary"
                onClick={() => (window.location.href = '/login')} // 로그인 페이지로 이동
                sx={{
                  backgroundColor: '#7a82ed',
                  color: 'white',
                  fontWeight: 'bold',
                  borderRadius: '10px',
                  padding: '8px 16px',
                  '&:hover': {
                    backgroundColor: '#33C2E2',
                  },
                }}
              >
                로그인
              </Button>
            )}

            {showProfileCard && isLoggedIn && (
              <Box
                sx={{
                  position: 'absolute',
                  top: '100%',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  zIndex: 1000,
                  backgroundColor: 'white',
                  borderRadius: '15px',
                  width: 240,
                  padding: 2,
                }}
              >
                <Card sx={{ width: '100%', borderRadius: '15px', p: 2 }}>
                  <CardMedia
                    component="img"
                    image="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava2-bg.webp"
                    alt="Profile image"
                    sx={{
                      borderRadius: '50%',
                      width: '80px',
                      height: '80px',
                      margin: 'auto',
                      marginTop: 2,
                    }}
                  />
                  <CardContent>
                    <Typography
                      gutterBottom
                      variant="h6"
                      component="div"
                      textAlign="center"
                      sx={{ fontWeight: 'bold' }}
                    >
                      닉네임 님
                    </Typography>
                    <Typography variant="body2" color="text.secondary" textAlign="center" sx={{ fontWeight: 800 }}>
                      ♥ 관심 프로젝트
                    </Typography>
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: 1,
                        mt: 2,
                      }}
                    >
                      <Button
                        variant="outlined"
                        sx={{
                          borderRadius: 20,
                          width: '120px',
                          fontWeight: 'bold',
                        }}
                      >
                        마이페이지
                      </Button>
                      <Button
                        variant="outlined"
                        sx={{
                          borderRadius: 20,
                          width: '100px',
                          fontWeight: 'bold',
                        }}
                      >
                        로그아웃
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Box>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}