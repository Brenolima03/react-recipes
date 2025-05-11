import { useQuery } from "@tanstack/react-query";
import axios, { AxiosPromise } from "axios";
import { URL_BASE } from '../config';
import { MealData } from "../interface/MealData";

const fetchData = async (): AxiosPromise<MealData[]> => {
  const response = axios.get(URL_BASE + "/meals");
  return response;
}

export function useMealData() {
  const query = useQuery({
    queryFn: fetchData,
    queryKey: ["meal-data"],
    retry: 2
  })
  return {...query, data: query.data?.data}
}
