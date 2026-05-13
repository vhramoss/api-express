import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { useAuth } from "../contexts/authContext";
import { useNavigate, NavLink } from "react-router-dom";

function Header() {
    const { logout } = useAuth();
    const navigate = useNavigate();

    function handleLogout() {
        logout();
        navigate("/login");
    }
    
    return (
        <AppBar position="static">
            <Toolbar className="flex justify-between">
                {/* ✅ Logo / título */}
                <Typography variant="h6">
                API Express
                </Typography>

                {/* ✅ MENU DE NAVEGAÇÃO */}
                <div className="flex gap-6 items-center">
                <NavLink
                    to="/characters"
                    className={({ isActive }) =>
                    isActive
                        ? "font-bold underline"
                        : "opacity-80 hover:opacity-100"
                    }
                >
                    Characters
                </NavLink>

                <NavLink
                    to="/locations"
                    className="opacity-50 cursor-not-allowed"
                    onClick={(e) => e.preventDefault()}
                >
                    Locations
                </NavLink>

                <NavLink
                    to="/episodes"
                    className="opacity-50 cursor-not-allowed"
                    onClick={(e) => e.preventDefault()}
                >
                    Episodes
                </NavLink>
                </div>

                {/* ✅ Logout */}
                <Button color="inherit" onClick={handleLogout}>
                Logout
                </Button>
            </Toolbar>
            </AppBar>
        );
        }

        export default Header;
