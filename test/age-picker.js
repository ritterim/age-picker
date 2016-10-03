import test from 'ava';

import AgePicker from '../src/age-picker';

let element;

test.beforeEach(() => {
  element = document.createElement('input');
  element.setAttribute('data-age-picker', true);

  document.body.appendChild(element);
});

test.afterEach(() => {
  // http://stackoverflow.com/a/3955238 from http://stackoverflow.com/questions/3955229/remove-all-child-elements-of-a-dom-node-in-javascript
  while (document.body.firstChild) {
    document.body.removeChild(document.body.firstChild);
  }
});

test('init should default to document.body', t => {
  new AgePicker().init();

  t.is(document.body.querySelectorAll('.age-picker-container').length, 1);
});

test('init(domScope) should use provided domScope', t => {
  const domScope = document.createElement('div');

  const element2 = document.createElement('input');
  element2.setAttribute('data-age-picker', true);

  domScope.appendChild(element2);

  new AgePicker().init(domScope);

  t.is(domScope.querySelectorAll('.age-picker-container').length, 1);
});

test('init should wire up multiple data- attribute items', t => {
  const element2 = document.createElement('input');
  element2.setAttribute('data-age-picker', true);

  document.body.appendChild(element2);

  new AgePicker().init();

  t.is(document.body.querySelectorAll('.age-picker-container').length, 2);
});

test('init should throw if a DOM item is not provided', t => {
  t.throws(() => new AgePicker().init(null), 'domScope must be provided.');
});

test('create should create expected assets on passed in element', t => {
  new AgePicker().create(element);

  t.is(document.body.querySelectorAll('.age-picker-container').length, 1);

  const container = document.body.querySelector('.age-picker-container');

  t.is(container.querySelectorAll('.age-picker-month').length, 1);
  t.is(container.querySelectorAll('.age-picker-day').length, 1);
  t.is(container.querySelectorAll('input[type="hidden"]').length, 1);
});

test('create should set hidden field value for age value', t => {
  new AgePicker().create(element);

  element.value = 21;
  element.dispatchEvent(new window.Event('keyup'));

  const hiddenInput = document.body.querySelector('.age-picker-container input[type="hidden"]');

  t.is('21', hiddenInput.value);
});

test('create should set blank hidden field value for year value only', t => {
  new AgePicker().create(element);

  element.value = 1990;
  element.dispatchEvent(new window.Event('keyup'));

  const hiddenInput = document.body.querySelector('.age-picker-container input[type="hidden"]');

  t.is('', hiddenInput.value);
});

test('create should set hidden field value when year, month, and day specified', t => {
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

  t.is('21', hiddenInput.value);
});

test('create should throw if no element is provided', t => {
  t.throws(() => new AgePicker().create(), 'element must be provided.');
});

test('create should hide non-applicable days when month selected', t => {
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
  new AgePicker().create(element);

  const daySelect = document.body.querySelector('.age-picker-day');

  daySelect.selectedIndex = 31;
  daySelect.dispatchEvent(new window.Event('change'));

  // Verify value is 31
  t.is('31', daySelect.options[daySelect.selectedIndex].text);

  const monthSelect = document.body.querySelector('.age-picker-month');

  t.is([...monthSelect.options].filter(x => x.disabled).length, 5);
});

