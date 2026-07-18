/*************************************************************
    Name    : Manish Kumar
    Date    : 02/07/2026
    Purpose : Generic Confirmation / Alert / Warning Modal
*************************************************************/

import { Modal } from "react-bootstrap";

/**********************************
    Name    : Manish Kumar
    Date    : 02/07/2026
    Purpose : Modal Variant Type
************************************/
type ModalVariant = "confirm" | "logout" | "alert" | "warning";

/********************************************
    Name    : Manish Kumar
    Date    : 02/07/2026
    Purpose : Component Props
*********************************************/
interface ConfirmationModalProps {
    show: boolean;
    handleClose: () => void;
    variant: ModalVariant;
    onConfirm?: () => void;
    title?: string;       // Optional override
    message?: string;     // Optional override
    description?: string; // Optional override
}

/********************************************
    Name    : Manish Kumar
    Date    : 02/07/2026
    Purpose : Modal Variant Configuration
*********************************************/
const modalConfig = {
    confirm: {
        color: "#2e7d32",
        title: "New Record Inserted",
        icon: "ri-checkbox-circle-line",
        message: "New Record Inserted",
        description: "New Record Created Successfully",
        singleButton: true,
    },
    logout: {
        color: "#3E64AB",
        title: "Confirm Log Out",
        icon: "ri-logout-circle-r-line",
        message: "Confirm Log Out",
        description: "Please confirm if you want to log out",
        singleButton: false,
    },
    alert: {
        color: "#FF4C51",
        title: "Are you sure?",
        icon: "ri-alert-fill",
        message: "Are you sure?",
        description: "Are you sure you want to delete this record? This action cannot be undone.",
        singleButton: false,
    },
    warning: {
        color: "#f3c11b",
        title: "Required Fields",
        icon: "ri-error-warning-line", // Updated for correct semantics
        message: "Required Fields",
        description: "Required Fields must be Filled or Selected to continue.",
        singleButton: true,
    },
};

/****************************************************
    Name    : Manish Kumar
    Date    : 02/07/2026
    Purpose : Generic Confirmation Modal Component
*****************************************************/
export default function ConfirmationModal({
    show,
    handleClose,
    variant,
    onConfirm,
    title,
    message,
    description
}: ConfirmationModalProps) {

    /*****************************************************************
        Name    : Manish Kumar
        Date    : 02/07/2026
        Purpose : Get Selected Variant Configuration (with fallback)
    ******************************************************************/
    const config = modalConfig[variant] || modalConfig.confirm;

    // Resolve final text values prioritizing explicitly passed props
    const displayTitle = title ?? config.title;
    const displayMessage = message ?? config.message;
    const displayDescription = description ?? config.description;

    return (
        <Modal
            show={show}
            onHide={handleClose}
            centered
            backdrop="static"
            contentClassName="border-0"
            backdropClassName="aph-modal-backdrop"
        >

            <Modal.Header
                className="d-flex justify-content-between border-0"
                style={{
                    backgroundColor: config.color,
                    padding: "10px 15px",
                }}
            >
                <Modal.Title className="d-flex align-items-center fs-16 text-white">
                    <i className={`${config.icon} fs-20 me-2`}></i>
                    {displayTitle}
                </Modal.Title>

                <i
                    className="ri-close-circle-line fs-24 text-white"
                    style={{ cursor: "pointer" }}
                    onClick={handleClose}
                ></i>
            </Modal.Header>

            <Modal.Body className="text-center d-flex flex-column justify-content-center align-items-center">
                <div className="mb-2 mt-2">
                    <i
                        className={`${config.icon} fs-28 p-2 rounded-circle text-white`}
                        style={{ backgroundColor: config.color }}
                    ></i>
                </div>

                <h6 className="fs-16 fw-700">
                    {displayMessage}
                </h6>

                <p className="mb-0 text-muted fw-500 fs-13 text-center" style={{maxWidth:"350px"}}>
                    {displayDescription}
                </p>
            </Modal.Body>

            <div className="pb-3 pt-2 px-3 d-flex justify-content-center gap-4">
                {config.singleButton ? (
                    <button
                        type="button"
                        onClick={handleClose}
                        className="border-0 py-2 px-5 rounded-2 text-white"
                        style={{ backgroundColor: config.color }}
                    >
                        Ok
                    </button>
                ) : (
                    <>
                        <button
                            type="button"
                            onClick={onConfirm}
                            className="border-0 py-2 px-5 rounded-2 text-white"
                            style={{ backgroundColor: config.color }}
                        >
                            Yes
                        </button>
                        <button
                            type="button"
                            onClick={handleClose}
                            className="py-2 px-5 rounded-2"
                            style={{
                                backgroundColor: "#f5f5f5",
                                border: "1px solid #ddd",
                                color: "#333",
                            }}
                        >
                            No
                        </button>
                    </>
                )}
            </div>
        </Modal>
    );
}
