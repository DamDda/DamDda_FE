// import React, { useState } from 'react';
// import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Typography } from '@mui/material';

// export const EditModal = ({ open, onClose, onSubmit, setError, error, currentPassword, instruction }) => {
//     const [password, setPassword] = useState('');

//     const handleSubmit = () => {
//         onSubmit(password);
//     };

//     return (
//         <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
//             <DialogTitle id="form-dialog-title">
//                 <Typography variant="h6" align="center">
//                     🔒 접근 암호 인증
//                 </Typography>
//             </DialogTitle>
//             <DialogContent>
//                 <Typography align="center">{instruction}</Typography>
//                 <TextField
//                     autoFocus
//                     margin="dense"
//                     id="password"
//                     label="Password"
//                     type="password"
//                     fullWidth
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     onKeyDown={(e) => {
//                         if (e.key === 'Enter') {
//                             handleSubmit();
//                         }
//                     }}
//                 />
//                 {/* 에러 메시지 표시 */}
//                 {error && (
//                     <Typography color="error" align="center" style={{ marginTop: '10px' }}>
//                         {error}
//                     </Typography>
//                 )}
//             </DialogContent>
//             <DialogActions>
//                 <Button onClick={onClose} color="secondary">
//                     취소
//                 </Button>
//                 <Button onClick={handleSubmit} color="primary">
//                     확인
//                 </Button>
//             </DialogActions>
//         </Dialog>
//     );
// };
