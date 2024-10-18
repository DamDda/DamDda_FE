import React, { useState } from 'react';
import { StatusButton } from './ButtonComponent'; // named export로 가져오기
import { PaymentInfoCard } from '../common/PaymentInfoCard';

export const SponsoredCard = ({ project }) => {
    const [showDetails, setShowDetails] = useState(false); // 결제/배송 정보 표시 상태

    // 결제/배송 정보 표시 토글
    const toggleDetails = () => setShowDetails(!showDetails); // 토글

    console.log('/4/1/1/' + project);

    return (
        <>
            <div
                style={{
                    padding: '20px',
                    display: 'flex',
                    flexDirection: 'row',
                    // alignItems: 'center',
                    borderRadius: '16px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                    backgroundColor: 'white',
                    justifyContent: 'space-between',
                    marginBottom: '15px',
                }}
            >
                {/* 왼쪽에 썸네일을 넣는 부분 */}
                <div style={{ flex: '0 0 150px', margin: '15px' }}>
                    <div style={{ width: '100%', paddingBottom: '100%', position: 'relative' }}>
                        <img
                            src={project.supportingProject.project.thumbnailUrl}
                            alt="프로젝트 썸네일"
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                borderRadius: '8px',
                            }}
                        />
                    </div>
                </div>

                {/* 중앙 텍스트 정보 */}
                <div style={{ flex: 1, marginRight: '5px', padding: '8px' }}>
                    <h5 style={{ marginBottom: '8px', fontWeight: 'bold', fontSize: '20px' }}>
                        [{project.supportingProject.project.title}]
                    </h5>
                    <p style={{ marginBottom: '8px', color: '#666' }}>
                        {/* 선물 구성: {project.supportingPackage.packageName} */}
                    </p>
                    <p style={{ marginBottom: '8px', color: '#666' }}>
                        {/* 후원 금액: {parseInt(project.supportingPackage.packagePrice).toLocaleString()}원 */}
                    </p>
                </div>

                {/* 오른쪽 정보 (상단: 후원번호와 결제 날짜, 하단: 버튼) */}
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        alignItems: 'flex-end',
                        minWidth: '160px',
                    }}
                >
                    {/* 상단에 후원번호와 결제날짜 */}
                    <div style={{ textAlign: 'right', marginBottom: '80px' }}>
                        <p style={{ marginBottom: '8px', fontSize: '0.875rem', color: '#666' }}>
                            후원번호: {project.delivery.deliveryId}
                        </p>
                        <p style={{ fontSize: '0.875rem', color: '#666' }}>
                            결제 날짜: {new Date(project.supportingProject.supportedAt).toLocaleString()}
                        </p>
                    </div>

                    {/* 하단에 진행 상태와 결제 정보 버튼 */}
                    <div
                        style={{
                            display: 'flex',
                            gap: '10px',
                            justifyContent: 'flex-end',
                            marginTop: 'auto',
                        }}
                    >
                        <StatusButton status={project.status} label={project.status === '진행중' ? '진행중' : '마감'} />
                        <StatusButton status="결제/배송 정보" label="결제/배송 정보" onClick={toggleDetails} />
                    </div>
                </div>
            </div>

            {/* 결제/배송 정보 표시 */}
            {showDetails && <PaymentInfoCard project={project} />}
        </>
    );
};
