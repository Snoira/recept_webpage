import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { register, logIn, logOut, getUser } from "../API/auth";

export const useSession = () => {

    const queryClient = useQueryClient();

    const { isLoading, data: user, refetch: refetchUser } = useQuery({
        queryKey: ['user'],
        queryFn: getUser,
        staleTime: 5 * 60 * 1000,
        cacheTime: 30 * 60 * 1000,
        refetchOnWindowFocus: false,
    });


    const logInMutation = useMutation({
        mutationFn: logIn,
        onSuccess: () => { refetchUser() }
    });

    const logOutMutation = useMutation({
        mutationFn: logOut,
        onSuccess: () => { refetchUser() }
    });

    const registerMutation = useMutation({
        mutationFn: register,
        onSuccess: () => { refetchUser() }
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