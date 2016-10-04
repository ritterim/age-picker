export default class DateHelper {
  static getAvailableMonthNumbers(days, year) {
    const isLeapYear = DateHelper.isLeapYear(year);

    if (days >= 1 && days <= 28) {
      return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    } else if (isLeapYear && days === 29) {
      return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    } else if (!isLeapYear && days === 29) {
      return [1, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    } else if (days === 30) {
      return [1, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    } else if (days === 31) {
      return [1, 3, 5, 7, 8, 10, 12];
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

  // http://stackoverflow.com/a/7091965 from http://stackoverflow.com/questions/4060004/calculate-age-in-javascript
  static getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
  }
}
