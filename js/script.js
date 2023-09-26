 var pubs = $("#publications > table")
 console.log($("#publications").find("font").length)
 var total_num = 0

 var years = new Array();
 var paper_nums = new Array()
 pubs.each(function(index, node) {
    var paper_num_by_year = $(node).find("tr").length;
    var year = $("#publications").find("font").eq(index).text();
    $("#publications").find("font").eq(index).children().text(year + "(" + paper_num_by_year + ")");
    total_num += paper_num_by_year;

    years.push(year);
    paper_nums.push(paper_num_by_year);
 });


 $("#publications > h2").text("Publication(" + total_num + ")");


// for statistics

const ctx = document.getElementById('myChart');
ctx.height = 400;
const labels =years;  // 设置 X 轴上对应的标签
const data = {
  labels: labels,
  
  datasets: [{
      label: 'Paper: ',
      data:paper_nums,
      fill: true,
      pointStyle: 'triangle',
      borderWidth: 3,
      pointRadius:3,    //设置圆点半径
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

