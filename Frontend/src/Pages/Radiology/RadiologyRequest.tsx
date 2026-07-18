import RadiologyRequestGridtable from "../../Components/Radiology/RadiologyRequestGridtable";
import Header from "../../GlobalHelpers/Header";

export default function RadiologyRequest() {
    return (
        <div className="container-fluid p-3">

            <Header
                heading="Radiology"
                subHeading="Radiology Request"
            />
            
            <RadiologyRequestGridtable/>
        </div>
    )
}
