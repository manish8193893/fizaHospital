/******************************************************
    Name : Manish Kumar
    Date : 23/05/2026
    Purpose : System settings page with animated step transition
**************************************************************/

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import ShardaLogo from "../../../public/Assets/Images/ShardaLogo1.png";

import Stepper from "../../Components/Stepper/Stepper";
import CustomFormDropdown from "../../GlobalHelpers/CustomFormDropdown";
import type { DropdownOption } from "../../GlobalHelpers/CustomFormDropdown";

import styles from "../../styles/SystemSettings.module.css";

// TypeScript interfaces for dropdown options and shift-department mapping
interface ShiftDepartmentOption {
    id: string;
    shiftName: string;
    departmentName: string;
    startTime: string;
    endTime: string;
}

interface StaffUserUserNameList {
    id: string;
    name: string;
}


const SystemSettings = () => {
    /******************************************************
        Name : Manish Kumar
        Date : 23/05/2026
        Purpose : Step names
    **************************************************************/
    const steps = [
        "Hospital Information",
        "Departments Setup",
        "User Roles & Permissions",
        "Schedules & Timings",
        "Staff & Users",
        "Review & Finish",
    ];

    /******************************************************
        Name : Manish Kumar
        Date : 23/05/2026
        Purpose : Current active step
    **************************************************************/
    const [currentStep, setCurrentStep] = useState(0);

    /******************************************************
        Name : Manish Kumar
        Date : 23/05/2026
        Purpose : Highest visited step
    **************************************************************/
    const [highestVisitedStep, setHighestVisitedStep] = useState(0);

    /******************************************************
        Name : Manish Kumar
        Date : 23/05/2026
        Purpose : Hospital logo preview
    **************************************************************/
    const [previewImage, setPreviewImage] = useState<string | null>(null);

    /******************************************************
        Name : Manish Kumar
        Date : 23/05/2026
        Purpose : Status dropdown state
    **************************************************************/
    const [selectedStatus, setSelectedStatus] = useState<DropdownOption | null>(null);

    /******************************************************
        Name : Manish Kumar
        Date : 23/05/2026
        Purpose : Bookable dropdown state
    **************************************************************/
    const [selectedBookable, setSelectedBookable] = useState<DropdownOption | null>(null);

    /******************************************************
        Name : Manish Kumar
        Date : 23/05/2026
        Purpose : Status dropdown options
    **************************************************************/
    const STATUS_OPTIONS: DropdownOption[] = [
        { id: "1", name: "Active", },
        { id: "2", name: "In-Active", },
    ];

    /******************************************************
        Name : Manish Kumar
        Date : 23/05/2026
        Purpose : Bookable dropdown options
    **************************************************************/
    const BOOKABLE_OPTIONS: DropdownOption[] = [
        { id: "1", name: "Yes", },
        { id: "2", name: "No", },
    ];

    /******************************************************
        Name : Manish Kumar
        Date : 23/05/2026
        Purpose : Handle step click
    **************************************************************/
    const handleStepClick = (step: number) => {
        if (step <= highestVisitedStep) {
            setCurrentStep(step);
        }
    };

    /******************************************************
        Name : Manish Kumar
        Date : 23/05/2026
        Purpose : Handle next step
    **************************************************************/
    const handleNext = () => {
        if (currentStep < steps.length - 1) {
            const nextStep = currentStep + 1;

            setCurrentStep(nextStep);

            if (nextStep > highestVisitedStep) {
                setHighestVisitedStep(nextStep);
            }
        }
    };

    /******************************************************
        Name : Manish Kumar
        Date : 23/05/2026
        Purpose : Handle back step
    **************************************************************/
    const handleBack = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    /******************************************************
        Name : Manish Kumar
        Date : 23/05/2026
        Purpose : Handle finish - reset all stepper steps and move to step 1
    **************************************************************/
    const handleFinish = () => {
        // Reset stepper to step 1 (index 0)
        setCurrentStep(0);
        setHighestVisitedStep(0);

        // Clear all form states
        setPreviewImage(null);
        setSelectedStatus(null);
        setSelectedBookable(null);
        setSelectedDepartment(null);
        setSelectedShiftStatus(null);
        setSelectedStaffRole(null);
        setSelectedStaffDepartment(null);
        setSelectedStaffShift(null);
        setStartTime("");
        setEndTime("");
    };

    // Dynamic list state array
    const DEPARTMENTS_DATA = [
        { id: 1, name: 'Emergency' },
        { id: 2, name: 'Internal Medicine' },
        { id: 3, name: 'Surgery' },
        { id: 4, name: 'Pediatrics' }
    ];

    // Dynamic list state array
    const ROLES_DATA = [
        { id: 1, name: 'Admin' },
        { id: 2, name: 'Doctor' },
        { id: 3, name: 'Nurse' },
        { id: 4, name: 'Receptionist' }
    ];

    // Step -4 

    /******************************************************
        Name : Manish Kumar
        Date : 23/05/2026
        Purpose : Selected department dropdown
    **************************************************************/
    const [selectedDepartment, setSelectedDepartment] = useState<DropdownOption | null>(null);

    /******************************************************
        Name : Manish Kumar
        Date : 23/05/2026
        Purpose : Shift status dropdown
    **************************************************************/
    const [selectedShiftStatus, setSelectedShiftStatus] = useState<DropdownOption | null>(null);

    /******************************************************
        Name : Manish Kumar
        Date : 23/05/2026
        Purpose : Selected role dropdown
    **************************************************************/
    const [selectedStaffRole, setSelectedStaffRole] = useState<DropdownOption | null>(null);

    /******************************************************
        Name : Manish Kumar
        Date : 23/05/2026
        Purpose : Selected department dropdown
    **************************************************************/
    const [selectedStaffDepartment, setSelectedStaffDepartment,] = useState<DropdownOption | null>(null);

    /******************************************************
        Name : Manish Kumar
        Date : 23/05/2026
        Purpose : Selected shift dropdown
    **************************************************************/
    const [selectedStaffShift, setSelectedStaffShift] = useState<DropdownOption | null>(null);

    /******************************************************
        Name : Manish Kumar
        Date : 23/05/2026
        Purpose : Shift timing states
    **************************************************************/
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");

    /******************************************************
        Name : Manish Kumar
        Date : 23/05/2026
        Purpose : Department dropdown options
    **************************************************************/
    const DEPARTMENT_OPTIONS: DropdownOption[] = [
        { id: "1", name: "Cardiology" },
        { id: "2", name: "Neurology" },
        { id: "3", name: "Orthopedics" },
    ];

    const SHIFT_OPTIONS: ShiftDepartmentOption[] = [
        {
            id: "1",
            shiftName: "Morning",
            departmentName: "General Medicine",
            startTime: "12:30 PM",
            endTime: "08:30 PM"
        },
        {
            id: "2",
            shiftName: "Morning",
            departmentName: "Gynecology",
            startTime: "12:21 PM",
            endTime: "08:21 PM"
        },
        {
            id: "3",
            shiftName: "Morning",
            departmentName: "Pediatrics",
            startTime: "07:00 AM",
            endTime: "03:00 PM"
        },
        {
            id: "4",
            shiftName: "Evening",
            departmentName: "Cardiology",
            startTime: "03:00 PM",
            endTime: "11:00 PM"
        },
        {
            id: "5",
            shiftName: "Night",
            departmentName: "Emergency",
            startTime: "11:00 PM",
            endTime: "07:00 AM"
        },
        {
            id: "6",
            shiftName: "Afternoon",
            departmentName: "Neurology",
            startTime: "01:00 PM",
            endTime: "09:00 PM"
        }
    ];

    /******************************************************
        Name : Manish Kumar
        Date : 23/05/2026
        Purpose : Staff user role dropdown options
    **************************************************************/
    const StaffUserRoleOptions: DropdownOption[] = [
        { id: "1", name: "Administrator", },
        { id: "2", name: "Doctor", },
        { id: "3", name: "Receptionist", },
    ];

    /******************************************************
        Name : Manish Kumar
        Date : 23/05/2026
        Purpose : Staff user department dropdown options
    **************************************************************/
    const StafUserDepartmentOptions: DropdownOption[] = [
        { id: "1", name: "Cardiology", },
        { id: "2", name: "Neurology", },
        { id: "3", name: "Orthopedics", },
    ];

    /******************************************************
        Name : Manish Kumar
        Date : 23/05/2026
        Purpose : Staff user shift dropdown options
    **************************************************************/
    const StaffUserShiftOptions: DropdownOption[] = [
        { id: "1", name: "Morning Shift", },
        { id: "2", name: "Evening Shift", },
        { id: "3", name: "Night Shift", },
    ];

    const StaffUserUserNameList: StaffUserUserNameList[] = [
        { id: "1", name: "Fatima Al-Tamimi" },
        { id: "2", name: "Rana Al-Obaidi" },
        { id: "3", name: "Mustafa Al-Kadhimi" },
        { id: "4", name: "Huda Al-Dulaimi" },
        { id: "5", name: "Omar Al-Basri" },
        { id: "6", name: "Zaid Al-Mansour" }
    ];


    /******************************************************
        Name : Manish Kumar
        Date : 23/05/2026
        Purpose : Calculate duration between times
    **************************************************************/
    const calculateDuration = () => {

        if (!startTime || !endTime) return "";

        const start = new Date(`1970-01-01T${startTime}:00`);
        const end = new Date(`1970-01-01T${endTime}:00`);

        const diff =
            (end.getTime() - start.getTime()) / 1000 / 60;

        if (diff <= 0) return "";

        const hours = Math.floor(diff / 60);
        const minutes = diff % 60;

        return `${hours}h ${minutes}m`;
    };

    /******************************************************
        Name : Manish Kumar
        Date : 23/05/2026
        Purpose : Animation variants
    **************************************************************/
    const pageVariants = {
        initial: {
            opacity: 0,
            x: 50,
        },

        animate: {
            opacity: 1,
            x: 0,
        },

        exit: {
            opacity: 0,
            x: -50,
        },
    };

    return (
        <div className={`${styles.pageWrapper} bg-white py-3 px-4`}>
            {/* Top Header */}
            <div className={`${styles.topSection}`}>

                <h2 className={`${styles.heading} mb-0`}>
                    <img
                        src={ShardaLogo}
                        alt="Sharda University Logo"
                        className={`${styles.logo}`}
                    />
                    Management Dashboard
                </h2>

                <button className={`${styles.logoutBtn}`}>
                    Logout
                </button>
            </div>

            {/* Stepper */}
            <div className={styles.stepperSection}>
                <Stepper
                    steps={steps}
                    currentStep={currentStep}
                    highestVisitedStep={highestVisitedStep}
                    onStepClick={handleStepClick}
                />
            </div>

            {/* Main Content */}
            <div className={`${styles.contentSection} p-3`}>
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentStep}
                        variants={pageVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        transition={{
                            duration: 0.4,
                        }}
                    >
                        {/* Step 1 */}
                        {currentStep === 0 && (
                            <div className={`${styles.hospitalInfoContainer}`}>

                                {/* TOP HEADING */}
                                <div className={`${styles.hospitalInfoHeader} mb-4`}>
                                    <h1 className={styles.formTitle}>
                                        Hospital Information
                                    </h1>

                                    <p className={`${styles.formSubtitle} mb-0`}>
                                        Enter basic hospital details such as
                                        name, address and contact information.
                                    </p>
                                </div>

                                {/* MAIN CONTENT */}
                                <div className={`${styles.hospitalInfoContent}`}>

                                    {/* LEFT SIDE */}
                                    <div className={`${styles.leftSection} d-flex align-items-start pt-5`}>

                                        <input
                                            type="file"
                                            id="hospitalLogo"
                                            accept="image/*"
                                            hidden
                                            onChange={(e) => {
                                                const file = e.target.files?.[0];

                                                if (file) {
                                                    const imageUrl =
                                                        URL.createObjectURL(file);

                                                    setPreviewImage(imageUrl);
                                                }
                                            }}
                                        />

                                        <div
                                            className={styles.uploadBox}
                                            onClick={() => {
                                                document
                                                    .getElementById("hospitalLogo")
                                                    ?.click();
                                            }}
                                        >

                                            {previewImage ? (
                                                <div className={`${styles.previewWrapper} d-flex justify-content-center align-items-center`}>

                                                    <img
                                                        src={previewImage}
                                                        alt="Hospital Logo"
                                                        className={`${styles.previewImage} rounded-2`}
                                                    />

                                                    <button
                                                        className={`${styles.removeImageBtn} d-flex justify-content-center align-items-center`}
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setPreviewImage(null);
                                                        }}
                                                    >
                                                        ✕
                                                    </button>
                                                </div>
                                            ) : (
                                                <>
                                                    <i className="ri-upload-cloud-2-line mb-0"></i>

                                                    <p className="mb-0">
                                                        Upload Hospital logo
                                                    </p>
                                                </>
                                            )}
                                        </div>
                                    </div>

                                    {/* RIGHT SIDE */}
                                    <div className={`${styles.rightSection}`}>

                                        <form autoComplete="off">

                                            {/* ROW 1 */}
                                            <div className={styles.formRow}>

                                                <div className={styles.formGroup}>
                                                    <label className={styles.customLabel} htmlFor="hospitalName">
                                                        Hospital Name <span className='text-danger'>*</span>
                                                    </label>

                                                    <div className={styles.inputWrapper}>
                                                        <input
                                                            id="hospitalName"
                                                            type="text"
                                                            className={styles.customInput}
                                                            placeholder="Enter hospital name"
                                                        />

                                                        <i className="ri-hospital-line"></i>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* ROW 2 */}
                                            <div className={styles.formRow}>


                                                <div className={styles.formGroup}>
                                                    <label className={styles.customLabel} htmlFor="address">
                                                        Address <span className='text-danger'>*</span>
                                                    </label>

                                                    <div className={styles.inputWrapper}>
                                                        <input
                                                            id="address"
                                                            type="text"
                                                            className={styles.customInput}
                                                            placeholder="Enter address"
                                                        />

                                                        <i className="ri-map-pin-line"></i>
                                                    </div>
                                                </div>

                                                <div className={styles.formGroup}>
                                                    <label className={styles.customLabel} htmlFor="city">
                                                        City <span className='text-danger'>*</span>
                                                    </label>

                                                    <div className={styles.inputWrapper}>
                                                        <input
                                                            id="city"
                                                            type="text"
                                                            className={styles.customInput}
                                                            placeholder="Enter city"
                                                        />

                                                        <i className="ri-building-line"></i>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* ROW 3 */}
                                            <div className={styles.formRow}>

                                                <div className={styles.formGroup}>
                                                    <label className={styles.customLabel} htmlFor="phone">
                                                        Phone <span className='text-danger'>*</span>
                                                    </label>

                                                    <div className={styles.inputWrapper}>
                                                        <input
                                                            id="phone"
                                                            type="text"
                                                            className={styles.customInput}
                                                            placeholder="Enter phone number"
                                                        />

                                                        <i className="ri-phone-line"></i>
                                                    </div>
                                                </div>

                                                <div className={styles.formGroup}>
                                                    <label className={styles.customLabel} htmlFor="email">
                                                        Email <span className='text-danger'>*</span>
                                                    </label>

                                                    <div className={styles.inputWrapper}>
                                                        <input
                                                            id="email"
                                                            type="email"
                                                            className={styles.customInput}
                                                            placeholder="Enter email"
                                                        />

                                                        <i className="ri-mail-line"></i>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* ROW 4 */}
                                            <div className={styles.formRow}>

                                                <div className={styles.formGroup}>
                                                    <label className={styles.customLabel} htmlFor="workingHours">
                                                        Working Hours <span className='text-danger'>*</span>
                                                    </label>

                                                    <div className={styles.inputWrapper}>
                                                        <input
                                                            id="workingHours"
                                                            type="text"
                                                            className={styles.customInput}
                                                            placeholder="Working Hours"
                                                        />

                                                        <i className="ri-time-line"></i>
                                                    </div>
                                                </div>

                                                <div className={styles.formGroup}>
                                                    <label className={styles.customLabel} htmlFor="numberOfFloors">
                                                        Number of Floors <span className='text-danger'>*</span>
                                                    </label>

                                                    <div className={styles.inputWrapper}>
                                                        <input
                                                            id="numberOfFloors"
                                                            type="number"
                                                            min={0}
                                                            className={styles.customInput}
                                                            placeholder="Enter floors"
                                                        />

                                                        <i className="ri-building-2-line"></i>
                                                    </div>
                                                </div>

                                            </div>

                                            {/* BUTTON */}
                                            <div className={`${styles.buttonWrapper}`}>
                                                <button
                                                    type="button"
                                                    className={`${styles.nextBtn} col-md-8`}
                                                    onClick={handleNext}
                                                >
                                                    Save & Continue
                                                </button>
                                            </div>

                                        </form>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Step 2 */}
                        {currentStep === 1 && (
                            <div className={`${styles.hospitalInfoContainer}`}>

                                {/* TOP HEADING */}
                                <div className={`${styles.hospitalInfoHeader} mb-4`}>
                                    <h1 className={styles.formTitle}>
                                        Departments Setup
                                    </h1>

                                    <p className={`${styles.formSubtitle} mb-0`}>
                                        Create and Manage hospital departments to organize services and staff.
                                    </p>
                                </div>

                                {/* MAIN CONTENT */}
                                <div className={`${styles.hospitalInfoContent}`}>

                                    {/* LEFT SIDE */}
                                    <div className={`${styles.leftSection} d-flex flex-column align-items-center justify-content-start pt-3`}>
                                        <p className="text-blue fw-500 fs-18 mb-3">Current Department</p>

                                        {/* Added the scrollbar wrapper class here */}
                                        <div className={`${styles['list-scrollbar-container']} w-100 d-flex flex-column align-items-center px-1`}>
                                            {DEPARTMENTS_DATA.map((dept) => (
                                                <div
                                                    key={dept.id}
                                                    className={`${styles['department-card']} d-flex align-items-center my-1`}
                                                >

                                                    {/* Flex text block with calculated offset padding */}
                                                    <div className={`${styles['department-text']} text-start `}>
                                                        {dept.name}
                                                    </div>
                                                    {/* Actions block containing Remix Icon buttons */}
                                                    <div className="d-flex gap-2 align-items-center">
                                                        <button
                                                            className={`${styles['btn-action']} ${styles['btn-edit']}`}
                                                            aria-label={`Edit ${dept.name}`}
                                                        >
                                                            <i className="ri-pencil-line"></i>
                                                        </button>
                                                        <button
                                                            className={`${styles['btn-action']} ${styles['btn-delete']}`}
                                                            aria-label={`Delete ${dept.name}`}
                                                        >
                                                            <i className="ri-delete-bin-line"></i>
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* RIGHT SIDE */}
                                    <div className={`${styles.rightSection}`}>

                                        {/* FORM */}
                                        <form>

                                            {/* ROW 1 */}
                                            <div className={styles.formRow}>

                                                {/* Department Name */}
                                                <div className={styles.formGroup}>
                                                    <label className={styles.customLabel} htmlFor="departmentName">
                                                        Department Name <span className='text-danger'>*</span>
                                                    </label>

                                                    <div className={styles.inputWrapper}>
                                                        <input
                                                            id="departmentName"
                                                            type="text"
                                                            className={styles.customInput}
                                                            placeholder="Enter department name"
                                                        />

                                                        <i className="ri-building-line"></i>
                                                    </div>
                                                </div>

                                                {/* Floor Number */}
                                                <div className={styles.formGroup}>
                                                    <label className={styles.customLabel} htmlFor="floorNumber">
                                                        Floor Number <span className='text-danger'>*</span>
                                                    </label>

                                                    <div className={styles.inputWrapper}>
                                                        <input
                                                            id="floorNumber"
                                                            type="number"
                                                            min={0}
                                                            className={styles.customInput}
                                                            placeholder="Enter floor number"
                                                        />

                                                        <i className="ri-building-2-line"></i>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* ROW 2 */}
                                            <div className={styles.formRow}>

                                                {/* Department Code */}
                                                <div className={styles.formGroup}>
                                                    <label className={styles.customLabel} htmlFor="departmentCode">
                                                        Department Code <span className='text-danger'>*</span>
                                                    </label>

                                                    <div className={styles.inputWrapper}>
                                                        <input
                                                            id="departmentCode"
                                                            type="text"
                                                            disabled
                                                            className={styles.customInput}
                                                            value="DEP-001"
                                                            readOnly
                                                        />

                                                        <i className="ri-file-code-line"></i>
                                                    </div>
                                                </div>

                                                {/* Status */}
                                                <div className={styles.formGroup}>
                                                    <label className={styles.customLabel} htmlFor="status">
                                                        Status <span className='text-danger'>*</span>
                                                    </label>

                                                    <CustomFormDropdown
                                                        options={STATUS_OPTIONS}
                                                        id="status"
                                                        value={selectedStatus}
                                                        onChange={(value) =>
                                                            setSelectedStatus(value)
                                                        }
                                                        placeholder="Select Status"
                                                        required={true}
                                                    />
                                                </div>
                                            </div>

                                            {/* ROW 3 */}
                                            <div className={styles.formRow}>

                                                {/* Bookable */}
                                                <div className={`${styles.formGroup} ${styles.halfWidth}`}>
                                                    <label className={styles.customLabel} htmlFor="bookable">
                                                        Bookable <span className='text-danger'>*</span>
                                                    </label>

                                                    <CustomFormDropdown
                                                        options={BOOKABLE_OPTIONS}
                                                        id="bookable"
                                                        value={selectedBookable}
                                                        onChange={(value) =>
                                                            setSelectedBookable(value)
                                                        }
                                                        placeholder="Select Option"
                                                        required={true}
                                                    />
                                                </div>
                                            </div>

                                            {/* BUTTONS */}
                                            <div className={styles.multiButtonWrapper}>

                                                <button
                                                    type="button"
                                                    className={styles.outlineBtn}
                                                >
                                                    Save & Next
                                                </button>

                                                <button
                                                    type="button"
                                                    className={`${styles.nextBtn} col-md-7`}
                                                    onClick={handleNext}
                                                >
                                                    Save & Continue
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Step 3 */}
                        {currentStep === 2 && (
                            <div className={`${styles.hospitalInfoContainer}`}>

                                {/* TOP HEADING */}
                                <div className={`${styles.hospitalInfoHeader} mb-4`}>
                                    <h1 className={styles.formTitle}>
                                        User Roles & Permissions
                                    </h1>

                                    <p className={`${styles.formSubtitle} mb-0`}>
                                        Define user roles and control access permissions within the system.
                                    </p>
                                </div>

                                {/* MAIN CONTENT */}
                                <div className={`${styles.hospitalInfoContent}`}>

                                    {/* LEFT SIDE */}
                                    <div className={`${styles.leftSection} d-flex flex-column align-items-center justify-content-start`}>
                                        <p className="text-blue fw-500 fs-18 mb-3">Current Roles</p>

                                        {/* Added the scrollbar wrapper class here */}
                                        <div className={`${styles['list-scrollbar-container']} w-100 d-flex flex-column align-items-center px-1`}>
                                            {ROLES_DATA.map((dept) => (
                                                <div
                                                    key={dept.id}
                                                    className={`${styles['department-card']} d-flex align-items-center my-1`}
                                                >

                                                    {/* Flex text block with calculated offset padding */}
                                                    <div className={`${styles['department-text']} text-start `}>
                                                        {dept.name}
                                                    </div>
                                                    {/* Actions block containing Remix Icon buttons */}
                                                    <div className="d-flex gap-2 align-items-center">
                                                        <button
                                                            className={`${styles['btn-action']} ${styles['btn-edit']}`}
                                                            aria-label={`Edit ${dept.name}`}
                                                        >
                                                            <i className="ri-pencil-line"></i>
                                                        </button>
                                                        <button
                                                            className={`${styles['btn-action']} ${styles['btn-delete']}`}
                                                            aria-label={`Delete ${dept.name}`}
                                                        >
                                                            <i className="ri-delete-bin-line"></i>
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* RIGHT SIDE */}
                                    <div className={`${styles.rightSection}`}>

                                        {/* FORM */}
                                        <form autoComplete="off">

                                            {/* ROW 1 */}
                                            <div className={styles.formRow}>

                                                {/* Role Name */}
                                                <div
                                                    className={`${styles.formGroup}`}
                                                >
                                                    <label className={styles.customLabel} htmlFor="roleName">
                                                        Role Name <span className='text-danger'>*</span>
                                                    </label>

                                                    <div className={styles.inputWrapper}>
                                                        <input
                                                            id="roleName"
                                                            type="text"
                                                            className={styles.customInput}
                                                            placeholder="Enter role name"
                                                        />

                                                        <i className="ri-user-settings-line"></i>
                                                    </div>
                                                </div>

                                            </div>

                                            {/* BUTTONS */}
                                            <div className={styles.multiButtonWrapper}>

                                                <button
                                                    type="button"
                                                    className={styles.outlineBtn}
                                                >
                                                    Save & Next
                                                </button>

                                                <button
                                                    type="button"
                                                    className={`${styles.nextBtn} col-md-7`}
                                                    onClick={handleNext}
                                                >
                                                    Save & Continue
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Step 4 */}
                        {currentStep === 3 && (
                            <div className={`${styles.hospitalInfoContainer}`}>

                                {/* TOP HEADING */}
                                <div className={`${styles.hospitalInfoHeader} mb-4`}>
                                    <h1 className={styles.formTitle}>
                                        Schedules & Timings
                                    </h1>

                                    <p className={`${styles.formSubtitle} mb-0`}>
                                        Configure working hours, shifts, and service schedules.
                                    </p>
                                </div>

                                {/* MAIN CONTENT */}
                                <div className={`${styles.hospitalInfoContent}`}>

                                    {/* LEFT SIDE */}
                                    <div className={`${styles.leftSection} d-flex flex-column align-items-center justify-content-start`}>
                                        <p className="text-blue fw-500 fs-18 mb-3">Shift Names</p>

                                        {/* Added the scrollbar wrapper class here */}
                                        <div className={`${styles['list-scrollbar-container']} w-100 d-flex flex-column align-items-center px-1`}>
                                            {SHIFT_OPTIONS.map((dept) => (
                                                <div
                                                    key={dept.id}
                                                    className={`${styles['shift-card']} d-flex align-items-center justify-content-between my-1`}
                                                >
                                                    {/* Right Section: Multi-line Data Stack */}
                                                    <div className="d-flex flex-column align-items-start text-end">
                                                        {/* Top Row: Shift Name — Department Name */}
                                                        <div className={styles['shift-title-row']}>
                                                            <span className={styles['shift-name']}>{dept.shiftName}</span>
                                                            <span className={styles['dash-separator']}> — </span>
                                                            <span className={styles['dept-name']}>{dept.departmentName}</span>
                                                        </div>

                                                        {/* Bottom Row: Time Range */}
                                                        <div className={`${styles['shift-time-row']}`}>
                                                            {dept.startTime} — {dept.endTime}
                                                        </div>
                                                    </div>

                                                    {/* Left Section: Action Buttons */}
                                                    <div className="d-flex gap-2 align-items-center">
                                                        <button
                                                            className={`${styles['btn-action']} ${styles['btn-edit']}`}
                                                            aria-label={`Edit ${dept.departmentName}`}
                                                        >
                                                            <i className="ri-pencil-line"></i>
                                                        </button>
                                                        <button
                                                            className={`${styles['btn-action']} ${styles['btn-delete']}`}
                                                            aria-label={`Delete ${dept.departmentName}`}
                                                        >
                                                            <i className="ri-delete-bin-line"></i>
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* RIGHT SIDE */}
                                    <div className={`${styles.rightSection}`}>

                                        {/* FORM */}
                                        <form autoComplete="off">

                                            {/* ROW 1 */}
                                            <div className={styles.scheduleGrid}>

                                                {/* Shift Name */}
                                                <div className={styles.formGroup}>
                                                    <label className={styles.customLabel} htmlFor="shiftName">
                                                        Shift Name <span className='text-danger'>*</span>
                                                    </label>

                                                    <div className={styles.inputWrapper}>
                                                        <input
                                                            id="shiftName"
                                                            type="text"
                                                            className={styles.customInput}
                                                            placeholder="Enter shift name"
                                                        />

                                                        <i className="ri-calendar-schedule-line"></i>
                                                    </div>
                                                </div>

                                                {/* Start Time */}
                                                <div className={styles.formGroup}>
                                                    <label className={styles.customLabel} htmlFor="startTime">
                                                        Start Time <span className='text-danger'>*</span>
                                                    </label>

                                                    <div className={styles.inputWrapper}>

                                                        <input
                                                            type="time"
                                                            className={styles.customInput}
                                                            value={startTime}
                                                            onChange={(e) =>
                                                                setStartTime(e.target.value)
                                                            }
                                                            id="startTime"
                                                        />

                                                        <i
                                                            className={`ri-time-line ${styles.timeIcon}`}
                                                            onClick={() => {
                                                                const input =
                                                                    document.getElementById(
                                                                        "startTime"
                                                                    ) as HTMLInputElement;

                                                                input?.showPicker?.();
                                                                input?.focus();
                                                            }}
                                                        ></i>
                                                    </div>
                                                </div>

                                                {/* End Time */}
                                                <div className={styles.formGroup}>
                                                    <label className={styles.customLabel} htmlFor="endTime">
                                                        End Time <span className='text-danger'>*</span>
                                                    </label>

                                                    <div className={styles.inputWrapper}>

                                                        <input
                                                            type="time"
                                                            className={styles.customInput}
                                                            value={endTime}
                                                            onChange={(e) =>
                                                                setEndTime(e.target.value)
                                                            }
                                                            id="endTime"
                                                        />

                                                        <i
                                                            className={`ri-time-line ${styles.timeIcon}`}
                                                            onClick={() => {
                                                                const input =
                                                                    document.getElementById(
                                                                        "endTime"
                                                                    ) as HTMLInputElement;

                                                                input?.showPicker?.();
                                                                input?.focus();
                                                            }}
                                                        ></i>
                                                    </div>
                                                </div>

                                                {/* Duration */}
                                                <div className={styles.formGroup}>
                                                    <label className={styles.customLabel} htmlFor="duration">
                                                        Duration <span className='text-danger'>*</span>
                                                    </label>

                                                    <div className={styles.inputWrapper}>
                                                        <input
                                                            type="text"
                                                            id="duration"
                                                            disabled
                                                            className={styles.customInput}
                                                            value={calculateDuration()}
                                                            readOnly
                                                            placeholder="Calculated Automatically"
                                                        />

                                                        <i className="ri-hourglass-line"></i>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* ROW 2 */}
                                            <div className={styles.formRow}>

                                                {/* Department */}
                                                <div className={styles.formGroup}>
                                                    <label className={styles.customLabel} htmlFor="department">
                                                        Department <span className='text-danger'>*</span>
                                                    </label>

                                                    <CustomFormDropdown
                                                        id="department"
                                                        options={DEPARTMENT_OPTIONS}
                                                        value={selectedDepartment}
                                                        onChange={(value) =>
                                                            setSelectedDepartment(value)
                                                        }
                                                        placeholder="Select Department"
                                                        required={true}
                                                    />
                                                </div>

                                                {/* Status */}
                                                <div className={styles.formGroup}>
                                                    <label className={styles.customLabel} htmlFor="status">
                                                        Status <span className='text-danger'>*</span>
                                                    </label>

                                                    <CustomFormDropdown
                                                        id="status"
                                                        options={STATUS_OPTIONS}
                                                        value={selectedShiftStatus}
                                                        onChange={(value) =>
                                                            setSelectedShiftStatus(value)
                                                        }
                                                        placeholder="Select Status"
                                                        required={true}
                                                    />
                                                </div>
                                            </div>

                                            {/* BUTTONS */}
                                            <div className={styles.multiButtonWrapper}>

                                                <button
                                                    type="button"
                                                    className={styles.outlineBtn}
                                                >
                                                    Save & Next
                                                </button>

                                                <button
                                                    type="button"
                                                    className={`${styles.nextBtn} col-md-7`}
                                                    onClick={handleNext}
                                                >
                                                    Save & Continue
                                                </button>
                                            </div>
                                        </form>

                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Step 5 */}
                        {currentStep === 4 && (
                            <div className={`${styles.hospitalInfoContainer}`}>

                                {/* TOP HEADING */}
                                <div className={`${styles.hospitalInfoHeader} mb-4`}>
                                    <h1 className={styles.formTitle}>
                                        Staff & Users
                                    </h1>

                                    <p className={`${styles.formSubtitle} mb-0`}>
                                        Add doctors, nurses, technicians, and administrative users to the system.
                                    </p>
                                </div>

                                {/* MAIN CONTENT */}
                                <div className={`${styles.hospitalInfoContent}`}>

                                    {/* LEFT SIDE */}
                                    <div className={`${styles.leftSection} d-flex flex-column align-items-center justify-content-start pt-3`}>
                                        <p className="text-blue fw-500 fs-18 mb-3 mt-1">UserNames</p>

                                        {/* Added the scrollbar wrapper class here */}
                                        <div className={`${styles['list-scrollbar-container']} w-100 d-flex flex-column align-items-center px-1`}>
                                            {StaffUserUserNameList.map((dept) => (
                                                <div
                                                    key={dept.id}
                                                    className={`${styles['department-card']} d-flex align-items-center my-1`}
                                                >

                                                    {/* Flex text block with calculated offset padding */}
                                                    <div className={`${styles['department-text']} text-start `}>
                                                        {dept.name}
                                                    </div>
                                                    {/* Actions block containing Remix Icon buttons */}
                                                    <div className="d-flex gap-2 align-items-center">
                                                        <button
                                                            className={`${styles['btn-action']} ${styles['btn-edit']}`}
                                                            aria-label={`Edit ${dept.name}`}
                                                        >
                                                            <i className="ri-pencil-line"></i>
                                                        </button>
                                                        <button
                                                            className={`${styles['btn-action']} ${styles['btn-delete']}`}
                                                            aria-label={`Delete ${dept.name}`}
                                                        >
                                                            <i className="ri-delete-bin-line"></i>
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* RIGHT SIDE */}
                                    <div className={`${styles.rightSection}`}>

                                        {/* FORM */}
                                        <form autoComplete="off">

                                            {/* ROW 1 */}
                                            <div className={styles.formRow}>

                                                {/* Full Name */}
                                                <div className={styles.formGroup}>
                                                    <label className={styles.customLabel} htmlFor="fullName">
                                                        Full Name <span className='text-danger'>*</span>
                                                    </label>

                                                    <div className={styles.inputWrapper}>
                                                        <input
                                                            id="fullName"
                                                            type="text"
                                                            className={styles.customInput}
                                                            placeholder="Enter full name"
                                                        />

                                                        <i className="ri-user-3-line"></i>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* ROW 2 */}
                                            <div className={styles.formRow}>

                                                {/* Username */}
                                                <div className={styles.formGroup}>
                                                    <label className={styles.customLabel} htmlFor="username">
                                                        Username <span className='text-danger'>*</span>
                                                    </label>

                                                    <div className={styles.inputWrapper}>
                                                        <input
                                                            id="username"
                                                            type="text"
                                                            className={styles.customInput}
                                                            placeholder="Enter username"
                                                        />

                                                        <i className="ri-at-line"></i>
                                                    </div>
                                                </div>

                                                {/* Role */}
                                                <div className={styles.formGroup}>
                                                    <label className={styles.customLabel} htmlFor="role">
                                                        Role <span className='text-danger'>*</span>
                                                    </label>

                                                    <CustomFormDropdown
                                                        id="role"
                                                        options={StaffUserRoleOptions}
                                                        value={selectedStaffRole}
                                                        onChange={(value) =>
                                                            setSelectedStaffRole(value)
                                                        }
                                                        placeholder="Select Role"
                                                        required={true}
                                                    />
                                                </div>
                                            </div>

                                            {/* ROW 3 */}
                                            <div className={styles.formRow}>

                                                {/* Password */}
                                                <div className={styles.formGroup}>
                                                    <label className={styles.customLabel} htmlFor="password">
                                                        Password <span className='text-danger'>*</span>
                                                    </label>

                                                    <div className={styles.inputWrapper}>
                                                        <input
                                                            type="password"
                                                            id="password"
                                                            className={styles.customInput}
                                                            placeholder="Enter password"
                                                        />

                                                        <i className="ri-lock-password-line"></i>
                                                    </div>
                                                </div>

                                                {/* Confirm Password */}
                                                <div className={styles.formGroup}>
                                                    <label className={styles.customLabel} htmlFor="confirmPassword">
                                                        Confirm Password <span className='text-danger'>*</span>
                                                    </label>

                                                    <div className={styles.inputWrapper}>
                                                        <input
                                                            type="password"
                                                            id="confirmPassword"
                                                            className={styles.customInput}
                                                            placeholder="Confirm password"
                                                        />

                                                        <i className="ri-lock-password-line"></i>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* ROW 4 */}
                                            <div className={styles.formRow}>

                                                {/* Department */}
                                                <div className={styles.formGroup}>
                                                    <label className={styles.customLabel} htmlFor="department">
                                                        Department <span className='text-danger'>*</span>
                                                    </label>

                                                    <CustomFormDropdown
                                                        id="department"
                                                        options={StafUserDepartmentOptions}
                                                        value={selectedStaffDepartment}
                                                        onChange={(value) =>
                                                            setSelectedStaffDepartment(value)
                                                        }
                                                        placeholder="Select Department"
                                                        required={true}
                                                    />
                                                </div>

                                                {/* Shift */}
                                                <div className={styles.formGroup}>
                                                    <label className={styles.customLabel} htmlFor="shift">
                                                        Shift <span className='text-danger'>*</span>
                                                    </label>

                                                    <CustomFormDropdown
                                                        id="shift"
                                                        options={StaffUserShiftOptions}
                                                        value={selectedStaffShift}
                                                        onChange={(value) =>
                                                            setSelectedStaffShift(value)
                                                        }
                                                        placeholder="Select Shift"
                                                        required={true}
                                                    />
                                                </div>
                                            </div>

                                            {/* ROW 5 */}
                                            <div className={styles.formRow}>

                                                {/* Email */}
                                                <div className={styles.formGroup}>
                                                    <label className={styles.customLabel} htmlFor="email">
                                                        Email <span className='text-danger'>*</span>
                                                    </label>

                                                    <div className={styles.inputWrapper}>
                                                        <input
                                                            id="email"
                                                            type="email"
                                                            className={styles.customInput}
                                                            placeholder="Enter email"
                                                        />

                                                        <i className="ri-mail-line"></i>
                                                    </div>
                                                </div>

                                                {/* Phone */}
                                                <div className={styles.formGroup}>
                                                    <label className={styles.customLabel} htmlFor="phone">
                                                        Phone <span className='text-danger'>*</span>
                                                    </label>

                                                    <div className={styles.inputWrapper}>
                                                        <input
                                                            id="phone"
                                                            type="text"
                                                            className={styles.customInput}
                                                            placeholder="Enter phone number"
                                                        />

                                                        <i className="ri-phone-line"></i>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* BUTTONS */}
                                            <div className={styles.multiButtonWrapper}>

                                                <button
                                                    type="button"
                                                    className={styles.outlineBtn}
                                                >
                                                    Save & Next
                                                </button>

                                                <button
                                                    type="button"
                                                    className={`${styles.nextBtn} col-md-7`}
                                                    onClick={handleNext}
                                                >
                                                    Save & Continue
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Step 6 */}
                        {currentStep === 5 && (
                            <div className={`${styles.hospitalInfoContainer}`}>

                                {/* TOP HEADING */}
                                <div className={`${styles.hospitalInfoHeader} mb-4`}>
                                    <h1 className={styles.formTitle}>
                                        Review & Finish
                                    </h1>

                                    <p className={`${styles.formSubtitle} mb-0`}>
                                        Complete the system setup.
                                    </p>
                                </div>

                                {/* MAIN CONTENT */}
                                <div className={`${styles.hospitalInfoContent}`}>

                                    {/* RIGHT SIDE */}
                                    <div className={`${styles.rightSection}`}>

                                        {/* TOP CONTENT SECTION */}
                                        <div className={styles.finishContentWrapper}>

                                            {/* IMAGE */}
                                            <img src="/Assets/Icons/Congratulations.svg" alt="Congratulations" className={styles.finishImage} />

                                            {/* HEADING */}
                                            <h1 className={styles.finishHeading}>
                                                Setup Completed Successfully
                                            </h1>

                                            {/* PARAGRAPH */}
                                            <p className={`${styles.finishParagraph} mb-0`}>
                                                You can update these settings anytime from System Settings.
                                            </p>

                                        </div>

                                        {/* FORM */}
                                        <form autoComplete="off">
                                            {/* BUTTONS */}
                                            <div className={`d-flex justify-content-center gap-3`}>

                                                <button
                                                    type="button"
                                                    className={`${styles.finishOutlineBtn} col-md-3`}
                                                    onClick={handleBack}
                                                >
                                                    BACK
                                                </button>

                                                <button
                                                    type="button"
                                                    className={`${styles.finishNextBtn} col-md-5`}
                                                    onClick={handleFinish}
                                                >
                                                    CONTINUE
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div >
    );
};

export default SystemSettings;