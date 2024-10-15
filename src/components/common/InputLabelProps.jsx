import React from 'react';
import { TextField } from '@mui/material';

export const InputLabelProps = ({ id, label, value, onChange, placeholder }) => {
  return (
    <TextField
      id={id} // input의 id 속성
      label={label} // input의 label
      variant="outlined" // outlined 스타일 적용
      value={value} // 입력된 값
      onChange={onChange} // 변경 이벤트 핸들러
      placeholder={placeholder} // placeholder 텍스트
      fullWidth // 전체 너비 사용
      InputLabelProps={{
        shrink: true, // 레이블을 항상 위로 표시
        style: { color: '#677cf9', fontWeight: 'bold' } // 레이블 색상과 스타일 변경
      }}
    />
  );
};
