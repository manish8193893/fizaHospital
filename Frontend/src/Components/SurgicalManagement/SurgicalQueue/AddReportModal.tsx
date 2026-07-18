import { useState } from "react";
import { Modal } from "react-bootstrap";

import CustomFormDropdown from "../../../GlobalHelpers/CustomFormDropdown";
import TinyEditor from "../../TinyEditor";

interface DropdownOption {
    id: string;
    name: string;
}

interface AddReportModalProps {
    show: boolean;
    handleClose: () => void;
}

export function AddReportModal({
    show,
    handleClose,
}: AddReportModalProps) {

    const [report, setReport] = useState("");
    const [operationName, setOperationName] = useState("");
    const [reportType, setReportType] = useState<DropdownOption | null>(null);

    const REPORT_TYPE_OPTIONS: DropdownOption[] = [
        { id: "medical_report", name: "Medical Report", },
        { id: "operative_report", name: "Operative Report", },
        { id: "anesthesia_report", name: "Anesthesia Report", },
    ];

    /********************************************
        HANDLE ADD
    *********************************************/
    const handleAdd = () => {

        const payload = {
            operationName,
            reportType,
            report,
        };

        console.log("Add Report Payload :", payload);

        handleClose();
    };

    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                centered
                size="lg"
                backdrop="static"
                contentClassName="aph-modal-content"
                backdropClassName="aph-modal-backdrop"
            >

                {/* HEADER */}

                <Modal.Header className="aph-modal-header mb-3">

                    <button
                        type="button"
                        className="border-0 rounded-circle d-flex align-items-center justify-content-center p-0 outline-0"
                        style={{
                            position: "absolute",
                            right: "2.6rem",
                            top: "2.7rem",
                        }}
                        onClick={handleClose}
                        aria-label="Close"
                    >
                        <img src="/Assets/Icons/CrossModalIcon.svg" alt="CrossModalIcon" />
                    </button>

                    <Modal.Title className="fs-18 fw-400 aph-modal-title">
                        Add Report
                    </Modal.Title>

                </Modal.Header>

                <Modal.Body className="p-0">

                    <form>

                        {/* ROW 1 */}

                        <div className="formRow">

                            {/* Operation Name */}

                            <div className="formGroup">

                                <label className="customLabel">
                                    Operation Name
                                    <span className="text-danger"> *</span>
                                </label>

                                <div className="inputWrapper">

                                    <input
                                        type="text"
                                        className="customInput"
                                        placeholder="Enter Operation Name"
                                        value={operationName}
                                        onChange={(e) =>
                                            setOperationName(e.target.value)
                                        }
                                    />

                                    <i className="ri-file-text-line"></i>

                                </div>

                            </div>

                            {/* Report Type */}

                            <div className="formGroup">

                                <label className="customLabel">
                                    Report Type
                                    <span className="text-danger"> *</span>
                                </label>

                                <CustomFormDropdown
                                    options={REPORT_TYPE_OPTIONS}
                                    value={reportType}
                                    onChange={(value) =>
                                        setReportType(value)
                                    }
                                    placeholder="Select Report Type"
                                />

                            </div>

                        </div>

                        {/* ROW 2 */}

                        <div className="formRow">

                            <div className="formGroup fullWidth">

                                <label className="customLabel">
                                    Reports
                                </label>

                                <div className="inputWrapper">

                                    <TinyEditor
                                        value={report}
                                        onChange={setReport}
                                    />

                                </div>

                            </div>

                        </div>

                        {/* BUTTONS */}

                        <div className="d-flex justify-content-between border-0 pb-0 mt-5">

                            <button
                                type="button"
                                className="aph-modal-btn-height border-0 outline-0 col-md-7 bg-blue text-white fs-18 fw-400"
                                onClick={handleAdd}
                            >
                                Add
                            </button>

                            <button
                                type="button"
                                className="aph-modal-btn-height border-0 outline-0 col-md-4 border-red text-red bg-white fs-18 fw-400"
                                onClick={handleClose}
                            >
                                Cancel
                            </button>

                        </div>

                    </form>

                </Modal.Body>

            </Modal>
        </>
    );
}