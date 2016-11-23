export default class DateHelper {
  constructor(nowFunction = null) {
    this.nowFunction = nowFunction || (() => {
      const now = new Date();
      now.setHours(0);
      now.setMinutes(0);
      now.setSeconds(0);
      now.setMilliseconds(0);

      return now;
    });
  }

  // Adapted from http://stackoverflow.com/a/10008120 from http://stackoverflow.com/questions/10008050/get-age-from-birthdate
  calculateAge(birthMonth, birthDay, userProvidedBirthYear) {
    const birthYear = this.getBirthYearForUserProvidedValue(userProvidedBirthYear);

    // This portion adapted from http://stackoverflow.com/a/10008120 from http://stackoverflow.com/questions/10008050/get-age-from-birthdate
    const todayDate = this.nowFunction();
    const todayYear = todayDate.getUTCFullYear();
    const todayMonth = todayDate.getUTCMonth();
    const todayDay = todayDate.getUTCDate();
    let age = todayYear - birthYear;

    if (todayMonth < (birthMonth - 1)) {
      age--;
    }

    if (((birthMonth - 1) == todayMonth) && (todayDay < birthDay)) {
      age--;
    }

    return age;
  }

  // Handle two digit years including 00
  getBirthYearForUserProvidedValue(birthYear) {
    // Prepend 0 as necessary
    if (birthYear >= 0 && birthYear <= 9) {
      return parseInt(`200${birthYear}`, 10);
    } else if (birthYear >= 10 && birthYear <= 99) {
      if (parseInt(`20${birthYear}`, 10) > this.nowFunction().getFullYear()) {
        return parseInt(`19${birthYear}`, 10);
      } else {
        return parseInt(`20${birthYear}`, 10);
      }
    }

    return birthYear;
  }

  static getAvailableMonthNumbers(days, year) {
    const allMonths = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    const isLeapYear = DateHelper.isLeapYear(year);

    if ((days >= 1 && days <= 28) || (isLeapYear && days === 29)) {
      return allMonths;
    } else if (days === 30 || (!isLeapYear && days === 29)) {
      return allMonths.filter(x => x !== 2);
    } else if (days === 31) {
      return allMonths.filter(x => x !== 2 && x !== 4 && x !== 6 && x !== 9 && x !== 11);
    } else {
      throw new Error('days must be between 1 and 31 inclusive.');
    }
  }

  static getDaysInMonth(monthNumber, year) {
    const isLeapYear = DateHelper.isLeapYear(year);

    switch (monthNumber) {
      case 1: return 31;
      case 2: return isLeapYear ? 29 : 28;
      case 3: return 31;
      case 4: return 30;
      case 5: return 31;
      case 6: return 30;
      case 7: return 31;
      case 8: return 31;
      case 9: return 30;
      case 10: return 31;
      case 11: return 30;
      case 12: return 31;
      default: throw new Error('monthNumber must be between 1 and 12.');
    }
  }

  // http://stackoverflow.com/a/16353241 from http://stackoverflow.com/questions/16353211/check-if-year-is-leap-year-in-javascript
  static isLeapYear(year) {
    return ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);
  }
}
