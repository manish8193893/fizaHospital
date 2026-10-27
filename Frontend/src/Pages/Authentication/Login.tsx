import { useState, type FormEvent } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

import { useAuth } from "../../contexts/AuthContext";
import api, { getApiErrorMessage } from "../../services/api";
import ConfirmationModal from "../../GlobalHelpermodal/GlobalHelperModal";
import "../../styles/login.css";

export default function Login() {

    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const { refreshSession } = useAuth();
    const notice = (location.state as { notice?: string } | null)?.notice;

    const handleSuccessModalClose = async () => {
        setShowSuccessModal(false);
        const authenticated = await refreshSession();
        if (!authenticated) {
            setError("Login succeeded, but your session could not be verified. Please try again.");
            return;
        }

        const from = (location.state as { from?: { pathname?: string } } | null)?.from?.pathname;
        navigate(from && from !== "/login" ? from : "/dashboard", { replace: true });
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError("");
        setIsSubmitting(true);

        try {
            await api.post("/auth/login", { email, password });
            setShowSuccessModal(true);
        } catch (requestError) {
            setError(getApiErrorMessage(requestError, "Unable to log in. Please try again."));
        } finally {
            setIsSubmitting(false);
        }
    };

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
                    <form onSubmit={handleSubmit}>
                        {notice && <div className="alert alert-success" role="status">{notice}</div>}
                        {error && <div className="alert alert-danger" role="alert">{error}</div>}

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
                                    autoComplete="email"
                                    required
                                    value={email}
                                    onChange={(event) => setEmail(event.target.value)}
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
                                    autoComplete="current-password"
                                    required
                                    value={password}
                                    onChange={(event) => setPassword(event.target.value)}
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
                        <button type="submit" className="login-btn" disabled={isSubmitting}>
                            {isSubmitting ? "Logging in…" : "Login"}
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
            <ConfirmationModal
                show={showSuccessModal}
                handleClose={() => { void handleSuccessModalClose(); }}
                variant="confirm"
                title="Login successful"
                message="Welcome back!"
                description="You are signed in to Fiza Hospital."
            />
        </div>
    );
}
