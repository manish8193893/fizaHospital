import Header from "../../GlobalHelpers/Header";
import UnderDevelopment from "../UnderDevelopment";

export default function PharmacySettings() {
  return (
    <div className="container-fluid p-3">

      <Header
        heading="Pharmacy"
        subHeading="Pharmacy Settings"
      />
        <UnderDevelopment title="Pharmacy Settings" />
    </div>
  );
}