import  { useState } from "react";
import { Box, TextField, Button, Chip, Typography } from "@mui/material";
import { Control, useController } from "react-hook-form";

const IngredientsInput = ({ control, name }:{control:Control<{ title: string; description: string; ingredients: any[]; instructions: string; }, any>,
                                             name:"title" | "description" | "ingredients" | "instructions" | `ingredients.${number}` | `ingredients.${number}.${string}`}) => {
    
    const {
        field: { value = [], onChange },
        fieldState: { error },
    } = useController({ name, control });

    const [ingredient, setIngredient] = useState("");

    const addIngredient = () => {
        if (ingredient.trim() === "") return;
        onChange([...value, ingredient.trim()]); 
        setIngredient(""); 
    };

    const removeIngredient = (index:number) => {
        onChange(value.filter((_:any, i:number) => i !== index));
    };

    return (
        <Box>
            <Box display="flex" gap={1}>
                <TextField
                    label="ingredient"
                    variant="outlined"
                    fullWidth
                    value={ingredient}
                    onChange={(e) => setIngredient(e.target.value)}
                />
                <Button variant="outlined" onClick={addIngredient}>+</Button>
            </Box>

            <Box display="flex" flexWrap="wrap" gap={1} mt={1}>
                {value.map((item:string, index:number) => (
                    <Chip key={index} label={item} onDelete={() => removeIngredient(index)} variant="outlined" />
                ))}
            </Box>

            {error && <Typography color="error">{error.message}</Typography>}
        </Box>
    );
};

export default IngredientsInput;