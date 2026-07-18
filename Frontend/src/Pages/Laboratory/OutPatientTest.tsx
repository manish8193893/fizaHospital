import OutPatientGridTable from "../../Components/Laboratory/OutPatientTest/OutPatientGridTable";
import Header from "../../GlobalHelpers/Header";

export default function OutPatientTest() {
    return (
        <>
            <div className="container-fluid p-3">

                <Header
                    heading="Laboratory"
                    subHeading="OutPatient Test"
                />

                <OutPatientGridTable/>
            </div>
        </>
    )
}
