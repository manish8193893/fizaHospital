import React, { type ReactNode, useMemo, useState, cloneElement, isValidElement, useRef, useEffect } from "react";

import "../styles/GlobalGridTable.css";

/************************************************************
    Name : Manish Kumar
    Date : 15/05/2026
    Purpose : This interface defines the structure of
                table column configuration.
************************************************************/

export interface ColumnActionRow<T> {
    key: keyof T | string;
    header: ReactNode;
    width?: string;
    className?: string;
    icon?: ReactNode;
    sortable?: boolean;
    render?: (
        row: T,
        index: number
    ) => React.ReactNode;
    sortFunction?: (a: T, b: T) => number;
}

/************************************************************
    Name : Manish Kumar
    Date : 15/05/2026
    Purpose : This interface defines the structure of
                action buttons rendered inside each row.
************************************************************/
export interface RowAction<T> {
    icon: ReactNode;
    className?: string;
    tooltip?: string;
    iconWidth?: string | number;
    iconHeight?: string | number;
    onClick?: (row: T) => void;
    disabled?: boolean | ((row: T) => boolean);
}

/************************************************************
    Name : Manish Kumar
    Date : 15/05/2026
    Purpose : This interface defines the props accepted
                by the GlobalGridTable component.
************************************************************/
interface GlobalGridTableProps<T> {
    columns: ColumnActionRow<T>[];
    data: T[];
    rowActions?: RowAction<T>[];
    emptyMessage?: string;
    tableClassName?: string;
    currentPage?: number;
    pageSize?: number;
}

/************************************************************
    Name : Manish Kumar
    Date : 15/05/2026
    Purpose : This is the main reusable global grid
                table component responsible for rendering
                dynamic table data with sorting and actions.
************************************************************/
const GlobalGridTable = <T extends Record<string, any>>({
    columns,
    data,
    rowActions = [],
    emptyMessage = "No Data Found",
    tableClassName = "",
    currentPage = 1,
    pageSize = 5,
}: GlobalGridTableProps<T>) => {

    /************************************************************
        Name : Manish Kumar
        Date : 15/05/2026
        Purpose : This state stores the currently selected
                sorting column and sorting direction.
    ************************************************************/
    const [sortConfig, setSortConfig] = useState<{ key: string; direction: "asc" | "desc"; } | null>(null);

    const menuRef = useRef<HTMLDivElement | null>(null);

    const [menuState, setMenuState] = useState<{
        row: number | null;
        direction: "up" | "down";
        top: number;
        left: number;
    }>({
        row: null,
        direction: "down",
        top: 0,
        left: 0,
    });


    /*************************************************************************
        Name : Manish Kumar
        Date : 15/05/2026
        Purpose : This function handles ascending and descending sorting 
        functionality when user clicks on sortable column headers.
    **************************************************************************/
    const handleSort = (
        column: ColumnActionRow<T>
    ) => {
        if (!column.sortable) return;

        const direction =
            sortConfig?.key === column.key &&
                sortConfig.direction === "asc"
                ? "desc"
                : "asc";

        setSortConfig({
            key: String(column.key),
            direction,
        });
    };

    /*******************************************************************************
        Name : Manish Kumar
        Date : 15/05/2026
        Purpose : This memoized block is responsible for returning sorted table
                   data based on selected column and sorting direction.
    ********************************************************************************/

    const sortedData = useMemo(() => {
        const sortableData = [...data];

        if (!sortConfig) return sortableData;

        const selectedColumn = columns.find(
            (column) =>
                String(column.key) === sortConfig.key
        );

        if (!selectedColumn) return sortableData;

        sortableData.sort((a, b) => {
            let compareResult = 0;

            /* CUSTOM SORT FUNCTION */
            if (selectedColumn.sortFunction) {
                compareResult =
                    selectedColumn.sortFunction(a, b);
            }

            /* DEFAULT SORT */
            else {
                const aValue =
                    a[selectedColumn.key as keyof T];

                const bValue =
                    b[selectedColumn.key as keyof T];

                if (aValue < bValue) compareResult = -1;

                if (aValue > bValue) compareResult = 1;
            }

            return sortConfig.direction === "asc"
                ? compareResult
                : -compareResult;
        });

        return sortableData;
    }, [columns, data, sortConfig]);

    const renderActionIcon = (
        action: RowAction<T>
    ) => {
        if (isValidElement(action.icon)) {
            return cloneElement(
                action.icon as React.ReactElement<any>,
                {
                    width: action.iconWidth || 18,
                    height: action.iconHeight || 18,
                }
            );
        }

        return action.icon;
    };

    const handleMenuToggle = (
        rowIndex: number,
        event: React.MouseEvent<HTMLButtonElement>
    ) => {

        const buttonRect =
            event.currentTarget.getBoundingClientRect();

        const viewportHeight =
            window.innerHeight;

        const menuHeight =
            (rowActions.length * 48) + 20;

        const spaceBelow =
            viewportHeight - buttonRect.bottom;

        const direction =
            spaceBelow >= menuHeight
                ? "down"
                : "up";

        const top =
            direction === "down"
                ? buttonRect.bottom + 8
                : buttonRect.top - menuHeight - 8;

        const left =
            buttonRect.right - 220;

        setMenuState(prev => ({
            row:
                prev.row === rowIndex
                    ? null
                    : rowIndex,
            direction,
            top,
            left,
        }));
    };

    /************************************************************
      Name : Manish Kumar
      Date : 15/05/2026 
      Purpose : This function is responsible for rendering 
                the appropriate icon for a given row action.
    ************************************************************/

    useEffect(() => {
        const handleOutsideClick = (
            event: MouseEvent
        ) => {
            if (
                menuRef.current &&
                !menuRef.current.contains(
                    event.target as Node
                )
            ) {
                setMenuState({
                    row: null,
                    direction: "down",
                    top: 0,
                    left: 0,
                });
            }
        };

        document.addEventListener(
            "mousedown",
            handleOutsideClick
        );

        return () =>
            document.removeEventListener(
                "mousedown",
                handleOutsideClick
            );
    }, []);


    return (
        <div
            className={`global-grid-wrapper ${tableClassName}`}
        >
            <table className="global-grid-table">

                <thead>
                    <tr className="">
                        <th className="text-muted fw-bold fs-16 px-4 text-center">#</th>

                        {columns.map((column, index) => (
                            <th
                                key={index}
                                style={{
                                    width: column.width,
                                }}
                                className=""
                            >
                                <div className="d-flex justify-content-center align-items-center">
                                    {/* HEADER */}
                                    <span className="pe-2">{column.header}</span>

                                    {/* SORT ICON */}
                                    {column.icon && (
                                        <span
                                            className={`header-icon ${column.sortable
                                                ? "sortable-icon"
                                                : ""
                                                }`}
                                            onClick={() =>
                                                handleSort(column)
                                            }
                                        >
                                            {column.icon}
                                        </span>
                                    )}
                                </div>
                            </th>
                        ))}

                        {/* ACTION COLUMN */}
                        {rowActions.length > 0 && (
                            <th className="text-center">
                                Action
                            </th>
                        )}
                    </tr>
                </thead>

                <tbody>
                    {sortedData.length === 0 ? (
                        <tr>
                            <td
                                colSpan={
                                    columns.length +
                                    (rowActions.length > 0 ? 2 : 1)
                                }
                                className="table-empty-row"
                            >
                                {emptyMessage}
                            </td>
                        </tr>
                    ) : (
                        sortedData.map((row, rowIndex) => (
                            <tr key={rowIndex}>
                                {/* SERIAL NUMBER */}
                                <td className="text-center">
                                    {((currentPage - 1) * pageSize) + rowIndex + 1}
                                </td>

                                {/* TABLE CELLS */}
                                {columns.map(
                                    (column, columnIndex) => (
                                        <td
                                            key={columnIndex}
                                            className={
                                                column.className || ""
                                            }
                                        >
                                            {column.render
                                                ? column.render(
                                                    row,
                                                    rowIndex
                                                )
                                                : row[
                                                column.key as keyof T
                                                ]}
                                        </td>
                                    )
                                )}

                                {/* ROW ACTIONS */}
                                {rowActions.length > 0 && (
                                    <td className="ggt-menu-cell">
                                        <div
                                            className="ggt-menu-wrapper"
                                            ref={menuState.row === rowIndex ? menuRef : null}
                                        >
                                            <button
                                                type="button"
                                                className="ggt-menu-trigger"
                                                onClick={(e) => handleMenuToggle(rowIndex, e)}
                                            >
                                                <i className="ri-more-fill"></i>
                                            </button>

                                            {menuState.row === rowIndex && (
                                                <div
                                                    className="ggt-dropdown-menu gap-2 rounded-0 p-2"
                                                    style={{
                                                        top: `${menuState.top}px`,
                                                        left: `${menuState.left}px`,
                                                    }}
                                                >
                                                    {rowActions.map((action, actionIndex) => {
                                                        const isDisabled =
                                                            typeof action.disabled === "function"
                                                                ? action.disabled(row)
                                                                : action.disabled;

                                                        return (
                                                            <button
                                                                key={actionIndex}
                                                                type="button"
                                                                disabled={isDisabled}
                                                                /* REMOVED rounded-3 AND border-0 TO PREVENT OVERRIDES */
                                                                className={`ggt-dropdown-item py-1 ps-2 pe-3 text-nowrap d-flex justify-content-between align-items-center fs-14 fw-500 ${action.className || ""} ${isDisabled ? "ggt-dropdown-item-disabled" : ""}`}
                                                                onClick={() => {
                                                                    if (!isDisabled) {
                                                                        action.onClick?.(row);
                                                                        setMenuState({
                                                                            row: null,
                                                                            direction: "down",
                                                                            top: 0,
                                                                            left: 0,
                                                                        });
                                                                    }
                                                                }}
                                                            >
                                                                <span>{action.tooltip}</span>
                                                                <span className="ggt-dropdown-icon">
                                                                    {renderActionIcon(action)}
                                                                </span>
                                                            </button>
                                                        );
                                                    })}
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                )}
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div >
    );
};

export default GlobalGridTable;