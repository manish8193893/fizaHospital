import Header from "../../GlobalHelpers/Header";
import StatCard from "../../GlobalHelpers/StatCrad";

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
} from "chart.js";
import "../../styles/Pharmacy.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

interface StockItemType {
  name: string;
  current: number;
  total: number;
}

interface ActivityType {
  title: string;
  time: string;
  type: "success" | "warning";
}

export default function Dashboard() {

  const lowStockItems: StockItemType[] = [
    {
      name: "Amoxicillin 500mg",
      current: 15,
      total: 50
    },
    {
      name: "Metformin 850mg",
      current: 25,
      total: 80
    },
    {
      name: "Atorvastatin 20mg",
      current: 18,
      total: 60
    }
  ];

  const activities: ActivityType[] = [
    {
      title: "Invoice #INV-2026-0045 completed",
      time: "2 mins ago",
      type: "success"
    },
    {
      title: "Invoice #INV-2026-0045 completed",
      time: "2 mins ago",
      type: "success"
    },
    {
      title: "Low stock alert: Amoxicillin 500mg",
      time: "15 mins ago",
      type: "warning"
    },
    {
      title: "Invoice #INV-2026-0044 completed",
      time: "20 mins ago",
      type: "success"
    }
  ];

  const chartData = {
    labels: [
      "08:00",
      "09:00",
      "10:00",
      "11:00",
      "12:00",
      "13:00",
      "14:00",
      "15:00"
    ],
    datasets: [
      {
        label: "Sales (IQD)",
        data: [500, 900, 1300, 1800, 1100, 1300, 1800, 1900],
        borderColor: "#5A8DEE",
        backgroundColor: "#5A8DEE",
        tension: 0.4,
        pointRadius: 4
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom" as const
      }
    }
  };

  return (
    <div className="container-fluid p-3">

      <Header heading="Pharmacy" subHeading="Dashboard" />

      <div className="d-flex gap-3 flex-wrap my-3">
        <StatCard title="Today's Sales" value={13512} icon="BROWNDOLLARICON" color="#FF4C51" />
        <StatCard title="Total Invoices" value={43} icon="CYANDOCUMENTICON" color="#00BAD1" />
        <StatCard title="Medicines Expiring Soon" value={8} icon="BROWNCUBE" color="#FF9F43" />
        <StatCard title="Prescriptions" value={10} icon="BLUEUSER" color="#7367F0" />
      </div>

      <div className="row g-3 mt-1">

        {/* Today's Sales Trends */}
        <div className="col-lg-6">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">

              <h6 className="fw-semibold text-center mb-4">
                Today's Sales Trend
              </h6>

              <div style={{ height: "300px" }}>
                <Line data={chartData} options={chartOptions} />
              </div>

            </div>
          </div>
        </div>

        {/* Low Stock Alerts */}
        <div className="col-lg-6">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <h6 className="fw-semibold text-center mb-4">Low Stock Alerts</h6>

              {lowStockItems.map((item, index) => {
                const percentage = (item.current / item.total) * 100;

                return (
                  <div key={index} className="stock-item p-2 mb-2">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <h6 className="mb-0 fs-14 fw-500">{item.name}</h6>
                      <i className="ri-error-warning-line fs-18" style={{ color: "#D08700" }} />
                    </div>

                    <div className="d-flex align-items-center gap-2">
                      <div className="progress flex-grow-1" style={{ height: "8px" }}>
                        <div
                          className="progress-bar bg-warning"
                          role="progressbar"
                          style={{ width: `${percentage}%` }}
                          aria-valuenow={percentage}
                          aria-valuemin={0}
                          aria-valuemax={100}
                        />
                      </div>
                      <small className="text-muted fs-12 fw-500">
                        {item.current}/{item.total}
                      </small>
                    </div>
                  </div>
                );
              })}

              <button className="aph-modal-btn-height outline-0 mt-3 border text-black text-muted fs-16 fw-500 w-100 text-nowrap bg-white">
                View All Stock
              </button>
            </div>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="col-lg-6">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <h6 className="fw-semibold text-center mb-4">Recent Activities</h6>

              {activities.map((item, index) => (
                <div key={index} className="d-flex align-items-start gap-3 mb-2">
                  <i
                    className={
                      item.type === "success"
                        ? "ri-checkbox-circle-line text-green fs-18"
                        : "ri-error-warning-line text-warning fs-18"
                    }
                  />

                  <div>
                    <div className="fs-16 fw-500">{item.title}</div>
                    <small className="text-black text-muted fs-14 fw-500">{item.time}</small>
                  </div>
                </div>
              ))}

              <button className="aph-modal-btn-height outline-0 mt-3 border text-black text-muted fs-16 fw-500 w-100 text-nowrap bg-white">
                View All Activities
              </button>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}