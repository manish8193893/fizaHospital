import { useMemo, useState } from "react";

import Pagination from "../../GlobalHelpers/Pagination";
import GlobalGridTable from "../../GlobalHelpers/GlobalGridTable";
import type { ColumnActionRow } from "../../GlobalHelpers/GlobalGridTable";


import { Modal } from "react-bootstrap";

interface RadiologyResultTableData {
    radiologyDate: string;
    radiologyResult: string;
    status: "Pending" | "Completed" | "Cancelled";
    fileName: string;
}

export default function RadiologyResult() {

    /********************************************
        Name : Manish Kumar
        Date : 08/06/2026
        Purpose : STATE VARIABLES
    *********************************************/
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [itemsPerPage, setItemsPerPage] = useState<number>(10);

    const [showImageModal, setShowImageModal] =
        useState<boolean>(false);

    const [selectedFileName, setSelectedFileName] =
        useState<string>("");

    const ALL_RADIOLOGY_RESULT_DATA: RadiologyResultTableData[] = [
        {
            radiologyDate: "08/06/2026",
            radiologyResult: "Chest X-Ray Normal",
            status: "Completed",
            fileName: "Chest_Xray_001.dcm",
        },
        {
            radiologyDate: "07/06/2026",
            radiologyResult: "MRI Brain Review Pending",
            status: "Pending",
            fileName: "MRI_Brain_002.dcm",
        },
        {
            radiologyDate: "05/06/2026",
            radiologyResult: "CT Scan Cancelled",
            status: "Cancelled",
            fileName: "CT_Scan_003.dcm",
        },
    ];

    /********************************************
        Name : Radiology Result Table Columns
        Date : 08/06/2026
        Purpose : RADIOLOGY GRID COLUMNS
    *********************************************/
    const columns: ColumnActionRow<RadiologyResultTableData>[] = [
        {
            key: "radiologyDate",
            header: <>Radiology Date</>,
            className: "text-center",
            icon: <img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="SquareSortVertical" width={14} height={14} />,
            sortable: true,
            sortFunction: (a, b) =>
                a.radiologyDate.localeCompare(
                    b.radiologyDate
                ),
        },

        {
            key: "radiologyResult",
            header: <>Radiology Result</>,
            className: "text-center",
            icon: <img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="SquareSortVertical" width={14} height={14} />,
            sortable: true,
            sortFunction: (a, b) =>
                a.radiologyResult.localeCompare(
                    b.radiologyResult
                ),
        },

        {
            key: "status",
            header: <>Status</>,
            className: "text-center",
            icon: <img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="SquareSortVertical" width={14} height={14} />,
            sortable: true,
            sortFunction: (a, b) =>
                a.status.localeCompare(b.status),

            render: (row) => {

                const statusStyles = {
                    Pending: "status-pending",
                    Completed: "status-paid",
                    Cancelled: "status-cancelled",
                };

                return (
                    <div className="flex justify-center">
                        <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${statusStyles[row.status]}`}
                        >
                            {row.status}
                        </span>
                    </div>
                );
            },
        },

        {
            key: "file",
            header: <>File</>,
            className: "text-center",
            width: "280px",

            render: (row) => (
                <div className="d-flex justify-content-center align-items-center gap-2 ps-3">
                    <span
                        className="fw-500 text-primary"
                        style={{ cursor: "pointer" }}
                    >
                        {row.fileName}
                    </span>

                    <img src="/Assets/Icons/PDFIcon.svg" alt="PDFIcon" width={28} height={28} />
                </div>
            ),
        },

        {
            key: "action",
            header: <>Action</>,
            className: "text-center",
            width: "150px",

            render: (row) => (
                <div className="d-flex justify-content-center align-items-center gap-3">

                    <i
                        className="ri-eye-line fs-20 eye"
                        style={{ cursor: "pointer"}}
                        onClick={() => {
                            setSelectedFileName(
                                row.fileName
                            );
                            setShowImageModal(true);
                        }}
                    ></i>

                    <i
                        className="ri-file-download-line fs-20 printer"
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                            console.log(
                                "Download File:",
                                row.fileName
                            );
                        }}
                    ></i>

                </div>
            ),
        },
    ];

    /********************************************
        Name : Pagination
        Date : 08/06/2026
        Purpose : PAGINATION
    *********************************************/
    const totalPages = Math.ceil(
        ALL_RADIOLOGY_RESULT_DATA.length /
        itemsPerPage
    );

    const visibleTableData = useMemo(() => {

        const startIndex =
            (currentPage - 1) * itemsPerPage;

        const endIndex =
            startIndex + itemsPerPage;

        return ALL_RADIOLOGY_RESULT_DATA.slice(
            startIndex,
            endIndex
        );

    }, [
        currentPage,
        itemsPerPage,
    ]);

    return (
        <>
            <div className="d-flex flex-column mt-3">

                <h5 className="fw-500 text-black fs-18 mb-2">
                    Radiology Result
                </h5>

                <GlobalGridTable
                    data={visibleTableData}
                    columns={columns}
                    currentPage={currentPage}
                    pageSize={itemsPerPage}
                />

                <div>
                    <Pagination
                        totalPages={totalPages}
                        currentPage={currentPage}
                        onPageChange={(page) =>
                            setCurrentPage(page)
                        }
                        rowsPerPage={itemsPerPage}
                        onRowsPerPageChange={(rows) => {
                            setItemsPerPage(rows);
                            setCurrentPage(1);
                        }}
                    />
                </div>

            </div>

            <RadiologyImageModal
                show={showImageModal}
                fileName={selectedFileName}
                onHide={() => setShowImageModal(false)}
            />
        </>
    );
}

type RadiologyImageModalProps = {
    show: boolean;
    fileName: string;
    onHide: () => void;
};

function RadiologyImageModal({
    show,
    fileName,
    onHide,
}: RadiologyImageModalProps) {

    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
            size="lg"
            backdrop="static"
            contentClassName="aph-modal-content"
            backdropClassName="aph-modal-backdrop"
        >
            <Modal.Header className="aph-modal-header">

                <button
                    type="button"
                    className="border-0 rounded-circle d-flex align-items-center justify-content-center p-0"
                    style={{
                        position: "absolute",
                        right: "2.6rem",
                        top: "2.7rem",
                    }}
                    onClick={onHide}
                >
                    <img src="/Assets/Icons/CrossModalIcon.svg" alt="CrossModalIcon" />
                </button>

                <Modal.Title className="fs-18 fw-400 aph-modal-title">
                    {fileName}
                </Modal.Title>

            </Modal.Header>

            <Modal.Body className="p-0">
                <img src="/Assets/Icons/RadiologyResultImg.svg" alt="RadiologyResultImg" className="w-100 rounded" style={{maxHeight:"420px"}} />
            </Modal.Body>

        </Modal>
    );
}