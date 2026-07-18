import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import Header from "../../../GlobalHelpers/Header";
import SupplierOverview from "./SupplierOverview";
import SupplierProducts from "./SupplierProducts";
import SupplierLedger from "./SupplierLedger";
import SupplierInvoice from "./SupplierInvoice";
import SupplierPayment from "./SupplierPayment";
import SupplierDocuments from "./SupplierDocuments";
import SupplierSettings from "./SupplierSettings";

import BorderedThreeDot from '../../../../public/Assets/Icons/BorderedThreeDot.svg?react'

import "../../../styles/Pharmacy.css";


export default function SupplierDetails() {

    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    /********************************************
        Name : Manish Kumar
        Date : 21/06/2026
        Purpose : ACTIVE TAB STATE
      *********************************************/
    const [activeTab, setActiveTab] = useState<string>("overview");

    /********************************************
      Name : Manish Kumar
      Date : 21/06/2026
      Purpose : SUPPLIERS DETAILS TABS
    *********************************************/
    const TABS = [
        { id: "overview", label: "Overview" },
        { id: "products", label: "Supplier Products" },
        { id: "ledger", label: "Supplier Ledger" },
        { id: "invoice", label: "Invoice" },
        { id: "payment", label: "Payments" },
        { id: "documents", label: "Documents" },
        { id: "settings", label: "Settings" },
    ];

    /********************************************
      Name : Manish Kumar
      Date : 21/06/2026
      Purpose : TAB COMPONENT RENDERING
    *********************************************/
    const renderComponent = () => {

        switch (activeTab) {

            case "overview":
                return <SupplierOverview />;

            case "products":
                return <SupplierProducts />;

            case "ledger":
                return <SupplierLedger />;

            case "invoice":
                return <SupplierInvoice />;

            case "payment":
                return <SupplierPayment />;

            case "documents":
                return <SupplierDocuments />;

            case "settings":
                return <SupplierSettings />;

            default:
                return <SupplierOverview />;
        }
    };

    // Toggle function
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <div className="container-fluid p-3">

                <Header heading="Pharmacy" subHeading="Supplier/ Manish Kumar" />

                {/* Banner Section */}
                <div className="patient-banner-wrapper mt-3"></div>

                <div className="OutPatientProfileCard mb-3 bg-white rounded-3 p-3">
                    <div className="d-flex justify-content-between">
                        <div>
                            <h5 className="fs-18 fw-500 mb-0">Manish Kumar</h5>
                            <span className="fs-14 fw-500 text-muted">VND-1006</span>
                        </div>
                        <div className="d-flex align-items-start gap-3">
                            <span className="suppliercategoryBtn">Active</span>
                            <span className="supplierStatusBtn">Finance</span>
                            <div className="position-relative">
                                <button
                                    type="button"
                                    className="patient-menu-btn border-0 bg-transparent p-0"
                                    onClick={toggleMenu}
                                >
                                    <BorderedThreeDot />
                                </button>

                                {/* Conditional rendering for the popup menu */}
                                {isOpen && (
                                    <div
                                        className="custom-dropdown-menu shadow p-2"
                                        style={{
                                            position: 'absolute',
                                            top: '100%',
                                            right: 0,
                                            zIndex: 1000,
                                            minWidth: '180px',
                                            backgroundColor: '#fff',
                                            borderRadius: '8px',
                                            padding: '10px 0',
                                            marginTop: '8px'
                                        }}
                                    >
                                        <button
                                            className="dropdown-item-btn print-btn rounded-3 text-nowrap mb-1 text-start border-0 bg-transparent w-100 px-3 py-2"
                                            onClick={() => { console.log('Print clicked'); setIsOpen(false); }}
                                        >
                                            Add invoice
                                        </button>
                                        <button
                                            className="dropdown-item-btn print-btn rounded-3 text-nowrap mb-1 text-start border-0 bg-transparent w-100 px-3 py-2"
                                            onClick={() => { console.log('Print clicked'); setIsOpen(false); }}
                                        >
                                            Make Payment
                                        </button>
                                        <button
                                            className="dropdown-item-btn print-btn rounded-3 text-nowrap mb-1 text-start border-0 bg-transparent w-100 px-3 py-2"
                                            onClick={() => { console.log('Print clicked'); setIsOpen(false); }}
                                        >
                                            Upload Document
                                        </button>
                                        <button
                                            className="dropdown-item-btn clear-btn rounded-3 text-nowrap text-start border-0 bg-transparent w-100 px-3 py-2 text-danger"
                                            onClick={() => { console.log('Clear clicked'); setIsOpen(false); }}
                                        >
                                            Deactivate Supplier
                                        </button>
                                    </div>
                                )}
                            </div>

                            <button className="back-btn" onClick={() => navigate("/pharmacy/Suppliers")}>
                                <i className="ri-arrow-left-line me-3"></i>Back
                            </button>
                        </div>
                    </div>

                    <div className="d-flex w-100 p-2 overflow-auto mb-4 position-relative mt-4 mb-3" style={{ backgroundColor: "#F2F2F2" }}>

                        {TABS.map((tab) => {

                            const isActive =
                                activeTab === tab.id;

                            return (
                                <button
                                    key={tab.id}
                                    className={`patient-tab-btn border-0 bg-white ${isActive ? "active" : ""}`}
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
                    <div className="p-3 pt-0">
                        {renderComponent()}
                    </div>
                </div>
            </div>
        </>
    )
}
