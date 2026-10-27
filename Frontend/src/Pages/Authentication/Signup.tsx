import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../contexts/AuthContext";
import api, { getApiErrorMessage } from "../../services/api";
import ConfirmationModal from "../../GlobalHelpermodal/GlobalHelperModal";
import "../../styles/signup.css";

export default function Signup() {

    const [showPassword, setShowPassword] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const navigate = useNavigate();
    const { refreshSession } = useAuth();

    const handleSuccessModalClose = async () => {
        setShowSuccessModal(false);
        const authenticated = await refreshSession();
        if (authenticated) {
            navigate("/dashboard", { replace: true });
        } else {
            navigate("/login", {
                replace: true,
                state: { notice: "Account created successfully. Please log in." },
            });
        }
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError("");
        setIsSubmitting(true);

        try {
            await api.post("/auth/register", { name, email, password });
            setShowSuccessModal(true);
        } catch (requestError) {
            const authenticated = await refreshSession();
            if (authenticated) {
                navigate("/dashboard", { replace: true });
                return;
            }

            const message = getApiErrorMessage(requestError, "Unable to create your account. Please try again.");
            if (message.toLowerCase().includes("user already exists")) {
                navigate("/login", {
                    replace: true,
                    state: { notice: "An account with this email already exists. Please log in." },
                });
                return;
            }

            setError(message);
        } finally {
            setIsSubmitting(false);
        }
    };

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
                    <form onSubmit={handleSubmit}>
                        {error && <div className="alert alert-danger" role="alert">{error}</div>}

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
                                    autoComplete="username"
                                    required
                                    value={name}
                                    onChange={(event) => setName(event.target.value)}
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
                                    autoComplete="new-password"
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

                        {/* BUTTON */}
                        <button type="submit" className="signup-btn" disabled={isSubmitting}>
                            {isSubmitting ? "Creating account…" : "Sign Up"}
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
            <ConfirmationModal
                show={showSuccessModal}
                handleClose={() => { void handleSuccessModalClose(); }}
                variant="confirm"
                title="Account created"
                message="Account created successfully!"
                description="Welcome to Fiza Hospital. Your account is ready."
            />
        </div>
    );
}
