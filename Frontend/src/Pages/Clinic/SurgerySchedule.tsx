import Header from "../../GlobalHelpers/Header";
import StatCard from "../../GlobalHelpers/StatCrad";
import SurgeryScheduleGridTable from "../../Components/NurseStation/SurgeryScheduleGridTable";


export default function SurgerySchedule() {
    return (
        <>
            <div className="container-fluid p-3">

                {/* Header */}
                <Header heading="Clinic" subHeading="Surgery Schedule" />

                {/* Stat Cards */}
                <div className="d-flex gap-3 flex-wrap my-3">
                    <StatCard title="Cancelled Surgries" value={2} icon="USERBLOCK" color="#FF4C51" />
                    <StatCard title="Completed Surgries" value={2} icon="USERHANDUP" color="#00BAD1" />
                    <StatCard title="Pending Approval" value={8} icon="ORANGEDOTTEDCLOCK" color="#FF9F43" />
                    <StatCard title="Today's Seugries" value={10} icon="BLUEUSER" color="#7367F0" />
                </div>

                <SurgeryScheduleGridTable />
            </div>
        </>
    )
}
