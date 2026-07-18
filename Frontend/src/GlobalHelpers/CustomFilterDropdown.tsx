import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import "../styles/CustomFilterDropdown.css";

export interface DropdownOption {
    id: string;
    name: string;
    additionalVal1?: string | null;
    additionalVal2?: string | null;
    additionalVal3?: string | null;
    additionalVal4?: string | null;
}

interface CustomFilterDropdownProps {
    id?: string;
    options: DropdownOption[];
    placeholder?: string;
    value?: DropdownOption | null;
    disabled?: boolean;
    required?: boolean;
    customClass?: string;
    onChange?: (selected: DropdownOption | null) => void;
}

const CustomFilterDropdown: React.FC<CustomFilterDropdownProps> = ({
    id,
    options,
    placeholder = "Select Option",
    value = null,
    disabled = false,
    required = false,
    customClass = "",
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
    });

    /* -------------------------------------------------------------------------- */
    /*                           UPDATE POSITION                                  */
    /* -------------------------------------------------------------------------- */

    const updateDimensions = () => {
        if (triggerRef.current) {

            const rect = triggerRef.current.getBoundingClientRect();

            setCoords({
                top: rect.bottom + window.scrollY,
                left: rect.left + window.scrollX,
                width: rect.width,
            });
        }
    };

    /* -------------------------------------------------------------------------- */
    /*                              TOGGLE DROPDOWN                               */
    /* -------------------------------------------------------------------------- */

    const toggleDropdown = () => {

        if (disabled) return;

        if (!isOpen) {
            updateDimensions();
        } else {
            setIsTouched(true);
        }

        setIsOpen((prev) => !prev);
    };

    /* -------------------------------------------------------------------------- */
    /*                              HANDLE SELECT                                 */
    /* -------------------------------------------------------------------------- */

    const handleSelect = (option: DropdownOption | null) => {

        setIsTouched(true);

        if (onChange) {
            onChange(option);
        }

        setIsOpen(false);
    };

    /* -------------------------------------------------------------------------- */
    /*                             OUTSIDE CLICK                                  */
    /* -------------------------------------------------------------------------- */

    useEffect(() => {

        const handleOutsideClick = (event: MouseEvent) => {

            const target = event.target as Node;

            if (
                triggerRef.current?.contains(target) ||
                dropdownRef.current?.contains(target)
            ) {
                return;
            }

            if (isOpen) {
                setIsTouched(true);
            }

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

    /* -------------------------------------------------------------------------- */
    /*                                 VALIDATION                                 */
    /* -------------------------------------------------------------------------- */

    const hasError = required && isTouched && !value;

    /* -------------------------------------------------------------------------- */
    /*                                   JSX                                      */
    /* -------------------------------------------------------------------------- */

    return (

        <div className="custom-dropdown-wrapper">

            <div
                className={`
                    custom-dropdown
                    ${hasError ? "dropdown-error" : ""}
                    ${disabled ? "dropdown-disabled" : ""}
                    ${customClass}
                `}
            >

                <button
                    id={id}
                    ref={triggerRef}
                    type="button"
                    disabled={disabled}
                    className="dropdown-trigger outline-0"
                    onClick={toggleDropdown}
                >

                    <span
                        className={
                            value
                                ? "text-dark text-muted fw-500 fs-14"
                                : "dropdown-placeholder"
                        }
                    >
                        {value ? value.name : placeholder}
                    </span>

                    <i
                        className={`
                            ri-arrow-drop-down-line
                            fs-22
                            dropdown-icon
                            ${isOpen ? "rotate-icon" : ""}
                        `}
                    ></i>

                </button>

                {isOpen &&
                    createPortal(

                        <div
                            ref={dropdownRef}
                            className="dropdown-menu-portal"
                            style={{
                                top: `${coords.top}px`,
                                left: `${coords.left}px`,
                                width: `${coords.width}px`,
                            }}
                        >

                            {/* Placeholder Option */}
                            <div
                                className="dropdown-option placeholder-option"
                                onClick={() => handleSelect(null)}
                            >
                                {placeholder}
                            </div>

                            {/* Options */}
                            {options.map((option) => {

                                const isSelected =
                                    value?.id === option.id;

                                return (
                                    <div
                                        key={option.id}
                                        className={`
                                            dropdown-option
                                            ${isSelected ? "selected-option" : ""}
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
                <p className="dropdown-error-text mb-0 text-danger">
                    Please select a valid option
                </p>
            )}

        </div>
    );
};

export default CustomFilterDropdown;