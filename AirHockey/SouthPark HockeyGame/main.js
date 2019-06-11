/*******************************
* Southpark Air Hockey browser game, uses code off of a github repository for ball physics
* Ai is done with if-else statements.
* v1 only moves left and right at a constant rate.
* v2 moves left and right at a constant rate according to puck position
* v3 moves toward puck and gains possesion of it by getting behind puck and then moving toward bottom of screen is then stopped half-court
* v4 has same functionality of the v3 this time without stopping halfcourt, is able to move and push puck enough to push toward goal, cannot move inside player goal-zone and gravitates to goal-zone when in area
* v5 same functionality as v4 with greater speed and puck shooting ability which allows the cpu to catch any goal attacks from the player. Cpu also pushes puck out of deadlock when 0 motion occurs with cpu in possesion of puck
*********************************/
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

const FPS = 60;
var paused = false;
var totalKineticEnergy = 0;var bumped = false;

var gravityOn = false;var dragOn = true;
var soundOn = true;
var clearCanv = true;var bigBalls = false;
var objArray = [];
var gameMode = 0;
var gameStart = false; var level = 1;
var cpuPoints = 0; var playerPoints = 0;
var cpuShot = false; var imageSwap = 0;

var barbradySprite = new Image();
barbradySprite.src = "barbrady.png";
var kennySprite = new Image(); kennySprite.src = "KennyMcCormick.png";
var tokenSprite = new Image();
tokenSprite.src = "Token.png";
var buttersSprite = new Image();
buttersSprite.src = "ButtersStotch.png";

var fxHit = new Audio("./hockeystick.mp3");
var fxHitWall = new Sound("./wallfx.mp3", 5, 1); fxHitWall.volume = 0.05;
var fxGoal1 = new Audio("./spschooltheme.mp3");
var fxGoal2 = new Audio("./ducksGoalhorn.mp3");
var music = new Audio("./southpark.mp3"); var musicButters = new Audio("./buttersong.mp3");
fxGoal1.volume = 0.50; fxGoal2.volume = 0.75; music.volume = 0.5; fxHitWall.volume = 0.1;
//
GAMESTART();
function GAMESTART(){
      objArray[0] = new Ball(canvas.width/2, canvas.height, 19);
      objArray[1] = new Ball(canvas.width/2, canvas.height/2, 8);
      objArray[2] = new Ball(canvas.width/2, 100, 19);
      objArray[1].dx = 0; objArray[1].dy = 0;
      draw();
}
function Ball(x, y, radius, color) {
    this.radius = radius;
    this.dx = randomDx();
    this.dy = randomDy();
    // mass is that of a sphere as opposed to circle.
    // it *does* make a difference.
    this.mass = this.radius * this.radius * this.radius;
    this.x = x;
    this.y = y;
    this.color = color;
    this.draw = function() {
        ctx.beginPath();
        ctx.arc(Math.round(this.x), Math.round(this.y), this.radius, 0, 2*Math.PI);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.strokeStyle = 'rgba(0, 0, 0, 0.6)';
        ctx.stroke();
        ctx.closePath();
    };
    this.speed = function() {
        // magnitude of velocity vector
        return Math.sqrt(this.dx * this.dx + this.dy * this.dy);
    };
    this.angle = function() {
        //angle of ball with the x axis
        return Math.atan2(this.dy, this.dx);
    };
    this.kineticEnergy = function () {
        return (0.5 * this.mass * this.speed() * this.speed());
    };
    this.onGround = function() {
        return (this.y + this.radius >= canvas.height)
    }
}
function draw() {//Main game function
    //
    canvasBackground();

    drawGame();
    //GAME SETUP
    applyGravity();
    applyDrag();
    moveObjects();
    drawObjects();
    staticCollision();
    ballCollision();
    requestAnimationFrame(draw);
    drawStats();
    gameStuff();
}
function canvasBackground() {
    ctx.fillStyle = "white";
    ctx.fillRect(0,0, canvas.width, canvas.height);
}
function drawGame(){
  //player boundaries
  if(objArray[0].y <100 && objArray[0].x > 0 && objArray[0].x < 150 ){
    if(objArray[0].y < 100 && objArray[0].x > 95 && objArray[0].x < 355)
      objArray[0].x = 95;
  }else if(objArray[0].y <100 && objArray[0].x >310 && objArray[0].x < 450 ){
    if(objArray[0].y < 100 && objArray[0].x > 95 && objArray[0].x < 355)
      objArray[0].x = 355;
  }else if(objArray[0].y < 100 && objArray[0].x > 95 && objArray[0].x < 355)
  {
    objArray[0].y = 100;
  }
  //player
  ctx.fillStyle = "lightblue";
  ctx.fillRect(canvas.width/2-450/4, canvas.height/2+200 , canvas.width/2, 150);
  ctx.fillStyle = "red";
  ctx.fillRect(canvas.width/2-55, canvas.height-30, 110,30);
  ctx.fillStyle = "lightgrey";
  ctx.fillRect(canvas.width/2-50, canvas.height-25, 100,25);
  //cpu
  ctx.fillStyle = "lightblue";
  ctx.fillRect(canvas.width/2-450/4, -50 , canvas.width/2, 150);
  ctx.fillStyle = "red";
  ctx.fillRect(canvas.width/2-55, 0, 110,30);
  ctx.fillStyle = "lightgrey";
  ctx.fillRect(canvas.width/2-50, 0, 100,25);
  //
  ctx.fillStyle = 'lightblue';
  ctx.fillRect(0, canvas.height/2 , canvas.width, 2);
  ctx.fillStyle = 'lightblue';
  ctx.beginPath();
  ctx.arc(canvas.width/2, canvas.height/2, 25, 0, Math.PI*2, true);
  ctx.stroke();
}
function drawStats(){
  ctx.fillStyle ="blue";
  ctx.font="15px Verdana";
  var string = "Level: " + level;
  ctx.fillText(string, 375, 30);
  ctx.fillStyle ="red";
  ctx.font="25px Verdana";
  ctx.fillText(cpuPoints, 25, 25);

  ctx.fillStyle ="green";
  ctx.font="25px Verdana";
  ctx.fillText(playerPoints, canvas.width-40, canvas.height-10);
}
function drawObjects() {
  ctx.fillStyle="green"; //draw player stuff
  objArray[0].draw();
  var p1 = new Image();
  p1.src = "stan-marsh.png";
  ctx.drawImage(p1, objArray[0].x-19, objArray[0].y-19, 19*2 , 19*2);
  //puck stuff
  ctx.fillStyle="black";
  objArray[1].draw();
  //cpu stuff
  if(level === 1){
    ctx.fillStyle = "blue";
    objArray[2].draw();
    ctx.drawImage(barbradySprite, objArray[2].x-19, objArray[2].y-19, 19*2, 19*2);
  }else if(level === 2){
    ctx.fillStyle="teal";
    objArray[2].draw();
    ctx.drawImage(kennySprite, objArray[2].x-19, objArray[2].y-19, 19*2, 19*2);
  }else if(level === 3){
    ctx.fillStyle="purple";
    objArray[2].draw();
    ctx.drawImage(tokenSprite, objArray[2].x-19, objArray[2].y-19, 19*2, 19*2);
  }else if(level === 4){
    ctx.fillStyle="cyan";
    objArray[2].draw();
    ctx.drawImage(buttersSprite, objArray[2].x-19, objArray[2].y-19, 19*2, 19*2);
  }else{
    ctx.fillStyle="purple";
    objArray[2].draw();
    ctx.drawImage(tokenSprite, objArray[2].x-19, objArray[2].y-19, 19*2, 19*2);
  }

}
///
//Ball Physics
function applyDrag() {

    for (var obj in objArray) {
        objArray[obj].dx *= 0.992;
        objArray[obj].dy *= 0.992;
    }

}
function moveObjects() {
  /*
    for (var obj in objArray) {
        objArray[obj].x += objArray[obj].dx;
        objArray[obj].y += objArray[obj].dy;
    }
  */
  objArray[1].x += objArray[1].dx;
  objArray[1].y += objArray[1].dy;
}
function staticCollision() {
    for (var obj1 in objArray) {
        for (var obj2 in objArray) {
            if (obj1 !== obj2 &&
                distance(objArray[obj1], objArray[obj2]) < objArray[obj1].radius + objArray[obj2].radius)
            {
                var theta = Math.atan2((objArray[obj1].y - objArray[obj2].y), (objArray[obj1].x - objArray[obj2].x));
                var overlap = objArray[obj1].radius + objArray[obj2].radius - distance (objArray[obj1], objArray[obj2]);
                var smallerObject = objArray[obj1].radius < objArray[obj2].radius ? obj1 : obj2
                objArray[smallerObject].x -= overlap * Math.cos(theta);
                objArray[smallerObject].y -= overlap * Math.sin(theta);
            }
        }
    }
}
function ballCollision() {
    for (var obj1 in objArray) {
        for (var obj2 in objArray) {
            if (obj1 !== obj2 && distanceNextFrame(objArray[obj1], objArray[obj2]) <= 0) {
                var theta1 = objArray[obj1].angle();
                var theta2 = objArray[obj2].angle();
                var phi = Math.atan2(objArray[obj2].y - objArray[obj1].y, objArray[obj2].x - objArray[obj1].x);
                var m1 = objArray[obj1].mass;
                var m2 = objArray[obj2].mass;
                var v1 = objArray[obj1].speed();
                var v2 = objArray[obj2].speed();

                var dx1F = (v1 * Math.cos(theta1 - phi) * (m1-m2) + 2*m2*v2*Math.cos(theta2 - phi)) / (m1+m2) * Math.cos(phi) + v1*Math.sin(theta1-phi) * Math.cos(phi+Math.PI/2);
                var dy1F = (v1 * Math.cos(theta1 - phi) * (m1-m2) + 2*m2*v2*Math.cos(theta2 - phi)) / (m1+m2) * Math.sin(phi) + v1*Math.sin(theta1-phi) * Math.sin(phi+Math.PI/2);
                var dx2F = (v2 * Math.cos(theta2 - phi) * (m2-m1) + 2*m1*v1*Math.cos(theta1 - phi)) / (m1+m2) * Math.cos(phi) + v2*Math.sin(theta2-phi) * Math.cos(phi+Math.PI/2);
                var dy2F = (v2 * Math.cos(theta2 - phi) * (m2-m1) + 2*m1*v1*Math.cos(theta1 - phi)) / (m1+m2) * Math.sin(phi) + v2*Math.sin(theta2-phi) * Math.sin(phi+Math.PI/2);

                objArray[obj1].dx = dx1F;
                objArray[obj1].dy = dy1F;
                objArray[obj2].dx = dx2F;
                objArray[obj2].dy = dy2F;


            }
        }
        wallCollision(objArray[obj1]);
    }
}
function wallCollision(ball) {
    if (ball.x - ball.radius + ball.dx < 0 ||
        ball.x + ball.radius + ball.dx > canvas.width) {
        ball.dx *= -1.08;
    }
    if (ball.y - ball.radius + ball.dy < 0 ||
        ball.y + ball.radius + ball.dy > canvas.height) {
        ball.dy *= -1.08;
    }
    if (ball.y + ball.radius > canvas.height) {
        ball.y = canvas.height - ball.radius;
    }
    if (ball.y - ball.radius < 0) {
        ball.y = ball.radius;
    }
    if (ball.x + ball.radius > canvas.width) {
        ball.x = canvas.width - ball.radius;
    }
    if (ball.x - ball.radius < 0) {
        ball.x = ball.radius;
    }
}
//
///
function gameStuff(){
  //Goals
  //p2
  if(objArray[1].x > canvas.width/2-50 && objArray[1].x < canvas.width/2+50 && objArray[1].y > canvas.height-15)
  {
    objArray[1].x = canvas.width/2; objArray[1].y =  canvas.height/2;
    objArray[1].dx = 0; objArray[1].dy = 0;
    cpuPoints++; fxGoal2.play(); gameStart = false; objArray[2].x = 220; objArray[2].y = 115;
  }//p1
  if(objArray[1].x > canvas.width/2-50 && objArray[1].x < canvas.width/2+50 && objArray[1].y < 15){
    objArray[1].x = canvas.width/2; objArray[1].y =  canvas.height/2;
    objArray[1].dx = 0; objArray[1].dy = 0;
    playerPoints++; gameStart = false;
  }
  //stage counter
  if(cpuPoints >= 3){
    cpuPoints = 0;
    playerPoints = 0;

  }if(playerPoints >= 2){
    playerPoints = 0; cpuPoints = 0; level++; fxGoal1.play();
    gameStart = false;
  }
  //cpu AI LEVELS
  levelS();
  //get for game border
  if(objArray[1].x-11 < 0 || objArray[1].x+11 > 450 || objArray[1].y-11 < 0 || objArray[1].y+11 > 600){
    fxHitWall.play();
  }
}
function levelS(){//game ai
  {
    if(gameStart === true){
      if(level === 1){//Officer Barbrady
        if(objArray[1].x > objArray[2].x){
          objArray[2].x +=  5;
        }if(objArray[1].x < objArray[2].x){
          objArray[2].x -= 5;
        }if(objArray[2].y > 120){ objArray[2].y =120; }if(objArray[2].y < 120) { objArray[2].y += 5; }
      }else if(level === 2){//Kenny
        if(objArray[1].x > objArray[2].x){
          objArray[2].x += 6;
        }if(objArray[1].x < objArray[2].x){
          objArray[2].x -= 6;
        }if(objArray[1].y < objArray[2].y+30){
          objArray[2].y -= 6;
        }if(objArray[1].y > objArray[2].y ){
        objArray[2].y += 6;
        }
        if(objArray[2].y > canvas.height/2-25){  objArray[2].y = canvas.height/2 -25; }
      }else if(level === 3){//Token
        if(objArray[1].x > objArray[2].x){
          objArray[2].x += 4;
        }if(objArray[1].x < objArray[2].x){
          objArray[2].x -= 4;
        }if(objArray[1].y < objArray[2].y+30){
          objArray[2].y -= 8;
        }if(objArray[1].y > objArray[2].y ){
        objArray[2].y += 4;
        //find if in range
        var bX = objArray[2].x - objArray[1].x;
        var bY = objArray[2].y - objArray[1].y;
        if(Math.sqrt(Math.pow(bX,2) + Math.pow(bY,2)) < 37){
          //butters shoots puck
          objArray[1].dy += .25; fxHit.play();
        }
        if(objArray[2].y > 460 && objArray[2].x > 0 && objArray[2].x < 150 ){
          if(objArray[2].y > 490 && objArray[2].x > 95 && objArray[2].x < 355)
            objArray[2].x = 95;
        }else if(objArray[2].y > 460 && objArray[2].x >310 && objArray[2].x < 450 ){
          if(objArray[2].y > 490 && objArray[0].x > 95 && objArray[2].x < 355)
            objArray[2].x = 355;
        }else if(objArray[2].y > 480 && objArray[2].x > 95 && objArray[2].x < 355){ objArray[2].y = 480;  }
        }
      }else if(level === 4){
        //BUTTERS
        music.pause(); musicButters.play();
        //find if in range
        var bX = objArray[2].x - objArray[1].x;
        var bY = objArray[2].y - objArray[1].y;
        if(Math.sqrt(Math.pow(bX,2) + Math.pow(bY,2)) < 37){
          //butters shoots puck
          objArray[1].dy += 1.75; fxHit.play();
        }
        //if Butters is away from the puck and he is closer to the his net
        if(objArray[2].y < objArray[1].y){
          if(objArray[1].x > objArray[2].x +30){//regular x y bounds tracking, adjusted to let butters stop before pushing the puck
            objArray[2].x += 5;
          }if(objArray[1].x < objArray[2].x-30){
            objArray[2].x -= 5;
          }if(objArray[1].y > objArray[2].y+30){
          objArray[2].y += 5;
        }
        if((objArray[1].dx < 1 && objArray[1].dy < 1) && Math.sqrt(Math.pow(bX,2) + Math.pow(bY,2)) < 37){//if puc is within distance and has stopped
          if(objArray[2].x < 190){ objArray[1].dx +=8; }//push puck out of deadlock
          if(objArray[2].x > 300){ objArray[1].dx -=8; }
        }
      }else{//run to puck
          objArray[2].y -= 8;
        }
        if(objArray[2].y > 480 && objArray[2].x > 130 && objArray[2].x < 355){
          objArray[2].y = 480; console.log("horton wtf");
        }
    }else{ level = 3; }
  }
  }
}
///
//MATH UTILITIES
function randomX() {
    x = Math.floor(Math.random() * canvas.width);
    if (x < 30) {
        x = 30;
    } else if (x + 30 > canvas.width) {
        x = canvas.width - 30;
    }
    return x;
}

function randomY() {
    y = Math.floor(Math.random() * canvas.height);
    if (y < 30) {
        y = 30;
    } else if (y + 30 > canvas.height) {
        y = canvas.height - 30;
    }
    return y;
}
function randomDx() {
    r = Math.floor(Math.random() * 10 - 5);
    return r;
}

function randomDy() {
    r = Math.floor(Math.random() * 10 - 5);
    return r;
}
function distanceNextFrame(a, b) {
    return Math.sqrt((a.x + a.dx - b.x - b.dx)**2 + (a.y + a.dy - b.y - b.dy)**2) - a.radius - b.radius;
}

function distance(a, b) {
    return Math.sqrt((a.x - b.x)**2 + (a.y - b.y)**2);
}
function applyGravity() {
  /*
    for (var obj in objArray) {
        if (objArray[obj].onGround() == false) {
            objArray[obj].dy += 0.29;
        }
    }
  */
  //objArray[1].dy -= .25;
  //objArray[1].dx += .25;

}
///
//INPUT UTILITIES
function Sound(src, maxStreams = 1, vol = 1.0) {
            this.streamNum = 0;
            this.streams = [];
            for (var i = 0; i < maxStreams; i++) {
                this.streams.push(new Audio(src));
                this.streams[i].volume = vol;
            }

            this.play = function() {
                if (1) {
                    this.streamNum = (this.streamNum + 1) % maxStreams;
                    this.streams[this.streamNum].play();
                }
            }

            this.stop = function() {
                this.streams[this.streamNum].pause();
                this.streams[this.streamNum].currentTime = 0;
            }
}
addEventListener('click', handleClick);
addEventListener('mousemove', function(evt) {

    if(gameStart === true){
						var mousePos = calculateMousePos(evt);
            objArray[0].x = mousePos.x; objArray[0].y = mousePos.y;
            console.log(mousePos.x + " " + mousePos.y);
            fxGoal1.pause(); fxGoal1.currentTime = 0;
            fxGoal2.pause(); fxGoal2.currentTime = 0;

            music.play();
    }
    if(gameStart === false && gameMode === 2){ music.pause(); music.currentTime = 0; musicButters.pause(); musicButters.currentTime = 0;}
});
function calculateMousePos(evt){
	var rect = canvas.getBoundingClientRect();
	var root = document.documentElement;
	var mouseX = evt.clientX - rect.left - root.scrollLeft;
	var mouseY = evt.clientY - rect.top - root.scrollTop;
	return{ x:mouseX,y:mouseY };
}
function handleClick(){
  if(gameStart === false){
    gameStart = true;
  }
    var segX = Math.abs(objArray[0].x - objArray[1].x);
    var segY = Math.abs(objArray[0].y - objArray[1].y);
    var distance1 = Math.sqrt(Math.pow(segX, 2) + Math.pow(segY, 2));

    if(distance1 < 42){
      console.log("honk honk"); fxHit.play();
      objArray[1].dy = - 10;
      if(objArray[0].x > objArray[1].x+10)
        objArray[1].dx = -10;
      if(objArray[0].x < objArray[1].x-10)
        objArray[1].dx = 10;
    }
}
