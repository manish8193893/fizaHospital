import { useState, useMemo } from "react";

import Header from "../../GlobalHelpers/Header";
import StatCard from "../../GlobalHelpers/StatCrad";
import ComboChart from "../../Components/ComboChart";
import { Pagination } from "../../GlobalHelpers/Pagination";
import GlobalGridTable, { type ColumnActionRow, } from "../../GlobalHelpers/GlobalGridTable";



import "../../styles/Layout.css";

interface PatientTableData {
  id: string;
  name: string;
  clinic: string;
  doctor: string;
  time: string;
}


const Dashboard = () => {

  /* -------------------------------------------------------------------------- */
  /*                                  MOCK DATA                                 */
  /* -------------------------------------------------------------------------- */

  const ALL_PATIENT_DATA: PatientTableData[] = [
    { id: "15419", name: "Ahmed Ali", clinic: "Internal Medicine", doctor: "Dr. Samir", time: "08:45 AM" },
    { id: "15420", name: "Yousef Ali", clinic: "Ophthalmology", doctor: "Dr. Saeed", time: "10:15 AM" },
    { id: "15421", name: "Maryam Khalid", clinic: "Pediatrics", doctor: "Dr. Reem", time: "09:45 AM" },
    { id: "15422", name: "Ali Jamal", clinic: "Obstetrics", doctor: "Dr. Khalid", time: "09:00 AM" },
    { id: "15423", name: "Fatima Hassan", clinic: "Cardiology", doctor: "Dr. Zaid", time: "09:15 AM" },
    { id: "15424", name: "Zaid Omar", clinic: "Dermatology", doctor: "Dr. Nour", time: "11:00 AM" },
    { id: "15425", name: "Lina Tariq", clinic: "Orthopedics", doctor: "Dr. Fadi", time: "11:30 AM" },
    { id: "15426", name: "Hassan Badr", clinic: "Neurology", doctor: "Dr. Huda", time: "12:00 PM" },
    { id: "15427", name: "Rania Majid", clinic: "Psychiatry", doctor: "Dr. Anas", time: "01:15 PM" },
    { id: "15428", name: "Omar Farooq", clinic: "Urology", doctor: "Dr. Basil", time: "02:30 PM" }
  ];

  /* -------------------------------------------------------------------------- */
  /*                               STATE VARIABLES                              */
  /* -------------------------------------------------------------------------- */

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(5);

  /* -------------------------------------------------------------------------- */
  /*                            DYNAMIC DATA SLICING                            */
  /* -------------------------------------------------------------------------- */

  const totalPages = Math.ceil(ALL_PATIENT_DATA.length / itemsPerPage);

  const visibleTableData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return ALL_PATIENT_DATA.slice(startIndex, endIndex);
  }, [currentPage, itemsPerPage]);

  /* -------------------------------------------------------------------------- */
  /*                                  COLUMNS                                   */
  /* -------------------------------------------------------------------------- */

  const columns: ColumnActionRow<PatientTableData>[] = [
    { key: "id", header: <>ID</>, className: "text-center", icon: <img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="SquareSortVertical" width={14} height={14} />, sortable: true, sortFunction: (a, b) => Number(a.id) - Number(b.id) },
    { key: "name", header: <>Name</>, className: "text-center", icon: <img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="SquareSortVertical" width={14} height={14} />, sortable: true, sortFunction: (a, b) => a.name.localeCompare(b.name) },
    { key: "clinic", header: <>Clinic</>, className: "text-center", icon: <img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="SquareSortVertical" width={14} height={14} />, sortable: true, sortFunction: (a, b) => a.clinic.localeCompare(b.clinic) },
    { key: "doctor", header: <>Doctor</>, className: "text-center", icon: <img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="SquareSortVertical" width={14} height={14} />, sortable: true, sortFunction: (a, b) => a.doctor.localeCompare(b.doctor) },
    { key: "time", header: <>Time</>, className: "text-center", icon: <img src="/Assets/Icons/GlobalGridIcons/SquareSortVertical.svg" alt="SquareSortVertical" width={14} height={14} />, sortable: true, sortFunction: (a, b) => a.time.localeCompare(b.time) },
  ];

  return (
    <div className="container-fluid p-3">

      {/* Header */}
      <Header heading="Dashboard" />

      {/* Stat Cards */}
      <div className="d-flex gap-3 flex-wrap my-3">
        <StatCard title="Available Beds" value={6} icon="ORANGESOFA" color="#FF9F43" />
        <StatCard title="Lab Test Pending" value={15} icon="REDTESTTUBE" color="#FF4C51" />
        <StatCard title="Appointment Today" value={45} icon="BLUECALENDAR" color="#00BAD1" />
        <StatCard title="Total Patients" value={1158} icon="BLUEUSER" color="#7367F0" />
      </div>

      {/* Grid Layout Container */}
      <div className="d-flex flex-column">

        <GlobalGridTable
          data={visibleTableData}
          columns={columns}
          currentPage={currentPage}
          pageSize={itemsPerPage}
        />

        <div>
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={(page) =>
              setCurrentPage(page)
            }
            rowsPerPage={itemsPerPage}
            onRowsPerPageChange={(rows) => {
              setItemsPerPage(rows);
              setCurrentPage(1);
            }}
          />
        </div>

      </div>

      <div>
        <ComboChart />
      </div>
    </div>
  );
};

export default Dashboard;
