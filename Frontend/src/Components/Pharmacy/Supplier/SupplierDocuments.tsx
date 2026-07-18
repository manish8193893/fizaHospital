import { useMemo, useState } from "react";
import { Modal } from "react-bootstrap";

import Pagination from "../../../GlobalHelpers/Pagination";
import CustomFormDropdown, { type DropdownOption } from "../../../GlobalHelpers/CustomFormDropdown";
import GlobalGridTable, { type ColumnActionRow } from "../../../GlobalHelpers/GlobalGridTable";




interface SupplierDocumentData {
    documentName: string;
    documentType: string;
    reference: string;
    uploadDate: string;
    uploadedBy: string;
}

export default function SupplierSettings() {

    const [globalSearch, setGlobalSearch] = useState("");
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [itemsPerPage, setItemsPerPage] = useState<number>(10);
    const [showDocumentModal, setShowDocumentModal] = useState(false);

    const ALL_DOCUMENT_DATA: SupplierDocumentData[] = [
        {
            documentName: "Supplier Agreement",
            documentType: "Passport",
            reference: "Invoice",
            uploadDate: "05/06/2026",
            uploadedBy: "Manish Kashyap"
        },
        {
            documentName: "Trade License",
            documentType: "Driving License",
            reference: "Payment",
            uploadDate: "08/06/2026",
            uploadedBy: "Rohit Sharma"
        },
        {
            documentName: "Vendor Registration",
            documentType: "National ID Card",
            reference: "Patient",
            uploadDate: "12/06/2026",
            uploadedBy: "Amit Verma"
        },
        {
            documentName: "Business Certificate",
            documentType: "Passport",
            reference: "Doctor",
            uploadDate: "18/06/2026",
            uploadedBy: "Neha Singh"
        },
        {
            documentName: "Tax Document",
            documentType: "Residence Card",
            reference: "Insurance",
            uploadDate: "21/06/2026",
            uploadedBy: "Rahul Gupta"
        }
    ];

    const filteredDocuments = useMemo(() => {

        const search = globalSearch.toLowerCase();

        return ALL_DOCUMENT_DATA.filter((item) =>
            item.documentName.toLowerCase().includes(search) ||
            item.documentType.toLowerCase().includes(search) ||
            item.uploadedBy.toLowerCase().includes(search)
        );

    }, [globalSearch]);

    const totalPages = Math.ceil(filteredDocuments.length / itemsPerPage);

    const visibleTableData = useMemo(() => {

        const startIndex = (currentPage - 1) * itemsPerPage;

        return filteredDocuments.slice(
            startIndex,
            startIndex + itemsPerPage
        );

    }, [
        filteredDocuments,
        currentPage,
        itemsPerPage
    ]);

    const handleResetFilters = () => {

        setGlobalSearch("");

        setCurrentPage(1);

    };

    const columns: ColumnActionRow<SupplierDocumentData>[] = [
        {
            key: "documentName",
            header: <>Document Name</>,
            sortable: true,
            className:"text-center",
            icon: <img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="SquareSortVertical" width={14} height={14} />
        },
        {
            key: "documentType",
            header: <>Document Type</>,
            sortable: true,
            className:"text-center",
            icon: <img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="SquareSortVertical" width={14} height={14} />
        },
        {
            key: "reference",
            header: <>Reference</>,
            sortable: true,
            className:"text-center",
            icon: <img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="SquareSortVertical" width={14} height={14} />
        },
        {
            key: "uploadDate",
            header: <>Upload Date</>,
            sortable: true,
            className:"text-center",
            icon: <img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="SquareSortVertical" width={14} height={14} />
        },
        {
            key: "uploadedBy",
            header: <>Uploaded By</>,
            className:"text-center",
            sortable: true,
            icon: <img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="SquareSortVertical" width={14} height={14} />
        },
        {
            key: "action",
            header: <>Action</>,
            render: (row: SupplierDocumentData) => (
                <div className="d-flex justify-content-center gap-2">
                    <button
                        type="button"
                        className="eye"
                        onClick={() => console.log(row)}
                    >
                        <i className="ri-eye-line fs-18"></i>
                    </button>

                    <button
                        type="button"
                        className="printer"
                        onClick={() => console.log(row)}
                    >
                        <i className="ri-printer-line fs-18"></i>
                    </button>
                </div>
            )
        }
    ];

    return (
        <>
            <div className="">

                <div className="d-flex justify-content-between mb-4">

                    <h5 className="fs-18 fw-500">
                        Supplier Documents
                    </h5>

                    <div
                        className="Plus-btn"
                        onClick={() =>
                            setShowDocumentModal(true)
                        }
                    >
                        <img src="/Assets/Icons/WhitePlusCircle.svg" alt="WhitePlusCircle" width={22} height={22} />

                        <div className="text-white fs-16 fw-400">
                            Add Document
                        </div>

                    </div>

                </div>

                <div className="aph-modal-filter-row mb-4">

                    <div className="aph-filter-search">

                        <input
                            type="text"
                            className="aph-search-input"
                            placeholder="Search..."
                            value={globalSearch}
                            onChange={(e) => {

                                setGlobalSearch(e.target.value);

                                setCurrentPage(1);

                            }}
                        />

                        <button className="aph-search-btn">
                            <i className="ri-search-line"></i>
                        </button>

                    </div>

                    <button
                        className="aph-filter-btn"
                        onClick={handleResetFilters}
                    >
                        <i className="ri-filter-off-line"></i>
                    </button>

                </div>

                <GlobalGridTable
                    data={visibleTableData}
                    columns={columns}
                    currentPage={currentPage}
                    pageSize={itemsPerPage}
                />

                <Pagination
                    totalPages={totalPages}
                    currentPage={currentPage}
                    onPageChange={(page: number) =>
                        setCurrentPage(page)
                    }
                    rowsPerPage={itemsPerPage}
                    onRowsPerPageChange={(rows: number) => {

                        setItemsPerPage(rows);

                        setCurrentPage(1);

                    }}
                />

            </div>

            <AddDocumentModal
                show={showDocumentModal}
                handleClose={() =>
                    setShowDocumentModal(false)
                }
            />
        </>
    );
}

interface AddDocumentModalProps {
    show: boolean;
    handleClose: () => void;
}

function AddDocumentModal({
    show,
    handleClose
}: AddDocumentModalProps) {

    const documentTypeOptions: DropdownOption[] = [
        { id: "birth_certificate", name: "Birth Certificate" },
        { id: "civil_status_id", name: "Civil Status ID" },
        { id: "driving_license", name: "Driving License" },
        { id: "national_id_card", name: "National ID Card" },
        { id: "passport", name: "Passport" },
        { id: "public_distribution_card", name: "Public Distribution Card" },
        { id: "residence_card", name: "Residence Card" },
        { id: "voter_id_card", name: "Voter ID Card" }
    ];

    const referenceTypeOptions: DropdownOption[] = [
        { id: "appointment", name: "Appointment" },
        { id: "doctor", name: "Doctor" },
        { id: "insurance", name: "Insurance" },
        { id: "invoice", name: "Invoice" },
        { id: "lab_test", name: "Lab Test" },
        { id: "patient", name: "Patient" },
        { id: "payment", name: "Payment" },
        { id: "prescription", name: "Prescription" }
    ];

    const [selectedDocumentType, setSelectedDocumentType] =
        useState<DropdownOption | null>(null);

    const [selectedReferenceType, setSelectedReferenceType] =
        useState<DropdownOption | null>(null);

    const [formData, setFormData] = useState({
        documentName: "",
        attachment: "",
        notes: ""
    });

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {

        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));

    };

    const handleFileChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {

        const file = e.target.files?.[0];

        if (!file) return;

        setFormData((prev) => ({
            ...prev,
            attachment: file.name
        }));

    };

    const handleSave = () => {

        console.log({
            ...formData,
            documentType: selectedDocumentType,
            referenceType: selectedReferenceType
        });

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

            <Modal.Header className="aph-modal-header mb-3">

                <button
                    type="button"
                    className="border-0 rounded-circle d-flex align-items-center justify-content-center p-0 outline-0"
                    style={{
                        position: "absolute",
                        right: "2.6rem",
                        top: "2.7rem"
                    }}
                    onClick={handleClose}
                >
                    <img src="/Assets/Icons/CrossModalIcon.svg" alt="CrossModalIcon" />
                </button>

                <Modal.Title className="fs-18 fw-400 aph-modal-title">
                    Add Document
                </Modal.Title>

            </Modal.Header>

            <Modal.Body className="p-0">

                <form>

                    <div className="formRow">

                        <div className="formGroup">

                            <label className="customLabel">
                                Document Name{" "}<span className="text-danger">*</span>
                            </label>

                            <div className="inputWrapper">

                                <input
                                    type="text"
                                    name="documentName"
                                    className="customInput"
                                    placeholder="Enter Document Name"
                                    value={formData.documentName}
                                    onChange={handleInputChange}
                                />

                                <i className="ri-file-text-line"></i>

                            </div>

                        </div>

                        <div className="formGroup">

                            <label className="customLabel">
                                Document Type{" "}<span className="text-danger">*</span>
                            </label>

                            <CustomFormDropdown
                                options={documentTypeOptions}
                                value={selectedDocumentType}
                                onChange={setSelectedDocumentType}
                                placeholder="Select Document Type"
                            />

                        </div>

                    </div>

                    <div className="formRow">

                        <div className="formGroup">

                            <label className="customLabel">
                                Reference Type{" "}<span className="text-danger">*</span>
                            </label>

                            <CustomFormDropdown
                                options={referenceTypeOptions}
                                value={selectedReferenceType}
                                onChange={setSelectedReferenceType}
                                placeholder="Select Reference Type"
                            />

                        </div>

                        <div className="formGroup">

                            <label className="customLabel">
                                File Upload{" "}<span className="text-danger">*</span>
                            </label>

                            <div className="inputWrapper">

                                <input
                                    type="text"
                                    className="customInput"
                                    placeholder="Select Document File"
                                    value={formData.attachment}
                                    readOnly
                                />

                                <i className="ri-attachment-2"></i>

                            </div>

                            <input
                                type="file"
                                hidden
                                className="mt-2"
                                onChange={handleFileChange}
                            />

                        </div>

                    </div>

                    <div className="formRow">

                        <div className="formGroup">

                            <label className="customLabel">
                                Notes
                            </label>

                            <div className="inputWrapper">

                                <input
                                    type="text"
                                    name="notes"
                                    className="customInput"
                                    placeholder="Enter Notes"
                                    value={formData.notes}
                                    onChange={handleInputChange}
                                />

                                <i className="ri-file-text-line"></i>

                            </div>

                        </div>

                    </div>

                    <div className="d-flex justify-content-between border-0 pb-0 mt-5">

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

                </form>

            </Modal.Body>

        </Modal>
    );
}