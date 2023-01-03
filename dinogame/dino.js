var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

canvas.width = window.innerWidth - 100;
canvas.height = window.innerHeight - 100;

var image1 = new Image();
image1.src = "image/rabit.png";
var dino = {
  x:10,
  y: 200,
  width : 50,
  height : 50,
  draw(){
    ctx.fillStyle = 'green';
    //ctx.fillRect(this.x,this.y,this.width,this.height);
    ctx.drawImage(image1,this.x,this.y);
    }
}

var image = new Image();
image.src = "image/catus.png"

class Catus{
  constructor(){
    this.x = 500;
    this.y = 200;
    this.width = 48;
    this.height = 48;
  }
  draw(){
    ctx.fillStyle = 'red';
    //ctx.fillRect(this.x,this.y,this.width,this.height);
    ctx.drawImage(image,this.x,this.y);
  }
}
var catus = new Catus();
catus.draw();

var timer = 0;
var catuslist = [];
var jumpTimer=0;
var animation;

function 프레임마다실행(){
  animation = requestAnimationFrame(프레임마다실행)
  timer++;
  
  ctx.clearRect(0,0,canvas.width,canvas.height);
  
  if(timer % 300 === 0){
    var catus = new Catus();
    catuslist.push(catus);
  }

  catuslist.forEach((a,i,o)=>{
    if(a.x < 0){
        o.splice(i,1);
    }
    a.x -=2;
    
    충돌(dino,a);

    a.draw();
  })
  
  if(jump == true)
  {
    dino.y -=2;
    jumpTimer++;
  }
  if(jump == false)
  {
    if(dino.y < 200)
    {
      dino.y +=2;
    }
  }
  if(jumpTimer > 60)
  {
    jump=false;
    jumpTimer=0; 
  }
  
  dino.draw()
}
프레임마다실행()

function 충돌(dino,cactus){
var xgap = cactus.x - (dino.x+dino.width);
var ygap = catus.y - (dino.y + dino.height);
if(xgap < 0 && ygap < 0){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  cancelAnimationFrame(animation);
}
}


var jump = false;
document.addEventListener("keydown",function(e){
  if(e.code === 'Space'){
    jump=true;
  }
})