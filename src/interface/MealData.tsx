export interface Meal {
  id: string;
  name: string;
  description: string;
  image: string;
}

export interface MealDataResponse {
  _embedded: {
    mealResponseDTOList: Meal[];
  };
}
