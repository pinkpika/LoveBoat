var physicsObjects = [];
function allSetup() {

  sheepZone.setup();
  pinkZone.setup();
  boatZone.setup();

  landZone.setup();
  flowZone.setup();
  mountainZone.setup();
  whaleZone.setup();
  skyZone.setup();
  loveLightZone.setup();
  message.setup();

  setupFireMode();

  skyZone.zIndex = 0;
  mountainZone.zIndex = 10;
  whaleZone.zIndex = 49.9999;
  flowZone.zIndex = 50;
  boatBanbanZone.zIndex = 69.9997;
  boatFlagZone.zIndex = 69.9998;
  pinkZone.zIndex = 69.9999;
  sheepZone.zIndex = 70;
  boatZone.zIndex = 70.0001;
  landZone.zIndex = 100;
  fireHeart.zIndex = 300;
  loveLightZone.zIndex = 500;
  message.zIndex = 1000;

  if(isDebugHitArea) debugSetupHitArea();
  
  gameLoop();
}
//------------------------------------------------------------------------------------------------
function updateState() {
  //sort-----------------------
  stage.children.sort(function(a,b) { 
    a.zIndex = a.zIndex || 0;
    b.zIndex = b.zIndex || 0;
    return a.zIndex - b.zIndex;
  }); 

  if(isShootLoveMode) updateShootLove();

  boatZone.update();

  landZone.update();
  flowZone.update();
  mountainZone.update();
  whaleZone.update();

  message.update();

  randomMovingTimeCount -= 1.0/60.0;

  charaUpdate.call(sheepZone);
  charaUpdate.call(pinkZone);
  sheepZone.updateSP();
  pinkZone.updateSP();

  for(i = 0; i< physicsObjects.length;i++){
    i = nodUpdate.call(physicsObjects[i],i);
  }
  if(randomMovingTimeCount < 0.0 ) randomMovingTimeCount = randomMovingTime ;

  if(isFireMode) updateFire();
}
function gameLoop(){
  requestAnimationFrame(gameLoop);
  updateState();
  renderer.render(stage);
}
allSetup(); //Start---------