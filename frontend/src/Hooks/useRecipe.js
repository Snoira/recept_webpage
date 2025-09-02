import { useQuery, useMutation } from "@tanstack/react-query";
import { getRecipes, createRecipe } from '../API/recipe.js'

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