import { useMemo, useState } from "react";
import { Modal } from "react-bootstrap";

import Pagination from "../../GlobalHelpers/Pagination";
import GlobalGridTable from "../../GlobalHelpers/GlobalGridTable";
import DateFilterCalendar from "../../GlobalHelpers/DateFilterCalendar";
import type { ColumnActionRow } from "../../GlobalHelpers/GlobalGridTable";




import '../../styles/HumanResource.css'


interface CertificateTableData {
    certificateId: string;
    certificateName: string;
    certificateDate: string;
    certificateFile: string;
}

export default function DocumentsTab() {

    /********************************************
        Name : Edit Mode State
        Date : 11/06/2026
        Purpose : ENABLE / DISABLE FORM
    *********************************************/
    const [isEditMode, setIsEditMode] = useState(false);

    /********************************************
        Name : Modal State
        Date : 11/06/2026
        Purpose : HANDLE DOCUMENT MODAL
    *********************************************/
    const [showDocumentModal, setShowDocumentModal] = useState(false);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [itemsPerPage, setItemsPerPage] = useState<number>(10);

    /********************************************
        Name : Documentation State
        Date : 11/06/2026
        Purpose : STORE DOCUMENT INFORMATION
    *********************************************/
    const [documentInfo, setDocumentInfo] = useState({
        idNumber: "1020304050",
    });

    const [idCardFile, setIdCardFile] = useState<File | null>(null);

    const [contractFile, setContractFile] = useState<File | null>(null);

    /********************************************
        Name : Issuing Date State
        Date : 11/06/2026
        Purpose : STORE ISSUING DATE
    *********************************************/
    const [issuingDate, setIssuingDate] = useState<Date | null>(
        new Date("2025-01-01")
    );

    const [showIssuingDateCalendar, setShowIssuingDateCalendar] = useState(false);

    /********************************************
        Name : Certificate State
        Date : 11/06/2026
        Purpose : STORE CERTIFICATE DETAILS
    *********************************************/

    const ALL_CERTIFICATE_DATA: CertificateTableData[] = [
        {
            certificateId: "CERT-001",
            certificateName: "Medical Fitness Certificate",
            certificateDate: "08/06/2026",
            certificateFile: "fitness_certificate.pdf",
        },
        {
            certificateId: "CERT-002",
            certificateName: "Training Completion Certificate",
            certificateDate: "07/06/2026",
            certificateFile: "training_certificate.pdf",
        },
        {
            certificateId: "CERT-003",
            certificateName: "Work Authorization Certificate",
            certificateDate: "05/06/2026",
            certificateFile: "authorization_certificate.pdf",
        },
    ];

    /********************************************
        TABLE COLUMNS
    *********************************************/
    const columns: ColumnActionRow<CertificateTableData>[] = [
        {
            key: "certificateId",
            header: <>Certificate ID</>,
            className: "text-center",
            icon: <img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="SquareSortVertical" width={14} height={14} />,
            sortable: true,
            sortFunction: (a, b) =>
                a.certificateId.localeCompare(b.certificateId),
        },
        {
            key: "certificateName",
            header: <>Certificate Name</>,
            className: "text-center",
            icon: <img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="SquareSortVertical" width={14} height={14} />,
            sortable: true,
            sortFunction: (a, b) =>
                a.certificateName.localeCompare(b.certificateName),
        },
        {
            key: "certificateDate",
            header: <>Certificate Date</>,
            className: "text-center",
            icon: <img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="SquareSortVertical" width={14} height={14} />,
            sortable: true,
            sortFunction: (a, b) =>
                a.certificateDate.localeCompare(b.certificateDate),
        },
        {
            key: "certificateFile",
            header: <>Certificate File</>,
            className: "text-center",
            icon: <img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="SquareSortVertical" width={14} height={14} />,
            render: (row) => (
                <span className="text-primary fw-500" style={{ cursor: "pointer" }}>
                    {row.certificateFile}
                </span>
            ),
        },
        {
            key: "action",
            header: <>Action</>,
            className: "text-center",
            width: "180px",
            render: (row) => (
                <div className="d-flex justify-content-center align-items-center gap-3">

                    {/* Edit Icon */}
                    <span
                        className="edit"
                        style={{ cursor: "pointer" }}
                        onClick={() => console.log("Edit:", row.certificateId)}
                    >
                        <i className="ri-pencil-ai-line fs-18"></i>
                    </span>

                    {/* Trash Icon */}
                    <span
                        className="delete"
                        style={{ cursor: "pointer" }}
                        onClick={() => console.log("Delete:", row.certificateId)}
                    >
                        <i className="ri-delete-bin-7-line fs-18"></i>
                    </span>
                </div>
            ),
        },
    ];

    /********************************************
        PAGINATION LOGIC
    *********************************************/
    const totalPages = Math.ceil(
        ALL_CERTIFICATE_DATA.length / itemsPerPage
    );

    const visibleTableData = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;

        return ALL_CERTIFICATE_DATA.slice(startIndex, endIndex);
    }, [currentPage, itemsPerPage]);

    /********************************************
        Name : Handle Edit
        Date : 11/06/2026
        Purpose : ENABLE EDIT MODE
    *********************************************/
    const handleEdit = () => {
        setIsEditMode(true);
    };

    /********************************************
        Name : Handle Cancel
        Date : 11/06/2026
        Purpose : DISABLE EDIT MODE
    *********************************************/
    const handleCancel = () => {
        setIsEditMode(false);
    };

    /********************************************
        Name : Handle Update
        Date : 11/06/2026
        Purpose : UPDATE DOCUMENT DATA
    *********************************************/
    const handleUpdate = () => {

        const payload = {
            documentInfo,
            issuingDate,
            idCardFile,
            contractFile,
        };

        console.log(
            "Updated Documents :",
            payload
        );

        setIsEditMode(false);
    };

    /********************************************
        Name : Handle Document Input
        Date : 11/06/2026
        Purpose : HANDLE DOCUMENT INPUTS
    *********************************************/
    const handleDocumentInputChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {

        const { name, value } = e.target;

        setDocumentInfo((prev) => ({
            ...prev,
            [name]: value,
        }));
    };


    return (

        <div className="formContainer p-2 rounded-1 position-relative">

            {/* Header */}

            <div className="d-flex justify-content-between mb-4">

                <h5 className="fs-18 fw-500">
                    Documents
                </h5>

                <div className="d-flex gap-2">

                    {!isEditMode && (

                        <div className="Plus-btn" onClick={() => setShowDocumentModal(true)}>
                            <img src="/Assets/Icons/WhitePlusCircle.svg" alt="WhitePlusCircle" width={22} height={22} />
                            <div className='text-white fs-16 fw-400'>New Document</div>
                        </div>

                    )}

                    {!isEditMode && (

                        <button className="back-btn" onClick={handleEdit}>
                            <i className="ri-pencil-ai-line fs-16"></i>
                        </button>
                    )}

                </div>

            </div>

            {/* Row 1 */}

            <div className="formRow">

                <div className="formGroup">

                    <label className="customLabel">
                        ID Card{" "}<span className='text-danger'>*</span>
                    </label>

                    <div
                        className="uploadBox"
                        onClick={() => {

                            if (!isEditMode)
                                return;

                            document
                                .getElementById(
                                    "idCardInput"
                                )
                                ?.click();
                        }}
                    >
                        {
                            idCardFile
                                ? idCardFile.name
                                : "Manish_ID_Card.pdf"
                        }
                    </div>

                    <input
                        id="idCardInput"
                        type="file"
                        style={{
                            display:
                                "none",
                        }}
                        onChange={(e) => {

                            const file =
                                e.target
                                    .files?.[0];

                            if (file)
                                setIdCardFile(
                                    file
                                );
                        }}
                    />

                </div>

                <div className="formGroup">

                    <label className="customLabel">
                        Contract{" "}<span className='text-danger'>*</span>
                    </label>

                    <div
                        className="uploadBox"
                        onClick={() => {

                            if (!isEditMode)
                                return;

                            document
                                .getElementById(
                                    "contractInput"
                                )
                                ?.click();
                        }}
                    >
                        {
                            contractFile
                                ? contractFile.name
                                : "Manish_Contract.pdf"
                        }
                    </div>

                    <input
                        id="contractInput"
                        type="file"
                        style={{
                            display:
                                "none",
                        }}
                        onChange={(e) => {

                            const file =
                                e.target
                                    .files?.[0];

                            if (file)
                                setContractFile(
                                    file
                                );
                        }}
                    />

                </div>

            </div>

            {/* Row 2 */}

            <div className="formRow">

                <div className="formGroup">

                    <label className="customLabel">
                        ID Number{" "}<span className='text-danger'>*</span>
                    </label>

                    <div className="inputWrapper">

                        <input
                            type="text"
                            name="idNumber"
                            value={
                                documentInfo.idNumber
                            }
                            onChange={
                                handleDocumentInputChange
                            }
                            disabled={
                                !isEditMode
                            }
                            className="customInput"
                        />

                        <i className="ri-fingerprint-line"></i>

                    </div>

                </div>

                <div className="formGroup">

                    <label className="customLabel">
                        Issuing Date{" "}<span className='text-danger'>*</span>
                    </label>

                    <div
                        style={{ position: "relative" }}
                    >

                        <div
                            className="customInput d-flex align-items-center"
                            onClick={() => {
                                if (!isEditMode) return;
                                setShowIssuingDateCalendar(
                                    !showIssuingDateCalendar
                                );
                            }}
                            style={{
                                cursor: isEditMode ? "pointer" : "not-allowed"
                            }}
                        >
                            {issuingDate
                                ? `${String(issuingDate.getDate()).padStart(2, "0")}/${String(
                                    issuingDate.getMonth() + 1
                                ).padStart(2, "0")}/${issuingDate.getFullYear()}`
                                : "DD/MM/YYYY"}
                        </div>

                        {showIssuingDateCalendar && isEditMode && (
                            <div style={{
                                position: "absolute",
                                top: "100%",
                                left: 0,
                                zIndex: 1000
                            }}>
                                <DateFilterCalendar
                                    selectedDate={issuingDate}
                                    onDateSelect={(date) => {
                                        setIssuingDate(date);
                                        setShowIssuingDateCalendar(false);
                                    }}
                                />
                            </div>
                        )}

                    </div>
                </div>
            </div>

            {/* Certificate Section */}
            <div className="d-flex flex-column mt-3">

                <h5 className="fw-500 text-black fs-18 mb-2">
                    Certificate List
                </h5>

                {/* TABLE */}
                <GlobalGridTable
                    data={visibleTableData}
                    columns={columns}
                    currentPage={currentPage}
                    pageSize={itemsPerPage}
                />

                {/* PAGINATION */}
                <Pagination
                    totalPages={totalPages}
                    currentPage={currentPage}
                    onPageChange={(page) => setCurrentPage(page)}
                    rowsPerPage={itemsPerPage}
                    onRowsPerPageChange={(rows) => {
                        setItemsPerPage(rows);
                        setCurrentPage(1);
                    }}
                />
            </div>


            {isEditMode && (

                <div className="d-flex justify-content-between border-0 pb-0 mt-5">

                    <button
                        type="button"
                        className="aph-modal-btn-height outline-0 col-md-4 border border-danger text-danger bg-white fs-18 fw-400"
                        onClick={handleCancel}
                    >
                        Cancel
                    </button>

                    <button
                        type="button"
                        className="aph-modal-btn-height border-0 outline-0 col-md-7 bg-blue text-white fs-18 fw-400"
                        onClick={handleUpdate}
                    >
                        Update
                    </button>

                </div>

            )}

            <DocumentModal
                show={showDocumentModal}
                handleClose={() => setShowDocumentModal(false)}
            />
        </div>
    )
}


interface DocumentModalProps {
    show: boolean;
    handleClose: () => void;
}

export function DocumentModal({
    show,
    handleClose,
}: DocumentModalProps) {

    const [certificateName, setCertificateName] = useState("");
    const [certificateId, setCertificateId] = useState("");
    const [certificateDate, setCertificateDate] = useState<Date | null>(null);
    const [showCertificateCalendar, setShowCertificateCalendar] = useState(false);
    const [certificateFile, setCertificateFile] = useState<File | null>(null);

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
                <Modal.Header className='aph-modal-header mb-3'>
                    <button
                        type="button"
                        className="border-0 rounded-circle d-flex align-items-center justify-content-center p-0 outline-0"
                        style={{ position: 'absolute', right: '2.6rem', top: '2.7rem' }}
                        onClick={handleClose}
                        aria-label="Close"
                    >
                        <img src="/Assets/Icons/CrossModalIcon.svg" alt="CrossModalIcon" />
                    </button>
                    <Modal.Title className='fs-18 fw-400 aph-modal-title'>
                        New Documents
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className='p-0'>
                    <form>

                        {/* ROW 1 */}
                        <div className="formRow">

                            {/* Certificate Name */}
                            <div className="formGroup">
                                <label className="customLabel">
                                    Certificate Name{" "}<span className='text-danger'>*</span>
                                </label>

                                <div className="inputWrapper">
                                    <input
                                        type="text"
                                        className="customInput"
                                        placeholder="Enter certificate name"
                                        value={certificateName}
                                        onChange={(e) => setCertificateName(e.target.value)}
                                    />
                                    <i className="ri-file-text-line"></i>
                                </div>
                            </div>

                            {/* Certificate Date */}
                            <div className="formGroup">
                                <label className="customLabel">
                                    Certificate Date{" "}<span className='text-danger'>*</span>
                                </label>

                                <div style={{ position: "relative" }}>

                                    <div
                                        className="customInput d-flex align-items-center"
                                        onClick={() =>
                                            setShowCertificateCalendar(!showCertificateCalendar)
                                        }
                                        style={{
                                            cursor: "pointer"
                                        }}
                                    >
                                        {certificateDate
                                            ? `${String(certificateDate.getDate()).padStart(2, "0")}/${String(
                                                certificateDate.getMonth() + 1
                                            ).padStart(2, "0")}/${certificateDate.getFullYear()}`
                                            : "DD/MM/YYYY"}
                                    </div>

                                    {showCertificateCalendar && (
                                        <div style={{
                                            position: "absolute",
                                            top: "100%",
                                            left: 0,
                                            zIndex: 1000
                                        }}>
                                            <DateFilterCalendar
                                                selectedDate={certificateDate}
                                                onDateSelect={(date) => {
                                                    setCertificateDate(date);
                                                    setShowCertificateCalendar(false);
                                                }}
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>

                        </div>

                        {/* ROW 2 */}
                        <div className="formRow">

                            {/* Certificate ID */}
                            <div className="formGroup">
                                <label className="customLabel">
                                    Certificate ID{" "}<span className='text-danger'>*</span>
                                </label>

                                <div className="inputWrapper">
                                    <input
                                        type="text"
                                        className="customInput"
                                        placeholder="Enter certificate ID"
                                        value={certificateId}
                                        onChange={(e) => setCertificateId(e.target.value)}
                                    />
                                    <i className="ri-fingerprint-line"></i>
                                </div>
                            </div>

                            {/* Certificate File */}
                            <div className="formGroup">
                                <label className="customLabel">
                                    Certificate File{" "}<span className='text-danger'>*</span>
                                </label>

                                <div
                                    className="uploadBox"
                                    onClick={() => {
                                        document.getElementById("certificateFileInput")?.click();
                                    }}
                                >
                                    {certificateFile
                                        ? certificateFile.name
                                        : "Upload Certificate File"}
                                </div>

                                <input
                                    id="certificateFileInput"
                                    type="file"
                                    style={{ display: "none" }}
                                    onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        if (file) setCertificateFile(file);
                                    }}
                                />
                            </div>

                        </div>

                        {/* BUTTONS */}
                        <div className="d-flex justify-content-between border-0 pb-0 mt-5">

                            <button
                                type="button"
                                className="aph-modal-btn-height border-0 outline-0 col-md-7 bg-blue text-white fs-18 fw-400"
                                onClick={() => {
                                    console.log({
                                        certificateName,
                                        certificateId,
                                        certificateDate,
                                        certificateFile
                                    });
                                }}
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
    )
}