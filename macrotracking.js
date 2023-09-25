proteingoal = 385;
carbgoal = 350;
fatgoal = 2275;

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
    const percentagepro = (ormData.protein[week] / proteingoal);
    return percentagepro.toFixed(2);
  });

  const carbsData = weeks.map((week) => {
    const percentagecarb = (ormData.carbs[week] / carbgoal);
    return percentagecarb.toFixed(2);
  });

  const fatData = weeks.map((week) => {
    const percentagefat = (ormData.fat[week] / fatgoal);
    return percentagefat.toFixed(2);
  });

  progressChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: weeks,
      datasets: [
        {
          label: 'protein',
          data: proteinData,
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
          label: 'carbs',
          data: carbsData,
          backgroundColor: 'rgba(255, 206, 86, 0.5)',
        },
        {
          label: 'fat',
          data: fatData,
          backgroundColor: 'rgba(153, 102, 255, 0.5)',
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
              max: 100, 
            },
          },
        ],
      },
    },
  });

calculatePercentage();
}


updateChart();

function calculatePercentage() {
  const totalProtein = Object.values(ormData.protein).reduce((acc, value) => acc + parseFloat(value) || 0, 0);
  const totalCarbs = Object.values(ormData.carbs).reduce((acc, value) => acc + parseFloat(value) || 0, 0);
  const totalFat = Object.values(ormData.fat).reduce((acc, value) => acc + parseFloat(value) || 0, 0);

  const totalMacro = totalProtein + totalCarbs + totalFat;

  const proteinPercentage = (totalProtein / totalMacro) * 100;
  const carbsPercentage = (totalCarbs / totalMacro) * 100;
  const fatPercentage = (totalFat / totalMacro) * 100;

  document.getElementById('proteinPercentage').textContent = `Protein: ${proteinPercentage.toFixed(2)}%`;
  document.getElementById('carbsPercentage').textContent = `Carbs: ${carbsPercentage.toFixed(2)}%`;
  document.getElementById('fatPercentage').textContent = `Fat: ${fatPercentage.toFixed(2)}%`;
}

calculatePercentage();
