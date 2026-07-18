import { useMemo, useState } from "react";
import { Modal } from "react-bootstrap";

import Pagination from "../../GlobalHelpers/Pagination";
import GlobalGridTable from "../../GlobalHelpers/GlobalGridTable";
import CustomFormDropdown from "../../GlobalHelpers/CustomFormDropdown";
import type { ColumnActionRow } from "../../GlobalHelpers/GlobalGridTable";
import type { DropdownOption } from "../../GlobalHelpers/CustomFilterDropdown";

import CrossBillCross from "../../../public/Assets/Icons/CrossBillCross.svg?react";
import GreenBillCheck from "../../../public/Assets/Icons/GreenBillCheck.svg?react";



import '../../styles/HumanResource.css'

/********************************************
    TYPES
*********************************************/
interface AllowanceTableData {
    id: number;
    code: string;
    name: string;
    amount: number;
    status: string;
}

interface DeductionTableData {
    id: number;
    code: string;
    name: string;
    amount: number;
    status: string;
}

export default function SalaryDetailsTab() {

    /********************************************
        EDIT MODE
    *********************************************/
    const [isEditMode, setIsEditMode] = useState(false);

    /********************************************
        PAGINATION
    *********************************************/
    const [showAllowanceModal, setShowAllowanceModal] = useState(false);
    const [allowanceCurrentPage, setAllowanceCurrentPage] = useState(1);
    const [allowanceRowsPerPage, setAllowanceRowsPerPage] = useState(5);

    const [deductionCurrentPage, setDeductionCurrentPage] = useState(1);
    const [deductionRowsPerPage, setDeductionRowsPerPage] = useState(5);

    /********************************************
        SALARY DETAILS
    *********************************************/
    const [salaryDetails, setSalaryDetails] = useState({
        totalSalary: "45000.00",
        salaryAmount: "45000.00",
        accountNumber: "123456789012345",
        ibanNumber: "SA0380000000608010167519",
        swiftCode: "NBSASARI",
    });

    /********************************************
        ALLOWANCE DATA
    *********************************************/
    const ALL_ALLOWANCE_DATA: AllowanceTableData[] = [
        {
            id: 1,
            code: "125",
            name: "Transportation Allowance",
            amount: 1500,
            status: "Active",
        },
        {
            id: 2,
            code: "126",
            name: "Housing Allowance",
            amount: 2500,
            status: "Active",
        },
        {
            id: 3,
            code: "127",
            name: "Food Allowance",
            amount: 1000,
            status: "Active",
        },
        {
            id: 4,
            code: "128",
            name: "Mobile Allowance",
            amount: 500,
            status: "Active",
        },
        {
            id: 5,
            code: "129",
            name: "Fuel Allowance",
            amount: 800,
            status: "Active",
        },
        {
            id: 6,
            code: "130",
            name: "Special Allowance",
            amount: 1200,
            status: "Active",
        },
    ];

    /********************************************
        DEDUCTION DATA
    *********************************************/
    const ALL_DEDUCTION_DATA = [
        {
            id: 1,
            code: "201",
            name: "Tax Deduction",
            amount: 300,
            status: "Active",
        },
        {
            id: 2,
            code: "202",
            name: "Social Security",
            amount: 500,
            status: "Active",
        },
        {
            id: 3,
            code: "203",
            name: "Health Insurance",
            amount: 250,
            status: "Inactive",
        },
        {
            id: 4,
            code: "204",
            name: "Late Attendance",
            amount: 100,
            status: "Active",
        },
        {
            id: 5,
            code: "205",
            name: "Loan Recovery",
            amount: 400,
            status: "Inactive",
        },
        {
            id: 6,
            code: "206",
            name: "Other Deduction",
            amount: 150,
            status: "Active",
        },
    ];

    /********************************************
        ALLOWANCE TABLE
    *********************************************/
    const allowanceColumns: ColumnActionRow<AllowanceTableData>[] = [
        {
            key: "code",
            header: <>ID</>,
            className: "text-center",
            icon: <img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="SquareSortVertical" width={14} height={14} />,
            sortable: true,
        },
        {
            key: "name",
            header: <>Name</>,
            className: "text-center",
            icon: <img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="SquareSortVertical" width={14} height={14} />,
            sortable: true,
        },
        {
            key: "amount",
            header: <>Amount</>,
            className: "text-center",
            icon: <img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="SquareSortVertical" width={14} height={14} />,
            sortable: true,
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
                    Active: "status-completed",
                    Inactive: "status-cancelled",
                };

                return (
                    <div className="d-flex justify-content-center">
                        <span
                            className={`px-3 py-1 rounded-pill fw-500 ${statusStyles[row.status as keyof typeof statusStyles]}`}
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
            width: "120px",
            render: (row) => (
                <div className="d-flex justify-content-center align-items-center gap-2">
                    <span
                        className="edit"
                        style={{ cursor: "pointer" }}
                        onClick={() => console.log("Edit", row.id)}
                    >
                        <i className="ri-pencil-ai-line fs-18"></i>
                    </span>

                    <span
                        className="delete"
                        style={{ cursor: "pointer" }}
                        onClick={() => console.log("Delete", row.id)}
                    >
                        <i className="ri-delete-bin-7-line fs-18"></i>
                    </span>
                </div>
            ),
        },
    ];

    /********************************************
        DEDUCTION TABLE
    *********************************************/
    const deductionColumns: ColumnActionRow<DeductionTableData>[] = [
        {
            key: "code",
            header: <>ID</>,
            className: "text-center",
            icon: <img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="SquareSortVertical" width={14} height={14} />,
            sortable: true,
        },
        {
            key: "name",
            header: <>Name</>,
            className: "text-center",
            icon: <img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="SquareSortVertical" width={14} height={14} />,
            sortable: true,
        },
        {
            key: "amount",
            header: <>Amount</>,
            className: "text-center",
            icon: <img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="SquareSortVertical" width={14} height={14} />,
            sortable: true,
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
                    Active: "status-completed",
                    Inactive: "status-cancelled",
                };

                return (
                    <div className="d-flex justify-content-center">
                        <span
                            className={`px-3 py-1 rounded-pill fw-500 ${statusStyles[row.status as keyof typeof statusStyles]}`}
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
            width: "120px",
            render: (row) => (
                <div className="d-flex justify-content-center align-items-center gap-2">
                    <span
                        className="edit"
                        style={{ cursor: "pointer" }}
                        onClick={() => console.log("Edit", row.id)}
                    >
                        <i className="ri-pencil-ai-line fs-18"></i>
                    </span>

                    <span
                        className="delete"
                        style={{ cursor: "pointer" }}
                        onClick={() => console.log("Delete", row.id)}
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
    const allowanceVisibleData = useMemo(() => {

        const start =
            (allowanceCurrentPage - 1) *
            allowanceRowsPerPage;

        const end =
            start +
            allowanceRowsPerPage;

        return ALL_ALLOWANCE_DATA.slice(start, end);

    }, [
        allowanceCurrentPage,
        allowanceRowsPerPage,
    ]);

    const deductionVisibleData = useMemo(() => {

        const start =
            (deductionCurrentPage - 1) *
            deductionRowsPerPage;

        const end =
            start +
            deductionRowsPerPage;

        return ALL_DEDUCTION_DATA.slice(start, end);

    }, [
        deductionCurrentPage,
        deductionRowsPerPage,
    ]);

    const allowanceTotalPages = Math.ceil(
        ALL_ALLOWANCE_DATA.length /
        allowanceRowsPerPage
    );

    const deductionTotalPages = Math.ceil(
        ALL_DEDUCTION_DATA.length /
        deductionRowsPerPage
    );

    /********************************************
        HANDLERS
    *********************************************/
    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {

        const { name, value } = e.target;

        setSalaryDetails((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleEdit = () => {
        setIsEditMode(true);
    };

    const handleCancel = () => {
        setIsEditMode(false);
    };

    const handleUpdate = () => {

        console.log(
            "Salary Details Updated : ",
            salaryDetails
        );

        setIsEditMode(false);
    };

    return (
        <>
            <div className="formContainer p-2 rounded-1 position-relative">

                {/* HEADER */}

                <div className="d-flex justify-content-between mb-4">

                    <h5 className="fs-18 fw-500">
                        Salary Details
                    </h5>

                    <div className="d-flex gap-2">

                        {!isEditMode && (

                            <div className="Plus-btn" onClick={() => setShowAllowanceModal(true)}>
                                <img src="/Assets/Icons/WhitePlusCircle.svg" alt="WhitePlusCircle" width={22} height={22} />
                                <div className='text-white fs-16 fw-400'>New Allowance/Deduction</div>
                            </div>

                        )}

                        {!isEditMode && (

                            <button className="back-btn" onClick={handleEdit}>
                                <i className="ri-pencil-ai-line fs-16"></i>
                            </button>
                        )}

                    </div>

                </div>

                {/* FORM SECTION */}

                <div className="formRow">

                    <div className="formGroup">
                        <label className="customLabel">
                            Total Salary{" "}<span className="text-danger">*</span>
                        </label>

                        <div className="inputWrapper">
                            <input
                                type="text"
                                name="totalSalary"
                                value={salaryDetails.totalSalary}
                                onChange={handleInputChange}
                                disabled={!isEditMode}
                                className="customInput"
                            />
                        </div>
                    </div>

                    <div className="formGroup">
                        <label className="customLabel">
                            Salary Amount{" "}
                            <span className="text-danger">*</span>
                        </label>

                        <div className="inputWrapper">
                            <input
                                type="text"
                                name="salaryAmount"
                                value={salaryDetails.salaryAmount}
                                onChange={handleInputChange}
                                disabled={!isEditMode}
                                className="customInput"
                            />
                        </div>
                    </div>

                </div>

                <div className="formRow">

                    <div className="formGroup">
                        <label className="customLabel">
                            Account Number{" "}
                            <span className="text-danger">*</span>
                        </label>

                        <div className="inputWrapper">
                            <input
                                type="text"
                                name="accountNumber"
                                value={salaryDetails.accountNumber}
                                onChange={handleInputChange}
                                disabled={!isEditMode}
                                className="customInput"
                            />
                        </div>
                    </div>

                    <div className="formGroup">
                        <label className="customLabel">
                            IBAN{" "}
                            <span className="text-danger">*</span>
                        </label>

                        <div className="inputWrapper">
                            <input
                                type="text"
                                name="ibanNumber"
                                value={salaryDetails.ibanNumber}
                                onChange={handleInputChange}
                                disabled={!isEditMode}
                                className="customInput"
                            />
                        </div>
                    </div>

                    <div className="formGroup">
                        <label className="customLabel">
                            Swift Code{" "}
                            <span className="text-danger">*</span>
                        </label>

                        <div className="inputWrapper">
                            <input
                                type="text"
                                name="swiftCode"
                                value={salaryDetails.swiftCode}
                                onChange={handleInputChange}
                                disabled={!isEditMode}
                                className="customInput"
                            />
                        </div>
                    </div>

                </div>

                {/* ALLOWANCE TABLE */}

                <div className="mt-4">

                    <div
                        className="d-flex align-items-center justify-content-between px-3 py-2 mb-2 rounded"
                        style={{
                            background: "#EAF8EE",
                            border: "1px solid #CDEDD5",
                        }}
                    >
                        <h6 className="mb-0 d-flex align-items-center text-green fw-500">
                            <GreenBillCheck className="me-2" />
                            Allowance
                        </h6>

                        <span className="text-green fw-500">
                            Total : 7,500.00
                        </span>
                    </div>

                    <GlobalGridTable
                        data={allowanceVisibleData}
                        columns={allowanceColumns}
                        currentPage={allowanceCurrentPage}
                        pageSize={allowanceRowsPerPage}
                    />

                    <Pagination
                        totalPages={allowanceTotalPages}
                        currentPage={allowanceCurrentPage}
                        onPageChange={(page) =>
                            setAllowanceCurrentPage(page)
                        }
                        rowsPerPage={allowanceRowsPerPage}
                        onRowsPerPageChange={(rows) => {
                            setAllowanceRowsPerPage(rows);
                            setAllowanceCurrentPage(1);
                        }}
                    />

                </div>

                {/* DEDUCTION TABLE */}

                <div className="mt-4">

                    <div
                        className="d-flex align-items-center justify-content-between px-3 py-2 mb-2 rounded"
                        style={{
                            background: "#FFF1F1",
                            border: "1px solid #FFD5D5",
                        }}
                    >
                        <h6 className="mb-0 text-red fw-500 d-flex align-items-center">
                            <CrossBillCross className="me-2" />
                            Deduction
                        </h6>

                        <span className="text-red fw-500">
                            Total : 1,700.00
                        </span>
                    </div>

                    <GlobalGridTable
                        data={deductionVisibleData}
                        columns={deductionColumns}
                        currentPage={deductionCurrentPage}
                        pageSize={deductionRowsPerPage}
                    />

                    <Pagination
                        totalPages={deductionTotalPages}
                        currentPage={deductionCurrentPage}
                        onPageChange={(page) =>
                            setDeductionCurrentPage(page)
                        }
                        rowsPerPage={deductionRowsPerPage}
                        onRowsPerPageChange={(rows) => {
                            setDeductionRowsPerPage(rows);
                            setDeductionCurrentPage(1);
                        }}
                    />

                </div>

                {/* FOOTER BUTTONS */}

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

            </div>
            <AllowanceModal
                show={showAllowanceModal}
                handleClose={() => setShowAllowanceModal(false)}
            />
        </>
    );
}

interface AllowanceModalProps {
    show: boolean;
    handleClose: () => void;
}

export function AllowanceModal({
    show,
    handleClose,
}: AllowanceModalProps) {

    /********************************************
       FORM STATE
   *********************************************/
    const [name, setName] = useState("");
    const [amount, setAmount] = useState("");

    /********************************************
        TYPE DROPDOWN
    *********************************************/
    const [selectedType, setSelectedType] = useState<DropdownOption | null>(null);

    const ALLOWANCE_DEDUCTION_OPTIONS: DropdownOption[] = [
        { id: "allowance", name: "Allowance", },
        { id: "deduction", name: "Deduction", },
        { id: "housing_allowance", name: "Housing Allowance", },
        { id: "transport_allowance", name: "Transport Allowance", },
        { id: "food_allowance", name: "Food Allowance", },
        { id: "health_deduction", name: "Health Deduction", },
        { id: "tax_deduction", name: "Tax Deduction", },
    ];

    /********************************************
        HANDLE ADD
    *********************************************/
    const handleAdd = () => {

        const payload = {
            name,
            type: selectedType,
            amount,
        };

        console.log(
            "Allowance / Deduction Data :",
            payload
        );

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
                        New Allowance/Deduction
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className='p-0'>
                    <form>

                        {/* ROW 1 */}

                        <div className="formRow">

                            <div className="formGroup">

                                <label className="customLabel">
                                    Name{" "}
                                    <span className="text-danger">*</span>
                                </label>

                                <div className="inputWrapper">

                                    <input
                                        type="text"
                                        className="customInput"
                                        placeholder="Enter Name"
                                        value={name}
                                        onChange={(e) =>
                                            setName(
                                                e.target.value
                                            )
                                        }
                                    />

                                    <i className="ri-file-text-line"></i>

                                </div>

                            </div>

                            <div className="formGroup">

                                <label className="customLabel">
                                    Type{" "}
                                    <span className="text-danger">*</span>
                                </label>

                                <CustomFormDropdown
                                    options={
                                        ALLOWANCE_DEDUCTION_OPTIONS
                                    }
                                    value={
                                        selectedType
                                    }
                                    onChange={(value) =>
                                        setSelectedType(
                                            value
                                        )
                                    }
                                    placeholder="Select Type"
                                />

                            </div>

                        </div>

                        {/* ROW 2 */}

                        <div className="formRow">

                            <div className="formGroup">

                                <label className="customLabel">
                                    Amount{" "}
                                    <span className="text-danger">*</span>
                                </label>

                                <div className="inputWrapper">

                                    <input
                                        type="number"
                                        className="customInput"
                                        placeholder="Enter Amount"
                                        value={amount}
                                        onChange={(e) =>
                                            setAmount(
                                                e.target.value
                                            )
                                        }
                                    />

                                    <i className="ri-money-dollar-circle-line"></i>

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
    )
}