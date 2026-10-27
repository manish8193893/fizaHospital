import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";


export default function Logout() {
    const { logout } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        void logout().finally(() => navigate("/login", { replace: true }));
    }, [logout, navigate]);

    return (
        <div className="auth-loading d-flex align-items-center justify-content-center min-vh-100" role="status">Signing you out…</div>
    )
}
