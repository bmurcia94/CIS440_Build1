proteingoal = 385;
carbgoal = 2275;
fatgoal = 350;

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
    alert('You already have a record for this week.');
    return;
  }

  updateChart();
});

function updateChart() {
  const ctx = document.getElementById('progressChart').getContext('2d');

  if (progressChart) {
    progressChart.destroy();
  }

  const weeks = Object.keys(ormData.protein).map(Number).sort((a, b) => a - b);

  const proteinData = weeks.map((week) => {
    const percentagepro = ((ormData.protein[week] / proteingoal)*100);
    return percentagepro.toFixed(2);
  });

  const carbsData = weeks.map((week) => {
    const percentagecarb = ((ormData.carbs[week] / carbgoal)*100);
    return percentagecarb.toFixed(2);
  });

  const fatData = weeks.map((week) => {
    const percentagefat = ((ormData.fat[week] / fatgoal)*100);
    return percentagefat.toFixed(2);
  });

  progressChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: weeks,
      datasets: [
        {
          label: 'Protein',
          data: proteinData,
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
          label: 'Carbs',
          data: carbsData,
          backgroundColor: 'rgba(255, 206, 86, 0.5)',
        },
        {
          label: 'Fat',
          data: fatData,
          backgroundColor: 'rgba(153, 102, 255, 0.5)',
        },
      ],
    },
    options: {
        scales: {
            y: {
                beginAtZero: true,
                max: 100, // Set the max value of the y-axis to 100%.
                ticks: {
                    callback: function (value) {
                        return value + '%';
                    },
                },
            },
        },
        plugins: {
            tooltip: {
                callbacks: {
                    label: function(context) {
                        return context.dataset.label + ': ' + context.parsed.y.toFixed(2) + '%';
                    },
                },
            },
        },
    },
});

}
function clearChartData() {
  ormData.protein = [];
  ormData.carbs = [];
  ormData.fat = [];

  updateChart();
}
const clearDataButton = document.getElementById('clearDataButton');
clearDataButton.addEventListener('click', clearChartData);


updateChart();
