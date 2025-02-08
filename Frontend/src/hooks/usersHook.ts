import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { fetchSelf } from "../services/api";

const API_URL = "http://localhost:8080/api/auth/signup";
const API_URL_LOGIN = "http://localhost:8080/api/auth/login";

export const useRegisterUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userData: { email: string; password: string; username: string }) => {
      const response = await axios.post(API_URL, userData);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error) => {
      console.error("Error during registration:", error);
    },
  });
};

// Crear una función que maneje el login y devuelva el token
export const loginUser = async (userData: { email: string, password: string }) => {
  const response = await axios.post(API_URL_LOGIN, userData);
  if (response.status === 200) {
    return response.data.jwt; // Asume que el backend devuelve el token aquí
  }
  throw new Error('Invalid login credentials');
};

export const useUserData = () => {
  return useQuery({
      queryKey: ['users'],
      queryFn: () => fetchSelf(),
      staleTime: 1000 * 10, // 10 seconds
  });
}
