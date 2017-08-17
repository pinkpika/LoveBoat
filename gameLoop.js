var physicsObjects = [];
function allSetup() {

  setupToolObjects();

  sheepZone.setup();
  pinkZone.setup();

  boatZone.setup();

  landZone.setup();
  flowZone.setup();
  mountainZone.setup();
  whaleZone.setup();
  skyZone.setup();
  loveLightZone.setup();
  sunZone.setup();
  moonZone.setup();
  message.setup();
  messageControl.setup();

  setupFireMode();
  setupParticleObjects();

  skyZone.zIndex = 0;
  sunZone.zIndex = 2;
  //stars = 5.0;
  moonZone.zIndex = 5.999;
  sunZone.zIndex = 6;
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
  messageControl.zIndex = 1000;

  if(isDebugHitArea) debugSetupHitArea();
  
  gameLoop();
}
//------------------------------------------------------------------------------------------------
function updateState() {

  if(isShootLoveMode) updateShootLove();

  if(isCircleLightMode) updateCircleLight();
  if(isCrossStarMode) updateCrossStar();
  
  if(isMemoryBubbleMode) updateMemoryBubble();
  
  boatZone.update();

  landZone.update();
  flowZone.update();
  mountainZone.update();
  whaleZone.update();
  skyZone.update();
  sunZone.update();
  moonZone.update();

  message.update();

  randomMovingTimeCount -= 1.0/60.0;

  charaUpdate.call(sheepZone);
  charaUpdate.call(pinkZone);
  sheepZone.updateSP();
  pinkZone.updateSP();

  for(var i = 0; i< physicsObjects.length;i++){
    i = nodUpdate.call(physicsObjects[i],i);
  }
  if(randomMovingTimeCount < 0.0 ) randomMovingTimeCount = randomMovingTime ;

  for(var i = 0; i< particleObjects.length;i++){
    i = particleUpdate.call(particleObjects[i],i);
  }

  if(isFireMode) updateFire();

  //sort-----------------------
  stage.children.sort(function(a,b) { 
    a.zIndex = a.zIndex || 0;
    b.zIndex = b.zIndex || 0;
    return a.zIndex - b.zIndex;
  }); 
}
function gameLoop(){
  requestAnimationFrame(gameLoop);
  updateState();
  renderer.render(stage);
}
allSetup(); //Start---------