// import { Modal } from "react-bootstrap";

// interface ConfirmationModalProps {
//     show: boolean;
//     handleClose: () => void;
// }


// export default function ConfirmationModal({ show, handleClose, }: ConfirmationModalProps) {
//     return (
//         <>
//             <Modal
//                 show={show}
//                 onHide={handleClose}
//                 centered
//                 backdrop="static"
//                 contentClassName="border-0"
//                 dialogClassName=""
//             >
//                 {/* HEADER */}
//                 <Modal.Header
//                     className="d-flex justify-content-between bg-blue border-0"
//                     style={{ padding: "10px 15px" }}
//                 >
//                     <Modal.Title className="d-flex fs-16 align-items-center text-white">
//                         Confirm Log Out
//                         <i className="ri-logout-circle-r-line fs-20 ms-2"></i>
//                     </Modal.Title>
//                     <i
//                         className="ri-close-circle-line fs-24 text-white"
//                         style={{ cursor: "pointer" }}
//                         onClick={handleClose}
//                     ></i>
//                 </Modal.Header>

//                 {/* BODY */}
//                 <Modal.Body className="text-center">
//                     <div className="my-3">
//                         <i className="ri-logout-circle-r-line fs-24 p-2 bg-blue rounded-circle text-white my-3"></i>
//                     </div>
//                     <h6 className="fs-16 fw-700">Confirm Log Out</h6>
//                     <p className="mb-0 text-muted fw-500 fs-14">Please confirm if you want to log out</p>
//                 </Modal.Body>

//                 {/* FOOTER */}
//                 <div className="py-3 px-3 d-flex justify-content-center gap-4">
//                     <button
//                         type="button"
//                         className="bg-blue border-0 py-2 px-5 rounded-2 text-white"
//                     >
//                         Yes
//                     </button>
//                     <button
//                         type="button"
//                         onClick={handleClose}
//                         className="py-2 px-5 rounded-2"
//                         style={{ backgroundColor: "#f5f5f5", border: "1px solid #ddd", color: "#333" }}
//                     >
//                         No
//                     </button>
//                 </div>
//             </Modal>

//         </>
//     )
// }
