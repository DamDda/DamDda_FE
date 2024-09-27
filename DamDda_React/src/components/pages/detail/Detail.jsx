import React, { useState, useEffect } from "react";
import { Typography, LinearProgress, Divider, Button, Tabs, Tab, Modal, Box, TextField } from "@mui/material";
import { styled } from "@mui/system";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ProjectDetail from "./ProjectDetail";

import '../../styles/style.css'
import { Header } from "../../layout/Header";
import { Footer } from "../../layout/Footer";

const ProductContainer = styled("div")({
  position: "relative",
  width: "500px",
  height: "500px",
  backgroundColor: "#f0f0f0",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "8px",
  overflow: "hidden",
});

const ProductImage = styled("img")({
  width: "100%",
  height: "100%",
  objectFit: "cover",
  borderRadius: "8px",
});

const Indicator = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  marginTop: "10px",
});

const ModalBox = styled(Box)({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  backgroundColor: 'white',
  boxShadow: 24,
  padding: '20px',
  borderRadius: '8px',
});

const projectData = {
  category: "💄뷰티",
  organizer_id: "홍길동",
  title: "세상에 단 하나뿐인 멋진 프로젝트",
  description: "세상에 단 하나뿐인 아주아주 멋진 예술품을 만들었습니다. 많이많이사세요",
  currentAmount: 500000,
  target_funding: 1000000,
  start_date: "2024.01.01",
  end_date: "2024.06.30",
  delivery_date: 30,
  liked_count: 500,
  supporterCount: 100,
  product_url: "data:image/png;",
};

const Detail = () => {
  const {
    category,
    organizer_id,
    title,
    description,
    currentAmount,
    target_funding,
    start_date,
    end_date,
    
    product_url,
  } = projectData;

  const [remainingDays, setRemainingDays] = useState(0);
  const progress = (currentAmount / target_funding) * 100;
  const [supporterCount, setSupporterCount] = useState(supporterCount);
  const [heartCount, setHeartCount] = useState(0);      // 좋아요 초기값
  const [isHearted, setIsHearted] = useState(false);    // 사용자가 좋아요를 눌렀는지
  
  const [modalOpen, setModalOpen] = useState(false);
  const [collabDetails, setCollabDetails] = useState({ name: '', phone: '', email: '', message: '', files: [] });
  const [errors, setErrors] = useState({ name: false, phone: false, email: false, message: false });

  useEffect(() => {
    const calculateRemainingDays = () => {
      const endDate = new Date(end_date);
      const today = new Date();
      const timeDiff = endDate - today;
      const daysRemaining = Math.ceil(timeDiff / (1000 * 3600 * 24));
      setRemainingDays(daysRemaining >= 0 ? daysRemaining : 0);
    };

    calculateRemainingDays();
    setHeartCount(projectData.supporter_count);
  }, [end_date]);

  const handleHeartClick = () => {
    if (isHearted) {
      setHeartCount((prev) => prev - 1);
    } else {
      setHeartCount((prev) => prev + 1);
    }
  
    setIsHearted((prev) => !prev);
  };
  

  const scrollToSection = (id) => {
    const target = document.getElementById(id);
    target.scrollIntoView({ behavior: "smooth" });
  };

  const handleCollabClick = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setCollabDetails({ name: '', phone: '', email: '', message: '', files: [] });
    setErrors({ name: false, phone: false, email: false, message: false });
    const confirmation = window.confirm("창을 닫으시겠습니까?");
    if (confirmation) {
      setModalOpen(false);
      setCollabDetails({ name: '', phone: '', email: '', message: '', files: [] });
      setErrors({ name: false, phone: false, email: false, message: false });
    }
  };

  const handleCollabSubmit = () => {
    const newErrors = {
      name: !collabDetails.name,
      phone: !collabDetails.phone,
      email: !collabDetails.email,
      message: !collabDetails.message,
    };

    setErrors(newErrors);

    if (!newErrors.name && !newErrors.phone && !newErrors.email && !newErrors.message) {
      alert("협업 요청이 전송되었습니다.");
      handleModalClose();
    }
  };

  const handleSponsorClick = () => {
    const giftSelected = true; // 실제 로직으로 변경
    if (!giftSelected) {
      alert("선물구성을 선택하세요.");
    } else {
      const confirmation = window.confirm("이 프로젝트를 후원하시겠습니까?");
      if (confirmation) {
        setSupporterCount((prev) => prev + 1); // 후원자 수 증가
        alert("결제 창으로 이동합니다.");
      }
    }
  };

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    if (collabDetails.files.length + files.length <= 3) {
      setCollabDetails({ ...collabDetails, files: [...collabDetails.files, ...files] });
    } else {
      alert("최대 3개의 파일만 첨부할 수 있습니다.");
    }
  };

  const handleFileDelete = (index) => {
    const confirmation = window.confirm("정말로 삭제하시겠습니까?");
    if (confirmation) {
      const newFiles = collabDetails.files.filter((_, i) => i !== index);
      setCollabDetails({ ...collabDetails, files: newFiles });
    }
  };



  return (
    <>
    <Header />
     	 <div className="container">

    <div style={{ padding: "20px" }}>
      <div style={{ marginBottom: "20px" }}>
        <Typography variant="category">{category}</Typography><br/>
        <Typography variant="organizer">{organizer_id}</Typography>
        <Typography variant="h6">{title}</Typography>
        <Typography variant="body2">{description}</Typography>
      </div>

      <div style={{ display: "flex", width: "7500px"}}>
        <ProductContainer>
          {product_url ? (
            <ProductImage src={product_url} alt="Project Product" />
          ) : (
            <Typography variant="body2" color="textSecondary">
              이미지가 없습니다.
            </Typography>
          )}
          <div style={{
            position: "absolute",
            top: "50%",
            left: "10px",
            zIndex: 1,
            display: "flex",
            gap: "5px",
          }}>
            <Button>
              <ArrowBackIcon />
            </Button>
            <Button>
              <ArrowForwardIcon />
            </Button>
          </div>
          <Indicator>
            <div style={{ width: "100%", backgroundColor: "#ccc", height: "5px" }}>
              <div style={{
                width: `${progress}%`,
                backgroundColor: "#3f51b5",
                height: "100%",
              }} />
            </div>
          </Indicator>
        </ProductContainer>

        <div style={{ marginLeft: "20px", flex: 1, width:"5000px"}}>
          <Typography variant="h5" style={{ marginTop: "20px" }}>
            후원금액 (진행률)
            <br />
            {currentAmount}원 ({progress.toFixed(2)}%)
          </Typography>
          <LinearProgress
            variant="determinate"
            value={progress}
            style={{ margin: "10px 0", width: "500px" }}
          />
          <Typography variant="h5">남은 기간: {remainingDays}일</Typography>
          <Typography variant="h5">후원자 수: {supporterCount}명</Typography>
          <Divider style={{ margin: "20px 0", width: "700px" }} />
          <Typography variant="body2">목표금액: {target_funding}원</Typography>
          <Typography variant="body2">
            펀딩 기간: {start_date}~{end_date}
          </Typography>
          <Typography variant="body2">
            예상 전달일: 프로젝트 종료일로부터 {projectData.delivery_date}일 이내
          </Typography>
          <div style={{ marginTop: "20px" }}>
            <Button variant="contained" onClick={handleSponsorClick}>
              이 프로젝트에 후원하기
            </Button>
            <p>
            <Button
  variant="outlined"
  onClick={handleHeartClick}
  style={{ marginLeft: "10px" }}
>
  {isHearted ? "♥" : "♡"} <br /> {heartCount}명
</Button>
              <Button
                variant="outlined"
                onClick={handleCollabClick}
                style={{ marginLeft: "10px" }}
              >
                협업하기
              </Button>
            </p>
          </div>
        </div>
      </div>

      <Divider style={{ margin: "20px 0", width: "1220px" }} />

      <div id="details">
        <Tabs value={0} indicatorColor="primary" textColor="primary">
          <Tab label="상세설명" onClick={() => scrollToSection('details')} />
          <Tab label="공지사항" onClick={() => scrollToSection('notices')} />
          <Tab label="Q&A" onClick={() => scrollToSection('qna')} />
        </Tabs>
        <Typography variant="body1" style={{ marginTop: "10px" }}>
          <ProjectDetail />
        </Typography>
      </div>

      <Divider style={{ margin: "20px 0" }} />

      <div id="notices">
        <Tabs value={1} indicatorColor="primary" textColor="primary">
          <Tab label="상세설명" onClick={() => scrollToSection('details')} />
          <Tab label="공지사항" onClick={() => scrollToSection('notices')} />
          <Tab label="Q&A" onClick={() => scrollToSection('qna')} />
        </Tabs>
        <Typography variant="body1" style={{ marginTop: "10px" }}>
          여기에는 공지사항 내용이 들어갑니다.
        </Typography>
      </div>

      <Divider style={{ margin: "20px 0" }} />

      <div id="qna">
        <Tabs value={2} indicatorColor="primary" textColor="primary">
          <Tab label="상세설명" onClick={() => scrollToSection('details')} />
          <Tab label="공지사항" onClick={() => scrollToSection('notices')} />
          <Tab label="Q&A" onClick={() => scrollToSection('qna')} />
        </Tabs>
        <Typography variant="body1" style={{ marginTop: "10px" }}>
          여기에는 Q&A 내용이 들어갑니다.
        </Typography>
      </div>

      {/* 협업 모달 */}
      <Modal open={modalOpen} onClose={handleModalClose}>
        <ModalBox>
          <Typography variant="h6" component="h2">
            협업 요청
          </Typography>
          <TextField
            label="이름"
            variant="outlined"
            fullWidth
            margin="normal"
            value={collabDetails.name}
            onChange={(e) => setCollabDetails({ ...collabDetails, name: e.target.value })}
            error={errors.name}
            helperText={errors.name ? "이름을 입력하세요." : ""}
            InputProps={{
              style: {
                borderColor: errors.name ? 'red' : 'inherit',
              },
            }}
          />
          <TextField
            label="전화번호"
            variant="outlined"
            fullWidth
            margin="normal"
            value={collabDetails.phone}
            onChange={(e) => setCollabDetails({ ...collabDetails, phone: e.target.value })}
            error={errors.phone}
            helperText={errors.phone ? "전화번호를 입력하세요." : ""}
            InputProps={{
              style: {
                borderColor: errors.phone ? 'red' : 'inherit',
              },
            }}
          />
          <TextField
            label="이메일"
            variant="outlined"
            fullWidth
            margin="normal"
            value={collabDetails.email}
            onChange={(e) => setCollabDetails({ ...collabDetails, email: e.target.value })}
            error={errors.email}
            helperText={errors.email ? "이메일을 입력하세요." : ""}
            InputProps={{
              style: {
                borderColor: errors.email ? 'red' : 'inherit',
              },
            }}
          />
          <TextField
            label="협업 내용"
            variant="outlined"
            fullWidth
            margin="normal"
            multiline
            rows={4}
            value={collabDetails.message}
            onChange={(e) => setCollabDetails({ ...collabDetails, message: e.target.value })}
            error={errors.message}
            helperText={errors.message ? "협업 내용을 입력하세요." : ""}
            InputProps={{
              style: {
                borderColor: errors.message ? 'red' : 'inherit',
              },
            }}
          />
          <Button
            variant="contained"
            component="label"
            fullWidth
            margin="normal"
          >
            파일 첨부
            <input
              type="file"
              hidden
              multiple
              onChange={handleFileChange}
            />
          </Button>
          {collabDetails.files.map((file, index) => (
            <div key={index} style={{ marginTop: '10px', display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body2">
                첨부된 파일: {file.name}
              </Typography>
              <Button variant="outlined" onClick={() => handleFileDelete(index)} style={{ marginLeft: '10px' }}>
                삭제
              </Button>
            </div>
          ))}
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
            <Button variant="outlined" onClick={handleModalClose} style={{ marginRight: '10px' }}>
              닫기
            </Button>
            <Button variant="contained" onClick={handleCollabSubmit}>
              협업 요청하기
            </Button>
          </div>
        </ModalBox>
      </Modal>
    </div>
    </div>
    <Footer />
    </>

  );
};

export default Detail;
