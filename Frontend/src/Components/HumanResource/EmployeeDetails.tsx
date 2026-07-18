import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import Header from "../../GlobalHelpers/Header";

import BasicInfoTab from "./BasicInfoTab";
import WorkInfoTab from "./WorkInfoTab";
import WorkingDaysTab from "./WorkingDaysTab";
import DocumentsTab from "./DocumentsTab";
import SalaryDetailsTab from "./SalaryDetailsTab";
import AttendanceTab from "./AttendanceTab";
import LeaveManagementTab from "./LeaveManagementTab";

import ListArrowDown from '../../../public/Assets/Icons/ListArrowDown.svg?react'

import "../../styles/HumanResource.css";

export default function EmployeeDetails() {

    /********************************************
        Name : Manish Kumar
        Date : 06/06/2026
        Purpose : ACTIVE TAB STATE
    *********************************************/
    const [activeTab, setActiveTab] = useState("basicInfo");
    const navigate = useNavigate()

    /********************************************
        Name : Manish Kumar
        Date : 06/06/2026
        Purpose : EMPLOYEE TABS
    *********************************************/
    const TABS = [
        { id: "basicInfo", label: "Basic Info" },
        { id: "workInfo", label: "Work Info" },
        { id: "workingDays", label: "Working Days" },
        { id: "documents", label: "Documents" },
        { id: "salaryDetails", label: "Salary Details" },
        { id: "attendance", label: "Attendance" },
        { id: "leaveManagement", label: "Leave Management" }
    ];

    /********************************************
        Name : Manish Kumar
        Date : 06/06/2026
        Purpose : TAB COMPONENT RENDERING
    *********************************************/
    const renderComponent = () => {

        switch (activeTab) {

            case "basicInfo":
                return <BasicInfoTab />;

            case "workInfo":
                return <WorkInfoTab />;

            case "workingDays":
                return <WorkingDaysTab />;

            case "documents":
                return <DocumentsTab />;

            case "salaryDetails":
                return <SalaryDetailsTab />;

            case "attendance":
                return <AttendanceTab />;

            case "leaveManagement":
                return <LeaveManagementTab />;

            default:
                return <BasicInfoTab />;
        }
    };

    return (
        <div className="container-fluid p-3">

            {/* Header */}

            <Header
                heading="Human Resources"
                subHeading="Employees / View - Edit"
            />

            {/* Employee Profile Card */}

            <div className="employeeProfileCard my-3 bg-white rounded-3 p-3">

                <div className="d-flex justify-content-between align-items-center">

                    <div className="d-flex align-items-center">
                        {/* Employee Image */}
                        <div className="text-center m-2">

                            <img
                                src="/Assets/Icons/HeaderIcons/Kapil.jpg"
                                alt="Employee"
                                className="employeeAvatar"
                            />

                        </div>

                        <div className="">

                            {/* Employee Name */}

                            <h4 className="fw-500 fs-20 mb-3">
                                Manish Kumar
                            </h4>

                            {/* Employee Meta */}

                            <div className="employeeMeta gap-3">

                                <span>
                                    <i className="ri-calendar-2-line fs-18" style={{color:"#FF8E51"}}></i>
                                    23/11/2025
                                </span>

                                <span>
                                    <i className="ri-phone-line fs-18" style={{color:'#1FC16B'}}></i>
                                    8742970516
                                </span>

                                <span>
                                    <i className="ri-stethoscope-line fs-18" style={{color:'#A78CEA'}}></i>
                                    Cardiologist
                                </span>

                                <span>
                                    <i className="ri-building-line fs-18" style={{color:"#0477BF"}}></i>
                                    Cardiology
                                </span>

                            </div>

                        </div>
                    </div>

                    <div className="d-flex flex-column align-items-center gap-2 p-2">
                        {/* Status */}
                        <span className="employeeStatus">
                            Full Time
                        </span>

                        <ListArrowDown />

                        <button className="back-btn" onClick={() => navigate("/human-resources/Employees")}>
                            <i className="ri-arrow-left-line me-3"></i>Back
                        </button>
                    </div>

                </div>

            </div>

            {/* Employee Tabs */}

            <div
                className="d-flex w-100 p-2 overflow-auto mb-3 position-relative"
                style={{
                    backgroundColor: "#fff"
                }}
            >

                {TABS.map((tab) => {

                    const isActive =
                        activeTab === tab.id;

                    return (
                        <button
                            key={tab.id}
                            className={`patient-tab-btn ${isActive ? "active" : ""}`}
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
    );
}