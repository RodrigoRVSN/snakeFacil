let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let box=32;
let snake=[];

const som_hit=new Audio();
som_hit.src='./sounds/toque.mp3';
const som_died=new Audio();
som_died.src='./sounds/oof.mp3';
const som_wow=new Audio();
som_wow.src='./sounds/wow.mp3';

snake[0] = {
    x: Math.floor(Math.random()*15+1)*box,
    y: Math.floor(Math.random()*15+1)*box
}

let direction="";

let food = {
    x: Math.floor(Math.random()*15+1)*box,
    y: Math.floor(Math.random()*15+1)*box
}

function createBG(){
    context.fillStyle="green";
    context.fillRect(0, 0, 16*box, 16*box);
}

function createSnake(){
    for(i=0; i < snake.length ; i++){
        context.fillStyle="yellowgreen";
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

function createFood(){
    context.fillStyle="whitesmoke";
    context.fillRect(food.x, food.y, box, box);
}

document.addEventListener('keydown',update);

function update(event){
    document.getElementById('tutorial').style.visibility = "hidden";
    if(event.keyCode==27) direction="";
    if((event.keyCode==65 || event.keyCode==37) && direction != "right") direction="left";
    if((event.keyCode==87 || event.keyCode==38) && direction != "down") direction="up";
    if((event.keyCode==68 || event.keyCode==39) && direction != "left") direction="right";
    if((event.keyCode==83 || event.keyCode==40) && direction != "up") direction="down";
}

function startGame(vel){
    if(snake[0].x > 15*box) {
        snake[0].x = 0;
        som_wow.play();}
    if(snake[0].x < 0){
        snake[0].x = 16*box;
        som_wow.play();}
    if(snake[0].y > 15*box){
        snake[0].y = 0;
        som_wow.play();}
    if(snake[0].y < 0){
        snake[0].y = 16*box;
        som_wow.play();}
    
    for(i = 1; i < snake.length; i++){
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
            som_died.play();
            clearInterval(jogo);
            alert('GAME OVER');
        }
    }
    
    createBG();
    createSnake();
    createFood();
    
    let snakeX= snake[0].x;
    let snakeY= snake[0].y;
    
    if(direction=="right") snakeX += box; 
    if(direction=="left") snakeX -= box; 
    if(direction=="up") snakeY -= box; 
    if(direction=="down") snakeY += box;
    
    if(snakeX != food.x || snakeY != food.y){
        snake.pop(); 
    }
    else{
        som_hit.play();
        food.x = Math.floor(Math.random()*15+1)*box;
        food.y = Math.floor(Math.random()*15+1)*box;
    }
    
    
    let newHead={
        x:snakeX,
        y:snakeY
    }
    snake.unshift(newHead);
}

let jogo=setInterval(startGame,400);
