import { Link } from "react-router";
import Login from "./Login";
import UserReducer, { UserContext, UserType } from "./UserReducer";
import { Box, Typography } from "@mui/material";
import { useReducer } from "react";

function NavBar() {
    const initialState: UserType = { firstName: "", lastName: "", email: "", password: "", address: "", phone: "" };
    const [user, userDispatch] = useReducer(UserReducer, initialState);

    return (<>
        <Box
            component="nav"
            sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "16px",
                backgroundColor: "background.paper",
            }}
        >
            <UserContext.Provider value={{ user, userDispatch }}>
                <Login />
            </UserContext.Provider>

            <Box sx={{ position: "absolute", top: 16, right: 16, display: "flex", gap: "16px" }}>
                <Typography
                    component={Link}
                    to="/home"
                    sx={{
                        textDecoration: "none",
                        color: "text.primary",
                        "&:hover": { textDecoration: "underline" },
                    }}
                >
                    Home
                </Typography>
                <span>|</span>
                <Typography
                    component={Link}
                    to="/about"
                    sx={{
                        textDecoration: "none",
                        color: "text.primary",
                        "&:hover": { textDecoration: "underline" },
                    }}
                >
                    About
                </Typography>
            </Box>
        </Box>
    </>)
}

export default NavBar;