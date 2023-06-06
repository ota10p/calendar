import { DateStatus } from "./state/date-status";
import { DateShow } from "./show/show-date";

export const dateStatus = DateStatus.getInstance();
export const dateShow = new DateShow();
