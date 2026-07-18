import React from 'react';
import '../../styles/PatientCard.css';

export type PatientCardVariant = 'booked' | 'available' | 'waiting';

interface PatientCardProps {
    variant: PatientCardVariant;
    title: string;
    countText: string;
    buttonText: string;
    imageSrc: string;
    isActive?: boolean;
    onClick?: () => void;
    onButtonClick?: (e: React.MouseEvent) => void;
}

export const PatientCard: React.FC<PatientCardProps> = ({
    variant,
    title,
    countText,
    buttonText,
    imageSrc,
    isActive = false,
    onClick,
    onButtonClick
}) => {

    return (
        <div
            className={`patient-card-container variant-${variant} ${isActive ? 'active' : ''}`}
            onClick={onClick}
        >

            {/* Top Profile Artwork Slice */}
            <div className="patient-card-img-wrapper">
                <img
                    src={imageSrc}
                    alt={title}
                    className="patient-card-thumbnail"
                />
            </div>

            {/* Center Metadata Metrics Block */}
            <div className="patient-card-content">
                <p className="patient-card-title">{title}</p>
                <p className="patient-card-count">{countText}</p>
            </div>

            {/* Core Action Trigger Target element slice footer */}
            <button
                className="patient-card-btn"
                onClick={(e) => {
                    e.stopPropagation(); // Stops parent container click events bubbling up
                    if (onButtonClick) onButtonClick(e);
                }}
            >
                {buttonText}
            </button>

        </div>
    );
};

export default PatientCard;
