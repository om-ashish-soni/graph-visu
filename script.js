var radius=10;
const threshold=30;
const levelX=threshold;
const levelY=threshold;
$(document).ready(()=>{
    $("h1").css("color","green");
    // drawNode(10,20,0);
    // drawNode(50,100,1);
    // drawEdge(10,20,50,100);
    $("#input").on('change keyup paste', ()=>{
        clearCanvas();
        setTimeout(()=>{
            parseInput();
        },100);
    });
})
var parseInput=()=>{
    const graph={};
    const location={};
    const level=[];
    const nodeLevel={};
    let totalLevels=0;
    const text=$("#input").val();
    const lines=text.split(/\r?\n/);
    //console.log("now");
    
    for(let line of lines){
        const words=line.split(" ");
        const arr=[];
        
        
        
        for(let word of words){
            let num=parseInt(word);
            if(isNaN(num)==false){
                arr.push(num);
            }
        }
        let len=arr.length;
        if(len==0){
            continue;
        }else if(len==1){
            //add node
            initializeNodes(graph,arr);
            
        }else if(len==2){
            initializeNodes(graph,arr);
            const sourceNode=arr[0];
            const destinationNode=arr[1];
            graph[sourceNode].push(destinationNode);
            graph[destinationNode].push(sourceNode);
        }else{
            //ignore
        }
    }

    //console.log("graph",graph);
    let index=0;
    for(let node in graph){
        //console.log("node : ",node);
        if(nodeLevel.hasOwnProperty(node)==false) nodeLevel[node]=totalLevels+1;
        let currLevel=nodeLevel[node];
        if(level.length <= currLevel) level[currLevel]=threshold;
        if(level.length <= currLevel+1) level[currLevel+1]=threshold;
        const row=graph[node];
        //console.log(node,row);
        //console.log(location);
        let currY=currLevel*threshold;
        if(location.hasOwnProperty(node)==false){
            
            //console.log("drawing node",node,"at : ",level[currLevel],currY);
            drawNode(level[currLevel],currY,node);
            location[node]=[level[currLevel],currY];
            level[currLevel]+=threshold;
        }
        for(let neb of row){
            if(location.hasOwnProperty(neb)==false){
                //console.log("drawing node",neb,"at : ",level[currLevel+1],currY+threshold);
                drawNode(level[currLevel+1],currY+threshold,neb);
                location[neb]=[level[currLevel+1],currY+threshold];
                level[currLevel+1]+=threshold;
                drawEdge(location[node][0],location[node][1],location[neb][0],location[neb][1]);
                nodeLevel[neb]=currLevel+1;
            }
        }
        
        index+=1;

        totalLevels=Math.max(totalLevels,currLevel);
    }
}
var initializeNodes=(graph,arr)=>{
    for(let node of arr){
        if(graph.hasOwnProperty(node)==false){
            graph[node]=new Array();
        }
    }
}
var drawNode=(x,y,text)=>{
    var canvas = document.getElementById('circles_canvas');
    if (canvas.getContext) {
        var ctx = canvas.getContext("2d");
        ctx.beginPath();
        ctx.fillStyle = "rgb(0,200,100)";
        ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
        ctx.fill();

        ctx = canvas.getContext("2d");
        ctx.font = '8pt Calibri';
        ctx.fillStyle = 'white';
        ctx.textAlign = 'center';
        ctx.fillText(text, x, y+3);
    } 
}
var drawEdge=(x1,y1,x2,y2)=>{
    var canvas = document.getElementById('circles_canvas');
    if (canvas.getContext) {
        var ctx = canvas.getContext("2d");
        ctx.beginPath();

        const delta=Math.sqrt(radius);
        ctx.moveTo(x1+delta,y1+delta);
        ctx.lineTo(x2-delta,y2-delta);
        ctx.stroke();
    } 
}
var clearCanvas=()=>{
    var canvas = document.getElementById('circles_canvas');
    if (canvas.getContext) {
        const context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);
    }
    
}