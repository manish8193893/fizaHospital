import Header from "../../GlobalHelpers/Header";
import StatCard from "../../GlobalHelpers/StatCrad";

import '../../styles/HumanResource.css'

export default function Dashboard() {

  const departmentData = [
    {
      department: "Doctors",
      total: 85,
      present: 78,
      leave: 4,
      absent: 3,
      progress: 92,
    },
    {
      department: "Nursing",
      total: 142,
      present: 128,
      leave: 10,
      absent: 4,
      progress: 90,
    },
    {
      department: "Administrators",
      total: 45,
      present: 42,
      leave: 2,
      absent: 1,
      progress: 93,
    },
    {
      department: "Technicians",
      total: 38,
      present: 32,
      leave: 4,
      absent: 2,
      progress: 84,
    },
    {
      department: "Support Services",
      total: 32,
      present: 18,
      leave: 12,
      absent: 2,
      progress: 56,
    },
  ];

  const activities = [
    {
      title: "Attendance Recorded",
      employee: "Ahmed Mohamed",
      time: "8:00 AM",
      color: "success",
    },
    {
      title: "New Leave Request",
      employee: "Sara Ali",
      time: "8:15 AM",
      color: "warning",
    },
    {
      title: "Leave Approved",
      employee: "Mohamed Hassan",
      time: "8:30 AM",
      color: "success",
    },
    {
      title: "Attendance Delay",
      employee: "Fatima Ahmed",
      time: "9:15 AM",
      color: "danger",
    },
    {
      title: "Shift Registration",
      employee: "Khaled Salem",
      time: "4:00 PM",
      color: "primary",
    },
  ];

  return (
    <div className="container-fluid p-3">

      {/* Header */}
      <Header
        heading="Human Resources"
        subHeading="Dashboard"
      />

      {/* Stat Cards */}
      <div className="d-flex gap-3 flex-wrap my-3">
        <StatCard title="On Leave" value={32} icon="BROWNDOTTEDCALENDAR" color="#FF9F43" />
        <StatCard title="Doctors" value={12} icon="MEDICALKIT" color="#0477BF" />
        <StatCard title="Department" value={298} icon="SKYBLUEHOSPITALBUILDING" color="#00BAD1" />
        <StatCard title="Total Employees" value={342} icon="BLUEUSER" color="#7367F0" />
      </div>

      <div className="container-fluid px-0 py-3">
        <div className="row g-3">
          {/* Department Statistics */}
          <div className="col-lg-6">
            <div className="card border-0 shadow-sm h-100 hr-card">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h5 className="mb-0 fw-500 fs-16">
                    Department Statistics
                  </h5>

                  <i className="ri-line-chart-line fs-18 text-blue"></i>
                </div>

                {departmentData.map((item, index) => (
                  <div key={index} className="mb-4">

                    <div className="d-flex justify-content-between align-items-center">
                      <h6 className="fs-16 fw-500 mb-0">
                        {item.department}
                      </h6>

                      <span className="text-muted small">
                        Total: {item.total}
                      </span>
                    </div>

                    <div className="text-start mt-1 small">
                      <span className="me-2" style={{color:"#00A63E"}}>
                        Present {item.present}
                      </span>

                      <span className="me-2" style={{color:"#D08700"}}>
                        Leave {item.leave}
                      </span>

                      <span style={{color:"#E7000B"}}>
                        Absent {item.absent}
                      </span>
                    </div>

                    <div className="progress mt-2 hr-progress">
                      <div
                        className="progress-bar bg-blue"
                        role="progressbar"
                        style={{ width: `${item.progress}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Activities */}
          <div className="col-lg-6">
            <div className="card border-0 shadow-sm h-100 hr-card">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h5 className="mb-0 fw-500 fs-16">
                    Recent Activities
                  </h5>

                  <i className="ri-arrow-up-line fs-18 text-blue"></i>
                </div>

                {activities.map((activity, index) => (
                  <div
                    key={index}
                    className={`${index !== activities.length - 1
                      ? "border-bottom"
                      : ""
                      } py-3`}
                  >
                    <div className="d-flex justify-content-between">

                      <span
                        className={`activity-dot bg-${activity.color}`}
                      />

                      <div className="text-end">
                        <h6 className="mb-1 fs-16 fw-500">
                          {activity.title}
                        </h6>

                        <div className="small text-muted">
                          {activity.employee}
                        </div>

                        <div className="small text-secondary">
                          {activity.time}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}