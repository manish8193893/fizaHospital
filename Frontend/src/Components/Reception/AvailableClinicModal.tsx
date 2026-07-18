import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Col, Modal, Row } from "react-bootstrap";

import '../../styles/Reception.css'

interface AvailableClinicModalProps {
    show: boolean;
    handleClose: () => void;
}

export default function AvailableClinicModal({ show, handleClose }: AvailableClinicModalProps) {

    const [selectedClinic, setSelectedClinic] = useState<number | null>(null);
    const navigate = useNavigate();

    const clinics = [
        {
            id: 1,
            department: "Internal Medicine",
            doctor: "Dr. Samer Yousif",
            patients: 3,
        },
        {
            id: 2,
            department: "Cardiology",
            doctor: "Dr. Ahmed Hassan",
            patients: 5,
        },
        {
            id: 3,
            department: "Dermatology",
            doctor: "Dr. Noor Ali",
            patients: 2,
        },
        {
            id: 4,
            department: "Neurology",
            doctor: "Dr. Sarah Khalid",
            patients: 4,
        },
        {
            id: 5,
            department: "Orthopedics",
            doctor: "Dr. Omar Kareem",
            patients: 1,
        },
        {
            id: 6,
            department: "Pediatrics",
            doctor: "Dr. Lina Mahmood",
            patients: 6,
        },
    ];

    const handleAddPatient = () => {
        if (!selectedClinic) return;

        handleClose(); // optional: close modal first

        navigate("/reception/NewPatients");
    };

    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                centered
                size="lg"
                backdrop="static"
                contentClassName="aph-modal-content"
                backdropClassName="aph-modal-backdrop"
            >
                {/* HEADER */}
                <Modal.Header className='aph-modal-header mb-3'>
                    <button
                        type="button"
                        className="border-0 rounded-circle d-flex align-items-center justify-content-center p-0 outline-0"
                        style={{ position: 'absolute', right: '2.6rem', top: '2.7rem' }}
                        onClick={handleClose}
                        aria-label="Close"
                    >
                        <img src="/Assets/Icons/CrossModalIcon.svg" alt="CrossModalIcon" />
                    </button>
                    <Modal.Title className='fs-18 fw-400 aph-modal-title'>
                        Clinic Available
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body className='p-0'>
                    <Row className="g-3">
                        {clinics.map((clinic) => (
                            <Col md={4} key={clinic.id}>
                                <div
                                    className={`clinic-card ${selectedClinic === clinic.id ? "selected" : ""
                                        }`}
                                    onClick={() => setSelectedClinic(clinic.id)}
                                >
                                    {selectedClinic === clinic.id && (
                                        <div className="selected-icon">
                                            ✓
                                        </div>
                                    )}

                                    <h6 className="clinic-title">{clinic.department}</h6>

                                    <p className="clinic-doctor mb-2">{clinic.doctor}</p>

                                    <span className="clinic-patients">
                                        {clinic.patients} waiting patient
                                    </span>
                                </div>
                            </Col>
                        ))}
                    </Row>

                    <div className="d-flex justify-content-between border-0 pb-0 mt-5">
                        <Button
                            type="button"
                            className="aph-modal-btn-height outline-0 col-md-4 border-secondary text-secondary bg-white fs-18 fw-400"
                            onClick={handleClose}
                        >
                            Close
                        </Button>

                        <Button
                            type="button"
                            className="aph-modal-btn-height border-0 outline-0 col-md-7 bg-blue text-white fs-18 fw-400"
                            disabled={!selectedClinic}
                            onClick={handleAddPatient}
                        >
                            Add New Patients
                        </Button>
                    </div>
                </Modal.Body>
            </Modal >
        </>
    )
}
