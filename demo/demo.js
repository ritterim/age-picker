new AgePicker({
  selectClasses: ['form-control']
}).init();

var ids = [
  {
    ageValue: 'age-value',
    result: 'result'
  },
  {
    ageValue: 'direct-entry-only-age-value',
    result: 'direct-entry-only-result'
  }
];

ids.forEach(idSet => {
  var ageValue = document.getElementById(idSet.ageValue);
  var result = document.getElementById(idSet.result);

  result.innerHTML = ageValue.value;

  ageValue.addEventListener('change', e => {
    result.innerHTML = e.target.value;
  });
});
