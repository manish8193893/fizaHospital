import { motion } from "framer-motion";
import Header from "../../GlobalHelpers/Header";
import { useState } from "react";
import Scheduled from "../../Components/SurgicalManagement/SurgicalQueue/Scheduled";
import OTScheduling from "../../Components/SurgicalManagement/SurgicalQueue/OTScheduling";

import '../../styles/SurgicalScheduled.css';


export default function SurgicalQueues() {

  /********************************************
    Name : Manish Kumar
    Date : 27/06/2026
    Purpose : ACTIVE TAB STATE
  *********************************************/
  const [activeTab, setActiveTab] = useState<string>("scheduled");

  /********************************************
    Name : Manish Kumar
    Date : 27/06/2026
    Purpose : SURGICAL QUEUE TABS
  *********************************************/
  const TABS = [
    { id: "scheduled", label: "Scheduled" },
    { id: "OTScheduling", label: "OT Scheduling" },
  ];

  /********************************************
    Name : Manish Kumar
    Date : 27/06/2026
    Purpose : TAB COMPONENT RENDERING
  *********************************************/
  const renderComponent = () => {

    switch (activeTab) {

      case "scheduled":
        return <Scheduled />;

      case "OTScheduling":
        return <OTScheduling />;

      default:
        return <Scheduled />;
    }
  };


  return (
    <div className="container-fluid p-3">

      <Header
        heading="Surgical Management"
        subHeading="Surgical Queues"
      />

      {/* Tabs Section */}
      <div className="d-flex w-100 p-2 overflow-auto mb-3 position-relative bg-white my-3">

        {TABS.map((tab) => {

          const isActive =
            activeTab === tab.id;

          return (
            <button
              key={tab.id}
              className={`scheduled-Tab-Btn ${isActive ? "active" : ""}`}
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
  );
}