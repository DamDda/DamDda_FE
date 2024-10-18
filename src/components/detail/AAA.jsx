// import { SERVER_URL } from "constants/URLs";
// import Cookies from "js-cookie";
// import axios from "axios";
// import { useState, navigate, useEffect } from "react";

// export const AAA = () => {

//   const navigate = navigate();

//   const projectId = 1;
//   const userId = 1;
//   const [likedCount, setLikedCount] = useState();
//   const [isHearted, setIsHearted] = useState();
//   const [projectDetail, setProjectDetail] = useState();
//   const [projectPackage, setProjectPackage] = useState();
//   const [selectedPackages, setSelectedPackages] = useState({
//     packageName: "패키지 D",
//     packagePrice: 25000,
//     selectOption: (2)[
//       ({ rewardName: "보상 D1", selectOption: "옵션 1" },
//       { rewardName: "보상 D2", selectOption: "옵션 1" })
//     ],
//     selectedCount: 1,
//   });

//   const [errors, setErrors] = useState({
//     name: false,
//     phone: false,
//     email: false,
//     message: false,
//   });
//   const [collabDetails, setCollabDetails] = useState({
//     title: "project.title", //------------------> project.title로 수정하기
//     name: "",
//     phone: "",
//     email: "",
//     message: "",
//     files: [],
//   });

//   //패키지 가져오는 기능.
//   const fetchPackage = async () => {
//     try {
//       const response = await axios.get(
//         `${SERVER_URL}/package/${projectId}`,
//         {
//           //project id 받아줘야 함.
//           //project_id를 넘겨받아야 함.
//           withCredentials: true,
//         }
//       );

//       if (!Array.isArray(response.data)) {
//         console.error("API response is not an array:", response.data);
//         return;
//       }
//       const formattedPackages = response.data.map((pac) => ({
//         id: pac.id,
//         name: pac.name,
//         count: pac.count,
//         price: pac.price,
//         quantityLimited: pac.quantityLimited,
//         RewardList: Array.isArray(pac.RewardList) ? pac.RewardList : [],
//       }));
//       console.log(formattedPackages.map((reward) => reward.RewardList));
//       setProjectPackage(formattedPackages);
//     } catch (error) {
//       console.error("패키지 목록을 가져오는 중 오류 발생:", error);
//     }
//   };

//   // 프로젝트 정보 요청을 보내는 함수
//   const fetchProducts = () => {
//     axios
//       .get(` ${SERVER_URL}/project/${projectId}`, {
//         params: {
//           // memberId: user.key,
//         },
//         headers: {
//           ...(Cookies.get("accessToken") && {
//             Authorization: `Bearer ${Cookies.get("accessToken")}`,
//           }),
//         },
//       })
//       .then((response) => {
//         console.log(response.data);
//         if (response.data !== null) {
//           setProjectDetail(response.data);
//           setIsHearted(response.data.liked);
//           setLikedCount(response.data.likeCnt);
//         } else {
//           setProjectDetail({});
//         }

//         console.log(projectDetail);
//       })
//       .catch((error) => {
//         console.log(window.location.hostname);
//         console.error("프로젝트 데이터를 가져오는 중 오류 발생:", error);
//       });
//   };

//   const handleLike = (project) => {
//     // liked가 true이면 DELETE 요청
//     axios({
//       method: project.liked ? "DELETE" : "POST",
//       url: `${SERVER_URL}/project/like`,
//       params: {
//         projectId: project.id,
//       },
//       headers: {
//         ...(Cookies.get("accessToken") && {
//           Authorization: `Bearer ${Cookies.get("accessToken")}`,
//         }),
//       },
//     })
//       .then((response) => {
//         if (response.status === 200) {
//           console.log(`좋아요 ${project.liked ? "취소" : "추가"} 성공:`, response.data);

//           // 상태 업데이트 - 불변성 유지
//           setProjectDetail(prevState => ({
//             ...prevState,
//             liked: !prevState.liked, // liked 상태를 반전시킴
//           }));
//         }
//       })
//       .catch((e) => {
//         console.error(e);
//       });
//   };

//   const handleCollabSubmit = async () => {
//     const newErrors = {
//       title: !collabDetails.title,
//       name: !collabDetails.name,
//       phone: !collabDetails.phone,
//       email: !collabDetails.email,
//       message: !collabDetails.message,
//     };

//     setErrors(newErrors);

//     const formData = new FormData();

//     /*오늘 날짜*/
//     const date = new Date();
//     const year = date.getFullYear();
//     const month = ("0" + (date.getMonth() + 1)).slice(-2);
//     const day = ("0" + date.getDate()).slice(-2);
//     const today = `${year}-${month}-${day}`;

//     const jsonData = {
//       email: collabDetails.email,
//       phoneNumber: collabDetails.phone,
//       content: collabDetails.message,
//       user_id: userId,  //---------------->user.id로 수정 필요
//       collaborationDTO: {
//         title: collabDetails.title,
//         CollaborateDate: today,
//         name: collabDetails.name,
//       },
//     };

//     formData.append("jsonData", JSON.stringify(jsonData));
//     collabDetails.files.forEach((file, index) => {
//       formData.append("collabDocList", file);
//     });

//     console.log("formData" + formData);
//     if (
//       !newErrors.title &&
//       !newErrors.message &&
//       !newErrors.name &&
//       !newErrors.phone &&
//       !newErrors.email
//     ) {
//       try {
//         console.log("요청 전까지는 가능함!!");
//         const response = await axios.post(
//           `damdda/collab/register/${projectId}`,
//           formData,
//           {
//             withCredentials: true,
//             headers: {
//               "Content-Type": "multipart/form-data",
//               ...(Cookies.get("accessToken") && {
//                 Authorization: `Bearer ${Cookies.get("accessToken")}`,
//               }),
//             },
//           }
//         );
//         console.log("결과" + response);
//         alert("협업 요청이 전송되었습니다.");
//         //handleModalClose();
//       } catch (error) {
//         console.log("register 과정 중 에러 발생 " + error);
//       }
//     }
//   };

//   // 주문하는 코드
//   const handleNavigateToPayment = () => {
//     const orderInfo = {
//       projectTitle: projectDetail.title, // 프로젝트 이름 (실제 값으로 설정 가능)
//       selectedPackages: selectedPackages.map((pkg) => ({
//         packageName: pkg.name, // 선택된 선물 구성의 이름
//         selectedOption: pkg.selectedOption, // 선택된 옵션
//         price: pkg.price, // 가격
//         quantity: pkg.count, // 수량
//       })),
//       totalAmount: selectedPackages.reduce((acc, pkg) => {
//         return acc + pkg.packagePrice * pkg.selectedCount;
//       }, 0), // 총 금액
//       projectId: projectDetail.id, // projectId 추가
//       memberId: 3, //--------------------------------------> jwt로 바꿔야함
//     };

//     // navigate 함수로 orderInfo 데이터를 전달하여 payment 페이지로 이동
//     navigate("/payment", { state: orderInfo });
//   };
// };

import { SERVER_URL } from 'constants/URLs';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const AAA = () => {
    const navigate = useNavigate();

    const projectId = 1;
    const userId = 1;
    const [likedCount, setLikedCount] = useState();
    const [isHearted, setIsHearted] = useState();
    const [projectDetail, setProjectDetail] = useState();
    const [projectPackage, setProjectPackage] = useState();
    const [selectedPackages, setSelectedPackages] = useState({
        packageName: '패키지 D',
        packagePrice: 25000,
        selectOption: [
            { rewardName: '보상 D1', selectOption: '옵션 1' },
            { rewardName: '보상 D2', selectOption: '옵션 1' },
        ],
        selectedCount: 1,
    });

    const [errors, setErrors] = useState({
        name: false,
        phone: false,
        email: false,
        message: false,
    });

    const [collabDetails, setCollabDetails] = useState({
        title: 'project.title', //------------------> project.title로 수정하기
        name: '',
        phone: '',
        email: '',
        message: '',
        files: [],
    });

    // 패키지 가져오는 기능
    const fetchPackage = async () => {
        try {
            const response = await axios.get(`${SERVER_URL}/package/${projectId}`, {
                withCredentials: true,
            });

            if (!Array.isArray(response.data)) {
                console.error('API response is not an array:', response.data);
                return;
            }

            const formattedPackages = response.data.map((pac) => ({
                id: pac.id,
                name: pac.name,
                count: pac.count,
                price: pac.price,
                quantityLimited: pac.quantityLimited,
                RewardList: Array.isArray(pac.RewardList) ? pac.RewardList : [],
            }));

            console.log('패키지 데이터: ', formattedPackages); // 패키지 데이터를 콘솔에 출력
            setProjectPackage(formattedPackages);
        } catch (error) {
            console.error('패키지 목록을 가져오는 중 오류 발생:', error);
        }
    };

    // 프로젝트 정보 요청을 보내는 함수
    const fetchProducts = () => {
        axios
            .get(`${SERVER_URL}/project/${projectId}`, {
                headers: {
                    ...(Cookies.get('accessToken') && {
                        Authorization: `Bearer ${Cookies.get('accessToken')}`,
                    }),
                },
            })
            .then((response) => {
                console.log('프로젝트 데이터: ', response.data); // 프로젝트 데이터를 콘솔에 출력
                if (response.data !== null) {
                    setProjectDetail(response.data);
                    setIsHearted(response.data.liked);
                    setLikedCount(response.data.likeCnt);
                } else {
                    setProjectDetail({});
                }
            })
            .catch((error) => {
                console.error('프로젝트 데이터를 가져오는 중 오류 발생:', error);
            });
    };

    // 컴포넌트가 마운트될 때 데이터를 불러오는 useEffect
    useEffect(() => {
        fetchProducts(); // 프로젝트 데이터 가져오기
        fetchPackage(); // 패키지 데이터 가져오기
    }, []); // 빈 배열을 전달하여 컴포넌트가 처음 렌더링될 때만 실행되도록 설정

    return (
        <div>
            <h1>데이터 불러오기 테스트</h1>
        </div>
    );
};
