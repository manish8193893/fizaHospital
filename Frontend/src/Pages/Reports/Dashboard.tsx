import Header from "../../GlobalHelpers/Header";
import UnderDevelopment from "../UnderDevelopment";


export default function Dashboard() {
    return (
        <>
            <div className="container-fluid p-3">

                <Header
                    heading="Reports"
                    subHeading="Dashboard"
                />

                <UnderDevelopment title="Dashboard" />
            </div>
        </>
    )
}
