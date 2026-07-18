import Header from "../../GlobalHelpers/Header";
import DoctorAccountAndSurgeryFeeGridTable from "../../Components/Accounting/DoctorAccountAndSurgeryFee/DoctorAccountAndSurgeryFeeGridTable";



export default function DoctorAccountAndSurgeryFee() {
    return (
        <>
            <div className="container-fluid p-3">

                <Header
                    heading="Accounting"
                    subHeading="Doctor Account & Surgery Fee"
                />

                <DoctorAccountAndSurgeryFeeGridTable/>
            </div>
        </>
    )
}
