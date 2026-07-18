import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import styles from "../styles/CustomFormDropdown.module.css";

export interface DropdownOption {
    id: string;
    name: string;
    additionalVal1?: string | null;
    additionalVal2?: string | null;
    additionalVal3?: string | null;
    additionalVal4?: string | null;
}

interface CustomFormDropdownProps {
    id?: string;
    options: DropdownOption[];
    placeholder?: string;
    value?: DropdownOption | null;
    disabled?: boolean;
    required?: boolean;
    onChange?: (selected: DropdownOption | null) => void;
}

const CustomFormDropdown: React.FC<CustomFormDropdownProps> = ({
    id,
    options,
    placeholder = "Select Option",
    value = null,
    disabled = false,
    required = false,
    onChange,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isTouched, setIsTouched] = useState(false);

    const triggerRef = useRef<HTMLButtonElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const [coords, setCoords] = useState({
        top: 0,
        left: 0,
        width: 0,
        maxHeight: 250,
    });

    const updateDimensions = () => {
        if (triggerRef.current) {
            const rect = triggerRef.current.getBoundingClientRect();

            const availableSpaceBelow =
                window.innerHeight - rect.bottom - 20;

            setCoords({
                top: rect.bottom + window.scrollY,
                left: rect.left + window.scrollX,
                width: rect.width,
                maxHeight: Math.min(300, availableSpaceBelow),
            });
        }
    };

    const toggleDropdown = () => {
        if (disabled) return;

        if (!isOpen) {
            updateDimensions();
        } else {
            setIsTouched(true);
        }

        setIsOpen((prev) => !prev);
    };

    const handleSelect = (option: DropdownOption | null) => {
        setIsTouched(true);

        if (onChange) {
            onChange(option);
        }

        setIsOpen(false);
    };

    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            const target = event.target as Node;

            if (
                triggerRef.current?.contains(target) ||
                dropdownRef.current?.contains(target)
            ) {
                return;
            }

            if (isOpen) setIsTouched(true);

            setIsOpen(false);
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleOutsideClick);

            window.addEventListener("resize", updateDimensions);

            window.addEventListener("scroll", updateDimensions, {
                passive: true,
            });
        }

        return () => {
            document.removeEventListener(
                "mousedown",
                handleOutsideClick
            );

            window.removeEventListener(
                "resize",
                updateDimensions
            );

            window.removeEventListener(
                "scroll",
                updateDimensions
            );
        };
    }, [isOpen]);

    const hasError = required && isTouched && !value;

    return (
        <div className={styles["custom-dropdown-wrapper"]}>
            <div
                className={`
                    ${styles["custom-dropdown"]}
                    ${hasError ? styles["dropdown-error"] : ""}
                    ${disabled ? styles["dropdown-disabled"] : ""}
                `}
            >
                <button
                    id={id}
                    ref={triggerRef}
                    type="button"
                    disabled={disabled}
                    className={`${styles["dropdown-trigger"]} outline-0`}
                    onClick={toggleDropdown}
                >
                    <span
                        className={
                            value
                                ? "text-dark text-muted fw-400"
                                : styles["dropdown-placeholder"]
                        }
                    >
                        {value ? value.name : placeholder}
                    </span>

                    <i
                        className={`
                            ri-arrow-drop-down-line
                            fs-22
                            ${styles["dropdown-icon"]}
                            ${isOpen ? styles["rotate-icon"] : ""}
                        `}
                    ></i>
                </button>

                {isOpen &&
                    createPortal(
                        <div
                            ref={dropdownRef}
                            className={styles["dropdown-menu-portal"]}
                            style={{
                                top: `${coords.top}px`,
                                left: `${coords.left}px`,
                                width: `${coords.width}px`,
                                maxHeight: `${coords.maxHeight}px`,
                            }}
                        >
                            <div
                                className={`
                                    ${styles["dropdown-option"]}
                                    ${styles["placeholder-option"]}
                                `}
                                onClick={() => handleSelect(null)}
                            >
                                {placeholder}
                            </div>

                            {options.map((option) => {
                                const isSelected =
                                    value?.id === option.id;

                                return (
                                    <div
                                        key={option.id}
                                        className={`
                                            ${styles["dropdown-option"]}
                                            ${isSelected
                                                ? styles["selected-option"]
                                                : ""
                                            }
                                        `}
                                        onClick={() =>
                                            handleSelect(option)
                                        }
                                    >
                                        {option.name}
                                    </div>
                                );
                            })}
                        </div>,
                        document.body
                    )}
            </div>

            {hasError && (
                <p
                    className={`
                        ${styles["dropdown-error-text"]}
                        mb-0
                        text-danger
                    `}
                >
                    Please select a valid option
                </p>
            )}
        </div>
    );
};

export default CustomFormDropdown;