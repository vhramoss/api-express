import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { useAuth } from "../contexts/authContext";

function Header() {
    const { logout } = useAuth();

    return (
        <AppBar position="static">
            <Toolbar className="flex justify-between">
                <Typography variant="h6">
                    API Express
                </Typography>
                <Button color="inherit" onClick={logout}>
                    Logout
                </Button>
            </Toolbar>
        </AppBar>
    )
}

export default Header;