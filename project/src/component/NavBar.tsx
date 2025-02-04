import { NavLink } from "react-router";
import UserAuth from "./UserAuth";
import { AppBar, Box, Toolbar } from "@mui/material";

function NavBar() {
    return (<>
   <AppBar
  position="fixed"
  sx={{
    top: 0,
    left: 0,
    right: 0,
    padding: '16px 0',
    backgroundColor: 'background.paper',
    zIndex: 1300,
    height: '80px',
    boxShadow: "none",
    borderBottom: "1px solid rgba(160, 159, 159, 0.42)"
  }}
>
  <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
    <Box sx={{ display: "flex", gap: "16px", textAlign: "right", alignItems: "center" }}>
      <NavLink
        to="/home"
        style={({ isActive }) => ({
          fontSize:'20px',
          color: isActive ? 'rgb(46,166,130)' : '#22262f',
          textDecoration: 'none',
          paddingRight:'12px'
        })}
      >
        Home
      </NavLink>
      <NavLink
        to="/about"
        style={({ isActive }) => ({
          fontSize:'20px',
          color: isActive ? 'rgb(46,166,130)' : '#22262f',
          textDecoration: 'none',
          paddingRight:'12px'
        })}
      >
        About
      </NavLink>
      <NavLink
        to="/recipes"
        style={({ isActive }) => ({
          fontSize:'20px',
          color: isActive ? 'rgb(46,166,130)' : '#22262f',
          textDecoration: 'none',
          paddingRight:'10px'
        })}
      >
        Recipes
      </NavLink>
    </Box>
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <UserAuth />
    </Box>
  </Toolbar>
</AppBar>

    </>)
}

export default NavBar;