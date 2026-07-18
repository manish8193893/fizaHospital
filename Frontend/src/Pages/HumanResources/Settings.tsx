import { motion } from "framer-motion";
import { useState } from "react";

// Import your components
import Header from "../../GlobalHelpers/Header";
import JobTitle from "../../Components/HumanResource/Settings/JobTitle";
import WorkShift from "../../Components/HumanResource/Settings/WorkShift";
import Departments from "../../Components/HumanResource/Settings/Departments";
import LeaveType from "../../Components/HumanResource/Settings/LeaveType";
import PayrollSettings from "../../Components/HumanResource/Settings/PayrollSettings";
import BiometricDevices from "../../Components/HumanResource/Settings/BiometricDevices";
import BiometricSettings from "../../Components/HumanResource/Settings/BiometricSettings";
import FloorSettings from "../../Components/HumanResource/Settings/FloorSettings";

import '../../styles/HumanResource.css';

export default function Settings() {

  /********************************************
    Name : Manish Kumar
    Date : 15/06/2026
    Purpose : ACTIVE TAB STATE
  *********************************************/
  const [activeTab, setActiveTab] = useState<string>("jobTitle");

  /********************************************
    Name : Manish Kumar
    Date : 15/06/2026
    Purpose : HR SETTINGS TABS
  *********************************************/
  const TABS = [
    { id: "jobTitle", label: "Job Title" },
    { id: "workShift", label: "Work Shift" },
    { id: "departments", label: "Departments" },
    { id: "leaveType", label: "Leave Type" },
    { id: "payrollSettings", label: "Payroll Settings" },
    { id: "biometricDevices", label: "Biometric Devices" },
    { id: "biometricSettings", label: "Biometric Settings" },
    { id: "floorSettings", label: "Floor Settings" }
  ];

  /********************************************
    Name : Manish Kumar
    Date : 15/06/2026
    Purpose : TAB COMPONENT RENDERING
  *********************************************/
  const renderComponent = () => {

    switch (activeTab) {

      case "jobTitle":
        return <JobTitle />;

      case "workShift":
        return <WorkShift />;

      case "departments":
        return <Departments />;

      case "leaveType":
        return <LeaveType />;

      case "payrollSettings":
        return <PayrollSettings />;

      case "biometricDevices":
        return <BiometricDevices />;

      case "biometricSettings":
        return <BiometricSettings />;

      case "floorSettings":
        return <FloorSettings />;

      default:
        return <JobTitle />;
    }
  };

  return (
    <div className="container-fluid p-3">
      <Header heading="Human Resources" subHeading="Settings" />

      {/* Tabs Section */}
      <div className="d-flex w-100 p-2 overflow-auto mb-3 position-relative bg-white my-3">

        {TABS.map((tab) => {

          const isActive =
            activeTab === tab.id;

          return (
            <button
              key={tab.id}
              className={`hrSettings-Tab-Btn border-0 ${isActive ? "active" : ""}`}
              onClick={() =>
                setActiveTab(tab.id)
              }
            >
              <span className="hrSettings-Tab-Text">
                {tab.label}
              </span>

              {isActive && (
                <motion.div
                  layoutId="activeTabIndicator"
                  className="hrSettings-BgIndicator"
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
      <div className="p-3 pt-0">
        {renderComponent()}
      </div>
    </div >
  );
}