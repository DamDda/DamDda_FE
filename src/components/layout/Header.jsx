import * as React from "react";
import { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import TextField from "@mui/material/TextField"; // 검색바를 위해 추가
import { Card, CardMedia, CardContent, Grid } from "@mui/material"; // MUI 컴포넌트 사용
import CloseIcon from "@mui/icons-material/Close"; // 프로젝트 삭제 버튼을 위한 CloseIcon
import EditIcon from "@mui/icons-material/Edit";
import { Link, useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/logo.png"; // 로고 파일
import { SearchBar } from "./SearchBar";
import axios from "axios"; // axios를 사용하여 REST API 호출
import { useUser } from "../../UserContext";
import Cookies from "js-cookie";
import { SERVER_URL } from "../../constants/URLs";

export function Header({ search, setSearch }) {

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [showProfileCard, setShowProfileCard] = useState(false); // 프로필 카드 표시 여부
  const [showProjects, setShowProjects] = useState(false); // 프로젝트 목록 표시 여부
  const [projects, setProjects] = useState([]);
  const location = useLocation();
  const [profile, setProfile] = useState("");

  //const { logout, user } = useUser();
  const {logout, isLogin, user, setUser} = useUser();
  // if(!isLogin){
  //   console.log(user);
  //   // setUser({ ...user, key: 0 });
  // }
  console.log("여기역이겨이겨익여깅겨ㅣㅇ겨이겨"+user.key+"111 "+isLogin);

  // useEffect(() => {
  //   if (location.state?.id) {
  //     setIsLoggedIn(true);
  //   }
  // }, [location.state?.id]);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = () => {
    setShowProfileCard(!showProfileCard); // 클릭 시 프로필 카드 표시 토글
    if (!showProfileCard) {
      setShowProjects(false); // 프로젝트 등록 토글을 닫음
    }
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav();
  };
  const handleCloseUserMenu = () => {
    setAnchorElNav();
  };

  const fetchWritingProject = async () => {
    const writings = await axios({
      method: "GET",
      url: `${SERVER_URL}/api/projects/write`,
      params: {
        // memberId: user.key,
      },
      headers: {
        ...(Cookies.get("accessToken")&& { "x-damdda-authorization": `Bearer ${Cookies.get("accessToken")}` }),
      },
      

    })
      .then((response) => {
        setProjects(response.data);
      })
      .catch((e) => console.error(e));
    return writings;
  };

  useEffect(() => {
    // fetchWritingProject();
  }, []);

  const handleShowProjects = () => {
    setShowProjects(!showProjects); // 버튼을 누를 때마다 프로젝트 리스트 표시 여부 토글
    if (!showProjects) {
      setShowProfileCard(false); // 프로필 카드를 닫음
    }
  };

  const handleDeleteProject = async (id) => {
    console.log(id);
    // 프로젝트 삭제 기능
    if (
      window.confirm(
        `작성중인 프로젝트를 정말 삭제하시겠습니까?\n프로젝트 이름 : "${projects.filter((p) => p.id === id)[0].title}"`
      )
    ) {
      const responseCode = await axios({
        method: "DELETE",
        url: ` ${SERVER_URL}/api/projects/${id}`,
        headers: {
          ...(Cookies.get("accessToken")&& { "x-damdda-authorization": `Bearer ${Cookies.get("accessToken")}` }),
        },
      })
        .then((response) => response.status)
        .catch((e) => console.error(e));
      console.log(responseCode);
      if (responseCode === 200) {
        setProjects(projects.filter((project) => project.id !== id));
        window.location.reload();
      }
    }
  };

  const navigate = useNavigate(); //새로운 프로젝트 눌렀을 때 이동하는 네비게이트
  const navigateModifier = (id) => navigate(`/register?projectId=${id}`);

  const navigateRegister = async () => {
    const formData = new FormData();
    formData.append(
      "projectDetailDTO",
      new Blob(
        [
          JSON.stringify({
            title: "작성중인 프로젝트",
            description: null,
            descriptionDetail: null,
            fundsReceive: null,
            targetFunding: null,
            nickName: null,
            startDate: null,
            endDate: null,
            supporterCnt: null,
            likeCnt: null,
            category: null,
            tags: [],
          }),
        ],
        { type: "application/json" }
      )
    );
    const projectId = await axios({
      method: "POST",
      url: ` ${SERVER_URL}/api/projects/register`,
      headers: {
        "Content-Type": "multipart/form-data",
        ...(Cookies.get("accessToken")&& { "x-damdda-authorization": `Bearer ${Cookies.get("accessToken")}` }),
      },
      data: formData,
      params: {
        // memberId: user.key,
        submit: "저장",
      },
    })
      .then((response) => response.data)
      .catch((e) => console.error(e));

    navigate(`/register?projectId=${projectId}`);
  };

  //프로필
  const UserAvatar = ({ profile, defaultImageUrl, ...props }) => {
    return <Avatar src={profile.imageUrl || defaultImageUrl} {...props} />;
  };
  return (
    <AppBar position="static" sx={{ bgcolor: "white", color: "black" }}>
      <Container
        maxWidth="1520px" // maxWidth를 false로 설정하여 100%가 기본값이 되지 않도록 설정
        sx={{
          width: "70%", // 네브바의 너비를 전체의 70%로 설정
          margin: "0 auto", // 네브바를 중앙에 배치
        }}
      >
        <Toolbar
          disableGutter
          sx={{
            display: "flex",
            justifyContent: "space-between",
            margin: "0px auto",
          }}
        >
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <Link to="/">
              <img
                className="link"
                alt="Link"
                src={logo}
                style={{ width: "200px", height: "80px" }}
              />
            </Link>
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              <MenuItem onClick={handleCloseNavMenu}>
                <Typography sx={{ textAlign: "center", fontWeight: 400 }}>
                  카테고리
                </Typography>
              </MenuItem>
            </Menu>
          </Box>

          {/* <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, marginLeft: 2, mt: 2, alignItems: 'center' }}>
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
          </Box> */}

          {/* 검색 바 */}
          <Box
            sx={{
              width: { xs: "200px", sm: "250px", md: "350px", lg: "500px" },
            }}
          >
            <SearchBar search={search} setSearch={setSearch}></SearchBar>
          </Box>

          <Box
            sx={{ display: "flex", flexGrow: 0, mr: 2, position: "relative" }}
          >
            {/* 프로젝트 등록 버튼 및 프로젝트 목록 표시 */}
            <Box sx={{ flexGrow: 0, mr: 2, position: "relative" }}>
              <Button
                variant="contained"
                onClick={handleShowProjects}
                sx={{
                  fontFamily: "Pretendard-Regular",
                  fontWeight:400,
                  backgroundColor: "#7a82ed",
                  color: "white",
                  borderRadius: "10px",
                  padding: "8px 16px",
                  boxShadow: "none",
                  "&:hover": {
                    backgroundColor: "#33C2E2",
                  },
                }}
              >
                프로젝트 등록
              </Button>

              {showProjects && (
                <Box
                  sx={{
                    fontFamily: "Pretendard-Regular",
                    fontWeight:400,
                    marginTop: "10px",
                    padding: "10px",
                    border: "1px solid #ccc",
                    borderRadius: "10px",
                    backgroundColor: "white",
                    boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
                    position: "absolute", // 버튼 아래에 위치시키기 위해 절대 위치 지정
                    top: "100%", // 버튼 바로 아래에 위치
                    left: "50%", // 수평 중앙 정렬
                    transform: "translateX(-50%)", // 중앙 정렬 보정
                    width: "300px", // 원하는 너비로 설정
                    zIndex: 1000, // 다른 요소보다 상위에 위치하도록 zIndex를 크게 설정
                  }}
                >
                  {projects.length < 3 ? (
                    <Typography
                      variant="subtitle1"
                      sx={{
                        fontFamily: "Pretendard-Regular",
                        fontWeight:400,
                        marginBottom: "10px",
                        color: "#1263CE",
                        textAlign: "center",
                      }}
                      onClick={navigateRegister} //() => navigate("/register")} // 클릭 시 이동
                      style={{ cursor: "pointer" }} // 클릭 가능한 텍스트로 설정
                    >
                      + 새로운 프로젝트
                    </Typography>
                  ) : (
                    <></>
                  )}

                  {projects.map((project) => (
                    <Box
                      key={project.id}
                      sx={{
                        fontFamily: "Pretendard-Regular",
                        fontWeight:400,
                        display: "flex",
                        justifyContent: "end",
                        alignItems: "center",
                        marginBottom: "5px",
                      }}
                    >
                      <Typography>{project.title}</Typography>
                      <IconButton
                        size="small"
                        onClick={() => navigateModifier(project.id)}
                      >
                        <EditIcon sx={{ color: "#4B89DC" }} />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => handleDeleteProject(project.id)}
                      >
                        <CloseIcon sx={{ color: "#f44e38" }} />
                      </IconButton>
                    </Box>
                  ))}
                </Box>
              )}
            </Box>

            {/* 프로필 카드 부분 */}
            <Box sx={{ position: "relative" }}>
              {user.id ? (
                // 로그인 후 프로필 카드
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <UserAvatar
                      profile={profile}
                      defaultImageUrl="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava2-bg.webp"
                    />
                  </IconButton>
                </Tooltip>
              ) : (
                // 로그인 전에는 로그인 버튼
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => navigate("/login")} // 로그인 페이지로 이동
                  sx={{
                    fontFamily: "Pretendard-Regular",
                    backgroundColor: "#7a82ed",
                    color: "white",
                    fontWeight:400,
                    borderRadius: "10px",
                    padding: "8px 16px",
                    "&:hover": {
                      backgroundColor: "#33C2E2",
                    },
                    
                  }}
                >
                  로그인
                </Button>
              )}

              {showProfileCard && user.id && (
                <Box
                  sx={{
                    fontFamily: "Pretendard-Regular",
                    fontWeight:400,
                    position: "absolute",
                    top: "100%",
                    left: "50%",
                    transform: "translateX(-50%)",
                    zIndex: 1000,
                    backgroundColor: "white",
                    borderRadius: "15px",
                    width: 240,
                    padding: 2,
                  }}
                >
                  <Card sx={{ width: "100%", borderRadius: "15px", p: 2 }}>
                    <CardMedia
                      component="img"
                      image="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava2-bg.webp"
                      alt="Profile image"
                      sx={{
                        borderRadius: "50%",
                        width: "80px",
                        height: "80px",
                        margin: "auto",
                        marginTop: 2,
                      }}
                    />
                    <CardContent>
                      <Typography
                        fontFamily="Pretendard-Regular"
                        gutterBottom
                        variant="h6"
                        component="div"
                        textAlign="center"
                        sx={{ fontWeight: "bold" }}
                      >
                        {user.nickname} 님
                      </Typography>

                      <Box
                        sx={{
                          display: "flex",

                          flexDirection: "column",

                          justifyContent: "center",

                          alignItems: "center",

                          gap: 1,

                          mt: 2,
                        }}
                      >
                        <Button
                          variant="outlined"
                          sx={{
                            fontFamily: "Pretendard-Regular",
                            fontWeight:400,
                            borderRadius: 20,
                            width: "120px",
                          }}
                          onClick={() => navigate("/mypage")}
                        >
                          마이페이지
                        </Button>

                        <Button
                          variant="outlined"
                          sx={{
                            fontFamily: "Pretendard-Regular",
                            fontWeight:400,
                            borderRadius: 20,
                            width: "130px",
                            height:"50px"
                          }}
                          onClick={() =>
                            navigate("/mypage", {
                              state: { activeTab: "likeProject" },
                            })
                          }
                        >
                          ❤️ 관심프로젝트
                        </Button>

                        <Typography
                          variant="body2"
                          color="text.secondary"
                          textAlign="center"
                          sx={{
                            marginTop:"10px",
                            fontFamily: "Pretendard-Regular",
                            fontWeight:400,
                            cursor: "pointer",
                          }}
                          onClick={() => {
                            logout();
                            navigate("/");
                          }}
                        >
                          로그아웃
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Box>
              )}
            </Box>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
