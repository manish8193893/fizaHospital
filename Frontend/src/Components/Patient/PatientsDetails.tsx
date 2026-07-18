import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import Header from "../../GlobalHelpers/Header";
import PatientsViewHistory from "./PatientsViewHistory";
import PatientsLabResults from "./PatientsLabResults";
import PatientsRadiology from "./PatientsRadiology";
import PatientsOperations from "./PatientsOperations";
import CustomFormDropdown, { type DropdownOption, } from "../../GlobalHelpers/CustomFormDropdown";
import DateFilterCalendar from "../../GlobalHelpers/DateFilterCalendar";

import ListArrowDown from '../../../public/Assets/Icons/ListArrowDown.svg?react'

import '../../styles/Patients.css'

export default function PatientsDetails() {

    /********************************************
        Name : Manish Kumar
        Date : 17/06/2026
        Purpose : ACTIVE TAB STATE
    *********************************************/
    const [activeTab, setActiveTab] = useState("ViewHistory");
    const navigate = useNavigate();

    /********************************************
        Name : Manish Kumar
        Date : 17/06/2026
        Purpose : PATIENTS TABS
    *********************************************/
    const TABS = [
        { id: "ViewHistory", label: "View History" },
        { id: "LabResult", label: "Lab Result" },
        { id: "Radiology", label: "Radiology" },
        { id: "Operations", label: "Operations" },
    ];

    /********************************************
        Name    : Manish Kumar
        Date    : 17/06/2026
        Purpose : Patient Details Expand State
    *********************************************/
    const [showPatientDetails, setShowPatientDetails] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    /********************************************
        Name    : Manish Kumar
        Date    : 17/06/2026
        Purpose : Form States
    *********************************************/
    const [fileNo, setFileNo] = useState("PT-2026-001");
    const [firstName, setFirstName] = useState("Manish");
    const [middleName, setMiddleName] = useState("Kumar");
    const [lastName, setLastName] = useState("Kashyap");
    const [familyName, setFamilyName] = useState("Kashyap");
    const [motherName, setMotherName] = useState("Shashi Devi");
    const [phoneNumber, setPhoneNumber] = useState("8742970516");
    const [address, setAddress] = useState("Haldoni Mode");
    const [nationalIdNumber, setNationalIdNumber] = useState("123456789012");
    const [zipCode, setZipCode] = useState("201306");
    const [stateName, setStateName] = useState("Uttar Pradesh");
    const [cityName, setCityName] = useState("Greater Noida");
    const [companionName, setCompanionName] = useState("Kapil Kumar");
    const [companionPhone, setCompanionPhone] = useState("9876543210");

    /********************************************
        Name    : Manish Kumar
        Date    : 17/06/2026
        Purpose : DOB Calendar
    *********************************************/
    const [dob, setDob] = useState<Date | null>(new Date(2003, 5, 12));
    const [showDOBCalendar, setShowDOBCalendar] = useState(false);

    /********************************************
        Name    : Manish Kumar
        Date    : 17/06/2026
        Purpose : Dropdown States
    *********************************************/
    const [selectedGender, setSelectedGender] = useState<DropdownOption | null>({
        id: "male",
        name: "Male",
    });

    const [selectedBloodGroup, setSelectedBloodGroup] = useState<DropdownOption | null>({
        id: "b+",
        name: "B+",
    });

    const [selectedRelation, setSelectedRelation] = useState<DropdownOption | null>({
        id: "father",
        name: "Father",
    });

    /********************************************
        Name    : Manish Kumar
        Date    : 17/06/2026
        Purpose : Dropdown Options
    *********************************************/
    const GENDER_OPTIONS: DropdownOption[] = [
        { id: "male", name: "Male" },
        { id: "female", name: "Female" },
    ];

    const BLOOD_GROUP_OPTIONS: DropdownOption[] = [
        { id: "a+", name: "A+" },
        { id: "a-", name: "A-" },
        { id: "b+", name: "B+" },
        { id: "b-", name: "B-" },
        { id: "ab+", name: "AB+" },
        { id: "ab-", name: "AB-" },
        { id: "o+", name: "O+" },
        { id: "o-", name: "O-" },
    ];

    const RELATION_OPTIONS: DropdownOption[] = [
        { id: "father", name: "Father" },
        { id: "mother", name: "Mother" },
        { id: "brother", name: "Brother" },
        { id: "sister", name: "Sister" },
        { id: "wife", name: "Wife" },
        { id: "husband", name: "Husband" },
    ];

    const inputDisabled = !isEditing;

    /********************************************
        Name    : Manish Kumar
        Date    : 17/06/2026
        Purpose : Update Patient
    *********************************************/
    const handleUpdatePatient = () => {
        const payload = {
            fileNo,
            firstName,
            middleName,
            lastName,
            familyName,
            motherName,
            phoneNumber,
            gender: selectedGender,
            dob,
            address,
            bloodGroup: selectedBloodGroup,
            nationalIdNumber,
            zipCode,
            stateName,
            cityName,
            companionName,
            companionPhone,
            relation: selectedRelation,
        };

        console.log("Updated Patient :", payload);
        setIsEditing(false);
    };


    /********************************************
        Name : Manish Kumar
        Date : 17/06/2026
        Purpose : TAB COMPONENT RENDERING
    *********************************************/
    const renderComponent = () => {

        switch (activeTab) {

            case "ViewHistory":
                return <PatientsViewHistory />;

            case "LabResult":
                return <PatientsLabResults />;

            case "Radiology":
                return <PatientsRadiology />;

            case "Operations":
                return <PatientsOperations />;

            default:
                return <PatientsViewHistory />;
        }
    };


    return (
        <>
            <div className="container-fluid p-3">

                <Header
                    heading="Patients"
                    subHeading="Manish Kashyap"
                />

                {/* Banner Section */}
                <div className="patient-banner-wrapper mt-3"></div>

                <div className="patientsProfileCard mb-3 bg-white rounded-3 p-3">

                    <div className="d-flex justify-content-between align-items-center">

                        <div className="d-flex align-items-center">
                            {/* Patients Image */}
                            <div className="text-center m-2">

                                <img
                                    src="/Assets/Icons/HeaderIcons/Kapil.jpg"
                                    alt="Patients"
                                    className="patientsAvatar"
                                />

                            </div>

                            <div className="">

                                {/* Patients Name */}

                                <h4 className="fw-500 fs-20 mb-1">Manish Kumar</h4>
                                <span className="fs-12 fw-500 text-black text-muted">Male / 22 Years Old</span>

                                {/* Patients Meta */}

                                <div className="patientsMeta gap-3">

                                    <span>
                                        <i className="ri-phone-line fs-18" style={{ color: '#1FC16B' }}></i>
                                        8742970516
                                    </span>

                                    <span>
                                        <i className="ri-calendar-2-line fs-18" style={{ color: "#FF8E51" }}></i>
                                        <b>Last Visit:</b> 23/11/2025
                                    </span>

                                    <span>
                                        <i className="ri-heart-pulse-line fs-18" style={{ color: '#FF4C51' }}></i>
                                        <b>Blood Type:</b> B+
                                    </span>

                                </div>

                            </div>
                        </div>

                        <div className="d-flex flex-column align-items-center gap-2 p-2">
                            {/* Status */}
                            <span className="patientsStatus">
                                Outpatient/Consultant
                            </span>

                            <div
                                className={`patientDetailsToggle ${showPatientDetails ? "rotated" : ""}`}
                                onClick={() => setShowPatientDetails(!showPatientDetails)}
                            >
                                <ListArrowDown />
                            </div>

                            <button className="back-btn" onClick={() => navigate("/patients")}>
                                <i className="ri-arrow-left-line me-3"></i>Back
                            </button>
                        </div>

                    </div>

                    <AnimatePresence>
                        {showPatientDetails && (

                            <motion.div
                                initial={{ opacity: 0, height: 0, y: -10 }}
                                animate={{ opacity: 1, height: "auto", y: 0 }}
                                exit={{ opacity: 0, height: 0, y: -10 }}
                                transition={{ duration: 0.35, ease: "easeInOut" }}
                                className="bg-white rounded-3 p-4 mb-3 overflow-hidden"
                            >

                                {/* Row 1 */}
                                <div className="formRow">
                                    <div className="formGroup">
                                        <label className="customLabel">File No{" "}<span className="text-danger">*</span></label>

                                        <div className="position-relative">
                                            <input
                                                type="text"
                                                className="customInput"
                                                value={fileNo}
                                                disabled={inputDisabled}
                                                onChange={(e) => setFileNo(e.target.value)}
                                            />

                                            <i
                                                className="ri-folder-line"
                                                style={{
                                                    position: "absolute",
                                                    right: "15px",
                                                    top: "50%",
                                                    transform: "translateY(-50%)",
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Row 2 */}
                                <div className="formRow">
                                    <div className="formGroup">
                                        <label className="customLabel">First Name{" "}<span className="text-danger">*</span></label>
                                        <div className="inputWrapper">
                                            <input
                                                type="text"
                                                className="customInput"
                                                value={firstName}
                                                disabled={!isEditing}
                                                onChange={(e) => setFirstName(e.target.value)}
                                            />
                                            <i className="ri-user-line"></i>
                                        </div>
                                    </div>

                                    <div className="formGroup">
                                        <label className="customLabel">Middle Name{" "}<span className="text-danger">*</span></label>
                                        <div className="inputWrapper">
                                            <input
                                                type="text"
                                                className="customInput"
                                                value={middleName}
                                                disabled={!isEditing}
                                                onChange={(e) => setMiddleName(e.target.value)}
                                            />
                                            <i className="ri-user-line"></i>
                                        </div>
                                    </div>

                                    <div className="formGroup">
                                        <label className="customLabel">Last Name{" "}<span className="text-danger">*</span></label>
                                        <div className="inputWrapper">
                                            <input
                                                type="text"
                                                className="customInput"
                                                value={lastName}
                                                disabled={!isEditing}
                                                onChange={(e) => setLastName(e.target.value)}
                                            />
                                            <i className="ri-user-line"></i>
                                        </div>
                                    </div>
                                </div>

                                {/* Row 3 */}
                                <div className="formRow">
                                    <div className="formGroup">
                                        <label className="customLabel">Family Name{" "}<span className="text-danger">*</span></label>
                                        <div className="inputWrapper">
                                            <input
                                                type="text"
                                                className="customInput"
                                                value={familyName}
                                                disabled={!isEditing}
                                                onChange={(e) => setFamilyName(e.target.value)}
                                            />
                                            <i className="ri-group-line"></i>
                                        </div>
                                    </div>

                                    <div className="formGroup">
                                        <label className="customLabel">Mother Name{" "}<span className="text-danger">*</span></label>
                                        <div className="inputWrapper">
                                            <input
                                                type="text"
                                                className="customInput"
                                                value={motherName}
                                                disabled={!isEditing}
                                                onChange={(e) => setMotherName(e.target.value)}
                                            />
                                            <i className="ri-parent-line"></i>
                                        </div>
                                    </div>

                                    <div className="formGroup">
                                        <label className="customLabel">Phone Number{" "}<span className="text-danger">*</span></label>
                                        <div className="inputWrapper">
                                            <input
                                                type="text"
                                                className="customInput"
                                                value={phoneNumber}
                                                disabled={!isEditing}
                                                onChange={(e) => setPhoneNumber(e.target.value)}
                                            />
                                            <i className="ri-phone-line"></i>
                                        </div>
                                    </div>
                                </div>

                                {/* Row 4 */}
                                <div className="formRow">
                                    <div className="formGroup">
                                        <label className="customLabel">Gender{" "}<span className="text-danger">*</span></label>
                                        <CustomFormDropdown
                                            options={GENDER_OPTIONS}
                                            value={selectedGender}
                                            onChange={(value) => setSelectedGender(value)}
                                            placeholder="Select Gender"
                                            disabled={!isEditing}
                                        />
                                    </div>

                                    <div className="formGroup">
                                        <label className="customLabel">DOB{" "}<span className="text-danger">*</span></label>

                                        <div style={{ position: "relative" }}>
                                            <div
                                                className="customInput d-flex align-items-center"
                                                onClick={() => {
                                                    if (!isEditing) return;
                                                    setShowDOBCalendar(!showDOBCalendar);
                                                }}
                                                style={{ cursor: isEditing ? "pointer" : "not-allowed" }}
                                            >
                                                <span>
                                                    {dob
                                                        ? `${String(dob.getDate()).padStart(2, "0")}/${String(dob.getMonth() + 1).padStart(2, "0")}/${dob.getFullYear()}`
                                                        : "DD/MM/YYYY"}
                                                </span>
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
                                            </div>

                                            {showDOBCalendar && (
                                                <div style={{ position: "absolute", top: "100%", left: 0, zIndex: 1000 }}>
                                                    <DateFilterCalendar
                                                        selectedDate={dob}
                                                        onDateSelect={(date) => {
                                                            setDob(date);
                                                            setShowDOBCalendar(false);
                                                        }}
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="formGroup">
                                        <label className="customLabel">Address{" "}<span className="text-danger">*</span></label>
                                        <div className="inputWrapper">
                                            <input
                                                type="text"
                                                className="customInput"
                                                value={address}
                                                disabled={!isEditing}
                                                onChange={(e) => setAddress(e.target.value)}
                                            />
                                            <i className="ri-map-pin-line"></i>
                                        </div>
                                    </div>
                                </div>

                                {/* Row 5 */}
                                <div className="formRow">
                                    <div className="formGroup">
                                        <label className="customLabel">Blood Group{" "}<span className="text-danger">*</span></label>
                                        <CustomFormDropdown
                                            options={BLOOD_GROUP_OPTIONS}
                                            value={selectedBloodGroup}
                                            onChange={(value) => setSelectedBloodGroup(value)}
                                            placeholder="Select Blood Group"
                                            disabled={!isEditing}
                                        />
                                    </div>

                                    <div className="formGroup">
                                        <label className="customLabel">National ID Number{" "}<span className="text-danger">*</span></label>
                                        <div className="inputWrapper">
                                            <input
                                                type="text"
                                                className="customInput"
                                                value={nationalIdNumber}
                                                disabled={!isEditing}
                                                onChange={(e) => setNationalIdNumber(e.target.value)}
                                            />
                                            <i className="ri-id-card-line"></i>
                                        </div>
                                    </div>

                                    <div className="formGroup">
                                        <label className="customLabel">Zip Code{" "}<span className="text-danger">*</span></label>
                                        <div className="inputWrapper">
                                            <input
                                                type="text"
                                                className="customInput"
                                                value={zipCode}
                                                disabled={!isEditing}
                                                onChange={(e) => setZipCode(e.target.value)}
                                            />
                                            <i className="ri-mail-line"></i>
                                        </div>
                                    </div>
                                </div>

                                {/* Row 6 */}
                                <div className="formRow">
                                    <div className="formGroup">
                                        <label className="customLabel">State{" "}<span className="text-danger">*</span></label>
                                        <div className="inputWrapper">
                                            <input
                                                type="text"
                                                className="customInput"
                                                value={stateName}
                                                disabled={!isEditing}
                                                onChange={(e) => setStateName(e.target.value)}
                                            />
                                            <i className="ri-building-line"></i>
                                        </div>
                                    </div>

                                    <div className="formGroup">
                                        <label className="customLabel">City{" "}<span className="text-danger">*</span></label>
                                        <div className="inputWrapper">
                                            <input
                                                type="text"
                                                className="customInput"
                                                value={cityName}
                                                disabled={!isEditing}
                                                onChange={(e) => setCityName(e.target.value)}
                                            />
                                            <i className="ri-community-line"></i>
                                        </div>
                                    </div>
                                </div>

                                {/* Row 7 */}
                                <div className="formRow">
                                    <div className="formGroup">
                                        <label className="customLabel">Companion Name{" "}<span className="text-danger">*</span></label>
                                        <div className="inputWrapper">
                                            <input
                                                type="text"
                                                className="customInput"
                                                value={companionName}
                                                disabled={!isEditing}
                                                onChange={(e) => setCompanionName(e.target.value)}
                                            />
                                            <i className="ri-user-heart-line"></i>
                                        </div>
                                    </div>

                                    <div className="formGroup">
                                        <label className="customLabel">Companion Phone{" "}<span className="text-danger">*</span></label>
                                        <div className="inputWrapper">
                                            <input
                                                type="text"
                                                className="customInput"
                                                value={companionPhone}
                                                disabled={!isEditing}
                                                onChange={(e) => setCompanionPhone(e.target.value)}
                                            />
                                            <i className="ri-phone-line"></i>
                                        </div>
                                    </div>

                                    <div className="formGroup">
                                        <label className="customLabel">Companion Relation{" "}<span className="text-danger">*</span></label>
                                        <CustomFormDropdown
                                            options={RELATION_OPTIONS}
                                            value={selectedRelation}
                                            onChange={(value) => setSelectedRelation(value)}
                                            placeholder="Select Relation"
                                            disabled={!isEditing}
                                        />
                                    </div>
                                </div>

                                {/* Buttons */}
                                <div className="d-flex justify-content-between border-0 pb-0 mt-5">

                                    {!isEditing ? (
                                        <button
                                            type="button"
                                            className="aph-modal-btn-height border-0 outline-0 col-md-7 bg-blue text-white fs-18 fw-400"
                                            onClick={() => setIsEditing(true)}
                                        >
                                            Edit
                                        </button>
                                    ) : (
                                        <button
                                            type="button"
                                            className="aph-modal-btn-height border-0 outline-0 col-md-7 bg-blue text-white fs-18 fw-400"
                                            onClick={handleUpdatePatient}
                                        >
                                            Update
                                        </button>
                                    )}

                                    <button
                                        type="button"
                                        className="aph-modal-btn-height border-0 outline-0 col-md-4 border-red text-red bg-white fs-18 fw-400"
                                        onClick={() => setIsEditing(false)}
                                    >
                                        Cancel
                                    </button>

                                </div>

                            </motion.div>

                        )}

                    </AnimatePresence>

                </div>

                <div
                    className="d-flex w-100 p-2 overflow-auto mb-3 position-relative"
                    style={{ backgroundColor: "#fff" }}
                >

                    {TABS.map((tab) => {

                        const isActive =
                            activeTab === tab.id;

                        return (
                            <button
                                key={tab.id}
                                className={`patients-tab-btn ${isActive ? "active" : ""}`}
                                onClick={() =>
                                    setActiveTab(tab.id)
                                }
                            >
                                <span className="tab-text">
                                    {tab.label}
                                </span>

                                {isActive && (
                                    <motion.div
                                        layoutId="activeTabIndicator"
                                        className="active-bg-indicator"
                                        transition={{
                                            type: "spring",
                                            stiffness: 300,
                                            damping: 30
                                        }}
                                    />
                                )}

                            </button>
                        );
                    })}

                </div>

                {/* Tab Content */}

                <div className="rounded-1 bg-white p-4">

                    {renderComponent()}

                </div>
            </div>
        </>
    )
}
