// 睡覺時間
var sleepTimeStart = 22, sleepTimeEnd = 8;

// 相機物件
var cameraZone, camera;
cameraZone = new Container();
cameraZone.setup = function(){
  this.textures = [];
  this.textures.push(Texture.fromImage('https://i.imgur.com/MNc8JYT.png'));
  this.position.set(0, 675);
  this.on('pointerdown', onCameraDown);
  camera = new PIXI.Sprite(this.textures[0]);
  this.addChild(camera);
  setHitArea(this,0,40,300,200);
  setScale(this,0.5,true,1,-1);
  stage.addChild(this);
}

// 角色物件
var charas = [];

// 咩咩物件
var sheepZone, sheep, sheepBright;
sheepZone = new Container();
sheepZone.setup = function(){
  this.pivot.set(110, 160); 
  this.position.set(1000, 200);
  this.on('pointerdown', onCharaDown).on('pointerup', onCharaUp)
      .on('pointerupoutside', onCharaUp).on('pointermove', onCharaDragMove)
      .on('pointerover', onCharaOver).on('pointerout', onCharaOut);
  sheep = new Sprite();
  sheepBright = new Sprite();
  this.resetTextures(nowType);
  this.addChild(sheepBright);
  this.addChild(sheep);
  stage.addChild(this);
  setPhysics(this,0,0,0,5.0,550,true,false,false,false);
  setHitArea(this,0,40,220,200);
  setRotation(this,0,true,1,-1); 
  setMoving(this,false,40.0,0.0,this.horizontalPlane);
  this.randomMovingTime = 3.0; 
  this.isFiring = false;
  
  this.isSleepingLast = false; this.isSleeping = false; this.sleepingXY = new PIXI.Point(-70,-40);
  this.hat = new Sprite(propsHatTextures[Math.floor(Math.random()*5)]);
  this.hat.visible = false;
  this.hat.position.set(-20,-5);
  this.addChild(this.hat);
  
  setScale(this,0.8,true,1,-1);
  charas.push(this);
};

// 咩咩物件 - 重新設定Textures
sheepZone.resetTextures = function(type){
  this.textures = getSheepTextures(type);
  this.texturesO = getSheepTextures(type);
  sheep.setTexture(this.textures[0]);
  sheepBright.setTexture(this.textures[1]);
};

// 果凍物件
var pinkZone, pink, pinkBright;
pinkZone = new Container();
pinkZone.setup = function(){
  this.pivot.set(110, 160); 
  this.position.set(1170, 200);
  this.on('pointerdown', onCharaDown).on('pointerup', onCharaUp)
          .on('pointerupoutside', onCharaUp).on('pointermove', onCharaDragMove)
          .on('pointerover', onCharaOver).on('pointerout', onCharaOut);
  pink = new Sprite();
  pinkBright = new Sprite();
  this.resetTextures(nowType);
  this.addChild(pinkBright);
  this.addChild(pink);
  stage.addChild(this);
  setPhysics(this,0,0,0,5.0,550,true,false,false,false);
  setHitArea(this,0,40,220,200);
  setRotation(this,0,true,1,-1); 
  setMoving(this,false,40.0,0.0,this.horizontalPlane);
  this.randomMovingTime = 3.0;
  this.isFiring = false; 
  
  this.isSleepingLast = false; this.isSleeping = false; this.sleepingXY = new PIXI.Point(40,-20);
  this.hat = new Sprite(propsHatTextures[Math.floor(Math.random()*5)]);
  this.hat.visible = false;
  this.hat.position.set(-10,-15);
  this.addChild(this.hat);

  setScale(this,0.8,true,1,-1);
  charas.push(this);
};

// 果凍物件 - 重新設定Textures
pinkZone.resetTextures = function(type){
  this.textures = getPinkTextures(type);
  this.texturesO = getPinkTextures(type);
  pink.setTexture(this.textures[0]);
  pinkBright.setTexture(this.textures[1]);
};

//------------------------------------------------------------------------------------------------
function charaUpdate(){
  if(this.x > 2500.0){
    this.x = 1000; this.y = -400; this.isInFlow = false; this.isFalling = true;
    return;
  }
  if(this.isFalling){
    this.vy += ( 0.07 * this.aty );
    this.x += this.vx; this.y += ( this.vy + this.aty ) ;
    this.children[1].texture = this.textures[3]; 
    if(this.vy > 0 && this.y >= this.horizontalPlane){ 
      this.isFalling = false; this.isInFlow = true;
      this.vy = 0;
    }
  }
  else if(this.dragging){}
  else if(this.isInBoat){
    if(!this.isSleeping){
      if(!this.isMoving && randomMovingTimeCount<0.0 && Math.floor(Math.random()*2)<1.0){
        setMoving(this,true,30,
          Math.floor(Math.random()*300)-150,this.horizontalPlane-boatZone.y);
      }
      if(this.isMoving) movingMagic(this,boatZone);
    }
    if(!boatZone.isStop) this.x += ( boatZone.vx + boatZone.atx ) ;
  }
  if(this.isInFlow){
    if(this.x < (boatZone.x + 280) && this.x > (boatZone.x - 280) ){ 
      this.isInBoat = true; this.isInFlow = false; 
      this.rotationValue = 1;
      this.children[1].texture = this.textures[0]; 
      if(!this.isSleeping) setMoving(this,true,30,0,this.horizontalPlane-boatZone.y);
      else{ 
        setMoving(this,true,30,this.sleepingXY.x,this.sleepingXY.y + this.horizontalPlane - boatZone.y);
        this.hat.texture = propsHatTextures[Math.floor(Math.random()*5)];
      }
    }
    else{
      this.rotationValue = 3;
      this.x += flowZone.flowSpeed; 
    }
  }
  rotateMagic(this);
  scaleMagic(this,-1.0);
  updateSleepState(this);
}
function updateSleepState(charas){
  if(h>=sleepTimeEnd && h<=(sleepTimeStart-1)) charas.isSleeping = false;
  else{ 
    charas.isSleeping = true;
    if(charas.isMoving) movingMagicNoSetH(charas,boatZone);
    updateZZZ(charas);
  }
  if(charas.isSleeping && !charas.isSleepingLast){
    charas.textures[0] = charas.texturesO[4] ;
    charas.textures[2] = charas.texturesO[4] ;
    charas.textures[3] = charas.texturesO[4] ;
    charas.children[1].texture = charas.textures[4];
    charas.hat.visible = true;
    setMoving(charas,true,30,charas.sleepingXY.x,charas.sleepingXY.y + charas.horizontalPlane - boatZone.y);
    headboard.visible = true; comforter.visible = true;
    pillowA.visible = true; pillowB.visible = true;
  }
  if(!charas.isSleeping && charas.isSleepingLast){
    charas.textures[0] = charas.texturesO[0] ;
    charas.textures[2] = charas.texturesO[2] ;
    charas.textures[3] = charas.texturesO[3] ;
    charas.children[1].texture = charas.textures[0];
    charas.hat.visible = false;
    headboard.visible = false; comforter.visible = false;
    pillowA.visible = false; pillowB.visible = false; 
  }
  charas.isSleepingLast = charas.isSleeping ;
}
sheepZone.updateSP = function(){};
pinkZone.updateSP = function(){};
//------------------------------------------------------------------------------------------------
function onCharaDown(event) {
  this.children[1].texture = this.textures[3];
  this.isdown = true;
  this.isMoving = false; this.dragging = true; this.isInBoat = false; this.isInFlow = false;
  this.fixX = this.x - event.data.getLocalPosition(this.parent).x;
  this.fixY = this.y - event.data.getLocalPosition(this.parent).y;
  this.rotationValue = 2;
}
function onCharaUp() {
  this.isdown = false;
  this.dragging = false;
  if(this.isOver && this.isInBoat){ this.children[1].texture = this.textures[2]; }
  else{ this.children[1].texture = this.textures[0]; } 
	this.isFalling = true;
}
function onCharaOver() {
  this.children[1].isOver = true;
  if(this.isdown) { return; }
  if(this.isInBoat) this.children[1].texture = this.textures[2];
}
function onCharaOut() {
  this.isOver = false;
  if (this.isdown) { return; }
  if(this.isInBoat){ 
    this.children[1].texture = this.textures[0];
  }
}
function onCharaDragMove(event) {
  if (this.dragging) {
    this.x = event.data.getLocalPosition(this.parent).x + this.fixX;
    this.y = event.data.getLocalPosition(this.parent).y + this.fixY;
  }
}
//------------------------------------------------------------------------------------------------
function cameraUpdate(){
  scaleMagic(this,-1.0);
}

function onCameraDown(event) {
  renderer.render(stage);
  var fileName = getNowTime() + '_LoveBoat'
  saveAs(renderer.extract.canvas().toDataURL("image/jpeg"), fileName);
}

function saveAs(uri, filename) {
  var link = document.createElement('a');
  if (typeof link.download === 'string') {
      link.href = uri;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
  } else {
      window.open(uri);
  }
}

function getNowTime(){
	var timeDate = new Date();
	var tMonth = (timeDate.getMonth()+1) > 9 ? (timeDate.getMonth()+1) : '0'+(timeDate.getMonth()+1);
	var tDate = timeDate.getDate() > 9 ? timeDate.getDate() : '0'+timeDate.getDate();
	var tHours = timeDate.getHours() > 9 ? timeDate.getHours() : '0'+timeDate.getHours();
	var tMinutes = timeDate.getMinutes() > 9 ? timeDate.getMinutes() : '0'+timeDate.getMinutes();
	var tSeconds = timeDate.getSeconds() > 9 ? timeDate.getSeconds() : '0'+timeDate.getSeconds();
	return timeDate= timeDate.getFullYear()+ tMonth + tDate +'_'+ tHours + tMinutes + tSeconds;
}