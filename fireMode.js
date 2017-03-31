var fireObjects = [];
var nodTextures, nodInBoatWidth = 10, nodInBoatHeight = 10;
var isFireMode = false, isBursting = false, tempCover, fireHeart;
var isShootLoveMode = true, loveTextures, shootLoveTimeO = 30 , shootLoveTime = shootLoveTimeO;

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
function updateFire(){
  fireHeart.position.set(renderer.plugins.interaction.mouse.global.x,
      renderer.plugins.interaction.mouse.global.y);
  scaleMagic(fireHeart,1.0); 
  if(isBursting && fireObjects.length > 0){
    movingCirMagic(fireObjects[fireObjects.length-1],boatZone,40,-450);
    setDirMoving(fireObjects[fireObjects.length-1],true,20.0,
      renderer.plugins.interaction.mouse.global.x,
      renderer.plugins.interaction.mouse.global.y);
    fireObjects[fireObjects.length-1].isFiring = true;
    fireObjects[fireObjects.length-1].isInBoat = false;
    fireObjects.splice(fireObjects.length-1, 1);
  }
}
//------------------------------------------------------------------------------------------
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
    physicsObjects.push(newNod);
    setCirMoving(newNod,0.05,Math.random()*Math.PI*2,50);
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
function nodUpdate(i){
  if(this.x > 2500.0){
    this.destroy(); physicsObjects.splice(i, 1); 
    return i-1;
  }
  else if(this.isFiring){
    movingDirMagic(this);
    if(!this.isMoving){
      this.isFiring = false; this.isFalling = true;
      setFireObjectHorizontalPlane(this);
    }
  }
  else if(this.isFalling){
    this.vy += ( 0.07 * this.aty );
    this.y += ( this.vy + this.aty ) ;  
    this.x += this.vx;
    if(this.vy > 0 && this.y >= this.horizontalPlane){ 
      this.isFalling = false; this.isInFlow = true;
      this.vy = 0;
    }
  }
  else if(this.isInBoat){
    if(isFireMode){ movingCirMagic(this,boatZone,40,-450); this.isMoving = true; }
    if(!this.isMoving && randomMovingTimeCount<0.0 && Math.floor(Math.random()*2)<1.0){
      setMoving(this,true,30,
        Math.floor(Math.random()*300)-150,this.horizontalPlane-boatZone.y);
    }
    if(this.isMoving) movingMagic(this,boatZone);
    if(!boatZone.isStop) this.x += ( boatZone.vx + boatZone.atx ) ;
  }
  else if(this.isInFlow){
    if(this.x < (boatZone.x + 280) && this.x > (boatZone.x - 280) &&
        this.zIndex <= (sheepZone.zIndex + 15) && this.zIndex >= (sheepZone.zIndex - 10) ){ 
      this.isInBoat = true; this.isInFlow = false; 
      this.rotationValue = 1;
      fireObjects.push(this);
      setMoving(this,true,30,
      0,sheepZone.horizontalPlane + 20 - boatZone.y - Math.floor(fireObjects.length/nodInBoatWidth)*nodInBoatHeight);
      this.zIndex = 69 - Math.random();
    }
    else{
      if(charas[this.typePW].isInFlow && !this.isMoving){
        setMoving(this,true,10,Math.floor(Math.random() * 101)-50,
          Math.floor(Math.random() * 21)-10 + 70);
        this.zIndex = 70.0 + Math.floor(Math.random() * 2) - 1;
      }
      if(this.isMoving) movingMagic(this,charas[this.typePW]);
      this.rotationValue = 3;
      this.x += flowZone.flowSpeed; 
    }
  }
  rotateMagic(this);
  scaleMagic(this,-1.0);
  return i;
}
//------------------------------------------------------------------------------------------
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
function onTempCoverDown(){
  isBursting = true;
}
function onTempCoverUp(){
  isBursting = false;
}
//------------------------------------------------------------------------------------------
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
    physicsObjects.push(newLove);
    setCirMoving(newLove,0.05,Math.random()*Math.PI*2,170);
}
function updateShootLove() {
  shootLoveTime --;
  if(shootLoveTime < 0){
    shootLove(); shootLoveTime = shootLoveTimeO;
  }
}