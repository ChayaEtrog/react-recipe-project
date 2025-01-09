import { useState } from "react";
import { Button, Grid2 } from "@mui/material";
import FormModel from "./FormModel";
import UserNameAvatar from "./UserNameAvatar";

function Login() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLogedIn, setIsLogedIn] = useState(false);
const[typeOfButton,setTypeOfButton]=useState('');
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
                {!isLogedIn && (
                    <div>
                    <Button onClick={() => {setIsModalOpen(true); setTypeOfButton('SIGNUP')}} variant="outlined" sx={{
                    backgroundColor: 'black',
                    color: 'white',
                    '&:hover': {
                        backgroundColor: 'rgba(10, 3, 3, 0.67)',
                        borderColor: 'rgba(251, 7, 51, 0.94)',
                    },
                    borderRadius: 6
                }}>sign up</Button>
                <Button onClick={() =>{ setIsModalOpen(true); setTypeOfButton('LOGIN')}} variant="outlined" sx={{
                    backgroundColor: 'white',
                    color: 'black',
                    borderColor: 'rgb(163, 163, 163)',
                    marginLeft:'16px',
                    '&:hover': {
                        backgroundColor: 'rgba(220, 219, 219, 0.46)',
                        borderColor: 'rgba(251, 7, 51, 0.94)',
                    },
                    borderRadius: 6
                }}>Log in</Button>
                </div>
                )}

                {isLogedIn && (<UserNameAvatar />)}
            </Grid2>

            {isModalOpen && (
                <FormModel setIsOpen={() => { setIsModalOpen(false) }} type={typeOfButton} setIsLogedIn={() => { setIsLogedIn(true) }} />
            )}
        </>
    )
}

export default Login
