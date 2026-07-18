import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Col, Row } from "react-bootstrap";

import Emergency from "./Emergency";
import OutPatients from "./OutPatients";
import InPatients from "./InPatients";
import Header from "../../GlobalHelpers/Header";
import BorderedThreeDot from '../../../public/Assets/Icons/BorderedThreeDot.svg?react'

import '../../styles/Reception.css';

type PatientType = "emergency" | "outpatient" | "inpatient";

export default function ReceptionNewPatients() {

    const [selectedType, setSelectedType] = useState<PatientType>("inpatient");
    // State to toggle the dropdown menu visibility
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    // Toggle function
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const patientTypes = [
        {
            key: "inpatient",
            title: "In patient",
            description:
                "Patient is admitted to the hospital for treatment or medical observation.",
        },
        {
            key: "outpatient",
            title: "Outpatient",
            description:
                "Patient visits for consultation or follow-up and leaves the same day.",
        },
        {
            key: "emergency",
            title: "Emergency",
            description:
                "Urgent medical condition requiring immediate attention without prior appointment.",
        }
    ];

    const renderComponent = () => {
        switch (selectedType) {
            case "emergency":
                return <Emergency />;

            case "outpatient":
                return <OutPatients onPatientTypeChange={(type) => setSelectedType(type as PatientType)} />;

            case "inpatient":
            default:
                return <InPatients />;
        }
    };

    return (
        <>
            <div className="container-fluid p-3">

                {/* Header */}
                <Header
                    heading="Reception"
                    subHeading="New Patients"
                />

                <div className="d-flex justify-content-between align-items-center my-4">
                    <h5 className="patient-info-heading mb-0">
                        New Patient
                    </h5>

                    <div className="d-flex justify-content-between gap-3">
                        <button className="back-btn" onClick={()=>navigate("/reception")}>
                            <i className="ri-arrow-left-line me-3"></i>Back
                        </button>

                        {/* Wrap the button and dropdown in a relative container */}
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
                                        Print Registration Card
                                    </button>
                                    <button
                                        className="dropdown-item-btn clear-btn rounded-3 text-nowrap text-start border-0 bg-transparent w-100 px-3 py-2 text-danger"
                                        onClick={() => { console.log('Clear clicked'); setIsOpen(false); }}
                                    >
                                        Clear
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <Card className="shadow-sm border-0 reception-main-card mt-4">
                    <Card.Body className="p-4">

                        {/* Tabs */}
                        <Row className="g-4 mb-4">
                            {patientTypes.map((item) => (
                                <Col md={4} key={item.key}>
                                    <div
                                        className={`patient-type-card ${selectedType === item.key ? "active" : ""
                                            }`}
                                        onClick={() =>
                                            setSelectedType(item.key as PatientType)
                                        }
                                    >
                                        <div className="d-flex align-items-start">
                                            <div className="radio-wrapper">
                                                <div className="custom-radio">
                                                </div>
                                            </div>

                                            <div className="ms-3">
                                                <h6 className="mb-3">{item.title}</h6>

                                                <p className="mb-0 text-muted fs-14 fw-500">
                                                    {item.description}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                            ))}
                        </Row>

                        {/* Dynamic Component Area */}
                        <div className="">
                            {renderComponent()}
                        </div>

                    </Card.Body>
                </Card>
            </div>
        </>
    )
}
