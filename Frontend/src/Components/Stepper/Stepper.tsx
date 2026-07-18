/******************************************************
    Name : Manish Kumar
    Date : 23/05/2026
    Purpose : Common reusable stepper component
**************************************************************/

import React from "react";
import { motion } from "framer-motion";
import styles from "../../styles/Stepper.module.css";

interface StepperProps {
    steps: string[];
    currentStep: number;
    highestVisitedStep: number;
    onStepClick: (step: number) => void;
}

const Stepper: React.FC<StepperProps> = ({
    steps,
    currentStep,
    highestVisitedStep,
    onStepClick,
}) => {

    /******************************************************
        Name : Manish Kumar
        Date : 23/05/2026
        Purpose : Check if step is accessible
    **************************************************************/
    const isStepAccessible = (index: number) => {
        return index <= highestVisitedStep;
    };

    return (
        <div className={styles.stepperWrapper}>
            {steps.map((step, index) => {

                /******************************************************
                    Name : Manish Kumar
                    Date : 23/05/2026
                    Purpose : Step conditions
                **************************************************************/
                const isActive =
                    currentStep === index;

                const isCompleted =
                    index < highestVisitedStep;

                return (
                    <div
                        key={index}
                        className={`${styles.stepItem} ${isStepAccessible(index)
                            ? styles.clickable
                            : styles.disabled
                            }`}
                        onClick={() => {
                            if (isStepAccessible(index)) {
                                onStepClick(index);
                            }
                        }}
                    >

                        {/* Active Sliding Box */}
                        <div className={styles.stepWrapper}>

                            {isActive && (
                                <motion.div
                                    layoutId="activeStepBackground"
                                    className={styles.activeBackground}
                                    transition={{
                                        type: "spring",
                                        stiffness: 120,
                                        damping: 20,
                                        mass: 1.2,
                                    }}
                                />
                            )}

                            {/* Step Content */}
                            <div className={styles.stepContent}>

                                {/* Step Circle */}
                                <div
                                    className={`${styles.stepCircle} ${isActive
                                        ? styles.activeCircle
                                        : isCompleted
                                            ? styles.completedCircle
                                            : styles.inactiveCircle
                                        }`}
                                >
                                    {isCompleted
                                        ? "✓"
                                        : `0${index + 1}`}
                                </div>

                                {/* Step Label */}
                                <span
                                    className={`${styles.stepLabel} ${isActive
                                        ? styles.activeLabel
                                        : styles.inactiveLabel
                                        }`}
                                >
                                    {step}
                                </span>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default Stepper;