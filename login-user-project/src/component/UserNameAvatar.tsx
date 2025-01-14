import { useContext, useState } from "react";  
import { UserContext } from "./UseReducer";  
import { Avatar, Box, Button, Grid2, IconButton } from "@mui/material";
import FormModel from "./FormModel";  

function UserNameAvatar() {
    // Accessing user data from the UserContext using useContext hook
    const { user } = useContext(UserContext);

    // State for controlling the modal visibility
    const [isModalOpen, setIsModalOpen] = useState(false);

    // State for controlling the popup visibility (to choose avatar color)
    const [anchorEl, setAnchorEl] = useState(false);

    // State for controlling the background color of the avatar
    const [avatarColor, setAvatarColor] = useState('rgba(251, 7, 51, 0.94)'); 

    // List of predefined colors to choose from for the avatar background
    const colors = [
        'rgba(5, 253, 232, 0.92)', 
        'rgba(251, 7, 51, 0.94)',
        'black',
        'rgba(253, 5, 5, 0.96)',
        'rgba(253, 117, 5, 0.96)',
        'rgba(5, 99, 122, 0.96)',
        'rgba(42, 5, 253, 0.96)',
        'rgba(116, 252, 118, 0.96)',
        'rgba(82, 0, 98, 0.96)'
    ];

    // Function to close the color selection popup
    const handleClose = () => {
        setAnchorEl(false); 
    };

    // Function to handle the color change when a user clicks on a color
    const handleColorChange = (color: string) => {
        setAvatarColor(color); 
        handleClose(); 
    };

    return <>
        {/* This is the container for the avatar and color change options */}
        <Grid2 >
            {/* IconButton that triggers the popup to select a color when clicked */}
            <IconButton onClick={() => setAnchorEl(!anchorEl)}>
                <Avatar sx={{ bgcolor: avatarColor, width: 48, height: 48, fontSize: 25 }}>
                    {user.email[0]}  
                </Avatar>
            </IconButton>

            {/* Popup appears when anchorEl is true */}
            {anchorEl && <div className="popup">
                <Box sx={{
                    display: 'grid',  
                    gridTemplateColumns: 'repeat(3, 1fr)', 
                    gap: 1, 
                    p: 2,  
                }}>
                    {/* Loop through the colors array and create color options */}
                    {colors.map((color) => (
                        <Box
                            key={color}  
                            onClick={() => handleColorChange(color)}  
                            sx={{
                                width: 50, 
                                height: 50,
                                borderRadius: '50%',  
                                backgroundColor: color,  
                                cursor: 'pointer', 
                                border: '2px solid white',  
                                boxShadow: '0 0 4px rgba(0,0,0,0.3)', 
                            }}
                        />
                    ))}
                </Box>
            </div>}
        </Grid2 >

        {/* Display user's full name */}
        <Grid2 >
            <span>{user.firstName} {user.lastName}</span>
        </Grid2>

        {/* Button to trigger modal for updating user details */}
        <Grid2 >
            <Button onClick={() => setIsModalOpen(true)} variant="outlined" sx={{
                backgroundColor: 'white',
                color: 'black',
                borderColor: 'rgb(163, 163, 163)',
                '&:hover': {
                    backgroundColor: 'rgba(220, 219, 219, 0.46)',
                    borderColor: avatarColor, 
                },
                borderRadius: 6  
            }}>
                update
            </Button>
        </Grid2>

        {/* Show the FormModel modal if isModalOpen is true */}
        {isModalOpen && (
            <FormModel setIsOpen={() => setIsModalOpen(false)} type={'UPDATE'} />
        )}
    </>
}

export default UserNameAvatar;
