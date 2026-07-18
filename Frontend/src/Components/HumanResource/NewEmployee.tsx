import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Header from "../../GlobalHelpers/Header";
import DateFilterCalendar from "../../GlobalHelpers/DateFilterCalendar";
import CustomFormDropdown, { type DropdownOption, } from "../../GlobalHelpers/CustomFormDropdown";

import '../../styles/HumanResource.css'

/********************************************
    Name : Manish Kumar
    Date : 11/06/2026
    Purpose : CERTIFICATE TABLE DATA TYPE
*********************************************/
interface CertificateData {
    certificateName: string;
    certificateDate: Date | null;
    certificateId: string;
    certificateFile: File | null;
}

/********************************************
    Name : Manish Kumar
    Date : 11/06/2026
    Purpose : MULTIPLE SHIFT TABLE DATA TYPE
*********************************************/
interface MultipleShiftData {
    day: string;
    shiftType: string;
    startTime: string;
    endTime: string;
}



export default function NewEmployee() {

    /********************************************
        Name : Manish Kumar
        Date : 11/06/2026
        Purpose : HANDLE FORM STEPS
    *********************************************/
    const [currentStep, setCurrentStep] = useState<number>(1);
    const navigate = useNavigate();

    /********************************************
        Name : Manish Kumar
        Date : 11/06/2026
        Purpose : STORE BASIC INFORMATION
    *********************************************/
    const [basicInfo, setBasicInfo] = useState({
        firstName: "",
        middleName: "",
        lastName: "",
        address: "",
        phone: "",
        email: "",
    });

    /********************************************
        Name : Manish Kumar
        Date : 11/06/2026
        Purpose : STORE GENDER
    *********************************************/
    const [selectedGender, setSelectedGender] = useState<DropdownOption | null>(null);

    /********************************************
        Name : Manish Kumar
        Date : 11/06/2026
        Purpose : STORE DOB
    *********************************************/
    const [selectedDOB, setSelectedDOB] = useState<Date | null>(null);

    const [showDOBCalendar, setShowDOBCalendar] = useState(false);

    /********************************************
        Name : Manish Kumar
        Date : 11/06/2026
        Purpose : GENDER DROPDOWN OPTIONS
    *********************************************/
    const GENDER_OPTIONS: DropdownOption[] = [
        { id: "Male", name: "Male", },
        { id: "Female", name: "Female", },
        { id: "Other", name: "Other", },
    ];

    /********************************************
        Name : Manish Kumar
        Date : 11/06/2026
        Purpose : STORE WORK INFORMATION
    *********************************************/
    const [workInfo, setWorkInfo] = useState({
        salary: "",
        doctorSalary: "",
        consultationFee: "",
        dailyAppointmentLimit: "",
        swiftCode: "",
        iban: "",
        accountNumber: "",
        amount: "",
        percentage: "",
    });

    /********************************************
        Name : Manish Kumar
        Date : 11/06/2026
        Purpose : STORE DEPARTMENT
    *********************************************/
    const [selectedDepartment, setSelectedDepartment] = useState<DropdownOption | null>(null);

    /********************************************
        Name : Manish Kumar
        Date : 11/06/2026
        Purpose : STORE JOB TITLE
    *********************************************/
    const [selectedJobTitle, setSelectedJobTitle] = useState<DropdownOption | null>(null);

    /********************************************
        Name : Manish Kumar
        Date : 11/06/2026
        Purpose : STORE EMPLOYMENT TYPE
    *********************************************/
    const [selectedEmploymentType, setSelectedEmploymentType] = useState<DropdownOption | null>(null);

    /********************************************
        Name : Manish Kumar
        Date : 11/06/2026
        Purpose : STORE HIRE DATE
    *********************************************/
    const [selectedHireDate, setSelectedHireDate] = useState<Date | null>(null);

    const [showHireDateCalendar, setShowHireDateCalendar] = useState(false);

    /********************************************
        Name : Manish Kumar
        Date : 11/06/2026
        Purpose : STORE DOCTOR PAYMENT DETAILS
    *********************************************/
    const [selectedPaymentType, setSelectedPaymentType] = useState<DropdownOption | null>(null);

    const [hospitalCommissionEnabled, setHospitalCommissionEnabled] = useState(false);

    const [selectedCommissionType, setSelectedCommissionType] = useState<DropdownOption | null>(null);

    /********************************************
        Name : Manish Kumar
        Date : 11/06/2026
        Purpose : DEPARTMENT DROPDOWN OPTIONS
    *********************************************/
    const DEPARTMENT_OPTIONS: DropdownOption[] = [
        { id: "Administration", name: "Administration" },
        { id: "Emergency", name: "Emergency" },
        { id: "ICU", name: "ICU" },
        { id: "Laboratory", name: "Laboratory" },
        { id: "Radiology", name: "Radiology" },
        { id: "Operation Theatre", name: "Operation Theatre" },
        { id: "Pharmacy", name: "Pharmacy" },
        { id: "Human Resources", name: "Human Resources" },
        { id: "Accounts", name: "Accounts" },
    ];

    /********************************************
        Name : Manish Kumar
        Date : 11/06/2026
        Purpose : JOB TITLE DROPDOWN OPTIONS
    *********************************************/
    const JOB_TITLE_OPTIONS: DropdownOption[] = [
        { id: "Admin", name: "Admin" },
        { id: "Doctor", name: "Doctor" },
        { id: "Nurse", name: "Nurse" },
        { id: "Lab Staff", name: "Lab Staff" },
        { id: "Radiology", name: "Radiology" },
        { id: "OT Staff", name: "OT Staff" },
        { id: "HR", name: "HR" },
        { id: "Accounting", name: "Accounting" },
        { id: "Assistant", name: "Assistant" },
        { id: "Receptionist", name: "Receptionist" },
        { id: "Pharmacist", name: "Pharmacist" },
    ];

    /********************************************
        Name : Manish Kumar
        Date : 11/06/2026
        Purpose : EMPLOYMENT TYPE OPTIONS
    *********************************************/
    const EMPLOYMENT_TYPE_OPTIONS: DropdownOption[] = [
        { id: "Full Time", name: "Full Time", },
        { id: "Part Time", name: "Part Time", },
    ];

    /********************************************
        Name : Manish Kumar
        Date : 11/06/2026
        Purpose : DOCTOR PAYMENT OPTIONS
    *********************************************/
    const PAYMENT_TYPE_OPTIONS: DropdownOption[] = [
        { id: "Salary", name: "Salary", },
        { id: "Pre Consultation", name: "Pre Consultation", },
    ];

    /********************************************
        Name : Manish Kumar
        Date : 11/06/2026
        Purpose : HOSPITAL COMMISSION OPTIONS
    *********************************************/
    const COMMISSION_OPTIONS: DropdownOption[] = [
        { id: "Fixed Amount", name: "Fixed Amount", },
        { id: "Percentage", name: "Percentage", },
    ];

    /********************************************
        Name : Manish Kumar
        Date : 11/06/2026
        Purpose : STORE SELECTED WORKING DAYS
    *********************************************/
    const [selectedDays, setSelectedDays] = useState<string[]>([]);

    /********************************************
        Name : Manish Kumar
        Date : 11/06/2026
        Purpose : STORE SHIFT TYPE
    *********************************************/
    const [selectedShift, setSelectedShift] = useState<DropdownOption | null>(null);

    const [selectedShiftType, setSelectedShiftType] = useState<DropdownOption | null>(null);

    /********************************************
        Name : Manish Kumar
        Date : 11/06/2026
        Purpose : STORE FIXED SHIFT TIMINGS
    *********************************************/
    const [startTime, setStartTime] = useState("");

    const [endTime, setEndTime] = useState("");

    /********************************************
        Name : Manish Kumar
        Date : 11/06/2026
        Purpose : STORE MULTIPLE SHIFT DATA
    *********************************************/
    const [multipleShiftData, setMultipleShiftData] = useState<MultipleShiftData[]>([]);

    /********************************************
        Name : Manish Kumar
        Date : 11/06/2026
        Purpose : AVAILABLE WORKING DAYS
    *********************************************/
    const DAYS = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];

    /********************************************
        Name : Manish Kumar
        Date : 11/06/2026
        Purpose : SHIFT OPTIONS
    *********************************************/
    const SHIFT_OPTIONS: DropdownOption[] = [
        {
            id: "Fixed Shift",
            name: "Fixed Shift",
        },
        {
            id: "Multiple Shift",
            name: "Multiple Shift",
        },
    ];

    /********************************************
        Name : Manish Kumar
        Date : 11/06/2026
        Purpose : SHIFT TYPE OPTIONS
    *********************************************/
    const SHIFT_TYPE_OPTIONS: DropdownOption[] = [
        {
            id: "Morning Shift",
            name: "Morning Shift",
        },
        {
            id: "Afternoon Shift",
            name: "Afternoon Shift",
        },
        {
            id: "Night Shift",
            name: "Night Shift",
        },
    ];

    /********************************************
        Name : Manish Kumar
        Date : 11/06/2026
        Purpose : STORE DOCUMENT INFORMATION
    *********************************************/
    const [documentInfo, setDocumentInfo] = useState({
        idNumber: "",
    });

    const [idCardFile, setIdCardFile] = useState<File | null>(null);
    const [contractFile, setContractFile] = useState<File | null>(null);

    /********************************************
        Name : Manish Kumar
        Date : 11/06/2026
        Purpose : STORE ISSUING DATE
    *********************************************/
    const [issuingDate, setIssuingDate] = useState<Date | null>(null);

    const [showIssuingDateCalendar, setShowIssuingDateCalendar] = useState(false);

    /********************************************
        Name : Manish Kumar
        Date : 11/06/2026
        Purpose : STORE CERTIFICATE DETAILS
    *********************************************/
    const [certificateForm, setCertificateForm] = useState({
        certificateName: "",
        certificateId: "",
    });

    const [certificateDate, setCertificateDate] = useState<Date | null>(null);

    const [showCertificateCalendar, setShowCertificateCalendar] = useState(false);

    const [certificateFile, setCertificateFile] = useState<File | null>(null);

    const [certificateList, setCertificateList] = useState<CertificateData[]>([]);


    /********************************************
        Name : Manish Kumar
        Date : 11/06/2026
        Purpose : HANDLE BASIC INFO INPUTS
    *********************************************/
    const handleBasicInputChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {

        const { name, value } = e.target;

        setBasicInfo((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    /********************************************
        Name : Manish Kumar
        Date : 11/06/2026
        Purpose : HANDLE WORK INFORMATION INPUTS
    *********************************************/
    const handleWorkInputChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {

        const { name, value } = e.target;

        setWorkInfo((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    /********************************************
        Name : Manish Kumar
        Date : 11/06/2026
        Purpose : TOGGLE WORKING DAYS
    *********************************************/
    const handleDaySelection = (
        day: string
    ) => {

        setSelectedDays((prev) => {

            if (prev.includes(day)) {

                return prev.filter(
                    (item) => item !== day
                );

            }

            return [...prev, day];

        });

    };

    /********************************************
        Name : Manish Kumar
        Date : 11/06/2026
        Purpose : AUTO SET SHIFT TIME
    *********************************************/
    const handleShiftTypeChange = (
        value: DropdownOption | null
    ) => {

        setSelectedShiftType(value);

        if (!value) return;

        if (
            value.id === "Morning Shift"
        ) {

            setStartTime("07:00 AM");
            setEndTime("03:00 PM");

        }

        if (
            value.id === "Afternoon Shift"
        ) {

            setStartTime("03:00 PM");
            setEndTime("11:00 PM");

        }

        if (
            value.id === "Night Shift"
        ) {

            setStartTime("11:00 PM");
            setEndTime("07:00 AM");

        }

    };

    /********************************************
        Name : Manish Kumar
        Date : 11/06/2026
        Purpose : UPDATE MULTIPLE SHIFT TABLE
    *********************************************/
    const handleMultipleShiftChange = (
        day: string,
        shift: string
    ) => {

        let start = "";
        let end = "";

        if (shift === "Morning Shift") {
            start = "07:00 AM";
            end = "03:00 PM";
        }

        if (shift === "Afternoon Shift") {
            start = "03:00 PM";
            end = "11:00 PM";
        }

        if (shift === "Night Shift") {
            start = "11:00 PM";
            end = "07:00 AM";
        }

        setMultipleShiftData((prev) => {

            const existing =
                prev.find(
                    (item) =>
                        item.day === day
                );

            if (existing) {

                return prev.map(
                    (item) =>
                        item.day === day
                            ? {
                                ...item,
                                shiftType:
                                    shift,
                                startTime:
                                    start,
                                endTime:
                                    end,
                            }
                            : item
                );

            }

            return [
                ...prev,
                {
                    day,
                    shiftType: shift,
                    startTime: start,
                    endTime: end,
                },
            ];

        });

    };

    /********************************************
        Name : Manish Kumar
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

    /********************************************
        Name : Manish Kumar
        Date : 11/06/2026
        Purpose : HANDLE CERTIFICATE INPUTS
    *********************************************/
    const handleCertificateInputChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {

        const { name, value } = e.target;

        setCertificateForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    /********************************************
        Name : Manish Kumar
        Date : 11/06/2026
        Purpose : ADD CERTIFICATE TO TABLE
    *********************************************/
    const handleSaveCertificate = () => {

        const payload = {
            certificateName:
                certificateForm.certificateName,

            certificateDate,

            certificateId:
                certificateForm.certificateId,

            certificateFile,
        };

        setCertificateList((prev) => [
            ...prev,
            payload,
        ]);

        setCertificateForm({
            certificateName: "",
            certificateId: "",
        });

        setCertificateDate(null);

        setCertificateFile(null);
    };

    /********************************************
        Name : Manish Kumar
        Date : 11/06/2026
        Purpose : REMOVE CERTIFICATE
    *********************************************/
    const handleDeleteCertificate = (
        index: number
    ) => {

        setCertificateList((prev) =>
            prev.filter(
                (_, i) =>
                    i !== index
            )
        );

    };

    /********************************************
        Name : Manish Kumar 
        Date : 11/06/2026
        Purpose : CONSOLE COMPLETE PAYLOAD
    *********************************************/
    const handleAddNewEmployee = () => {

        const payload = {

            basicInfo,

            gender:
                selectedGender,

            dateOfBirth:
                selectedDOB,

            department:
                selectedDepartment,

            jobTitle:
                selectedJobTitle,

            employmentType:
                selectedEmploymentType,

            hireDate:
                selectedHireDate,

            paymentType:
                selectedPaymentType,

            hospitalCommissionEnabled,

            commissionType:
                selectedCommissionType,

            workInfo,

            selectedDays,

            shift:
                selectedShift,

            shiftType:
                selectedShiftType,

            startTime,

            endTime,

            multipleShiftData,

            idCardFile: {

                fileName:
                    idCardFile?.name,

                filePath:
                    idCardFile,

            },

            contractFile: {

                fileName:
                    contractFile?.name,

                filePath:
                    contractFile,

            },

            idNumber:
                documentInfo.idNumber,

            issuingDate,

            certificates:
                certificateList.map(
                    (item) => ({
                        certificateName:
                            item.certificateName,

                        certificateDate:
                            item.certificateDate,

                        certificateId:
                            item.certificateId,

                        fileName:
                            item.certificateFile?.name,

                        filePath:
                            item.certificateFile,
                    })
                ),
        };

        console.log(
            "NEW EMPLOYEE PAYLOAD : ",
            payload
        );
    };

    /********************************************
        Name : Manish Kumar       Date : 11/06/2026
        Purpose : MOVE TO NEXT STEP
    *********************************************/
    const handleNext = () => {
        setCurrentStep((prev) => prev + 1);
    };

    /********************************************
        Name : Manish Kumar p
        Date : 11/06/2026
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
                    subHeading="Employees / New Employee"
                />

                {/* Step Progress */}

                <div className="d-flex justify-content-between align-items-center my-2">

                    <h5 className="fs-18 fw-500">New Employee</h5>

                    <div className="d-flex align-items-center gap-2 mb-4 mt-3">

                        {[1, 2, 3, 4].map((step) => (

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
                            Basic Information
                        </h5>

                        {/* Row 1 */}
                        <div className="formRow">

                            <div className="formGroup">
                                <label className="customLabel">
                                    First Name{" "}<span className="text-danger">*</span>
                                </label>

                                <div className="inputWrapper">
                                    <input
                                        type="text"
                                        name="firstName"
                                        value={basicInfo.firstName}
                                        onChange={
                                            handleBasicInputChange
                                        }
                                        className="customInput"
                                        placeholder="Enter First Name"
                                    />
                                    <i className="ri-user-line"></i>
                                </div>
                            </div>

                            <div className="formGroup">
                                <label className="customLabel">
                                    Middle Name
                                </label>

                                <div className="inputWrapper">
                                    <input
                                        type="text"
                                        name="middleName"
                                        value={basicInfo.middleName}
                                        onChange={
                                            handleBasicInputChange
                                        }
                                        className="customInput"
                                        placeholder="Enter Middle Name"
                                    />
                                    <i className="ri-user-3-line"></i>
                                </div>
                            </div>

                            <div className="formGroup">
                                <label className="customLabel">
                                    Last Name
                                </label>

                                <div className="inputWrapper">
                                    <input
                                        type="text"
                                        name="lastName"
                                        value={basicInfo.lastName}
                                        onChange={
                                            handleBasicInputChange
                                        }
                                        className="customInput"
                                        placeholder="Enter Last Name"
                                    />
                                    <i className="ri-user-star-line"></i>
                                </div>
                            </div>

                        </div>

                        {/* Row 2 */}
                        <div className="formRow">

                            <div className="formGroup">

                                <label className="customLabel">
                                    Gender{" "}<span className="text-danger">*</span>
                                </label>

                                <CustomFormDropdown
                                    options={
                                        GENDER_OPTIONS
                                    }
                                    value={
                                        selectedGender
                                    }
                                    onChange={(value) =>
                                        setSelectedGender(
                                            value
                                        )
                                    }
                                    placeholder="Select Gender"
                                />

                            </div>

                            <div className="formGroup">

                                <label className="customLabel">
                                    Date Of Birth{" "}<span className="text-danger">*</span>
                                </label>

                                <div
                                    style={{
                                        position:
                                            "relative",
                                    }}
                                >

                                    <div
                                        className="customInput d-flex align-items-center"
                                        onClick={() =>
                                            setShowDOBCalendar(
                                                !showDOBCalendar
                                            )
                                        }
                                        style={{
                                            cursor:
                                                "pointer",
                                        }}
                                    >
                                        {selectedDOB
                                            ? `${String(
                                                selectedDOB.getDate()
                                            ).padStart(
                                                2,
                                                "0"
                                            )}/${String(
                                                selectedDOB.getMonth() +
                                                1
                                            ).padStart(
                                                2,
                                                "0"
                                            )}/${selectedDOB.getFullYear()}`
                                            : "DD/MM/YYYY"}
                                    </div>

                                    {showDOBCalendar && (
                                        <div
                                            style={{
                                                position:
                                                    "absolute",
                                                top: "100%",
                                                left: 0,
                                                zIndex:
                                                    1000,
                                            }}
                                        >
                                            <DateFilterCalendar
                                                selectedDate={
                                                    selectedDOB
                                                }
                                                onDateSelect={(
                                                    date
                                                ) => {
                                                    setSelectedDOB(
                                                        date
                                                    );

                                                    setShowDOBCalendar(
                                                        false
                                                    );
                                                }}
                                            />
                                        </div>
                                    )}

                                </div>

                            </div>

                        </div>

                        {/* Row 3 */}
                        <div className="formRow">

                            <div className="formGroup">

                                <label className="customLabel">
                                    Address{" "}<span className="text-danger">*</span>
                                </label>

                                <div className="inputWrapper">
                                    <input
                                        type="text"
                                        name="address"
                                        value={
                                            basicInfo.address
                                        }
                                        onChange={
                                            handleBasicInputChange
                                        }
                                        className="customInput"
                                        placeholder="Enter Address"
                                    />
                                    <i className="ri-map-pin-line"></i>
                                </div>

                            </div>

                            <div className="formGroup">

                                <label className="customLabel">
                                    Phone{" "}<span className="text-danger">*</span>
                                </label>

                                <div className="inputWrapper">
                                    <input
                                        type="text"
                                        name="phone"
                                        value={basicInfo.phone}
                                        onChange={
                                            handleBasicInputChange
                                        }
                                        className="customInput"
                                        placeholder="Enter Phone"
                                    />
                                    <i className="ri-phone-line"></i>
                                </div>

                            </div>

                        </div>

                        {/* Row 4 */}
                        <div className="formRow">

                            <div className="formGroup">

                                <label className="customLabel">
                                    Email{" "}<span className="text-danger">*</span>
                                </label>

                                <div className="inputWrapper">
                                    <input
                                        type="email"
                                        name="email"
                                        value={basicInfo.email}
                                        onChange={
                                            handleBasicInputChange
                                        }
                                        className="customInput"
                                        placeholder="Enter Email"
                                    />
                                    <i className="ri-mail-line"></i>
                                </div>

                            </div>

                        </div>

                        {/* Buttons */}
                        <div className="d-flex justify-content-between border-0 pb-0 mt-5">
                            <button
                                type="button"
                                className="aph-modal-btn-height outline-0 col-md-4 border border-danger text-danger bg-white fs-18 fw-400"
                                onClick={()=>navigate("/human-resources/Employees")}
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

                    <div className="formContainer p-3 rounded-1">

                        <h5 className="fs-18 fw-500 mb-4">
                            Work Information
                        </h5>

                        {/* Row 1  */}
                        <div className="formRow">

                            <div className="formGroup">

                                <label className="customLabel">
                                    Department{" "}<span className="text-danger">*</span>
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

                            <div className="formGroup">

                                <label className="customLabel">
                                    Job Title{" "}<span className="text-danger">*</span>
                                </label>

                                <CustomFormDropdown
                                    options={JOB_TITLE_OPTIONS}
                                    value={selectedJobTitle}
                                    onChange={(value) =>
                                        setSelectedJobTitle(value)
                                    }
                                    placeholder="Select Job Title"
                                />

                            </div>

                        </div>

                        {/* Row 2 */}
                        <div className="formRow">

                            <div className="formGroup">

                                <label className="customLabel">
                                    Employment Type{" "}<span className="text-danger">*</span>
                                </label>

                                <CustomFormDropdown
                                    options={EMPLOYMENT_TYPE_OPTIONS}
                                    value={selectedEmploymentType}
                                    onChange={(value) =>
                                        setSelectedEmploymentType(value)
                                    }
                                    placeholder="Select Employment Type"
                                />

                            </div>

                            <div className="formGroup">

                                <label className="customLabel">
                                    Hire Date{" "}<span className="text-danger">*</span>
                                </label>

                                <div style={{ position: "relative" }}>

                                    <div
                                        className="customInput d-flex align-items-center"
                                        onClick={() =>
                                            setShowHireDateCalendar(
                                                !showHireDateCalendar
                                            )
                                        }
                                        style={{
                                            cursor: "pointer",
                                        }}
                                    >
                                        {selectedHireDate
                                            ? `${String(
                                                selectedHireDate.getDate()
                                            ).padStart(
                                                2,
                                                "0"
                                            )}/${String(
                                                selectedHireDate.getMonth() + 1
                                            ).padStart(
                                                2,
                                                "0"
                                            )}/${selectedHireDate.getFullYear()}`
                                            : "DD/MM/YYYY"}
                                    </div>

                                    <i
                                        className="ri-calendar-line"
                                        style={{
                                            position: "absolute",
                                            right: "15px",
                                            top: "50%",
                                            transform:
                                                "translateY(-50%)",
                                            pointerEvents: "none",
                                            zIndex: 2,
                                        }}
                                    ></i>

                                    {showHireDateCalendar && (
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
                                                    selectedHireDate
                                                }
                                                onDateSelect={(date) => {

                                                    setSelectedHireDate(
                                                        date
                                                    );

                                                    setShowHireDateCalendar(
                                                        false
                                                    );

                                                }}
                                            />
                                        </div>
                                    )}

                                </div>

                            </div>

                        </div>

                        {/* NON-DOCTOR SALARY ROW */}
                        {selectedJobTitle?.id !== "Doctor" && (

                            <div className="formRow">

                                <div className="formGroup">

                                    <label className="customLabel">
                                        Salary{" "}<span className="text-danger">*</span>
                                    </label>

                                    <div className="inputWrapper">

                                        <input
                                            type="text"
                                            name="salary"
                                            value={workInfo.salary}
                                            onChange={
                                                handleWorkInputChange
                                            }
                                            className="customInput"
                                            placeholder="Enter Salary"
                                        />

                                        <i className="ri-money-dollar-circle-line"></i>

                                    </div>

                                </div>

                            </div>

                        )}

                        {/* DOCTOR PAYMENT TYPE ROW */}
                        {selectedJobTitle?.id === "Doctor" && (

                            <div className="formRow">

                                <div className="formGroup">

                                    <label className="customLabel">
                                        Payment Type{" "}<span className="text-danger">*</span>
                                    </label>

                                    <CustomFormDropdown
                                        options={
                                            PAYMENT_TYPE_OPTIONS
                                        }
                                        value={
                                            selectedPaymentType
                                        }
                                        onChange={(value) =>
                                            setSelectedPaymentType(
                                                value
                                            )
                                        }
                                        placeholder="Select Payment Type"
                                    />

                                </div>

                                {/* Conditionally visible in the same row when Salary is selected */}
                                {selectedPaymentType?.id === "Salary" && (
                                    <div className="formGroup">
                                        <label className="customLabel">
                                            Doctor Salary{" "}<span className="text-danger">*</span>
                                        </label>
                                        <div className="inputWrapper">
                                            <input
                                                type="text"
                                                name="doctorSalary"
                                                value={workInfo.doctorSalary}
                                                onChange={handleWorkInputChange}
                                                className="customInput"
                                                placeholder="Enter Doctor Salary"
                                            />
                                            <i className="ri-money-dollar-circle-line"></i>
                                        </div>
                                    </div>
                                )}

                                {selectedPaymentType?.id === "Pre Consultation" && (

                                    <>

                                        <div className="formGroup">

                                            <label className="customLabel">
                                                Consultation Fee{" "}<span className="text-danger">*</span>
                                            </label>

                                            <div className="inputWrapper">

                                                <input
                                                    type="text"
                                                    name="consultationFee"
                                                    value={
                                                        workInfo.consultationFee
                                                    }
                                                    onChange={
                                                        handleWorkInputChange
                                                    }
                                                    className="customInput"
                                                    placeholder="Enter Consultation Fee"
                                                />

                                                <i className="ri-money-dollar-box-line"></i>

                                            </div>

                                        </div>

                                        <div className="formGroup">

                                            <label className="customLabel">
                                                Does Hospital Take Commission ?{" "}<span className="text-danger">*</span>
                                            </label>

                                            <div className="d-flex align-items-center mt-2">

                                                <div
                                                    onClick={() =>
                                                        setHospitalCommissionEnabled(
                                                            !hospitalCommissionEnabled
                                                        )
                                                    }
                                                    style={{
                                                        width: "55px",
                                                        height: "28px",
                                                        borderRadius: "30px",
                                                        background:
                                                            hospitalCommissionEnabled
                                                                ? "#7367F0"
                                                                : "#D9DEE7",
                                                        cursor: "pointer",
                                                        position: "relative",
                                                        transition: "0.3s",
                                                    }}
                                                >

                                                    <div
                                                        style={{
                                                            width: "22px",
                                                            height: "22px",
                                                            borderRadius: "50%",
                                                            background: "#fff",
                                                            position: "absolute",
                                                            top: "3px",
                                                            left:
                                                                hospitalCommissionEnabled
                                                                    ? "30px"
                                                                    : "3px",
                                                            transition: "0.3s",
                                                        }}
                                                    />

                                                </div>

                                            </div>

                                        </div>

                                    </>

                                )}

                            </div>

                        )}


                        {/* DAILY APPOINTMENT LIMIT */}
                        {selectedJobTitle?.id === "Doctor" &&
                            selectedPaymentType?.id === "Pre Consultation" && (

                                <div className="formRow">

                                    {hospitalCommissionEnabled && (

                                        <div className="formGroup">

                                            <label className="customLabel">
                                                Hospital Commission Type{" "}<span className="text-danger">*</span>
                                            </label>

                                            <CustomFormDropdown
                                                options={
                                                    COMMISSION_OPTIONS
                                                }
                                                value={
                                                    selectedCommissionType
                                                }
                                                onChange={(value) =>
                                                    setSelectedCommissionType(
                                                        value
                                                    )
                                                }
                                                placeholder="Select Commission Type"
                                            />

                                        </div>
                                    )}

                                    {/* FIXED AMOUNT FIELD */}
                                    {selectedCommissionType?.id === "Fixed Amount" && (

                                        <div className="formGroup">

                                            <label className="customLabel">
                                                Amount{" "}<span className="text-danger">*</span>
                                            </label>

                                            <div className="inputWrapper">

                                                <input
                                                    type="text"
                                                    name="amount"
                                                    value={
                                                        workInfo.amount
                                                    }
                                                    onChange={
                                                        handleWorkInputChange
                                                    }
                                                    className="customInput"
                                                    placeholder="Enter Amount"
                                                />

                                                <i className="ri-currency-line"></i>

                                            </div>

                                        </div>

                                    )}

                                    {/* PERCENTAGE FIELD */}
                                    {selectedCommissionType?.id === "Percentage" && (

                                        <div className="formGroup">

                                            <label className="customLabel">
                                                Percentage{" "}<span className="text-danger">*</span>
                                            </label>

                                            <div className="inputWrapper">

                                                <input
                                                    type="text"
                                                    name="percentage"
                                                    value={
                                                        workInfo.percentage
                                                    }
                                                    onChange={
                                                        handleWorkInputChange
                                                    }
                                                    className="customInput"
                                                    placeholder="Enter Percentage"
                                                />

                                                <i className="ri-percent-line"></i>

                                            </div>

                                        </div>

                                    )}

                                    <div className="formGroup">

                                        <label className="customLabel">
                                            Daily Appointment Limit{" "}<span className="text-danger">*</span>
                                        </label>

                                        <div className="inputWrapper">

                                            <input
                                                type="text"
                                                name="dailyAppointmentLimit"
                                                value={
                                                    workInfo.dailyAppointmentLimit
                                                }
                                                onChange={
                                                    handleWorkInputChange
                                                }
                                                className="customInput"
                                                placeholder="Enter Daily Appointment Limit"
                                            />

                                            <i className="ri-calendar-check-line"></i>

                                        </div>

                                    </div>

                                </div>

                            )
                        }


                        {/* BANKS DETAILS ROW */}
                        <div className="formRow">

                            <div className="formGroup">

                                <label className="customLabel">
                                    Swift Code{" "}<span className="text-danger">*</span>
                                </label>

                                <div className="inputWrapper">

                                    <input
                                        type="text"
                                        name="swiftCode"
                                        value={workInfo.swiftCode}
                                        onChange={
                                            handleWorkInputChange
                                        }
                                        className="customInput"
                                        placeholder="Enter Swift Code"
                                    />

                                    <i className="ri-bank-line"></i>

                                </div>

                            </div>

                            <div className="formGroup">

                                <label className="customLabel">
                                    IBAN{" "}<span className="text-danger">*</span>
                                </label>

                                <div className="inputWrapper">

                                    <input
                                        type="text"
                                        name="iban"
                                        value={workInfo.iban}
                                        onChange={
                                            handleWorkInputChange
                                        }
                                        className="customInput"
                                        placeholder="Enter IBAN"
                                    />

                                    <i className="ri-bank-card-line"></i>

                                </div>

                            </div>

                            <div className="formGroup">

                                <label className="customLabel">
                                    Account Number{" "}<span className="text-danger">*</span>
                                </label>

                                <div className="inputWrapper">

                                    <input
                                        type="text"
                                        name="accountNumber"
                                        value={
                                            workInfo.accountNumber
                                        }
                                        onChange={
                                            handleWorkInputChange
                                        }
                                        className="customInput"
                                        placeholder="Enter Account Number"
                                    />

                                    <i className="ri-file-list-3-line"></i>

                                </div>

                            </div>

                        </div>

                        {/* Action Buttons */}
                        <div className="d-flex justify-content-between border-0 pb-0 mt-5">
                            <button
                                type="button"
                                className="aph-modal-btn-height outline-0 col-md-4 border border-secondary text-body-secondary bg-white fs-18 fw-400"
                                onClick={handlePrevious}
                            >
                                Back
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

                {currentStep === 3 && (

                    <div className="formContainer p-3 rounded-1">

                        <h5 className="fs-18 fw-500 mb-4">
                            Working Days & Shift
                        </h5>

                        {/* DAY BUTTONS */}
                        <div className="d-flex justify-content-center flex-wrap gap-2 mb-4">

                            {DAYS.map((day) => (

                                <button
                                    key={day}
                                    type="button"
                                    onClick={() =>
                                        handleDaySelection(day)
                                    }
                                    style={{
                                        border: "none",
                                        padding:
                                            "10px 20px",
                                        borderRadius:
                                            "6px",
                                        height: "55px",
                                        background:
                                            selectedDays.includes(
                                                day
                                            )
                                                ? "#7367F0"
                                                : "#7367F029",
                                        color:
                                            selectedDays.includes(
                                                day
                                            )
                                                ? "#FFFFFF"
                                                : "#7367F0",
                                        fontWeight: 500,
                                    }}
                                >
                                    {day}
                                </button>

                            ))}

                        </div>

                        {/* SHIFT DROPDOWN */}
                        <div className="formRow">

                            <div className="formGroup">

                                <label className="customLabel">
                                    Shift{" "}<span className="text-danger">*</span>
                                </label>

                                <CustomFormDropdown
                                    options={
                                        SHIFT_OPTIONS
                                    }
                                    value={
                                        selectedShift
                                    }
                                    onChange={(value) =>
                                        setSelectedShift(
                                            value
                                        )
                                    }
                                    placeholder="Select Shift"
                                />

                            </div>

                            {selectedShift?.id === "Fixed Shift" && (

                                <>
                                    {/* <div className="formRow"> */}

                                    <div className="formGroup">

                                        <label className="customLabel">
                                            Shift Type{" "}<span className="text-danger">*</span>
                                        </label>

                                        <CustomFormDropdown
                                            options={
                                                SHIFT_TYPE_OPTIONS
                                            }
                                            value={
                                                selectedShiftType
                                            }
                                            onChange={
                                                handleShiftTypeChange
                                            }
                                            placeholder="Select Shift Type"
                                        />

                                    </div>

                                    {/* </div> */}

                                </>
                            )}

                        </div>

                        {selectedShift?.id === "Fixed Shift" && (
                            <>
                                <div className="formRow">

                                    <div className="formGroup">

                                        <label className="customLabel">
                                            Start Time
                                        </label>

                                        <div className="inputWrapper">

                                            <input
                                                value={
                                                    startTime
                                                }
                                                disabled
                                                className="customInput"
                                            />

                                            <i className="ri-play-circle-line"></i>

                                        </div>

                                    </div>

                                    <div className="formGroup">

                                        <label className="customLabel">
                                            End Time
                                        </label>

                                        <div className="inputWrapper">

                                            <input
                                                value={
                                                    endTime
                                                }
                                                disabled
                                                className="customInput"
                                            />

                                            <i className="ri-stop-circle-line"></i>

                                        </div>

                                    </div>

                                </div>
                            </>
                        )}

                        {selectedShift?.id === "Multiple Shift" && (

                            <div className="table-responsive mt-4">

                                <table className="table table-bordered align-middle">

                                    <thead>

                                        <tr>

                                            <th className="text-center text-muted">
                                                #
                                            </th>

                                            <th className="text-center text-muted">
                                                Day
                                            </th>

                                            <th className="text-center text-muted">
                                                Shift Type
                                            </th>

                                            <th className="text-center text-muted">
                                                Start Time
                                            </th>

                                            <th className="text-center text-muted">
                                                End Time
                                            </th>

                                        </tr>

                                    </thead>

                                    <tbody>

                                        {selectedDays.map(
                                            (day, index) => {

                                                const row =
                                                    multipleShiftData.find(
                                                        (
                                                            item
                                                        ) =>
                                                            item.day ===
                                                            day
                                                    );

                                                return (
                                                    <tr
                                                        key={
                                                            day
                                                        }
                                                    >
                                                        <td className="text-center align-middle">
                                                            {index + 1}
                                                        </td>

                                                        <td className="text-center align-middle">
                                                            {day}
                                                        </td>

                                                        <td
                                                            className="text-center align-middle"
                                                            style={{
                                                                minWidth: "200px",
                                                            }}
                                                        >

                                                            <CustomFormDropdown
                                                                options={
                                                                    SHIFT_TYPE_OPTIONS
                                                                }
                                                                value={
                                                                    row?.shiftType
                                                                        ? {
                                                                            id: row.shiftType,
                                                                            name: row.shiftType,
                                                                        }
                                                                        : null
                                                                }
                                                                onChange={(value) =>
                                                                    handleMultipleShiftChange(
                                                                        day,
                                                                        value?.id || ""
                                                                    )
                                                                }
                                                                placeholder="Select Shift"
                                                            />

                                                        </td>

                                                        <td
                                                            className="text-center align-middle"
                                                            style={{
                                                                maxWidth: "100px",
                                                            }}
                                                        >
                                                            <div className="inputWrapper">
                                                                <input
                                                                    type="text"
                                                                    value={
                                                                        row?.startTime || ""
                                                                    }
                                                                    className="customInput text-center"
                                                                    disabled
                                                                    readOnly
                                                                />
                                                                <i className="ri-play-circle-line"></i>
                                                            </div>

                                                        </td>

                                                        <td
                                                            className="text-center align-middle"
                                                            style={{
                                                                maxWidth: "100px",
                                                            }}
                                                        >
                                                            <div className="inputWrapper">
                                                                <input
                                                                    type="text"
                                                                    value={
                                                                        row?.endTime || ""
                                                                    }
                                                                    className="customInput text-center"
                                                                    disabled
                                                                    readOnly
                                                                />
                                                                <i className="ri-stop-circle-line"></i>
                                                            </div>

                                                        </td>

                                                    </tr>
                                                );
                                            }
                                        )}

                                    </tbody>

                                </table>

                            </div>

                        )}

                        {/* Action Buttons */}
                        <div className="d-flex justify-content-between border-0 pb-0 mt-4">
                            <button
                                type="button"
                                className="aph-modal-btn-height outline-0 col-md-4 border border-secondary text-body-secondary bg-white fs-18 fw-400"
                                onClick={handlePrevious}
                            >
                                Back
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

                {currentStep === 4 && (

                    <div className="formContainer p-3 rounded-1">

                        <h5 className="fs-18 fw-500 mb-4">
                            Documentation
                        </h5>

                        <div className="formRow">

                            {/* ID Card */}

                            <div className="formGroup">

                                <label className="customLabel">
                                    ID Card{" "}<span className="text-danger">*</span>
                                </label>

                                <div
                                    className="uploadBox"
                                    onClick={() =>
                                        document
                                            .getElementById(
                                                "idCardInput"
                                            )
                                            ?.click()
                                    }
                                >

                                    {idCardFile ? (

                                        <span>
                                            {idCardFile.name}
                                        </span>

                                    ) : (

                                        <p>
                                            Upload ID Card
                                        </p>

                                    )}

                                </div>

                                <input
                                    id="idCardInput"
                                    type="file"
                                    accept=".png,.jpg,.jpeg,.pdf"
                                    style={{
                                        display: "none",
                                    }}
                                    onChange={(e) => {

                                        const file =
                                            e.target
                                                .files?.[0];

                                        if (file) {

                                            setIdCardFile(
                                                file
                                            );

                                        }

                                    }}
                                />

                            </div>

                            {/* Contract */}

                            <div className="formGroup">

                                <label className="customLabel">
                                    Contract{" "}<span className="text-danger">*</span>
                                </label>

                                <div
                                    className="uploadBox"
                                    onClick={() =>
                                        document
                                            .getElementById(
                                                "contractInput"
                                            )
                                            ?.click()
                                    }
                                >

                                    {contractFile ? (

                                        <span>
                                            {contractFile.name}
                                        </span>

                                    ) : (

                                        <p>
                                            Upload Contract
                                        </p>

                                    )}

                                </div>

                                <input
                                    id="contractInput"
                                    type="file"
                                    accept=".pdf,.png,.jpg,.jpeg"
                                    style={{
                                        display: "none",
                                    }}
                                    onChange={(e) => {

                                        const file =
                                            e.target
                                                .files?.[0];

                                        if (file) {

                                            setContractFile(
                                                file
                                            );

                                        }

                                    }}
                                />

                            </div>

                        </div>

                        <div className="formRow">

                            <div className="formGroup">

                                <label className="customLabel">
                                    ID Number{" "}<span className="text-danger">*</span>
                                </label>

                                <div className="inputWrapper">

                                    <input
                                        type="text"
                                        name="idNumber"
                                        placeholder="Enter ID Number"
                                        value={
                                            documentInfo.idNumber
                                        }
                                        onChange={
                                            handleDocumentInputChange
                                        }
                                        className="customInput"
                                    />

                                    <i className="ri-fingerprint-line"></i>

                                </div>

                            </div>

                            <div className="formGroup">

                                <label className="customLabel">
                                    Issuing Date{" "}<span className="text-danger">*</span>
                                </label>

                                <div
                                    style={{
                                        position:
                                            "relative",
                                    }}
                                >

                                    <div
                                        className="customInput d-flex align-items-center"
                                        onClick={() =>
                                            setShowIssuingDateCalendar(
                                                !showIssuingDateCalendar
                                            )
                                        }
                                        style={{
                                            cursor:
                                                "pointer",
                                        }}
                                    >

                                        {issuingDate

                                            ? `${String(
                                                issuingDate.getDate()
                                            ).padStart(
                                                2,
                                                "0"
                                            )}/${String(
                                                issuingDate.getMonth() + 1
                                            ).padStart(
                                                2,
                                                "0"
                                            )}/${issuingDate.getFullYear()}`

                                            : "DD/MM/YYYY"}

                                    </div>

                                    <i
                                        className="ri-calendar-line"
                                        style={{
                                            position:
                                                "absolute",
                                            right:
                                                "15px",
                                            top:
                                                "50%",
                                            transform:
                                                "translateY(-50%)",
                                            pointerEvents:
                                                "none",
                                        }}
                                    ></i>

                                    {showIssuingDateCalendar && (

                                        <div
                                            style={{
                                                position:
                                                    "absolute",
                                                top:
                                                    "100%",
                                                left:
                                                    0,
                                                zIndex:
                                                    1000,
                                                marginTop:
                                                    "4px",
                                            }}
                                        >

                                            <DateFilterCalendar
                                                selectedDate={
                                                    issuingDate
                                                }
                                                onDateSelect={(
                                                    date
                                                ) => {

                                                    setIssuingDate(
                                                        date
                                                    );

                                                    setShowIssuingDateCalendar(
                                                        false
                                                    );

                                                }}
                                            />

                                        </div>

                                    )}

                                </div>

                            </div>

                        </div>

                        <div className="mt-4 mb-3">

                            <h5 className="fw-500 fs-18 mb-3">
                                Certificate
                            </h5>

                            <div className="formRow">

                                <div className="formGroup">

                                    <label className="customLabel">
                                        Certificate Name{" "}<span className="text-danger">*</span>
                                    </label>

                                    <div className="inputWrapper">

                                        <input
                                            type="text"
                                            name="certificateName"
                                            value={
                                                certificateForm.certificateName
                                            }
                                            onChange={
                                                handleCertificateInputChange
                                            }
                                            className="customInput"
                                            placeholder="Enter Certificate Name"
                                        />

                                        <i className="ri-award-line"></i>

                                    </div>

                                </div>

                                <div className="formGroup">

                                    <label className="customLabel">
                                        Certificate Date{" "}<span className="text-danger">*</span>
                                    </label>

                                    <div
                                        style={{
                                            position:
                                                "relative",
                                        }}
                                    >

                                        <div
                                            className="customInput d-flex align-items-center"
                                            onClick={() =>
                                                setShowCertificateCalendar(
                                                    !showCertificateCalendar
                                                )
                                            }
                                            style={{
                                                cursor:
                                                    "pointer",
                                            }}
                                        >

                                            {certificateDate

                                                ? `${String(
                                                    certificateDate.getDate()
                                                ).padStart(
                                                    2,
                                                    "0"
                                                )}/${String(
                                                    certificateDate.getMonth() + 1
                                                ).padStart(
                                                    2,
                                                    "0"
                                                )}/${certificateDate.getFullYear()}`

                                                : "DD/MM/YYYY"}

                                        </div>

                                        <i
                                            className="ri-calendar-line"
                                            style={{
                                                position:
                                                    "absolute",
                                                right:
                                                    "15px",
                                                top:
                                                    "50%",
                                                transform:
                                                    "translateY(-50%)",
                                                pointerEvents:
                                                    "none",
                                            }}
                                        ></i>

                                        {showCertificateCalendar && (

                                            <div
                                                style={{
                                                    position:
                                                        "absolute",
                                                    top:
                                                        "100%",
                                                    left:
                                                        0,
                                                    zIndex:
                                                        1000,
                                                    marginTop:
                                                        "4px",
                                                }}
                                            >

                                                <DateFilterCalendar
                                                    selectedDate={
                                                        certificateDate
                                                    }
                                                    onDateSelect={(
                                                        date
                                                    ) => {

                                                        setCertificateDate(
                                                            date
                                                        );

                                                        setShowCertificateCalendar(
                                                            false
                                                        );

                                                    }}
                                                />

                                            </div>

                                        )}

                                    </div>

                                </div>

                            </div>

                            <div className="formRow">

                                <div className="formGroup">

                                    <label className="customLabel">
                                        Certificate ID{" "}<span className="text-danger">*</span>
                                    </label>

                                    <div className="inputWrapper">

                                        <input
                                            type="text"
                                            name="certificateId"
                                            value={
                                                certificateForm.certificateId
                                            }
                                            onChange={
                                                handleCertificateInputChange
                                            }
                                            className="customInput"
                                            placeholder="Enter Certificate ID"
                                        />

                                        <i className="ri-file-list-3-line"></i>

                                    </div>

                                </div>

                                <div className="formGroup">

                                    <label className="customLabel">
                                        Certificate File{" "}<span className="text-danger">*</span>
                                    </label>

                                    <div
                                        className="uploadBox"
                                        onClick={() =>
                                            document
                                                .getElementById(
                                                    "certificateFileInput"
                                                )
                                                ?.click()
                                        }
                                    >

                                        {certificateFile ? (

                                            <span>
                                                {certificateFile.name}
                                            </span>

                                        ) : (

                                            <p>
                                                Upload Certificate
                                            </p>

                                        )}

                                    </div>

                                    <input
                                        id="certificateFileInput"
                                        type="file"
                                        accept=".pdf,.png,.jpg,.jpeg"
                                        style={{
                                            display:
                                                "none",
                                        }}
                                        onChange={(e) => {

                                            const file =
                                                e.target
                                                    .files?.[0];

                                            if (file) {

                                                setCertificateFile(
                                                    file
                                                );

                                            }

                                        }}
                                    />

                                </div>

                            </div>

                            <div className="d-flex justify-content-end mt-4">

                                <button
                                    type="button"
                                    onClick={
                                        handleSaveCertificate
                                    }
                                    style={{ backgroundColor: "#A78CEA" }}
                                    className="btn text-white px-5 col-md-4"
                                >
                                    Save & Add New
                                </button>

                            </div>

                            {certificateList.length > 0 && (

                                <div className="table-responsive mt-4">

                                    <table className="table table-bordered">

                                        <thead>

                                            <tr>

                                                <th className="text-center">
                                                    #
                                                </th>

                                                <th className="text-center">
                                                    Certificate Name
                                                </th>

                                                <th className="text-center">
                                                    Certificate Date
                                                </th>

                                                <th className="text-center">
                                                    Certificate ID
                                                </th>

                                                <th className="text-center">
                                                    File Name
                                                </th>

                                                <th className="text-center">
                                                    Action
                                                </th>

                                            </tr>

                                        </thead>

                                        <tbody>

                                            {certificateList.map(
                                                (
                                                    item,
                                                    index
                                                ) => (

                                                    <tr
                                                        key={
                                                            index
                                                        }
                                                    >

                                                        <td className="text-center">
                                                            {index + 1}
                                                        </td>

                                                        <td className="text-center">
                                                            {
                                                                item.certificateName
                                                            }
                                                        </td>

                                                        <td className="text-center">
                                                            {item.certificateDate
                                                                ? `${String(item.certificateDate.getDate()).padStart(2, "0")}/${String(item.certificateDate.getMonth() + 1).padStart(2, "0")}/${item.certificateDate.getFullYear()}`
                                                                : "-"
                                                            }
                                                        </td>

                                                        <td className="text-center">
                                                            {
                                                                item.certificateId
                                                            }
                                                        </td>

                                                        <td className="text-center">
                                                            {
                                                                item.certificateFile?.name
                                                            }
                                                        </td>

                                                        <td className="text-center">

                                                            <button
                                                                type="button"
                                                                className="border p-1 px-2 rounded-2 outline-0"
                                                                onClick={() =>
                                                                    handleDeleteCertificate(
                                                                        index
                                                                    )
                                                                }
                                                            >

                                                                <i
                                                                    className="ri-delete-bin-7-line"
                                                                    style={{
                                                                        color:
                                                                            "red",
                                                                    }}
                                                                ></i>

                                                            </button>

                                                        </td>

                                                    </tr>

                                                )
                                            )}

                                        </tbody>

                                    </table>

                                </div>

                            )}

                            {/* Action Buttons */}
                            <div className="d-flex justify-content-between border-0 pb-0 mt-4">
                                <button
                                    type="button"
                                    className="aph-modal-btn-height outline-0 col-md-4 border border-secondary text-body-secondary bg-white fs-18 fw-400"
                                    onClick={handlePrevious}
                                >
                                    Back
                                </button>
                                <button
                                    type='button'
                                    className="aph-modal-btn-height border-0 outline-0 col-md-7 bg-blue text-white fs-18 fw-400"
                                    onClick={
                                        handleAddNewEmployee
                                    }
                                >
                                    Add New
                                </button>
                            </div>

                        </div>


                    </div>
                )}

            </div>
        </>
    )
}
