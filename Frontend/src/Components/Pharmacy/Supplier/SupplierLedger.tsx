import { useMemo, useState } from "react";

import Pagination from "../../../GlobalHelpers/Pagination";
import GlobalGridTable, {
    type ColumnActionRow,
} from "../../../GlobalHelpers/GlobalGridTable";



/********************************************
    Name : Manish Kumar
    Date : 21/06/2026
    Purpose : SupplierLedger
*********************************************/
interface SupplierLedgerData {
    paidTo: string;
    credit: number;
    payment: number;
    balance: number;
    reference: string;
    services: string;
    date: string;
}

export default function SupplierLedger() {

    /********************************************
        Name : Manish Kumar
        Date : 21/06/2026
        Purpose : Pagination States
    *********************************************/
    const [currentPage, setCurrentPage] =
        useState<number>(1);

    const [itemsPerPage, setItemsPerPage] =
        useState<number>(10);

    /********************************************
        Name : Manish Kumar
        Date : 21/06/2026
        Purpose : Dummy Ledger Data
    *********************************************/
    const ALL_LEDGER_DATA:
        SupplierLedgerData[] = [

            {
                paidTo: "Manish Kashyap",
                credit: 50000,
                payment: 25000,
                balance: 25000,
                reference: "REF001",
                services: "Medicine Purchase",
                date: "05/06/2026",
            },

            {
                paidTo: "Rohit Sharma",
                credit: 35000,
                payment: 15000,
                balance: 20000,
                reference: "REF002",
                services: "Medical Equipment",
                date: "08/06/2026",
            },

            {
                paidTo: "Amit Verma",
                credit: 42000,
                payment: 30000,
                balance: 12000,
                reference: "REF003",
                services: "Inventory Supply",
                date: "11/06/2026",
            },

            {
                paidTo: "Neha Singh",
                credit: 28000,
                payment: 10000,
                balance: 18000,
                reference: "REF004",
                services: "Pharmacy Products",
                date: "15/06/2026",
            },

            {
                paidTo: "Rahul Gupta",
                credit: 60000,
                payment: 40000,
                balance: 20000,
                reference: "REF005",
                services: "Bulk Medicine Order",
                date: "18/06/2026",
            },

        ];

    const totalPages = Math.ceil(
        ALL_LEDGER_DATA.length /
        itemsPerPage
    );

    const visibleTableData = useMemo(() => {

        const startIndex =
            (currentPage - 1) *
            itemsPerPage;

        return ALL_LEDGER_DATA.slice(
            startIndex,
            startIndex + itemsPerPage
        );

    }, [
        currentPage,
        itemsPerPage,
    ]);

    /********************************************
    Name : Manish Kumar
    Date : 21/06/2026
    Purpose : Columns
*********************************************/
    const columns:
        ColumnActionRow<SupplierLedgerData>[] = [

            {
                key: "paidTo",
                header: <>Paid To</>,
                sortable: true,
                icon: <img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="SquareSortVertical" width={14} height={14} />,
            },

            {
                key: "credit",
                header: <>Credit</>,
                sortable: true,
                icon: <img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="SquareSortVertical" width={14} height={14} />,
            },

            {
                key: "payment",
                header: <>Payment</>,
                sortable: true,
                icon: <img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="SquareSortVertical" width={14} height={14} />,
            },

            {
                key: "balance",
                header: <>Balance</>,
                sortable: true,
                icon: <img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="SquareSortVertical" width={14} height={14} />,
            },

            {
                key: "reference",
                header: <>Reference</>,
                sortable: true,
                icon: <img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="SquareSortVertical" width={14} height={14} />,
            },

            {
                key: "services",
                header: <>Services</>,
                sortable: true,
                icon: <img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="SquareSortVertical" width={14} height={14} />,
            },

            {
                key: "date",
                header: <>Date</>,
                sortable: true,
                icon: <img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="SquareSortVertical" width={14} height={14} />,
            },

            {
                key: "action",
                header: <>Action</>,
                width: "100px",
                className: "text-center",

                render: (
                    row: SupplierLedgerData
                ) => (

                    <div className="d-flex justify-content-center">

                        <button
                            type="button"
                            className="eye"
                            onClick={() =>
                                console.log(row)
                            }
                        >
                            <i className="ri-bill-line fs-18"></i>
                        </button>

                    </div>

                ),
            },

        ];

    return (
        <>

            <div className="d-flex justify-content-between align-items-center mb-4">

                <h5 className="fs-18 fw-500">
                    Supplier Ledger
                </h5>

                <button
                    type="button"
                    className="back-btn"
                >
                    <i className="ri-printer-line fs-16"></i>
                </button>

            </div>

            <div className="d-flex flex-column">

                <GlobalGridTable
                    data={visibleTableData}
                    columns={columns}
                    currentPage={currentPage}
                    pageSize={itemsPerPage}
                />

                <Pagination
                    totalPages={totalPages}
                    currentPage={currentPage}
                    onPageChange={(
                        page: number
                    ) =>
                        setCurrentPage(page)
                    }
                    rowsPerPage={itemsPerPage}
                    onRowsPerPageChange={(
                        rows: number
                    ) => {

                        setItemsPerPage(rows);

                        setCurrentPage(1);

                    }}
                />

            </div>
        </>
    );
}