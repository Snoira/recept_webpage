import { useQuery, useMutation } from "@tanstack/react-query";
import { getRecipes, createRecipe, getRecipeByID } from '../API/recipe.js'

export const useRecipe = () => {
    const { data, isLoading, error } = useQuery({
        queryKey: ['recipes'],
        queryFn: getRecipes
    })

    const create = useMutation({
        mutationFn: createRecipe,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['recipes'] })
        },
        onError: (error) => {
            console.error('Error creating recipe:', error);
        }
    })

    return {
        recipes: data,
        isLoading,
        error,
        create
    }
}

export const useRecipeById = (id) => {
    const { data, isLoading, error } = useQuery({
        queryKey: ['recipes', id],
        queryFn: () => getRecipeByID(id),
        enabled: !!id // only run the query if id is truthy
    })

    return {
        recipe: data,
        isLoading,
        error
    }
}