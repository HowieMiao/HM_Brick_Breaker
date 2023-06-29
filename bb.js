let canvas = document.getElementById("mycanvas");
let ctx = canvas.getContext('2d');
let x = canvas.width/2
let y = canvas.height/2
let dx = 2
let dy = -2
let ballRadius = 10;

//paddle
let paddleHeight = 12;
let paddleWidth = 72;
//paddle origin
let paddleX = (canvas.width-paddleWidth)/2 ;

//paddle control
let rightPressed =false;
let leftPressed =false;
document.addEventListener('keydown', keyDownHandler , false);
document.addEventListener('keyup', keyUpHandler , false);
// document.addEventListener("mousemove", mouseMoveHandler, false);

// //Anchor paddle movement to mouse movement
// function mouseMoveHandler(e) {
//     var relativeX = e.clientX - canvas.offsetLeft;
//     if(relativeX > 0 && relativeX < canvas.width) {
//         paddleX = relativeX - paddleWidth/2;
//     }
// }
function keyDownHandler(e){
    if(e.keyCode === 39){
        rightPressed = true;
    }
    else if (e.keyCode === 37){
        leftPressed = true;
    }
}
function keyUpHandler(e){
    if(e.keyCode === 39){
        rightPressed = false;
    }
    else if (e.keyCode === 37){
        leftPressed = false;
    }
}

//Create a function to create the paddle
function drawPaddle(){
    ctx.beginPath();
    ctx.rect(paddleX,canvas.height-paddleHeight,paddleWidth,paddleHeight); //centered at (x,y) position with radius r = ballRadius starting at 0 = startAngle, ending at Math.PI*2 = endAngle (in Radians)
    ctx.fillStyle = 'green';
    ctx.fill();
    ctx.closePath();
}

function drawBall(){
    ctx.beginPath();
    ctx.arc(x,y,ballRadius,0,Math.PI*2); //centered at (x,y) position with radius r = ballRadius starting at 0 = startAngle, ending at Math.PI*2 = endAngle (in Radians)
    ctx.fillStyle = 'blue';
    ctx.fill();
    ctx.closePath(); 
}
function draw(){
    ctx.clearRect(0,0,canvas.width, canvas.height);
    drawPaddle();
    drawBall();    
    if(x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }
    //top wall
    if(y + dy < ballRadius){
        dy = -dy;
    }
    else if (y + dy > canvas.height-ballRadius){
        //detect paddle hits
        if(x > paddleX && x < paddleX + paddleWidth){
            dy=-dy;
        }
        //if no paddle hit, body of canvas is hit ==> game over
        else {
            alert('GAME OVER!! Try again...');
            document.location.reload();
        }
    }
    //bottom wall
    if (y + dy > canvas.height - ballRadius || y + dy < ballRadius){
        dy = -dy;
    }
    //Make paddle move
    if(rightPressed && paddleX <canvas.width-paddleWidth){
        paddleX += 7;
    }
    else if(leftPressed && paddleX > 0){
        paddleX -= 7;
    }
    
    x +=dx; 
    y +=dy; 
}


setInterval(draw,10);