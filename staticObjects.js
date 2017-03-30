var landZone, land, landBack;
var flowZone, flow, flowBack;
var mountainZone, mountain, mountainBack;
var whaleZone, whale, waterColumn;
var skyZone, sky;
var loveLightZone, loveLight;

landZone = new Container();
flowZone = new Container();
mountainZone = new Container();
whaleZone = new Container();
skyZone = new Container();
loveLightZone = new Container();

var isWaterGo = false, isWaterDown = false, waterScale = 1.0;

landZone.setup = function(){
  this.position.set(-4000, 0);
  land = new Sprite(Texture.fromImage('http://i.imgur.com/dv9hRw2.png'));
  land.position.set(0, 0);
  landBack = new Sprite(Texture.fromImage('http://i.imgur.com/dv9hRw2.png'));
  landBack.position.set(4000, 0);
  this.addChild(land);
  this.addChild(landBack);
  stage.addChild(this);
  this.on('pointerdown', shootNod);
  setHitArea(this,-2000,700,8000,100);
};
flowZone.setup = function(){
  this.position.set(-4000, 0);
  flow = new Sprite(Texture.fromImage('http://i.imgur.com/1v2Gru5.png'));
  flow.position.set(0, 0);
  flowBack = new Sprite(Texture.fromImage('http://i.imgur.com/1v2Gru5.png'));
  flowBack.position.set(4000, 0);
  this.addChild(flow);
  this.addChild(flowBack);
  stage.addChild(this);
  this.flowSpeed = 5.0; 
};
mountainZone.setup = function(){
  this.position.set(-4000, 0);
  mountain = new Sprite(Texture.fromImage('http://i.imgur.com/XVwrBAF.png'));
  mountain.position.set(0, 0);
  mountainBack = new Sprite(Texture.fromImage('http://i.imgur.com/XVwrBAF.png'));
  mountainBack.position.set(4000, 0);
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
  sky = new Sprite(Texture.fromImage('http://i.imgur.com/c8Be7L1.png'));
  sky.position.set(0, 0);
  this.addChild(sky);
  stage.addChild(this);
};
loveLightZone.setup = function(){
  loveLight = new Sprite(Texture.fromImage('http://i.imgur.com/ZXyC5NR.png'));
  loveLight.position.set(0, 0);
  this.addChild(loveLight);
  stage.addChild(this);
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
//------------------------------------------------------------------------------------------------
function onWhaleDown() {
  isWaterGo = true;
}