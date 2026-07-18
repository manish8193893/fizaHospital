import { useNavigate } from "react-router-dom";
import Header from "../../../GlobalHelpers/Header";
import { useState } from "react";
import Medication from "./Medication";
import LabResult from "./LabResult";
import Radiology from "./Radiology";
import Operations from "./Operations";
import VisitHistory from "./VisitHistory";
import { motion } from "framer-motion";


export default function ManageBookingDetails() {

    /********************************************
        Name : Manish Kumar
        Date : 25/06/2026
        Purpose : ACTIVE TAB STATE
    *********************************************/
    const [activeTab, setActiveTab] = useState("medication");

    /********************************************
        Name : Manish Kumar
        Date : 25/06/2026
        Purpose : PATIENTS TABS
    *********************************************/
    const TABS = [
        { id: "medication", label: "Medication" },
        { id: "LabResult", label: "Lab Result" },
        { id: "Radiology", label: "Radiology" },
        { id: "Operations", label: "Operations" },
        { id: "visitHistory", label: "Visit History" },
    ];
    const navigate = useNavigate();

    /********************************************
        Name : Manish Kumar
        Date : 25/06/2026
        Purpose : TAB COMPONENT RENDERING
    *********************************************/
    const renderComponent = () => {

        switch (activeTab) {

            case "medication":
                return <Medication />;

            case "LabResult":
                return <LabResult />;

            case "Radiology":
                return <Radiology />;

            case "Operations":
                return <Operations />;

            case "visitHistory":
                return <VisitHistory />;

            default:
                return <Medication />;
        }
    };

    return (
        <>
            <div className="container-fluid p-3">

                <Header
                    heading="Ward Management"
                    subHeading="Manage Booking / Manish Kumar"
                />

                {/* Banner Section */}
                <div className="patient-banner-wrapper mt-3"></div>

                <div className="OutPatientProfileCard mb-3 bg-white rounded-3 p-3">

                    <div className="d-flex justify-content-between">

                        <div className="d-flex flex-column">
                            {/* OutPatient Image */}
                            <div className="d-flex">
                                <div className="text-center">

                                    <img
                                        src="/Assets/Icons/HeaderIcons/Kapil.jpg"
                                        alt="Patients"
                                        className="OutPatientAvatar"
                                    />

                                </div>

                                <div className="d-flex flex-column justify-content-center gap-2 ps-2">
                                    <h4 className="fw-500 fs-20 mb-1"><span className="text-muted me-1">#9</span>Manish Kumar</h4>
                                    <span className="fs-12 fw-500 text-black text-muted">Male / 22 Years Old</span>
                                </div>
                            </div>

                            {/* OutPatient Meta */}
                            <div className="OutPatientMeta gap-3">

                                <span>
                                    <i className="ri-calendar-2-line fs-18" style={{ color: "#FF8E51" }}></i>
                                    <b className="text-muted">Admission Date:{" "}</b>10-01-2026
                                </span>

                                <span>
                                    <i className="ri-calendar-2-line fs-18" style={{ color: "#FF8E51" }}></i>
                                    <b className="text-muted">Leave Date:{" "}</b>25-06-2026
                                </span>

                                <span>
                                    <i className="ri-heart-pulse-line fs-18" style={{ color: '#FF4C51' }}></i>
                                    <b className="text-muted">Blood Type:{" "}</b>B+
                                </span>

                                <span>
                                    <i className="ri-phone-line fs-18" style={{ color: '#1FC16B' }}></i>
                                    <b className="text-muted">Phone Number:{" "}</b>8742970516
                                </span>

                            </div>

                            <div className="OutPatientMeta gap-3">

                                <span>
                                    <i className="ri-bank-card-line fs-18" style={{ color: "#1FC16B" }}></i>
                                    <b className="text-muted">Total Charge:{" "}</b><span className="printer">₹ 80,000</span>
                                </span>

                                <button
                                    type="button"
                                    className="border-0 outline-0 rounded-2 text-white py-1 px-4 fs-14"
                                    style={{ backgroundColor: "#E12121" }}
                                >
                                    Discharge<i className="ri-logout-box-r-line ms-1 fs-14"></i>
                                </button>

                            </div>
                        </div>

                        <div className="d-flex flex-column align-items-center gap-2">
                            {/* Status */}
                            <span className="OutPatientStatus">
                                InPatients
                            </span>

                            <button className="back-btn mt-2" onClick={() => navigate("/ward-management/ManageBooking")}>
                                <i className="ri-arrow-left-line me-3"></i>Back
                            </button>
                        </div>

                    </div>

                </div>

                {/* Tabs */}
                <div className="d-flex w-100 p-2 overflow-auto mb-3 position-relative bg-white">

                    {TABS.map((tab) => {

                        const isActive = activeTab === tab.id;

                        return (
                            <button
                                key={tab.id}
                                className={`patients-tab-btn border-0 ${isActive ? "active" : ""}`}
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
