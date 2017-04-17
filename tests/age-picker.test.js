import AgePicker from '../src/age-picker';
import DateHelper from '../src/date-helper';

beforeEach(() => {
  document.body.innerHTML = '';
});

function addElement(value) {
  const element = document.createElement('input');
  element.value = value;
  element.setAttribute('data-age-picker', true);

  document.body.appendChild(element);

  return element;
}

function addDirectEntryOnlyElement(value) {
  const directEntryOnlyElement = document.createElement('input');
  directEntryOnlyElement.value = value;
  directEntryOnlyElement.setAttribute('data-age-picker-direct-entry-only', true);

  document.body.appendChild(directEntryOnlyElement);

  return directEntryOnlyElement;
}

test('constructor should set default configuration', () => {
  const agePicker = new AgePicker();

  expect(agePicker.configuration.dataAttribute).toBe('data-age-picker');
});

test('constructor should override with provided configuration', () => {
  const agePicker = new AgePicker({ dataAttribute: 'data-test' });

  expect(agePicker.configuration.dataAttribute).toBe('data-test');
});

test('constructor should apply defaults with provided configuration', () => {
  const agePicker = new AgePicker({ dataAttribute: 'data-test' });

  expect(agePicker.configuration.prefixClass).toBe('age-picker');
});

test('constructor should throw error when configuration dataAttribute does not start with "data-"', () => {
  expect(() => new AgePicker({ dataAttribute: 'test' }))
    .toThrowError('configuration dataAttribute must start with "data-".');
});

test('init should default to document.body', () => {
  addElement();

  new AgePicker().init();

  expect(document.body.querySelectorAll('.age-picker-container').length).toBe(1);
});

test('init(domScope) should use provided domScope', () => {
  addElement();

  const domScope = document.createElement('div');

  const element2 = document.createElement('input');
  element2.setAttribute('data-age-picker', true);

  domScope.appendChild(element2);

  new AgePicker().init(domScope);

  expect(domScope.querySelectorAll('.age-picker-container').length).toBe(1);
});

test('init should wire up multiple data- attribute items', () => {
  addElement();

  const element2 = document.createElement('input');
  element2.setAttribute('data-age-picker', true);

  document.body.appendChild(element2);

  new AgePicker().init();

  expect(document.body.querySelectorAll('.age-picker-container').length).toBe(2);
});

test('init should wire up both normal and direct entry only items', () => {
  addElement();
  addDirectEntryOnlyElement();

  new AgePicker().init();

  expect(document.body.querySelectorAll('.age-picker-container').length).toBe(2);
});

test('init should throw if a DOM item is not provided', () => {
  expect(() => new AgePicker().init(null)).toThrowError('domScope must be provided.');
});

test('create should create expected assets on passed in element', () => {
  const element = addElement();

  new AgePicker().create(element);

  expect(document.body.querySelectorAll('.age-picker-container').length).toBe(1);

  const container = document.body.querySelector('.age-picker-container');

  expect(container.querySelectorAll('.age-picker-month').length).toBe(1);
  expect(container.querySelectorAll('.age-picker-day').length).toBe(1);
  expect(container.querySelectorAll('input[type="hidden"]').length).toBe(1);
});

test('create direct entry only should create expected assets on passed in element', () => {
  const element = addDirectEntryOnlyElement();

  new AgePicker().create(element);

  expect(document.body.querySelectorAll('.age-picker-container').length).toBe(1);

  const container = document.body.querySelector('.age-picker-container');

  expect(container.querySelectorAll('.age-picker-month').length).toBe(0);
  expect(container.querySelectorAll('.age-picker-day').length).toBe(0);
  expect(container.querySelectorAll('input[type="hidden"]').length).toBe(1);
});

test('create should use existing age value if one exists', () => {
  const element = addElement(25);

  new AgePicker().create(element);

  const container = document.body.querySelector('.age-picker-container');

  expect(container.querySelector('input[type="hidden"]').value).toBe('25');
});

test('create should use existing date value if one exists', () => {
  const now = new Date();

  // Go back 25 years and 1 month from now
  const element = addElement(
    `${now.getMonth() - 1 + 1}/${now.getDate()}/${now.getFullYear() - 25}`);

  new AgePicker().create(element);

  const container = document.body.querySelector('.age-picker-container');

  expect(container.querySelector('input[type="hidden"]').value).toBe('25');
});

test('create direct entry only should use existing age value if one exists', () => {
  const element = addDirectEntryOnlyElement(25);

  new AgePicker().create(element);

  const container = document.body.querySelector('.age-picker-container');

  expect(container.querySelector('input[type="hidden"]').value).toBe('25');
});

test('create direct entry only should use existing date value if one exists', () => {
  const now = new Date();

  // Go back 25 years and 1 month from now
  const element = addDirectEntryOnlyElement(
    `${now.getMonth() - 1 + 1}/${now.getDate()}/${now.getFullYear() - 25}`);

  new AgePicker().create(element);

  const container = document.body.querySelector('.age-picker-container');

  expect(container.querySelector('input[type="hidden"]').value).toBe('25');
});

test('create should not clear existing value from element if one exists', () => {
  const element = addElement(25);

  new AgePicker().create(element);

  expect(element.value).toBe('25');
});

test('create direct entry only should not clear existing value from element if one exists', () => {
  const element = addDirectEntryOnlyElement(25);

  new AgePicker().create(element);

  expect(element.value).toBe('25');
});

test('create should set hidden field value for single digit age value', () => {
  const element = addElement();

  new AgePicker().create(element);

  element.value = 5;
  element.dispatchEvent(new window.Event('keyup'));

  const hiddenInput = document.body.querySelector('.age-picker-container input[type="hidden"]');

  expect(hiddenInput.value).toBe('5');
});

test('create direct entry only should set hidden field value for single digit age value', () => {
  const element = addDirectEntryOnlyElement();

  new AgePicker().create(element);

  element.value = 5;
  element.dispatchEvent(new window.Event('keyup'));

  const hiddenInput = document.body.querySelector('.age-picker-container input[type="hidden"]');

  expect(hiddenInput.value).toBe('5');
});

test('create should set hidden field value for two digit age value', () => {
  const element = addElement();

  new AgePicker().create(element);

  element.value = 21;
  element.dispatchEvent(new window.Event('keyup'));

  const hiddenInput = document.body.querySelector('.age-picker-container input[type="hidden"]');

  expect(hiddenInput.value).toBe('21');
});

test('create direct entry only should set hidden field value for two digit age value', () => {
  const element = addDirectEntryOnlyElement();

  new AgePicker().create(element);

  element.value = 21;
  element.dispatchEvent(new window.Event('keyup'));

  const hiddenInput = document.body.querySelector('.age-picker-container input[type="hidden"]');

  expect(hiddenInput.value).toBe('21');
});

test('create should set hidden field value for three digit age value', () => {
  const element = addElement();

  new AgePicker().create(element);

  element.value = 101;
  element.dispatchEvent(new window.Event('keyup'));

  const hiddenInput = document.body.querySelector('.age-picker-container input[type="hidden"]');

  expect(hiddenInput.value).toBe('101');
});

test('create direct entry only should set hidden field value for three digit age value', () => {
  const element = addDirectEntryOnlyElement();

  new AgePicker().create(element);

  element.value = 101;
  element.dispatchEvent(new window.Event('keyup'));

  const hiddenInput = document.body.querySelector('.age-picker-container input[type="hidden"]');

  expect(hiddenInput.value).toBe('101');
});

test('create should set blank hidden field value for year value only', () => {
  const element = addElement();

  new AgePicker().create(element);

  element.value = 1990;
  element.dispatchEvent(new window.Event('keyup'));

  const hiddenInput = document.body.querySelector('.age-picker-container input[type="hidden"]');

  expect(hiddenInput.value).toBe('');
});

test('create direct entry only should set age for four digit value', () => {
  const element = addDirectEntryOnlyElement();

  new AgePicker().create(element);

  element.value = 1990;
  element.dispatchEvent(new window.Event('keyup'));

  const hiddenInput = document.body.querySelector('.age-picker-container input[type="hidden"]');

  expect(hiddenInput.value).toBe('1990');
});

test('create should set hidden field value for date string value', () => {
  const element = addElement();

  new AgePicker().create(element);

  const now = new Date();
  // Go back 5 years and 1 month from now
  element.value = `${now.getMonth() - 1 + 1}/${now.getDate()}/${now.getFullYear() - 5}`;
  element.dispatchEvent(new window.Event('keyup'));

  const hiddenInput = document.body.querySelector('.age-picker-container input[type="hidden"]');

  expect(hiddenInput.value).toBe('5');
});

test('create direct entry only should set hidden field value for date string value', () => {
  const element = addDirectEntryOnlyElement();

  new AgePicker().create(element);

  const now = new Date();
  // Go back 5 years and 1 month from now
  element.value = `${now.getMonth() - 1 + 1}/${now.getDate()}/${now.getFullYear() - 5}`;
  element.dispatchEvent(new window.Event('keyup'));

  const hiddenInput = document.body.querySelector('.age-picker-container input[type="hidden"]');

  expect(hiddenInput.value).toBe('5');
});

function directInputMacro(dateString, expectedAge) {
  const element = addElement();

  new AgePicker().create(element);

  element.value = dateString;
  element.dispatchEvent(new window.Event('keyup'));

  const hiddenInput = document.body.querySelector('.age-picker-container input[type="hidden"]');

  expect(hiddenInput.value).toBe(expectedAge.toString());
}

test('1/1/1999', directInputMacro.bind(this, '1/1/1999', new DateHelper().calculateAge(1, 1, 1999)));
test('01/01/1999', directInputMacro.bind(this, '01/01/1999', new DateHelper().calculateAge(1, 1, 1999)));
test('1-1-1999', directInputMacro.bind(this, '1-1-1999', new DateHelper().calculateAge(1, 1, 1999)));
test('01-1-1999', directInputMacro.bind(this, '01-1-1999', new DateHelper().calculateAge(1, 1, 1999)));
test('1/1/99', directInputMacro.bind(this, '1/1/99', new DateHelper().calculateAge(1, 1, 1999)));
test('1-01-99', directInputMacro.bind(this, '1-01-99', new DateHelper().calculateAge(1, 1, 1999)));
test('1999-1-1', directInputMacro.bind(this, '1999-1-1', new DateHelper().calculateAge(1, 1, 1999)));
test('1999-01-01', directInputMacro.bind(this, '1999-01-01', new DateHelper().calculateAge(1, 1, 1999)));
test('1/1/51', directInputMacro.bind(this, '1/1/51', new DateHelper().calculateAge(1, 1, 1951)));
test('1/1/50', directInputMacro.bind(this, '1/1/50', new DateHelper().calculateAge(1, 1, 1950)));
test('1/1/49', directInputMacro.bind(this, '1/1/49', new DateHelper().calculateAge(1, 1, 1949)));
test('1/1/02', directInputMacro.bind(this, '1/1/02', new DateHelper().calculateAge(1, 1, 2002)));

test('7/1/1999', directInputMacro.bind(this, '7/1/1999', new DateHelper().calculateAge(7, 1, 1999)));
test('07/01/1999', directInputMacro.bind(this, '07/01/1999', new DateHelper().calculateAge(7, 1, 1999)));

test('7 1 1999', directInputMacro.bind(this, '7 1 1999', '7 1 1999'));
test('07 01 1999', directInputMacro.bind(this, '07 01 1999', '07 01 1999'));

test('Jan 1 1999', directInputMacro.bind(this, 'Jan 1 1999', new DateHelper().calculateAge(1, 1, 1999)));
test('January 1 1999', directInputMacro.bind(this, 'January 1 1999', new DateHelper().calculateAge(1, 1, 1999)));
test('Feb 1 1999', directInputMacro.bind(this, 'Feb 1 1999', new DateHelper().calculateAge(2, 1, 1999)));
test('February 1 1999', directInputMacro.bind(this, 'February 1 1999', new DateHelper().calculateAge(2, 1, 1999)));
test('Mar 1 1999', directInputMacro.bind(this, 'Mar 1 1999', new DateHelper().calculateAge(3, 1, 1999)));
test('March 1 1999', directInputMacro.bind(this, 'March 1 1999', new DateHelper().calculateAge(3, 1, 1999)));
test('Apr 1 1999', directInputMacro.bind(this, 'Apr 1 1999', new DateHelper().calculateAge(4, 1, 1999)));
test('April 1 1999', directInputMacro.bind(this, 'April 1 1999', new DateHelper().calculateAge(4, 1, 1999)));
test('May 1 1999', directInputMacro.bind(this, 'May 1 1999', new DateHelper().calculateAge(5, 1, 1999)));
test('Jun 1 1999', directInputMacro.bind(this, 'Jun 1 1999', new DateHelper().calculateAge(6, 1, 1999)));
test('June 1 1999', directInputMacro.bind(this, 'June 1 1999', new DateHelper().calculateAge(6, 1, 1999)));
test('Jul 1 1999', directInputMacro.bind(this, 'Jul 1 1999', new DateHelper().calculateAge(7, 1, 1999)));
test('July 1 1999', directInputMacro.bind(this, 'July 1 1999', new DateHelper().calculateAge(7, 1, 1999)));
test('Aug 1 1999', directInputMacro.bind(this, 'Aug 1 1999', new DateHelper().calculateAge(8, 1, 1999)));
test('August 1 1999', directInputMacro.bind(this, 'August 1 1999', new DateHelper().calculateAge(8, 1, 1999)));
test('Sep 1 1999', directInputMacro.bind(this, 'Sep 1 1999', new DateHelper().calculateAge(9, 1, 1999)));
test('September 1 1999', directInputMacro.bind(this, 'September 1 1999', new DateHelper().calculateAge(9, 1, 1999)));
test('Oct 1 1999', directInputMacro.bind(this, 'Oct 1 1999', new DateHelper().calculateAge(10, 1, 1999)));
test('October 1 1999', directInputMacro.bind(this, 'October 1 1999', new DateHelper().calculateAge(10, 1, 1999)));
test('Nov 1 1999', directInputMacro.bind(this, 'Nov 1 1999', new DateHelper().calculateAge(11, 1, 1999)));
test('November 1 1999', directInputMacro.bind(this, 'November 1 1999', new DateHelper().calculateAge(11, 1, 1999)));
test('Dec 31 1999', directInputMacro.bind(this, 'Dec 31 1999', new DateHelper().calculateAge(12, 31, 1999)));
test('December 31 1999', directInputMacro.bind(this, 'December 31 1999', new DateHelper().calculateAge(12, 31, 1999)));

test('DEC 1 1999', directInputMacro.bind(this, 'DEC 1 1999', new DateHelper().calculateAge(12, 1, 1999)));
test('DECEMBER 1 1999', directInputMacro.bind(this, 'DECEMBER 1 1999', new DateHelper().calculateAge(12, 1, 1999)));

test('Dec1 1999', directInputMacro.bind(this, 'Dec1 1999', new DateHelper().calculateAge(12, 1, 1999)));
test('Decemb1 1999', directInputMacro.bind(this, 'Decemb1 1999', new DateHelper().calculateAge(12, 1, 1999)));
test('December1 1999', directInputMacro.bind(this, 'December1 1999', new DateHelper().calculateAge(12, 1, 1999)));

test('1 Dec 1999', directInputMacro.bind(this, '1 Dec 1999', new DateHelper().calculateAge(12, 1, 1999)));
test('01 Dec 1999', directInputMacro.bind(this, '01 Dec 1999', new DateHelper().calculateAge(12, 1, 1999)));
test('1 Dec 99', directInputMacro.bind(this, '1 Dec 99', new DateHelper().calculateAge(12, 1, 1999)));
test('01 Dec 99', directInputMacro.bind(this, '01 Dec 99', new DateHelper().calculateAge(12, 1, 1999)));

test('1999 Dec 1', directInputMacro.bind(this, '1999 Dec 1', new DateHelper().calculateAge(12, 1, 1999)));
test('1999 1 Dec', directInputMacro.bind(this, '1999 1 Dec', new DateHelper().calculateAge(12, 1, 1999)));

test('00 Dec 1', directInputMacro.bind(this, '00 Dec 1', new DateHelper().calculateAge(12, 1, 2000)));
test('00 1 Dec', directInputMacro.bind(this, '00 1 Dec', new DateHelper().calculateAge(12, 1, 2000)));
test('Dec 1 00', directInputMacro.bind(this, 'Dec 1 00', new DateHelper().calculateAge(12, 1, 2000)));
test('Dec 1 00', directInputMacro.bind(this, 'Dec 1 00', new DateHelper().calculateAge(12, 1, 2000)));

test('Dec 1 30', directInputMacro.bind(this, 'Dec 1 30', new DateHelper().calculateAge(12, 1, 1930)));
test('1 Dec 30', directInputMacro.bind(this, '1 Dec 30', new DateHelper().calculateAge(12, 1, 1930)));

test('Dec 10 30', directInputMacro.bind(this, 'Dec 10 30', new DateHelper().calculateAge(12, 10, 1930)));
test('10 Dec 30', directInputMacro.bind(this, '10 Dec 30', new DateHelper().calculateAge(12, 10, 1930)));

test('Dec 1 01', directInputMacro.bind(this, 'Dec 1 01', new DateHelper().calculateAge(12, 1, 2001)));
test('1 Dec 01', directInputMacro.bind(this, '1 Dec 01', new DateHelper().calculateAge(12, 1, 2001)));

test('1-Dec-1999', directInputMacro.bind(this, '1-Dec-1999', new DateHelper().calculateAge(12, 1, 1999)));
test('01-Dec-1999', directInputMacro.bind(this, '01-Dec-1999', new DateHelper().calculateAge(12, 1, 1999)));
test('1-Dec-99', directInputMacro.bind(this, '1-Dec-99', new DateHelper().calculateAge(12, 1, 1999)));
test('01-Dec-99', directInputMacro.bind(this, '01-Dec-99', new DateHelper().calculateAge(12, 1, 1999)));

test('December 1', directInputMacro.bind(this, 'December 1', 'December 1'));
test('Dec 1', directInputMacro.bind(this, 'Dec 1', 'Dec 1'));

test('create should set hidden field value when year, month, and day specified', () => {
  const element = addElement();

  new AgePicker().create(element);

  element.value = new Date().getFullYear() - 21;
  element.dispatchEvent(new window.Event('keyup'));

  const monthSelect = document.body.querySelector('.age-picker-month');
  monthSelect.selectedIndex = new Date().getMonth() + 1;
  monthSelect.dispatchEvent(new window.Event('change'));

  const daySelect = document.body.querySelector('.age-picker-day');
  daySelect.selectedIndex = new Date().getDate();
  daySelect.dispatchEvent(new window.Event('change'));

  const hiddenInput = document.body.querySelector('.age-picker-container input[type="hidden"]');

  expect(hiddenInput.value).toBe('21');
});

test('create should throw if no element is provided', () => {
  expect(() => new AgePicker().create()).toThrowError('element must be provided.');
});

test('create should raise change event on hiddenElement when value change occurs', () => {
  const element = addElement();

  new AgePicker().create(element);

  let changeRaisedCount = 0;
  const hiddenInput = document.body.querySelector('.age-picker-container input[type="hidden"]');
  hiddenInput.addEventListener('change', () => (changeRaisedCount++));

  element.value = 21;
  element.dispatchEvent(new window.Event('keyup'));

  expect(changeRaisedCount).toBe(1);
});

test('create should not raise change event on hiddenElement when value is modified to the same value', () => {
  const element = addElement();

  new AgePicker().create(element);

  let changeRaisedCount = 0;
  const hiddenInput = document.body.querySelector('.age-picker-container input[type="hidden"]');
  hiddenInput.addEventListener('change', () => (changeRaisedCount++));

  element.value = 21;
  element.dispatchEvent(new window.Event('keyup'));

  element.value = 21;
  element.dispatchEvent(new window.Event('keyup'));

  expect(changeRaisedCount).toBe(1);
});

test('create should raise ageChanged on element when age is modified', () => {
  const element = addElement();

  new AgePicker().create(element);

  let ageChangedRaisedCount = 0;
  element.addEventListener('ageChanged', () => (ageChangedRaisedCount++));

  element.value = 21;
  element.dispatchEvent(new window.Event('keyup'));

  expect(ageChangedRaisedCount).toBe(1);
});

test('create should raise ageChanged on element when age is cleared', () => {
  const element = addElement();

  new AgePicker().create(element);

  element.value = 21;
  element.dispatchEvent(new window.Event('keyup'));

  let ageChangedRaisedCount = 0;
  element.addEventListener('ageChanged', () => (ageChangedRaisedCount++));

  element.value = '';
  element.dispatchEvent(new window.Event('keyup'));

  expect(ageChangedRaisedCount).toBe(1);
});

test('create should not raise ageChanged on element when age is changed to same value', () => {
  const element = addElement();

  new AgePicker().create(element);

  element.value = 21;
  element.dispatchEvent(new window.Event('keyup'));

  let ageChangedRaisedCount = 0;
  element.addEventListener('ageChanged', () => (ageChangedRaisedCount++));

  element.value = 21;
  element.dispatchEvent(new window.Event('keyup'));

  expect(ageChangedRaisedCount).toBe(0);
});

test('create should raise ageChanged on element with value set on event', () => {
  const element = addElement();

  new AgePicker().create(element);

  const ageChangedRaisedEvents = [];
  element.addEventListener('ageChanged', e => (ageChangedRaisedEvents.push(e)));

  element.value = 21;
  element.dispatchEvent(new window.Event('keyup'));

  expect(ageChangedRaisedEvents.every(x => x.value == 21)).toBe(true);
});

test('create should hide non-applicable days when month selected', () => {
  const element = addElement();

  new AgePicker().create(element);

  const monthSelect = document.body.querySelector('.age-picker-month');

  monthSelect.selectedIndex = 11;
  monthSelect.dispatchEvent(new window.Event('change'));

  // Verify month is November
  expect('November').toBe(monthSelect.options[monthSelect.selectedIndex].text);

  const daySelect = document.body.querySelector('.age-picker-day');

  expect([...daySelect.options].filter(x => x.value && !x.hidden).length).toBe(30);
});

test('create should disable non-applicable months when day selected', () => {
  const element = addElement();

  new AgePicker().create(element);

  const daySelect = document.body.querySelector('.age-picker-day');

  daySelect.selectedIndex = 31;
  daySelect.dispatchEvent(new window.Event('change'));

  // Verify value is 31
  expect('31').toBe(daySelect.options[daySelect.selectedIndex].text);

  const monthSelect = document.body.querySelector('.age-picker-month');

  expect([...monthSelect.options].filter(x => x.disabled).length).toBe(5);
});

test('create should handle non-leap years for month selection', () => {
  const element = addElement();

  new AgePicker().create(element);

  element.value = 2015; // 2015 is not a leap year
  element.dispatchEvent(new window.Event('keyup'));

  const daySelect = document.body.querySelector('.age-picker-day');

  daySelect.selectedIndex = 29;
  daySelect.dispatchEvent(new window.Event('change'));

  // Verify value is 29
  expect('29').toBe(daySelect.options[daySelect.selectedIndex].text);

  const monthSelect = document.body.querySelector('.age-picker-month');

  expect([...monthSelect.options].filter(x => x.disabled).length).toBe(1);
});

test('create should handle leap years for month selection', () => {
  const element = addElement();

  new AgePicker().create(element);

  element.value = 2016; // 2016 is a leap year
  element.dispatchEvent(new window.Event('keyup'));

  const daySelect = document.body.querySelector('.age-picker-day');

  daySelect.selectedIndex = 29;
  daySelect.dispatchEvent(new window.Event('change'));

  // Verify value is 29
  expect('29').toBe(daySelect.options[daySelect.selectedIndex].text);

  const monthSelect = document.body.querySelector('.age-picker-month');

  expect([...monthSelect.options].filter(x => x.disabled).length).toBe(0);
});

test('create should handle non-leap years for day selection', () => {
  const element = addElement();

  new AgePicker().create(element);

  element.value = 2015; // 2015 is not a leap year
  element.dispatchEvent(new window.Event('keyup'));

  const monthSelect = document.body.querySelector('.age-picker-month');

  monthSelect.selectedIndex = 2;
  monthSelect.dispatchEvent(new window.Event('change'));

  // Verify month is Febuary
  expect('February').toBe(monthSelect.options[monthSelect.selectedIndex].text);

  const daySelect = document.body.querySelector('.age-picker-day');

  expect([...daySelect.options].filter(x => x.value && !x.hidden).length).toBe(28);
});

test('create should handle leap years for day selection', () => {
  const element = addElement();

  new AgePicker().create(element);

  element.value = 2016; // 2016 is a leap year
  element.dispatchEvent(new window.Event('keyup'));

  const monthSelect = document.body.querySelector('.age-picker-month');

  monthSelect.selectedIndex = 2;
  monthSelect.dispatchEvent(new window.Event('change'));

  // Verify month is Febuary
  expect('February').toBe(monthSelect.options[monthSelect.selectedIndex].text);

  const daySelect = document.body.querySelector('.age-picker-day');

  expect([...daySelect.options].filter(x => x.value && !x.hidden).length).toBe(29);
});
