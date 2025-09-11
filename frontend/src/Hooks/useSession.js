import { useQuery, useMutation } from "@tanstack/react-query";
import { register, logIn, logOut, getUser } from "../API/auth";

export const useSession = () => {
    const { isLoading, data: user, refetch } = useQuery({
        queryKey: ['user'],
        queryFn: getUser,
        staleTime: 5 * 60 * 1000,
        cacheTime: 30 * 60 * 1000,
        refetchOnWindowFocus: false,
    });

    const logInMutation = useMutation({
        mutationFn: logIn,
        mutationKey: ['user'],
        onSuccess: () => { refetch() }
    });

    const logOutMutation = useMutation({
        mutationFn: logOut,
        mutationKey: ['user'],
        onSuccess: () => { refetch() }
    });

    const registerMutation = useMutation({
        mutationFn: register,
        mutationKey: ['user'],
        onSuccess: () => { refetch() }
    });

    return {
        user,
        isLoading,
        logIn: logInMutation.mutate,
        logOut: logOutMutation.mutate,
        register: registerMutation.mutate,
    };
}