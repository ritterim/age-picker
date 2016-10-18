/* global global:true, require: true */

import test from 'ava';

import AgePicker from '../src/age-picker';
import DateHelper from '../src/date-helper';

test.beforeEach(() => {
  // https://github.com/avajs/ava/blob/4d3ed27865dc7cdfde7e651711ee4cd0646ea6e8/docs/recipes/browser-testing.md
  global.document = require('jsdom').jsdom('<body></body>');
  global.window = document.defaultView;
  global.navigator = window.navigator;

  if (document.body.hasChildNodes()) {
    throw new Error('document.body should be empty.');
  }
});

function addElement() {
  const element = document.createElement('input');
  element.setAttribute('data-age-picker', true);

  document.body.appendChild(element);

  return element;
}

function addDirectEntryOnlyElement() {
  const directEntryOnlyElement = document.createElement('input');
  directEntryOnlyElement.setAttribute('data-age-picker-direct-entry-only', true);

  document.body.appendChild(directEntryOnlyElement);

  return directEntryOnlyElement;
}

test('constructor should set default configuration', t => {
  const agePicker = new AgePicker();

  t.is(agePicker.configuration.dataAttribute, 'data-age-picker');
});

test('constructor should override with provided configuration', t => {
  const agePicker = new AgePicker({ dataAttribute: 'data-test' });

  t.is(agePicker.configuration.dataAttribute, 'data-test');
});

test('constructor should apply defaults with provided configuration', t => {
  const agePicker = new AgePicker({ dataAttribute: 'data-test' });

  t.is(agePicker.configuration.prefixClass, 'age-picker');
});

test('constructor should throw error when configuration dataAttribute does not start with "data-"', t => {
  t.throws(
    () => new AgePicker({ dataAttribute: 'test' }),
    'configuration dataAttribute must start with "data-".');
});

test('init should default to document.body', t => {
  addElement();

  new AgePicker().init();

  t.is(document.body.querySelectorAll('.age-picker-container').length, 1);
});

test('init(domScope) should use provided domScope', t => {
  addElement();

  const domScope = document.createElement('div');

  const element2 = document.createElement('input');
  element2.setAttribute('data-age-picker', true);

  domScope.appendChild(element2);

  new AgePicker().init(domScope);

  t.is(domScope.querySelectorAll('.age-picker-container').length, 1);
});

test('init should wire up multiple data- attribute items', t => {
  addElement();

  const element2 = document.createElement('input');
  element2.setAttribute('data-age-picker', true);

  document.body.appendChild(element2);

  new AgePicker().init();

  t.is(document.body.querySelectorAll('.age-picker-container').length, 2);
});

test('init should wire up both normal and direct entry only items', t => {
  addElement();
  addDirectEntryOnlyElement();

  new AgePicker().init();

  t.is(document.body.querySelectorAll('.age-picker-container').length, 2);
});

test('init should throw if a DOM item is not provided', t => {
  t.throws(() => new AgePicker().init(null), 'domScope must be provided.');
});

test('create should create expected assets on passed in element', t => {
  const element = addElement();

  new AgePicker().create(element);

  t.is(document.body.querySelectorAll('.age-picker-container').length, 1);

  const container = document.body.querySelector('.age-picker-container');

  t.is(container.querySelectorAll('.age-picker-month').length, 1);
  t.is(container.querySelectorAll('.age-picker-day').length, 1);
  t.is(container.querySelectorAll('input[type="hidden"]').length, 1);
});

test('create direct entry only should create expected assets on passed in element', t => {
  const element = addDirectEntryOnlyElement();

  new AgePicker().create(element);

  t.is(document.body.querySelectorAll('.age-picker-container').length, 1);

  const container = document.body.querySelector('.age-picker-container');

  t.is(container.querySelectorAll('.age-picker-month').length, 0);
  t.is(container.querySelectorAll('.age-picker-day').length, 0);
  t.is(container.querySelectorAll('input[type="hidden"]').length, 1);
});

test('create should set hidden field value for single digit age value', t => {
  const element = addElement();

  new AgePicker().create(element);

  element.value = 5;
  element.dispatchEvent(new window.Event('keyup'));

  const hiddenInput = document.body.querySelector('.age-picker-container input[type="hidden"]');

  t.is(hiddenInput.value, '5');
});

test('create direct entry only should set hidden field value for single digit age value', t => {
  const element = addDirectEntryOnlyElement();

  new AgePicker().create(element);

  element.value = 5;
  element.dispatchEvent(new window.Event('keyup'));

  const hiddenInput = document.body.querySelector('.age-picker-container input[type="hidden"]');

  t.is(hiddenInput.value, '5');
});

test('create should set hidden field value for two digit age value', t => {
  const element = addElement();

  new AgePicker().create(element);

  element.value = 21;
  element.dispatchEvent(new window.Event('keyup'));

  const hiddenInput = document.body.querySelector('.age-picker-container input[type="hidden"]');

  t.is(hiddenInput.value, '21');
});

test('create direct entry only should set hidden field value for two digit age value', t => {
  const element = addDirectEntryOnlyElement();

  new AgePicker().create(element);

  element.value = 21;
  element.dispatchEvent(new window.Event('keyup'));

  const hiddenInput = document.body.querySelector('.age-picker-container input[type="hidden"]');

  t.is(hiddenInput.value, '21');
});

test('create should set hidden field value for three digit age value', t => {
  const element = addElement();

  new AgePicker().create(element);

  element.value = 101;
  element.dispatchEvent(new window.Event('keyup'));

  const hiddenInput = document.body.querySelector('.age-picker-container input[type="hidden"]');

  t.is(hiddenInput.value, '101');
});

test('create direct entry only should set hidden field value for three digit age value', t => {
  const element = addDirectEntryOnlyElement();

  new AgePicker().create(element);

  element.value = 101;
  element.dispatchEvent(new window.Event('keyup'));

  const hiddenInput = document.body.querySelector('.age-picker-container input[type="hidden"]');

  t.is(hiddenInput.value, '101');
});

test('create should set blank hidden field value for year value only', t => {
  const element = addElement();

  new AgePicker().create(element);

  element.value = 1990;
  element.dispatchEvent(new window.Event('keyup'));

  const hiddenInput = document.body.querySelector('.age-picker-container input[type="hidden"]');

  t.is(hiddenInput.value, '');
});

test('create direct entry only should set age for four digit value', t => {
  const element = addDirectEntryOnlyElement();

  new AgePicker().create(element);

  element.value = 1990;
  element.dispatchEvent(new window.Event('keyup'));

  const hiddenInput = document.body.querySelector('.age-picker-container input[type="hidden"]');

  t.is(hiddenInput.value, '1990');
});

test('create should set hidden field value for date string value', t => {
  const element = addElement();

  new AgePicker().create(element);

  const now = new Date();
  // Go back 5 years and 1 month from now
  element.value = `${now.getMonth() - 1 + 1}/${now.getDate()}/${now.getFullYear() - 5}`;
  element.dispatchEvent(new window.Event('keyup'));

  const hiddenInput = document.body.querySelector('.age-picker-container input[type="hidden"]');

  t.is(hiddenInput.value, '5');
});

test('create direct entry only should set hidden field value for date string value', t => {
  const element = addDirectEntryOnlyElement();

  new AgePicker().create(element);

  const now = new Date();
  // Go back 5 years and 1 month from now
  element.value = `${now.getMonth() - 1 + 1}/${now.getDate()}/${now.getFullYear() - 5}`;
  element.dispatchEvent(new window.Event('keyup'));

  const hiddenInput = document.body.querySelector('.age-picker-container input[type="hidden"]');

  t.is(hiddenInput.value, '5');
});

function directInputMacro(t, dateString, expectedAge) {
  const element = addElement();

  new AgePicker().create(element);

  element.value = dateString;
  element.dispatchEvent(new window.Event('keyup'));

  const hiddenInput = document.body.querySelector('.age-picker-container input[type="hidden"]');

  t.is(hiddenInput.value, expectedAge.toString());
}

directInputMacro.title = (providedTitle, input, expected) =>
  `create should set hidden field value for date string "${input}" to age ${expected}`;

const dateHelper = new DateHelper(() => new Date(2016, 1, 1));

test(directInputMacro, '1/1/1999', dateHelper.calculateAge(1, 1, 1999));
test(directInputMacro, '01/01/1999', dateHelper.calculateAge(1, 1, 1999));
test(directInputMacro, '1-1-1999', dateHelper.calculateAge(1, 1, 1999));
test(directInputMacro, '01-1-1999', dateHelper.calculateAge(1, 1, 1999));
test(directInputMacro, '1/1/99', dateHelper.calculateAge(1, 1, 1999));
test(directInputMacro, '1-01-99', dateHelper.calculateAge(1, 1, 1999));
test(directInputMacro, '1999-1-1', dateHelper.calculateAge(1, 1, 1999));
test(directInputMacro, '1999-01-01', dateHelper.calculateAge(1, 1, 1999));
test(directInputMacro, '1/1/51', dateHelper.calculateAge(1, 1, 1951));
test(directInputMacro, '1/1/50', dateHelper.calculateAge(1, 1, 1950));
test(directInputMacro, '1/1/49', dateHelper.calculateAge(1, 1, 1949));
test(directInputMacro, '1/1/02', dateHelper.calculateAge(1, 1, 2002));

test('create should set hidden field value when year, month, and day specified', t => {
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

  t.is(hiddenInput.value, '21');
});

test('create should throw if no element is provided', t => {
  t.throws(() => new AgePicker().create(), 'element must be provided.');
});

test('create should raise change event on hiddenElement when value change occurs', t => {
  const element = addElement();

  new AgePicker().create(element);

  let changeRaisedCount = 0;
  const hiddenInput = document.body.querySelector('.age-picker-container input[type="hidden"]');
  hiddenInput.addEventListener('change', () => (changeRaisedCount++));

  element.value = 21;
  element.dispatchEvent(new window.Event('keyup'));

  t.is(changeRaisedCount, 1);
});

test('create should not raise change event on hiddenElement when value is modified to the same value', t => {
  const element = addElement();

  new AgePicker().create(element);

  let changeRaisedCount = 0;
  const hiddenInput = document.body.querySelector('.age-picker-container input[type="hidden"]');
  hiddenInput.addEventListener('change', () => (changeRaisedCount++));

  element.value = 21;
  element.dispatchEvent(new window.Event('keyup'));

  element.value = 21;
  element.dispatchEvent(new window.Event('keyup'));

  t.is(changeRaisedCount, 1);
});

test('create should raise ageChanged on element when age is modified', t => {
  const element = addElement();

  new AgePicker().create(element);

  let ageChangedRaisedCount = 0;
  element.addEventListener('ageChanged', () => (ageChangedRaisedCount++));

  element.value = 21;
  element.dispatchEvent(new window.Event('keyup'));

  t.is(ageChangedRaisedCount, 1);
});

test('create should raise ageChanged on element when age is cleared', t => {
  const element = addElement();

  new AgePicker().create(element);

  element.value = 21;
  element.dispatchEvent(new window.Event('keyup'));

  let ageChangedRaisedCount = 0;
  element.addEventListener('ageChanged', () => (ageChangedRaisedCount++));

  element.value = '';
  element.dispatchEvent(new window.Event('keyup'));

  t.is(ageChangedRaisedCount, 1);
});

test('create should not raise ageChanged on element when age is changed to same value', t => {
  const element = addElement();

  new AgePicker().create(element);

  element.value = 21;
  element.dispatchEvent(new window.Event('keyup'));

  let ageChangedRaisedCount = 0;
  element.addEventListener('ageChanged', () => (ageChangedRaisedCount++));

  element.value = 21;
  element.dispatchEvent(new window.Event('keyup'));

  t.is(ageChangedRaisedCount, 0);
});

test('create should raise ageChanged on element with value set on event', t => {
  const element = addElement();

  new AgePicker().create(element);

  const ageChangedRaisedEvents = [];
  element.addEventListener('ageChanged', e => (ageChangedRaisedEvents.push(e)));

  element.value = 21;
  element.dispatchEvent(new window.Event('keyup'));

  t.true(ageChangedRaisedEvents.every(x => x.value == 21));
});

test('create should hide non-applicable days when month selected', t => {
  const element = addElement();

  new AgePicker().create(element);

  const monthSelect = document.body.querySelector('.age-picker-month');

  monthSelect.selectedIndex = 11;
  monthSelect.dispatchEvent(new window.Event('change'));

  // Verify month is November
  t.is('November', monthSelect.options[monthSelect.selectedIndex].text);

  const daySelect = document.body.querySelector('.age-picker-day');

  t.is([...daySelect.options].filter(x => x.value && !x.hidden).length, 30);
});

test('create should disable non-applicable months when day selected', t => {
  const element = addElement();

  new AgePicker().create(element);

  const daySelect = document.body.querySelector('.age-picker-day');

  daySelect.selectedIndex = 31;
  daySelect.dispatchEvent(new window.Event('change'));

  // Verify value is 31
  t.is('31', daySelect.options[daySelect.selectedIndex].text);

  const monthSelect = document.body.querySelector('.age-picker-month');

  t.is([...monthSelect.options].filter(x => x.disabled).length, 5);
});

test('create should handle non-leap years for month selection', t => {
  const element = addElement();

  new AgePicker().create(element);

  element.value = 2015; // 2015 is not a leap year
  element.dispatchEvent(new window.Event('keyup'));

  const daySelect = document.body.querySelector('.age-picker-day');

  daySelect.selectedIndex = 29;
  daySelect.dispatchEvent(new window.Event('change'));

  // Verify value is 29
  t.is('29', daySelect.options[daySelect.selectedIndex].text);

  const monthSelect = document.body.querySelector('.age-picker-month');

  t.is([...monthSelect.options].filter(x => x.disabled).length, 1);
});

test('create should handle leap years for month selection', t => {
  const element = addElement();

  new AgePicker().create(element);

  element.value = 2016; // 2016 is a leap year
  element.dispatchEvent(new window.Event('keyup'));

  const daySelect = document.body.querySelector('.age-picker-day');

  daySelect.selectedIndex = 29;
  daySelect.dispatchEvent(new window.Event('change'));

  // Verify value is 29
  t.is('29', daySelect.options[daySelect.selectedIndex].text);

  const monthSelect = document.body.querySelector('.age-picker-month');

  t.is([...monthSelect.options].filter(x => x.disabled).length, 0);
});

test('create should handle non-leap years for day selection', t => {
  const element = addElement();

  new AgePicker().create(element);

  element.value = 2015; // 2015 is not a leap year
  element.dispatchEvent(new window.Event('keyup'));

  const monthSelect = document.body.querySelector('.age-picker-month');

  monthSelect.selectedIndex = 2;
  monthSelect.dispatchEvent(new window.Event('change'));

  // Verify month is Febuary
  t.is('February', monthSelect.options[monthSelect.selectedIndex].text);

  const daySelect = document.body.querySelector('.age-picker-day');

  t.is([...daySelect.options].filter(x => x.value && !x.hidden).length, 28);
});

test('create should handle leap years for day selection', t => {
  const element = addElement();

  new AgePicker().create(element);

  element.value = 2016; // 2016 is a leap year
  element.dispatchEvent(new window.Event('keyup'));

  const monthSelect = document.body.querySelector('.age-picker-month');

  monthSelect.selectedIndex = 2;
  monthSelect.dispatchEvent(new window.Event('change'));

  // Verify month is Febuary
  t.is('February', monthSelect.options[monthSelect.selectedIndex].text);

  const daySelect = document.body.querySelector('.age-picker-day');

  t.is([...daySelect.options].filter(x => x.value && !x.hidden).length, 29);
});
