var boatZone, boat, boatTexture, boatPaddle;
boatZone = new Container();
var boatFlagZone, flag;
var boatBanbanZone, banban;

var boatPaddleRo = 0.0;

boatZone.setup = function(){
  this.position.set(1000, 670);
  this.vx = 1.0; this.atx = 0;
  this.stopLine = 1750; this.isStop = false; this.isAccelerate = false;
  setScale(this,0.8,true,1,-1);
  setRotation(this,0,true,4,-1); 

  boat = new Sprite();
  boat.oTexture = Texture.fromImage('http://i.imgur.com/B6MNMzM.png');
  boat.texture = new PIXI.Texture(boat.oTexture, new PIXI.Rectangle(0, 0, 664, 210))
  boat.anchor.set(0.0, 0.0);
  boat.position.set(-332, -260);
  boat.on('pointerdown', onBoatDown);
  setHitArea(boat,0,120,640,140);
  boatPaddle = new Sprite(Texture.fromImage('http://i.imgur.com/wSdBTV6.png'));
  boatPaddle.anchor.set(0.5, 0.5);
  boatPaddle.position.set(150, -100);
  this.addChild(boat);
  this.addChild(boatPaddle);
  stage.addChild(this);

  boatBanbanZone = new Container();
  boatBanbanZone.position.set(1000, 670);
  setScale(boatBanbanZone,0.8,true,1,-1);
  setRotation(boatBanbanZone,0,true,4,-1); 
  banban = new Sprite(Texture.fromImage('http://i.imgur.com/LA2U7hy.png'));
  banban.anchor.set(0.5, 1.0);
  banban.pivot.set(0.0, 0.0);
  banban.position.set(30, -140);
  boatBanbanZone.addChild(banban);
  stage.addChild(boatBanbanZone);

  boatFlagZone = new Container();
  boatFlagZone.position.set(1000, 670);
  setScale(boatFlagZone,0.8,true,1,-1);
  setRotation(boatFlagZone,0,true,4,-1); 
  flag = new Sprite(Texture.fromImage('http://i.imgur.com/YdzjFUh.png'));
  flag.anchor.set(0.5, 1.0);
  flag.pivot.set(0.0, 0.0);
  flag.position.set(200, -400);
  flag.on('pointerdown', onFlagDown).on('touchstart', onFlagDown);
  setHitArea(flag,-250,-250,200,200);
  boatFlagZone.addChild(flag);
  stage.addChild(boatFlagZone);
};

boatZone.update = function(){
  //boat--------------------------
  if(boatZone.x >= boatZone.stopLine && !boatZone.isAccelerate) boatZone.isStop = true;
  else boatZone.isStop = false;
  if(boatZone.isAccelerate) boatZone.atx += 0.2;
  if(boatZone.atx >= 0.0) boatZone.isAccelerate = false;
  if(!boatZone.isStop){ 
    boatZone.x += ( boatZone.vx + boatZone.atx );
    boatFlagZone.x = boatZone.x;
    boatBanbanZone.x = boatZone.x;
  }
  rotateMagic(boatZone); rotateMagic(boatFlagZone); rotateMagic(boatBanbanZone); 
  scaleMagic(boatZone,1.0);  scaleMagic(boatFlagZone,1.0); scaleMagic(boatBanbanZone,1.0); 
  //boatPaddle--------------------
  boatPaddle.rotation += boatPaddleRo;
  if(boatPaddle.rotation < -6.28){ boatPaddleRo = 0.0;
    boatPaddle.rotation = 0.0;
  }
};

//------------------------------------------------------------------------------------------------
function onFlagDown() {
  isFireMode = !isFireMode;
  if(isFireMode){
    createTempCover();
  }
  else{
    fireHeart.visible = false;
    boatFlagZone.zIndex = 69.9998;
    tempCover.destroy();
  }
}
function onBoatDown() {
	boatZone.isAccelerate = true;
	boatZone.atx = -15.0;
	boatPaddleRo = -0.5;
}