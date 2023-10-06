let progressChart;
const ormData = {        //array data that stores all values entered for specific exercises
  squat: [],
  deadlift: [],
  benchpress: [],
  pullup: [],
  bicepcurl: [],
  triceppushdown: [],
  shoulderpress: []
};

document.getElementById('orm-form').addEventListener('submit', function(event) {      //event listener for form submissions
  event.preventDefault();

  const week = event.target.week.value;
  const exercise = event.target.exercise.value;
  const max = event.target.max.value;

  if (!ormData[exercise][week]) {                                            //Error handler for multiple inputs of the same week
    ormData[exercise][week] = max;
  } else {
    alert('You already have a record for this exercise on this week.');
    return;
  }

  updateChart();
});

function updateChart() {                                                    //function that adds weeks to the graph / updates in
  const ctx = document.getElementById('progressChart').getContext('2d');

  if (progressChart) {
    progressChart.destroy();
  }

  let allWeeks = [];
  for (let exercise in ormData) {
    allWeeks = allWeeks.concat(Object.keys(ormData[exercise]));
  }

  if (allWeeks.length === 0) {
    allWeeks.push("1");
  }

  //contains week numbers and max week numbers
  const uniqueSortedWeeks = [...new Set(allWeeks)].map(Number).sort((a, b) => a - b);
  const extendedWeeks = Array.from({ length: uniqueSortedWeeks[uniqueSortedWeeks.length - 1] }, (_, i) => i + 1);

  const datasets = [];
  const colors = [                        //graph color per exercise
    'rgba(75, 192, 192, 1)', 
    'rgba(255, 99, 132, 1)', 
    'rgba(255, 206, 86, 1)', 
    'rgba(153, 102, 255, 1)', 
    'rgba(54, 162, 235, 1)', 
    'rgba(255, 159, 64, 1)', 
    'rgba(201, 203, 207, 1)'
  ];

  const exerciseLabels = {                 //graph labels
    squat: 'Squat',
    deadlift: 'Deadlift',
    benchpress: 'Bench Press',
    pullup: 'Pull-up',
    bicepcurl: 'Bicep Curl',
    triceppushdown: 'Triceps Pushdown',
    shoulderpress: 'Shoulder Press'
  };

  let colorIndex = 0;
  for (let exercise in ormData) {          //Code that plots that data for graphs
    datasets.push({
      label: exerciseLabels[exercise],
      data: extendedWeeks.map(week => (week in ormData[exercise]) ? ormData[exercise][week] : null),
      borderColor: colors[colorIndex % colors.length],
      fill: false,
      spanGaps: true
    });
    colorIndex++;
  }

  progressChart = new Chart(ctx, {              //graph configuration
    type: 'line',
    data: {
      labels: extendedWeeks,
      datasets: datasets
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

function clearChartData() {          //function that clears the chart data
  ormData.squat = [];
  ormData.deadlift = [];
  ormData.benchpress = [];
  ormData.pullup = [];
  ormData.bicepcurl = [];
  ormData.triceppushdown = [];
  ormData.shoulderpress = [];

  updateChart();
}

const clearDataButton = document.getElementById('clearDataButton');  //event listeneer that waits for clear button to be pressed
clearDataButton.addEventListener('click', clearChartData);

updateChart();
