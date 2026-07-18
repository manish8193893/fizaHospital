import { useState } from "react";
import Header from "../../GlobalHelpers/Header";
import { motion } from "framer-motion";

import DeviceManagement from "../../Components/Laboratory/LaboratoryManagement/DeviceManagement";
import AvailableTestAndParameters from "../../Components/Laboratory/LaboratoryManagement/AvailableTestAndParameters";
import LabManagement from "../../Components/Laboratory/LaboratoryManagement/LabManagement";

export default function LaboratoryManagement() {

    /********************************************
        Name : Manish Kumar
        Date : 10/07/2026
        Purpose : ACTIVE TAB STATE
    *********************************************/
    const [activeTab, setActiveTab] = useState<string>("labManagement");

    /********************************************
      Name : Manish Kumar
      Date : 10/07/2026
      Purpose : LABORATORY MANAGEMENT TABS
    *********************************************/
    const TABS = [
        { id: "labManagement", label: "Laboratory Management" },
        { id: "deviceManagement", label: "Device Management" },
        { id: "test&parameter", label: "Available Test & Parameters" },
    ];

    /********************************************
      Name : Manish Kumar
      Date : 27/06/2026
      Purpose : TAB COMPONENT RENDERING
    *********************************************/
    const renderComponent = () => {

        switch (activeTab) {

            case "labManagement":
                return <LabManagement/>;

            case "deviceManagement":
                return <DeviceManagement />;

            case "test&parameter":
                return <AvailableTestAndParameters />;

            default:
                return <LabManagement />;
        }
    };

    return (
        <>
            <div className="container-fluid p-3">

                <Header
                    heading="Laboratory"
                    subHeading="Laboratory Management"
                />

                {/* Tabs Section */}
                <div className="d-flex w-100 p-2 overflow-auto mb-3 position-relative bg-white my-3">

                    {TABS.map((tab) => {

                        const isActive =
                            activeTab === tab.id;

                        return (
                            <button
                                key={tab.id}
                                className={`scheduled-Tab-Btn border-0 ${isActive ? "active" : ""}`}
                                onClick={() =>
                                    setActiveTab(tab.id)
                                }
                            >
                                <span className="scheduled-Tab-Text">
                                    {tab.label}
                                </span>

                                {isActive && (
                                    <motion.div
                                        layoutId="activeTabIndicator"
                                        className="scheduled-BgIndicator"
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
                <div className="">
                    {renderComponent()}
                </div>

            </div>
        </>
    )
}
