import DateHelper from './date-helper';

export default class AgePicker {
  constructor(configuration = null) {
    const defaultConfiguration = {
      defaultDomScope: document.body,
      dataAttribute: 'data-age-picker',
      prefixClass: 'age-picker',
      selectClasses: [],
      i18n: {
        months: ['January','February','March','April','May','June','July','August','September','October','November','December']
      }
    };

    this.configuration = defaultConfiguration;

    defaultConfiguration.containerClass = `${this.configuration.prefixClass}-container`;
    defaultConfiguration.monthSelectClass = `${this.configuration.prefixClass}-month`;
    defaultConfiguration.daySelectClass = `${this.configuration.prefixClass}-day`;

    if (configuration) {
      Object.assign(this.configuration, configuration);
    }

    if (!this.configuration.dataAttribute.startsWith('data-')) {
      throw new Error('configuration dataAttribute must start with "data-".');
    }
  }

  init(domScope = this.configuration.defaultDomScope) {
    if (!domScope) {
      throw new Error('domScope must be provided.');
    }

    // Allow for input[type="text"] or input[type="number"] usages.
    const items = [...domScope.querySelectorAll(`input[${this.configuration.dataAttribute}]`)];
    items.forEach(i => this.create(i));
  }

  create(element) {
    if (!element) {
      throw new Error('element must be provided.');
    }

    // Create hidden element to replace element
    const hiddenElement = document.createElement('input');
    hiddenElement.type = 'hidden';
    hiddenElement.id = `${element.id}-value`;
    hiddenElement.name = element.name;

    // Modify element to avoid sending value over HTML form POST.
    element.name = '';

    // Create the container div
    const container = document.createElement('div');
    container.classList.add(this.configuration.containerClass);

    // Append container immediately before the provided `element`
    element.parentNode.insertBefore(container, element);

    // Move the `element` inside the container
    container.appendChild(element);

    // Append `hiddenElement` inside container
    container.appendChild(hiddenElement);

    // Create and append month and day select tags
    const monthSelect = this._getMonthSelect();
    const daySelect = this._getDaySelect();

    container.appendChild(monthSelect);
    container.appendChild(daySelect);

    // Initially hide select elements, but retain their 'space'
    monthSelect.style.visibility = 'hidden';
    daySelect.style.visibility = 'hidden';

    // Control visiblity of select elements based on input
    element.addEventListener('keyup', e => {
      const value = e.target.value;

      if (/\d{4}/.test(value)) {
        monthSelect.style.visibility = 'visible';
        daySelect.style.visibility = 'visible';
      } else {
        monthSelect.style.visibility = 'hidden';
        daySelect.style.visibility = 'hidden';

        monthSelect.selectedIndex = 0;
        daySelect.selectedIndex = 0;
      }

      this._updateHiddenElementValue(hiddenElement, element, monthSelect, daySelect);
    });

    monthSelect.addEventListener('change', () => {
      this._updateHiddenElementValue(hiddenElement, element, monthSelect, daySelect);
      this._updateDaySelectBasedOnMonthSelect(element, monthSelect, daySelect);
    });

    daySelect.addEventListener('change', () => {
      this._updateHiddenElementValue(hiddenElement, element, monthSelect, daySelect);
      this._updateMonthSelectBasedOnDaySelect(element, monthSelect, daySelect);
    });
  }

  _updateHiddenElementValue(hiddenElement, element, monthSelect, daySelect) {
    // If year is specified or computed age value.
    // Otherwise, use exact value specified.
    if (/\d{4}/.test(element.value)) {
      const year = element.value;
      const month = monthSelect.options[monthSelect.selectedIndex].value; // 1-12
      const day = daySelect.options[daySelect.selectedIndex].value; // 1-31

      if (month && day) {
        hiddenElement.value = DateHelper.getAge(`${year}/${month}/${day}`);
      } else {
        hiddenElement.value = '';
      }
    } else {
      hiddenElement.value = element.value;
    }

    hiddenElement.dispatchEvent(new window.Event('change'));
  }

  // Disable/enable and show/hide days to match number of days in the selected month
  _updateDaySelectBasedOnMonthSelect(element, monthSelect, daySelect) {
    [...daySelect.options]
      .forEach(x => { x.disabled = false; x.hidden = false; });

    const monthNumber = parseInt(monthSelect.options[monthSelect.selectedIndex].value, 10);
    if (monthNumber) {
      const daysInMonth = DateHelper.getDaysInMonth(monthNumber, element.value);
      [...daySelect.options]
        .filter(x => x.value > daysInMonth)
        .forEach(x => { x.disabled = true; x.hidden = true; });
    }
  }

  // Disable/enable months that can be selected based on day selection
  _updateMonthSelectBasedOnDaySelect(element, monthSelect, daySelect) {
    [...monthSelect.options]
      .forEach(x => { x.disabled = false; });

    const dayNumber = parseInt(daySelect.options[daySelect.selectedIndex].value, 10);
    if (dayNumber) {
      const availableMonthNumbers = DateHelper.getAvailableMonthNumbers(dayNumber, element.value);

      [...monthSelect.options]
        .filter(x => x.value && !availableMonthNumbers.includes(parseInt(x.value, 10)))
        .forEach(x => { x.disabled = true; });
    }
  }

  _getMonthSelect() {
    const select = document.createElement('select');
    select.classList.add(...this.configuration.selectClasses);
    select.classList.add(this.configuration.monthSelectClass);

    this._addSelectItems(
      select,
      'Month',
      this.configuration.i18n.months.map((x, i) => {
        return {
          text: x,
          value: i + 1
        };
      }));

    return select;
  }

  _getDaySelect() {
    const select = document.createElement('select');
    select.classList.add(...this.configuration.selectClasses);
    select.classList.add(this.configuration.daySelectClass);

    this._addSelectItems(
      select,
      'Day',

      // http://stackoverflow.com/a/10050831 from http://stackoverflow.com/questions/3895478/does-javascript-have-a-method-like-range-to-generate-an-array-based-on-suppl
      [...Array(32).keys()].splice(1).map(x => {
        return {
          text: x,
          value: x
        }
      }));

    return select;
  }

  _addSelectItems(select, placeholderText, items) {
    const placeholder = document.createElement('option');
    placeholder.text = placeholderText;
    placeholder.value = '';
    select.appendChild(placeholder);

    items.forEach(item => {
      const option = document.createElement('option');

      option.text = item.text;
      option.value = item.value;

      select.appendChild(option);
    });
  }
}
