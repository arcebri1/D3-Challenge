// create the variables for the width and height of the svg
//This creates the viewport
let svgWidth = 1000;
let svgHeight = 650;

//create the margins (the space between the viewport and the chart)
//this is to create the chart
let margin = {
    top: 100,
    left: 60,
    bottom: 60,
    right: 50
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

// console.log(svg);

let chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`)

// console.log(chartGroup);

//Import the data from the csv
d3.csv("data.csv").then(function (stateData) {
    console.log(stateData);

    // Parse Data/Cast as numbers
    stateData.forEach(function (data) {
        data.healthcare = +data.healthcare;
        data.poverty = +data.poverty;
    });

    // Create scale functions
    let xLinearScale = d3.scaleLinear()
        .domain([0, d3.max(stateData, d => d.poverty)])
        .range([0, width])

    // console.log(xLinearScale)

    let yLinearScale = d3.scaleLinear()
        .domain([0, d3.max(stateData, d => d.healthcare)])
        .range([height, 0])

    // console.log(yLinearScale)

    // Create axis functions
    let xAxis = d3.axisBottom(xLinearScale);
    let yAxis = d3.axisLeft(yLinearScale);

    // console.log(xAxis)
    // console.log(yAxis)

    //  Append Axes to the chart
    chartGroup.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(xAxis)

    chartGroup.append("g")
        .call(yAxis)

    // Create Circles
    let circleGroup = chartGroup.selectAll("circle")
        .data(stateData)
        .enter()
        .append("circle")
        .attr("cx", d => xLinearScale(d.poverty))
        .attr("cy", d => yLinearScale(d.healthcare))
        .attr("class", "stateCircle")
        .attr("r", "15")

    // Initialize tool tip
    let toolTip = d3.tip()
        .attr("class", "d3-tip")
        .offset([80, -60])
        .html(function (d) {
            return (`${d.state}`)
        })

    // Create tooltip in the chart
    chartGroup.call(toolTip);

    // Create event listeners to display and hide the tooltip
    circleGroup.on("mouseover", function (data) {
        toolTip.show(data, this);
    })
        // onmouseout event
        .on("mouseout", function (data, index) {
            toolTip.hide(data);
        })
    // Create axes labels
    chartGroup.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left + 5)
        .attr("x", 0 - (height / 2))
        .attr("dy", "1em")
        .attr("class", "aText")
        .text("Lacks Healthcare (%)");

    chartGroup.append("text")
        .attr("transform", `translate(${width / 2}, ${height + 50})`)
        .attr("class", "aText")
        .text("in Poverty (%)");


    chartGroup.append("text")
        .attr("class", "stateText")
        .text(function(d) {
            return d.abbr
        })

}).catch(function (error) {
    console.log(error);
})