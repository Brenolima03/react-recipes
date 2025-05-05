import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosPromise } from "axios";
import { URL_BASE } from '../config';
import { MealData } from "../interface/MealData";

const postData = async (data: MealData): AxiosPromise<any> => {
  const token = localStorage.getItem("authToken");

  try {
    const response = await axios.post(URL_BASE + "/meals", data, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      withCredentials: true
    });
    return response;
  } catch (error: any) {
    throw error;
  }
}

export function useMealDataMutate() {
  const queryClient = useQueryClient();

  const mutate = useMutation({
    mutationFn: postData,
    retry: 2,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["meal-data"] as const });
    }
  });
  return mutate;
}
