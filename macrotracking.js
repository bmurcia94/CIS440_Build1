proteingoal = 100; 

let progressChart;
const ormData = {
  protein: [],
  carbs: [],
  fat: [],
};

document.getElementById('orm-form').addEventListener('submit', function(event) {
  event.preventDefault();

  const week = event.target.week.value;
  const macro = event.target.macro.value;
  const amount = event.target.amount.value;

  if (!ormData[macro][week]) {
    ormData[macro][week] = amount;
  } else {
    alert('You already have a record on this week.');
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
    type: 'bar',
    data: {
      labels: Object.keys(ormData.protein).map(Number).sort((a, b) => a - b),
      datasets: [ {
        label: 'protein',
        data: Object.values(ormData.protein),
        Color: 'rgba(255, 99, 132, 1)',
      }, {
        label: 'carbs',
        data: Object.values(ormData.carbs),
        Color: 'rgba(255, 206, 86, 1)',
      }, {
        label: 'fat',
        data: Object.values(ormData.fat),
        Color: 'rgba(153, 102, 255, 1)',
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

updateChart();
