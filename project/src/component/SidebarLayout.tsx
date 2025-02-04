import { Avatar, Box, Divider, IconButton, Typography } from "@mui/material";
import { deleteRecipe, Recipe } from "../store/recipesSlice";
import FavoriteIcon from '@mui/icons-material/Favorite';
import {useEffect, useState } from "react";
import { handleGetById } from "../services/profileService";
import ErrorMessage from "./ErrorMessage";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import RecipeForm from "./RecipeForm";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/recipesStore";

function SidebarLayout({ recipe,userId }: { recipe: Recipe,userId:string }) {
    const [isFavorited, setIsFavorited] = useState(false);
    const [emailuser, setEmailUser] = useState('');
    const [isEditMode, setIsEditMode] = useState(false);
    const dispatch = useDispatch<AppDispatch>();

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

            <Avatar sx={{ bgcolor: 'rgb(235,214,167)', width: 30, height: 30, fontSize: 13, position: 'absolute', top: '100px', right: 22, }}>
                {emailuser[0]}
            </Avatar>

            <IconButton
                sx={{ position: 'absolute', top: '95px', right: 55, color: isFavorited ? 'red' : 'gray', }}
                onClick={() => setIsFavorited(!isFavorited)}
            >
                <FavoriteIcon />
            </IconButton>
            {((+userId) == recipe.authorId) && <>
            <IconButton
                sx={{position: 'absolute',top: '95px',right: 88}}
                onClick={()=>dispatch(deleteRecipe({recipeId: recipe.id, userId:userId}))}
            >
                <DeleteOutlineIcon />
            </IconButton>

           <IconButton
                sx={{ position: 'absolute', top: '95px', right: 122, }}
                onClick={() => setIsEditMode(true)}
            >
                <EditOutlinedIcon />
            </IconButton></>}

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
        {isEditMode && <RecipeForm authorId={recipe.authorId} closeForm={() => setIsEditMode(false)} recipe={recipe} />}
    </>)
}
export default SidebarLayout;