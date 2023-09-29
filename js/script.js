function main(data) {
   var pubs = $("#publications > table")
   var total_num = 0
   // var data = "";

   citations_by_year = data["citations"];
   citation_years = data["years"];
   paper_to_citation = data["paper"];

   var title_nodes = $("p.pub_title b");
   title_nodes.each(function (index, node) {
      var paper_title = $(node).text().toLowerCase();
      var citation = paper_to_citation[paper_title];
      if (citation != 0) {
         $(node).append(' (<span style="color:rgb(178 34 34)" >Google Citation: ' + citation + "</span>)")

      }

   });

   // 统计每年的论文量
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

   var title = $("#publications").find("h2").eq(0).text();
   $("#publications").find("h2").eq(0).text(title+ "(" + total_num + ")");

   var title = $("#statistics").find("font").eq(0).text();
   $("#statistics").find("font").eq(0).children().text(title + "(" + total_num + ")");


   var total_citation = citations_by_year.reduce(function(acr, cur){
      return acr + cur;
   });
   var title = $("#statistics").find("font").eq(1).text();
   $("#statistics").find("font").eq(1).children().text(title + "(" + total_citation + ")");

   years = years.reverse()
   paper_nums = paper_nums.reverse()
   // for statistics

   statistics
   var $win = $(window);
   var paperOffsetTop = $("#paper_chart").offset().top;
   var paperOuterHeight = $("#paper_chart").outerHeight();

   var citationOffsetTop = $("#citation_chart").offset().top;
   var citationOuterHeight = $("#citation_chart").outerHeight();


   var paper_appear = false
   var citation_appear = false
   var winHeight = $win.height();
   $win.scroll(function () {
      var winScrollTop = $win.scrollTop();
      if (!(winScrollTop > paperOffsetTop + paperOuterHeight) && !(winScrollTop < paperOffsetTop - winHeight) ) {
         if (!paper_appear) {
            plotPaperChart(years, paper_nums);
            paper_appear = true;
         }
      } else {
         paper_appear = false;
      }

      if (!(winScrollTop > citationOffsetTop + citationOuterHeight) && !(winScrollTop < citationOffsetTop - winHeight) ) {
         if (!citation_appear) {
            plotCitationChart();
            citation_appear = true;
         }
         
      } else {
         citation_appear = false;
      }
   });



   function plotPaperChart(years, paper_nums) {
      $("#paper_chart").remove();
      $("#paper_container").append('<canvas id="paper_chart" width="400" height="300"></canvas>');
      const ctx = document.getElementById('paper_chart');
      ctx.height = 300;
      const labels = years;  // 设置 X 轴上对应的标签
      const data = {
         labels: labels,

         datasets: [{
            label: '',
            data: paper_nums,
            fill: true,
            pointStyle: 'triangle',
            borderWidth: 2,
            pointRadius: 3,    //设置圆点半径
            pointHoverRadius: 10, //设置鼠标移动上去后圆点半径
            tension: 0.1,
            backgroundColor: [
               'rgba(158, 221, 255, 0.5)'
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
            scales: {
               y: {
               min: 0,
               max: Math.max(paper_nums),
               ticks: {
                  stepSize: 1
               }
               }
            }
         }
      };
      const myChart = new Chart(ctx, config);
   }

   function plotCitationChart() {
      $("#citation_chart").remove();
      $("#citation_container").append('<canvas id="citation_chart" width="400" height="300"></canvas>');
      const ctx = document.getElementById('citation_chart');
      ctx.height = 300;
      const labels = citation_years;  // 设置 X 轴上对应的标签
      const data = {
         labels: labels,

         datasets: [{
            label: '',
            data: citations_by_year,
            fill: true,
            pointStyle: 'triangle',
            borderWidth: 2,
            pointRadius: 3,    //设置圆点半径
            pointHoverRadius: 10, //设置鼠标移动上去后圆点半径
            tension: 0.1,
            backgroundColor: [
               'rgba(158, 221, 255, 0.5)'
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
            scales: {
               y: {
               min: 0,
               max: Math.max(citations_by_year),
               ticks: {
                  stepSize: 1
               }
               }
            }
         }
      };
      const myChart = new Chart(ctx, config);
   }




   $("#layout-menu > a").on("click", function(event) {
      
      var id = $(event.target).attr("href");
      if (id != "#") {
         var targetPosition = $(id).offset();
         $('html,body').animate({scrollTop: targetPosition.top - 50}, 500);
      } else {
         $('html,body').animate({scrollTop: 0}, 500);
      }
      
      return false;
      
   });
}

$(function() {
   $.getJSON("./google/data.json", function (data) {
      main(data);
   });
});



