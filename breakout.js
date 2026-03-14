const canvas=document.getElementById("canvas");
const ctx=canvas.getContext("2d");
const resetButton=document.getElementById("reset");
const scoreText=document.getElementById("score");
const gameHeight=canvas.height;
const gameWidth=canvas.width;
const [h,w]=[12,70];
const paddleSpeed=25;
const ballRadius=10;
let T;
let running=false;
const targetWidth=35;
const paddlecolor="green";
const paddleBorderColor="black";
const targetColor="blue";
const targetBorderColor="black";
const ballColor="red";
const ballBorderColor="black";
let ballXDirection=1;
let ballYDirection=1;
let paddle={
    height:h,
    width:w,
    x:gameWidth/2-40,
    y:gameHeight-3*h,
}
let score=0;
let targets=[{
    height:h,
    width:targetWidth,
    x:25,
    y:25,
    active:true,
    },{
    height:h,
    width:targetWidth,
    x:65,
    y:25,
    active:true,
    },{
    height:h,
    width:targetWidth,
    x:105,
    y:25,
    active:true,
    },{
    height:h,
    width:targetWidth,
    x:145,
    y:25,
    active:true,
    },{
    height:h,
    width:targetWidth,
    x:185,
    y:25,
    active:true,
    },{
    height:h,
    width:targetWidth,
    x:225,
    y:25,
    active:true,
    },{
    height:h,
    width:targetWidth,
    x:265,
    y:25,
    active:true,
    },{
    height:h,
    width:targetWidth,
    x:305,
    y:25,
    active:true,
    },{
    height:h,
    width:targetWidth,
    x:345,
    y:25,
    active:true,
    },{
    height:h,
    width:targetWidth,
    x:25,
    y:45,
    active:true,
    },{
    height:h,
    width:targetWidth,
    x:25,
    y:45,
    active:true,
    },{
    height:h,
    width:targetWidth,
    x:65,
    y:45,
    active:true,
    },{
    height:h,
    width:targetWidth,
    x:105,
    y:45,
    active:true,
    },{
    height:h,
    width:targetWidth,
    x:145,
    y:45,
    active:true,
    },{
    height:h,
    width:targetWidth,
    x:185,
    y:45,
    active:true,
    },{
    height:h,
    width:targetWidth,
    x:225,
    y:45,
    active:true,
    },{
    height:h,
    width:targetWidth,
    x:265,
    y:45,
    active:true,
    },{
    height:h,
    width:targetWidth,
    x:305,
    y:45,
    active:true,
    },{
    height:h,
    width:targetWidth,
    x:345,
    y:45,
    active:true,
    },{
    height:h,
    width:targetWidth,
    x:25,
    y:65,
    active:true,
    },{
    height:h,
    width:targetWidth,
    x:65,
    y:65,
    active:true,
    },{
    height:h,
    width:targetWidth,
    x:105,
    y:65,
    active:true,
    },{
    height:h,
    width:targetWidth,
    x:145,
    y:65,
    active:true,
    },{
    height:h,
    width:targetWidth,
    x:185,
    y:65,
    active:true,
    },{
    height:h,
    width:targetWidth,
    x:225,
    y:65,
    active:true,
    },{
    height:h,
    width:targetWidth,
    x:265,
    y:65,
    active:true,
    },{
    height:h,
    width:targetWidth,
    x:305,
    y:65,
    active:true,
    },{
    height:h,
    width:targetWidth,
    x:345,
    y:65,
    active:true,
    }


]
let ballX;
let ballY;
let ballSpeed=2;
window.addEventListener("keydown",changeDirection);
resetButton.addEventListener("click",reset);
gameStart()
function gameStart(){
    running=true;
    createBall();
    nextTick();
}
function nextTick(){
    if(!running) return;
    T=setTimeout(()=>{
        clearboard();
        drawtargets();
        drawPaddle();
        moveBall();
        drawBall();
        checkCollision();
        checkGameOver();
        nextTick();
    },10)
}
function clearboard(){
    ctx.fillStyle="white";
    ctx.fillRect(0,0,gameWidth,gameHeight);
}
function drawPaddle(){
    ctx.fillStyle=paddlecolor;
    ctx.strokeStyle=paddleBorderColor;
    ctx.fillRect(paddle.x,paddle.y,paddle.width,paddle.height);
    ctx.strokeRect(paddle.x,paddle.y,paddle.width,paddle.height)
}
function drawBall(){
    ctx.fillStyle=ballColor;
    ctx.strokeStyle=ballBorderColor;
    ctx.beginPath();
    ctx.arc(ballX,ballY,ballRadius,0,Math.PI*2);
    ctx.fill();
    ctx.stroke();
}
function createBall(){
    ballX=gameWidth/2-4;
    ballY=gameHeight-50;
}
function moveBall(){
    ballX=ballX+ballSpeed*ballXDirection;
    ballY=ballY-ballSpeed*ballYDirection;
}
function changeDirection(event){
    const key=event.keyCode;
    const left=37;
    const right=39;
    switch(key){
        case left:
            if(paddle.x>0){
            paddle.x-=paddleSpeed}
        break
        case right:
        if(paddle.x+ paddle.width<gameWidth){
            paddle.x+=paddleSpeed}
        break
    }
}
function checkCollision(){
    if(ballX>gameWidth-ballRadius ||ballX<0+ballRadius){
        ballXDirection=-ballXDirection
    }
    if(ballY<0+ballRadius){
        ballYDirection=-ballYDirection
    }
    if(ballY>gameHeight-ballRadius){
        running=false
    }
    if(ballY+ballRadius>=paddle.y &&(ballX+ballRadius>paddle.x && ballX-ballRadius<paddle.x+paddle.width) ){
        ballXDirection= ((ballX-(paddle.x+paddle.width/2))/(paddle.width/2));
        ballYDirection=-ballYDirection;
        ballSpeed+=0.1
    }
    for(let i=0;i<targets.length;i++){
        let target=targets[i];
        if(target.active){
            if(ballX+ballRadius>target.x && ballX-ballRadius<target.x+target.width && ballY+ballRadius>target.y && ballY-ballRadius<target.y+target.height){
                ballYDirection=-ballYDirection;
                ballXDirection= ((ballX-(target.x+target.width/2))/(target.width/2));
                target.active=false;
                updateScore();
            }
        }
    }
}
function updateScore(){
    score++
    scoreText.innerHTML= score;
}
function checkGameOver(){
    if(!running){
        ctx.font="50px MV Bali";
        ctx.fillStyle="black";
        ctx.fillText("GAME OVER!",gameWidth/2-150,gameHeight/2);
        clearTimeout(T);
    }
}
function reset(){
    running=true;
    score=0;
    scoreText.innerHTML=score;
    ballSpeed=2;
    paddle={
        height:h,
        width:w,
        x:gameWidth/2-40,
        y:gameHeight-3*h,
    }
    createBall();
    targets.forEach(target => target.active = true);
    nextTick();
}
function drawtargets(){
    targets.forEach((target)=>{
        if(target.active){
            ctx.fillStyle=targetColor;
            ctx.strokeStyle=targetBorderColor;
            ctx.fillRect(target.x,target.y,target.width,target.height)
        }
    })
}