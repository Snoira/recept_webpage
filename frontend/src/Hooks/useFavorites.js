import { useQuery, useMutation } from "@tanstack/react-query";
import { getFavorites, addToFavorites, removeFromFavorites, getFavoritesPopulated } from '../API/favorites.js'
import { useSession } from "./useSession.js";
import { useNavigate } from "react-router-dom";

export const useFavorites = (recipeId) => {
    const { user, isLoading } = useSession();
    const navigate = useNavigate();

    const { data: favorites, refetch } = useQuery({
        queryKey: ['favorites', recipeId],
        queryFn: getFavorites,
        enabled: !!recipeId && !!user,
    });

    const isFavorite = !!favorites && favorites.includes(recipeId);

    const addFavoriteMutation = useMutation({
        mutationFn: () => addToFavorites(recipeId),
        enabled: !!user && !!recipeId,
        onSuccess: () => {
            refetch();
        }
    });

    const removeFavoriteMutation = useMutation({
        mutationFn: () => removeFromFavorites(recipeId),
        enabled: !!user && !!recipeId,
        onSuccess: () => {
            refetch();
        }
    });

    const handleFavorite = () => {
        if (!user && !isLoading) {
            return navigate('/login');
        }
        if (isFavorite) {
            removeFavoriteMutation.mutate();
        } else {
            addFavoriteMutation.mutate();
        }
    };

    return {
        isFavorite,
        handleFavorite
    };
};

export const useFavoriteRecipes = () => {
    const { data, isLoading } = useQuery({
        queryKey: ['favoritesPopulated'],
        queryFn: getFavoritesPopulated,
    });

    return {
        favoriteRecipes: data,
        isLoadingFavoriteRecipes: isLoading,
    };
}