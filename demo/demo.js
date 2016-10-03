new AgePicker({
  selectClasses: ['form-control']
}).init();

var ageValue = document.getElementById('age-value');
var result = document.getElementById('result');

result.innerHTML = ageValue.value;

ageValue.addEventListener('change', e => {
  result.innerHTML = e.target.value;
});
