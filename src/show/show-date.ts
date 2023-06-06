import { CurrentDates } from "../models/current-date";
import { dateStatus } from "../app";

// 表示させるフィールドを作成するクラス
export class DateShow {
  private week: string[];
  private dispDates: CurrentDates[];

  constructor() {
    this.week = ["日", "月", "火", "水", "木", "金", "土"];
    this.dispDates = dateStatus.getDates();
    this.createDateField(this.dispDates);
  }

  private markTodayColor(today: number, showedCalendarEl: HTMLTableElement) {
    const tdList = showedCalendarEl.querySelectorAll("td");
    for (const td of tdList) {
      if (td.textContent === today.toString()) {
        td.classList.add("active-date");
      }
    }
  }

  private addDateMark(
    dispDate: CurrentDates,
    showedCalendarEl: HTMLTableElement
  ) {
    const date = new Date();
    const currentYear = date.getFullYear();
    const currentMonth = date.getMonth();
    const today = date.getDate();
    if (
      currentYear === dispDate.currentYear &&
      currentMonth === dispDate.currentMonth &&
      today === dispDate.currentDate
    ) {
      this.markTodayColor(today, showedCalendarEl);
    }
  }

  private renderDates(dispDate: CurrentDates, createdEl: string) {
    const showCalendarEl = document.getElementById(
      "calendar_field"
    )! as HTMLTableElement;
    showCalendarEl.innerHTML = createdEl;
    this.addDateMark(dispDate, showCalendarEl);
  }

  createDateField(dispDates: CurrentDates[]) {
    const dispDate = dispDates.shift()!;
    let countDate = 1;
    let createEl = "";

    // 西暦と月を表示させる要素を作成
    createEl = `<h1>${dispDate.currentYear}/${dispDate.currentMonth + 1}</h1>`;

    // 曜日を表示させる要素を作成
    createEl += "<tr>";
    for (let day of this.week) {
      createEl += `<td>${day}</td>`;
    }
    createEl += "</tr>";

    // １ヶ月の日付を表示させる要素を作成
    for (let tr = 0; tr < 6; tr++) {
      createEl += "<tr>";
      for (let td = 0; td < 7; td++) {
        if (tr === 0 && td < dispDate.firstDay) {
          createEl += "<td></td>";
        } else if (countDate > dispDate.lastDate) {
          createEl += "<td></td>";
        } else {
          createEl += `<td>${countDate}</td>`;
          countDate++;
        }
      }
      createEl += "</tr>";
    }
    this.renderDates(dispDate, createEl);
  }
}
