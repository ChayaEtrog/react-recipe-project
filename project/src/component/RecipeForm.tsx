import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { TextField, Button, Box, Modal, Paper } from "@mui/material";
import { AppDispatch } from "../store/recipesStore";
import { useDispatch } from "react-redux";
import { addRecipe, Recipe, updateRecipe } from "../store/recipesSlice";
import IngredientsInput from "./IngredientInput";
import {  useState } from "react";



const recipeSchema = yup.object().shape({
    title: yup.string().required("title is required"),
    description: yup.string().required("description is required"),
    ingredients: yup.array().required("you must provide at least one ingredient"),
    instructions: yup.string().required("please provide instructions"),
});

function RecipeForm({ authorId, closeForm, recipe = { id: 0, title: "", description: "", ingredients: [], instructions: "", authorId: authorId } }: { authorId: number, closeForm: Function, recipe?: Recipe }) {
    const [open, setOpen] = useState(true);

    const dispatch = useDispatch<AppDispatch>();
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(recipeSchema),
        defaultValues: recipe
    });

    const onSubmit = (data: any) => {
        if (recipe.title==""){
            console.log({ authorId: authorId, ...data });
            
            dispatch(addRecipe({ authorId: authorId, ...data }))
        }
        else
          dispatch(updateRecipe({id: recipe.id, updatedRecipe: {...data}}))
        closeForm(false);
    }

    return (
        <>
            <Modal open={open} onClose={() => { setOpen(false); closeForm(false) }}>
                <Box
                    component={Paper}
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: 400,
                        p: 3,
                        display: "flex",
                        flexDirection: "column",
                        gap: 2,
                        outline: "none",
                    }}
                >
                    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                        <TextField
                            label="title"
                            variant="outlined"
                            margin="dense"
                            fullWidth
                            {...register("title")}
                            error={!!errors.title}
                            helperText={errors.title?.message}
                        />
                        <TextField
                            label="description"
                            variant="outlined"
                            margin="dense"
                            fullWidth
                            {...register("description")}
                            error={!!errors.description}
                            helperText={errors.description?.message}
                        />
                        <IngredientsInput control={control} name="ingredients" />
                        <TextField
                            label="instructions"
                            multiline
                            variant="outlined"
                            margin="dense"
                            fullWidth
                            {...register("instructions")}
                            error={!!errors.instructions}
                            helperText={errors.instructions?.message}
                        />
                        <Button type="submit" variant="outlined" color="primary" sx={{ alignSelf: "center", mt: 2 }}>
                            save
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </>
    );
};

export default RecipeForm;
