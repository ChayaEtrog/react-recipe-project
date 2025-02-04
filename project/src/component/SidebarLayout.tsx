import { Avatar, Box, Divider, IconButton, Typography } from "@mui/material";
import { Recipe } from "../store/recipesSlice";
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useContext, useEffect, useState } from "react";
import { handleGetById } from "../services/profileService";
import ErrorMessage from "./ErrorMessage";
import { UserContext } from "./UseReducer";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import RecipeForm from "./RecipeForm";

function SidebarLayout({ recipe }: { recipe: Recipe }) {
    const [isFavorited, setIsFavorited] = useState(false);
    const [emailuser, setEmailUser] = useState('');
    const { user } = useContext(UserContext);
    const [isEditMode, setIsEditMode] = useState(false);

    useEffect(() => {   
        const fetchUser = async () => {
            try {
                const data = await handleGetById(recipe.authorId);
                setEmailUser(data.email);
            } catch (error) {
                <ErrorMessage message="User not found" />
            }
        };

        fetchUser();
    }, [recipe]);

    return (<>
        <Box sx={{ padding: 2, overflowY: 'auto', marginTop: '80px', maxHeight: 'calc(100vh - 80px)' }}>

            <Avatar sx={{ bgcolor: 'rgb(235,214,167)', width: 30, height: 30, fontSize: 13,position: 'absolute',top: '100px', right: 22, }}>
                {emailuser[0]}
            </Avatar>

            <IconButton
                sx={{
                    position: 'absolute',
                    top: '95px',
                    right: 55,
                    color: isFavorited ? 'red' : 'gray',
                }}
                onClick={() => setIsFavorited(!isFavorited)}
            >
                <FavoriteIcon />
            </IconButton>

            {((+user.userId)==recipe.authorId)&&<IconButton
                sx={{position: 'absolute',  top: '95px', right: 88, }}
                onClick={() =>setIsEditMode(true) }
            >
                <EditOutlinedIcon />
            </IconButton>}

            <Typography variant="h4" gutterBottom>
                {recipe.title}
            </Typography>

            <Divider sx={{ marginBottom: 2 }} />

            <Typography variant="h6" gutterBottom>
                Description:
            </Typography>
            <Typography>{recipe.description}</Typography>

            <Divider sx={{ marginBottom: 2 }} />

            <Typography variant="h6" gutterBottom >
                Ingredients:
            </Typography>
            <Box sx={{ marginBottom: 2 }}>
                {recipe.ingredients.map((ing, index) => (
                    <Typography key={index}>
                        {ing}
                    </Typography>
                ))}
            </Box>

            <Divider sx={{ marginBottom: 2 }} />

            <Typography variant="h6" gutterBottom>
                Instructions:
            </Typography>
            <Typography>{recipe.instructions}</Typography>
        </Box>
        {isEditMode &&<RecipeForm authorId={recipe.authorId} closeForm={()=>setIsEditMode(false)} recipe={recipe}/>}
    </>)
}
export default SidebarLayout;