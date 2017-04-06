var landZone, land, landBack;
var flowZone, flow, flowBack;
var mountainZone, mountain, mountainBack;
var whaleZone, whale, waterColumn;

var skyZone, skyDay, skyNight, skyTextures;
var fullDayStart = 8, fullDayEnd = 16, fullNightStart = 20, fullNightEnd = 4;

var loveLightZone, loveLight;
var sunZone, sunSheep, sunSheepLight, moonZone, moonPink;
var sunStart = 6, sunEnd = 21, moonStart = 18 , moonEnd = 12;

landZone = new Container();
flowZone = new Container();
mountainZone = new Container();
whaleZone = new Container();
skyZone = new Container();
loveLightZone = new Container();
sunZone = new Container();
moonZone = new Container();

var isWaterGo = false, isWaterDown = false, waterScale = 1.0;

landZone.setup = function(){
  this.position.set(-4000, 0);
  land = new Sprite(Texture.fromImage('http://i.imgur.com/dv9hRw2.png'));
  land.position.set(0, 50);
  landBack = new Sprite(land.texture);
  landBack.position.set(4000, 50);
  this.addChild(land);
  this.addChild(landBack);
  stage.addChild(this);
  this.on('pointerdown', shootNod);
  setHitArea(this,-2000,700,8000,100);
};
flowZone.setup = function(){
  this.position.set(-4000, 0);
  flow = new Sprite(Texture.fromImage('http://i.imgur.com/yjFv8Ib.png'));
  flow.position.set(0, 0);
  flowBack = new Sprite(flow.texture);
  flowBack.position.set(4000, 0);
  this.addChild(flow);
  this.addChild(flowBack);
  stage.addChild(this);
  this.flowSpeed = 5.0; 
};
mountainZone.setup = function(){
  this.position.set(-4000, 0);
  mountain = new Sprite(Texture.fromImage('http://i.imgur.com/XVwrBAF.png'));
  mountain.position.set(0, 30);
  mountainBack = new Sprite(mountain.texture);
  mountainBack.position.set(4000, 30);
  this.addChild(mountain);
  this.addChild(mountainBack);
  stage.addChild(this);
};
whaleZone.setup = function(){
  this.position.set(300, 400);
  whale = new Sprite(Texture.fromImage('http://i.imgur.com/6K5s214.png'));
  whale.on('pointerdown', onWhaleDown);  
  setHitArea(whale,0,100,1000,180);
  stage.addChild(whale);
  waterColumn = new Sprite(Texture.fromImage('http://i.imgur.com/pxI8pSI.png'));
  waterColumn.position.set(300, 100);
  waterColumn.anchor.set(0.5, 0.96);
  this.addChild(waterColumn);
  this.addChild(whale);
  setScale(this,0.7,true,0,1);
  stage.addChild(this);
};
skyZone.setup = function(){
  skyTextures = [];
  skyTextures.push(Texture.fromImage('http://i.imgur.com/c8Be7L1.png'));
  skyTextures.push(Texture.fromImage('http://i.imgur.com/cAkSYUK.png'));
  skyDay = new Sprite(skyTextures[0]);
  skyDay.position.set(0, 0);
  skyNight = new Sprite(skyTextures[1]);
  skyNight.position.set(0, 0);
  this.addChild(skyDay);
  this.addChild(skyNight);
  stage.addChild(this);
};
loveLightZone.setup = function(){
  loveLight = new Sprite(Texture.fromImage('http://i.imgur.com/ZXyC5NR.png'));
  loveLight.position.set(0, 0);
  this.addChild(loveLight);
  stage.addChild(this);
};
sunZone.setup = function(){
  this.position.set(Math.random()*1000+500, 100);
  sunSheepLight = new Sprite(Texture.fromImage('http://i.imgur.com/PdQ5LjI.png'));
  this.addChild(sunSheepLight);
  sunSheepLight.position.set(0, 5);
  sunSheepLight.pivot.set(75,75);
  sunSheep = new Sprite(Texture.fromImage('http://i.imgur.com/UjsBrM1.png'));
  this.addChild(sunSheep);
  sunSheep.pivot.set(40,40);
  setScale(this.children[0],1.2,true,2,-1);
  setScale(this.children[1],1.2,true,0,-1);
  setRotation(this.children[1],0,true,1,-1); 
  stage.addChild(this);
  this.isMoving = false; this.randomTime = 1800; this.randomTimeO = this.randomTime; 
};
moonZone.setup = function(){
  this.position.set(Math.random()*1000+500, 200);
  moonPink = new Sprite(Texture.fromImage('http://i.imgur.com/h7VhGjE.png'));
  this.addChild(moonPink);
  moonPink.pivot.set(65,65);
  setScale(this.children[0],1.2,true,1,-1);
  setRotation(this.children[0],0,true,1,-1); 
  stage.addChild(this);
  this.isMoving = false; this.randomTime = 300; this.randomTimeO = this.randomTime;
};
//------------------------------------------------------------------------------------------------
landZone.update = function(){
  landZone.x += 4;
  if(landZone.x >= 0) landZone.x = -4000;
};
flowZone.update = function(){
  flowZone.x += 3;
  if(flowZone.x >= 0) flowZone.x = -4000;
};
mountainZone.update = function(){
  mountainZone.x += 1;
  if(mountainZone.x >= 0) mountainZone.x = -4000;
};
whaleZone.update = function(){
  if(isWaterGo){ 
    if(!isWaterDown && waterColumn.scale.y < 15.0) waterColumn.scale.y += 1.0;
    else {
      isWaterDown = true ; 
      if(isWaterDown && waterColumn.scale.y >= 1.0) waterColumn.scale.y -= 0.05;
      else{ isWaterDown = false; isWaterGo = false ; }
    }
  }
};
skyZone.update = function(){
  if(h >= fullDayEnd && h <= (fullNightStart - 1)){
    skyNight.alpha = ((h - fullDayEnd)*60*60 + m*60 + s) / ((fullNightStart - fullDayEnd)*60*60);
    skyDay.alpha = 1.0 - skyNight.alpha ;
  }
  else if(h >= fullNightEnd && h <= (fullDayStart - 1)){
    skyDay.alpha = ((h - fullNightEnd)*60*60 + m*60 + s) / ((fullDayStart - fullNightEnd)*60*60);
    skyNight.alpha = 1.0 - skyDay.alpha ;
  }
}
sunZone.update = function(){
  this.randomTime--;
  if(!this.isMoving && this.randomTime<0.0 && Math.floor(Math.random()*2)<1.0){
    var tempX = (Math.random()*1800)+100 ;
    setDirMoving(this,true,Math.floor(Math.abs(tempX - this.x)*3.0),tempX, this.y);
    this.randomTime = this.randomTimeO;
  }
  if(this.isMoving) movingDirMagic(this);
  scaleMagic(this.children[0],1.0);
  rotateMagic(this.children[1]);
  this.visible = (h >= sunStart && h <= (sunEnd - 1))?true:false;
};
moonZone.update = function(){
  this.randomTime--;
  if(!this.isMoving && this.randomTime<0.0 && Math.floor(Math.random()*2)<1.0){
    var tempX = (Math.random()*1800)+100 ;
    setDirMoving(this,true,Math.floor(Math.abs(tempX - this.x)*2.0),tempX, this.y);
    this.randomTime = this.randomTimeO;
  }
  if(this.isMoving) movingDirMagic(this); 
  scaleMagic(this.children[0],1.0);
  rotateMagic(this.children[0]);
  this.visible = (h >= moonStart || h <= (moonEnd - 1))?true:false;
};
//------------------------------------------------------------------------------------------------
function onWhaleDown() {
  isWaterGo = true;
}