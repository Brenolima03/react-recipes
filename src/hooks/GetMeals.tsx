import { useQuery } from "@tanstack/react-query";
import axios, { AxiosPromise } from "axios";
import { URL_BASE } from '../config';
import { MealDataResponse } from "../interface/MealData";

const fetchData = async (): AxiosPromise<MealDataResponse> => {
  return axios.get(URL_BASE + "/meals");
}

export function useMealData() {
  const query = useQuery({
    queryFn: fetchData,
    queryKey: ["meal-data"],
    retry: 2
  })

  const meals = query.data?.data._embedded.mealResponseDTOList || [];

  return { ...query, data: meals };
}
