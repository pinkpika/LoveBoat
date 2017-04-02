var particleObjects = [];
var particleLoveTextures, particleCircleTextures, particleCrossTextures;
var isCircleLightMode = true, circleLightTimeO = 40, circleLightTime = circleLightTimeO;
var isCrossStarMode = true, crossStarTimeO = 20, crossStarTime = crossStarTimeO;

function setupParticleObjects(){
  particleLoveTextures = [];
  particleLoveTextures.push(Texture.fromImage('http://i.imgur.com/QOh4jYD.png'));
  particleLoveTextures.push(Texture.fromImage('http://i.imgur.com/OFeGYMM.png'));
  particleLoveTextures.push(Texture.fromImage('http://i.imgur.com/DmTImkB.png'));
  particleLoveTextures.push(Texture.fromImage('http://i.imgur.com/6HCbRoG.png'));

  particleCircleTextures = [];
  particleCircleTextures.push(Texture.fromImage('http://i.imgur.com/RiuyRA5.png'));
  particleCircleTextures.push(Texture.fromImage('http://i.imgur.com/jtNG8vc.png'));

  particleCrossTextures = [];
  particleCrossTextures.push(Texture.fromImage('http://i.imgur.com/eup7cdG.png'));
}
function particleLove(x,y,movingDirX,movingDirY,zIndex) {
  var i = Math.floor(Math.random() * 4);
  var newParLove = new Sprite(particleLoveTextures[i]);
  newParLove.pivot.set(25, 25);
  newParLove.position.set(x,y);
  newParLove.lifeCount = 1;
  setRotation(newParLove,0,true,2,-1);
  setScale(newParLove,1.0,true,1,-1);
  setDirMoving(newParLove,true,10,x+movingDirX,y+movingDirY);
  newParLove.alpha = 0.9;
  newParLove.alphaMoving = -0.01;
  stage.addChild(newParLove);
  newParLove.zIndex = zIndex;
  particleObjects.push(newParLove);
  newParLove.tint = 0xF99393;
}
//---------------------------------------------------------------------------------------------
function particleCircleLight(x,y,movingDirX,movingDirY,zIndex) {
  var newParCircle = new Sprite(particleCircleTextures[1]);
  newParCircle.pivot.set(250, 250);
  newParCircle.position.set(x,y);
  newParCircle.lifeCount = 3;
  setRotation(newParCircle,0,true,2,-1);
  setScale(newParCircle,Math.random()*0.4+0.2,true,1,-1);
  setDirMoving(newParCircle,true,120,x+movingDirX,y+movingDirY);
  newParCircle.alpha = 0.01;
  newParCircle.alphaMoving = 0.01;
  stage.addChild(newParCircle);
  newParCircle.zIndex = zIndex;
  particleObjects.push(newParCircle);
}
function updateCircleLight(){
  circleLightTime = 
  timeControl(particleCircleLight,circleLightTime,circleLightTimeO,
  Math.random()*2000-1000,Math.random()*800-400,
  Math.random()*1000,Math.random()*400,
  1000);
}
//---------------------------------------------------------------------------------------------
function particleCrossStar(x,y,movingDirX,movingDirY,zIndex) {
  var newParCross = new Sprite(particleCrossTextures[0]);
  newParCross.pivot.set(50, 50);
  newParCross.position.set(x,y);
  newParCross.lifeCount = 2;
  setRotation(newParCross,0,true,2,-1);
  setScale(newParCross,Math.random()*0.2+0.3,true,2,-1);
  setDirMoving(newParCross,true,60,x+Math.random()*20,y);
  newParCross.alpha = 0.01;
  newParCross.alphaMoving = 0.01;
  stage.addChild(newParCross);
  newParCross.zIndex = zIndex;
  particleObjects.push(newParCross);
}
function updateCrossStar(){
  crossStarTime = 
  timeControl(particleCrossStar,crossStarTime,crossStarTimeO,
  Math.random()*2000,Math.random()*600,0,0,
  5 + Math.random() );
}
//---------------------------------------------------------------------------------------------
function particleUpdate(i){
  if(this.alpha < 0.0){
    if(this.lifeCount === 1){
      this.destroy(); particleObjects.splice(i, 1); return i-1;
    }
    else this.lifeCount--;
  }
  if(this.alpha <= 0.0 || this.alpha >= 1.0 ) this.alphaMoving = -this.alphaMoving;
  this.alpha += this.alphaMoving;
  movingDirMagic(this); //Don't Stop!! if(this.isMoving)
  rotateMagic(this);
  scaleMagic(this,1.0);
  return i;
}