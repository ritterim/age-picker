new AgePicker({
  selectClasses: ['form-control']
}).init();

var eventsLog = document.getElementById('events-log');

var ids = [
  {
    elementId: 'age',
    ageValue: 'age-value',
    result: 'result'
  },
  {
    elementId: 'age-use-date',
    ageValue: 'age-use-date-value',
    result: 'result-use-date'
  },
  {
    elementId: 'direct-entry-only-age',
    ageValue: 'direct-entry-only-age-value',
    result: 'direct-entry-only-result'
  },
  {
    elementId: 'direct-entry-only-age-use-date',
    ageValue: 'direct-entry-only-age-use-date-value',
    result: 'direct-entry-only-result-use-date'
  }
];

ids.forEach(idSet => {
  var element = document.getElementById(idSet.elementId);
  var ageValue = document.getElementById(idSet.ageValue);
  var result = document.getElementById(idSet.result);

  result.innerHTML = ageValue.value;

  ageValue.addEventListener('change', e => {
    result.innerHTML = e.target.value;
  });

  element.addEventListener('ageChanged', e => {
    var li = document.createElement('li');
    li.innerText = e.target.id + ', ' + e.type + ', value: ' + e.value;

    eventsLog.appendChild(li);
  });
});
