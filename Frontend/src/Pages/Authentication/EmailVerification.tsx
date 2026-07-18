import { useNavigate } from "react-router-dom";

import "../../styles/EmailVerification.css";

export default function EmailVerification() {

    const navigate = useNavigate();

    return (
        <div className="EmailVerification-page d-flex">

            {/* LEFT SIDE */}
            <div className="left-EmailVerification d-flex justify-content-center align-items-center">

                <div className="EmailVerification-card">

                    {/* LOGO */}
                    <div className="d-flex align-items-center mb-3">
                        <img src="/Assets/Images/ShardaLogo1.png" alt="Logo" width={70} height={70} />

                        <h2 className="gradient-text mb-0 ms-2">
                            Management dashboard
                        </h2>
                    </div>

                    {/* HEADING */}
                    <div className="mb-3">
                        <h3 className="fs-32 fw-500">Verify your email <i className="ri-mail-line"></i></h3>

                        <p className="fs-14 text-secondary mb-0 text-nowrap">
                            Account activation link sent to your email address:<br /><span className="fw-500 text-black">john.doe@email.com</span> Please follow the link inside to <br />continue.
                        </p>
                    </div>

                    {/* FORM */}
                    <form>

                        {/* BUTTON */}
                        <button type="submit" className="EmailVerification-btn">
                            Skip for now
                        </button>

                        {/* FOOTER */}
                        <p className="EmailVerification-text">
                            Didn't get the mail?
                            <span onClick={() => navigate("/signup")}>
                                {" "}Resend
                            </span>
                        </p>

                    </form>
                </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="right-EmailVerification">

                {/* Bottom Background Shape */}
                <div className="EmailVerification-bg-foot-wrapper">
                    <img
                        src="/Assets/Icons/Authentication/BgFootImage.svg"
                        alt=""
                        className="EmailVerification-bg-foot-img"
                    />
                </div>

                {/* Circle + Icons */}
                <div className="EmailVerification-circle-wrapper">
                    <img
                        src="/Assets/Icons/Authentication/EmailVerifyCircle.svg"
                        alt=""
                        className="EmailVerification-circle"
                    />
                </div>

                {/* Doctor */}
                <div className="EmailVerification-person-wrapper">
                    <img
                        src="/Assets/Icons/Authentication/VerifyEmail.svg"
                        alt="Verify Email"
                        className="EmailVerification-person"
                    />
                </div>

            </div>
        </div>
    );
}