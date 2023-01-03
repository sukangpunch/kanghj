

let canvas;
let ctx;
canvas = document.createElement("canvas")
ctx = canvas.getContext("2d")

canvas.width=400;
canvas.height=700;
document.body.appendChild(canvas)

let backgroundImage,spaceshipImage,bulletImage,enemyImage,gameOverImage;
let gameOver = false
let score=0
//우주선 좌표
let spaceshipX = canvas.width/2-24
let spaceshipY = canvas.height-64



let bulletList = [];

function Bullet(){
  this.x=0;
  this.y=0;
  this.init=function(){
    this.x = spaceshipX+12;
    this.y = spaceshipY;
    this.alive=true  //살아있는 총알

    bulletList.push(this)
  };
 
  this.update = function(){
    this.y -=5;
  };
  
  this.checkHit=function(){
    for(let i =0; i<enemyList.length;i++){
        if(this.y <= enemyList[i].y && 
           this.x >= enemyList[i].x && 
           this.x <= enemyList[i].x + 40
           ){
            score++;
            this.alive =false
            enemyList.splice(i,1);
          }
    }
  };
}

function createEnemy(){
  const interval = setInterval(function(){
    let e = new Enemy();
    e.init();
  },1000)
}

function gRandomV(min, max){
  let randomNum = (Math.random()*(max-min+1))+min;
  return randomNum;
}

let enemyList=[]
function Enemy(){
  this.x=0;
  this.y=0;
  this.init = function(){
    this.y=0;
    this.x=gRandomV(0,352);
    enemyList.push(this);
  };
  this.update=function(){
    this.y +=1;
    if(this.y >= canvas.height -48){
      console.log("gameover");
      gameOver=true;
    }
  }


}

function loadImage(){
  backgroundImage = new Image();
  backgroundImage.src="images/back.png";

  spaceshipImage = new Image();
  spaceshipImage.src="images/my.png";

  bulletImage = new Image();
  bulletImage.src = "images/bullet.png";

  enemyImage = new Image();
  enemyImage.src = "images/enemy.png";

  gameOverImage= new Image();
  gameOverImage.src = "images/gameover.png";
}

let keysDown={};

function action(){
  document.addEventListener("keydown",function(event){
    keysDown[event.keyCode] =true;
  });
  
  document.addEventListener("keyup",function(){
    delete keysDown[event.keyCode];

    if(event.keyCode == 32){
      createBullet() //총알생성 
    }
  });
}

function createBullet(){
  let b =new Bullet();
  b.init();
}

function update(){
    if(39 in keysDown){
      spaceshipX +=1;
    }
    if(37 in keysDown){
      spaceshipX -=1;
    }
    if(spaceshipX <= 0){
      spaceshipX = 0;
    }
    if(spaceshipX >= 352)
    {
      spaceshipX=352;
    }

    for(let i=0;i<bulletList.length;i++)
    {
      if(bulletList[i].alive){
        bulletList[i].update();
        bulletList[i].checkHit();
      }
    }
    
    for(let i=0;i<enemyList.length;i++)
    {
      enemyList[i].update();
    }
}

function render(){
  ctx.drawImage(backgroundImage,0,0,canvas.width,canvas.height);
  ctx.drawImage(spaceshipImage,spaceshipX,spaceshipY);
  ctx.fillText(`Score:${score}`,20,20);
  ctx.fillStyle = "white";
  ctx.font = "20px Arial"

  for(let i = 0;i < bulletList.length; i++)
  {
    if(bulletList[i].alive){
    ctx.drawImage(bulletImage, bulletList[i].x, bulletList[i].y);
    }
  }

  for(let i = 0;i < enemyList.length; i++)
  {
    ctx.drawImage(enemyImage, enemyList[i].x, enemyList[i].y);
  }
}
function main(){
  if(!gameOver)
  {
  update();
  render();
  requestAnimationFrame(main)
  }else{
    ctx.drawImage(gameOverImage,10,100,380,260);
  }
}

loadImage();
action();
createEnemy();
main();





//총알만들기
//1.스페이스바를 누르면 총알 발사 
//2.총알의 x값은 우주선의 x좌표 
//3.발사된 총알들은 총알배열에저장 
//4.모든 총알들은 x,y좌표값이 있어야한다. 
//5.총알배열을 가지고 render그려준다. 
