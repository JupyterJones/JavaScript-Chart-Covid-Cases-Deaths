
var today = new Date();
       var dd = today.getDate() -2;
       var mm = today.getMonth()+1;
       var yyyy = today.getFullYear();
       if(dd<10)
       {
           dd='0'+dd;
       }
       if(mm<10)
       {
           mm='0'+mm;
       }
       today = mm+'-'+dd+'-'+yyyy;

var filename = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports_us/'+today +'.csv'



function drawColumnChart(covids) {

         var covidLabels = covids.map(function(d) {return d.Province_State});
         var weeksData = covids.map(function(d) {return +d.Deaths});
         var weekData = covids.map(function(d) {return +d.Confirmed});
         //var covidColors = covids.map(function(d) {return d.Gender === 'Female' ? '#F15F36' : '#19A0AA';});
         var covidColors = '#f9c40c';
         console.log(covidLabels);
         console.log(weeksData);
         console.log(weekData);

	var barOptions_stacked = {
		tooltips: {
			enabled: true
		},
		hover :{
			animationDuration:0
		},
		scales: {
			xAxes: [{
				ticks: {
					beginAtZero:true,
					fontFamily: "'Open Sans Bold', sans-serif",
					fontSize:16
				},
				scaleLabel:{
					display:true
				},
				gridLines: {
				},
				stacked: true
			}],
			yAxes: [{
				    gridLines: {
					display:false,
					color: "#fff",
					zeroLineColor: "#fff",
					zeroLineWidth: 0
				},
				ticks: {
					fontFamily: "'Open Sans Bold', sans-serif",
					fontSize:16
				},
				stacked: true
			}]
		},
		legend:{
			display:false
		},

		animation: {
			onComplete: function () {
				var chartInstance = this.chart;
				var ctx = chartInstance.ctx;

				ctx.textAlign = "left";
				ctx.font = "12px Open Sans";
				ctx.fillStyle = "#fff";

				Chart.helpers.each(this.data.datasets.forEach(function (dataset, i) {
					var meta = chartInstance.controller.getDatasetMeta(i);
					Chart.helpers.each(meta.data.forEach(function (bar, index) {
						data = dataset.data[index];
						if(i==0){
							ctx.fillText(data, 50, bar._model.y+4);
						} else {
							ctx.fillText(data, bar._model.x-25, bar._model.y+4);
						}
					}),this)
				}),this);
			}
		},
		pointLabelFontFamily : "Quadon Extra Bold",
		scaleFontFamily : "Quadon Extra Bold",
	};
	var ctx = document.getElementById("stChart");
	var myChart = new Chart(ctx, {
		type: 'horizontalBar',
		data: {
			labels: covidLabels,
			datasets: [{
               barPercentage: 0.5,
               barThickness: 40,
               maxBarThickness: 28,
               minBarLength: 2,


				data: weeksData,

   			backgroundColor: "rgba(63,103,126,1)",
				hoverBackgroundColor: "rgba(50,90,100,1)"
			},{
				data: weekData,
            //barPercentage: 0.5,
            //barThickness: 26,
            //maxBarThickness: 28,
            //minBarLength: 2,
			backgroundColor: "rgba(163,103,126,1)",
				hoverBackgroundColor: "rgba(140,85,100,1)"
			}]
		},

		options: barOptions_stacked,
	});
}

d3.csv(filename)
  .then(drawColumnChart);
//drawColumnChart();
