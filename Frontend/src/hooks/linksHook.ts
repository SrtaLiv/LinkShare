import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchLinksByUser, createLink, deleteLink, updateLink } from "../services/api";
import { Link } from "../types/Link";

export const useLinks = (username: string) => {
    return useQuery({
        queryKey: ['links', username],
        queryFn: () => fetchLinksByUser(username),
        staleTime: 1000 * 10, // 10 segundos
        enabled: !!username, // Evita que se ejecute si username es undefined
    });
};

export const useCreateLink = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (linkData: Link) => createLink(linkData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['links'] });
        },
    });
};

export const useDeleteLink = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (linkId: number) => deleteLink(linkId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['links'] });
        },
    });
};

export const useUpdateLink = (linkId: number) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (linkData: Link) => updateLink(linkId, linkData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['links'] });
            queryClient.invalidateQueries({ queryKey: ['links', linkId] });
        },
    });
};
