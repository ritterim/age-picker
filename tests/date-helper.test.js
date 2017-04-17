import DateHelper from '../src/date-helper';

const nonLeapYear = 2015;
const leapYear = 2016;

function calculateAgeMacro(input, expected) {
  const now = new Date(2016, 0, 1);

  const result = new DateHelper(() => now).calculateAge(1, 1, input);

  expect(result).toBe(expected);
}

test('calculateAge for 1/1/2011', calculateAgeMacro.bind(this, 2011, 5));
test('calculateAge for 1/1/2000', calculateAgeMacro.bind(this, 2000, 16));
test('calculateAge for 1/1/1999', calculateAgeMacro.bind(this, 1999, 17));
test('calculateAge for 1/1/1950', calculateAgeMacro.bind(this, 1950, 66));

test('calculateAge for 1/1/11', calculateAgeMacro.bind(this, 11, 5));
test('calculateAge for 1/1/00', calculateAgeMacro.bind(this, 0, 16));
test('calculateAge for 1/1/99', calculateAgeMacro.bind(this, 99, 17));
test('calculateAge for 1/1/50', calculateAgeMacro.bind(this, 50, 66));

test('calculateAge for 7/1/2015 from 1/1/2016', () => {
  const now = new Date(2016, 0, 1);

  const result = new DateHelper(() => now).calculateAge(7, 1, 2015);

  expect(result).toBe(0);
});

test('calculateAge for 7/1/2014 from 1/1/2016', () => {
  const now = new Date(2016, 0, 1);

  const result = new DateHelper(() => now).calculateAge(7, 1, 2014);

  expect(result).toBe(1);
});

test('calculateAge for 7/1/2013 from 1/1/2016', () => {
  const now = new Date(2016, 0, 1);

  const result = new DateHelper(() => now).calculateAge(7, 1, 2013);

  expect(result).toBe(2);
});

test('calculateAge for 12/31/2010 from 1/1/2016', () => {
  const now = new Date(2016, 0, 1);

  const result = new DateHelper(() => now).calculateAge(12, 31, 2010);

  expect(result).toBe(5);
});

test('calculateAge for 1/1/2011 from 1/1/2016', () => {
  const now = new Date(2016, 0, 1);

  const result = new DateHelper(() => now).calculateAge(1, 1, 2011);

  expect(result).toBe(5);
});

test('calculateAge for 1/2/2011 from 1/1/2016', () => {
  const now = new Date(2016, 0, 1);

  const result = new DateHelper(() => now).calculateAge(1, 2, 2011);

  expect(result).toBe(4);
});

test('calculateAge for 7/1/2015 from 1/1/2016 UTC', () => {
  const now = new Date(Date.UTC(2016, 0, 1, 0, 0, 0));

  const result = new DateHelper(() => now).calculateAge(7, 1, 2015);

  expect(result).toBe(0);
});

test('calculateAge for 7/1/2014 from 1/1/2016 UTC', () => {
  const now = new Date(Date.UTC(2016, 0, 1, 0, 0, 0));

  const result = new DateHelper(() => now).calculateAge(7, 1, 2014);

  expect(result).toBe(1);
});

test('calculateAge for 7/1/2013 from 1/1/2016 UTC', () => {
  const now = new Date(Date.UTC(2016, 0, 1, 0, 0, 0));

  const result = new DateHelper(() => now).calculateAge(7, 1, 2013);

  expect(result).toBe(2);
});

test('calculateAge for 12/31/2010 from 1/1/2016 UTC', () => {
  const now = new Date(Date.UTC(2016, 0, 1, 0, 0, 0));

  const result = new DateHelper(() => now).calculateAge(12, 31, 2010);

  expect(result).toBe(5);
});

test('calculateAge for 1/1/2011 from 1/1/2016 UTC', () => {
  const now = new Date(Date.UTC(2016, 0, 1, 0, 0, 0));

  const result = new DateHelper(() => now).calculateAge(1, 1, 2011);

  expect(result).toBe(5);
});

test('calculateAge for 1/2/2011 from 1/1/2016 UTC', () => {
  const now = new Date(Date.UTC(2016, 0, 1, 0, 0, 0));

  const result = new DateHelper(() => now).calculateAge(1, 2, 2011);

  expect(result).toBe(4);
});

function getBirthYearForUserProvidedValueMacro(input, expected) {
  const now = new Date(2016, 0, 1);

  const result = new DateHelper(() => now).getBirthYearForUserProvidedValue(input);

  expect(result).toBe(expected);
}

test('getBirthYearForUserProvidedValue for 1939', getBirthYearForUserProvidedValueMacro.bind(this, 1939, 1939));
test('getBirthYearForUserProvidedValue for 39', getBirthYearForUserProvidedValueMacro.bind(this, 39, 1939));
test('getBirthYearForUserProvidedValue for 1949', getBirthYearForUserProvidedValueMacro.bind(this, 1949, 1949));
test('getBirthYearForUserProvidedValue for 49', getBirthYearForUserProvidedValueMacro.bind(this, 49, 1949));
test('getBirthYearForUserProvidedValue for 1950', getBirthYearForUserProvidedValueMacro.bind(this, 1950, 1950));
test('getBirthYearForUserProvidedValue for 50', getBirthYearForUserProvidedValueMacro.bind(this, 50, 1950));
test('getBirthYearForUserProvidedValue for 1951', getBirthYearForUserProvidedValueMacro.bind(this, 1951, 1951));
test('getBirthYearForUserProvidedValue for 51', getBirthYearForUserProvidedValueMacro.bind(this, 51, 1951));
test('getBirthYearForUserProvidedValue for 1999', getBirthYearForUserProvidedValueMacro.bind(this, 1999, 1999));
test('getBirthYearForUserProvidedValue for 99', getBirthYearForUserProvidedValueMacro.bind(this, 99, 1999));
test('getBirthYearForUserProvidedValue for 2000', getBirthYearForUserProvidedValueMacro.bind(this, 2000, 2000));
test('getBirthYearForUserProvidedValue for 0', getBirthYearForUserProvidedValueMacro.bind(this, 0, 2000));
test('getBirthYearForUserProvidedValue for 2001', getBirthYearForUserProvidedValueMacro.bind(this, 2001, 2001));
test('getBirthYearForUserProvidedValue for 1', getBirthYearForUserProvidedValueMacro.bind(this, 1, 2001));
test('getBirthYearForUserProvidedValue for 2015', getBirthYearForUserProvidedValueMacro.bind(this, 2015, 2015));
test('getBirthYearForUserProvidedValue for 15', getBirthYearForUserProvidedValueMacro.bind(this, 15, 2015));
test('getBirthYearForUserProvidedValue for 2016', getBirthYearForUserProvidedValueMacro.bind(this, 2016, 2016));
test('getBirthYearForUserProvidedValue for 16', getBirthYearForUserProvidedValueMacro.bind(this, 16, 2016));

test('getAvailableMonthNumbers should return expected value for day 15', () => {
  const result = DateHelper.getAvailableMonthNumbers(15, nonLeapYear);

  expect(result).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
});

test('getAvailableMonthNumbers should return expected value for day 28', () => {
  const result = DateHelper.getAvailableMonthNumbers(28, nonLeapYear);

  expect(result).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
});

test('getAvailableMonthNumbers should return expected value for day 29 non-leap year', () => {
  const result = DateHelper.getAvailableMonthNumbers(29, nonLeapYear);

  expect(result).toEqual([1, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
});

test('getAvailableMonthNumbers should return expected value for day 29 leap year', () => {
  const result = DateHelper.getAvailableMonthNumbers(29, leapYear);

  expect(result).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
});

test('getAvailableMonthNumbers should return expected value for day 30', () => {
  const result = DateHelper.getAvailableMonthNumbers(30, nonLeapYear);

  expect(result).toEqual([1, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
});

test('getAvailableMonthNumbers should return expected value for day 31', () => {
  const result = DateHelper.getAvailableMonthNumbers(31, nonLeapYear);

  expect(result).toEqual([1, 3, 5, 7, 8, 10, 12]);
});

test('getAvailableMonthNumbers should throw error for day 0', () => {
  expect(() => DateHelper.getAvailableMonthNumbers(0, nonLeapYear)).toThrowError('days must be between 1 and 31 inclusive.');
});

test('getAvailableMonthNumbers should throw error for day 32', () => {
  expect(() => DateHelper.getAvailableMonthNumbers(32, nonLeapYear)).toThrowError('days must be between 1 and 31 inclusive.');
});

test('getDaysInMonth should return expected value for January', () => {
  const result = DateHelper.getDaysInMonth(1, nonLeapYear);

  expect(result).toBe(31);
});

test('getDaysInMonth should return expected value for February in non-leap year', () => {
  const result = DateHelper.getDaysInMonth(2, nonLeapYear);

  expect(result).toBe(28);
});

test('getDaysInMonth should return expected value for February in leap year', () => {
  const result = DateHelper.getDaysInMonth(2, leapYear);

  expect(result).toBe(29);
});

test('getDaysInMonth should return expected value for March', () => {
  const result = DateHelper.getDaysInMonth(3, nonLeapYear);

  expect(result).toBe(31);
});

test('getDaysInMonth should return expected value for April', () => {
  const result = DateHelper.getDaysInMonth(4, nonLeapYear);

  expect(result).toBe(30);
});

test('getDaysInMonth should return expected value for May', () => {
  const result = DateHelper.getDaysInMonth(5, nonLeapYear);

  expect(result).toBe(31);
});

test('getDaysInMonth should return expected value for June', () => {
  const result = DateHelper.getDaysInMonth(6, nonLeapYear);

  expect(result).toBe(30);
});

test('getDaysInMonth should return expected value for July', () => {
  const result = DateHelper.getDaysInMonth(7, nonLeapYear);

  expect(result).toBe(31);
});

test('getDaysInMonth should return expected value for August', () => {
  const result = DateHelper.getDaysInMonth(8, nonLeapYear);

  expect(result).toBe(31);
});

test('getDaysInMonth should return expected value for September', () => {
  const result = DateHelper.getDaysInMonth(9, nonLeapYear);

  expect(result).toBe(30);
});

test('getDaysInMonth should return expected value for October', () => {
  const result = DateHelper.getDaysInMonth(10, nonLeapYear);

  expect(result).toBe(31);
});

test('getDaysInMonth should return expected value for November', () => {
  const result = DateHelper.getDaysInMonth(11, nonLeapYear);

  expect(result).toBe(30);
});

test('getDaysInMonth should return expected value for December', () => {
  const result = DateHelper.getDaysInMonth(12, nonLeapYear);

  expect(result).toBe(31);
});

test('getDaysInMonth should throw error for month 0', () => {
  expect(() => DateHelper.getDaysInMonth(0, nonLeapYear)).toThrowError('monthNumber must be between 1 and 12.');
});

test('isLeapYear returns false for non-leap year', () => {
  const result = DateHelper.isLeapYear(nonLeapYear);

  expect(result).toBe(false);
});

test('isLeapYear returns true for leap year', () => {
  const result = DateHelper.isLeapYear(leapYear);

  expect(result).toBe(true);
});

test('isLeapYear returns false for unexpected string value', () => {
  const result = DateHelper.isLeapYear('a_string_value');

  expect(result).toBe(false);
});
