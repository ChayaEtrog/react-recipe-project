import { useState } from "react"; 
import { Button, Grid2 } from "@mui/material";  
import FormModel from "./FormModel"; 
import UserNameAvatar from "./UserNameAvatar"; 

function Login() {
    // State for controlling whether the modal is open or not
    const [isModalOpen, setIsModalOpen] = useState(false);

    // State for controlling whether the user is logged in or not
    const [isLogedIn, setIsLogedIn] = useState(false);

    // State for determining which type of form to show (either SIGNUP or LOGIN)
    const [typeOfButton, setTypeOfButton] = useState('');

    return (
        <>
            {/* Main container for the buttons, using Grid2 for layout */}
            <Grid2 container spacing={3} justifyContent="flex-start" alignItems="flex-start" sx={{
                position: "absolute",  
                top: 16,
                left: 16,
                display: "flex",
                alignItems: "center",
                gap: 1,
            }}>
                {/* If user is not logged in, show signup and login buttons */}
                {!isLogedIn && (
                    <div>
                        {/* Sign-up button that opens the modal and sets the type to 'SIGNUP' */}
                        <Button onClick={() => { setIsModalOpen(true); setTypeOfButton('SIGNUP') }} variant="outlined" sx={{
                            backgroundColor: 'black',  
                            color: 'white',  
                            '&:hover': {
                                backgroundColor: 'rgba(10, 3, 3, 0.67)',  
                                borderColor: 'rgba(251, 7, 51, 0.94)',  
                            },
                            borderRadius: 6
                        }}>
                            sign up
                        </Button>

                        {/* Login button that opens the modal and sets the type to 'LOGIN' */}
                        <Button onClick={() => { setIsModalOpen(true); setTypeOfButton('LOGIN') }} variant="outlined" sx={{
                            backgroundColor: 'white',  
                            color: 'black', 
                            borderColor: 'rgb(163, 163, 163)',  
                            marginLeft: '16px',  
                            '&:hover': {
                                backgroundColor: 'rgba(220, 219, 219, 0.46)',  
                                borderColor: 'rgba(251, 7, 51, 0.94)',  
                            },
                            borderRadius: 6 
                        }}>
                            Log in
                        </Button>
                    </div>
                )}

                {/* If user is logged in, display the UserNameAvatar component */}
                {isLogedIn && (<UserNameAvatar />)}
            </Grid2>

            {/* If the modal is open, display the FormModel component */}
            {isModalOpen && (
                <FormModel 
                    setIsOpen={() => { setIsModalOpen(false) }} 
                    type={typeOfButton}  
                    setIsLogedIn={() => { setIsLogedIn(true) }}  
                />
            )}
        </>
    );
}

export default Login;
