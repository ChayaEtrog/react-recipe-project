import { useContext, useState } from "react";
import { UserContext } from "./UserReducer";
import { Avatar, Box, Button, Grid2, IconButton } from "@mui/material";
import FormModel from "./FormModel";

function UserNameAvatar() {

    const { user } = useContext(UserContext);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(false);
    const [avatarColor, setAvatarColor] = useState('rgba(251, 7, 51, 0.94)'); 
    const colors = ['rgba(5, 253, 232, 0.92)', 
                    'rgba(251, 7, 51, 0.94)',
                    'black',
                    'rgba(253, 5, 5, 0.96)',
                    'rgba(253, 117, 5, 0.96)',
                    'rgba(5, 99, 122, 0.96)',
                    'rgba(42, 5, 253, 0.96)',
                    'rgba(116, 252, 118, 0.96)',
                    'rgba(82, 0, 98, 0.96)']; 

    const handleClose = () => {
        setAnchorEl(false);
    };

    const handleColorChange = (color: string) => {
        setAvatarColor(color);
        handleClose();
    };


    return <>
        <Grid2 >
            <IconButton onClick={() => setAnchorEl(!anchorEl)}>
                <Avatar sx={{ bgcolor: avatarColor ,width:48,height:48,fontSize:25}}>{user.firstName[0]}</Avatar>
            </IconButton>

            {anchorEl&&<div className="popup">
                <Box sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: 1,
                    p: 2,
                }}>
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
        <Grid2 >
            <span>{user.firstName} {user.lastName}</span>
        </Grid2>
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
            }}>update</Button>
        </Grid2>
        {
            isModalOpen && (
                <FormModel setIsOpen={() => setIsModalOpen(false)} />
            )
        }
    </>
}

export default UserNameAvatar;
