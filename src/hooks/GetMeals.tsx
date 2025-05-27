import { useQuery } from "@tanstack/react-query";
import axios, { AxiosPromise } from "axios";
import { URL_BASE } from '../config';
import { MealData } from "../interface/MealData";

const fetchData = async (): AxiosPromise<MealData> => {
  return axios.get(URL_BASE + "/meals");
}

export function useMealData() {
  const query = useQuery({
    queryFn: fetchData,
    queryKey: ["meal-data"],
    retry: 2
  });

  // Fix: correctly access mealList from _embedded
  const meals = query.data?.data._embedded?.mealList || [];

  return { ...query, data: meals };
}
