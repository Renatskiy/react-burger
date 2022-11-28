import { typeIngridient } from "../types/types";
export const sortArray = (
  array: typeIngridient[],
  from: number,
  to: number
) => {
  const el = array.splice(from, 1)[0];
  array.splice(to, 0, el);
  return array;
};
