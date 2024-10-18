import React, { useState } from 'react';

import { BlueButtonComponent, BlueBorderButtonComponent } from 'components/common/ButtonComponent';
import { StandardInputBox } from 'components/common/InputBoxComponent';
import { Layout } from 'components/layout/DamDdaContainer'; // Layout 컴포넌트 import
import axios from 'axios';
import { SERVER_URL } from 'constants/URLs';
import { TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { Link as MuiLink } from '@mui/material';
import { useUser } from 'UserContext.js';

export const ResetPassword = () => {
    const [formData, setFormData] = useState({
        loginId: '',
        name: '',
        email: '',
        password: '',
        password_confirm: '',
        resetPw: '',
    });
    const [errors, setErrors] = useState({
        loginId: '',
        name: '',
        email: '',
        password: '',
        password_confirm: '',
    });
    const [openModal, setOpenModal] = useState(false);
    const { user } = useUser();
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({
            loginId: '',
            name: '',
            email: '',
            password: '',
            password_confirm: '',
        });

        if (!formData.loginId) {
            setErrors((prev) => ({ ...prev, loginId: '아이디를 입력해주세요.' }));
            return;
        }

        if (!formData.name) {
            setErrors((prev) => ({ ...prev, name: '이름을 입력해주세요.' }));
            return;
        }

        if (!formData.email) {
            setErrors((prev) => ({ ...prev, email: '이메일을 입력해주세요.' }));
            return;
        }

        const serachData = {
            loginId: formData.loginId,
            name: formData.name,
            email: formData.email,
        };

        try {
            const response = await axios.get(
                `${SERVER_URL}/member/check`,
                { params: serachData },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            if (response.status != 200) {
                throw new Error('오류가 발생했습니다.');
            }

            const pwData = await response.data;
            formData.resetPw = pwData.id;

            console.log(pwData);
            // 비밀번호 재설정 성공 처리
            if (pwData) {
                setOpenModal(true); // 성공 시 모달 열기
            } else {
                alert('정보를 확인하세요.');
            }
        } catch (error) {
            alert('일치하는 회원을 찾을 수 없습니다. 다시 입력해주세요.');
            console.error('비밀번호 찾기 중 문제 발생:', error);
        }
    };

    const handleResetPassword = async (e) => {
        setErrors({ ...errors, password: '', password_confirm: '' });

        if (!formData.password) {
            setErrors((prev) => ({ ...prev, password: '비밀번호를 입력해주세요.' }));
            return;
        }

        if (formData.password.length < 8 || formData.password.length > 16) {
            setErrors((prev) => ({
                ...prev,
                password: '비밀번호는 8-16자리로 입력해주세요.',
            }));
            return;
        }
        if (formData.password !== formData.password_confirm) {
            setErrors((prev) => ({
                ...prev,
                password_confirm: '비밀번호가 일치하지 않습니다.',
            }));
            return;
        }

        try {
            const response = await axios.put(
                `${SERVER_URL}/member/${formData.resetPw}/password`,
                { password: formData.password },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            alert('비밀번호가 성공적으로 재설정되었습니다.');
            setOpenModal(false); // 모달 닫기
            navigate('/login');
        } catch (error) {
            console.error('비밀번호 찾기 중 문제 발생:', error);
        }
    };

    return (
        <Layout>
            <div className="container">
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        minHeight: '100vh',
                        flexDirection: 'column',
                    }}
                >
                    <h2 style={{ fontWeight: 'bold', marginBottom: '30px' }}>비밀번호 재설정하기</h2>
                    <form
                        onSubmit={handleSubmit}
                        style={{
                            width: '420px',
                            padding: '50px',
                            border: '1px solid lightgray',
                            borderRadius: '10px',
                            backgroundColor: '#fff',
                        }}
                    >
                        {/* 아이디 입력 */}
                        <div style={{ position: 'relative', marginBottom: '15px' }}>
                            <StandardInputBox
                                required
                                fullWidth
                                id="loginId"
                                name="loginId"
                                label="아이디"
                                variant="standard"
                                value={formData.loginId}
                                onChange={handleChange}
                                error={Boolean(errors.loginId)}
                                helperText={errors.loginId}
                                margin="normal"
                            />
                        </div>

                        {/* 이름 입력 */}
                        <div style={{ position: 'relative', marginBottom: '20px' }}>
                            <StandardInputBox
                                required
                                fullWidth
                                id="name"
                                name="name"
                                placeholder="이름을 입력해주세요"
                                label="이름"
                                variant="standard"
                                value={formData.name}
                                onChange={handleChange}
                                error={Boolean(errors.name)}
                                helperText={errors.name}
                                margin="normal"
                            />
                        </div>

                        {/* 이메일 입력 */}
                        <div style={{ position: 'relative', marginBottom: '20px' }}>
                            <StandardInputBox
                                required
                                fullWidth
                                id="email"
                                name="email"
                                placeholder="이메일을 입력해주세요"
                                label="이메일"
                                type="email"
                                variant="standard"
                                value={formData.email}
                                onChange={handleChange}
                                error={Boolean(errors.email)}
                                helperText={errors.email}
                                margin="normal"
                            />
                        </div>

                        <div
                            style={{
                                marginTop: '30px',
                                display: 'flex',
                                justifyContent: 'flex-end',
                                alignItems: 'center',
                            }}
                        >
                            <BlueButtonComponent
                                text="비밀번호 재설정하기"
                                onClick={handleSubmit}
                                sx={{ width: '150px', height: '50px' }}
                            />
                        </div>

                        {/* 모달창 */}
                        <Dialog open={openModal} onClose={() => setOpenModal(false)}>
                            <DialogTitle>비밀번호 재설정</DialogTitle>
                            <DialogContent>
                                <TextField
                                    required
                                    fullWidth
                                    type="password"
                                    id="password"
                                    name="password"
                                    placeholder="새로운 비밀번호"
                                    label="새로운 비밀번호"
                                    variant="standard"
                                    value={formData.password}
                                    onChange={handleChange}
                                    error={Boolean(errors.password)}
                                    helperText={errors.password || '8-16자리 이상 입력해주세요!'}
                                />
                                <TextField
                                    required
                                    fullWidth
                                    type="password"
                                    id="password_confirm"
                                    name="password_confirm"
                                    placeholder="새로운 비밀번호 확인"
                                    label="새로운 비밀번호 확인"
                                    variant="standard"
                                    value={formData.password_confirm}
                                    onChange={handleChange}
                                    error={Boolean(errors.password_confirm)}
                                    helperText={errors.password_confirm}
                                />
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={() => setOpenModal(false)} color="primary">
                                    닫기
                                </Button>
                                <Button onClick={handleResetPassword} color="primary">
                                    비밀번호 재설정
                                </Button>
                            </DialogActions>
                        </Dialog>

                        <div style={{ margin: '30px 0', borderBottom: '1px solid lightgray' }} />

                        <div style={{ marginTop: '20px', textAlign: 'right' }}>
                            <div>
                                아이디를 잊어버리셨나요?{' '}
                                <MuiLink component={Link} to="/find-id" variant="body2">
                                    아이디 찾기
                                </MuiLink>
                            </div>
                            <div>
                                가입을 원하시나요?{' '}
                                <MuiLink component={Link} to="/join" variant="body2">
                                    회원가입하러 가기
                                </MuiLink>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </Layout>
    );
};
