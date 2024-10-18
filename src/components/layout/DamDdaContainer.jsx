import { Header } from 'components/layout/Header';
import { Footer } from 'components/layout/Footer';
import 'components/layout/css/DamDdaContainer.module.css'; // 오타 수정
import React, { useState } from 'react';

export function Layout({ children }) {
    return (
        <>
            <Header />
            <div className="container" style={{ width: '100%' }}>
                {children} {/* 페이지 내용이 여기에 들어감 */}
            </div>
            <Footer />
        </>
    );
}
