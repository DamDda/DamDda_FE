// import React, { useState } from "react";
// import {
//   Typography,
//   Card,
//   CardContent,
//   Button,
//   TextField,
//   IconButton,
//   Divider,
//   Avatar,
//   Chip,
// } from "@mui/material";
// import {
//   Delete,
//   Comment,
//   Edit,
//   ArrowDropDown,
//   ArrowDropUp,
// } from "@mui/icons-material";
// import { StandardInputBox } from "components/common/InputBoxComponent";
// import { QnASmallButtonComponent } from "components/common/ButtonComponent";
// import { useUser } from "UserContext";

// export const QnAReply = ({
//   reply,
//   questions,
//   setQuestions,
//   setReplyingTo,
//   replyContent,
//   setReplyContent,
// }) => {
//   const [isEditing, setIsEditing] = useState(false);
//   const [editedContent, setEditedContent] = useState(reply.content);
//   const [isReplying, setIsReplying] = useState(false);
//   const { user } = useUser();

//   const handleAddReply = (questionId, commentId) => {
//     if (!replyContent[commentId]) return;

//     const newReply = {
//       id: Date.now(),
//       author: user.nickname,
//       profileImage: user.profileImage,
//       date: new Date().toLocaleString(),
//       content: replyContent[commentId],
//     };

//     const updatedQuestions = questions.map((question) =>
//       question.id === questionId
//         ? {
//             ...question,
//             comments: question.comments.map((comment) =>
//               comment.id === commentId
//                 ? { ...comment, replies: [...comment.replies, newReply] }
//                 : comment
//             ),
//           }
//         : question
//     );

//     setQuestions(updatedQuestions);
//     setReplyContent((prev) => ({ ...prev, [commentId]: "" }));
//     setReplyingTo(null);
//     alert("답글이 등록되었습니다");
//   };

//   const handleDeleteReply = (questionId, commentId, replyId) => {
//     const updatedQuestions = questions.map((question) =>
//       question.id === questionId
//         ? {
//             ...question,
//             comments: question.comments.map((comment) =>
//               comment.id === commentId
//                 ? {
//                     ...comment,
//                     replies: comment.replies.filter(
//                       (reply) => reply.id !== replyId
//                     ),
//                   }
//                 : comment
//             ),
//           }
//         : question
//     );

//     setQuestions(updatedQuestions);
//     alert("답글이 삭제되었습니다");
//   };

//   const handleEditReply = (questionId, commentId, replyId, newContent) => {
//     const updatedQuestions = questions.map((question) =>
//       question.id === questionId
//         ? {
//             ...question,
//             comments: question.comments.map((comment) =>
//               comment.id === commentId
//                 ? {
//                     ...comment,
//                     replies: comment.replies.map((reply) =>
//                       reply.id === replyId
//                         ? { ...reply, content: newContent }
//                         : reply
//                     ),
//                   }
//                 : comment
//             ),
//           }
//         : question
//     );

//     setQuestions(updatedQuestions);
//     alert("답글이 수정되었습니다");
//   };

//   return (
//     <div
//       style={{
//         marginLeft: "20px",
//         marginTop: "10px",
//         paddingLeft: "20px",
//         borderLeft: "2px solid #ddd",
//       }}
//     >
//       <div style={{ display: "flex", alignItems: "flex-start" }}>
//         <Avatar
//           src={reply.profileImage}
//           alt={reply.author}
//           style={{ marginRight: "10px" }}
//         />
//         <div style={{ flexGrow: 1 }}>
//           <div style={{ display: "flex", justifyContent: "space-between" }}>
//             <Typography variant="subtitle1" style={{ fontWeight: "bold" }}>
//               {reply.author}
//             </Typography>
//             <div>
//               <IconButton onClick={() => setIsEditing(!isEditing)}>
//                 <Edit fontSize="small" />
//               </IconButton>
//               <IconButton onClick={handleDeleteReply}>
//                 <Delete fontSize="small" />
//               </IconButton>
//             </div>
//           </div>
//           <Typography variant="caption" color="textSecondary">
//             {reply.date}
//           </Typography>

//           {isEditing ? (
//             <div style={{ marginTop: "10px" }}>
//               <StandardInputBox
//                 value={editedContent}
//                 onChange={(e) => setEditedContent(e.target.value)}
//                 style={{ width: "100%" }}
//                 rows={2}
//               />
//               <div
//                 style={{
//                   marginTop: "10px",
//                   display: "flex",
//                   justifyContent: "flex-end",
//                 }}
//               >
//                 <QnASmallButtonComponent
//                   text={"저장"}
//                   onClick={handleEditReply}
//                   style={{ margin: "5px" }}
//                 />
//                 <QnASmallButtonComponent
//                   text={"취소"}
//                   onClick={() => setIsEditing(false)}
//                   style={{ margin: "5px" }}
//                 />
//               </div>
//             </div>
//           ) : (
//             <Typography
//               variant="body1"
//               color="textSecondary"
//               style={{ marginTop: "10px", whiteSpace: "pre-wrap" }}
//             >
//               {reply.content}
//             </Typography>
//           )}
//         </div>
//       </div>

//       {/* 답글 작성 영역 */}
//       {isReplying && (
//         <div style={{ marginTop: "10px" }}>
//           <StandardInputBox
//             placeholder="답글을 작성해주세요"
//             rows={2}
//             value={replyContent[comment.id] || ""}
//             onChange={(e) =>
//               setReplyContent((prev) => ({
//                 ...prev,
//                 [comment.id]: e.target.value,
//               }))
//             }
//             style={{
//               marginBottom: "10px",
//             }}
//           />
//           <QnASmallButtonComponent
//             onClick={handleAddReply}
//             text={"답글 작성"}
//           />
//         </div>
//       )}
//       <Button onClick={() => setIsReplying((prev) => !prev)}>
//         {isReplying ? "답글 취소" : "답글 달기"}
//       </Button>
//     </div>
//   );
// };
