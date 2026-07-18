import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import Header from "../../GlobalHelpers/Header";
import TestResult from "./TestResult";
import MedicalRecord from "./MedicalRecord";
import RadiologyResult from "./RadiologyResult";

import "../../styles/DoctorDashboard.css";

export default function PatientDetails() {

    const [activeTab, setActiveTab] = useState("medical");
    const navigate = useNavigate();

    const TABS = [
        { id: "medical", label: "Medical Records" },
        { id: "test", label: "Test Results" },
        { id: "radiology", label: "Radiology Results" }
    ];

    const renderComponent = () => {
        switch (activeTab) {
            case "medical":
                return <MedicalRecord />;

            case "test":
                return <TestResult />;

            case "radiology":
                return <RadiologyResult />;

            default:
                return <MedicalRecord />;
        }
    };

    return (
        <div className="container-fluid p-3">

            <Header
                heading="Clinic"
                subHeading="View Patient Details"
            />

            {/* Banner Section */}
            <div className="patient-banner-wrapper mt-3"></div>

            {/* Patient Card */}
            <div className="card shadow-sm border-0 patient-details-card mb-3">

                <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center">
                        <h5 className="fs-16 text-body-black mb-3">
                            <span className="text-black text-muted fs-16 fw-500 me-2">#A123456</span>
                            <i className="ri-calendar-2-line fs-18 me-2" style={{ color: "#A78CEA" }}></i>
                            01-01-2025 / 8:40 AM
                        </h5>

                        <div>
                            <button className="back-btn me-3" onClick={() => navigate("/clinic/DoctorDashboard")}>
                                <i className="ri-arrow-left-line me-3"></i>Back
                            </button>

                            <button className="back-btn">
                                <i className="ri-pencil-ai-line fs-16"></i>
                            </button>
                        </div>
                    </div>
                    <form>
                        {/* ROW 1 */}
                        <div className="formRow">
                            {/* Name */}
                            <div className="formGroup">
                                <label className="customLabel">Name <span className='text-danger'>*</span></label>
                                <div className="inputWrapper">
                                    <input
                                        type="text"
                                        value={"Manish Kashyap"}
                                        disabled
                                        className="customInput"
                                        placeholder="Enter first name"
                                    />
                                    <i className="ri-user-3-line"></i>
                                </div>
                            </div>

                            {/* Department */}
                            <div className="formGroup">
                                <label className="customLabel">Department <span className='text-danger'>*</span></label>
                                <div className="inputWrapper">
                                    <input
                                        type="text"
                                        value={"General Medicine"}
                                        disabled
                                        className="customInput"
                                        placeholder="Enter last name"
                                    />
                                    <i className="ri-building-line"></i>
                                </div>
                            </div>
                        </div>

                        {/* Row 2 */}
                        <div className="formRow">
                            {/* Gender */}
                            <div className="formGroup">
                                <label className="customLabel">Gender <span className='text-danger'>*</span></label>
                                <div className="inputWrapper">
                                    <input
                                        type="text"
                                        value={"Male"}
                                        disabled
                                        className="customInput"
                                        placeholder="Enter first name"
                                    />
                                    <i className="ri-user-line"></i>
                                </div>
                            </div>

                            {/* Age */}
                            <div className="formGroup">
                                <label className="customLabel">Age <span className='text-danger'>*</span></label>
                                <div className="inputWrapper">
                                    <input
                                        type="text"
                                        value={"22 Years"}
                                        disabled
                                        className="customInput"
                                        placeholder="Enter last name"
                                    />
                                    <i className="ri-calendar-line"></i>
                                </div>
                            </div>

                            {/* Blood Group */}
                            <div className="formGroup">
                                <label className="customLabel">Blood Group <span className='text-danger'>*</span></label>
                                <div className="inputWrapper">
                                    <input
                                        type="text"
                                        value={"B +"}
                                        disabled
                                        className="customInput"
                                        placeholder="Enter last name"
                                    />
                                    <i className="ri-drop-line"></i>
                                </div>
                            </div>
                        </div>

                    </form>
                </div>

            </div>

            {/* Tabs */}
            <div className="d-flex w-100 p-2 overflow-hidden mb-3 position-relative" style={{ backgroundColor: "#fff" }}>
                {TABS.map((tab) => {
                    const isActive = activeTab === tab.id;

                    return (
                        <button
                            key={tab.id}
                            className={`patient-tab-btn ${isActive ? "active" : ""}`}
                            onClick={() => setActiveTab(tab.id)}
                        >
                            <span className="tab-text">{tab.label}</span>
                            {isActive && (
                                <motion.div
                                    layoutId="activeTabIndicator"
                                    className="active-bg-indicator"
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                />
                            )}
                        </button>
                    );
                })}
            </div>

            {/* Component Area */}
            <div className="patient-content-wrapper bg-white p-3">
                {renderComponent()}
            </div>

        </div>
    );
}