import { useQuery, useMutation } from "@tanstack/react-query";
import { getLikes, likeRecipe, unlikeRecipe } from '../API/likes.js'
import { useSession } from "./useSession.js";
import { useNavigate } from "react-router-dom";

export const useLikes = (recipeId, authorId) => {
    const { user, isLoading } = useSession();
    const navigate = useNavigate();

    const isDisabled = !user || user._id === authorId;

    const { data: likes, refetch } = useQuery({
        queryKey: ['likes', recipeId],
        queryFn: () => getLikes(recipeId),
        enabled: !!recipeId,
    });

    const isLiked = !!user && likes?.includes(user._id);

    const like = useMutation({
        mutationKey: ['likes', recipeId],
        mutationFn: () => likeRecipe(recipeId),
        enabled: !!user && !isDisabled,
        onSuccess: () => {
            refetch();
        }
    });

    const unlike = useMutation({
        mutationKey: ['likes', recipeId],
        mutationFn: () => unlikeRecipe(recipeId),
        enabled: !!user && !isDisabled,
        onSuccess: () => {
            refetch();
        }
    });

    const handleLike = () => {
        if (!user && !isLoading) {
            return navigate('/login');
        }
        if (isLiked) {
            unlike.mutate();
        } else {
            like.mutate();
        }
    };

    return { likes, handleLike, isLiked, isDisabled };
};
