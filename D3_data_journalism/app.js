// create the variables for the width and height of the svg
//This creates the viewport
let svgWidth = 960;
let svgHeight = 500;

//create the margins (the space between the viewport and the chart)
//this is to create the chart
let margin = {
    top: 20,
    left: 40,
    bottom: 60,
    right: 100
}

//create the width and height of the chart
//the chart is the space where our scatter plot will display
let width = svgWidth - margin.left - margin.right
let height = svgHeight - margin.top - margin.bottom

// Create an SVG wrapper, append an SVG group that will hold our chart, and shift the latter by left and top margins.
let svg = d3.select("#scatter")
    .append("svg")
    .attr("height", svgHeight)
    .attr("width", svgWidth)

let chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`)

//Import the data from the csv
d3.csv("data.csv").then(function(stateData) {
    console.log(stateData);
})