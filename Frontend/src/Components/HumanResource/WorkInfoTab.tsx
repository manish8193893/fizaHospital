import { useState } from "react";

import DateFilterCalendar from "../../GlobalHelpers/DateFilterCalendar";
import CustomFormDropdown, {type DropdownOption,} from "../../GlobalHelpers/CustomFormDropdown";

import '../../styles/HumanResource.css'


export default function WorkInfoTab() {

    /********************************************
        Name : Edit Mode State
        Date : 11/06/2026
        Purpose : ENABLE / DISABLE FORM
    *********************************************/
    const [isEditMode, setIsEditMode] =
        useState<boolean>(false);

    /********************************************
        Name : Work Information State
        Date : 11/06/2026
        Purpose : STORE WORK INFORMATION
    *********************************************/
    const [workInfo, setWorkInfo] = useState({
        salary: "",
        doctorSalary: "",
        consultationFee: "15000",
        dailyAppointmentLimit: "10",
        swiftCode: "ABCD1234",
        iban: "SA0380000000608010167519",
        accountNumber: "1234567890",
        amount: "1500",
        percentage: "",
    });

    /********************************************
        Name : Department State
        Date : 11/06/2026
        Purpose : STORE DEPARTMENT
    *********************************************/
    const [selectedDepartment, setSelectedDepartment] =
        useState<DropdownOption | null>({
            id: "Cardiology",
            name: "Cardiology",
        });

    /********************************************
        Name : Job Title State
        Date : 11/06/2026
        Purpose : STORE JOB TITLE
    *********************************************/
    const [selectedJobTitle, setSelectedJobTitle] =
        useState<DropdownOption | null>({
            id: "Doctor",
            name: "Doctor",
        });

    /********************************************
        Name : Employment Type State
        Date : 11/06/2026
        Purpose : STORE EMPLOYMENT TYPE
    *********************************************/
    const [selectedEmploymentType,
        setSelectedEmploymentType] =
        useState<DropdownOption | null>({
            id: "Full Time",
            name: "Full Time",
        });

    /********************************************
        Name : Hire Date State
        Date : 11/06/2026
        Purpose : STORE HIRE DATE
    *********************************************/
    const [selectedHireDate,
        setSelectedHireDate] =
        useState<Date | null>(
            new Date("2025-01-01")
        );

    const [showHireDateCalendar,
        setShowHireDateCalendar] =
        useState(false);

    /********************************************
        Name : Doctor Payment State
        Date : 11/06/2026
        Purpose : STORE PAYMENT DETAILS
    *********************************************/
    const [selectedPaymentType,
        setSelectedPaymentType] =
        useState<DropdownOption | null>({
            id: "Pre Consultation",
            name: "Pre Consultation",
        });

    const [hospitalCommissionEnabled,
        setHospitalCommissionEnabled] =
        useState(true);

    const [selectedCommissionType,
        setSelectedCommissionType] =
        useState<DropdownOption | null>({
            id: "Fixed Amount",
            name: "Fixed Amount",
        });

    /********************************************
        Name : Department Options
        Date : 11/06/2026
        Purpose : DEPARTMENT OPTIONS
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
        { id: "Cardiology", name: "Cardiology" },
    ];

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

    const EMPLOYMENT_TYPE_OPTIONS: DropdownOption[] = [
        { id: "Full Time", name: "Full Time" },
        { id: "Part Time", name: "Part Time" },
    ];

    const PAYMENT_TYPE_OPTIONS: DropdownOption[] = [
        { id: "Salary", name: "Salary" },
        { id: "Pre Consultation", name: "Pre Consultation" },
    ];

    const COMMISSION_OPTIONS: DropdownOption[] = [
        { id: "Fixed Amount", name: "Fixed Amount" },
        { id: "Percentage", name: "Percentage" },
    ];

    const handleWorkInputChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {

        const { name, value } = e.target;

        setWorkInfo((prev) => ({
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

        const payload = {
            department: selectedDepartment,
            jobTitle: selectedJobTitle,
            employmentType: selectedEmploymentType,
            hireDate: selectedHireDate,
            paymentType: selectedPaymentType,
            commissionEnabled:
                hospitalCommissionEnabled,
            commissionType:
                selectedCommissionType,
            ...workInfo,
        };

        console.log(
            "Updated Work Info :",
            payload
        );

        setIsEditMode(false);
    };

    return (
        <div className="formContainer p-2 rounded-1 position-relative">

            <div className="d-flex justify-content-between mb-4">

                <h5 className="fs-18 fw-500">
                    Work Information
                </h5>

                {!isEditMode && (

                    <button className="back-btn" onClick={handleEdit}>
                        <i className="ri-pencil-ai-line fs-16"></i>
                    </button>
                )}

            </div>



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
                        disabled={!isEditMode}
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
                        disabled={!isEditMode}
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
                        disabled={!isEditMode}
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
                                disabled={!isEditMode}
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
                            disabled={!isEditMode}
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
                                    disabled={!isEditMode}
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
                                        disabled={!isEditMode}
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
                                    disabled={!isEditMode}
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
                                        disabled={!isEditMode}
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
                                        disabled={!isEditMode}
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
                                    disabled={!isEditMode}
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
                            disabled={!isEditMode}
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
                            disabled={!isEditMode}
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
                            disabled={!isEditMode}
                            placeholder="Enter Account Number"
                        />

                        <i className="ri-file-list-3-line"></i>

                    </div>

                </div>

            </div>

            {/* Bottom Buttons */}

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
    );
}