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

    return (
        <div className={styles.container}>
            <div className={styles.deliveryInfo}>
                <div className={styles.title}>배송 정보</div>
                <div className={styles.infoRow}>
                    <div className={styles.label}>수령인:</div>
                    <div>{project?.supportingProject?.user?.name}</div>
                </div>
                <div className={styles.infoRow}>
                    <div className={styles.label}>휴대폰:</div>
                    <div>{project?.supportingProject?.user?.phoneNumber}</div>
                </div>
                <div className={styles.infoRow}>
                    <div className={styles.label}>주소:</div>
                    <div>
                        {project?.supportingProject?.delivery?.deliveryAddress} (
                        {project?.supportingProject?.delivery?.deliveryDetailedAddress})
                    </div>
                </div>
                <div className={styles.infoRow}>
                    <div className={styles.label}>배송 요청 사항: </div>
                    <div>{project?.supportingProject?.delivery?.deliveryMessage}</div>
                </div>
            </div>

            <div className={styles.separator} />

            <div className={styles.paymentInfo}>
                <div className={styles.title}>결제 내역</div>
                <div className={styles.infoRow}>
                    <div className={styles.label}>결제 방법:</div>
                    <div>{project?.supportingProject?.payment?.paymentMethod}</div>
                </div>
                <div className={styles.infoRow}>
                    <div className={styles.label}>총 상품 금액:</div>
                    <div>{project?.supportingPackage?.packagePrice}</div>
                </div>
                <div className={styles.infoRow}>
                    <div className={styles.label}>결제 상태:</div>
                    <div>{paymentStatus}</div>
                </div>
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
