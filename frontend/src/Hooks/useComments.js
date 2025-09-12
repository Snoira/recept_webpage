import { useQuery, useMutation } from "@tanstack/react-query";
import { getComments as fetchComments, postComment, deleteComment } from "../API/comments.js";
import { useSession } from "./useSession.js";
import { useNavigate } from "react-router-dom";

export const useComments = (recipeId) => {
    const { user } = useSession();
    const navigate = useNavigate();

    const { data: comments, isLoading, refetch } = useQuery({
        queryKey: ['comments', recipeId],
        queryFn: () => fetchComments(recipeId),
        enabled: !!recipeId,
    });

    const postCommentMutation = useMutation({
        mutationFn: (newComment) => postComment(recipeId, newComment),
        enabled: !!user && !!recipeId,
        onSuccess: () => {
            refetch();
        }
    });

    const handlePostComment = (newComment) => {
        if (!user) {
            return navigate('/login');
        }
        postCommentMutation.mutate(newComment);
    };

    const deleteCommentMutation = useMutation({
        mutationFn: (commentId) => deleteComment(commentId),
        onSuccess: () => {
            refetch();
        }
    });

    return {
        comments,
        isLoading,
        postComment: handlePostComment,
        isPosting: postCommentMutation.isLoading,
        deleteComment: deleteCommentMutation.mutate,
        isDeleting: deleteCommentMutation.isLoading,
    };
};