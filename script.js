var radius=7;
const threshold=20;
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
    const taken={};
    const graph={};
    const location={};
    const level=[];
    const nodeLevel={};
    let totalLevels=0;
    const text=$("#input").val();
    const lines=text.split(/\r?\n/);
    ////console.log("now");
    
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

    ////console.log("graph",graph);
    let index=0;
    for(let node in graph){
        ////console.log("node : ",node);
        if(nodeLevel.hasOwnProperty(node)==false){
            //console.log("calling visit on : ",node);
            // nodeLevel[node]=totalLevels+1;
            nodeLevel[node]=1;
            //console.log("nodeLevel["+node+"] : ",nodeLevel[node]);
            const maxLevels=visit(graph,level,nodeLevel,location,taken,node);
            totalLevels=Math.max(totalLevels,maxLevels);
        }
        continue;
        // {

        // let currLevel=nodeLevel[node];
        // if(level.length <= currLevel) level[currLevel]=threshold;
        // if(level.length <= currLevel+1) level[currLevel+1]=threshold;
        // const row=graph[node];
        // ////console.log(node,row);
        // ////console.log(location);
        // let currY=currLevel*threshold;
        // if(location.hasOwnProperty(node)==false){
            
        //     ////console.log("drawing node",node,"at : ",level[currLevel],currY);
        //     drawNode(level[currLevel],currY,node);
        //     location[node]=[level[currLevel],currY];
        //     level[currLevel]+=threshold;
        // }
        // for(let neb of row){
        //     if(location.hasOwnProperty(neb)==false){
        //         ////console.log("drawing node",neb,"at : ",level[currLevel+1],currY+threshold);
        //         drawNode(level[currLevel+1],currY+threshold,neb);
        //         location[neb]=[level[currLevel+1],currY+threshold];
        //         level[currLevel+1]+=threshold;
        //         nodeLevel[neb]=currLevel+1;
        //     }
        //     const edge=[node,neb];
        //     const backEdge=[neb,node];
        //     if(taken.hasOwnProperty(edge)==false && taken.hasOwnProperty(backEdge)==false){
        //         const delta=Math.abs(location[neb][0]-location[node][0]);
        //         if(nodeLevel[node]==nodeLevel[neb] && delta>threshold){
        //             drawCurve(location[node][0],location[node][1],location[node][0],location[node][1]+threshold,location[neb][0],location[neb][1]+threshold,location[neb][0],location[neb][1]);
        //         }else{
        //             drawEdge(location[node][0],location[node][1],location[neb][0],location[neb][1]);    
        //         }
                
        //         taken[edge]=true;
        //     }
        // }
        
        // index+=1;

        // totalLevels=Math.max(totalLevels,currLevel);
        // }

    }
    for(let node in graph){
        drawNode(location[node][0],location[node][1],node);

    }
}
var visit=(graph,level,nodeLevel,location,taken,start,parent=-1)=>{
    queue=[]
    queue.push(start);
    const visited={};
    visited[start]=true;
    let maxLevel=0;
    while(queue.length>0){
        const node=queue.pop();
        //console.log("visiting : ",node,"at : ",location[node]);
        //console.log("at level : ",nodeLevel[node])
        let currLevel=nodeLevel[node];
        if(level.length <= currLevel) level[currLevel]=threshold;
        if(level.length <= currLevel+1) level[currLevel+1]=threshold;
        const row=graph[node];
        let currY=currLevel*threshold;

        maxLevel=Math.max(maxLevel,nodeLevel[node]);
        //console.log("location on : ",node,location.hasOwnProperty(node));
        if(location.hasOwnProperty(node)==false){
            //console.log("going to draw : ",node);
            drawNode(level[currLevel],currY,node);
            location[node]=[level[currLevel],currY];
            level[currLevel]+=threshold;
        }
        for(let neb of row){
            if(location.hasOwnProperty(neb)==false){
                ////console.log("drawing node",neb,"at : ",level[currLevel+1],currY+threshold);
                drawNode(level[currLevel+1],currY+threshold,neb);
                location[neb]=[level[currLevel+1],currY+threshold];
                level[currLevel+1]+=threshold;
                nodeLevel[neb]=currLevel+1;
            }
            const edge=[node,neb];
            const backEdge=[neb,node];
            if(taken.hasOwnProperty(edge)==false && taken.hasOwnProperty(backEdge)==false){
                //console.log("drawing edge from : ",node,neb);
                const delta=Math.abs(location[neb][0]-location[node][0]);
                if(nodeLevel[node]==nodeLevel[neb] && delta>threshold){
                    drawCurve(location[node][0],location[node][1],location[node][0],location[node][1]+threshold,location[neb][0],location[neb][1]+threshold,location[neb][0],location[neb][1]);
                }else{
                    drawEdge(location[node][0],location[node][1],location[neb][0],location[neb][1]);    
                }
                taken[edge]=true;
            }
            if(visited.hasOwnProperty(neb)==false){
                visited[neb]=true;
                queue.push(neb);
            }
            // const nextLevel=(visited==false)?visit(graph,level,nodeLevel,location,taken,neb,node):nodeLevel[neb];
            
        }
    }
    return maxLevel;
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
        ctx.font = '7pt Helvetica';
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
        ctx.moveTo(x1,y1);
        ctx.lineTo(x2,y2);
        ctx.stroke();
    } 
}
var drawCurve=(x1,y1,x2,y2,x3,y3,x4,y4)=>{
    var canvas = document.getElementById('circles_canvas');
    if (canvas.getContext) {
        var ctx = canvas.getContext("2d");
        ctx.beginPath();

        const delta=Math.sqrt(radius);
        ctx.moveTo(x1,y1);
        ctx.bezierCurveTo(x2,y2,x3,y3,x4,y4);
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