import React, { useState } from 'react'; // React
import { OptionOrder } from 'components/common/Gift/OptionOrder'; // 경로에 맞게 수정
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material'; // MUI Dialog 컴포넌트들
import { borderRadius } from '@mui/system';



export const GiftOrder = ({ title, price, options, setOptions }) => {
    const style = {
        display: "flex", 
        flexDirection: "column", 
        justifyContent: "space-between",
        alignItems: "flex-start",
        width: "340px",
        padding: "20px",
        borderRadius: "5px",
        border: "solid 1px black",
        margin: "10px"
    };

        // 수량 업데이트 함수
        const setNum = (id, newNum) => {
            setOptions((prevOptions) => 
                prevOptions.map(option => 
                    option.id === id ? { ...option, num: newNum } : option
                )
            );
        };

        const [open, setOpen] = useState(false); // Dialog 상태 관리
        const [currentOption, setCurrentOption] = useState(null); // 현재 삭제할 옵션 저장
    
        const handleClickOpen = (option) => {
            setCurrentOption(option);
            setOpen(true);
        };
    
        const handleClose = () => {
            setOpen(false);
        };
    
        const handleDelete = () => {
            if (currentOption) {
                setOptions((prevOptions) => 
                    prevOptions.filter(option => option.id !== currentOption.id) // ID에 해당하는 옵션 삭제
                );
            }
            handleClose();
        };



        return (
            <div style={style}>
                <div style={{ fontSize: "18px", fontWeight: "bold", letterSpacing: "5px" }}>{title}</div>
                <div style={{ fontSize: "18px", fontWeight: "bold", letterSpacing: "5px" }}>가격 : {price}</div>
                {options.map((option) => (
                    <OptionOrder 
                        key={option.id}
                        option={option.option} 
                        num={option.num} 
                        setNum={(newNum) => setNum(option.id, newNum)} // 수량 업데이트 함수
                        onDelete={() => handleClickOpen(option)} // 삭제 함수 연결
                    />
                ))}
    
                {/* Dialog 컴포넌트 */}
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>삭제 확인</DialogTitle>
                    <DialogContent>
                        <div>{currentOption ? currentOption.option + "을 삭제하시겠습니까?" : ""}</div>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">취소</Button>
                        <Button onClick={handleDelete} color="primary">삭제</Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
};
