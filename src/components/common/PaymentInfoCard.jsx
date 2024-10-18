import React, { useState } from 'react';
import { StatusButton } from './ButtonComponent';
import styles from '../css/PaymentInfoCard.module.css'; // Import CSS module

export const PaymentInfoCard = ({ project }) => {
    const [paymentStatus, setPaymentStatus] = useState(project?.supportingProject?.payment?.paymentStatus || '');

    const handleCancelPayment = async () => {
        const supportingProject = project?.supportingProject;
        alert('supportingProject ID: ' + supportingProject?.payment?.paymentId);

        const updatedPaymentStatus = {
            supportingProject: supportingProject,
            paymentStatus: '결제 취소',
        };
    };

    const deliveryInfo = [
        { label: '수령인', value: project?.supportingProject?.user?.name },
        { label: '휴대폰', value: project?.supportingProject?.user?.phoneNumber },
        {
            label: '주소',
            value: `${project?.supportingProject?.delivery?.deliveryAddress} (${project?.supportingProject?.delivery?.deliveryDetailedAddress})`,
        },
        { label: '배송 요청 사항', value: project?.supportingProject?.delivery?.deliveryMessage },
    ];

    const paymentInfo = [
        { label: '결제 방법', value: project?.supportingProject?.payment?.paymentMethod },
        { label: '총 상품 금액', value: project?.supportingPackage?.packagePrice },
        { label: '결제 상태', value: paymentStatus },
    ];

    return (
        <div className={styles.container}>
            {/* 배송 정보 */}
            <div className={styles.deliveryInfo}>
                <div className={styles.title}>배송 정보</div>
                {deliveryInfo.map((item, index) => (
                    <div className={styles.infoRow} key={index}>
                        <div className={styles.label}>{item.label}:</div>
                        <div>{item.value}</div>
                    </div>
                ))}
            </div>

            <div className={styles.separator} />

            {/* 결제 정보 */}
            <div className={styles.paymentInfo}>
                <div className={styles.title}>결제 내역</div>
                {paymentInfo.map((item, index) => (
                    <div className={styles.infoRow} key={index}>
                        <div className={styles.label}>{item.label}:</div>
                        <div>{item.value}</div>
                    </div>
                ))}
            </div>

            <div className={styles.cancelButtonBox}>
                <StatusButton
                    status="결제 취소"
                    label="결제 취소"
                    onClick={handleCancelPayment}
                    className={styles.cancelButton}
                />
            </div>
        </div>
    );
};
