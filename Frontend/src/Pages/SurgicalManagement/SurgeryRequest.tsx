import Header from "../../GlobalHelpers/Header";
import SurgeryRequestGridTable from "../../Components/SurgicalManagement/SurgeryRequest/SurgeryRequestGridTable";

export default function SurgeryRequest() {
  return (
    <div className="container-fluid p-3">

      <Header
        heading="Surgical Management"
        subHeading="Surgery Request"
      />

      <SurgeryRequestGridTable/>

    </div>
  );
}