export interface Meal {
  id: string;
  name: string;
  description: string;
  image: string;
  _links: {
    self: { href: string };
    meals: { href: string };
  };
}

export interface MealData {
  _embedded: {
    mealList: Meal[];
  };
  _links: {
    self: { href: string };
  };
}
