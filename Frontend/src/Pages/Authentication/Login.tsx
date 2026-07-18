import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import "../../styles/login.css";

export default function Login() {

    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    return (
        <div className="login-page d-flex">

            {/* LEFT SIDE */}
            <div className="left-login d-flex justify-content-center align-items-center">

                <div className="login-card">

                    {/* LOGO */}
                    <div className="d-flex align-items-center mb-3">
                        <img src="/Assets/Images/ShardaLogo1.png" alt="Logo" width={70} height={70} />

                        <h2 className="gradient-text mb-0 ms-2 cursor-pointer">
                            Management dashboard
                        </h2>
                    </div>

                    {/* HEADING */}
                    <div className="mb-3">
                        <h3 className="fs-32 fw-500">Login</h3>

                        <p className="fs-14 text-secondary mb-0 text-nowrap">
                            Log in using your email and password to access and manage your files.
                        </p>
                    </div>

                    {/* FORM */}
                    <form>

                        {/* EMAIL */}
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label custom-label">
                                Email or Username{" "}<span className="text-danger">*</span>
                            </label>

                            <div className="input-wrapper">
                                <input
                                    type="email"
                                    className="form-control custom-input"
                                    id="email"
                                    placeholder="Enter your username or email"
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

                        {/* OPTIONS */}
                        <div className="d-flex justify-content-between align-items-center mb-4 login-options">

                            <NavLink to="/reset-password" className="forgot-link">
                                Forgot Password?
                            </NavLink>

                            <div className="d-flex align-items-center gap-2">
                                <label className="remember-text mb-0">
                                    Remember me
                                </label>

                                <input type="checkbox" />
                            </div>

                        </div>

                        {/* BUTTON */}
                        <button type="submit" className="login-btn">
                            Login
                        </button>

                        {/* FOOTER */}
                        <p className="signup-text">
                            New on our platform?
                            <span onClick={() => navigate("/signup")}>
                                {" "}Create an account
                            </span>
                        </p>

                    </form>
                </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="right-login">

                {/* Bottom Background Shape */}
                <div className="login-bg-foot-wrapper">
                    <img
                        src="/Assets/Icons/Authentication/BgFootImage.svg"
                        alt="BgFootImage"
                        className="login-bg-foot-img"
                    />
                </div>

                {/* Circle + Icons */}
                <div className="login-circle-wrapper">
                    <img
                        src="/Assets/Icons/Authentication/LoginCircle.svg"
                        alt="LoginCircle"
                        className="login-circle"
                    />
                </div>

                {/* Doctor */}
                <div className="login-person-wrapper">
                    <img
                        src="/Assets/Icons/Authentication/LoginPerson.svg"
                        alt="Login Illustration"
                        className="login-person"
                    />
                </div>

            </div>
        </div>
    );
}