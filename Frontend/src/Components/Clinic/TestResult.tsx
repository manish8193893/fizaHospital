import { useMemo, useState } from "react";

import Pagination from "../../GlobalHelpers/Pagination";
import GlobalGridTable from "../../GlobalHelpers/GlobalGridTable";
import type { ColumnActionRow } from "../../GlobalHelpers/GlobalGridTable";

import PDFIcon from '../../../public/Assets/Icons/PDFIcon.svg?react';

import { Modal } from "react-bootstrap";

interface TestResultTableData {
    testDate: string;
    testResult: string;
    status: "Pending" | "Completed" | "Cancelled";
    testName: string;
}

export default function TestResult() {

    /********************************************
        Name : Manish Kumar
        Date : 08/06/2026
        Purpose : STATE VARIABLES
    *********************************************/
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [itemsPerPage, setItemsPerPage] = useState<number>(10);
    const [showPDFModal, setShowPDFModal] = useState(false);
    const [selectedTestName, setSelectedTestName] = useState<string>("");

    const ALL_TEST_RESULT_DATA: TestResultTableData[] = [
        {
            testDate: "08/06/2026",
            testResult: "Normal",
            status: "Completed",
            testName: "Blood Test Report.pdf",
        },
        {
            testDate: "07/06/2026",
            testResult: "Awaiting Review",
            status: "Pending",
            testName: "MRI Scan Report.pdf",
        },
        {
            testDate: "05/06/2026",
            testResult: "Cancelled by Lab",
            status: "Cancelled",
            testName: "Urine Analysis Report.pdf",
        },
    ];

    /********************************************
        Name : Test Result Table Columns
        Date : 08/06/2026
        Purpose : TEST RESULT GRID COLUMNS
    *********************************************/
    const columns: ColumnActionRow<TestResultTableData>[] = [
        {
            key: "testDate",
            header: <>Test Date</>,
            className: "text-center",
            icon: <img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="SquareSortVertical" width={14} height={14} />,
            sortable: true,
            sortFunction: (a, b) =>
                a.testDate.localeCompare(b.testDate),
        },

        {
            key: "testResult",
            header: <>Test Result</>,
            className: "text-center",
            icon: <img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="SquareSortVertical" width={14} height={14} />,
            sortable: true,
            sortFunction: (a, b) =>
                a.testResult.localeCompare(b.testResult),
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
            key: "action",
            header: <>Action</>,
            className: "text-center",
            width: "250px",

            render: (row) => (
                <div
                    className="d-flex justify-content-start ps-4 align-items-center gap-2"
                >

                    <span
                        className="fw-500 text-primary"
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                            console.log(
                                "Open Test Report:",
                                row.testName
                            );
                            setSelectedTestName(row.testName);
                            setShowPDFModal(true);
                        }}
                    >
                        {row.testName}
                    </span>
                    <PDFIcon width={30} height={30} />
                </div>
            ),
        },
    ];

    /********************************************
        Name : Manish Kumar
        Date : 08/06/2026
        Purpose : PAGINATION
    *********************************************/
    const totalPages = Math.ceil(
        ALL_TEST_RESULT_DATA.length / itemsPerPage
    );

    const visibleTableData = useMemo(() => {

        const startIndex =
            (currentPage - 1) * itemsPerPage;

        const endIndex =
            startIndex + itemsPerPage;

        return ALL_TEST_RESULT_DATA.slice(
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
                    Test Result
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
            <PDFModal
                show={showPDFModal}
                testName={selectedTestName}
                onHide={() => {
                    setShowPDFModal(false);
                }}
            />
        </>
    )
}


type PDFModalProps = {
    show: boolean;
    testName: string;
    onHide: () => void;
};

export function PDFModal({
    show,
    testName,
    onHide,
}: PDFModalProps) {

    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
            backdrop="static"
            contentClassName="aph-modal-content"
            backdropClassName="aph-modal-backdrop"
        >
            {/* Modal Top Navigation Bar */}
            <Modal.Header className="aph-modal-header mb-3">
                <button
                    type="button"
                    className="border-0 rounded-circle d-flex align-items-center justify-content-center p-0 outline-0"
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
                    {testName}
                </Modal.Title>
            </Modal.Header>

            {/* Modal Interactive Layout Body */}
            <Modal.Body className="p-0 text-center d-flex flex-column align-items-center">
                {/* Embedded Centered Icon Element */}
                <div className="mb-3">
                    <PDFIcon width={75} height={75} />
                </div>

                {/* Dynamic File Target Subtitle text */}
                <div
                    className="fs-15 fw-500 text-secondary mb-2 text-truncate"
                    style={{ maxWidth: '85%' }}
                >
                    {testName || "file.pdf"}
                </div>

                {/* Progress Text Description Label */}
                <div className="text-blue fs-14 mb-4">
                    Downloading...
                </div>

                {/* Tracking Progress Node Wrapper bar */}
                <div className="px-5 w-100 mb-5">
                    <div className="custom-loader-container">
                        <div className="custom-loader-bar"></div>
                    </div>
                </div>
            </Modal.Body>

            {/* Modal Bottom Action Footer Container */}
            <div className="d-flex justify-content-center w-100 pb-2">
                <button
                    type="button"
                    onClick={onHide}
                    className="aph-modal-btn-height border-0 outline-0 col-md-8 border-red text-red bg-white fs-18 fw-400"
                >
                    Cancel
                </button>
            </div>
        </Modal>
    );
}
