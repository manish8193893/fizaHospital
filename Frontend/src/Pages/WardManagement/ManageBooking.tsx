import Header from "../../GlobalHelpers/Header";
import StatCard from "../../GlobalHelpers/StatCrad";
import ManageBookingGridTable from "../../Components/WardManagement/ManageBooking/ManageBookingGridTable";

export default function ManageBooking() {
  return (
    <div className="container-fluid p-3">

      <Header
        heading="Ward Management"
        subHeading="Manage Booking"
      />

      <div className="d-flex gap-3 flex-wrap my-3">
        <StatCard title="Available Beds" value={2} icon="REDDOUBLEBED" color="#FF4C51" />
        <StatCard title="Pending Requests" value={8} icon="ORANGESINGLEUSER" color="#FF9F43" />
        <StatCard title="Confirmed" value={2} icon="CYANCHECK" color="#00BAD1" />
        <StatCard title="Total Bookings" value={11} icon="VIOLETBUILDING" color="#7367F0" />
      </div>

      <ManageBookingGridTable />
    </div>
  );
}