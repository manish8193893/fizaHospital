import { useMemo, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import VioletHospitalBuilding from "../../../../public/Assets/Icons/VioletHospitalBuilding.svg?react";
import DoubleBed from "../../../../public/Assets/Icons/DoubleBed.svg?react";

import "../../../styles/WardManagement.css";

type BedStatus = "available" | "occupied" | "maintenance";

interface Bed {
    id: number;
    floorId: string;
    bedNumber: string;
    status: BedStatus;
    patientName?: string;
    days?: number;
}

export default function WardDashboard() {

    const floorConfig = [
        { id: "groundFloor", label: "Ground Floor", beds: 10 },
        { id: "firstFloor", label: "First Floor", beds: 9 },
        { id: "secondFloor", label: "Second Floor", beds: 11 },
        { id: "thirdFloor", label: "Third Floor", beds: 8 },
        { id: "fourthFloor", label: "Fourth Floor", beds: 9 },
        { id: "fifthFloor", label: "Fifth Floor", beds: 6 },
        { id: "sixthFloor", label: "Sixth Floor", beds: 16 },
        { id: "seventhFloor", label: "Seventh Floor", beds: 12 },
        { id: "enighthFloor", label: "Enighth Floor", beds: 9 },
        { id: "ninthFloor", label: "Ninth Floor", beds: 13 },
        { id: "tenthFloor", label: "Tenth Floor", beds: 10 },
    ];

    const [activeFloor, setActiveFloor] = useState("groundFloor");

    const bedsData: Bed[] = useMemo(() => {
        const beds: Bed[] = [];
        let globalId = 1;

        floorConfig.forEach((floor) => {
            for (let i = 1; i <= floor.beds; i++) {
                let status: BedStatus = "available";

                if (i % 6 === 0) {
                    status = "occupied";
                } else if (i % 11 === 0) {
                    status = "maintenance";
                }

                beds.push({
                    id: globalId++,
                    floorId: floor.id,
                    bedNumber: `No.${i}`,
                    status,
                    patientName:
                        status === "occupied"
                            ? `Patient ${i}`
                            : undefined,
                    days:
                        status === "occupied"
                            ? Math.floor(Math.random() * 20) + 1
                            : undefined
                });
            }
        });

        return beds;
    }, []);

    const floors = floorConfig;

    const filteredBeds = bedsData.filter(
        (bed) => bed.floorId === activeFloor
    );

    const availableCount = filteredBeds.filter(
        (bed) => bed.status === "available"
    ).length;

    const occupiedCount = filteredBeds.filter(
        (bed) => bed.status === "occupied"
    ).length;

    const maintenanceCount = filteredBeds.filter(
        (bed) => bed.status === "maintenance"
    ).length;

    return (
        <div className="bg-white p-3 rounded-2">
            <div className="d-flex flex-wrap justify-content-between gap-3 mb-4">
                <div className="d-flex align-items-center gap-2">
                    <VioletHospitalBuilding />
                    <h5 className="fs-16 fw-500 mb-0">
                        Hospital Floor Plan & Room Availability
                    </h5>
                </div>

                <div className="d-flex flex-wrap gap-4">
                    <div className="d-flex align-items-center gap-2">
                        <div className="dottedColorCircle available"></div>
                        <span className="fs-14 fw-500">Available</span>
                    </div>

                    <div className="d-flex align-items-center gap-2">
                        <div className="dottedColorCircle occupied"></div>
                        <span className="fs-14 fw-500">Occupied</span>
                    </div>

                    <div className="d-flex align-items-center gap-2">
                        <div className="dottedColorCircle maintenance"></div>
                        <span className="fs-14 fw-500">Maintenance</span>
                    </div>
                </div>
            </div>

            <div className="wardTabsWrapper mb-4">
                <Swiper
                    modules={[Navigation]}
                    navigation
                    slidesPerView="auto"
                    spaceBetween={10}
                    className="slider p-2"
                >
                    {floors.map((floor) => (
                        <SwiperSlide
                            key={floor.id}
                            style={{ width: "auto" }}
                        >
                            <button
                                type="button"
                                onClick={() => setActiveFloor(floor.id)}
                                className={`wardTabBtn rounded-3 ${activeFloor === floor.id
                                    ? "active bg-blue text-white fw-500"
                                    : ""
                                    }`}
                            >
                                {floor.label}
                            </button>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            <div className="d-flex justify-content-between align-items-center mb-4">
                <h6 className="mb-0 fw-600">
                    {
                        floors.find(
                            (floor) => floor.id === activeFloor
                        )?.label
                    }
                </h6>

                <div className="d-flex gap-3">
                    <span className="badge px-3 py-2" style={{ color: "#1FC16B", backgroundColor: "rgba(31, 193, 107, 0.1)" }}>
                        Available Beds : {availableCount}
                    </span>
                    <span className="badge px-3 py-2" style={{ color: "#FB2C36", backgroundColor: "rgba(251, 44, 54, 0.1)" }}>
                        Occupied Beds : {occupiedCount}
                    </span>
                    <span className="badge px-3 py-2" style={{ color: "#F0B100", backgroundColor: "rgba(240, 176, 0, 0.1)" }}>
                        Maintenance Beds : {maintenanceCount}
                    </span>
                </div>
            </div>

            <div className="row g-3">
                {filteredBeds.map((bed) => (
                    <div key={bed.id} className="col-bed-5">
                        <div
                            className={`bed-card ${bed.status === "occupied"
                                ? "occupied-bed"
                                : bed.status === "maintenance"
                                    ? "maintenance-bed"
                                    : "available-bed"
                                }`}
                        >
                            <div className="bed-status-icon">
                                {bed.status === "available" && (
                                    <i className="ri-check-fill fs-14 p-1 available-icon rounded-circle"></i>
                                )}

                                {bed.status === "occupied" && (
                                    <i className="ri-check-fill fs-14 p-1 occupied-icon rounded-circle"></i>
                                )}

                                {bed.status === "maintenance" && (
                                    <i className="ri-check-fill fs-14 p-1 maintenance-icon rounded-circle"></i>
                                )}
                            </div>

                            <div className="text-center">
                                <div className="d-flex justify-content-center align-items-center gap-2 mb-2">
                                    <span className={`${bed.status === "available" && "available-number"} ${bed.status === "occupied" && "occupied-number"} ${bed.status === "maintenance" && "maintenance-number"}`}>
                                        {bed.bedNumber}
                                    </span>

                                    <div
                                        className={
                                            bed.status === "available"
                                                ? "available-bedIcon"
                                                : bed.status === "occupied"
                                                    ? "occupied-bedIcon"
                                                    : "maintenance-bedIcon"
                                        }
                                    >
                                        <DoubleBed width={18} height={18} />
                                    </div>
                                </div>

                                {bed.status === "available" && (
                                    <div className="text-green">
                                        Available
                                    </div>
                                )}

                                {bed.status === "occupied" && (
                                    <>
                                        <div className="d-flex flex-column">
                                            <span className="fs-12 text-muted fw-600">Manish Kumar</span>
                                            <span className="fs-12 text-muted fw-600">25/05/2026 - 29/06/2026</span>
                                        </div>

                                        <div className="fs-14 fw-500 text-muted">
                                            {bed.days} Days
                                        </div>
                                    </>
                                )}

                                {bed.status === "maintenance" && (
                                    <>
                                        <div className="bed-patient text-muted">
                                            Not Available Now
                                        </div>

                                        <div className="maintenance-text">
                                            Repair Required
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}