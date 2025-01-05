import { useState } from "react";
import { Button, Grid2 } from "@mui/material";
import FormModel from "./FormModel";
import UserNameAvatar from "./UserNameAvatar";

function Login() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLogedIn, setIsLogedIn] = useState(false);

    return (
        <>
            <Grid2 container spacing={3} justifyContent="flex-start" alignItems="flex-start" sx={{
              position: "absolute",
              top: 16,
              left: 16,
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}>
                {!isLogedIn && (<Button onClick={() => setIsModalOpen(true)} variant="outlined" sx={{
                    backgroundColor: 'black',
                    color: 'white',
                    '&:hover': {
                        backgroundColor: 'rgba(10, 3, 3, 0.67)',
                        borderColor: 'rgba(251, 7, 51, 0.94)',
                    },
                    borderRadius:6
                }}>Login</Button>)}

                {isLogedIn && (<UserNameAvatar />)}
            </Grid2>
            {isModalOpen && (
                <FormModel setIsOpen={() => { setIsModalOpen(false) }} setIsLogedIn={() => { setIsLogedIn(true) }} />
            )}
        </>
    )
}

export default Login
