import { useState } from "react";
import { motion } from "framer-motion";

import Header from "../../GlobalHelpers/Header";


import Style from "../../styles/Accounting.module.css";
import AdditionalChargesSetting from "../../Components/Accounting/AccountingSettings/AdditionalChargesSetting";
import DoctorFeeConfiguration from "../../Components/Accounting/AccountingSettings/DoctorFeeConfiguration";
import DeviceAndMedicalAssets from "../../Components/Accounting/AccountingSettings/DeviceAndMedicalAssets";
import ExpenseCategories from "../../Components/Accounting/AccountingSettings/ExpenseCategories";
import RentsAndLeases from "../../Components/Accounting/AccountingSettings/RentsAndLeases";

export default function AccountingSettings() {

    /********************************************
        Name : Manish Kumar
        Date : 30/06/2026
        Purpose : ACTIVE TAB STATE
    *********************************************/
    const [activeTab, setActiveTab] = useState<string>("charges");

    /********************************************
      Name : Manish Kumar
      Date : 30/06/2026
      Purpose : ACCOUNTING SETTINGS TABS
    *********************************************/
    const TABS = [
        { id: "charges", label: "Additional Charges Settings" },
        { id: "doctorfee", label: "Doctor Fees Configuration" },
        { id: "device&medical", label: "Device / Medical Assets" },
        { id: "expensecategories", label: "Expense Categories" },
        { id: "rent&leases", label: "Rents & Leases" },
    ];

    /********************************************
      Name : Manish Kumar
      Date : 23/06/2026
      Purpose : TAB COMPONENT RENDERING
    *********************************************/
    const renderComponent = () => {

        switch (activeTab) {

            case "charges":
                return <AdditionalChargesSetting />;

            case "doctorfee":
                return <DoctorFeeConfiguration />;

            case "device&medical":
                return <DeviceAndMedicalAssets />;

            case "expensecategories":
                return <ExpenseCategories />;

            case "rent&leases":
                return <RentsAndLeases />;

            default:
                return <AdditionalChargesSetting />;
        }
    };

    return (
        <>
            <div className="container-fluid p-3">

                <Header
                    heading="Accounting"
                    subHeading="Accounting Settings"
                />

                {/* Tabs Section */}
                <div className="d-flex w-100 p-2 overflow-auto mb-3 position-relative bg-white my-3">

                    {TABS.map((tab) => {

                        const isActive =
                            activeTab === tab.id;

                        return (
                            <button
                                key={tab.id}
                                className={`${Style.accountingTabBtn} border-0 ${isActive ? `${Style.active}` : ""}`}
                                onClick={() =>
                                    setActiveTab(tab.id)
                                }
                            >
                                <span className={`${Style.accountingTabText}`}>
                                    {tab.label}
                                </span>

                                {isActive && (
                                    <motion.div
                                        layoutId="activeTabIndicator"
                                        className={`${Style.accountingBgIndicator}`}
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
        </>
    )
}
