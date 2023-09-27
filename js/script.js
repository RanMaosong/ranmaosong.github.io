var pubs = $("#publications > table")
console.log($("#publications").find("font").length)
var total_num = 0

var years = new Array();
var paper_nums = new Array()
pubs.each(function (index, node) {
   var paper_num_by_year = $(node).find("tr").length;
   var year = $("#publications").find("font").eq(index).text();
   $("#publications").find("font").eq(index).children().text(year + "(" + paper_num_by_year + ")");
   total_num += paper_num_by_year;

   years.push(year);
   paper_nums.push(paper_num_by_year);
});




years = years.reverse()
paper_nums = paper_nums.reverse()
// for statistics

var statistics_appear = false
statistics
var $win = $(window);
var itemOffsetTop = $("#statistics").offset().top;
var itemOuterHeight = $("#statistics").outerHeight();
var winHeight = $win.height();
$win.scroll(function () {
   var winScrollTop = $win.scrollTop();
   if (!(winScrollTop > itemOffsetTop + itemOuterHeight) && !(winScrollTop < itemOffsetTop - winHeight) ) {
      if (!statistics_appear) {
         plotChart(years, paper_nums);
         statistics_appear = true;
      }
      
   } else {
      statistics_appear = false;
   }
})


function plotChart(years, paper_nums) {
   $("#myChart").remove();
   $("#container").append('<canvas id="myChart" width="400" height="300"></canvas>');
   const ctx = document.getElementById('myChart');
   ctx.height = 300;
   const labels = years;  // 设置 X 轴上对应的标签
   const data = {
      labels: labels,

      datasets: [{
         label: 'Paper: ',
         data: paper_nums,
         fill: true,
         pointStyle: 'triangle',
         borderWidth: 2,
         pointRadius: 3,    //设置圆点半径
         pointHoverRadius: 10, //设置鼠标移动上去后圆点半径
         tension: 0.1,
         backgroundColor: [
            'rgba(158, 221, 255, 0.5)',
            // 'rgba(54, 162, 235, 0.2)',
            // 'rgba(255, 206, 86, 0.2)',
            // 'rgba(75, 192, 192, 0.2)',
            // 'rgba(153, 102, 255, 0.2)',
            // 'rgba(255, 159, 64, 0.2)'
         ],
         borderColor: [
            'rgba(100, 153, 233,1)',
         ],
      }]
   };
   const config = {
      type: 'line', // 设置图表类型
      data: data,
      options: {
         maintainAspectRatio: false,
         plugins: {
            legend: {
               display: false
            },
         },
         title: {
            display: false
         },
      }
   };
   const myChart = new Chart(ctx, config);
}




