var fireObjects = [], firedObjects = [];
var nodTextures, nodInBoatWidth = 10, nodInBoatHeight = 10;
var isFireMode = false, isBursting = false, tempCover, fireHeart;
var loveTextures, shootLoveTime = 30;

function setupFireMode(){
	fireHeart = new Sprite(Texture.fromImage('http://i.imgur.com/iEVTQwn.png'));
  fireHeart.visible = false;
  fireHeart.anchor.set(0.5, 0.5);
  setScale(fireHeart,0.5,true,1,-1);
  stage.addChild(fireHeart);

  nodTextures = [];
  nodTextures.push(Texture.fromImage('http://i.imgur.com/LDd4k1C.gif'));
  nodTextures.push(Texture.fromImage('http://i.imgur.com/MVShpUE.png'));

  loveTextures = [];
  loveTextures.push(Texture.fromImage('http://i.imgur.com/zW8vcxO.png'));
  loveTextures.push(Texture.fromImage('http://i.imgur.com/oHSnKY0.png'));
  loveTextures.push(Texture.fromImage('http://i.imgur.com/aOOHEb4.png'));
  loveTextures.push(Texture.fromImage('http://i.imgur.com/YZXw3zM.png'));
}
function createTempCover(){
	tempCover = new Container();
  setHitArea(tempCover,0,0,2000,800);
  tempCover.on('pointerdown', onTempCoverDown).on('touchstart', onTempCoverDown)
           .on('pointerupoutside', onTempCoverUp).on('touchendoutside', onTempCoverUp)
           .on('pointerup', onTempCoverUp).on('touchend', onTempCoverUp);
  tempCover.zIndex = 200;
  boatFlagZone.zIndex = 201;
  stage.addChild(tempCover);
  fireHeart.visible = true;
}
function shootLove() {
    var i = Math.floor(Math.random() * 4);
    var newLove = new Sprite(loveTextures[i]);
    newLove.typePW = i%2;
    newLove.pivot.set(75, 75);
    newLove.position.set(Math.floor(Math.random() * 2000),-100);
    newLove.willBeDead = true;
    var atx = 0, aty = 9.0;
    setFireObjectHorizontalPlane(newLove);
    setPhysics(newLove,0,0,atx,aty,newLove.horizontalPlane,true,false,false,false);
    setRotation(newLove,0,true,2,-1); 
    setMoving(newLove,false,60.0,0.0,newLove.horizontalPlane);
    newLove.randomMovingTime = 3.0;
    setScale(newLove,0.7,true,1,-1);
    newLove.isFiring = false;
    stage.addChild(newLove);
}
function shootNod(event) {
  for(var i = 0 ; i < 10 ; i++){
    var newNod = new Sprite(nodTextures[i%2]);
    newNod.typePW = i%2;
    newNod.pivot.set(205, 176);
    newNod.position.set(event.data.getLocalPosition(this.parent).x,event.data.getLocalPosition(this.parent).y);
    newNod.willBeDead = true;
    var vx = Math.floor(Math.random() * 2100)/100.0-10; //-10.00~10.00 
    var vy = (-30-Math.floor(Math.random() * 2500)/100.0); //-30.00~-55.00
    var atx = 0, aty = 9.0;
    setFireObjectHorizontalPlane(newNod);
    setPhysics(newNod,vx,vy,atx,aty,newNod.horizontalPlane,true,false,false,false);
    setRotation(newNod,0,true,2,-1); 
    setMoving(newNod,false,60.0,0.0,newNod.horizontalPlane);
    newNod.randomMovingTime = 3.0;
    setScale(newNod,0.2,true,1,-1);
    newNod.isFiring = false;
    stage.addChild(newNod);
  }
}
function setFireObjectHorizontalPlane(chara){
  chara.zIndex = 75.0 + Math.floor(Math.random() * 4999)/100.0 - 25.0; //50~100
  if(chara.zIndex < sheepZone.zIndex){ //50~70
      chara.horizontalPlane = 500 + (chara.zIndex-50)*120.0/20.0;
      if(chara.zIndex >= 70.0) chara.zIndex = 69 - Math.random();
    }
    else{ //70~100
      chara.horizontalPlane = 620 + (chara.zIndex-70)*180.0/30.0 - 100.0;
      if(chara.zIndex >= 100.0) chara.zIndex = 99 - Math.random();
    }
}
function onTempCoverDown(){
  isBursting = true;
}
function onTempCoverUp(){
  isBursting = false;
}