import { Injectable } from '@angular/core';
import * as dateFns from 'date-fns';

@Injectable({
  providedIn: 'root'
})
export class ToolsService {

  constructor() { }

  // Convert to Base 64
  public toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  })

  // Compare Dates
  async validateDate(initial, final) {

    console.log(initial, final);
    const splitDateInitial = initial.split('-');
    const splitDateFinal = final.split('-');
    const splitDayInitial = splitDateInitial[2].split('T');
    const splitDayFinal = splitDateFinal[2].split('T');
    const splitHourInitial = splitDayInitial[1].split(':');
    const splitHourFinal = splitDayFinal[1].split(':');

    const yearInitial = splitDateInitial[0];
    const yearFinal = splitDateFinal[0];
    const monthInitial = splitDateInitial[1];
    const monthFinal = splitDateFinal[1];
    const dayInitial = splitDayInitial[0];
    const dayFinal = splitDayFinal[0];
    const hourInitial = splitHourInitial[0];
    const hourFinal = splitHourFinal[0];
    const minuteInitial = splitHourInitial[1];
    const minuteFinal = splitHourFinal[1];


    const difference = dateFns.differenceInMinutes(
      new Date(yearFinal, monthFinal, dayFinal, hourFinal, minuteFinal, 0),
      new Date(yearInitial, monthInitial, dayInitial, hourInitial, minuteInitial, 0),

    );
    console.log(difference);

    if (difference >= 0) {
      return true;
    } else {
      return false;
    }
  }
}
