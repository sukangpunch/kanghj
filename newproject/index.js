let canvas;
let ctx;
canvas = document.createElement("canvas");
ctx = canvas.getContext("2d");

canvas.width = 700;
canvas.height = 400;

document.body.appendChild(canvas);

let boxerX = 0;
let boxerY = canvas.height-90;

let background,enemy,boxer,punch;
let gameOver = false;
let jump=false;
let sit =false;
let score=0
let hp=500;
let hpcheck=false;
let gameWin=false;

function loadImage(){
 boxer = new Image();
 boxer.src = "이미지/boxer.png";

 punch = new Image();
 punch.src = "이미지/punch.png";

 enemy1=new Image();
 enemy1.src = "이미지/enemy1.png";
 enemy = new Image();
 enemy.src = "이미지/enemy.png";

 background = new Image();
 background.src = "이미지/background.png";

 face = new Image();
 face.src = "이미지/face.png";
 
 gameover = new Image();
 gameover.src = "이미지/gameover.png";

 gamewin = new Image();
 gamewin.src = "이미지/gamewin.png";
}

let keysDown={};
function Action(){
  document.addEventListener("keydown",function(event){
    keysDown[event.keyCode] = true;
    jump = true;
    sit = true;
  });
  document.addEventListener("keyup",function(event){ 
    jump=false;
    sit = false;
    delete keysDown[event.keyCode];
    
    if (event.keyCode == 88){
      creatPunch();
    }
  })
}

function RandomValue(){
  let a=0;
  let randomNum = Math.floor(Math.random()*3);
  console.log(randomNum);
  if(randomNum == 0)
  {
    a=250;
  }
  else if(randomNum == 1)
  {
    a=300;
  }
  else{
    a=350;
  }
  console.log(a);
  return a;
}
function creatEnemy(){
 const interval = setInterval(function(){
  let e = new Enemy();
  e.init();
 },3000);
}

let enemyList=[];

function Enemy()
{
  this.x=0;
  this.y=0;
  
  this.init = function(){
    this.x = 520;
    this.y = RandomValue();
    this.alive=true
    enemyList.push(this);
  } ;
  this.update=function(){
    this.x -=2;
    console.log(this.x);
  };

  this.checkHitEnemy=function(){   
    for(let i = 0;i < enemyList.length; i++){  
      if(boxerX < this.x+50 &&
         this.x < boxerX+60 &&
         boxerY < this.y + 50 && 
         this.y < boxerY+90
         ){              
           this.alive = false;
           gameOver=true;
           enemyList.splice(i,1);
      }
    }
  }
}


function creatPunch(){
  let p = new Punch();
  p.init();
}

let punchlist = [];
function Punch(){
  this.x=0;
  this.y=0;
  
  this.init=function(){
    this.x = boxerX+60;
    this.y = boxerY;
    this.alive=true  //살아있는 주먹

    punchlist.push(this)
  };

  this.update = function(){
    this.x +=3;
    console.log(this.x)
  };
  this.checkHit=function(){   
    for(let i=0;i<punchlist.length;i++){  
    if(this.x >= 570 &&
         this.y >= 170 && 
         this.y <= 350
         ){              
          hp -=10;

          if(hp <=0)
          {
            gameWin = true;
          }
           this.alive =false;
           punchlist.splice(i,1);
      }
    }
  }
}

function update(){
  if(39 in keysDown){
    boxerX +=3;
  }
  if(37 in keysDown)
  {
    boxerX -=3;
  }
  if(40 in keysDown && sit ==true)
  {
    boxerY = 355;
  }
  if(38 in  keysDown)
  {
    boxerY=310;
  }
  if(boxerX <=0)
  {
    boxerX = 0;
  }
  if(boxerX >= 400){
    boxerX = 400
  }
  if(32 in keysDown && jump==true){
    boxerY -=4;
  }

  if(jump ==false && boxerY < 310)
  {
    boxerY +=5;
  }

  for(let i=0;i<punchlist.length;i++){
    punchlist[i].update();
    punchlist[i].checkHit();
  }

  for(let i=0;i < enemyList.length;i++){
    enemyList[i].update();
    enemyList[i].checkHitEnemy();
  }

  ctx.clearRect(0,0,canvas.width,canvas.height);
}

function render(){
  ctx.drawImage(background,0,0,canvas.width,canvas.height);
  ctx.drawImage(boxer,boxerX,boxerY,60,90);
  ctx.drawImage(enemy,570,220,130,180);
  ctx.drawImage(face,325,0,50,50);
 
  ctx.fillStyle = 'green';
  ctx.fillRect(100,50,hp,50);
  
  for(let i =0;i<punchlist.length;i++)
  {
    if(punchlist[i].alive){
      ctx.drawImage(punch,punchlist[i].x,punchlist[i].y);
    }
  }

  for(let i =0;i<enemyList.length;i++)
  {
    if(enemyList[i].alive){
    ctx.drawImage(enemy1,enemyList[i].x,enemyList[i].y);
    }
  }
}

function main(){ 
  if(!gameOver && !gameWin){
  update();
  render();
  requestAnimationFrame(main);
  }else{
    if(gameWin == true){
    ctx.drawImage(gamewin,100,50,380,260);
    }
    else{
      ctx.drawImage(gameover,100,50,380,260);
    }
  }
}

loadImage();
Action();
creatEnemy();
main();

