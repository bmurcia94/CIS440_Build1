let progressChart;
const ormData = {
  squat: [],
  deadlift: [],
  benchpress: [],
  pullup: [],
  bicepcurl: [],
  triceppushdown: [],
  shoulderpress: []
};

document.getElementById('orm-form').addEventListener('submit', function(event) {
  event.preventDefault();

  const week = event.target.week.value;
  const exercise = event.target.exercise.value;
  const max = event.target.max.value;

  if (!ormData[exercise][week]) {
    ormData[exercise][week] = max;
  } else {
    alert('You already have a record for this exercise on this week.');
    return;
  }

  updateChart();
});

function updateChart() {
  const ctx = document.getElementById('progressChart').getContext('2d');

  if (progressChart) {
    progressChart.destroy();
  }

  progressChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: Object.keys(ormData.squat).map(Number).sort((a, b) => a - b),
      datasets: [{
        label: 'Squat',
        data: Object.values(ormData.squat),
        borderColor: 'rgba(75, 192, 192, 1)',
        fill: false
      }, {
        label: 'Deadlift',
        data: Object.values(ormData.deadlift),
        borderColor: 'rgba(255, 99, 132, 1)',
        fill: false
      }, {
        label: 'Bench Press',
        data: Object.values(ormData.benchpress),
        borderColor: 'rgba(255, 206, 86, 1)',
        fill: false
      }, {
        label: 'Pull Up',
        data: Object.values(ormData.pullup),
        borderColor: 'rgba(153, 102, 255, 1)',
        fill: false
      }, {
        label: 'Bicep Curl',
        data: Object.values(ormData.bicepcurl),
        borderColor: 'rgba(54, 162, 235, 1)',
        fill: false
      }, {
        label: 'Tricep Pushdown',
        data: Object.values(ormData.triceppushdown),
        borderColor: 'rgba(255, 159, 64, 1)',
        fill: false
      }, {
        label: 'Shoulder Press',
        data: Object.values(ormData.shoulderpress),
        borderColor: 'rgba(201, 203, 207, 1)',
        fill: false
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
}
function clearChartData() {
  ormData.squat = [];
  ormData.deadlift = [];
  ormData.benchpress = [];
  ormData.pullup = [];
  ormData.bicepcurl = [];
  ormData.triceppushdown = [];
  ormData.shoulderpress = [];


  updateChart();
}
const clearDataButton = document.getElementById('clearDataButton');
clearDataButton.addEventListener('click', clearChartData);

updateChart();
