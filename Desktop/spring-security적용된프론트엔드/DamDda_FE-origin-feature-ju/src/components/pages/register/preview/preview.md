<!-- 변경사항 중요한 사항은 여기에 기록해주세요! -->

미리보기 버튼

import React, { useState } from "react";
import { Button, Modal } from "@mui/material";
import Preview from "./preview/Preview"; // Preview 컴포넌트 가져오기

const Register = () => {
const [openPreview, setOpenPreview] = useState(false);

const handleOpen = () => setOpenPreview(true);
const handleClose = () => setOpenPreview(false);

return (
<div>
{/_ 다른 입력 필드들... _/}

      <Button variant="contained" onClick={handleOpen}>
        미리보기
      </Button>

      {/* 모달 창 */}
      <Modal open={openPreview} onClose={handleClose}>
        <div style={{ padding: "20px", background: "white", margin: "auto", width: "80%", maxWidth: "600px", borderRadius: "10px", top: "20%", position: "absolute" }}>
          <Preview />
          <Button variant="contained" onClick={handleClose}>
            닫기
          </Button>
        </div>
      </Modal>
    </div>

);
};

export default Register;
