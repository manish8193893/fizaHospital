import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "../../styles/signup.css";

export default function Signup() {

    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    return (
        <div className="signup-page d-flex">

            {/* LEFT SIDE */}
            <div className="left-signup d-flex justify-content-center align-items-center">

                <div className="signup-card">

                    {/* LOGO */}
                    <div className="d-flex align-items-center mb-3">
                        <img src="/Assets/Images/ShardaLogo1.png" alt="Logo" width={70} height={70} />

                        <h2 className="gradient-text mb-0 ms-2">
                            Management dashboard
                        </h2>
                    </div>

                    {/* HEADING */}
                    <div className="mb-3">
                        <h3 className="fs-32 fw-500">Sign Up</h3>

                        <p className="fs-14 text-secondary mb-0 text-nowrap">
                            Make your Hospital management easy!
                        </p>
                    </div>

                    {/* FORM */}
                    <form>

                        {/* USERNAME */}
                        <div className="mb-3">
                            <label htmlFor="username" className="form-label custom-label">
                                Username{" "}<span className="text-danger">*</span>
                            </label>

                            <div className="input-wrapper">
                                <input
                                    type="text"
                                    className="form-control custom-input"
                                    id="username"
                                    placeholder="Enter your username"
                                />

                                <i className="ri-at-line input-icon"></i>
                            </div>
                        </div>

                        {/* EMAIL */}
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label custom-label">
                                Email{" "}<span className="text-danger">*</span>
                            </label>

                            <div className="input-wrapper">
                                <input
                                    type="email"
                                    className="form-control custom-input"
                                    id="email"
                                    placeholder="Enter your email"
                                />

                                <i className="ri-mail-line input-icon"></i>
                            </div>
                        </div>

                        {/* PASSWORD */}
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label custom-label">
                                Password{" "}<span className="text-danger">*</span>
                            </label>

                            <div className="input-wrapper">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    className="form-control custom-input"
                                    id="password"
                                    placeholder="Enter your password"
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

                        {/* BUTTON */}
                        <button type="submit" className="signup-btn">
                            Sign Up
                        </button>

                        {/* FOOTER */}
                        <p className="signup-text">
                            Already have an account?&nbsp;
                            <span onClick={() => navigate("/login")}>
                                {" "}Sign in instead
                            </span>
                        </p>

                    </form>
                </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="right-signup">

                {/* Bottom Background Shape */}
                <div className="signup-bg-foot-wrapper">
                    <img
                        src="/Assets/Icons/Authentication/BgFootImage.svg"
                        alt="BgFootImage"
                        className="signup-bg-foot-img"
                    />
                </div>

                {/* Circle + Icons */}
                <div className="signup-circle-wrapper">
                    <img
                        src="/Assets/Icons/Authentication/LoginCircle.svg"
                        alt="LoginCircle"
                        className="signup-circle"
                    />
                </div>

                {/* Doctor */}
                <div className="signup-person-wrapper">
                    <img
                        src="/Assets/Icons/Authentication/SignupPerson.svg"
                        alt="Sign Up"
                        className="signup-person"
                    />
                </div>

            </div>
        </div>
    );
}