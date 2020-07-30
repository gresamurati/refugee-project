
// set the dimensions and margins of the graph
var margin = {top: 30, right: 30, bottom: 70, left: 60},
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

    
// append the svg object to the body of the page
var svg10 = d3.select("#usa")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

//Read the data
d3.csv("https://raw.githubusercontent.com/gresamurati/refugee-project/master/englishcountries.csv",
 
// When reading the csv, I must format variables:
  function(d){
    return { time : d3.timeParse("%Y")(d.time), USA : d.USA }
  },


  // Now I can use this dataset:
  function(data) {

// Add X axis --> it is a date format
    var x = d3.scaleTime()
      .domain(d3.extent(data, function(d) { return d.time; }))
      .range([ 0, width ]);
    svg10.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

   // Add Y axis
    var y = d3.scaleLinear()
      .domain([0, d3.max(data, function(d) { return +d.USA; })])
      .range([ height, 0 ]);
    svg10.append("g")
      .call(d3.axisLeft(y));




// Add X axis label:
svg10.append("text")
.attr("text-anchor", "end")
.attr("x", width -163)
.attr("y", height + margin.top +3)
.text("Years");

// Y axis label:
svg10.append("text")
.attr("text-anchor", "end")
.attr("transform", "rotate(-90)")
.attr("y", -margin.left+ 14)
.attr("x", -margin.top -40)
.text("Spending (in millions)")

    // Add the line
    svg10.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "#5F9EA0")
      .attr("stroke-width", 1.5)
      .attr("d", d3.line()
        .x(function(d) { return x(d.time) })
        .y(function(d) { return y(d.USA) })
        )

})
