var sheepZone, sheep, sheepBright;
sheepZone = new Container();
var pinkZone, pink, pinkBright;
pinkZone = new Container();

sheepZone.setup = function(){
  this.textures = [];
  this.textures.push(Texture.fromImage('http://i.imgur.com/PkYtBhg.png')); //sheep
  this.textures.push(Texture.fromImage('http://i.imgur.com/N4nj96o.png')); //sheepLove
  this.textures.push(Texture.fromImage('http://i.imgur.com/qMolVry.png')); //sheepBright
  this.textures.push(Texture.fromImage('http://i.imgur.com/Fxdv48h.gif')); //sheepDrag
  this.pivot.set(110, 160); 
  this.position.set(1000, 200);
  this.on('pointerdown', onCharaDown).on('pointerup', onCharaUp)
      .on('pointerupoutside', onCharaUp).on('pointermove', onCharaDragMove)
      .on('pointerover', onCharaOver).on('pointerout', onCharaOut);
  sheep = new Sprite(this.textures[0]);
  sheepBright = new Sprite(this.textures[2]);
  this.addChild(sheepBright);
  this.addChild(sheep);
  stage.addChild(this);
  setPhysics(this,0,0,0,5.0,525,true,false,false,false);
  setHitArea(this,0,40,220,200);
  setRotation(this,0,true,1,-1); 
  setMoving(this,false,40.0,0.0,this.horizontalPlane);
  this.randomMovingTime = 3.0; 
  this.isFiring = false;
  setScale(this,0.8,true,1,-1);
};

pinkZone.setup = function(){
  this.textures = [];
  this.textures.push(Texture.fromImage('http://i.imgur.com/AeuARUH.png')); //pink
  this.textures.push(Texture.fromImage('http://i.imgur.com/ESwJe93.png')); //pinkLove
  this.textures.push(Texture.fromImage('http://i.imgur.com/ykXk0nY.png')); //pinkBright
  this.textures.push(Texture.fromImage('http://i.imgur.com/80A1hdv.png')); //pinkDrag
  //this.textures.push(Texture.fromImage('http://i.imgur.com/Z5hkuz8.png')); //pink
  //this.textures.push(Texture.fromImage('http://i.imgur.com/8ymjOwl.png')); //pinkLove
  //this.textures.push(Texture.fromImage('http://i.imgur.com/ykXk0nY.png')); //pinkBright
  //this.textures.push(Texture.fromImage('http://i.imgur.com/ErJ36Xy.gif')); //pinkDrag
  this.pivot.set(110, 160); 
  this.position.set(1170, 200);
  this.on('pointerdown', onCharaDown).on('pointerup', onCharaUp)
          .on('pointerupoutside', onCharaUp).on('pointermove', onCharaDragMove)
          .on('pointerover', onCharaOver).on('pointerout', onCharaOut);
  pink = new Sprite(this.textures[0]);
  pinkBright = new Sprite(this.textures[2]);
  this.addChild(pinkBright);
  this.addChild(pink);
  stage.addChild(this);
  setPhysics(this,0,0,0,5.0,525,true,false,false,false);
  setHitArea(this,0,40,220,200);
  setRotation(this,0,true,1,-1); 
  setMoving(this,false,40.0,0.0,this.horizontalPlane);
  this.randomMovingTime = 3.0;
  this.isFiring = false; 
  setScale(this,0.8,true,1,-1);
};

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
  if(this.isOver && this.isInBoat){ this.children[1].texture = this.textures[1]; }
  else{ this.children[1].texture = this.textures[0]; } 
	this.isFalling = true;
}
function onCharaOver() {
  this.children[1].isOver = true;
  if (this.isdown) { return; }
  if(this.isInBoat) this.children[1].texture = this.textures[1];
}
function onCharaOut() {
  this.isOver = false;
  if (this.isdown) { return; }
  if(this.isInBoat) this.children[1].texture = this.textures[0];
}
function onCharaDragMove(event) {
  if (this.dragging) {
    this.x = event.data.getLocalPosition(this.parent).x + this.fixX;
    this.y = event.data.getLocalPosition(this.parent).y + this.fixY;
  }
}