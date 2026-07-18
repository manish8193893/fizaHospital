import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "../../styles/ResetPassword.css";

export default function ResetPassword() {

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();

    return (
        <div className="ResetPassword-page d-flex">

            {/* LEFT SIDE */}
            <div className="left-ResetPassword d-flex justify-content-center align-items-center">

                <div className="ResetPassword-card">

                    {/* LOGO */}
                    <div className="d-flex align-items-center mb-3">
                        <img src="/Assets/Images/ShardaLogo1.png" alt="Logo" width={70} height={70} />

                        <h2 className="gradient-text mb-0 ms-2">
                            Management dashboard
                        </h2>
                    </div>

                    {/* HEADING */}
                    <div className="mb-3">
                        <h3 className="fs-32 fw-500">Reset Passwoard <i className="ri-lock-2-fill"></i></h3>

                        <p className="fs-14 text-secondary mb-0 text-nowrap">
                            Your new password must be different from previously used passwords.
                        </p>
                    </div>

                    {/* FORM */}
                    <form>

                        {/* EMAIL */}
                        <div className="mb-3">
                            <label htmlFor="newpassword" className="form-label custom-label">
                                New Password
                            </label>

                            <div className="input-wrapper">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    className="form-control custom-input"
                                    id="newpassword"
                                    placeholder="Enter your new password"
                                />

                                <i
                                    className={`${showPassword
                                        ? "ri-eye-off-line"
                                        : "ri-eye-line"
                                        } input-icon`}
                                    onClick={() => setShowPassword(!showPassword)}
                                    style={{ cursor: "pointer" }}
                                ></i>
                            </div>
                        </div>

                        {/* PASSWORD */}
                        <div className="mb-3">
                            <label htmlFor="confirmpassword" className="form-label custom-label">
                                Confirm Password
                            </label>

                            <div className="input-wrapper">
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    className="form-control custom-input"
                                    id="confirmpassword"
                                    placeholder="Re-enter your new password"
                                />
                                <i
                                    className={`${showConfirmPassword
                                        ? "ri-eye-off-line"
                                        : "ri-eye-line"
                                        } input-icon`}
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    style={{ cursor: "pointer" }}
                                ></i>
                            </div>
                        </div>

                        {/* BUTTON */}
                        <button type="submit" className="ResetPassword-btn">
                            Set new password
                        </button>

                        {/* FOOTER */}
                        <p className="ResetPassword-text mt-3 text-center">
                            <span onClick={() => navigate("/login")}>
                                {" "}Back to Login
                            </span>
                        </p>

                    </form>
                </div>
            </div>


            {/* RIGHT SIDE */}
            <div className="right-ResetPassword">

                {/* Bottom Background Shape */}
                <div className="ResetPassword-bg-foot-wrapper">
                    <img
                        src="/Assets/Icons/Authentication/BgFootImage.svg"
                        alt="BgFootImage"
                        className="ResetPassword-bg-foot-img"
                    />
                </div>

                {/* Circle + Icons */}
                <div className="ResetPassword-circle-wrapper">
                    <img
                        src="/Assets/Icons/Authentication/ResetPasswordCircle.svg"
                        alt="ResetPasswordCircle"
                        className="ResetPassword-circle"
                    />
                </div>

                {/* Doctor */}
                <div className="ResetPassword-person-wrapper">
                    <img
                        src="/Assets/Icons/Authentication/ResetPasswordPerson.svg"
                        alt="Reset Password"
                        className="ResetPassword-person"
                    />
                </div>

            </div>
        </div>
    );
}