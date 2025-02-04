import { useContext, useEffect, useState } from "react";
import { fetchData, Recipe } from "../store/recipesSlice";
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, StoreType } from "../store/recipesStore";
import { Box, Drawer, LinearProgress, List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import ErrorMessage from "./ErrorMessage";
import SidebarLayout from "./SidebarLayout";
import { UserContext } from "./UseReducer";
import RecipeForm from "./RecipeForm";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import FlatwareIcon from '@mui/icons-material/Flatware';

function RecipesSidebar() {
    const { recipes: { receipesList: recipesList }, recipes: { error: loadError }, recipes: { loading: isLoad } } = useSelector((store: StoreType) => store);
    const dispatch = useDispatch<AppDispatch>();
    const [currentRecipe, setCurrnetRecipe] = useState<Recipe>()
    const { user } = useContext(UserContext);
    const [wantToAdd, setWantToAdd] = useState(false)

    useEffect(() => {
        dispatch(fetchData())
    }, [])


    return (
        <>
            {(loadError != "") && <ErrorMessage message={loadError} />}
            <Box sx={{ display: 'flex' }}>
                <Drawer
                    sx={{
                        width: 230,
                        flexShrink: 0,
                        '& .MuiDrawer-paper': {
                            width: 230,
                            boxSizing: 'border-box',
                            overflowY: 'auto',
                        },
                    }}
                    variant="permanent"
                    anchor="left"
                >
                    <Box sx={{ paddingTop: '80px' }}>
                        {isLoad && (
                            <div style={{ marginTop: '5px' }}>
                                <LinearProgress color="inherit" />
                            </div>
                        )}
                        <List>
                            {recipesList.map((recipe: any) => (
                                <ListItem key={recipe.id} disablePadding>
                                    <ListItemButton
                                        sx={{
                                            '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.08)' },
                                        }}
                                        onClick={() => setCurrnetRecipe(recipe)}
                                    >
                                        <FlatwareIcon style={{color:'rgb(229, 207, 160)'}} />
                                        <ListItemText primary={recipe.title} sx={{ textAlign: 'left' }} />
                                    </ListItemButton>
                                </ListItem>
                            ))}
                            {(user.userId !== '') &&
                                <ListItemButton
                                    sx={{                        
                                        '&:hover': { backgroundColor:'rgb(214,62,101)' },
                                    }}
                                    onClick={() => setWantToAdd(!wantToAdd)}
                                ><AddCircleOutlineIcon sx={{marginRight:'2px', height:'17px', color:'rgb(229, 207, 160)'}}/>add recipe</ListItemButton>}
                        </List>
                    </Box>
                </Drawer >

                <Box
                    sx={{
                        flexGrow: 1,
                        padding: 3,
                        textAlign: "left"
                    }}
                >
                    {currentRecipe && <SidebarLayout recipe={currentRecipe} />}
                </Box>
            </Box >
            {wantToAdd  && <RecipeForm authorId={+user.userId} closeForm={setWantToAdd} />}
        </>
    )
}

export default RecipesSidebar