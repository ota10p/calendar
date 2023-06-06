import { CurrentDates } from "../models/current-date";
import { dateShow } from "../app";

// 日付の状態を管理するクラス
export class DateStatus {
  private static instance: DateStatus;
  private currentDates: CurrentDates[] = [];

  private constructor() {
    const date = new Date();
    const lastDate = new Date(
      date.getFullYear(),
      date.getMonth() + 1,
      0
    ).getDate();
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    const dates: CurrentDates = {
      currentYear: date.getFullYear(),
      currentMonth: date.getMonth(),
      currentDate: date.getDate(),
      lastDate: lastDate,
      firstDay: firstDay,
    };
    this.currentDates.push(dates);
    this.addListener();
  }

  static getInstance() {
    if (this.instance) {
      return this.instance;
    }
    return (this.instance = new DateStatus());
  }

  private isJanuary(month: number): boolean {
    if (month === 0) {
      return true;
    }
    return false;
  }

  private isDecember(month: number): boolean {
    if (month === 11) {
      return true;
    }
    return false;
  }

  private prevMonth() {
    const currentDates = this.getDates();
    const prevDates = currentDates.shift()!;

    if (this.isJanuary(prevDates.currentMonth)) {
      //1月の時にprevボタンは12月を表示。前の年の情報を入手
      prevDates.lastDate = new Date(
        prevDates.currentYear,
        prevDates.currentMonth,
        0
      ).getDate();
      prevDates.currentYear -= 1;
      prevDates.currentMonth = 11;
      prevDates.firstDay = new Date(
        prevDates.currentYear,
        prevDates.currentMonth,
        1
      ).getDay();
    } else {
      prevDates.lastDate = new Date(
        prevDates.currentYear,
        prevDates.currentMonth,
        0
      ).getDate();
      prevDates.currentMonth -= 1;
      prevDates.firstDay = new Date(
        prevDates.currentYear,
        prevDates.currentMonth,
        1
      ).getDay();
    }
    this.currentDates.unshift(prevDates);
    dateShow.createDateField(this.currentDates);
  }

  private nextMonth() {
    const currentDates = this.getDates();
    const nextDates = currentDates.shift()!;

    if (this.isDecember(nextDates.currentMonth)) {
      //12月の時にnextボタンは1月を表示。次の年の情報を入手
      nextDates.currentYear += 1;
      nextDates.currentMonth = 0;
      nextDates.lastDate = new Date(
        nextDates.currentYear,
        nextDates.currentMonth + 1,
        0
      ).getDate();
      nextDates.firstDay = new Date(
        nextDates.currentYear,
        nextDates.currentMonth,
        1
      ).getDay();
    } else {
      nextDates.currentMonth += 1;
      nextDates.lastDate = new Date(
        nextDates.currentYear,
        nextDates.currentMonth + 1,
        0
      ).getDate();
      nextDates.firstDay = new Date(
        nextDates.currentYear,
        nextDates.currentMonth,
        1
      ).getDay();
    }
    this.currentDates.unshift(nextDates);
    dateShow.createDateField(this.currentDates);
  }

  private addListener() {
    const prevBtn = document.getElementById("prev_btn")! as HTMLAnchorElement;
    const nextBtn = document.getElementById("next_btn")! as HTMLAnchorElement;
    prevBtn.addEventListener("click", this.prevMonth.bind(this));
    nextBtn.addEventListener("click", this.nextMonth.bind(this));
  }

  getDates(): CurrentDates[] {
    return this.currentDates.slice();
  }
}
