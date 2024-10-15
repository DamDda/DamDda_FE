import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { MultiCategoryComponent } from "components/common/MultiCategoryComponent";
import { BlueButtonComponent } from "components/common/ButtonComponent";
import { RedButtonComponent } from "components/common/ButtonComponent";
import { BlueBorderButtonComponent } from "components/common/ButtonComponent";
import { RedBorderButtonComponent } from "components/common/ButtonComponent";
import { DropdownComponent } from "components/common/DropdownComponent";
import { FileDownloadComponent } from "components/common/FileDownloadComponent";
import { FileUploadComponent } from "components/common/FileUploadComponent";
import { GiftCompositionComponent } from "components/common/GiftCompositionComponent";
import { ImageCarousel } from "components/common/ImageCarousel";
// import { FileDownloadComponent } from "components/common/FileDownloadComponent";
// import { FileDownloadComponent } from "components/common/FileDownloadComponent";
import {PaginationComponent} from "components/common/PaginationComponent";
import { SearchBoxComponent } from "components/common/SearchBoxComponent";
import './App.css';
import { CustomInputProps } from "components/common/CustomInputProps";
import { InputLabelProps } from "components/common/InputLabelProps";

function App() {


  //MultiCategoryComponent
  const handleyClick = (data) => {
    alert(`${data} 클릭됨!`);
  };

  //DropdownComponent
  const [selectedValue, setSelectedValue] = useState("option2");
  const handleDropdownChange = (event) => {
    setSelectedValue(event.target.value);
  };
  const menuItems = [
    { value: "option1", text: "Option 1" },
    { value: "option2", text: "Option 2" },
    { value: "option3", text: "Option 3" },
  ];
  
  //FileDownloadComponent
  const handleFileDownload = (fileName) => {
    alert(`${fileName} 파일을 다운로드합니다.`);
    // 파일 다운로드 로직을 추가
    // 실제 파일 다운로드는 서버와 통신하여 처리
  };


  //FileUploadComponent
  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    console.log(files); // 파일 목록 처리
  };

  const handleFileUpload = (files) => {
    console.log(files); // 업로드 로직 처리
  };

  //GiftCompositionComponent
  const rewardData = [
    {
      amount: 1000,
      title: "선물 없이 후원하기",
      description: "감사합니다!",
      selectedCount: 0,
      remainingCount: 50,
    },
    {
      amount: 50000,
      title: "[얼리버드] 스페셜 티셔츠",
      description: "한정판 티셔츠",
      selectedCount: 10,
      remainingCount: 5,
    },
    {
      amount: 100000,
      title: "프리미엄 후원 패키지",
      description: "티셔츠 + 머그컵 + 사인 포스터",
      selectedCount: 3,
      remainingCount: 2,
    },
  ];

  //ImageCarousel
  const [CarouselImages] = useState([
    "https://img.freepik.com/free-vector/polygonal-city-elements_23-2147496342.jpg?ga=GA1.1.167959845.1724899652&semt=ais_hybrid",
    "https://img.freepik.com/free-vector/road-infographic-template_23-2147531975.jpg?ga=GA1.1.167959845.1724899652&semt=ais_hybrid",
    "https://img.freepik.com/free-vector/flat-people-doing-outdoor-activities_23-2147869120.jpg?ga=GA1.1.167959845.1724899652&semt=ais_hybrid",
  ]);
  //pagenation
  const [currentPage, setCurrentPage] = useState(1);


  const CarouselStyle = { maxWidth: "70%", width: "1920px", height: "auto" }

  return (
    <div style={{ fontFamily: 'Pretendard-Regular' }}>

    <Router>
      <Routes>
        <Route
          path="/BlueButtonComponent"
          element={
            <BlueButtonComponent
              text="버튼 테스트"
              onClick={() => alert("버튼이 클릭되었습니다!")}
              //style={buttonStyle} // 스타일 객체 전달
            />
          }
        />
         <Route
          path="/BlueBorderButtonComponent"
          element={
            <BlueBorderButtonComponent
              text="버튼 테스트"
              onClick={() => alert("버튼이 클릭되었습니다!")}
              //style={buttonStyle} // 스타일 객체 전달
            />
          }
        />
        <Route
        path="/RedButtonComponent"
        element={
          <RedButtonComponent
            text="버튼 테스트"
            onClick={() => alert("버튼이 클릭되었습니다!")}
            //style={buttonStyle} // 스타일 객체 전달
          />
        }
      />
       <Route
          path="/RedBorderButtonComponent"
          element={
            <RedBorderButtonComponent
              text="버튼 테스트"
              onClick={() => alert("버튼이 클릭되었습니다!")}
              //style={buttonStyle} // 스타일 객체 전달
            />
          }
        />

        <Route
          path="/category"
          element={
            <MultiCategoryComponent
              setCategory={(value) => handleyClick(value)}
            />
          }
        />

        <Route
          path="/dropdown"
          element={
            <DropdownComponent
              inputLabel="Select an option"
              menuItems={menuItems}
              selectValue={selectedValue}
              onChange={handleDropdownChange}
            />
          }
        />

        <Route
          path="/download"
          element={
            <FileDownloadComponent
              handleDownload={handleFileDownload}
              fileName="example.pdf"
            />
          }
        />

        <Route
          path="/upload"
          element={
            <FileUploadComponent
              handleChange={handleFileChange}
              handleUpload={handleFileUpload}
            />
          }
        />

        <Route
          path="/gifts"
          element={<GiftCompositionComponent rewardData={rewardData} />}
        />
        
        <Route path="/carousel" element={<ImageCarousel images={CarouselImages} style={CarouselStyle} />} />
        
        
        <Route path="/pagination" element={<PaginationComponent
         currentPage={currentPage}
         setCurrentPage={setCurrentPage}/>} />


        <Route path="/searchBoxComponent" element={<SearchBoxComponent/>} />
        
        <Route path="/customInputProps" element={<CustomInputProps/>} />

        <Route path="/inputLabelProps" element={<InputLabelProps/>} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
