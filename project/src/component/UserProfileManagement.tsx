import { useContext, useState } from "react";  
import { UserContext } from "./UseReducer";  
import { Avatar, Box, Button, Grid2, IconButton } from "@mui/material";
import FormModel from "./FormModel";  

function UserProfileManagement() {
    const { user } = useContext(UserContext);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(false);
    const [avatarColor, setAvatarColor] = useState('rgb(235,214,167)'); 

    const colors = [
        'rgb(46,166,130)', 
        'rgba(251, 7, 51, 0.94)',
        'rgba(0, 0, 0, 0.96)',
        'rgba(218, 207, 0, 0.96)',
        'rgb(235,214,167)',
        'rgba(253, 117, 5, 0.96)',
        'rgba(5, 99, 122, 0.96)',
        'rgb(214,62,101)',
        'rgba(116, 252, 118, 0.96)',
    ];

    const handleClose = () => {
        setAnchorEl(false); 
    };

    const handleColorChange = (color: string) => {
        setAvatarColor(color); 
        handleClose(); 
    };

    return <>
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
        
        <Grid2 >
            <span style={{color:"black"}}>{user.firstName} {user.lastName}</span>
        </Grid2>

        <Grid2 >
            <IconButton onClick={() => setAnchorEl(!anchorEl)}>
                <Avatar sx={{ bgcolor: avatarColor, width: 48, height: 48, fontSize: 25 }}>
                    {user.email[0]}  
                </Avatar>
            </IconButton>

            {anchorEl && (
                <Box
                    sx={{
                        position: "absolute",
                        top: "100%",
                        right: 0,
                        mt: 1, 
                        borderRadius: 2,
                        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)", 
                        p: 2,
                        zIndex: 10, 
                        minWidth: 180, 
                    }}
                >
                    <Box
                        sx={{
                            display: "grid",
                            gridTemplateColumns: "repeat(3, 1fr)",
                            gap: 1,
                            backgroundColor:"white"
                        }}
                    >
                        {colors.map((color: string) => (
                            <Box
                                key={color}
                                onClick={() => handleColorChange(color)}
                                sx={{
                                    width: 50,
                                    height: 50,
                                    borderRadius: "50%",
                                    backgroundColor: color,
                                    cursor: "pointer",
                                    border: "2px solid white",
                                    boxShadow: "0 0 4px rgba(0,0,0,0.3)",
                                }}
                            />
                        ))}
                    </Box>
                </Box>
            )}
        </Grid2 >

        {isModalOpen && (
            <FormModel setIsOpen={() => setIsModalOpen(false)} type={'UPDATE'} />
        )}
    </>
}

export default UserProfileManagement;