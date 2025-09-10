import { useQuery, useMutation } from "@tanstack/react-query";
import { getLikes, likeRecipe, unlikeRecipe } from '../API/likes.js'
import { useMemo } from "react";


export const useLikes = (recipeId) => {
    const { data: likes, refetch, isLoading } = useQuery({
        queryKey: ['likes', recipeId],
        queryFn: () => getLikes(recipeId),
        enabled: !!recipeId
    });

    const like = useMutation({
        mutationKey: ['likes', recipeId],
        mutationFn: () => likeRecipe(recipeId),
        onSuccess: () => {
            refetch();
        }
    });

    const unlike = useMutation({
        mutationKey: ['likes', recipeId],
        mutationFn: () => unlikeRecipe(recipeId),
        onSuccess: () => {
            refetch();
        }
    });


    return { likes, unlike, like };
};
