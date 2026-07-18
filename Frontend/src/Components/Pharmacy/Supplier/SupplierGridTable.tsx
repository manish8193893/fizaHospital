import { useEffect, useMemo, useRef, useState } from "react";
import * as bootstrap from "bootstrap";

import Pagination from "../../../GlobalHelpers/Pagination";
import CustomFilterDropdown from "../../../GlobalHelpers/CustomFilterDropdown";
import type { DropdownOption } from "../../../GlobalHelpers/CustomFormDropdown";
import GlobalGridTable, { type ColumnActionRow } from "../../../GlobalHelpers/GlobalGridTable";




import "../../../styles/HumanResource.css";

interface SupplierTableData {
    id: string;
    supplierName: string;
    contactPerson: string;
    phone: string;
    email: string;
    address: string;
    lastPurchase: string;
    status: "Active" | "In-Active";
}

export default function SupplierGridTable() {

    const [globalSearch, setGlobalSearch] = useState("");

    const [selectedSupplier, setSelectedSupplier] = useState<DropdownOption | null>(null);
    const [selectedStatus, setSelectedStatus] = useState<DropdownOption | null>(null);
    const calendarRef = useRef<HTMLDivElement>(null);
    const [showCalendar, setShowCalendar] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const navigate = useNavigate();

    const [showModal, setShowModal] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    const ALL_SUPPLIER_DATA: SupplierTableData[] = [
        {
            id: "S001",
            supplierName: "Rahul Sharma",
            contactPerson: "Rahul Sharma",
            phone: "9876543210",
            email: "rahul.sharma@gmail.com",
            address: "Delhi",
            lastPurchase: "2026/06/18",
            status: "Active",
        },
        {
            id: "S002",
            supplierName: "Amit Verma",
            contactPerson: "Amit Verma",
            phone: "9123456780",
            email: "amit.verma@gmail.com",
            address: "Noida",
            lastPurchase: "2026/06/15",
            status: "In-Active",
        },
        {
            id: "S003",
            supplierName: "Neha Gupta",
            contactPerson: "Neha Gupta",
            phone: "9988776655",
            email: "neha.gupta@gmail.com",
            address: "Ghaziabad",
            lastPurchase: "2026/06/12",
            status: "Active",
        },
        {
            id: "S004",
            supplierName: "Sandeep Kumar",
            contactPerson: "Sandeep Kumar",
            phone: "9012345678",
            email: "sandeep.kumar@gmail.com",
            address: "Lucknow",
            lastPurchase: "2026/06/10",
            status: "Active",
        },
        {
            id: "S005",
            supplierName: "Priya Singh",
            contactPerson: "Priya Singh",
            phone: "8899001122",
            email: "priya.singh@gmail.com",
            address: "Kanpur",
            lastPurchase: "2026/06/08",
            status: "In-Active",
        },
        {
            id: "S006",
            supplierName: "Vikas Yadav",
            contactPerson: "Vikas Yadav",
            phone: "7788990011",
            email: "vikas.yadav@gmail.com",
            address: "Agra",
            lastPurchase: "2026/06/05",
            status: "Active",
        },
        {
            id: "S007",
            supplierName: "Anjali Mehta",
            contactPerson: "Anjali Mehta",
            phone: "6677889900",
            email: "anjali.mehta@gmail.com",
            address: "Meerut",
            lastPurchase: "2026/06/03",
            status: "Active",
        },
        {
            id: "S008",
            supplierName: "Rohit Jain",
            contactPerson: "Rohit Jain",
            phone: "5566778899",
            email: "rohit.jain@gmail.com",
            address: "Delhi NCR",
            lastPurchase: "2026/06/01",
            status: "In-Active",
        },
    ];

    const supplierOptions: DropdownOption[] = [
        { id: "abc", name: "ABC Pharma" },
        { id: "medico", name: "Medico Supplies" },
    ];

    const statusOptions: DropdownOption[] = [
        { id: "active", name: "Active" },
        { id: "inactive", name: "InActive" },
    ];

    const filteredData = useMemo(() => {

        return ALL_SUPPLIER_DATA.filter((item) => {

            const search = globalSearch.toLowerCase();

            const matchesSearch =
                item.id.toLowerCase().includes(search) ||
                item.supplierName.toLowerCase().includes(search) ||
                item.contactPerson.toLowerCase().includes(search) ||
                item.phone.toLowerCase().includes(search) ||
                item.email.toLowerCase().includes(search);

            const matchesSupplier =
                !selectedSupplier ||
                item.supplierName.toLowerCase() === selectedSupplier.name.toLowerCase();

            const matchesStatus =
                !selectedStatus ||
                item.status.toLowerCase() === selectedStatus.name.toLowerCase();

            let matchesDate = true;

            if (selectedDate) {
                const selected = new Date(selectedDate);

                const formattedSelected =
                    `${selected.getFullYear()}/${String(selected.getMonth() + 1).padStart(2, "0")}/${String(
                        selected.getDate()
                    ).padStart(2, "0")}`;

                matchesDate = item.lastPurchase === formattedSelected;
            }

            return matchesSearch && matchesSupplier && matchesStatus && matchesDate;
        });

    }, [globalSearch, selectedSupplier, selectedStatus, selectedDate]);

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    const visibleData = useMemo(() => {

        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;

        return filteredData.slice(start, end);

    }, [filteredData, currentPage, itemsPerPage]);

    useEffect(() => {

        const tooltips = document.querySelectorAll('[data-bs-toggle="tooltip"]');

        tooltips.forEach((el) => new bootstrap.Tooltip(el));

        return () => {
            tooltips.forEach((el) => {
                const t = bootstrap.Tooltip.getInstance(el);
                if (t) t.dispose();
            });
        };

    }, [visibleData]);

    const columns: ColumnActionRow<SupplierTableData>[] = [
        { key: "supplierName", header: "Supplier Name", sortable: true, icon: <img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="SquareSortVertical" width={14} height={14} /> },
        { key: "contactPerson", header: "Contact Person", sortable: true, icon: <img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="SquareSortVertical" width={14} height={14} /> },
        { key: "phone", header: "Phone No", sortable: true, icon: <img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="SquareSortVertical" width={14} height={14} /> },
        { key: "email", header: "Email", sortable: true, icon: <img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="SquareSortVertical" width={14} height={14} /> },
        { key: "address", header: "Address" },
        { key: "lastPurchase", header: "Last Purchase", sortable: true, icon: <img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="SquareSortVertical" width={14} height={14} /> },
        {
            key: "status",
            header: "Status",
            render: (row) => (
                <span className={row.status === "Active" ? "status-completed" : "status-cancelled"}>
                    {row.status}
                </span>
            ),
        },
        {
            key: "action",
            header: "Action",
            render: (row) => (
                <div className="d-flex gap-2 justify-content-center">
                    <button className="eye" data-bs-toggle="tooltip" title="View" onClick={() => {console.log(row.id), navigate("/pharmacy/Suppliers/SupplierDetails")}}>
                        <i className="ri-eye-line fs-18"></i>
                    </button>
                    <button className="edit" data-bs-toggle="tooltip" title="Edit">
                        <i className="ri-pencil-ai-line fs-18"></i>
                    </button>
                    <button className="delete" data-bs-toggle="tooltip" title="Delete">
                        <i className="ri-delete-bin-7-line fs-18"></i>
                    </button>
                </div>
            ),
        },
    ];

    /********************************************
      Name : Manish Kumar
      Date : 09/06/2026
      Purpose : Close Calendar
    *********************************************/
    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            if (
                calendarRef.current &&
                !calendarRef.current.contains(event.target as Node)
            ) {
                setShowCalendar(false);
            }
        };

        document.addEventListener("mousedown", handleOutsideClick);

        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, []);

    const handleDateSelect = (date: Date) => {
        setSelectedDate(date);
        setCurrentPage(1);
        setShowCalendar(false);
    };

    const handleReset = () => {
        setGlobalSearch("");
        setSelectedSupplier(null);
        setSelectedStatus(null);
        setSelectedDate(null);
        setCurrentPage(1);
    };

    return (
        <>
            {/* HEADER */}
            <div className="d-flex justify-content-between align-items-center my-4">
                <p className="fs-18 fw-500">Supplier</p>

                <div className="Plus-btn" onClick={() => setShowModal(true)}>
                    <div className="text-white">New Supplier</div>
                    <img src="/Assets/Icons/WhitePlusCircle.svg" alt="WhitePlusCircle" width={22} height={22} />
                </div>
            </div>

            {/* FILTER ROW */}
            <div className="aph-modal-filter-row mb-4">

                <div className="aph-filter-search">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="aph-search-input"
                        value={globalSearch}
                        onChange={(e) => {
                            setGlobalSearch(e.target.value);
                            setCurrentPage(1);
                        }}
                    />
                    <button className="aph-search-btn outline-0">
                        <i className="ri-search-line"></i>
                    </button>
                </div>

                <div>
                    <CustomFilterDropdown
                        options={supplierOptions}
                        customClass="aph-filter-dropdown"
                        value={selectedSupplier}
                        placeholder="Supplier"
                        onChange={(v) => {
                            setSelectedSupplier(v);
                            setCurrentPage(1);
                        }}
                    />
                </div>

                <div>
                    <CustomFilterDropdown
                        options={statusOptions}
                        value={selectedStatus}
                        customClass="aph-filter-dropdown"
                        placeholder="Status"
                        onChange={(v) => {
                            setSelectedStatus(v);
                            setCurrentPage(1);
                        }}
                    />
                </div>

                <div
                    className="aph-calendar-filter"
                    ref={calendarRef}
                >

                    <button
                        className="aph-filter-btn outline-0"
                        onClick={() =>
                            setShowCalendar(
                                !showCalendar
                            )
                        }
                    >
                        <i className="ri-calendar-line"></i>

                        <span>
                            {selectedDate
                                ? `${String(
                                    selectedDate.getDate()
                                ).padStart(
                                    2,
                                    "0"
                                )}/${String(
                                    selectedDate.getMonth() +
                                    1
                                ).padStart(
                                    2,
                                    "0"
                                )}/${selectedDate.getFullYear()}`
                                : "Date"}
                        </span>

                    </button>

                    {showCalendar && (
                        <div className="aph-calendar-popup">
                            <DateFilterCalendar
                                selectedDate={
                                    selectedDate
                                }
                                onDateSelect={
                                    handleDateSelect
                                }
                            />
                        </div>
                    )}

                </div>

                <button
                    className="aph-filter-btn outline-0"
                    onClick={handleReset}
                >
                    <i className="ri-filter-off-line"></i>
                </button>

            </div>

            {/* TABLE */}
            <div className="d-flex flex-column">
                <GlobalGridTable
                    data={visibleData}
                    columns={columns}
                    currentPage={currentPage}
                    pageSize={itemsPerPage}
                />

                <Pagination
                    totalPages={totalPages}
                    currentPage={currentPage}
                    onPageChange={setCurrentPage}
                    rowsPerPage={itemsPerPage}
                    onRowsPerPageChange={(r) => {
                        setItemsPerPage(r);
                        setCurrentPage(1);
                    }}
                />
            </div>

            <SupplierModal
                show={showModal}
                handleClose={() => setShowModal(false)}
            />
        </>
    );
}


import { Modal } from "react-bootstrap";

import CustomFormDropdown from "../../../GlobalHelpers/CustomFormDropdown";
import DateFilterCalendar from "../../../GlobalHelpers/DateFilterCalendar";
import { useNavigate } from "react-router-dom";

/********************************************
    Name : Manish Kumar
    Date : 21/06/2026
    Purpose : Supplier Modal
*********************************************/

interface SupplierModalProps {
    show: boolean;
    handleClose: () => void;
}

export function SupplierModal({ show, handleClose }: SupplierModalProps) {

    const [vendorName, setVendorName] = useState("");
    const [vendorCode] = useState("AUTO-001");

    const [selectedCategory, setSelectedCategory] = useState<DropdownOption | null>(null);
    const [contactPerson, setContactPerson] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");

    const [accountNumber, setAccountNumber] = useState("");
    const [address, setAddress] = useState("");

    const [selectedPaymentTerm, setSelectedPaymentTerm] = useState<DropdownOption | null>(null);
    const [selectedNotify, setSelectedNotify] = useState<DropdownOption | null>(null);

    const [notes, setNotes] = useState("");

    /********************************************
        Name : Manish Kumar
        Purpose : Category Options
    *********************************************/
    const categoryOptions: DropdownOption[] = [
        { id: "electricity", name: "Electricity and Water Bills" },
        { id: "medication", name: "Medication" },
        { id: "pharmacy", name: "Pharmacy" },
        { id: "salary", name: "Staff Salaries" },
    ];

    /********************************************
        Name : Manish Kumar
        Purpose : Payment Options
    *********************************************/
    const paymentOptions: DropdownOption[] = [
        { id: "15", name: "15 Days" },
        { id: "30", name: "30 Days" },
        { id: "45", name: "45 Days" },
        { id: "60", name: "60 Days" },
        { id: "90", name: "90 Days" },
        { id: "advance", name: "Advance Payment" },
        { id: "immediate", name: "Immediate" },
    ];

    /********************************************
        Name : Manish Kumar
        Purpose : Notify Options
    *********************************************/
    const notifyOptions: DropdownOption[] = [
        { id: "yes", name: "Yes" },
        { id: "no", name: "No" },
    ];

    /********************************************
        Name : Manish Kumar
        Purpose : Handle Save
    *********************************************/
    const handleSave = () => {

        const payload = {
            vendorName,
            vendorCode,
            category: selectedCategory,
            contactPerson,
            phone,
            email,
            accountNumber,
            address,
            paymentTerm: selectedPaymentTerm,
            notifyBeforePayment: selectedNotify,
            notes,
        };

        console.log("Supplier Form Data:", payload);
        handleClose();
    };

    return (
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
            <Modal.Header className="aph-modal-header mb-3">

                <button
                    type="button"
                    className="border-0 rounded-circle d-flex align-items-center justify-content-center p-0 outline-0"
                    style={{
                        position: "absolute",
                        right: "2.6rem",
                        top: "2.7rem",
                    }}
                    onClick={handleClose}
                >
                    <img src="/Assets/Icons/CrossModalIcon.svg" alt="CrossModalIcon" />
                </button>

                <Modal.Title className="fs-18 fw-400 aph-modal-title">
                    New Supplier
                </Modal.Title>

            </Modal.Header>

            {/* BODY */}
            <Modal.Body className="p-0">

                {/* ROW 1 */}
                <div className="formRow d-flex">

                    <div className="formGroup">
                        <label className="customLabel">
                            Vendor Name{" "}<span className="text-danger">*</span>
                        </label>

                        <div className="inputWrapper">
                            <input
                                type="text"
                                className="customInput"
                                placeholder="Enter Vendor Name"
                                value={vendorName}
                                onChange={(e) => setVendorName(e.target.value)}
                            />
                            <i className="ri-user-line"></i>
                        </div>
                    </div>

                    <div className="formGroup">
                        <label className="customLabel">
                            Vendor Code{" "}<span className="text-danger">*</span>
                        </label>

                        <div className="inputWrapper">
                            <input
                                type="text"
                                className="customInput"
                                value={vendorCode}
                                disabled
                            />
                            <i className="ri-barcode-line"></i>
                        </div>
                    </div>

                    <div className="formGroup">
                        <label className="customLabel">
                            Category{" "}<span className="text-danger">*</span>
                        </label>

                        <CustomFormDropdown
                            options={categoryOptions}
                            value={selectedCategory}
                            onChange={setSelectedCategory}
                            placeholder="Select Category"
                        />
                    </div>

                </div>

                {/* ROW 2 */}
                <div className="formRow d-flex">

                    <div className="formGroup">
                        <label className="customLabel">Contact Person{" "}<span className="text-danger">*</span></label>

                        <div className="inputWrapper">
                            <input
                                type="text"
                                className="customInput"
                                placeholder="Enter Contact Person"
                                value={contactPerson}
                                onChange={(e) => setContactPerson(e.target.value)}
                            />
                            <i className="ri-user-3-line"></i>
                        </div>
                    </div>

                    <div className="formGroup">
                        <label className="customLabel">Phone{" "}<span className="text-danger">*</span></label>

                        <div className="inputWrapper">
                            <input
                                type="text"
                                className="customInput"
                                placeholder="Enter Phone"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                            <i className="ri-phone-line"></i>
                        </div>
                    </div>

                    <div className="formGroup">
                        <label className="customLabel">Email{" "}<span className="text-danger">*</span></label>

                        <div className="inputWrapper">
                            <input
                                type="email"
                                className="customInput"
                                placeholder="Enter Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <i className="ri-mail-line"></i>
                        </div>
                    </div>

                </div>

                {/* ROW 3 */}
                <div className="formRow">

                    <div className="formGroup">
                        <label className="customLabel">Account Number{" "}<span className="text-danger">*</span></label>

                        <div className="inputWrapper">
                            <input
                                type="text"
                                className="customInput"
                                placeholder="Enter Account Number"
                                value={accountNumber}
                                onChange={(e) => setAccountNumber(e.target.value)}
                            />
                            <i className="ri-bank-line"></i>
                        </div>
                    </div>

                    <div className="formGroup">
                        <label className="customLabel">Address{" "}<span className="text-danger">*</span></label>

                        <div className="inputWrapper">
                            <input
                                type="text"
                                className="customInput"
                                placeholder="Enter Address"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            />
                            <i className="ri-map-pin-line"></i>
                        </div>
                    </div>

                </div>

                {/* ROW 4 */}
                <div className="formRow">

                    <div className="formGroup">
                        <label className="customLabel">Payment Term{" "}<span className="text-danger">*</span></label>

                        <CustomFormDropdown
                            options={paymentOptions}
                            value={selectedPaymentTerm}
                            onChange={setSelectedPaymentTerm}
                            placeholder="Select Payment Term"
                        />
                    </div>

                    <div className="formGroup">
                        <label className="customLabel">Notify Before Payment{" "}<span className="text-danger">*</span></label>

                        <CustomFormDropdown
                            options={notifyOptions}
                            value={selectedNotify}
                            onChange={setSelectedNotify}
                            placeholder="Select Option"
                        />
                    </div>

                </div>

                {/* ROW 5 */}
                <div className="formRow">

                    <div className="formGroup w-100">
                        <label className="customLabel">Notes</label>

                        <input
                            className="customInput"
                            placeholder="Enter Notes"
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            type="text"
                        />
                    </div>

                </div>

                {/* BUTTONS */}
                <div className="d-flex justify-content-between border-0 pb-0 mt-3">

                    <button
                        type="button"
                        className="aph-modal-btn-height border-0 outline-0 col-md-7 bg-blue text-white fs-18 fw-400"
                        onClick={handleSave}
                    >
                        Save
                    </button>

                    <button
                        type="button"
                        className="aph-modal-btn-height border-0 outline-0 col-md-4 border-red text-red bg-white fs-18 fw-400"
                        onClick={handleClose}
                    >
                        Cancel
                    </button>

                </div>

            </Modal.Body>

        </Modal>
    );
}