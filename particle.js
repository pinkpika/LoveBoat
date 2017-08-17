var particleObjects = [];
var particleLoveTextures, particleCircleTextures, particleCrossTextures;
var particleZZZTexture;
var particleBubbleTexture, particleMemoryTexture;
var isCircleLightMode = false, circleLightTimeO = 40, circleLightTime = circleLightTimeO;
var isCrossStarMode = false, crossStarTimeO = 20, crossStarTime = crossStarTimeO;
var isMemoryBubbleMode = true, memoryBubbleTimeO = 240, memoryBubbleTime = memoryBubbleTimeO;
var ZZZTimeO = 60, ZZZTime = ZZZTimeO;

function setupParticleObjects(){
  particleLoveTextures = [];
  particleLoveTextures.push(Texture.fromImage('http://i.imgur.com/QOh4jYD.png'));
  particleLoveTextures.push(Texture.fromImage('http://i.imgur.com/OFeGYMM.png'));
  particleLoveTextures.push(Texture.fromImage('http://i.imgur.com/DmTImkB.png'));
  particleLoveTextures.push(Texture.fromImage('http://i.imgur.com/6HCbRoG.png'));

  particleCircleTextures = [];
  particleCircleTextures.push(Texture.fromImage('http://i.imgur.com/RiuyRA5.png'));
  particleCircleTextures.push(Texture.fromImage('http://i.imgur.com/7OmtgRl.png'));
  particleCircleTextures.push(Texture.fromImage('http://i.imgur.com/SvBo1DN.png'));
  particleCircleTextures.push(Texture.fromImage('http://i.imgur.com/aTmMpfc.png'));

  particleCrossTextures = [];
  particleCrossTextures.push(Texture.fromImage('http://i.imgur.com/eup7cdG.png'));

  particleZZZTexture = Texture.fromImage('http://i.imgur.com/tBoHGH7.png');

  particleBubbleTexture = Texture.fromImage('http://i.imgur.com/XDvi64V.png');
  particleMemoryTexture = [];
  particleMemoryTexture.push(Texture.fromImage('http://i.imgur.com/nvM6Z3R.png'));
  particleMemoryTexture.push(Texture.fromImage('http://i.imgur.com/ltVr32I.png'));
  particleMemoryTexture.push(Texture.fromImage('http://i.imgur.com/rJbBkfA.png'));
  particleMemoryTexture.push(Texture.fromImage('http://i.imgur.com/vjXYCNJ.png'));
  particleMemoryTexture.push(Texture.fromImage('http://i.imgur.com/AQa68jC.png'));
  particleMemoryTexture.push(Texture.fromImage('http://i.imgur.com/WKqtduL.png'));
  particleMemoryTexture.push(Texture.fromImage('http://i.imgur.com/MlRUnKn.png'));
  particleMemoryTexture.push(Texture.fromImage('http://i.imgur.com/PEQI43v.png'));
  particleMemoryTexture.push(Texture.fromImage('http://i.imgur.com/ToBEtOI.png'));
  particleMemoryTexture.push(Texture.fromImage('http://i.imgur.com/NkmO9HY.png'));
  particleMemoryTexture.push(Texture.fromImage('http://i.imgur.com/n8S2g8u.png'));
  particleMemoryTexture.push(Texture.fromImage('http://i.imgur.com/p6FonHK.png'));
  particleMemoryTexture.push(Texture.fromImage('http://i.imgur.com/7VBwuHt.png'));
  particleMemoryTexture.push(Texture.fromImage('http://i.imgur.com/Ygqvgc7.png'));
  particleMemoryTexture.push(Texture.fromImage('http://i.imgur.com/C4FWOPU.png'));
  particleMemoryTexture.push(Texture.fromImage('http://i.imgur.com/aWkijDC.png'));
  particleMemoryTexture.push(Texture.fromImage('http://i.imgur.com/fg0yijE.png'));
}
//---------------------------------------------------------------------------------------------
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
  newParLove.tint = 0xFFFFFF; //0xF99393;
}
//---------------------------------------------------------------------------------------------
function particleCircleLight(x,y,movingDirX,movingDirY,zIndex) {
  var newParCircle = new Sprite(particleCircleTextures[3]);
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
  setDirMoving(newParCross,true,60,x+movingDirX,y+movingDirY);
  newParCross.alpha = 0.01;
  newParCross.alphaMoving = 0.01;
  stage.addChild(newParCross);
  newParCross.zIndex = zIndex;
  particleObjects.push(newParCross);
}
function updateCrossStar(){
  crossStarTime = 
  timeControl(particleCrossStar,crossStarTime,crossStarTimeO,
  Math.random()*2000,Math.random()*600,Math.random()*20,0,
  5 + Math.random() );
}
//---------------------------------------------------------------------------------------------
function particleZZZ(x,y,movingDirX,movingDirY,zIndex) {
  var newZZZ = new Sprite(particleZZZTexture);
  newZZZ.pivot.set(25, 25);
  newZZZ.position.set(x,y);
  newZZZ.lifeCount = 2;
  setRotation(newZZZ,0,true,1,-1);
  setScale(newZZZ,1.0,true,1,-1);
  setDirMoving(newZZZ,true,60,x+movingDirX,y+movingDirY);
  newZZZ.alpha = 0.01;
  newZZZ.alphaMoving = 0.01;
  stage.addChild(newZZZ);
  newZZZ.zIndex = zIndex;
  particleObjects.push(newZZZ);
}
function updateZZZ(chara){
  ZZZTime = 
  timeControl(particleZZZ,ZZZTime,ZZZTimeO,
  chara.x,chara.y-50,Math.random()*100-50,-50,
  1000 + Math.random() );
}
//---------------------------------------------------------------------------------------------
function particleMemoryBubble(x,y,movingDirX,movingDirY,zIndex) {
  var newMemoryBubble = new Container();
  var newBubble = new Sprite(particleBubbleTexture);
  var newMemory = new Sprite(particleMemoryTexture[Math.floor(Math.random() * particleMemoryTexture.length)]);
  newMemoryBubble.pivot.set(250, 250);
  newMemoryBubble.position.set(x,y);
  newMemoryBubble.lifeCount = 1;
  setRotation(newMemoryBubble,0,true,4,-1);
  setScale(newMemoryBubble,Math.random()*0.3+0.3,true,0,-1);
  setDirMoving(newMemoryBubble,true,Math.random()*200+1500,x+movingDirX,y+movingDirY);
  newMemoryBubble.alpha = 0.6;
  newMemoryBubble.alphaMoving = -0.0002;
  newMemoryBubble.addChild(newMemory);
  newMemoryBubble.addChild(newBubble);
  stage.addChild(newMemoryBubble);
  newMemoryBubble.zIndex = zIndex;
  particleObjects.push(newMemoryBubble);
}
function updateMemoryBubble(){
  memoryBubbleTime = 
  timeControl(particleMemoryBubble,memoryBubbleTime,memoryBubbleTimeO,
  -Math.random()*1000,-Math.random()*400,
  2500+Math.random()*1000,1000+Math.random()*400,
  1000 + Math.random());
}
//---------------------------------------------------------------------------------------------
function particleUpdate(i){
  if(this.x>2500||this.y>1000){
     this.destroy(); particleObjects.splice(i, 1); return i-1;
  }
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