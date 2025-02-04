import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export type Recipe = {
    id: number,
    title: string,
    description: string,
    ingredients: string[],
    instructions: string,
    authorId: number
}

export const fetchData = createAsyncThunk('recipes/fetch',
    async (_, thunkAPI) => {
        try {
            console.log('in async thunk');
            const response = await axios.get('http://localhost:3000/api/recipes')
            return response.data
        }
        catch (e: any) {
            return thunkAPI.rejectWithValue(e.message)
        }
    }
)

export const addRecipe = createAsyncThunk('recipes/add',
    async (recipe: Recipe, thunkAPI) => {
        try {
            const response = await axios.post('http://localhost:3000/api/recipes',
                recipe,
                {
                    headers: { "user-id": "" + recipe.authorId }
                })
            return response.data.recipe
        }
        catch (e: any) {
            return thunkAPI.rejectWithValue(e.message)
        }
    }
)

export const updateRecipe = createAsyncThunk(
    'recipes/update',
    async ({ id, updatedRecipe }: { id: number, updatedRecipe: Partial<Recipe> }, thunkAPI) => {
        try {
            const response = await axios.put(
                `http://localhost:3000/api/recipes/${id}`,
                updatedRecipe,
                {
                    headers: { "user-id": "" + updatedRecipe.authorId }
                }
            );
            return response.data.recipe;
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.message);
        }
    }
);

export const deleteRecipe = createAsyncThunk(
    'recipes/delete',
    async ({recipeId,userId}:{recipeId: number,userId:string}, thunkAPI) => {
        try {
            await axios.delete(`http://localhost:3000/api/recipes/${recipeId}`, {
                headers: { "user-id": userId} 
            });
            return recipeId; 
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.message);
        }
    }
);

const recipesSlice = createSlice({
    name: 'recipes',
    initialState: { receipesList: [] as Recipe[], loading: true, error: "" },
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchData.pending,
                (state) => {
                    state.loading = true
                }
            )
            .addCase(fetchData.fulfilled,
                (state, action) => {                    
                    state.receipesList = action.payload
                    state.loading = false
                })
            .addCase(fetchData.rejected,
                (state) => {
                    state.error = "failed to reload recipes"
                    state.loading = false
                    console.log('failed');
                }
            )
            .addCase(addRecipe.pending,
                (state) => {
                    state.loading = true
                })
            .addCase(addRecipe.fulfilled,
                (state, action) => {
                    state.loading = false
                    state.receipesList.push(action.payload)

                })
            .addCase(addRecipe.rejected,
                (state) => {
                    state.error = "failed to add recipe"
                    state.loading = false
                    console.log('failed');
                }
            )
            .addCase(updateRecipe.pending,
                (state) => {
                    state.loading = true
                })
            .addCase(updateRecipe.fulfilled,
                (state, action) => {
                    state.loading = false
                    const index = state.receipesList.findIndex(recipe => recipe.id === action.payload.id);
                    if (index !== -1) {
                        console.log(state.receipesList[index]);
                        console.log(index);
                        
                        state.receipesList[index] = action.payload;
                    }

                })
            .addCase(updateRecipe.rejected,
                (state) => {
                    state.error = "failed to add recipe"
                    state.loading = false
                    console.log('failed');
                }
            )
            .addCase(deleteRecipe.pending,
                (state) => {
                    state.loading = true
                })
            .addCase(deleteRecipe.fulfilled,
                (state, action) => {
                    state.loading = false
                    state.receipesList = state.receipesList.filter(recipe => recipe.id !== action.payload);
                })
            .addCase(deleteRecipe.rejected,
                (state) => {
                    state.error = "failed to add recipe"
                    state.loading = false
                    console.log('failed');
                }
            )
    }
});

export default recipesSlice;