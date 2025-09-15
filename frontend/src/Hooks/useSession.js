import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { register, logIn, logOut, getUser } from "../API/auth";
import { useNavigate } from "react-router-dom";

export const useSession = () => {

    const queryClient = useQueryClient();

    const navigate = useNavigate();

    const { isLoading, data: user, refetch: refetchUser } = useQuery({
        queryKey: ['user'],
        queryFn: getUser,
        staleTime: 5 * 60 * 1000,
        cacheTime: 30 * 60 * 1000,
        refetchOnWindowFocus: false,
    });


    const logInMutation = useMutation({
        mutationFn: logIn,
        onSuccess: () => {
            refetchUser();
            navigate("/", { replace: true });
        }
    });

    const logOutMutation = useMutation({
        mutationFn: logOut,
        onSuccess: () => {
            refetchUser();
            navigate("/", { replace: true });
        }
    });

    const registerMutation = useMutation({
        mutationFn: register,
        onSuccess: () => {
            refetchUser();
            navigate("/", { replace: true });
        }
    });

    return {
        user,
        isLoading,
        logIn: logInMutation,
        logInFunc: logInMutation.mutateAsync,
        logOut: logOutMutation.mutateAsync,
        register: registerMutation.mutateAsync,
    };
}