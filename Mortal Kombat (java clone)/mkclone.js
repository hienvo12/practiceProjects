// GAME IS STILL GLITCHY AND MECHANICS AND QUITE BUGGY
//implemented with boolean variables to test for conditions,
//does not go much further than nested if-else statements and switch statements for animations
//Animates based on setInterval function call to the main update() function and all time variables called inside update() are based on the first setInterval function call


//BOOLEANS
var canv = document.getElementById("gameCanvas");
var ctx = canv.getContext("2d");
const FLOOR = 270;
const SOUND_ON = true;
var MUSIC_ON = true;
var gameStart = false; var prounds = 0; crounds = 0; var rounds = 0;
var fatalityPlayed = false;
//
var WEIGHT = 135; var HEIGHT = 250;
var playerX = 50;
var left = false; var right = false; var up = false; var down = false; var sprint = false;
var hipunch = false; var hikick = false; var midkick = false; var spinkick = false; var playerBlock = false;
var inrange1 = false; var inrange2 = false; var inrange3 = false; var inrange4 = false; var inrange5 = false;
var keyPressed = false; keyPressed2 = false; var notMoving = true; var isAttacking = false; var isUpperCut = false;
var hiKickTimer; var cpuDamageTimeU; var sprintTimer;
var flag1 = false; var flag2 = false; var flag3 = false; var flag4 = false; var flag5 = false;
var playerCollision = false;
var playerKnockBack = false;
var uppercutOn = false; var spinbackOn = false; var midkickOn = false; var highkickOn = false; var highpunchOn = false;
var uppercutFatality = false; var cpuhitFatality = false;
var animation = false;
var PLAYERLIFE = 250; var KEYDOWN = false; var GAMEPAUSE = false;
var gameTime; var roundTime = 90;
var standTime = Date.now(); var walkTime = Date.now(); var cpuDamageTime = Date.now();
//
var cpuX = 550; var CPULIFE = 250;
var cpuhitU = false; var cpuhitKnockBack = false; var cpuhitKnockBack1 = false; var cputhitKnockBack2 = false;
var kanoMoving = false; var kanoAttacking = false; var cpu_isHit = false;
var cpuwalkTime = Date.now(); var kanoAttackTime;
//
var pkbt = false;  var pdmgtime;
var GAMEOVER = true; var randomStage = Math.random() * 5;

//set up EVENT HANDLERS
document.addEventListener("keydown", keyDown);
document.addEventListener("keyup", keyUp);
//SOUND EFFECTS
var fxHitLight = new Sound("sounds/hitsounds/mk3-00100.mp3");
var fxHitSolid = new Sound("sounds/hitsounds/mk3-00270.mp3");
var fxHitSolid2 = new Sound("sounds/hitsounds/mk3-00280.mp3")
var fxHitHard = new Sound("sounds/hitsounds/mk3-00245.mp3");
var fxHitHard2 = new Sound("sounds/hitsounds/mk3-00240.mp3");
var fxFatality = new Sound("sounds/mk2Fatality.mp3");
var music = new Audio("sounds/MortalKombatMovieThemeSong.mp3");
music.volume = 0.5;

//
//SET UP GAME LOOP
setInterval(update, 1000 / 60);
//
//PLAYER INPUT
function keyDown(ev){
//pause/unpase
if(ev.keyCode === 13){
  gameStart = true;
  if(GAMEOVER === true)
    music = new Audio("sounds/MortalKombatMovieThemeSong.mp3");
    gameTime = Date.now();
    GAMEOVER = false;
    randomStage = Math.random() * 5;
  }
if(ev.keyCode === 27){ gameStart = false; }
//MOVEMENT IFS
{
  if(ev.keyCode === 65){ //left
    if(keyPressed === false){
			left = true; down = false; right = false;
    }
    }
	if(ev.keyCode === 68){ //right
    if(keyPressed === false){
	     right = true; down = false; left = false;
     }
 }
	if(ev.keyCode === 87){ //up
    if(keyPressed === false){
		  up = true;
    }
  }
	if(ev.keyCode === 83){//down
    if(keyPressed === false){
		    down = true; left = false; right = false; up = false;
    }
  }
	if(ev.keyCode === 16){
    if(keyPressed === false){
		    sprint = true;
      }
  }
}
  //KOMBAT IFS
  if(ev.keyCode === 74){
      hipunch = true; hikick = false; midkick = false; spinkick =false;
  }if(ev.keyCode === 75){
      hikick = true; hipunch = false; midkick = false; spinkick = false;
  }if(ev.keyCode === 78){
      midkick = true; hipunch = false; hikick = false; spinkick = false;
  }if(ev.keyCode === 77){
      spinkick = true; hipunch = false; hikick = false; midkick = false;
  }
  if(ev.keyCode === 76){
    playerBlock = true;
  }
}
function keyUp(ev){
//movement
  {
  if(ev.keyCode === 65){//left
			left = false;
    }
	if(ev.keyCode === 68){//right
	 right = false;
 }
	if(ev.keyCode === 87){//up
		up = false;
  }
	if(ev.keyCode === 83){//down
		down = false;
  }
	if(ev.keyCode === 16){
		sprint = false;
  }
}
//KOMBAT IFS
  if(ev.keyCode === 74){
    hipunch = false;
  }if(ev.keyCode === 75){
    hikick = false;
  }if(ev.keyCode === 78){
    midkick = false;
  }if(ev.keyCode === 77){
    spinkick = false;
  }
  if(ev.keyCode === 76){ playerBlock = false; }
}
function Sound(src, maxStreams = 1, vol = 1.0) {
            this.streamNum = 0;
            this.streams = [];
            for (var i = 0; i < maxStreams; i++) {
                this.streams.push(new Audio(src));
                this.streams[i].volume = vol;
            }

            this.play = function() {
                if (SOUND_ON) {
                    this.streamNum = (this.streamNum + 1) % maxStreams;
                    this.streams[this.streamNum].play();
                }
            }

            this.stop = function() {
                this.streams[this.streamNum].pause();
                this.streams[this.streamNum].currentTime = 0;
            }
}

function update() {

  //pause for knockdowns
  if(GAMEPAUSE === true && gameStart === true){
    setTimeout( (update) => { GAMEPAUSE = false;} , 235);
  }
  else if(gameStart === true){

  //get time
  var deltaX = Date.now();
  //tick Music
  if(MUSIC_ON === true){
    music.play();
  }else{
    music.muted = true;
  }
  //GAME SCREEN
  switch(parseInt(randomStage)){
    case 0: {
      screen0 = new Image();
      screen0.src = "background/mkbackground.jpg";
      ctx.drawImage(screen0, 0,0, canv.width, canv.height);
      break;
    }case 1: {
      screen1 = new Image();
      screen1.src = "background/mkbackground2.jpg";
      ctx.drawImage(screen1, 0,0, canv.width, canv.height);
      break;
    }case 2: {
      screen2 = new Image();
      screen2.src = "background/mkbackground3.jpg";
      ctx.drawImage(screen2, 0,0, canv.width, canv.height);
      break;
    }case 3: {
      screen3 = new Image();
      screen3.src = "background/mkbackground4.png";
      ctx.drawImage(screen3, 0,0, canv.width, canv.height);
      break;
    }case 4: {
      screen4 = new Image();
      screen4.src = "background/Portal.png";
      ctx.drawImage(screen4, 0,0, canv.width, canv.height);
      break;
    }case 5: {
      screen5 = new Image();
      screen5.src = "background/thepit.gif";
      ctx.drawImage(screen5, 0,0, canv.width, canv.height);
      break;
    }default: {}
  }

  //CPU stuff
  {
  //CPU AI
    //Move CPU FORWARD
    //time VARIABLES
    if(kanoMoving != true){
      cpuwalkTime = Date.now();

    }
    var ctvar = ((deltaX - cpuwalkTime) / 150).toFixed(2);
    if(kanoAttacking != true)
      kanoAttackTime = Date.now();
    var ctvar2 = ((deltaX - kanoAttackTime) / 56).toFixed(2);
    if(ctvar2 > 8){ kanoAttackTime = Date.now();}
  //
    if((cpuX+35) > (playerX+WEIGHT)){//animation for movement
      if(cpu_isHit === false && fatalityPlayed === false){
        moveKanoLeft(5, parseInt(ctvar));
        kanoMoving = true;
        kanoAttacking = false;
      }
    }
    else {
      if(fatalityPlayed != true){
        kanoAttacking = true;
        kanoPunch(parseInt(ctvar2));//animate for cpu attacking
        kanoMoving = false;
        animation = true;
      }
    }
  //MORE CPU AI stuff
{
  var tvar = ((deltaX - standTime) / 150).toFixed(2);
  if(tvar > 8 || tvar < 0){
    standTime = Date.now();
  }
  var tvar1 = ((deltaX - cpuDamageTime) / 75).toFixed(2);
  if(tvar1 > 4){
    cpuhitKnockBack = false;
    cpuhitKnockBack1 = false;
    cputhitKnockBack2 = false;
    cpuhitFatality = false;
    animation = false;
    cpuDamageTime = Date.now();
  }
  var tvar2 = ((deltaX - cpuDamageTimeU) / 42).toFixed(2);
  if(tvar2 > 9){
    cpuhitU = false;
    animation = false;
    cpuDamageTimeU = Date.now();
  }
  //cpu collision with player
  if((kanoAttacking === true && down != true)){
    if(playerBlock === false){
      playerKnockBack = true;
      PLAYERLIFE -= 1;
      fxHitLight.play();
    }else{
      PLAYERLIFE -= 0.05;
      playerX -= .5;
    }
  }else {
    playerKnockBack = false;
  }
  //
  //Player Collision with CPU
  if(isAttacking === true && inrange1 === true && hipunch === true && isUpperCut === false){
    cputhitKnockBack2 = true;
    animation = true;
    fxHitLight.play(); kanoMoving = false; kanoAttacking = false; cpu_isHit = true;
  }else if(isAttacking === true && inrange3 === true && hikick === true && isUpperCut === false){
    cpuhitKnockBack1 = true;
    animation = true;
    fxHitSolid2.play(); kanoMoving = false; kanoAttacking = false; cpu_isHit = true;
  }else if(isAttacking === true && inrange2 === true && midkick === true && isUpperCut === false){
    cpuhitKnockBack = true;
    animation = true;
    fxHitSolid.play(); kanoMoving = false; kanoAttacking = false; cpu_isHit = true;
  }else if(isAttacking === true && inrange4 === true && spinkick === true && isUpperCut === false){
    cpuhitU = true;
    animation = true;
    fxHitHard.play(); kanoMoving = false; kanoAttacking = false; cpu_isHit = true;
  }else if(isAttacking === true && inrange5 === true && isUpperCut === true){
    cpuhitU = true;
    animation = true;
    fxHitHard2.play(); kanoMoving = false; kanoAttacking = false; cpu_isHit = true;
    if(fatalityPlayed === true){
      console.log("fatality");
      cpuhitFatality = true;
      cpuhitU = false;
    }
  }
  else{//Animation for standing still
    if(animation != true && fatalityPlayed != true && kanoMoving != true){
      cpuStanding(parseInt(tvar));
    }else if(fatalityPlayed === true){
      cpuFatalityDizzy(parseInt(tvar));
    }
  }
}

  //
  //
  //PLAYER
  //Handle Player Standing
  var timevar = ((deltaX - standTime) / 150).toFixed(2);
  if(timevar > 10){ standTime = Date.now();  }
  if(notMoving){
    if(keyPressed === false && playerKnockBack != true)
      subZeroStanding(parseInt(timevar));
  }
  //Handle player MOVEMENT
{
  //check for sprint
  if(sprint === true){
    if(keyPressed2 === false){
      sprintTimer = Date.now();
    }
    keyPressed2 = true;
    var time3 = (deltaX - sprintTimer) / 150;
  }else{ keyPressed2 = false; }
  //
  time3 = (deltaX - sprintTimer) / 150;
  if(left === true && keyPressed != true && playerKnockBack != true){
    notMoving = false;
    moveSubZeroBack(-5, parseInt(timevar));
  }else { notMoving = true; }
  if(left === true && keyPressed != true && sprint === true && playerKnockBack != true){
    if(parseInt(time3) < 0.25){
      notMoving = false;
      moveSubZeroBack(-10, parseInt(timevar));
    }
  }
  if(right === true && keyPressed != true && sprint === true && playerKnockBack != true){
    if( time3 < 3){
      notMoving = false;
      runSubZero(13, parseInt(timevar));
    }
  }else{  }
  if(right === true && keyPressed != true && sprint === false && playerKnockBack != true){
    notMoving = false;
    moveSubZero(5, parseInt(timevar));
  }else { }
  if(down === true && keyPressed != true ){
    notMoving = false;
    duckSubZero(parseInt(timevar));
  }
}
  //Handle player KOMBAT
  //time variables
  var timevar2 = ((deltaX - hiKickTimer)/56).toFixed(2);
  if(timevar2 > 4){ highpunchOn = false; keyPressed = false;}
  var timevar3 = ((deltaX - hiKickTimer)/17).toFixed(2);
  if(timevar3 > 17) { highkickOn = false; keyPressed = false;}
  var timevar4 = ((deltaX - hiKickTimer)/15).toFixed(2);
  if(timevar4 > 20){ midkickOn = false; keyPressed = false; }
  var timevar5 = ((deltaX - hiKickTimer)/50).toFixed(2);
  if(timevar5 > 12){ spinbackOn = false; keyPressed = false;}
  var timevar6 = ((deltaX - hiKickTimer)/50).toFixed(2);
  if(timevar6 > 12) { uppercutOn = false;  keyPressed = false;}
  //Kombat Player handler
{
  if(hipunch === true && down != true){
    notMoving = false;
    if(keyPressed === false){
      hiKickTimer = Date.now();
    }
    keyPressed = true;
    highpunchOn = true;
    isAttacking = true;
  }else if(hikick === true){
    notMoving = false;
    if(keyPressed === false){
      hiKickTimer = Date.now();
    }
    highkickOn = true;
    keyPressed = true;
    isAttacking = true;
  }else if(midkick === true){
    notMoving = false;
    if(keyPressed === false){
      hiKickTimer = Date.now();
    }
    keyPressed = true;
    midkickOn = true;
    isAttacking = true;
  }else if(spinkick === true){
    notMoving = false;
    if(keyPressed === false){
      hiKickTimer = Date.now();
    }
    keyPressed = true;
    spinbackOn = true;
    isAttacking = true;
  }else if(down === true && hipunch === true){
    notMoving = false;
    if(keyPressed === false){
      hiKickTimer = Date.now();
    }
    keyPressed = true;
    uppercutOn = true;
    isAttacking = true; isUpperCut = true;
  }
  else { keyPressed = false; isAttacking = false; isUpperCut = false; }

}
  //Handle Collision
{
  if( (playerX + WEIGHT -55) > cpuX && left === false){
      playerCollision = true;
  }else{ playerCollision = false; }

  if( ((playerX + WEIGHT -30) > cpuX ) && isAttacking === true){
    inrange1 = true;
    if(flag1 === false){
      cpuDamageTime = Date.now();
    }
    flag1 = true;
  }
  else{
    inrange1 = false;
    flag1 = false;
  }
  //
  if(((playerX + WEIGHT -25) > cpuX ) && isAttacking === true && isUpperCut === false){
    inrange3 = true;
    if(flag3 === false){
      cpuDamageTime = Date.now();
    }
    flag3 = true;
  }else{
    inrange3 = false;
    flag3 = false;
  }
  //upperCut
  if(((playerX + WEIGHT -15) > cpuX ) && isAttacking === true && isUpperCut === true){
    inrange5 = true;
    if(flag5 === false){
      cpuDamageTimeU = Date.now();
    }
    flag5 = true;
  }else{
    inrange5 = false;
    flag5 = false;
  }
  if( ((playerX + WEIGHT -15) > cpuX) && isAttacking === true){
    inrange2 = true;
    if(flag2 === false){
      cpuDmageTime = Date.now();
    }
      flag2 = true;
  }else{
    inrange2 = false;
    flag2 = false;
  }

  if( ((playerX + WEIGHT -5) > cpuX) && isAttacking === true){
    inrange4 = true;
    if(flag4 === false){
      cpuDamageTimeU = Date.now();
    }
      flag4 = true;
  }else{
    inrange4 = false;
    flag4 = false;
  }


}
//HANDLE movement animate
{
  if(uppercutOn === true){
    upperCut(parseInt(timevar6));
    keyPressed = true;
  }else{}
  if(spinbackOn === true){
    spinKick(parseInt(timevar5));
    keyPressed = true;
  }else{}
  if(midkickOn === true){
    midKick(parseInt(timevar4));
    keyPressed = true;
  }else{}
  if(highkickOn === true){
    highKick(parseInt(timevar3));
    keyPressed = true;
  }else{}
  if(highpunchOn === true){
    highPunch(parseInt(timevar2));
    keyPressed = true;
  }
  if(playerBlock === true){
    playerBlocking(1);
    keyPressed = true;
  }

  //cpu animate
  if(cpuhitU === true){
    cpuKnockDown(parseInt(tvar2), 5);//3
  }else{}
  if(cpuhitKnockBack === true){
    cpuKnockBack(parseInt(tvar1), 10);//5
  }else{}
  if(cpuhitKnockBack1 === true){
    cpuKnockBack(parseInt(tvar1), 7);//2
  }else {}
  if(cputhitKnockBack2 === true){
    cpuDamage(parseInt(tvar1), 5);//1
  }
  if(cpuhitFatality === true){
    cpuFatality(parseInt(tvar2));
  }else {}

  if(kanoAttacking === false)
    playerKnockBack = false;
}

  //player animate
  if(pkbt === false)
    pdmgtime = Date.now();
  ptvar = (deltaX - pdmgtime)/150;
  if(ptvar > 2)
    pdmgtime = Date.now();
  if(playerKnockBack === true){
    playerKnockedBack(parseInt(ptvar), 5);
    pkbt = true;
  }



  //GAME BOUNDS
  if(playerX <= 0){
    playerX = 0;
  }
  if(playerX >= canv.width - WEIGHT){
    playerX = canv.width - WEIGHT;
  }
  if(cpuX <= 0)
    cpuX = 0;
  if(cpuX >= canv.width - WEIGHT)
    cpuX = canv.width - WEIGHT;

//
var roundTimer = ((deltaX - gameTime)/1000).toFixed(2);
if(roundTimer > 60){
  ctx.fillStyle = "White";
  ctx.font = "100px Verdana";
  ctx.fillText("Draw", 220, 200);
  resetGame();
  roundTimer = 0;
  gameTime = Date.now();
}

//UI SCREEN
if(CPULIFE < .01){
  ctx.fillStyle = "White";
  ctx.font = "100px Verdana";
  ctx.fillText("Player 1 Wins", 220, 330);
  MUSIC_ON = false;
  //Start new round
  gameTime = Date.now();
  rounds += 1;
  prounds += 1;
  if(prounds < 2){
    resetGame();
  }
  if(prounds >= 2){
    ctx.fillStyle = "red";
    ctx.font = "120px impact";
    ctx.fillText("Game OVER", 220, 200);
    if(fatalityPlayed != true){
      fxFatality.play();
      fatalityPlayed = true;
      cpuX = 450; playerX = 400;
    }
    GAMEOVER = true;
  }
  if(rounds === 1){
    if(prounds >= 2 ){ }
    else{ gameStart = false; }
    rounds = 0;
  }

}else if(PLAYERLIFE < .01){
  ctx.fillStyle = "White";
  ctx.font = "100px Verdana";
  ctx.fillText("Player 2 Wins", 220, 330);
  MUSIC_ON = false;
  //Start new round
  gameTime = Date.now();
  rounds += 1;
  crounds += 1;
  if(prounds < 2){
    resetGame();
  }
  if(crounds >= 2){
    ctx.fillStyle = "red";
    ctx.font = "120px impact";
    ctx.fillText("Game OVER", 220, 200);
    crounds = 0; prounds = 0;
    GAMEOVER = true;
  }
  if(rounds === 1){
    if(crounds >= 2){ }
    else{ gameStart = false; }
    rounds = 0;
  }

}
else{
  //player LIFEBAR
  ctx.fillStyle = "green";
  ctx.fillRect(90+(250-PLAYERLIFE),20, 250-(250-PLAYERLIFE), 25);
  ctx.fillStyle = "red";
  ctx.fillRect(90,20, 250-PLAYERLIFE, 25);
  ctx.fillStyle = "White";
  ctx.font = "20px verdana";
  ctx.fillText("Player 1", 90,40);
  //CPU LIFEBAR
  ctx.fillStyle = "green";
  ctx.fillRect(760,20, CPULIFE, 25);
  ctx.fillStyle = "red";
  ctx.fillRect(760+250-(250-CPULIFE),20, 250-CPULIFE, 25);
  ctx.fillStyle = "White";
  ctx.font = "20px verdana";
  ctx.fillText("Player 2", 760,40);
  //TIMER
  ctx.fillStyle = "white";
  ctx.font = "40px Verdana";
  ctx.fillText(roundTimer, 760/2 + 100 , 55);
}


}
}

}
//CPU stuff
//CPU Collision
function cpuDamage(sTime, dmgFallBack){
  cpuX += dmgFallBack;
  switch(sTime){
    case 0: {
      cd0 = new Image();
      cd0.src = "kano/right/endure/0.png";
      ctx.drawImage(cd0, cpuX ,canv.height-FLOOR, WEIGHT, HEIGHT);
      CPULIFE -= 1;
      break;
    }case 1: {
      cd1 = new Image();
      cd1.src = "kano/right/endure/1.png";
      ctx.drawImage(cd1, cpuX ,canv.height-FLOOR, WEIGHT, HEIGHT); cpu_isHit = false;
      break;
    }case 2: {
      cd2 = new Image();
      cd2.src = "kano/right/endure/2.png";
      ctx.drawImage(cd2, cpuX ,canv.height-FLOOR, WEIGHT, HEIGHT);
      break;
    }
    default: {}
  }
}
function cpuKnockBack(sTime, dmgFallBack){
  cpuX += dmgFallBack;
  switch(sTime){
    case 0: {
      cdd0 = new Image();
      cdd0.src = "kano/right/knock-down/0.png";
      ctx.drawImage(cdd0, cpuX ,canv.height-FLOOR, WEIGHT*1.25, HEIGHT);
      CPULIFE -= 2;
      break;
    }case 1: {
      cdd1 = new Image();
      cdd1.src = "kano/right/knock-down/1.png";
      ctx.drawImage(cdd1, cpuX ,canv.height-FLOOR, WEIGHT*1.25, HEIGHT);
      break;
    }case 2: {
      cd0 = new Image();
      cd0.src = "kano/right/endure/0.png";
      ctx.drawImage(cd0, cpuX ,canv.height-FLOOR, WEIGHT, HEIGHT); cpu_isHit = false;
      break;
    }case 3: {
      cd1 = new Image();
      cd1.src = "kano/right/endure/1.png";
      ctx.drawImage(cd1, cpuX ,canv.height-FLOOR, WEIGHT, HEIGHT);
      break;
    }case 4: {
      cd2 = new Image();
      cd2.src = "kano/right/endure/2.png";
      ctx.drawImage(cd2, cpuX ,canv.height-FLOOR, WEIGHT, HEIGHT);
      break;
    }default: {}
  }
}
function cpuKnockDown(sTime, dmgFallBack){
  cpuX += dmgFallBack;
  switch(sTime){
    case 0: {
      cdd0 = new Image();
      cdd0.src = "kano/right/knock-down/0.png";
      ctx.drawImage(cdd0, cpuX ,canv.height-FLOOR, WEIGHT, HEIGHT);
      CPULIFE -= 5;
      break;
    }case 1: {
      cdd1 = new Image();
      cdd1.src = "kano/right/knock-down/1.png";
      ctx.drawImage(cdd1, cpuX ,canv.height-FLOOR, WEIGHT*1.5, HEIGHT/1.5);
      break;
    }case 2: {
      cdd2 = new Image();
      cdd2.src = "kano/right/knock-down/2.png";
      ctx.drawImage(cdd2, cpuX ,canv.height-FLOOR, WEIGHT*1.5, HEIGHT/1.75);
      break;
    }case 3: {
      cdd3 = new Image();
      cdd3.src = "kano/right/knock-down/3.png";
      ctx.drawImage(cdd3, cpuX ,canv.height-FLOOR+(HEIGHT/2), WEIGHT*1.5, HEIGHT/1.75);
      break;
    }case 4: {
      cdd4 = new Image();
      cdd4.src = "kano/right/knock-down/4.png";
      ctx.drawImage(cdd4, cpuX ,canv.height-FLOOR+(HEIGHT/2), WEIGHT*1.5, HEIGHT/1.75);
      break;
    }case 5: {
      cdd5 = new Image();
      cdd5.src = "kano/right/knock-down/5.png";
      ctx.drawImage(cdd5, cpuX ,canv.height-FLOOR+(HEIGHT/2), WEIGHT*1.5, HEIGHT/1.75);
      break;
    }case 6: {
      cdd6 = new Image();
      cdd6.src = "kano/right/knock-down/6.png";
      ctx.drawImage(cdd6, cpuX ,canv.height-FLOOR+(HEIGHT/2), WEIGHT*1.5, HEIGHT/1.75);GAMEPAUSE = true; cpu_isHit = false;
      break;
    }case 7: {
      cdd7 = new Image();
      cdd7.src = "kano/right/knock-down/7.png";
      ctx.drawImage(cdd7, cpuX ,canv.height-FLOOR+(HEIGHT/2), WEIGHT*1.5, HEIGHT/1.75);
      break;
    }case 8: {
      cdd8 = new Image();
      cdd8.src = "kano/right/knock-down/8.png";
      ctx.drawImage(cdd8, cpuX ,canv.height-FLOOR, WEIGHT, HEIGHT/1.75);
      break;
    }case 9: {
      cdd9 = new Image();
      cdd9.src = "kano/right/knock-down/9.png";
      ctx.drawImage(cdd9, cpuX ,canv.height-FLOOR, WEIGHT, HEIGHT/1.75);
      break;
    }default: {}

  }
}
function cpuFatalityDizzy(sTime){

  switch(sTime){
    case 0: {
      cpudizzy0 = new Image();
      cpudizzy0.src = "kano/DIzzy/0.png";
      ctx.drawImage(cpudizzy0, cpuX ,canv.height-FLOOR, WEIGHT, HEIGHT);
      break;
    }case 1: {
      cpudizzy1 = new Image();
      cpudizzy1.src = "kano/Dizzy/1.png";
      ctx.drawImage(cpudizzy1, cpuX ,canv.height-FLOOR, WEIGHT, HEIGHT);
      break;
    }case 2: {
      cpudizzy2 = new Image();
      cpudizzy2.src = "kano/Dizzy/2.png";
      ctx.drawImage(cpudizzy2, cpuX ,canv.height-FLOOR, WEIGHT, HEIGHT);
      break;
    }case 3: {
      cpudizzy3 = new Image();
      cpudizzy3.src = "kano/Dizzy/3.png";
      ctx.drawImage(cpudizzy3, cpuX ,canv.height-FLOOR, WEIGHT, HEIGHT);
      break;
    }case 4: {
      cpudizzy4 = new Image();
      cpudizzy4.src = "kano/Dizzy/4.png";
      ctx.drawImage(cpudizzy4, cpuX ,canv.height-FLOOR, WEIGHT, HEIGHT);
      break;
    }case 5: {
      cpudizzy5 = new Image();
      cpudizzy5.src = "kano/Dizzy/5.png";
      ctx.drawImage(cpudizzy5, cpuX ,canv.height-FLOOR, WEIGHT, HEIGHT);
      break;
    }case 6: {
      cpudizzy6 = new Image();
      cpudizzy6.src = "kano/Dizzy/6.png";
      ctx.drawImage(cpudizzy6, cpuX ,canv.height-FLOOR, WEIGHT, HEIGHT);
      break;
    }
    default: {
      cpudizzy6 = new Image();
      cpudizzy6.src = "kano/Dizzy/5.png";
      ctx.drawImage(cpudizzy6, cpuX ,canv.height-FLOOR, WEIGHT, HEIGHT);
      break;
    }

  }
}
function cpuFatality(sTime){
  switch(sTime){
    case 0: {
      cpuHead = new Image();
      cpuHead.src = "kano/head.png";
      ctx.drawImage(cpuHead, cpuX ,canv.height-FLOOR, WEIGHT/5, HEIGHT/5);
      break;
    }case 1: {
      cpuHead1 = new Image();
      cpuHead1.src = "kano/head.png";
      ctx.drawImage(cpuHead, cpuX ,canv.height-FLOOR, WEIGHT/5, HEIGHT/5);
      break;
    }case 2: {
      cpuHead2 = new Image();
      cpuHead2.src = "kano/head.png";
      ctx.drawImage(cpuHead2, cpuX ,canv.height-FLOOR, WEIGHT/5, HEIGHT/5);
      break;
    }case 3: {
      cpuHead = new Image();
      cpuHead.src = "kano/head.png";
      ctx.drawImage(cpuHead, cpuX ,canv.height-FLOOR, WEIGHT/5, HEIGHT/5);
      break;
    }case 4: {
      cpuHead = new Image();
      cpuHead.src = "kano/head.png";
      ctx.drawImage(cpuHead, cpuX ,canv.height-FLOOR, WEIGHT/5, HEIGHT/5);
      //RESET GAME FOR PLAYER
      resetGame();
      rounds = 0; prounds = 0; crounds = 0;
      fatalityPlayed = false;
      break;
    }
    default: {}
  }
}
//CPU CONTROL
function cpuStanding(sTime){
  switch(sTime){
    case 0: {
      cs0 = new Image();
      cs0.src = "kano/right/stand/0.png";
      ctx.drawImage(cs0, cpuX ,canv.height-FLOOR, WEIGHT, HEIGHT);
      break;
    }case 1: {
      cs1 = new Image();
      cs1.src = "kano/right/stand/1.png";
      ctx.drawImage(cs1, cpuX ,canv.height-FLOOR, WEIGHT, HEIGHT);
      break;
    }case 2: {
      cs2 = new Image();
      cs2.src = "kano/right/stand/2.png";
      ctx.drawImage(cs2, cpuX ,canv.height-FLOOR, WEIGHT, HEIGHT);
      break;
    }case 3: {
      cs3 = new Image();
      cs3.src = "kano/right/stand/3.png";
      ctx.drawImage(cs3, cpuX ,canv.height-FLOOR, WEIGHT, HEIGHT);
      break;
    }case 4: {
      cs4 = new Image();
      cs4.src = "kano/right/stand/4.png";
      ctx.drawImage(cs4, cpuX ,canv.height-FLOOR, WEIGHT, HEIGHT);
      break;
    }case 5: {
      cs5 = new Image();
      cs5.src = "kano/right/stand/5.png";
      ctx.drawImage(cs5, cpuX ,canv.height-FLOOR, WEIGHT, HEIGHT);
      break;
    }case 6: {
      cs6 = new Image();
      cs6.src = "kano/right/stand/6.png";
      ctx.drawImage(cs6, cpuX ,canv.height-FLOOR, WEIGHT, HEIGHT);
      break;
    }case 7: {
      cs7 = new Image();
      cs7.src = "kano/right/stand/7.png";
      ctx.drawImage(cs7, cpuX ,canv.height-FLOOR, WEIGHT, HEIGHT);
      break;
    }case 8: {
      cs8 = new Image();
      cs8.src = "kano/right/stand/8.png";
      ctx.drawImage(cs8, cpuX ,canv.height-FLOOR, WEIGHT, HEIGHT);
      break;
    }
  }
}
function moveKanoLeft(distance, timevar){
  if(playerCollision === true){
    distance = 0;
  }
  cpuX -= distance;

  switch(timevar){
    case 0: {
      var cw0 = new Image();
      cw0.src = "kano/right/walking/0.png";
      ctx.drawImage(cw0, cpuX ,canv.height-FLOOR, 135, 250);
      break;
    }case 1: {
      var cw1 = new Image();
      cw1.src = "kano/right/walking/1.png";
      ctx.drawImage(cw1, cpuX ,canv.height-FLOOR, 135, 250);
      break;
    }case 2: {
      var cw2 = new Image();
      cw2.src = "kano/right/walking/2.png";
      ctx.drawImage(cw2, cpuX ,canv.height-FLOOR, 135, 250);
      break;
    }case 3: {
      var cw3 = new Image();
      cw3.src = "kano/right/walking/3.png";
      ctx.drawImage(cw3, cpuX ,canv.height-FLOOR, 135, 250);
      break;
    }case 4: {
      var cw4 = new Image();
      cw4.src = "kano/right/walking/4.png";
      ctx.drawImage(cw4, cpuX ,canv.height-FLOOR, 135, 250);
      break;
    }case 5: {
      var cw5 = new Image();
      cw5.src = "kano/right/walking/5.png";
      ctx.drawImage(cw5, cpuX ,canv.height-FLOOR, 135, 250);
      break;
    }case 6: {
      var cw6 = new Image();
      cw6.src = "kano/right/walking/6.png";
      ctx.drawImage(cw6, cpuX ,canv.height-FLOOR, 135, 250);
      break;
    }case 7: {
      var cw7 = new Image();
      cw7.src = "kano/right/walking/7.png";
      ctx.drawImage(cw7, cpuX ,canv.height-FLOOR, 135, 250);
      break;
    }case 8: {
      var cw8 = new Image();
      cw8.src = "kano/right/walking/8.png";
      ctx.drawImage(cw8, cpuX ,canv.height-FLOOR, 135, 250);
      break;
    }
    default: {break;}

  }
}
function kanoPunch(num){
  switch(num){
    case 0: {
      chp0 = new Image();
      chp0.src = "kano/right/high-punch/0.png";
      ctx.drawImage(chp0, cpuX, canv.height-FLOOR, WEIGHT, HEIGHT);
      break;
    }case 1: {
      chp1 = new Image();
      chp1.src = "kano/right/high-punch/1.png";
      ctx.drawImage(chp1, cpuX, canv.height-FLOOR, WEIGHT, HEIGHT);
      break;
    }case 2: {
      chp2 = new Image();
      chp2.src = "kano/right/high-punch/2.png";
      ctx.drawImage(chp2, cpuX, canv.height-FLOOR, WEIGHT, HEIGHT);
      break;
    }case 3: {
      chp3 = new Image();
      chp3.src = "kano/right/high-punch/3.png";
      ctx.drawImage(chp3, cpuX, canv.height-FLOOR, WEIGHT, HEIGHT);
      break;
    }case 4: {
      chp4 = new Image();
      chp4.src = "kano/right/high-punch/4.png";
      ctx.drawImage(chp4, cpuX, canv.height-FLOOR, WEIGHT, HEIGHT);
      break;
    }case 5: {
      chp5 = new Image();
      chp5.src = "kano/right/high-punch/5.png";
      ctx.drawImage(chp5, cpuX, canv.height-FLOOR, WEIGHT, HEIGHT);
      break;
    }case 6: {
      chp6 = new Image();
      chp6.src = "kano/right/high-punch/6.png";
      ctx.drawImage(chp6, cpuX, canv.height-FLOOR, WEIGHT, HEIGHT);
      break;
    }case 7: {
      chp7 = new Image();
      chp7.src = "kano/right/high-punch/7.png";
      ctx.drawImage(chp7, cpuX, canv.height-FLOOR, WEIGHT, HEIGHT);
      break;
    }default: {chp7 = new Image();
    chp7.src = "kano/right/high-punch/7.png";
    ctx.drawImage(chp7, cpuX, canv.height-FLOOR, WEIGHT, HEIGHT);
    break;}
  }
}
//
//PLAYER CONTROL
//movement
function subZeroStanding(sTime){
  switch(sTime){

    case 0: {
      var s1 = new Image();
      s1.src = "subzero/left/stand/0.png";
      ctx.drawImage(s1, playerX ,canv.height-FLOOR, WEIGHT, HEIGHT);
      break;
    }case 1: {
      var s2 = new Image();
      s2.src = "subzero/left/stand/1.png";
      ctx.drawImage(s2, playerX ,canv.height-FLOOR, WEIGHT, HEIGHT);
      break;
    }case 2: {
      var s3 = new Image();
      s3.src = "subzero/left/stand/2.png";
      ctx.drawImage(s3, playerX ,canv.height-FLOOR, WEIGHT, HEIGHT);
      break;
    }case 3: {
      var s4 = new Image();
      s4.src = "subzero/left/stand/3.png";
      ctx.drawImage(s4, playerX ,canv.height-FLOOR, WEIGHT, HEIGHT);
      break;
    }case 4: {
      var s5 = new Image();
      s5.src = "subzero/left/stand/4.png";
      ctx.drawImage(s5, playerX ,canv.height-FLOOR, WEIGHT, HEIGHT);
      break;
    }case 5: {
      var s6 = new Image();
      s6.src = "subzero/left/stand/5.png";
      ctx.drawImage(s6, playerX ,canv.height-FLOOR, WEIGHT, HEIGHT);
      break;
    }case 6: {
      var s7 = new Image();
      s7.src = "subzero/left/stand/6.png";
      ctx.drawImage(s7, playerX ,canv.height-270, WEIGHT, HEIGHT);
      break;
    }case 7: {
      var s8 = new Image();
      s8.src = "subzero/left/stand/7.png";
      ctx.drawImage(s8, playerX ,canv.height-270, WEIGHT, HEIGHT);
      break;
    }case 8: {
      var s9 = new Image();
      s9.src = "subzero/left/stand/8.png";
      ctx.drawImage(s9, playerX ,canv.height-270, WEIGHT, HEIGHT);
      break;
    }case 9: {
      var s10 = new Image();
      s10.src = "subzero/left/stand/9.png";
      ctx.drawImage(s10, playerX ,canv.height-270, WEIGHT, HEIGHT);
      break;
    }
    default:
      break;
  }
}
function moveSubZero(distance, timevar){
  if(playerCollision === true){
    distance = 0;
  }
  playerX += distance;
  switch(timevar){
    case 0: {
      var w1 = new Image();
      w1.src = "subzero/left/walking/0.png";
      ctx.drawImage(w1, playerX ,canv.height-FLOOR, 135, 250);
      break;
    }case 1: {
      var w2 = new Image();
      w2.src = "subzero/left/walking/1.png";
      ctx.drawImage(w2, playerX ,canv.height-FLOOR, WEIGHT, HEIGHT);
      break;
    }case 2: {
      var w3 = new Image();
      w3.src = "subzero/left/walking/2.png";
      ctx.drawImage(w3, playerX ,canv.height-FLOOR, WEIGHT, HEIGHT);
      break;
    }case 3: {
      var w4 = new Image();
      w4.src = "subzero/left/walking/3.png";
      ctx.drawImage(w4, playerX ,canv.height-FLOOR, WEIGHT, HEIGHT);
      break;
    }case 4: {
      var w5 = new Image();
      w5.src = "subzero/left/walking/4.png";
      ctx.drawImage(w5, playerX ,canv.height-FLOOR, WEIGHT, HEIGHT);
      break;
    }case 5: {
      var w6 = new Image();
      w6.src = "subzero/left/walking/5.png";
      ctx.drawImage(w6, playerX ,canv.height-FLOOR, WEIGHT, HEIGHT);
      break;
    }case 6: {
      var w7 = new Image();
      w7.src = "subzero/left/walking/6.png";
      ctx.drawImage(w7, playerX ,canv.height-270, WEIGHT, HEIGHT);
      break;
    }case 7: {
      var w8 = new Image();
      w8.src = "subzero/left/walking/7.png";
      ctx.drawImage(w8, playerX ,canv.height-270, WEIGHT, HEIGHT);
      break;
    }case 8: {
      var w9 = new Image();
      w9.src = "subzero/left/walking/8.png";
      ctx.drawImage(w9, playerX ,canv.height-270, WEIGHT, HEIGHT);
      break;
    }
    default:
      break;
  }
}
function moveSubZeroBack(distance, timevar){
  if(playerCollision === true){
    distance = 0;
  }
  playerX += distance;
  switch(timevar){
    case 0: {
      var w1 = new Image();
      w1.src = "subzero/left/walking-backward/0.png";
      ctx.drawImage(w1, playerX ,canv.height-FLOOR, 135, 250);
      break;
    }case 1: {
      var w2 = new Image();
      w2.src = "subzero/left/walking-backward/1.png";
      ctx.drawImage(w2, playerX ,canv.height-FLOOR, WEIGHT, HEIGHT);
      break;
    }case 2: {
      var w3 = new Image();
      w3.src = "subzero/left/walking-backward/2.png";
      ctx.drawImage(w3, playerX ,canv.height-FLOOR, WEIGHT, HEIGHT);
      break;
    }case 3: {
      var w4 = new Image();
      w4.src = "subzero/left/walking-backward/3.png";
      ctx.drawImage(w4, playerX ,canv.height-FLOOR, WEIGHT, HEIGHT);
      break;
    }case 4: {
      var w5 = new Image();
      w5.src = "subzero/left/walking-backward/4.png";
      ctx.drawImage(w5, playerX ,canv.height-FLOOR, WEIGHT, HEIGHT);
      break;
    }case 5: {
      var w6 = new Image();
      w6.src = "subzero/left/walking-backward/5.png";
      ctx.drawImage(w6, playerX ,canv.height-FLOOR, WEIGHT, HEIGHT);
      break;
    }case 6: {
      var w7 = new Image();
      w7.src = "subzero/left/walking-backward/6.png";
      ctx.drawImage(w7, playerX ,canv.height-270, WEIGHT, HEIGHT);
      break;
    }case 7: {
      var w8 = new Image();
      w8.src = "subzero/left/walking-backward/7.png";
      ctx.drawImage(w8, playerX ,canv.height-270, WEIGHT, HEIGHT);
      break;
    }case 8: {
      var w9 = new Image();
      w9.src = "subzero/left/walking-backward/8.png";
      ctx.drawImage(w9, playerX ,canv.height-270, WEIGHT, HEIGHT);
      break;
    }
    default:
      break;
  }
}
function runSubZero(distance, timevar){
  if(playerCollision === true){
    distance = 0;
  }
  playerX += distance;
  switch(timevar){
    case 0: {
      var w1 = new Image();
      w1.src = "subzero/left/running/0.png";
      ctx.drawImage(w1, playerX ,canv.height-FLOOR, 135, 250);
      break;
    }case 1: {
      var w2 = new Image();
      w2.src = "subzero/left/running/1.png";
      ctx.drawImage(w2, playerX ,canv.height-FLOOR, WEIGHT, HEIGHT);
      break;
    }case 2: {
      var w3 = new Image();
      w3.src = "subzero/left/running/2.png";
      ctx.drawImage(w3, playerX ,canv.height-FLOOR, WEIGHT, HEIGHT);
      break;
    }case 3: {
      var w4 = new Image();
      w4.src = "subzero/left/running/3.png";
      ctx.drawImage(w4, playerX ,canv.height-FLOOR, WEIGHT, HEIGHT);
      break;
    }case 4: {
      var w5 = new Image();
      w5.src = "subzero/left/running/4.png";
      ctx.drawImage(w5, playerX ,canv.height-FLOOR, WEIGHT, HEIGHT);
      break;
    }case 5: {
      var w6 = new Image();
      w6.src = "subzero/left/running/5.png";
      ctx.drawImage(w6, playerX ,canv.height-FLOOR, WEIGHT, HEIGHT);
      break;
    }case 6: {
      var w7 = new Image();
      w7.src = "subzero/left/running/6.png";
      ctx.drawImage(w7, playerX ,canv.height-270, WEIGHT, HEIGHT);
      break;
    }case 7: {
      var w8 = new Image();
      w8.src = "subzero/left/running/7.png";
      ctx.drawImage(w8, playerX ,canv.height-270, WEIGHT, HEIGHT);
      break;
    }case 8: {
      var w9 = new Image();
      w9.src = "subzero/left/running/8.png";
      ctx.drawImage(w9, playerX ,canv.height-270, WEIGHT, HEIGHT);
      break;
    }case 9: {
      var w10 = new Image();
      w10.src = "subzero/left/running/9.png";
      ctx.drawImage(w10, playerX ,canv.height-270, WEIGHT, HEIGHT);
      break;
    }
    default:
      break;
  }
}
function duckSubZero(timevar){
    d4 = new Image();
    d4.src = "subzero/left/squating/2.png";
    ctx.drawImage(d4, playerX ,canv.height-FLOOR+HEIGHT/2.5, WEIGHT - 20, HEIGHT/1.7);
}
//KOMBAT
function highPunch(num){
  switch(num){
    case 0: {
      hp0 = new Image();
      hp0.src = "subzero/left/high-punch/0.png";
      ctx.drawImage(hp0, playerX, canv.height-FLOOR, WEIGHT, HEIGHT);
      break;
    }case 1: {
      hp1 = new Image();
      hp1.src = "subzero/left/high-punch/1.png";
      ctx.drawImage(hp1, playerX, canv.height-FLOOR, WEIGHT, HEIGHT);
      break;
    }case 2: {
      hp2 = new Image();
      hp2.src = "subzero/left/high-punch/2.png";
      ctx.drawImage(hp2, playerX+1, canv.height-FLOOR+5, WEIGHT+5, HEIGHT-5);
      break;
    }case 3: {
      hp3 = new Image();
      hp3.src = "subzero/left/high-punch/3.png";
      ctx.drawImage(hp3, playerX+2, canv.height-FLOOR+5, WEIGHT+5, HEIGHT-5);
      break;
    }case 4: {
      hp4 = new Image();
      hp4.src = "subzero/left/high-punch/4.png";
      ctx.drawImage(hp4, playerX+2, canv.height-FLOOR+5, WEIGHT+6, HEIGHT-5);
      break;
    }case 5: {
      hp5 = new Image();
      hp5.src = "subzero/left/high-punch/5.png";
      ctx.drawImage(hp5, playerX+3, canv.height-FLOOR+5, WEIGHT+7, HEIGHT-5);
      break;
    }case 6: {
      hp6 = new Image();
      hp6.src = "subzero/left/high-punch/6.png";
      ctx.drawImage(hp6, playerX+4, canv.height-FLOOR+10, WEIGHT+10, HEIGHT-10);
      break;
    }
    default: {}
  }
  //
  if(num > 6 && num < 10){
    hp8 = new Image();
    hp8.src = "subzero/left/high-punch/2.png";
    ctx.drawImage(hp8, playerX+5, canv.height-FLOOR+10, WEIGHT+12, HEIGHT-10);
  }else if(num > 10){
    var s1 = new Image();
    s1.src = "subzero/left/stand/0.png";
    ctx.drawImage(s1, playerX ,canv.height-FLOOR, WEIGHT, HEIGHT);
    isAttacking = false;
  }

}
function highKick(num){
  switch(num){
    case 0: {
      hk0 = new Image();
      hk0.src = "subzero/left/high-kick/0.png";
      ctx.drawImage(hk0, playerX, canv.height-FLOOR, WEIGHT, HEIGHT);
      break;
    }
    case 1: {
      hk1 = new Image();
      hk1.src = "subzero/left/high-kick/1.png";
      ctx.drawImage(hk1, playerX+7, canv.height-FLOOR, WEIGHT, HEIGHT);
      break;
    }
    case 2: {
      hk2 = new Image();
      hk2.src = "subzero/left/high-kick/2.png";
      ctx.drawImage(hk2, playerX+2, canv.height-FLOOR, WEIGHT, HEIGHT);
      break;
    }
    case 3: {
      hk3 = new Image();
      hk3.src = "subzero/left/high-kick/3.png";
      ctx.drawImage(hk3, playerX+3, canv.height-FLOOR, WEIGHT, HEIGHT);
      break;
    }
    case 4: {
      hk4 = new Image();
      hk4.src = "subzero/left/high-kick/4.png";
      ctx.drawImage(hk4, playerX+4, canv.height-FLOOR, WEIGHT, HEIGHT);
      break;
    }
    case 5: {
      hk5 = new Image();
      hk5.src = "subzero/left/high-kick/5.png";
      ctx.drawImage(hk5, playerX+5, canv.height-FLOOR+10, WEIGHT+10, HEIGHT-10);
      break;
    }
    case 6: {
      hk6 = new Image();
      hk6.src = "subzero/left/high-kick/6.png";
      ctx.drawImage(hk6, playerX+5, canv.height-FLOOR+10, WEIGHT+17, HEIGHT-10);
      break;
    }
    default: {
    }

  }
  //
  if(num > 6 && num < 18){
    hk7 = new Image();
    hk7.src = "subzero/left/high-kick/6.png";
    ctx.drawImage(hk7, playerX+5, canv.height-FLOOR+10, WEIGHT+17, HEIGHT-10);
  }else if(num > 18){
    var s1 = new Image();
    s1.src = "subzero/left/stand/0.png";
    ctx.drawImage(s1, playerX ,canv.height-FLOOR, WEIGHT, HEIGHT);
    isAttacking = false;
  }
}
function midKick(num){
  switch(num){
    case 0: {
      lk0 = new Image();
      lk0.src = "subzero/left/low-kick/0.png";
      ctx.drawImage(lk0, playerX, canv.height-FLOOR, WEIGHT+15, HEIGHT);
      break;
    }case 1: {
      lk1 = new Image();
      lk1.src = "subzero/left/low-kick/1.png";
      ctx.drawImage(lk1, playerX, canv.height-FLOOR, WEIGHT+15, HEIGHT);
      break;
    }case 2: {
      lk2 = new Image();
      lk2.src = "subzero/left/low-kick/2.png";
      ctx.drawImage(lk2, playerX, canv.height-FLOOR, WEIGHT+20, HEIGHT);
      break;
    }case 3: {
      lk3 = new Image();
      lk3.src = "subzero/left/low-kick/3.png";
      ctx.drawImage(lk3, playerX, canv.height-FLOOR+10, WEIGHT+25, HEIGHT-10);
      break;
    }case 4: {
      lk4 = new Image();
      lk4.src = "subzero/left/low-kick/4.png";
      ctx.drawImage(lk4, playerX, canv.height-FLOOR+15, WEIGHT+30, HEIGHT-20);
      break;
    }case 5: {
      lk5 = new Image();
      lk5.src = "subzero/left/low-kick/5.png";
      ctx.drawImage(lk5, playerX, canv.height-FLOOR+25, WEIGHT+35, HEIGHT-30);
      break;
    }
  }
  if( num > 5 && num < 16){
    lk6 = new Image();
    lk6.src = "subzero/left/low-kick/5.png";
    ctx.drawImage(lk6, playerX, canv.height-FLOOR+ 30, WEIGHT+35, HEIGHT-30);
  }
  else if(num > 16){
    var s1 = new Image();
    s1.src = "subzero/left/stand/0.png";
    ctx.drawImage(s1, playerX ,canv.height-FLOOR, WEIGHT, HEIGHT);
    isAttacking = false;
  }
}
function spinKick(num){
  switch(num){
    case 0:{
      sk0 = new Image();
      sk0.src = "subzero/left/spin-kick/0.png";
      ctx.drawImage(sk0, playerX, canv.height-FLOOR+ 35, WEIGHT, HEIGHT-35);
      break;
    }case 1:{
      sk1 = new Image();
      sk1.src = "subzero/left/spin-kick/1.png";
      ctx.drawImage(sk1, playerX, canv.height-FLOOR+35, WEIGHT, HEIGHT-35);
      break;
    }
    case 2:{
      sk2 = new Image();
      sk2.src = "subzero/left/spin-kick/2.png";
      ctx.drawImage(sk2, playerX, canv.height-FLOOR+ 35, WEIGHT+15, HEIGHT-35);
      break;
    }
    case 3:{
      sk3 = new Image();
      sk3.src = "subzero/left/spin-kick/3.png";
      ctx.drawImage(sk3, playerX, canv.height-FLOOR+ 35, WEIGHT+20, HEIGHT-35);
      break;
    }case 4:{
      sk4 = new Image();
      sk4.src = "subzero/left/spin-kick/4.png";
      ctx.drawImage(sk4, playerX, canv.height-FLOOR+ 35, WEIGHT+30, HEIGHT-35);
      break;
    }case 5:{
      sk5 = new Image();
      sk5.src = "subzero/left/spin-kick/5.png";
      ctx.drawImage(sk5, playerX+5, canv.height-FLOOR+ 35, WEIGHT+35, HEIGHT-35);
      break;
    }case 6:{
      sk6 = new Image();
      sk6.src = "subzero/left/spin-kick/6.png";
      ctx.drawImage(sk6, playerX+10, canv.height-FLOOR+ 35, WEIGHT+10, HEIGHT-35);
      break;
    }case 7:{
      sk7 = new Image();
      sk7.src = "subzero/left/spin-kick/7.png";
      ctx.drawImage(sk7, playerX+15, canv.height-FLOOR+ 35, WEIGHT, HEIGHT-35);
      break;
    }
    default:{}
  }
  if(num > 7){
    var s1 = new Image();
    s1.src = "subzero/left/stand/0.png";
    ctx.drawImage(s1, playerX ,canv.height-FLOOR, WEIGHT, HEIGHT);
    isAttacking = false;
  }
}
function upperCut(num){
  switch(num){
    case 0:{
      uk0 = new Image();
      uk0.src = "subzero/left/uppercut/0.png";
      ctx.drawImage(uk0, playerX, canv.height-FLOOR, WEIGHT, HEIGHT);
      break;
    }case 1:{
      uk1 = new Image();
      uk1.src = "subzero/left/uppercut/1.png";
      ctx.drawImage(uk1, playerX+5, canv.height-FLOOR, WEIGHT, HEIGHT);
      break;
    }
    case 2:{
      uk2 = new Image();
      uk2.src = "subzero/left/uppercut/2.png";
      ctx.drawImage(uk2, playerX+10, canv.height-FLOOR, WEIGHT, HEIGHT);
      break;
    }
    case 3:{
      uk3 = new Image();
      uk3.src = "subzero/left/uppercut/3.png";
      ctx.drawImage(uk3, playerX+15, canv.height-FLOOR, WEIGHT, HEIGHT);
      break;
    }
    default:{}
  }
  if(num > 3 && num < 10){
    uk4 = new Image();
    uk4.src = "subzero/left/uppercut/3.png";
    ctx.drawImage(uk4, playerX+25, canv.height-FLOOR, WEIGHT, HEIGHT);
  }
}
function playerBlocking(num){

  pblock2 = new Image();
  pblock2.src = "subzero/left/blocking/2.png";
  ctx.drawImage(pblock2, playerX, canv.height-FLOOR+7, WEIGHT*.95, HEIGHT*.95);
}
//Player cpuDamage
function playerKnockedBack(num){
  playerX -= .35;
  switch(num){
    case 0: {
      playerEndure0 = new Image();
      playerEndure0.src = "subzero/left/endure/0.png";
      ctx.drawImage(playerEndure0, playerX, canv.height-FLOOR+20, WEIGHT/1.15, HEIGHT/1.10);
      break;
    }case 1: {
      playerEndure1 = new Image();
      playerEndure1.src = "subzero/left/endure/1.png";
      ctx.drawImage(playerEndure1, playerX, canv.height-FLOOR+20, WEIGHT/1.15, HEIGHT/1.10);
      break;
    }case 2: {
      playerEndure2 = new Image();
      playerEndure2.src = "subzero/left/endure/2.png";
      ctx.drawImage(playerEndure0, playerX, canv.height-FLOOR+20, WEIGHT/1.15, HEIGHT/1.10);
      break;
    }default: {
      playerEndure2 = new Image();
      playerEndure2.src = "subzero/left/endure/2.png";
      ctx.drawImage(playerEndure0, playerX, canv.height-FLOOR+20, WEIGHT/1.15, HEIGHT/1.10);
      break;
    }
  }
}

//
function resetGame(){
  gameStart = false;
  PLAYERLIFE = 250; playerX = 50; CPULIFE = 250; cpuX = 550;
  //misc
  cpuhitU = false; cpuhitKnockBack = false; cpuhitKnockBack1 = false; cputhitKnockBack2 = false;
  kanoMoving = false; kanoAttacking = false; cpu_isHit = false;
  MUSIC_ON = true;
}
