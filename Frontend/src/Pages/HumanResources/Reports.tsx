import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Header from "../../GlobalHelpers/Header";

import "../../styles/HumanResource.css";

export default function HumanResourceReports() {
  const navigate = useNavigate();
  const [selectedReport, setSelectedReport] = useState("");

  const reportOptions = [
    {
      id: "employee",
      label: "Employee Report",
      route: "/human-resources/Reports/employee-report",
    },
    {
      id: "leave",
      label: "Leave Report",
      route: "/human-resources/Reports/leave-report",
    },
    {
      id: "attendance",
      label: "Attendance Report",
      route: "/human-resources/Reports/attendance-report",
    },
    {
      id: "payroll",
      label: "Payroll Report",
      route: "/human-resources/Reports/payroll-report",
    },
  ];

  const handleApply = () => {
    if (!selectedReport) return;

    const report = reportOptions.find((item) => item.id === selectedReport);

    if (report) {
      navigate(report.route);
    }
  };

  return (
    <div className="container-fluid p-3">
      <Header heading="Human Resources" subHeading="Reports" />

      <div className="my-3">
        <h2 className="fs-20 fw-500">HR & Payroll Reports</h2>

        <div className="d-flex justify-content-between mt-5">
          <span className="fs-16 fw-500">Start by Selecting a report Type</span>
          <button onClick={handleApply} disabled={!selectedReport} className="border-0 outline-0 bg-blue fs-18 ReportAppltBtn">Apply</button>
        </div>

        <div className="row g-3 justify-content-center my-3">
          {reportOptions.map((option) => (
            <div key={option.id} className="col-xl-3 col-lg-3 col-md-4 col-sm-6 col-12">
              <div
                className={`report-option-card ${selectedReport === option.id ? "active-report" : ""}`}
                onClick={() => setSelectedReport(option.id)}
              >
                <div className="d-flex flex-column align-items-center">
                  <h6 className="mb-4 fs-16">{option.label}</h6>

                  <input
                    type="radio"
                    className="custom-radio"
                    checked={selectedReport === option.id}
                    onChange={() => setSelectedReport(option.id)}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="report-illustration-wrapper">

          <img
            src="/Assets/Icons/PersonBgImage.svg"
            className="person-bg-image"
            alt="person"
          />

          <img
            src="/Assets/Icons/PersonImage.svg"
            className="person-image"
            alt="person-image"
          />

          <div className="report-card revenue-card">
            <img src="/Assets/Icons/RevenueReport.svg" alt="Revenue Report" />
          </div>

          <div className="report-card expense-card">
            <img src="/Assets/Icons/ExpenseReport.svg" alt="Expense Report" />
          </div>

        </div>

      </div>
    </div>
  );
}
