import { formatRelative } from "date-fns";
import { ru } from "date-fns/locale";

const formatDate = (date: string) => {
  return formatRelative(new Date(date), new Date(), {
    locale: ru,
  });
};

export default formatDate;
