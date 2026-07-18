import Header from "../../GlobalHelpers/Header";
import UnderDevelopment from "../UnderDevelopment";


export default function FinancialReports() {
    return (
        <>
            <div className="container-fluid p-3">

                <Header
                    heading="Accounting"
                    subHeading="Financial Reports"
                />

                <UnderDevelopment title="Financial Reports" />
            </div>
        </>
    )
}
