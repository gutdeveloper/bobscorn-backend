import { differenceInMinutes } from "date-fns";

export const differenceInMinutesBetweenTwoDates = (date: string): number => {
    const lastPurchase = new Date(date);
    const currentDate = new Date();
    const oneMinute = differenceInMinutes(lastPurchase, currentDate);
    return Math.abs(oneMinute);
}