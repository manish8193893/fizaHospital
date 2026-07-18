import React from 'react';

import '../../styles/NextPatientCard.css';

interface NextPatientCardProps {
    cardHeadingText: string;
    departmentText: string;
    doctorNameText: string;
    patientLabelText: string;
    patientNameValue: string;
    appointmentTypeText: string;
    checkInButtonText: string;
    skipButtonText: string;
    cardHeaderIcon?: React.ReactNode;
    moreOptionsIcon?: React.ReactNode;
    onCheckInClick: () => void;
    onSkipClick: () => void;
    onMoreOptionsClick?: () => void;
}

export const NextPatientCard: React.FC<NextPatientCardProps> = ({
    cardHeadingText,
    departmentText,
    doctorNameText,
    patientLabelText,
    patientNameValue,
    appointmentTypeText,
    checkInButtonText,
    skipButtonText,
    cardHeaderIcon,
    moreOptionsIcon,
    onCheckInClick,
    onSkipClick,
    onMoreOptionsClick
}) => {
    return (
        <div className="next-patient-card">

            {/* 1. Header Segment (Dynamic Top Row Controls Passed via Props) */}
            <div className="npc-header">
                <div className="npc-header-left">
                    {cardHeaderIcon ? cardHeaderIcon : (
                        /* Fallback Icon if none is passed */
                        <img src="/Assets/Icons/ListDetails.svg" alt="Next Patient" width="20px" height="20px" />
                    )}
                    <span>{cardHeadingText}</span>
                </div>

                {/* Dynamic Context Options Trigger */}
                <button className="npc-more-btn" onClick={onMoreOptionsClick} aria-label="More actions">
                    {moreOptionsIcon ? moreOptionsIcon : (
                        /* Fallback More Dots if none is passed */
                        <img src="/Assets/Icons/ThreeVerticalDots.svg" alt="More options" width="16px" height="16px" />
                    )}
                </button>
            </div>

            {/* 2. Timeline Body Section */}
            <div className="npc-timeline-body">
                {/* Left Side: Timeline Tracking Pillar Elements */}
                <div className="npc-timeline-track">
                    <div className="npc-dot" />
                    <div className="npc-line" />
                </div>

                {/* Right Side: Informational Context Details Group */}
                <div className="npc-details">
                    <h4 className="npc-department">{departmentText}</h4>
                    <p className="npc-doctor">{doctorNameText}</p>

                    <p className="npc-meta-label">
                        {patientLabelText} : <span className="npc-meta-value">{patientNameValue}</span>
                    </p>
                    <p className="npc-meta-label">{appointmentTypeText}</p>
                </div>
            </div>

            {/* 3. Footer Operations Link Group */}
            <div className="npc-actions">
                <button className="npc-btn-checkin" onClick={onCheckInClick}>
                    {checkInButtonText}
                </button>
                <button className="npc-btn-skip" onClick={onSkipClick}>
                    {skipButtonText}
                </button>
            </div>

        </div>
    );
};

export default NextPatientCard;
