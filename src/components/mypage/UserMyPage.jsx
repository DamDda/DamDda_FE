import React, { useState, useEffect, useRef } from 'react';
import ProfileEditPage from 'components/mypage/ProfileEditPage';
import { Myproject } from 'components/mypage/MyProject';
import { MyProjectDetails } from 'components/mypage/MyProjectDetail';
import ProfileStatistics from 'components/mypage/ProfileStatistics';
import { SupportedProjects } from 'components/mypage/SupportedProjects';
import Withdrawal from './Withdrawal';
import TabsUnderlinePlacement from './TabsUnderlinePlacement';
import { CollaborationList } from 'components/mypage/CollaborationList';
import { Likeproject } from 'components/mypage/LikeProject';
import MypageHeader from 'components/mypage/MypageHeader';
import axios from 'axios';
import { useUser } from 'UserContext';
import { CollaborationDetail } from 'components/mypage/CollaborationDetail';
import Cookies from 'js-cookie';
import { SERVER_URL } from 'constants/URLs';
import { TabComponent } from 'components/common/TabComponent';

export const UserMyPage = () => {
    //////////Tab 관련 시작//////////////////////////////////
    const [tabIndex, setTabIndex] = useState(0);
    const [isClickProfile, setClickProfile] = useState(false);
    const [isClickMyproject, setClickMyproject] = useState(0); //클릭한 프로젝트 번호 저장
    const [isClickCollb, setClickCollb] = useState(0);
    const [collbFilter, setCollbFilter] = useState('제안 받은 협업');

    // 각 섹션에 대한 ref 정의
    const sectionRefs = {
        profileRef: useRef(null),
        OrderRef: useRef(null),
        MyProjectRef: useRef(null),
        LikedRef: useRef(null),
        CollbRef: useRef(null),
        UnsubscribeRef: useRef(null),
    };

    const labels = ['프로필', '나의 주문', '나의 프로젝트', '관심 프로젝트', '협업하기', '탈퇴하기']; // 탭 레이블을 배열로 정의

    //탭 이동
    const handleTabClick = (index) => {
        setClickProfile(false);
        setClickMyproject(0);
        setClickCollb(0);
        setTabIndex(index);
    };

    //////////Tab 관련 끝//////////////////////////////////

    //////////Tab 클릭 시 아래 랜더링 되는 부분 나타내기//////////////////////////////////

    // 각 탭에 맞는 내용을 렌더링하는 함수
    const renderTabContent = () => {
        switch (tabIndex) {
            case 0:
                return isClickProfile ?
                        <div>나의 정보가 여기에 나타납니다.</div>
                    :   <div>나의 정보 수정이 여기에 나타납니다.</div>;
            case 1:
                return <SupportedProjects></SupportedProjects>;
            case 2:
                return isClickMyproject === 0 ?
                        <Myproject setClickMyproject={setClickMyproject} />
                    :   <MyProjectDetails projectId={isClickMyproject} setClickMyproject={setClickMyproject} />;
            case 3:
                return <Likeproject />;
            case 4:
                return isClickCollb === 0 ?
                        <CollaborationList
                            setClickCollb={setClickCollb}
                            filter={collbFilter}
                            setFilter={setCollbFilter}
                        />
                    :   <CollaborationDetail
                            clickCollb={isClickCollb}
                            filter={collbFilter}
                            setFilter={setCollbFilter}
                        />;
            case 5:
                return <div>탈퇴하기 관련 정보가 여기에 나타납니다.</div>;
            default:
                return <div>다시 선택해주세요.</div>;
        }
    };
    //////////Tab 관련 끝//////////////////////////////////

    return (
        <>
            <div ref={sectionRefs.qnaRef} style={{ margin: '150px 0px 50px 0px' }}>
                <TabComponent
                    tabIndex={tabIndex}
                    setTabIndex={(index) => handleTabClick(index)}
                    labels={labels}
                    sectionRefs={sectionRefs} // ref 전달
                />
                <div style={{ width: '100%', height: 'auto', backgroundColor: 'white' }}>
                    {renderTabContent()} {/* 탭에 맞는 내용 렌더링 */}
                </div>
            </div>
        </>
    );
};
