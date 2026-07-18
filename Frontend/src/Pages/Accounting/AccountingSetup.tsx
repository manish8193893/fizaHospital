import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import Header from "../../GlobalHelpers/Header";
import Stepper from "../../Components/Stepper/Stepper";

import CustomFormDropdown from "../../GlobalHelpers/CustomFormDropdown";
import type { DropdownOption } from "../../GlobalHelpers/CustomFormDropdown";

import styles from "../../styles/AccountingSetup.module.css"
import TinyEditor from "../../Components/TinyEditor";

export default function AccountingSetup() {

    /******************************************************
        Name : Manish Kumar
        Date : 24/05/2026
        Purpose : Step names
    **************************************************************/
    const steps = [
        "Accounting Setup",
        "Shareholders",
        "Asstes",
        "Liabilities",
        "Revenue Categories",
        "Expense Categories",
        "Review & Finish",
    ];

    /******************************************************
        Name : Manish Kumar
        Date : 24/05/2026
        Purpose : Current active step
    **************************************************************/
    const [currentStep, setCurrentStep] = useState(0);

    /******************************************************
        Name : Manish Kumar
        Date : 24/05/2026
        Purpose : Highest visited step
    **************************************************************/
    const [highestVisitedStep, setHighestVisitedStep] = useState(0);

    /******************************************************
        Name : Manish Kumar
        Date : 24/05/2026
        Purpose : Selected status type
    **************************************************************/
    const [selectedStatusType, setSelectedStatusType] = useState<DropdownOption | null>(null);

    /******************************************************
        Name : Manish Kumar
        Date : 24/05/2026
        Purpose : Selected asset type
    **************************************************************/
    const [selectedAssetType, setSelectedAssetType] = useState<DropdownOption | null>(null);

    /******************************************************
        Name : Manish Kumar
        Date : 24/05/2026
        Purpose : Handle step click
    **************************************************************/
    const handleStepClick = (step: number) => {
        if (step <= highestVisitedStep) {
            setCurrentStep(step);
        }
    };

    /******************************************************
        Name : Manish Kumar
        Date : 24/05/2026
        Purpose : Handle next step
    **************************************************************/
    const handleNext = () => {
        if (currentStep < steps.length - 1) {
            const nextStep = currentStep + 1;

            setCurrentStep(nextStep);

            if (nextStep > highestVisitedStep) {
                setHighestVisitedStep(nextStep);
            }
        }
    };

    /******************************************************
        Name : Manish Kumar
        Date : 24/05/2026
        Purpose : Handle back step
    **************************************************************/
    const handleBack = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    /******************************************************
        Name : Manish Kumar
        Date : 24/05/2026
        Purpose : Handle finish - reset all stepper steps and move to step 1
    **************************************************************/
    const handleFinish = () => {
        setCurrentStep(0);
        setHighestVisitedStep(0);
    };

    /******************************************************
        Name : Manish Kumar
        Date : 24/05/2026
        Purpose : Asset type dropdown options
    **************************************************************/
    const AssetTypeOptions: DropdownOption[] = [
        { id: "1", name: "Building", },
        { id: "2", name: "Medical Equipment", },
        { id: "3", name: "Furniture", },
        { id: "4", name: "Vehicle", },
    ];

    const StatusTypeOptions: DropdownOption[] = [
        { id: "1", name: "Active", },
        { id: "2", name: "In-Active", },
    ];

    /******************************************************
    Name : Manish Kumar
    Date : 24/05/2026
    Purpose : Liability type dropdown options
**************************************************************/
    const LiabilityTypeOptions: DropdownOption[] = [
        { id: "1", name: "Loan", },
        { id: "2", name: "Tax", },
        { id: "3", name: "Vendor Payment", },
        { id: "4", name: "Insurance", },
    ];

    /******************************************************
        Name : Manish Kumar
        Date : 24/05/2026
        Purpose : Payment method dropdown options
    **************************************************************/
    const PaymentMethodOptions: DropdownOption[] = [
        { id: "1", name: "Cash", },
        { id: "2", name: "Bank Transfer", },
        { id: "3", name: "Cheque", },
        { id: "4", name: "UPI", },
    ];

    /******************************************************
        Name : Manish Kumar
        Date : 24/05/2026
        Purpose : Selected liability type
    **************************************************************/
    const [selectedLiabilityType, setSelectedLiabilityType,] = useState<DropdownOption | null>(null);

    /******************************************************
        Name : Manish Kumar
        Date : 24/05/2026
        Purpose : Selected payment method
    **************************************************************/
    const [selectedPaymentMethod, setSelectedPaymentMethod,] = useState<DropdownOption | null>(null);

    /******************************************************
        Name : Manish Kumar
        Date : 24/05/2026
        Purpose : Expense type dropdown options
    **************************************************************/
    const ExpenseTypeOptions: DropdownOption[] = [
        { id: "1", name: "Salaries", },
        { id: "2", name: "Doctor Fees", },
        { id: "3", name: "Nursing Wages", },
        { id: "4", name: "Fuel", },
        { id: "5", name: "Water", },
        { id: "6", name: "Electricity", },
    ];

    /******************************************************
        Name : Manish Kumar
        Date : 24/05/2026
        Purpose : Fixed variable dropdown options
    **************************************************************/
    const FixedVariableOptions: DropdownOption[] = [
        { id: "1", name: "Fixed", },
        { id: "2", name: "Variable", },
    ];

    /******************************************************
        Name : Manish Kumar
        Date : 24/05/2026
        Purpose : Selected expense type
    **************************************************************/
    const [selectedExpenseType, setSelectedExpenseType,] = useState<DropdownOption | null>(null);

    /******************************************************
        Name : Manish Kumar
        Date : 24/05/2026
        Purpose : Selected fixed variable type
    **************************************************************/
    const [selectedFixedVariable, setSelectedFixedVariable,] = useState<DropdownOption | null>(null);

    /******************************************************
        Name : Manish Kumar
        Date : 25/05/2026
        Purpose : Declare the seprate states for all the ediotos.
    **************************************************************/
    const [accountingNotes, setAccountingNotes] = useState("");
    const [shareholderNotes, setShareholderNotes] = useState("");
    const [assetNotes, setAssetNotes] = useState("");
    const [liabilityNotes, setLiabilityNotes] = useState("");
    const [revenueNotes, setRevenueNotes] = useState("");
    const [expenseNotes, setExpenseNotes] = useState("");


    /******************************************************
        Name : Manish Kumar
        Date : 24/05/2026
        Purpose : Animation variants
    **************************************************************/
    const pageVariants = {
        initial: {
            opacity: 0,
            x: 50,
        },

        animate: {
            opacity: 1,
            x: 0,
        },

        exit: {
            opacity: 0,
            x: -50,
        },
    };

    return (
        <div className="container-fluid p-3">

            {/* Header */}
            <Header
                heading="Accounting Setup"
            />

            <div className={`${styles.stepperSection} mt-4`}>
                <Stepper
                    steps={steps}
                    currentStep={currentStep}
                    highestVisitedStep={highestVisitedStep}
                    onStepClick={handleStepClick}
                />
            </div>

            <div className={`${styles.contentSection} py-3 px-5`}>
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentStep}
                        variants={pageVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        transition={{
                            duration: 0.4,
                        }}
                    >
                        {/* Step 1 */}
                        {currentStep === 0 && (
                            <div className={`${styles.hospitalInfoContainer}`}>

                                {/* TOP HEADING */}
                                <div className={`${styles.hospitalInfoHeader} mb-4`}>
                                    <h1 className={styles.formTitle}>
                                        Accounting Setup
                                    </h1>
                                </div>

                                {/* MAIN CONTENT */}
                                <div className={`${styles.hospitalInfoContent}`}>

                                    {/* Capital Information Form */}
                                    <form autoComplete="off">

                                        {/* ROW 1 */}
                                        <div className={styles.formRow}>

                                            {/* Total Capital */}
                                            <div className={styles.formGroup}>
                                                <label className={styles.customLabel}>
                                                    Total Capital <span className='text-danger'>*</span>
                                                </label>

                                                <div className={styles.inputWrapper}>
                                                    <input
                                                        type="text"
                                                        className={styles.customInput}
                                                        placeholder="Enter total capital"
                                                    />

                                                    <i className="ri-money-dollar-circle-line"></i>
                                                </div>
                                            </div>

                                            {/* Paid-up Capital */}
                                            <div className={styles.formGroup}>
                                                <label className={styles.customLabel}>
                                                    Paid-up Capital <span className='text-danger'>*</span>
                                                </label>

                                                <div className={styles.inputWrapper}>
                                                    <input
                                                        type="text"
                                                        className={styles.customInput}
                                                        placeholder="Enter paid-up capital"
                                                    />

                                                    <i className="ri-bank-card-line"></i>
                                                </div>
                                            </div>
                                        </div>

                                        {/* ROW 2 */}
                                        <div className={styles.formRow}>

                                            {/* Capital Registration Date */}
                                            {/* Capital Registration Date */}
                                            <div className={styles.formGroup}>
                                                <label className={styles.customLabel}>
                                                    Capital Registration Date <span className='text-danger'>*</span>
                                                </label>

                                                <div className={styles.inputWrapper}>

                                                    <input
                                                        type="date"
                                                        className={styles.customInput}
                                                        id="capitalRegistrationDate"
                                                    />

                                                    <i
                                                        className={`ri-calendar-event-line ${styles.dateIcon}`}
                                                        onClick={() => {

                                                            const input =
                                                                document.getElementById(
                                                                    "capitalRegistrationDate"
                                                                ) as HTMLInputElement;

                                                            input?.showPicker?.();
                                                            input?.focus();
                                                        }}
                                                    ></i>
                                                </div>
                                            </div>

                                            {/* Capital Source */}
                                            <div className={styles.formGroup}>
                                                <label className={styles.customLabel}>
                                                    Capital Source <span className='text-danger'>*</span>
                                                </label>

                                                <div className={styles.inputWrapper}>
                                                    <input
                                                        type="text"
                                                        className={styles.customInput}
                                                        placeholder="Enter capital source"
                                                    />

                                                    <i className="ri-building-4-line"></i>
                                                </div>
                                            </div>
                                        </div>

                                        {/* ROW 3 */}
                                        <div className={styles.formRow}>

                                            {/* Notes */}
                                            <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                                                <label className={styles.customLabel}>
                                                    Notes
                                                </label>

                                                <div className={styles.inputWrapper}>
                                                    {/* <textarea
                                                        className={styles.customTextarea}
                                                        placeholder="Enter notes..."
                                                    ></textarea>

                                                    <i className={`ri-sticky-note-line ${styles.textareaIcon}`}></i> */}
                                                    <TinyEditor
                                                        value={accountingNotes}
                                                        onChange={setAccountingNotes}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        {/* BUTTON */}
                                        <div className={`${styles.buttonWrapper}`}>
                                            <button
                                                type="button"
                                                className={`${styles.nextBtn} col-md-8`}
                                                onClick={handleNext}
                                            >
                                                Save & Continue
                                            </button>
                                        </div>

                                    </form>

                                </div>
                            </div>
                        )}

                        {/* Step 2 */}
                        {currentStep === 1 && (
                            <div className={`${styles.hospitalInfoContainer}`}>

                                {/* TOP HEADING */}
                                <div className={`${styles.hospitalInfoHeader} mb-4`}>
                                    <h1 className={styles.formTitle}>
                                        Shareholders
                                    </h1>
                                </div>

                                {/* MAIN CONTENT */}
                                <div className={`${styles.hospitalInfoContent}`}>

                                    {/* Shareholder Information Form */}
                                    <form>

                                        {/* ROW 1 */}
                                        <div className={styles.formRow}>

                                            {/* Shareholder Name */}
                                            <div className={styles.formGroup}>
                                                <label className={styles.customLabel}>
                                                    Shareholder Name <span className='text-danger'>*</span>
                                                </label>

                                                <div className={styles.inputWrapper}>
                                                    <input
                                                        type="text"
                                                        className={styles.customInput}
                                                        placeholder="Enter shareholder name"
                                                    />

                                                    <i className="ri-user-3-line"></i>
                                                </div>
                                            </div>

                                            {/* Ownership Percentage */}
                                            <div className={styles.formGroup}>
                                                <label className={styles.customLabel}>
                                                    Ownership Percentage <span className='text-danger'>*</span>
                                                </label>

                                                <div className={styles.inputWrapper}>
                                                    <input
                                                        type="text"
                                                        className={styles.customInput}
                                                        placeholder="Enter ownership percentage"
                                                    />

                                                    <i className="ri-percent-line"></i>
                                                </div>
                                            </div>
                                        </div>

                                        {/* ROW 2 */}
                                        <div className={styles.formRow}>

                                            {/* Contribution Amount */}
                                            <div className={styles.formGroup}>
                                                <label className={styles.customLabel}>
                                                    Contribution Amount <span className='text-danger'>*</span>
                                                </label>

                                                <div className={styles.inputWrapper}>
                                                    <input
                                                        type="text"
                                                        className={styles.customInput}
                                                        placeholder="Enter contribution amount"
                                                    />

                                                    <i className="ri-money-dollar-circle-line"></i>
                                                </div>
                                            </div>

                                            {/* Phone Number */}
                                            <div className={styles.formGroup}>
                                                <label className={styles.customLabel}>
                                                    Phone Number <span className='text-danger'>*</span>
                                                </label>

                                                <div className={styles.inputWrapper}>
                                                    <input
                                                        type="text"
                                                        className={styles.customInput}
                                                        placeholder="Enter phone number"
                                                    />

                                                    <i className="ri-phone-line"></i>
                                                </div>
                                            </div>
                                        </div>

                                        {/* ROW 3 */}
                                        <div className={styles.formRow}>

                                            {/* Email */}
                                            <div className={styles.formGroup}>
                                                <label className={styles.customLabel}>
                                                    Email <span className='text-danger'>*</span>
                                                </label>

                                                <div className={styles.inputWrapper}>
                                                    <input
                                                        type="email"
                                                        className={styles.customInput}
                                                        placeholder="Enter email"
                                                    />

                                                    <i className="ri-mail-line"></i>
                                                </div>
                                            </div>

                                            {/* Join Date */}
                                            <div className={styles.formGroup}>
                                                <label className={styles.customLabel}>
                                                    Join Date <span className='text-danger'>*</span>
                                                </label>

                                                <div className={styles.inputWrapper}>

                                                    <input
                                                        type="date"
                                                        className={styles.customInput}
                                                        id="shareholderJoinDate"
                                                    />

                                                    <i
                                                        className={`ri-calendar-event-line ${styles.dateIcon}`}
                                                        onClick={() => {

                                                            const input =
                                                                document.getElementById(
                                                                    "shareholderJoinDate"
                                                                ) as HTMLInputElement;

                                                            input?.showPicker?.();
                                                            input?.focus();
                                                        }}
                                                    ></i>
                                                </div>
                                            </div>
                                        </div>

                                        {/* ROW 4 */}
                                        <div className={styles.formRow}>

                                            {/* Notes */}
                                            <div
                                                className={`${styles.formGroup} ${styles.fullWidth}`}
                                            >
                                                <label className={styles.customLabel}>
                                                    Notes
                                                </label>

                                                <div className={styles.inputWrapper}>
                                                    <TinyEditor
                                                        value={shareholderNotes}
                                                        onChange={setShareholderNotes}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        {/* BUTTONS */}
                                        <div className={styles.multiButtonWrapper}>

                                            {/* Go Back */}
                                            <button
                                                type="button"
                                                className={`${styles.nextBtn} col-md-2`}
                                                onClick={handleBack}
                                            >
                                                Go Back
                                            </button>

                                            {/* Save & Add New */}
                                            <button
                                                type="button"
                                                className={`${styles.outlineBtn} col-md-3`}
                                            >
                                                Save & Add New
                                            </button>

                                            {/* Save & Continue */}
                                            <button
                                                type="button"
                                                className={`${styles.nextBtn} col-md-6`}
                                                onClick={handleNext}
                                            >
                                                Save & Continue
                                            </button>
                                        </div>

                                    </form>

                                </div>
                            </div>
                        )}

                        {/* Step 3 */}
                        {currentStep === 2 && (
                            <div className={`${styles.hospitalInfoContainer}`}>

                                {/* TOP HEADING */}
                                <div className={`${styles.hospitalInfoHeader} mb-4`}>
                                    <h1 className={styles.formTitle}>
                                        Asset
                                    </h1>
                                </div>

                                {/* MAIN CONTENT */}
                                <div className={`${styles.hospitalInfoContent}`}>

                                    {/* Asset Information Form */}
                                    <form>

                                        {/* ROW 1 */}
                                        <div className={styles.formRow}>

                                            {/* Asset Name */}
                                            <div className={styles.formGroup}>
                                                <label className={styles.customLabel}>
                                                    Asset Name <span className='text-danger'>*</span>
                                                </label>

                                                <div className={styles.inputWrapper}>
                                                    <input
                                                        type="text"
                                                        className={styles.customInput}
                                                        placeholder="Enter asset name"
                                                    />

                                                    <i className="ri-building-line"></i>
                                                </div>
                                            </div>

                                            {/* Asset Type */}
                                            <div className={styles.formGroup}>
                                                <label className={styles.customLabel}>
                                                    Asset Type <span className='text-danger'>*</span>
                                                </label>

                                                <CustomFormDropdown
                                                    options={AssetTypeOptions}
                                                    value={selectedAssetType}
                                                    onChange={(value) =>
                                                        setSelectedAssetType(value)
                                                    }
                                                    placeholder="Select Asset Type"
                                                    required={true}
                                                />
                                            </div>
                                        </div>

                                        {/* ROW 2 */}
                                        <div className={styles.formRow}>

                                            {/* Estimated Value */}
                                            <div className={styles.formGroup}>
                                                <label className={styles.customLabel}>
                                                    Estimated Value <span className='text-danger'>*</span>
                                                </label>

                                                <div className={styles.inputWrapper}>
                                                    <input
                                                        type="text"
                                                        className={styles.customInput}
                                                        placeholder="Enter estimated value"
                                                    />

                                                    <i className="ri-money-dollar-circle-line"></i>
                                                </div>
                                            </div>

                                            {/* Added Date */}
                                            <div className={styles.formGroup}>
                                                <label className={styles.customLabel}>
                                                    Added Date <span className='text-danger'>*</span>
                                                </label>

                                                <div className={styles.inputWrapper}>

                                                    <input
                                                        type="date"
                                                        className={styles.customInput}
                                                        id="assetAddedDate"
                                                    />

                                                    <i
                                                        className={`ri-calendar-event-line ${styles.dateIcon}`}
                                                        onClick={() => {

                                                            const input =
                                                                document.getElementById(
                                                                    "assetAddedDate"
                                                                ) as HTMLInputElement;

                                                            input?.showPicker?.();
                                                            input?.focus();
                                                        }}
                                                    ></i>
                                                </div>
                                            </div>
                                        </div>

                                        {/* ROW 3 */}
                                        <div className={styles.formRow}>

                                            {/* Location */}
                                            <div className={styles.formGroup}>
                                                <label className={styles.customLabel}>
                                                    Location <span className='text-danger'>*</span>
                                                </label>

                                                <div className={styles.inputWrapper}>
                                                    <input
                                                        type="text"
                                                        className={styles.customInput}
                                                        placeholder="Enter location"
                                                    />

                                                    <i className="ri-map-pin-line"></i>
                                                </div>
                                            </div>

                                            {/* Status */}
                                            <div className={styles.formGroup}>
                                                <label className={styles.customLabel}>
                                                    Status <span className='text-danger'>*</span>
                                                </label>

                                                <CustomFormDropdown
                                                    options={StatusTypeOptions}
                                                    value={selectedStatusType}
                                                    onChange={(value) =>
                                                        setSelectedStatusType(value)
                                                    }
                                                    placeholder="Select Status"
                                                    required={true}
                                                />
                                            </div>
                                        </div>

                                        {/* ROW 4 */}
                                        <div className={styles.formRow}>

                                            {/* Notes */}
                                            <div
                                                className={`${styles.formGroup} ${styles.fullWidth}`}
                                            >
                                                <label className={styles.customLabel}>
                                                    Notes
                                                </label>

                                                <div className={styles.inputWrapper}>
                                                    <TinyEditor
                                                        value={assetNotes}
                                                        onChange={setAssetNotes}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        {/* BUTTONS */}
                                        <div className={styles.multiButtonWrapper}>

                                            {/* Go Back */}
                                            <button
                                                type="button"
                                                className={`${styles.nextBtn} col-md-2`}
                                                onClick={handleBack}
                                            >
                                                Go Back
                                            </button>

                                            {/* Save & Add New */}
                                            <button
                                                type="button"
                                                className={`${styles.outlineBtn} col-md-3`}
                                            >
                                                Save & Add New
                                            </button>

                                            {/* Save & Continue */}
                                            <button
                                                type="button"
                                                className={`${styles.nextBtn} col-md-6`}
                                                onClick={handleNext}
                                            >
                                                Save & Continue
                                            </button>
                                        </div>

                                    </form>

                                </div>
                            </div>
                        )}

                        {/* Step 4 */}
                        {currentStep === 3 && (
                            <div className={`${styles.hospitalInfoContainer}`}>

                                {/* TOP HEADING */}
                                <div className={`${styles.hospitalInfoHeader} mb-4`}>
                                    <h1 className={styles.formTitle}>
                                        Liabilities
                                    </h1>
                                </div>

                                {/* MAIN CONTENT */}
                                <div className={`${styles.hospitalInfoContent}`}>

                                    <form>

                                        {/* ROW 1 */}
                                        <div className={styles.formRow}>

                                            {/* Liability Name */}
                                            <div className={styles.formGroup}>
                                                <label className={styles.customLabel}>
                                                    Liability Name <span className='text-danger'>*</span>
                                                </label>

                                                <div className={styles.inputWrapper}>
                                                    <input
                                                        type="text"
                                                        className={styles.customInput}
                                                        placeholder="Enter liability name"
                                                    />

                                                    <i className="ri-file-warning-line"></i>
                                                </div>
                                            </div>

                                            {/* Liability Type */}
                                            <div className={styles.formGroup}>
                                                <label className={styles.customLabel}>
                                                    Liability Type <span className='text-danger'>*</span>
                                                </label>

                                                <CustomFormDropdown
                                                    options={LiabilityTypeOptions}
                                                    value={selectedLiabilityType}
                                                    onChange={(value) =>
                                                        setSelectedLiabilityType(value)
                                                    }
                                                    placeholder="Select Liability Type"
                                                    required={true}
                                                />
                                            </div>
                                        </div>

                                        {/* ROW 2 */}
                                        <div className={styles.formRow}>

                                            {/* Creditor Name */}
                                            <div className={styles.formGroup}>
                                                <label className={styles.customLabel}>
                                                    Creditor Name <span className='text-danger'>*</span>
                                                </label>

                                                <div className={styles.inputWrapper}>
                                                    <input
                                                        type="text"
                                                        className={styles.customInput}
                                                        placeholder="Enter creditor name"
                                                    />

                                                    <i className="ri-user-star-line"></i>
                                                </div>
                                            </div>

                                            {/* Total Amount */}
                                            <div className={styles.formGroup}>
                                                <label className={styles.customLabel}>
                                                    Total Amount <span className='text-danger'>*</span>
                                                </label>

                                                <div className={styles.inputWrapper}>
                                                    <input
                                                        type="text"
                                                        className={styles.customInput}
                                                        placeholder="Enter total amount"
                                                    />

                                                    <i className="ri-money-dollar-circle-line"></i>
                                                </div>
                                            </div>
                                        </div>

                                        {/* ROW 3 */}
                                        <div className={styles.formRow}>

                                            {/* Paid Amount */}
                                            <div className={styles.formGroup}>
                                                <label className={styles.customLabel}>
                                                    Paid Amount <span className='text-danger'>*</span>
                                                </label>

                                                <div className={styles.inputWrapper}>
                                                    <input
                                                        type="text"
                                                        className={styles.customInput}
                                                        placeholder="Enter paid amount"
                                                    />

                                                    <i className="ri-secure-payment-line"></i>
                                                </div>
                                            </div>

                                            {/* Remaining Amount */}
                                            <div className={styles.formGroup}>
                                                <label className={styles.customLabel}>
                                                    Remaining Amount <span className='text-danger'>*</span>
                                                </label>

                                                <div className={styles.inputWrapper}>
                                                    <input
                                                        type="text"
                                                        className={styles.customInput}
                                                        placeholder="Enter remaining amount"
                                                    />

                                                    <i className="ri-wallet-3-line"></i>
                                                </div>
                                            </div>
                                        </div>

                                        {/* ROW 4 */}
                                        <div className={styles.formRow}>

                                            {/* Due Date */}
                                            <div className={styles.formGroup}>
                                                <label className={styles.customLabel}>
                                                    Due Date <span className='text-danger'>*</span>
                                                </label>

                                                <div className={styles.inputWrapper}>

                                                    <input
                                                        type="date"
                                                        className={styles.customInput}
                                                        id="liabilityDueDate"
                                                    />

                                                    <i
                                                        className={`ri-calendar-event-line ${styles.dateIcon}`}
                                                        onClick={() => {

                                                            const input =
                                                                document.getElementById(
                                                                    "liabilityDueDate"
                                                                ) as HTMLInputElement;

                                                            input?.showPicker?.();
                                                            input?.focus();
                                                        }}
                                                    ></i>
                                                </div>
                                            </div>

                                            {/* Payment Method */}
                                            <div className={styles.formGroup}>
                                                <label className={styles.customLabel}>
                                                    Payment Method <span className='text-danger'>*</span>
                                                </label>

                                                <CustomFormDropdown
                                                    options={PaymentMethodOptions}
                                                    value={selectedPaymentMethod}
                                                    onChange={(value) =>
                                                        setSelectedPaymentMethod(value)
                                                    }
                                                    placeholder="Select Payment Method"
                                                    required={true}
                                                />
                                            </div>
                                        </div>

                                        {/* ROW 5 */}
                                        <div className={styles.formRow}>

                                            {/* Notes */}
                                            <div
                                                className={`${styles.formGroup} ${styles.fullWidth}`}
                                            >
                                                <label className={styles.customLabel}>
                                                    Notes
                                                </label>

                                                <div className={styles.inputWrapper}>
                                                    <TinyEditor
                                                        value={liabilityNotes}
                                                        onChange={setLiabilityNotes}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        {/* BUTTONS */}
                                        <div className={styles.multiButtonWrapper}>

                                            {/* Go Back */}
                                            <button
                                                type="button"
                                                className={`${styles.nextBtn} col-md-2`}
                                                onClick={handleBack}
                                            >
                                                Go Back
                                            </button>

                                            {/* Save & Add New */}
                                            <button
                                                type="button"
                                                className={`${styles.outlineBtn} col-md-3`}
                                            >
                                                Save & Add New
                                            </button>

                                            {/* Save & Continue */}
                                            <button
                                                type="button"
                                                className={`${styles.nextBtn} col-md-6`}
                                                onClick={handleNext}
                                            >
                                                Save & Continue
                                            </button>
                                        </div>

                                    </form>

                                </div>
                            </div>
                        )}

                        {/* Step 5 */}
                        {currentStep === 4 && (
                            <div className={`${styles.hospitalInfoContainer}`}>

                                {/* TOP HEADING */}
                                <div className={`${styles.hospitalInfoHeader} mb-4`}>
                                    <h1 className={styles.formTitle}>
                                        Revenue Categories
                                    </h1>
                                </div>

                                {/* MAIN CONTENT */}
                                <div className={`${styles.hospitalInfoContent}`}>

                                    <form>

                                        {/* ROW 1 */}
                                        <div className={styles.formRow}>

                                            {/* Category Name */}
                                            <div className={styles.formGroup}>
                                                <label className={styles.customLabel}>
                                                    Category Name <span className='text-danger'>*</span>
                                                </label>

                                                <div className={styles.inputWrapper}>
                                                    <input
                                                        type="text"
                                                        className={styles.customInput}
                                                        placeholder="Enter category name"
                                                    />

                                                    <i className="ri-price-tag-3-line"></i>
                                                </div>
                                            </div>

                                            {/* Status */}
                                            <div className={styles.formGroup}>
                                                <label className={styles.customLabel}>
                                                    Status <span className='text-danger'>*</span>
                                                </label>

                                                <CustomFormDropdown
                                                    options={StatusTypeOptions}
                                                    value={selectedStatusType}
                                                    onChange={(value) =>
                                                        setSelectedStatusType(value)
                                                    }
                                                    placeholder="Select Status"
                                                    required={true}
                                                />
                                            </div>
                                        </div>

                                        {/* ROW 2 */}
                                        <div className={styles.formRow}>

                                            {/* Notes */}
                                            <div
                                                className={`${styles.formGroup} ${styles.fullWidth}`}
                                            >
                                                <label className={styles.customLabel}>
                                                    Notes
                                                </label>

                                                <div className={styles.inputWrapper}>
                                                    <TinyEditor
                                                        value={revenueNotes}
                                                        onChange={setRevenueNotes}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        {/* BUTTONS */}
                                        <div className={styles.multiButtonWrapper}>

                                            {/* Go Back */}
                                            <button
                                                type="button"
                                                className={`${styles.nextBtn} col-md-2`}
                                                onClick={handleBack}
                                            >
                                                Go Back
                                            </button>

                                            {/* Save & Add New */}
                                            <button
                                                type="button"
                                                className={`${styles.outlineBtn} col-md-3`}
                                            >
                                                Save & Add New
                                            </button>

                                            {/* Save & Continue */}
                                            <button
                                                type="button"
                                                className={`${styles.nextBtn} col-md-6`}
                                                onClick={handleNext}
                                            >
                                                Save & Continue
                                            </button>
                                        </div>

                                    </form>
                                </div>
                            </div >
                        )}

                        {currentStep === 5 && (
                            <div className={`${styles.hospitalInfoContainer}`}>

                                {/* TOP HEADING */}
                                <div className={`${styles.hospitalInfoHeader} mb-4`}>
                                    <h1 className={styles.formTitle}>
                                        Expense Categories
                                    </h1>
                                </div>

                                {/* MAIN CONTENT */}
                                <div className={`${styles.hospitalInfoContent}`}>

                                    <form>

                                        {/* ROW 1 */}
                                        <div className={styles.formRow}>

                                            {/* Category Name */}
                                            <div className={styles.formGroup}>
                                                <label className={styles.customLabel}>
                                                    Category Name <span className='text-danger'>*</span>
                                                </label>

                                                <div className={styles.inputWrapper}>
                                                    <input
                                                        type="text"
                                                        className={styles.customInput}
                                                        placeholder="Enter category name"
                                                    />

                                                    <i className="ri-price-tag-3-line"></i>
                                                </div>
                                            </div>

                                            {/* Expense Type */}
                                            <div className={styles.formGroup}>
                                                <label className={styles.customLabel}>
                                                    Expense Type <span className='text-danger'>*</span>
                                                </label>

                                                <CustomFormDropdown
                                                    options={ExpenseTypeOptions}
                                                    value={selectedExpenseType}
                                                    onChange={(value) =>
                                                        setSelectedExpenseType(value)
                                                    }
                                                    placeholder="Select Expense Type"
                                                    required={true}
                                                />
                                            </div>
                                        </div>

                                        {/* ROW 2 */}
                                        <div className={styles.formRow}>

                                            {/* Fixed / Variable */}
                                            <div className={styles.formGroup}>
                                                <label className={styles.customLabel}>
                                                    Fixed / Variable <span className='text-danger'>*</span>
                                                </label>

                                                <CustomFormDropdown
                                                    options={FixedVariableOptions}
                                                    value={selectedFixedVariable}
                                                    onChange={(value) =>
                                                        setSelectedFixedVariable(value)
                                                    }
                                                    placeholder="Select Type"
                                                    required={true}
                                                />
                                            </div>

                                            {/* Status */}
                                            <div className={styles.formGroup}>
                                                <label className={styles.customLabel}>
                                                    Status <span className='text-danger'>*</span>
                                                </label>

                                                <CustomFormDropdown
                                                    options={StatusTypeOptions}
                                                    value={selectedStatusType}
                                                    onChange={(value) =>
                                                        setSelectedStatusType(value)
                                                    }
                                                    placeholder="Select Status"
                                                    required={true}
                                                />
                                            </div>
                                        </div>

                                        {/* ROW 3 */}
                                        <div className={styles.formRow}>

                                            {/* Notes */}
                                            <div
                                                className={`${styles.formGroup} ${styles.fullWidth}`}
                                            >
                                                <label className={styles.customLabel}>
                                                    Notes
                                                </label>

                                                <div className={styles.inputWrapper}>
                                                    <TinyEditor
                                                        value={expenseNotes}
                                                        onChange={setExpenseNotes}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        {/* BUTTONS */}
                                        <div className={styles.multiButtonWrapper}>

                                            {/* Go Back */}
                                            <button
                                                type="button"
                                                className={`${styles.nextBtn} col-md-2`}
                                                onClick={handleBack}
                                            >
                                                Go Back
                                            </button>

                                            {/* Save & Add New */}
                                            <button
                                                type="button"
                                                className={`${styles.outlineBtn} col-md-3`}
                                            >
                                                Save & Add New
                                            </button>

                                            {/* Save & Continue */}
                                            <button
                                                type="button"
                                                className={`${styles.nextBtn} col-md-6`}
                                                onClick={handleNext}
                                            >
                                                Save & Continue
                                            </button>
                                        </div>

                                    </form>
                                </div>
                            </div >
                        )}

                        {/* Step 6 */}
                        {
                            currentStep === 6 && (
                                <div className={`${styles.hospitalInfoContainer}`}>

                                    {/* TOP HEADING */}
                                    <div className={`${styles.hospitalInfoHeader} mb-4`}>
                                        <h1 className={styles.formTitle}>
                                            Review & Finish
                                        </h1>

                                        <p className={`${styles.formSubtitle} mb-0`}>
                                            Complete the Accounting Setup.
                                        </p>
                                    </div>

                                    {/* MAIN CONTENT */}
                                    <div className={`${styles.hospitalInfoContent}`}>

                                        {/* TOP CONTENT SECTION */}
                                        <div className={styles.finishContentWrapper}>

                                            {/* IMAGE */}
                                            <img src="/Assets/Icons/Congratulations.svg" alt="Congratulations" className={styles.finishImage} />

                                            {/* HEADING */}
                                            <h1 className={styles.finishHeading}>
                                                Setup Completed Successfully
                                            </h1>

                                            {/* PARAGRAPH */}
                                            <p className={`${styles.finishParagraph} mb-0`}>
                                                You can update these settings anytime from Accounting.
                                            </p>

                                        </div>

                                        {/* FORM */}
                                        <form autoComplete="off">
                                            {/* BUTTONS */}
                                            <div className={`d-flex justify-content-center gap-3`}>

                                                <button
                                                    type="button"
                                                    className={`${styles.finishOutlineBtn} col-md-3`}
                                                    onClick={handleBack}
                                                >
                                                    BACK
                                                </button>

                                                <button
                                                    type="button"
                                                    className={`${styles.finishNextBtn} col-md-5`}
                                                    onClick={handleFinish}
                                                >
                                                    CONTINUE
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div >
                            )}
                    </motion.div >
                </AnimatePresence >
            </div >

        </div >
    )
}
