const radius = 7;
const threshold = 30;
const levelX = threshold;
const levelY = threshold;

$(document).ready(()=>{
    // $("h1").css("color","green");
    // drawNode(10,20,0);
    
    // drawNode(50,100,1);
    // drawEdge(10,20,50,100);
    $("#input").on('change keyup paste', ()=>{
        console.log("key up change input");
        document.querySelector("h1").style.color = "green";
        const input = document.querySelector("#input");
        const svg = document.querySelector("#graph-svg");
        clearSVG(svg);
        parseInput(input.value, svg);
        

        
    });
})

// document.addEventListener('DOMContentLoaded', () => {
//     document.querySelector("h1").style.color = "green";
//     const input = document.querySelector("#input");
//     const svg = document.querySelector("#graph-svg");

//     const drawGraph = () => {
//         clearSVG(svg);
//         parseInput(input.value, svg);
//     };

//     input.addEventListener('input', () => {
//         clearTimeout(timeout);
//         timeout = setTimeout(drawGraph, 100);
//     });

//     let timeout;
// });

const parseInput = (text, svg) => {
    const taken = {};
    const graph = {};
    const location = {};
    const level = [];
    const nodeLevel = {};
    let totalLevels = 0;
    const lines = text.split(/\r?\n/);

    for (let line of lines) {
        const words = line.split(" ");
        const arr = [];

        for (let word of words) {
            let num = parseInt(word);
            if (!isNaN(num)) {
                arr.push(num);
            }
        }

        let len = arr.length;
        if (len == 0) {
            continue;
        } else if (len == 1) {
            // add node
            initializeNodes(graph, arr);
        } else if (len == 2) {
            initializeNodes(graph, arr);
            const sourceNode = arr[0];
            const destinationNode = arr[1];
            graph[sourceNode].push(destinationNode);
            graph[destinationNode].push(sourceNode);
        } else {
            // ignore
        }
    }

    let index = 0;
    for (let node in graph) {
        if (!nodeLevel.hasOwnProperty(node)) {
            nodeLevel[node] = 1;
            const maxLevels = visit(svg,graph, level, nodeLevel, location, taken, node);
            totalLevels = Math.max(totalLevels, maxLevels);
        }
        index++;
    }
    console.log("graph",graph);
    for (let node in graph) {
        drawNode(svg, location[node][0], location[node][1], node);
    }
}

const visit = (svg,graph, level, nodeLevel, location, taken, start, parent = -1) => {
    const queue = [];
    queue.push(start);
    const visited = {};
    visited[start] = true;
    let maxLevel = 0;

    while (queue.length > 0) {
        const node = queue.pop();
        let currLevel = nodeLevel[node];
        if (level.length <= currLevel) level[currLevel] = threshold;
        if (level.length <= currLevel + 1) level[currLevel + 1] = threshold;
        const row = graph[node];
        let currY = currLevel * threshold;

        maxLevel = Math.max(maxLevel, nodeLevel[node]);

        if (!location.hasOwnProperty(node)) {
            drawNode(svg, level[currLevel], currY, node);
            location[node] = [level[currLevel], currY];
            level[currLevel] += threshold;
        }

        for (let neb of row) {
            if (!location.hasOwnProperty(neb)) {
                drawNode(svg, level[currLevel + 1], currY + threshold, neb);
                location[neb] = [level[currLevel + 1], currY + threshold];
                level[currLevel + 1] += threshold;
                nodeLevel[neb] = currLevel + 1;
            }

            const edge = [node, neb];
            const backEdge = [neb, node];

            if (!taken.hasOwnProperty(edge) && !taken.hasOwnProperty(backEdge)) {
                const delta = Math.abs(location[neb][0] - location[node][0]);
                if (nodeLevel[node] === nodeLevel[neb] && delta > threshold) {
                    drawCurve(svg, location[node][0], location[node][1], location[node][0], location[node][1] + threshold / 2, location[neb][0], location[neb][1] + threshold / 2, location[neb][0], location[neb][1]);
                } else {
                    drawEdge(svg, location[node][0], location[node][1], location[neb][0], location[neb][1]);
                }
                taken[edge] = true;
            }

            if (!visited.hasOwnProperty(neb)) {
                visited[neb] = true;
                queue.push(neb);
            }
        }
    }

    return maxLevel;
}

const initializeNodes = (graph, arr) => {
    for (let node of arr) {
        if (!graph.hasOwnProperty(node)) {
            graph[node] = [];
        }
    }
}

const drawNode = (svg, x, y, text) => {
    const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute("cx", x);
    circle.setAttribute("cy", y);
    circle.setAttribute("r", radius);
    circle.setAttribute("fill", "rgb(0,200,100)");

    const label = document.createElementNS("http://www.w3.org/2000/svg", "text");
    label.setAttribute("x", x);
    label.setAttribute("y", y + 3);
    label.setAttribute("font-size", "7pt");
    label.setAttribute("fill", "white");
    label.setAttribute("text-anchor", "middle");
    label.textContent = text;

    svg.appendChild(circle);
    svg.appendChild(label);
}

const drawEdge = (svg, x1, y1, x2, y2) => {
    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", x1);
    line.setAttribute("y1", y1);
    line.setAttribute("x2", x2);
    line.setAttribute("y2", y2);
    line.setAttribute("stroke", "black");

    svg.appendChild(line);
}

const drawCurve = (svg, x1, y1, x2, y2, x3, y3, x4, y4) => {
    const curve = document.createElementNS("http://www.w3.org/2000/svg", "path");
    curve.setAttribute("d", `M ${x1},${y1} C ${x2},${y2} ${x3},${y3} ${x4},${y4}`);
    curve.setAttribute("stroke", "black");
    curve.setAttribute("fill", "none");

    svg.appendChild(curve);
}

const clearSVG = (svg) => {
    while (svg.firstChild) {
        svg.removeChild(svg.firstChild);
    }
}
