import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import Header from "../../../GlobalHelpers/Header";
import Pagination from "../../../GlobalHelpers/Pagination";
import GlobalGridTable from "../../../GlobalHelpers/GlobalGridTable";
import DateFilterCalendar from "../../../GlobalHelpers/DateFilterCalendar";
import CustomFormDropdown from "../../../GlobalHelpers/CustomFormDropdown";
import type { ColumnActionRow } from "../../../GlobalHelpers/GlobalGridTable";
import type { DropdownOption } from "../../../GlobalHelpers/CustomFilterDropdown";



import '../../../styles/HumanResource.css'

interface PayrollSelectionData {
    employeeId: string;
    name: string;
    department: string;
    basicSalary: number;
    deduction: number;
    overtime: number;
    netSalary: number;
}

export default function PayrollGenerate() {

    /********************************************
        Name : Manish Kumar
        Date : 16/06/2026
        Purpose : HANDLE FORM STEPS
    *********************************************/
    const [currentStep, setCurrentStep] = useState<number>(1);
    const navigate = useNavigate();

    /********************************************
        Name : Manish Kumar
        Date : 16/06/2026
        Purpose : Employees Salary List States
    *********************************************/
    const [globalSearch, setGlobalSearch] = useState("");

    const [currentPage, setCurrentPage] = useState<number>(1);

    const [itemsPerPage, setItemsPerPage] = useState<number>(10);

    const [selectedEmployees, setSelectedEmployees] = useState<string[]>([]);

    const [showConfirmationModal, setShowConfirmationModal] = useState(false);

    /********************************************
        Name : Manish Kumar
        Date : 15/06/2026
        Purpose : DEPARTMENT DROPDOWN OPTIONS
    *********************************************/
    const DEPARTMENT_OPTIONS: DropdownOption[] = [
        { id: "Administration", name: "Administration" },
        { id: "Emergency", name: "Emergency" },
        { id: "Laboratory", name: "Laboratory" },
        { id: "Pharmacy", name: "Pharmacy" },
        { id: "Radiology", name: "Radiology" },
        { id: "Nursing", name: "Nursing" },
        { id: "Reception", name: "Reception" },

        // Additional Departments
        { id: "ICU", name: "ICU" },
        { id: "Operation Theatre", name: "Operation Theatre" },
        { id: "Accounts", name: "Accounts" },
        { id: "Human Resources", name: "Human Resources" },
    ];

    /********************************************
        Name : Manish Kumar
        Date : 15/06/2026
        Purpose : PAYMENT METHOD DROPDOWN OPTIONS
    *********************************************/
    const PAYMENT_METHOD_OPTIONS: DropdownOption[] = [
        { id: "Cash", name: "Cash" },
        { id: "Bank Transfer", name: "Bank Transfer" },
        { id: "Cheque", name: "Cheque" },
        { id: "UPI", name: "UPI" },
    ];

    /********************************************
        Name : Manish Kumar
        Date : 15/06/2026
        Purpose : STORE PAYMENT METHOD
    *********************************************/
    const [selectedPaymentMethod, setSelectedPaymentMethod] =
        useState<DropdownOption | null>(null);

    /********************************************
        Name : Manish Kumar
        Date : 15/06/2026
        Purpose : STORE DEPARTMENT
    *********************************************/
    const [selectedDepartment, setSelectedDepartment] =
        useState<DropdownOption | null>(null);

    /********************************************
        Name : Manish Kumar
        Date : 15/06/2026
        Purpose : STORE PAYROLL MONTH
    *********************************************/
    const [selectedPayrollMonth, setSelectedPayrollMonth] =
        useState<Date | null>(null);

    const [showPayrollMonthCalendar, setShowPayrollMonthCalendar] =
        useState(false);

    /********************************************
        Name : Manish Kumar
        Date : 15/06/2026
        Purpose : STORE PAYROLL INFORMATION
    *********************************************/
    const [payrollInfo, setPayrollInfo] = useState({
        note: "",
    });

    /********************************************
        Name : Manish Kumar
        Date : 15/06/2026
        Purpose : HANDLE PAYROLL INPUTS
    *********************************************/
    const handlePayrollInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {

        const { name, value } = e.target;

        setPayrollInfo((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const ALL_PAYROLL_DATA: PayrollSelectionData[] = [
        {
            employeeId: "EMP001",
            name: "Sarah Ahmed",
            department: "Nursing",
            basicSalary: 8500,
            deduction: 500,
            overtime: 300,
            netSalary: 8300,
        },
        {
            employeeId: "EMP002",
            name: "Mohammed Khalid",
            department: "Reception",
            basicSalary: 7000,
            deduction: 250,
            overtime: 150,
            netSalary: 6900,
        },
        {
            employeeId: "EMP003",
            name: "Fatima Noor",
            department: "Laboratory",
            basicSalary: 7800,
            deduction: 350,
            overtime: 200,
            netSalary: 7650,
        },
        {
            employeeId: "EMP004",
            name: "Ahmed Hassan",
            department: "Pharmacy",
            basicSalary: 9200,
            deduction: 600,
            overtime: 450,
            netSalary: 9050,
        },
        {
            employeeId: "EMP005",
            name: "Layla Omar",
            department: "Radiology",
            basicSalary: 8000,
            deduction: 400,
            overtime: 250,
            netSalary: 7850,
        },
        {
            employeeId: "EMP006",
            name: "Yousef Ali",
            department: "Administration",
            basicSalary: 7500,
            deduction: 300,
            overtime: 200,
            netSalary: 7400,
        },
        {
            employeeId: "EMP007",
            name: "Mariam Saleh",
            department: "Nursing",
            basicSalary: 8600,
            deduction: 450,
            overtime: 300,
            netSalary: 8450,
        },
        {
            employeeId: "EMP008",
            name: "Omar Tariq",
            department: "Emergency",
            basicSalary: 12000,
            deduction: 700,
            overtime: 500,
            netSalary: 11800,
        },
        {
            employeeId: "EMP009",
            name: "Aisha Khalid",
            department: "Reception",
            basicSalary: 6800,
            deduction: 250,
            overtime: 120,
            netSalary: 6670,
        },
        {
            employeeId: "EMP010",
            name: "Bilal Rahman",
            department: "Laboratory",
            basicSalary: 7600,
            deduction: 350,
            overtime: 180,
            netSalary: 7430,
        },
        {
            employeeId: "EMP011",
            name: "Noor Ahmed",
            department: "Pharmacy",
            basicSalary: 9300,
            deduction: 500,
            overtime: 350,
            netSalary: 9150,
        },
        {
            employeeId: "EMP012",
            name: "Zaid Mahmood",
            department: "Radiology",
            basicSalary: 8200,
            deduction: 450,
            overtime: 250,
            netSalary: 8000,
        },
    ];

    const filteredPayrolls = useMemo(() => {

        const searchValue = globalSearch.toLowerCase();

        return ALL_PAYROLL_DATA.filter((employee) => {

            const matchesSearch =
                employee.employeeId
                    .toLowerCase()
                    .includes(searchValue) ||

                employee.name
                    .toLowerCase()
                    .includes(searchValue) ||

                employee.department
                    .toLowerCase()
                    .includes(searchValue);

            const matchesDepartment =
                !selectedDepartment ||
                employee.department === selectedDepartment.name;

            return matchesSearch && matchesDepartment;

        });

    }, [globalSearch, selectedDepartment]);

    const totalPages = Math.ceil(
        filteredPayrolls.length /
        itemsPerPage
    );

    const visibleTableData = useMemo(() => {

        const startIndex =
            (currentPage - 1) *
            itemsPerPage;

        const endIndex =
            startIndex +
            itemsPerPage;

        return filteredPayrolls.slice(
            startIndex,
            endIndex
        );

    }, [
        filteredPayrolls,
        currentPage,
        itemsPerPage,
    ]);

    const handleSelectEmployee = (
        employeeId: string
    ) => {

        setSelectedEmployees(
            (prev) => {

                if (
                    prev.includes(
                        employeeId
                    )
                ) {
                    return prev.filter(
                        (id) =>
                            id !== employeeId
                    );
                }

                return [
                    ...prev,
                    employeeId,
                ];

            }
        );

    };

    const selectedRows = useMemo(() => {

        return ALL_PAYROLL_DATA.filter(
            (employee) =>
                selectedEmployees.includes(
                    employee.employeeId
                )
        );

    }, [
        selectedEmployees,
    ]);

    const payrollSummary = useMemo(() => {

        return selectedRows.reduce(

            (
                acc,
                employee
            ) => {

                acc.totalEmployees += 1;

                acc.totalBasicSalary +=
                    employee.basicSalary;

                acc.totalDeduction +=
                    employee.deduction;

                acc.totalOvertime +=
                    employee.overtime;

                acc.totalNetSalary +=
                    employee.netSalary;

                return acc;

            },

            {
                totalEmployees: 0,
                totalBasicSalary: 0,
                totalDeduction: 0,
                totalOvertime: 0,
                totalNetSalary: 0,
            }

        );

    }, [selectedRows]);


    const columns: ColumnActionRow<PayrollSelectionData>[] = [

        {
            key: "employeeId",
            header: <>Employee ID</>,
            className: "text-center",

            icon: <img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="SquareSortVertical" width={14} height={14} />,

            sortable: true,

            sortFunction: (a, b) =>
                a.employeeId.localeCompare(
                    b.employeeId
                ),
        },

        {
            key: "name",
            header: <>Name</>,
            className: "text-center",

            icon: <img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="SquareSortVertical" width={14} height={14} />,

            sortable: true,

            sortFunction: (a, b) =>
                a.name.localeCompare(
                    b.name
                ),
        },

        {
            key: "department",
            header: <>Department</>,
            className: "text-center",

            icon: <img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="SquareSortVertical" width={14} height={14} />,

            sortable: true,

            sortFunction: (a, b) =>
                a.department.localeCompare(
                    b.department
                ),
        },

        {
            key: "basicSalary",
            header: <>Basic Salary</>,
            className: "text-center",

            icon: <img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="SquareSortVertical" width={14} height={14} />,

            sortable: true,

            sortFunction: (a, b) =>
                a.basicSalary -
                b.basicSalary,

            render: (row) => (
                <span className="fw-500">
                    AED {row.basicSalary.toLocaleString()}
                </span>
            ),
        },

        {
            key: "deduction",
            header: <>Deduction</>,
            className: "text-center",

            icon: <img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="SquareSortVertical" width={14} height={14} />,

            sortable: true,

            sortFunction: (a, b) =>
                a.deduction -
                b.deduction,

            render: (row) => (
                <span className="text-red fw-500">
                    AED {row.deduction.toLocaleString()}
                </span>
            ),
        },

        {
            key: "overtime",
            header: <>Overtime</>,
            className: "text-center",

            icon: <img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="SquareSortVertical" width={14} height={14} />,

            sortable: true,

            sortFunction: (a, b) =>
                a.overtime -
                b.overtime,

            render: (row) => (
                <span className="text-green fw-500">
                    AED {row.overtime.toLocaleString()}
                </span>
            ),
        },

        {
            key: "netSalary",
            header: <>Net Salary</>,
            className: "text-center",

            icon: <img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="SquareSortVertical" width={14} height={14} />,

            sortable: true,

            sortFunction: (a, b) =>
                a.netSalary -
                b.netSalary,

            render: (row) => (
                <span className="fw-700">
                    AED {row.netSalary.toLocaleString()}
                </span>
            ),
        },

        {
            key: "action",
            header: <>Action</>,
            className: "text-center",
            width: "100px",

            render: (row) => {

                const isSelected =
                    selectedEmployees.includes(
                        row.employeeId
                    );

                return (

                    <div className="d-flex justify-content-center">

                        <button
                            type="button"
                            className={`payroll-check-btn ${isSelected
                                ? "active"
                                : ""
                                }`}
                            onClick={() =>
                                handleSelectEmployee(
                                    row.employeeId
                                )
                            }
                        >
                            <i className="ri-check-line"></i>
                        </button>

                    </div>

                );

            },
        },

    ];

    /********************************************
        Name : Manish Kumar
        Date : 16/06/2026
        Purpose : MOVE TO NEXT STEP
    *********************************************/
    const handleNext = () => {
        setCurrentStep((prev) => prev + 1);
    };

    /********************************************
        Name : Manish Kumar
        Date : 16/06/2026
        Purpose : MOVE TO PREVIOUS STEP
    *********************************************/
    const handlePrevious = () => {
        setCurrentStep((prev) => prev - 1);
    };

    return (
        <>
            <div className="container-fluid p-3">

                {/* Header */}
                <Header
                    heading="Human Resources"
                    subHeading="Payroll / Pay Payroll"
                />

                {/* Step Progress */}

                <div className="d-flex justify-content-between align-items-center my-2">

                    <h5 className="fs-18 fw-500">Pay Payroll</h5>

                    <div className="d-flex align-items-center gap-2 mb-4 mt-3">

                        {[1, 2, 3].map((step) => (

                            <div
                                key={step}
                                style={{
                                    width:
                                        currentStep === step
                                            ? "85px"
                                            : "20px",
                                    height: "14px",
                                    borderRadius: "4px",
                                    background:
                                        currentStep === step
                                            ? "#3E64AB"
                                            : "#CBD4E3",
                                    transition:
                                        "all 0.3s ease",
                                    cursor: "pointer",
                                }}
                            />

                        ))}

                    </div>

                </div>

                {currentStep === 1 && (

                    <div className="formContainer p-3 rounded-1">

                        <h5 className="fs-18 fw-500 mb-4">
                            Payroll Information
                        </h5>

                        {/* Row 1 */}
                        <div className="formRow">

                            <div className="formGroup">

                                <label className="customLabel">
                                    Payroll Month <span className="text-danger">*</span>
                                </label>

                                <div style={{ position: "relative" }}>

                                    <div
                                        className="customInput d-flex align-items-center"
                                        onClick={() =>
                                            setShowPayrollMonthCalendar(
                                                !showPayrollMonthCalendar
                                            )
                                        }
                                        style={{
                                            cursor: "pointer",
                                        }}
                                    >
                                        {selectedPayrollMonth
                                            ? `${selectedPayrollMonth.toLocaleString(
                                                "default",
                                                {
                                                    month: "long",
                                                }
                                            )} ${selectedPayrollMonth.getFullYear()}`
                                            : "Select Payroll Month"}
                                    </div>

                                    <i
                                        className="ri-calendar-line"
                                        style={{
                                            position: "absolute",
                                            right: "15px",
                                            top: "50%",
                                            transform: "translateY(-50%)",
                                            pointerEvents: "none",
                                            zIndex: 2,
                                        }}
                                    ></i>

                                    {showPayrollMonthCalendar && (
                                        <div
                                            style={{
                                                position: "absolute",
                                                top: "100%",
                                                left: 0,
                                                zIndex: 1000,
                                                marginTop: "4px",
                                            }}
                                        >
                                            <DateFilterCalendar
                                                selectedDate={
                                                    selectedPayrollMonth
                                                }
                                                onDateSelect={(date) => {

                                                    setSelectedPayrollMonth(
                                                        date
                                                    );

                                                    setShowPayrollMonthCalendar(
                                                        false
                                                    );

                                                }}
                                            />
                                        </div>
                                    )}

                                </div>

                            </div>

                            <div className="formGroup">

                                <label className="customLabel">
                                    Department <span className="text-danger">*</span>
                                </label>

                                <CustomFormDropdown
                                    options={DEPARTMENT_OPTIONS}
                                    value={selectedDepartment}
                                    onChange={(value) =>
                                        setSelectedDepartment(value)
                                    }
                                    placeholder="Select Department"
                                />

                            </div>

                        </div>

                        {/* Row 2 */}
                        <div className="formRow">

                            <div className="formGroup">

                                <label className="customLabel">
                                    Payment Method <span className="text-danger">*</span>
                                </label>

                                <CustomFormDropdown
                                    options={PAYMENT_METHOD_OPTIONS}
                                    value={selectedPaymentMethod}
                                    onChange={(value) =>
                                        setSelectedPaymentMethod(value)
                                    }
                                    placeholder="Select Payment Method"
                                />

                            </div>

                        </div>

                        {/* Row 3 */}
                        <div className="formRow">

                            <div className="formGroup">

                                <label className="customLabel">
                                    Note
                                </label>
                                <div className="inputWrapper">

                                    <input
                                        name="note"
                                        value={payrollInfo.note}
                                        onChange={handlePayrollInputChange}
                                        className="customInput"
                                        type="text"
                                        placeholder="Enter Note"
                                    />

                                    <i className="ri-file-text-line"></i>
                                </div>

                            </div>

                        </div>

                        {/* Buttons */}
                        <div className="d-flex justify-content-between border-0 pb-0 mt-5">
                            <button
                                type="button"
                                className="aph-modal-btn-height outline-0 col-md-4 border border-danger text-danger bg-white fs-18 fw-400"
                                onClick={() => navigate("/human-resources/Payroll")}
                            >
                                Cancel
                            </button>
                            <button
                                type='button'
                                className="aph-modal-btn-height border-0 outline-0 col-md-7 bg-blue text-white fs-18 fw-400"
                                onClick={handleNext}
                            >
                                Next
                            </button>
                        </div>

                    </div>
                )}

                {currentStep === 2 && (
                    <>
                        <div className="formContainer p-3 rounded-1">

                            <h5 className="fs-18 fw-500 mb-4">
                                Employees Salary List
                            </h5>

                            <div className="aph-modal-filter-row mb-4">
                                <div className="aph-filter-search">

                                    <input
                                        type="text"
                                        placeholder="Search..."
                                        className="aph-search-input"
                                        value={globalSearch}
                                        onChange={(e) => {
                                            setGlobalSearch(
                                                e.target.value
                                            );
                                            setCurrentPage(1);
                                        }}
                                    />

                                    <button className="aph-search-btn outline-0">
                                        <i className="ri-search-line"></i>
                                    </button>

                                </div>
                            </div>

                            <div className="d-flex flex-column">
                                <GlobalGridTable
                                    data={visibleTableData}
                                    columns={columns}
                                    currentPage={currentPage}
                                    pageSize={itemsPerPage}
                                />

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

                            {/* Buttons */}
                            <div className="d-flex justify-content-between border-0 pb-0 mt-4">
                                <button
                                    type="button"
                                    className="aph-modal-btn-height outline-0 col-md-4 border border-danger text-danger bg-white fs-18 fw-400"
                                    onClick={handlePrevious}
                                >
                                    Cancel
                                </button>
                                <button
                                    type='button'
                                    className="aph-modal-btn-height border-0 outline-0 col-md-7 bg-blue text-white fs-18 fw-400"
                                    onClick={handleNext}
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    </>
                )}

                {currentStep === 3 && (
                    <>
                        <div className="formContainer p-3 rounded-1">

                            <h5 className="fs-18 fw-500 mb-4">
                                Payroll Summary
                            </h5>

                            {/* Row 1 */}
                            <div className="formRow">

                                <div className="formGroup">

                                    <label className="customLabel">
                                        Payroll Month <span className="text-danger">*</span>
                                    </label>

                                    <div className="inputWrapper">

                                        <input
                                            type="text"
                                            readOnly
                                            className="customInput"
                                            value={
                                                selectedPayrollMonth
                                                    ? `${selectedPayrollMonth.toLocaleString(
                                                        "default",
                                                        { month: "long" }
                                                    )} ${selectedPayrollMonth.getFullYear()}`
                                                    : ""
                                            }
                                        />

                                        <i className="ri-calendar-line"></i>

                                    </div>

                                </div>

                                <div className="formGroup">

                                    <label className="customLabel">
                                        Total Net Salaries
                                    </label>

                                    <div className="inputWrapper">

                                        <input
                                            type="text"
                                            value={
                                                payrollSummary.totalNetSalary
                                            }
                                            readOnly
                                            className="customInput"
                                        />

                                        <i className="ri-money-dollar-circle-line"></i>

                                    </div>

                                </div>

                            </div>

                            {/* Row 2 */}
                            <div className="formRow">

                                <div className="formGroup">

                                    <label className="customLabel">
                                        Total Employees
                                    </label>

                                    <div className="inputWrapper">

                                        <input
                                            type="text"
                                            value={
                                                payrollSummary.totalEmployees
                                            }
                                            readOnly
                                            className="customInput"
                                        />

                                        <i className="ri-team-line"></i>

                                    </div>

                                </div>

                                <div className="formGroup">

                                    <label className="customLabel">
                                        Total Basic Salaries
                                    </label>

                                    <div className="inputWrapper">

                                        <input
                                            type="text"
                                            value={
                                                payrollSummary.totalBasicSalary
                                            }
                                            readOnly
                                            className="customInput"
                                        />

                                        <i className="ri-bank-line"></i>

                                    </div>

                                </div>

                            </div>

                            {/* Row 3 */}
                            <div className="formRow">

                                <div className="formGroup">

                                    <label className="customLabel">
                                        Total Overtime
                                    </label>

                                    <div className="inputWrapper">

                                        <input
                                            type="text"
                                            value={
                                                payrollSummary.totalOvertime
                                            }
                                            readOnly
                                            className="customInput"
                                        />

                                        <i className="ri-time-line"></i>

                                    </div>

                                </div>

                                <div className="formGroup">

                                    <label className="customLabel">
                                        Total Deduction
                                    </label>

                                    <div className="inputWrapper">

                                        <input
                                            type="text"
                                            value={
                                                payrollSummary.totalDeduction
                                            }
                                            readOnly
                                            className="customInput"
                                        />

                                        <i className="ri-file-reduce-line"></i>

                                    </div>

                                </div>

                            </div>

                            {/* Buttons */}
                            <div className="d-flex justify-content-between border-0 pb-0 mt-5">

                                <button
                                    type="button"
                                    className="aph-modal-btn-height outline-0 col-md-4 border border-danger text-danger bg-white fs-18 fw-400"
                                    onClick={handlePrevious}
                                >
                                    Cancel
                                </button>

                                <button
                                    type="button"
                                    className="aph-modal-btn-height border-0 outline-0 col-md-7 bg-blue text-white fs-18 fw-400"
                                    // onClick={() => navigate("/human-resources/Payroll")}
                                    onClick={() => setShowConfirmationModal(true)}
                                >
                                    Generate Payroll
                                </button>

                            </div>

                        </div>
                    </>
                )}
            </div>

            <PayrollConfirmationModal
                show={showConfirmationModal}
                handleClose={() =>
                    setShowConfirmationModal(false)
                }
            />
        </>
    )
}


import { Modal } from "react-bootstrap";

interface PayrollConfirmationModalProps {
    show: boolean;
    handleClose: () => void;
}

export function PayrollConfirmationModal({
    show,
    handleClose,
}: PayrollConfirmationModalProps) {

    const navigate = useNavigate();

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
                        Generate Payroll
                    </Modal.Title>

                </Modal.Header>

                <Modal.Body className="p-0">
                    <div>
                        
                        <div className="d-flex flex-column align-items-center">
                            <img src="/Assets/Icons/GeneratePayroll.svg" alt="GeneratePayroll" className="mb-4" />
                            <p className="mb-0 fw-500">Are you sure you want to process the salary payment for the selected employees ?</p>
                        </div>

                        {/* BUTTONS */}
                        <div className="d-flex justify-content-between border-0 pb-0 mt-5">

                            <button
                                type="button"
                                className="aph-modal-btn-height border-0 outline-0 col-md-7 bg-green text-white fs-18 fw-400"
                                onClick={() => navigate("/human-resources/Payroll")}
                            >
                                Confirm
                            </button>

                            <button
                                type="button"
                                className="aph-modal-btn-height border-0 outline-0 col-md-4 border-red text-red bg-white fs-18 fw-400"
                                onClick={handleClose}
                            >
                                Cancel
                            </button>

                        </div>
                    </div>
                </Modal.Body>

            </Modal>
        </>
    );
}