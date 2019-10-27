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

    const splitDateInitial = initial.split('/');
    const splitDateFinal = final.split('/');
    const splitYearInitial = splitDateInitial[2].split(' ');
    const splitYearFinal = splitDateFinal[2].split(' ');
    const splitHourInitial = splitYearInitial[1].split(':');
    const splitHourFinal = splitYearFinal[1].split(':');

    const yearInitial = splitYearInitial[0];
    const yearFinal = splitYearFinal[0];
    const monthInitial = splitDateInitial[1];
    const monthFinal = splitDateFinal[1];
    const dayInitial = splitDateInitial[0];
    const dayFinal = splitDateFinal[0];

    const hourInitial = splitHourInitial[0];
    const hourFinal = splitHourFinal[0];
    const minuteInitial = splitHourInitial[1];
    const minuteFinal = splitHourFinal[1];


    const difference = dateFns.differenceInMinutes(
      new Date(yearFinal, monthFinal, dayFinal, hourFinal, minuteFinal, 0),
      new Date(yearInitial, monthInitial, dayInitial, hourInitial, minuteInitial, 0),

    );

    if (difference >= 0) {
      return true;
    } else {
      return false;
    }
  }


  async formatDate(data) {
    const dataSplit =  data.split(' ');
    const date =  dataSplit[0];
    const time =  dataSplit[1];
    const dateSplit =  date.split('/');
    const day =  dateSplit[0];
    const month =  dateSplit[1];
    const year =  dateSplit[2];

    const finalDate = `${year}-${month}-${day} ${time}`;
    // const result = dateFns.format(new Date(year, month -1, day, ))
    return finalDate;
  }

  formatFrontDate(data) {
    const splitDate = data.split('-');
    const splitDay = splitDate[2].split('T');
    const splitHour = splitDay[1].split(':');

    const year = splitDate[0];
    const month = splitDate[1];
    const day = splitDay[0];
    const hour = splitHour[0];
    const minute = splitHour[1];

    const result = dateFns.format(new Date(year, month - 1, day, hour, minute), 'dd/MM/yyyy HH:mm');
    return result;
  }

  formatFrontTimeDate(data) {
    const splitDate = data.split('-');
    const splitDay = splitDate[2].split('T');
    const splitHour = splitDay[1].split(':');

    const year = splitDate[0];
    const month = splitDate[1];
    const day = splitDay[0];
    const hour = splitHour[0];
    const minute = splitHour[1];

    const result = dateFns.format(new Date(year, month - 1, day, hour, minute), 'HH:mm');
    return result;
  }

  formatFrontDateWithoutTime(data) {
    const splitDate = data.split('-');
    const splitDay = splitDate[2].split('T');
    const splitHour = splitDay[1].split(':');

    const year = splitDate[0];
    const month = splitDate[1];
    const day = splitDay[0];
    const hour = splitHour[0];
    const minute = splitHour[1];

    const result = dateFns.format(new Date(year, month - 1, day, hour, minute), 'dd/MM/yyyy');
    return result;
  }
}
