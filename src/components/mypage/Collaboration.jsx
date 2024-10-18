// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useUser } from 'UserContext';
// import { SERVER_URL } from 'constants/URLs';

// export const Collab = () => {
//     const [title, setTitle] = useState('');
//     const [content, setContent] = useState('');
//     const [phoneNumber, setPhoneNumber] = useState('');
//     const [email, setEmail] = useState('');
//     const [user_id, setUser_Id] = useState(1); //작성자 아이디
//     const [collabDocList, setCollabDocList] = useState([]);
//     const [approval, setApproval] = useState('');
//     const [check, setCheck] = useState(false);
//     const [CollaborateDate, setCollaborateDate] = useState('');
//     const [name, setName] = useState('');
//     const [id, setId] = useState(0);
//     const [page, setPage] = useState(1);
//     const [size, setSize] = useState(10);
//     const [selectedCollab, setSelectedCollab] = useState([]);
//     const [collaborations, setCollaborations] = useState([]);
//     const [totalPages, setTotalPages] = useState(0);
//     const [totalElements, setTotalElements] = useState(0);
//     const [showModal, setShowModal] = useState(false);
//     const [selectedCollabs, setSelectedCollabs] = useState([]);
//     const { user } = useUser();
//     const handleCheckboxChange = (id) => {
//         setSelectedCollabs((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
//     };

//     const handleDownload = async (fileName) => {
//         console.log(fileName); //4604642e-2515-466e-aa78-a18afebf9a3b_성공성공오예.txt
//         try {
//             const response = await axios.get(`${SERVER_URL}/damdda/collab/download`, {
//                 params: { fileName },
//                 responseType: 'blob',
//                 withCredentials: true,
//             });

//             // 파일 다운로드 처리
//             const contentDisposition = response.headers['content-disposition'];
//             const downloadFileName =
//                 contentDisposition ? contentDisposition.split('filename=')[1].replace(/['"]/g, '') : fileName;

//             const url = window.URL.createObjectURL(new Blob([response.data]));
//             const link = document.createElement('a');
//             link.href = url;
//             link.setAttribute('download', downloadFileName);
//             document.body.appendChild(link);
//             link.click();
//             link.remove();
//             window.URL.revokeObjectURL(url);
//         } catch (error) {
//             console.error('파일 다운로드 중 에러 발생:', error);
//             alert('파일 다운로드에 실패했습니다.');
//         }
//     };

//     useEffect(() => {
//         handleReadRequest();
//         handleReadReceive();
//     }, [size, page]);

//     const handleAddCollab = async (e) => {
//         const formData = new FormData();

//         const jsonData = {
//             email: email,
//             phoneNumber: phoneNumber,
//             content: content,
//             user_id: user.id, //실제에서는 로그인한 사용자의 id
//             collaborationDTO: {
//                 title: title,
//                 approval: approval,
//                 CollaborateDate: CollaborateDate,
//                 name: name,
//             },
//         };
//         formData.append('jsonData', JSON.stringify(jsonData));

//         // 파일 추가
//         collabDocList.forEach((file, index) => {
//             formData.append(`collabDocList`, file);
//             console.log(`Appending file ${index + 1}:`, file.name);
//         });
//         console.log('handleAddCollab' + CollaborateDate);

//         try {
//             await axios.post(`${SERVER_URL}/damdda/collab/register/1`, formData, {
//                 //projectId 받아오기
//                 withCredentials: true,
//                 headers: {
//                     'Content-Type': 'multipart/form-data',
//                 },
//             });
//             alert('Collaboration registered successfully!');
//         } catch (error) {
//             console.log('register 과정 중 에러 발생 ' + error);
//         }
//     };

//     const handleReadDetail = async (index) => {
//         try {
//             const response = await axios.get(`${SERVER_URL}/damdda/collab/readDetail/${index}`, {
//                 withCredentials: true,
//             });
//             console.log(response.data);
//             setSelectedCollab(response.data);
//             setShowModal(true);
//         } catch (error) {
//             console.log('handleReadDetail에서 에러 발생 ' + error);
//         }
//     };
//     const handleCloseModal = () => {
//         setShowModal(false);
//         setSelectedCollab(null);
//     };

//     const handleReadReceive = async () => {
//         console.log('user_id' + user.id);
//         const response = await axios.get(
//             `${SERVER_URL}/damdda/collab/readListReceive`,
//             { params: { page, size, userId: user.id } },
//             {
//                 withCredentials: true,
//             }
//         );
//         const { dtoList, total, page: responsePage } = response.data;
//         console.log('dtoList:', dtoList);
//         setCollaborations(dtoList);
//         setTotalElements(total);
//         setTotalPages(Math.ceil(total / size));
//         //setPage(responsePage + 1);
//     };

//     const handleReadRequest = async () => {
//         console.log('user_id' + user.id);
//         const response = await axios.get(
//             '/collab/readListRequest',
//             { params: { page, size, userId: user.id } },
//             {
//                 withCredentials: true,
//             }
//         );
//         const { dtoList, total, page: responsePage } = response.data;
//         console.log('dtoList:', dtoList);
//         setCollaborations(dtoList);
//         setTotalElements(total);
//         setTotalPages(Math.ceil(total / size));
//         //setPage(responsePage + 1);
//     };

//     const handleDelete = async (id) => {
//         await axios.delete(`${SERVER_URL}/damdda/collab/delete`, {
//             params: { cno: id, user_id: user.id },
//         });
//         alert('선택된 협업이 삭제되었습니다.');
//         /*if처리하면 좋을 듯 */
//         handleReadRequest();
//         handleReadReceive();
//     };
//     /*협업받은 제안자일 때만 approval, reject 가능하도록 설정 */
//     const handleApproval = async () => {
//         try {
//             await axios.put(`${SERVER_URL}/damdda/collab/approval`, selectedCollabs, {
//                 withCredentials: true,
//             });
//             alert('선택된 협업들이 승인되었습니다.');
//             setApproval('승인');
//             handleReadReceive(); // 목록 새로고침
//             setSelectedCollabs([]); // 선택 초기화
//             // 새로고침 트리거
//         } catch (error) {
//             console.error('승인 처리 중 에러 발생:', error);
//             alert('승인 처리에 실패했습니다.');
//         }
//     };
//     const handleReject = async () => {
//         try {
//             await axios.put(`${SERVER_URL}/damdda/collab/reject`, selectedCollabs, {
//                 withCredentials: true,
//             });
//             alert('선택된 협업들이 거절되었습니다.');
//             setApproval('거절');
//             handleReadReceive(); // 목록 새로고침
//             setSelectedCollabs([]); // 선택 초기화
//             // 새로고침 트리거
//         } catch (error) {
//             console.error('승인 처리 중 에러 발생:', error);
//             alert('승인 처리에 실패했습니다.');
//         }
//     };
//     const handleFileChange = (e) => {
//         const files = Array.from(e.target.files);
//         setCollabDocList(files);

//         // 파일 정보 로깅
//         files.forEach((file, index) => {
//             console.log(`File ${index + 1}:`, {
//                 name: file.name,
//                 type: file.type,
//                 size: file.size + ' bytes',
//             });
//         });
//     };

//     const handlePageChange = (page) => {
//         setPage(page);
//     };
//     // 상세 정보 모달 컴포넌트
//     const DetailModal = () => {
//         if (!selectedCollab) return null;

//         return (
//             <div className="modal">
//                 <div className="modal-content">
//                     <h2>{selectedCollab.title}</h2>
//                     <p>이름: {selectedCollab.collaborationDTO.name}</p>
//                     <p>이메일: {selectedCollab.email}</p>
//                     <p>전화번호: {selectedCollab.phoneNumber}</p>
//                     <p>내용: {selectedCollab.content}</p>
//                     <p>협업 날짜: {selectedCollab.collaborationDTO.CollaborateDate}</p>
//                     <p>승인 상태: {selectedCollab.collaborationDTO.approval}</p>
//                     {selectedCollab.collabDocList && selectedCollab.collabDocList.length > 0 && (
//                         <div>
//                             <h3>첨부 파일:</h3>
//                             <ul>
//                                 {selectedCollab.collabDocList.map((fileName, index) => (
//                                     <li onClick={() => handleDownload(fileName)} key={index}>
//                                         {fileName}
//                                     </li>
//                                 ))}
//                             </ul>
//                         </div>
//                     )}
//                     <button onClick={handleCloseModal}>닫기</button>
//                 </div>
//             </div>
//         );
//     };

//     return (
//         <>
//             {/* <form onSubmit={handleAddCollab}>
//         <input
//           type="email"
//           value={email}
//           onChange={e => setEmail(e.target.value)}
//           placeholder="Email"
//           required
//         />
//         <input
//           type="tel"
//           value={phoneNumber}
//           onChange={e => setPhoneNumber(e.target.value)}
//           placeholder="Phone Number"
//           required
//         />
//         <textarea
//           value={content}
//           onChange={e => setContent(e.target.value)}
//           placeholder="Content"
//           required
//         />
//         <input
//           type="text"
//           value={title}
//           onChange={e => setTitle(e.target.value)}
//           placeholder="Title"
//           required
//         />
//         <label>
//           <input type="text" onChange={e => setCheck(e.target.value)} />
//           Approval
//         </label>
//         <input
//           type="date"
//           value={CollaborateDate}
//           onChange={e => setCollaborateDate(e.target.value)}
//           required
//         />
//         <input
//           type="text"
//           value={name}
//           onChange={e => setName(e.target.value)}
//           placeholder="Name"
//           required
//         />
//         <input type="file" multiple onChange={handleFileChange} />
//         <button type="submit">Register Collaboration</button>
//       </form>

//         <div>
//             <br /> <br /> <br /> <br />
//         </div> */}

//             <h2>Collaboration List</h2>
//             <table>
//                 <thead>
//                     <tr>
//                         <th>Title</th>
//                         <th>Name</th>
//                         <th>Collaborate Date</th>
//                         <th>Approval</th>
//                         <th>Actions</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {collaborations != null &&
//                         collaborations.map((collab) => (
//                             <tr key={collab.id}>
//                                 <td>
//                                     <input
//                                         type="checkbox"
//                                         checked={selectedCollabs.includes(collab.id)}
//                                         onChange={() => handleCheckboxChange(collab.id)}
//                                     />
//                                 </td>
//                                 <td>{collab.title}</td>
//                                 <td>{collab.name}</td>
//                                 <td>{collab.CollaborateDate}</td>
//                                 <td>{collab.approval}</td>
//                                 <td>
//                                     <button onClick={() => handleReadDetail(collab.id)}>View Details</button>
//                                     <button onClick={() => handleDelete(collab.id)}>Delete</button>
//                                 </td>
//                             </tr>
//                         ))}
//                     {collaborations == null && <tr></tr>}
//                 </tbody>
//             </table>

//             <div>
//                 <br /> <br /> <br /> <br />
//             </div>

//             <button onClick={handleApproval} disabled={selectedCollabs.length === 0}>
//                 선택된 항목 승인
//             </button>

//             <div>
//                 <br /> <br /> <br /> <br />
//             </div>

//             <button onClick={handleReject} disabled={selectedCollabs.length === 0}>
//                 선택된 항목 거절
//             </button>

//             <div>
//                 <br /> <br /> <br /> <br />
//             </div>

//             <div>
//                 <button onClick={() => handlePageChange(page - 1)} disabled={page === 1}>
//                     Previous
//                 </button>
//                 <span>Page {page}</span>
//                 <button onClick={() => handlePageChange(page + 1)}>Next</button>
//             </div>

//             <div>
//                 <br /> <br /> <br /> <br />
//             </div>

//             {showModal && <DetailModal />}
//         </>
//     );
// };
