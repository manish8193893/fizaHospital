import { useMemo, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

import VitalSign from "./VitalSign";
import Allergies from "./Allergies";
import Immunization from "./Immunization";
import PresentingComplaint from "./PresentingComplaint";
import HistoryAndExamination from "./HistoryAndExamination";
import Diagnosis from "./Diagnosis";
import InvestigationProcedure from "./InvestigationProcedure";
import Radiology from "./Radiology";
import PrescriptionMedicine from "./PrescriptionMedicine";
import Advice from "./Advice";
import MedicalCertificate from "./MedicalCertificate";

const tabs = [
    "Vital Sign",
    "Allergies",
    "Immunization",
    "Presenting Complaint",
    "History and Examination",
    "Diagnosis",
    "Investigation/Procedure",
    "Radiology",
    "Prescription Medicine",
    "Advice",
    "Medical Certificate",
];

export default function MedicalRecord() {
    const [activeTab, setActiveTab] = useState("Vital Sign");

    const ActiveComponent = useMemo(() => {
        switch (activeTab) {
            case "Vital Sign":
                return <VitalSign />;

            case "Allergies":
                return <Allergies />;

            case "Immunization":
                return <Immunization />;

            case "Presenting Complaint":
                return <PresentingComplaint />;

            case "History and Examination":
                return <HistoryAndExamination />;

            case "Diagnosis":
                return <Diagnosis />;

            case "Investigation/Procedure":
                return <InvestigationProcedure />;

            case "Radiology":
                return <Radiology />;

            case "Prescription Medicine":
                return <PrescriptionMedicine />;

            case "Advice":
                return <Advice />;

            case "Medical Certificate":
                return <MedicalCertificate />;

            default:
                return <VitalSign />;
        }
    }, [activeTab]);

    return (
        <div className="medicalRecordWrapper">

            {/* Tabs Section */}
            <div className="medicalTabsWrapper border-bottom pb-3 mb-4">

                <Swiper
                    modules={[Navigation]}
                    navigation={true}
                    slidesPerView="auto"
                    spaceBetween={10}
                    freeMode={false}
                    className="slider p-2"
                >
                    {tabs.map((tab) => (
                        <SwiperSlide
                            key={tab}
                            style={{ width: "auto" }}
                            className="slider-options rounded-3"
                        >
                            <button
                                type="button"
                                onClick={() => setActiveTab(tab)}
                                className={`medicalTabBtn rounded-3 ${activeTab === tab ? "active bg-blue text-white fw-500" : ""
                                    }`}
                            >
                                {tab}
                            </button>
                        </SwiperSlide>
                    ))}
                </Swiper>

            </div>

            {/* Active Form */}
            {ActiveComponent}

        </div>
    );
}