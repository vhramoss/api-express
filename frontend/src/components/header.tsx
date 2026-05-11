import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { useAuth } from "../contexts/authContext";
import { useNavigate } from "react-router-dom";

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
                <Typography variant="h6">
                    API Express
                </Typography>
                <Button color="inherit" onClick={handleLogout}>
                    Logout
                </Button>
            </Toolbar>
        </AppBar>
    )
}

export default Header;