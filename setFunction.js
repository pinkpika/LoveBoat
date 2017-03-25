var rotationV = [0.0,0.002,0.005,0.05,0.0005];
var rotationMax = [0.0,0.07,0.5,0.5,0.02];

var randomMovingTime = 1.0;
var randomMovingTimeCount = randomMovingTime;

var scaleV = [0.0,0.0005,0.002,0.005,0.05];
var scaleXMax = [0.0,0.02,0.05,0.1,0.5];
var scaleYMax = [0.0,0.02,0.05,0.1,0.5];

function setPhysics(chara,vx,vy,atx,aty,horizontalPlane,isFalling,isInBoat,isInFlow,isMoving){
  chara.vx = vx; chara.vy = vy; chara.atx = atx; chara.aty = aty;
  chara.horizontalPlane = horizontalPlane;
  chara.isFalling = isFalling; chara.isInBoat = isInBoat; chara.isInFlow = isInFlow;
  chara.isMoving = isMoving;
  physicsObjects.push(chara);
}
function setHitArea(chara,x,y,width,height){
  chara.interactive = true; chara.buttonMode = true;
  chara.hitArea = new PIXI.Rectangle(x,y,width,height);
  hitAreaRecs.push(chara);
}
function setRotation(chara,rotation,rotationFlag,rotationValue,rotationTime){
  chara.rotation = rotation; 
  chara.rotationFlag = rotationFlag; 
  chara.rotationValue = rotationValue;
}
function setMoving(chara,isMoving,movingSpeed,goalX,goalY){
  chara.isMoving = isMoving; chara.movingSpeed = movingSpeed;
  chara.goalX = goalX; chara.goalY = goalY; 
}
function setDirMoving(chara,isMoving,movingSpeed,goalX,goalY){
  chara.isMoving = isMoving; chara.movingSpeed = movingSpeed;
  chara.goalX = goalX; chara.goalY = goalY; 
  chara.movingSpeedX = (goalX - chara.x) / movingSpeed;
  chara.movingSpeedY = (goalY - chara.y) / movingSpeed;
}
function setScale(chara,oScale,scaleFlag,scaleValue,scaleTime){
  chara.scale.x = oScale; chara.scale.y = oScale; chara.scale.o = oScale;
  chara.scaleFlag = scaleFlag; chara.scaleValue = scaleValue;
  chara.scaleTime = chara.scaleTime;
}

//-------------------------------------------------------------------------------------

function scaleMagic(chara,type) {
  if((chara.scale.x - chara.scale.o) > scaleXMax[chara.scaleValue]){
    chara.scaleFlag = !chara.scaleFlag;
    chara.scale.x = chara.scale.o + scaleXMax[chara.scaleValue];
    chara.scale.y = chara.scale.o + type*scaleYMax[chara.scaleValue];
  }
  else if((chara.scale.o - chara.scale.x) > scaleXMax[chara.scaleValue]){
    chara.scaleFlag = !chara.scaleFlag;
    chara.scale.x = chara.scale.o - scaleXMax[chara.scaleValue];
    chara.scale.y = chara.scale.o - type*scaleYMax[chara.scaleValue];
  }
  if(chara.scaleFlag) {
    chara.scale.x += scaleV[chara.scaleValue];
    chara.scale.y += type*scaleV[chara.scaleValue];
  }
  else{
    chara.scale.x -= scaleV[chara.scaleValue];
    chara.scale.y -= type*scaleV[chara.scaleValue];
  }
}
function movingDirMagic(chara) {
  chara.x += chara.movingSpeedX;
  chara.y += chara.movingSpeedY;
  if(Math.abs(chara.x - chara.goalX) < 0.1 && Math.abs(chara.y - chara.goalY) < 0.1 ){
    chara.isMoving = false;
    chara.vx = chara.movingSpeedX;
    chara.vy = chara.movingSpeedY;
  }
}
function movingMagic(chara,goal) {
  var tempX = goal.x + chara.goalX - chara.x;
  var tempY = goal.y + chara.goalY - chara.y;
  chara.x += tempX/chara.movingSpeed;
  chara.y += tempY/chara.movingSpeed;
  if(Math.abs(tempX) < 5.0 && Math.abs(tempY) < 5.0 ){
    chara.isMoving = false;
    chara.horizontalPlane = chara.y;
  }
}
function rotateMagic(chara) {
  if(chara.rotation>rotationMax[chara.rotationValue]) {
    chara.rotationFlag = !chara.rotationFlag;
    chara.rotation = rotationMax[chara.rotationValue];
  }
  else if(chara.rotation<-rotationMax[chara.rotationValue]){
    chara.rotationFlag = !chara.rotationFlag;
    chara.rotation = -rotationMax[chara.rotationValue];
  }
  if(chara.rotationFlag) chara.rotation += rotationV[chara.rotationValue]; 
  else chara.rotation -= rotationV[chara.rotationValue];
}