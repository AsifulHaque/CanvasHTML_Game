
const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;
let particleArray;
let mouseDraw = false;
let clickedX;
let clickedY;
let paintedBall = 0;
//click to destroy INPUT
canvas.addEventListener('mousedown',
  function(e){
    clickedX = e.clientX;
    clickedY = e.clientY;
    mouseDraw = true;
    console.log("CLICKED " + e.clientX + " " + e.clientY);
  })
canvas.addEventListener('mouseup', function(){
  mouseDraw = false;
  clickedX = 0;
  clickedY = 0;
  console.log("zeroed");
})
canvas.addEventListener('touchstart',
  function(e){
    clickedX = e.clientX;
    clickedY = e.clientY;
    mouseDraw = true;
    console.log("CLICKED " + e.clientX + " " + e.clientY);
  })
canvas.addEventListener('touchend', function(){
  mouseDraw = false;
  clickedX = 0;
  clickedY = 0;
  console.log("zeroed");
})



// Particle Constructor function
function Particle(x, y, directionX, directionY, size, color){
  this.x = x;
  this.y = y;
  this.directionX = directionX;
  this.directionY = directionY;
  this.size = size;
  this.color = color;
  this.isDead = false;

}

//Add draw method to particle prototype
Particle.prototype.draw = function(){
  ctx.beginPath();
  ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
  ctx.fillStyle = this.color;
  ctx.fill();
}
//add update method to particle prototype
Particle.prototype.update = function() {
  if(this.isDead){return;}
  if(this.x + this.size > canvas.width || this.x - this.size < 0){
    this.directionX = -this.directionY;
  }
  if(this.y + this.size > canvas.height || this.y - this.size <0){
    this.directionY = -this.directionY;
  }
  this.x += this.directionX;
  this.y += this.directionY;
  this.draw();
  // console.log("update called");
}

//create particle particleArray
function init(){
  particleArray = [];
  for (var i = 0; i < 100; i++) {
  let size = Math.random() * 50;
  let x = Math.random() * (innerWidth - size * 2);
  let y = Math.random() * (innerHeight - size * 2) ;
  let directionX = (Math.random() * .4 ) - .2;
  let directionY = (Math.random() * .4 ) - .2;
  let color = 'white';

  particleArray.push(new Particle(x, y, directionX, directionY, size, color));

  }

}

//Animation loop
function animate(){
  requestAnimationFrame(animate);
  ctx.clearRect(0,0,innerWidth, innerHeight);
  paintedBall = 0;
  for (let i=0; i<particleArray.length; i++){
    if(mouseDraw){
        if((clickedX + 50 >= particleArray[i].x) &&
           (clickedX - 50 <= particleArray[i].x) &&
           (clickedY + 50 >= particleArray[i].y) &&
           (clickedY - 50 <= particleArray[i].y)) {
             particleArray[i].color = 'red';

        }
    }

    if(particleArray[i].color == 'red') {paintedBall += 1};
    particleArray[i].update();
  }
  ctx.font = "100px Verdana";
  ctx.fillStyle = 'blue';
  ctx.fillText(paintedBall, 100, 100);
}

//Global Function Call
init();
animate();


//Window resize fix
window.addEventListener('resize',
  function(){
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    // mouseClick = 0;
    init();
  })
