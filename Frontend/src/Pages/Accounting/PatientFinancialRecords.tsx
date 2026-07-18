import Header from "../../GlobalHelpers/Header";
import PatientFinancialRecordsGridTable from "../../Components/Accounting/PatientFinancialRecords/PatientFinancialRecordsGridTable";

export default function PatientFinancialRecords() {
    return (
        <>
            <div className="container-fluid p-3">

                <Header
                    heading="Accounting"
                    subHeading="Patient Financial Records"
                />

                <PatientFinancialRecordsGridTable/>
            </div>
        </>
    )
}
