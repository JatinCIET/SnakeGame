let canvas = document.querySelector('canvas');
let cts = canvas.getContext('2d');


// cts.fillStyle = "green";
// cts.fillRect(100,100,50,50); // 100 is where rectangle will start and 50 are width and height

// cts.strokeStyle = 'yellow';
// cts.strokeRect(100,100,50,50); //only outline not filled rect

// cts.beginPath();

// cts.moveTo(150,150); //to assign a point
// cts.lineTo(350,350); //to move it to next point
// cts.lineTo(0,350);
// cts.lineTo(150,150);
// cts.stroke();
// cts.closePath();

// cts.font = "100px san-serif" 
// cts.fillStyle = "yellow";
// cts.fillText("Baigan",300,300);



let cellSize = 50;
let snakeboard = [[0,0]];
let direction = "right"
let gameover = false;
let boardWidth = 1000;
let boardHeight = 600;
let score = 0;

let FoodGen = generateFood();

document.addEventListener("keydown" , function(e){
    // console.log(e)

    if(e.key === "ArrowLeft"){
        direction = "left";
    }
    else if(e.key === "ArrowUp"){
        direction = "up";
    }
    else if(e.key === "ArrowDown"){
        direction = "down";
    }
    else{
        direction = "right"; bjhhhh
    }
})

function draw(){

    if(gameover === true){

        clearInterval(gamedend);
        cts.font = "60px sans-serif"
        cts.fillStyle = "red";
        cts.fillText("GAME OVER !!", 100,100)
        return;
    }

    cts.clearRect(0,0,1000,600);

    for(let cell of snakeboard){
        cts.fillStyle = "orange";
        cts.fillRect(cell[0] , cell[1] , cellSize , cellSize)

        
            

}

cts.fillStyle = "red"
cts.fillRect(FoodGen[0] , FoodGen[1] , cellSize , cellSize)

cts.font = "30px sans-serif";
cts.fillText(`score: ${score}` , 20,20);
    }


function update(){

    let headX = snakeboard[snakeboard.length - 1][0]
    let headY = snakeboard[snakeboard.length - 1][1]

    let newheadX;
    let newheadY;
    if(direction === 'left'){
         newheadX = headX - cellSize;
         newheadY = headY;
         if(newheadX<0){gameover = true;}
    }
    else if(direction === 'right'){
         newheadX = headX + cellSize;
         newheadY = headY;
         if(newheadX === 1000){gameover = true;}
    }
    else if(direction === 'up'){
         newheadX = headX;
         newheadY = headY - cellSize;
         if(newheadY<0){gameover = true;}

    }
    else{
         newheadX = headX;
        newheadY = headY + cellSize;
        if(newheadY === 600){gameover = true;}
    }

    

    snakeboard.push([newheadX,newheadY]);

    if(newheadX == FoodGen[0] && newheadY == FoodGen[1]){
        FoodGen = generateFood();
        score ++;
     }
     else{
        snakeboard.shift();

     }
    
    

}
function generateFood(){
    return[
        Math.round(Math.random()*(boardWidth - cellSize )/cellSize)*cellSize,

        Math.round(Math.random()*(boardHeight - cellSize )/cellSize)*cellSize
    ]
}

let gamedend = setInterval(function(){
    update();
    draw();
},100)


