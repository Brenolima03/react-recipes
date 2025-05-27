import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosPromise } from "axios";
import { URL_BASE } from '../config';

interface MealInput {
  name: string;
  description: string;
  image: string;
}

const postData = async (data: MealInput): AxiosPromise<any> => {
  const token = localStorage.getItem("authToken");

  try {
    const response = await axios.post(URL_BASE + "/meals", data, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      withCredentials: true
    });
    console.error(response)
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
      queryClient.invalidateQueries({ queryKey: ["meal-data"] });
    }
  });
  return mutate;
}
