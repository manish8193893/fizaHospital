import { useState } from "react";
import { motion } from "framer-motion";

import Header from "../../GlobalHelpers/Header";
import WardManagement from "../../Components/WardManagement/WardSettings/WardManagement";
import RoomManagement from "../../Components/WardManagement/WardSettings/RoomManagement";

import "../../styles/WardManagement.css";

export default function WardSettings() {

  /********************************************
    Name : Manish Kumar
    Date : 23/06/2026
    Purpose : ACTIVE TAB STATE
  *********************************************/
  const [activeTab, setActiveTab] = useState<string>("wardManagement");

  /********************************************
    Name : Manish Kumar
    Date : 23/06/2026
    Purpose : WARD SETTINGS TABS
  *********************************************/
  const TABS = [
    { id: "wardManagement", label: "Ward Management" },
    { id: "roomManagement", label: "Room Management" },
  ];

  /********************************************
    Name : Manish Kumar
    Date : 23/06/2026
    Purpose : TAB COMPONENT RENDERING
  *********************************************/
  const renderComponent = () => {

    switch (activeTab) {

      case "wardManagement":
        return <WardManagement />;

      case "roomManagement":
        return <RoomManagement />;

      default:
        return <WardManagement />;
    }
  };

  return (
    <div className="container-fluid p-3">

      <Header
        heading="Ward Management"
        subHeading="Ward Settings"
      />

      {/* Tabs Section */}
      <div className="d-flex w-100 p-2 overflow-auto mb-3 position-relative bg-white my-3">

        {TABS.map((tab) => {

          const isActive =
            activeTab === tab.id;

          return (
            <button
              key={tab.id}
              className={`ward-Tab-Btn border-0 ${isActive ? "active" : ""}`}
              onClick={() =>
                setActiveTab(tab.id)
              }
            >
              <span className={`ward-Tab-Text`}>
                {tab.label}
              </span>

              {isActive && (
                <motion.div
                  layoutId="activeTabIndicator"
                  className={`ward-BgIndicator`}
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
    </div>
  );
}