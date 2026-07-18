import '../styles/UnderDevelopment.css';

interface UnderDevelopmentProps {
    title: string;
}

export default function UnderDevelopment({
    title,
}: UnderDevelopmentProps) {
    return (
        <div className="development-page d-flex justify-content-center align-items-center">
            <div className="development-card py-4">

                {/* Animated Icon */}
                <div className="development-icon-wrapper">
                    <div className="development-ring">
                        <div className="development-icon">
                            <i className="ri-settings-3-line"></i>
                        </div>
                    </div>
                </div>

                {/* Badge */}
                <div className="development-badge mb-3">
                    <span className='py-2 px-3 fs-12 fw-600 text-primary'><i className="ri-circle-fill progress-dot me-2"></i>Under Development</span>
                </div>

                {/* Title */}
                <h2 className="fs-20 mb-0 fw-600">
                    {title}
                </h2>

                {/* Description */}
                <p className="development-description fs-14 fw-500">
                    This module is currently under development and will be
                    available soon. Our team is working to deliver the best
                    experience possible.
                </p>

                {/* Buttons */}
                <div className="d-flex justify-content-center gap-3 flex-wrap mt-4 mb-3">
                    <button
                        className="border-blue text-blue bg-white rounded-3 development-home-btn"
                        onClick={() => window.location.href = '/'}
                    >
                        Home
                        <i className="ri-home-5-line ms-2"></i>
                    </button>

                    <button
                        className="btn development-back-btn"
                        onClick={() => window.history.back()}
                    >
                        Go Back
                        <i className="ri-arrow-left-line ms-2"></i>
                    </button>
                </div>

                <hr className="my-3" />

                <p className="development-footer fs-16 fw-500">
                    Thank you for your patience <i className="ri-heart-fill fs-16" style={{color:"red"}}></i>
                </p>
            </div>
        </div>
    );
}