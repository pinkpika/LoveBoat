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

  shootLoveTime --;
  if(shootLoveTime < 0){
    shootLove(); shootLoveTime = 30;
  }
  //fire------------------------------------------------------------------
  if(isFireMode){
    fireHeart.position.set(renderer.plugins.interaction.mouse.global.x,
      renderer.plugins.interaction.mouse.global.y);
    scaleMagic(fireHeart,1.0); 
    if(isBursting && fireObjects.length > 0){
      setDirMoving(fireObjects[fireObjects.length-1],true,20.0,
        renderer.plugins.interaction.mouse.global.x,
        renderer.plugins.interaction.mouse.global.y);
      fireObjects[fireObjects.length-1].isFiring = true;
      fireObjects[fireObjects.length-1].isInBoat = false;
      firedObjects.push(fireObjects[fireObjects.length-1]);
      fireObjects.splice(fireObjects.length-1, 1); 
    }
    for(var i = 0 ; i < firedObjects.length ; i++){
      movingDirMagic(firedObjects[i]);
      if(!firedObjects[i].isMoving){
          firedObjects[i].isFiring = false;
          firedObjects[i].isFalling = true;
          setFireObjectHorizontalPlane(firedObjects[i]);
          firedObjects.splice(i, 1); 
      }
    }
  }

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

  //Water-------------------------
  if(isWaterGo){ 
    if(!isWaterDown && waterColumn.scale.y < 15.0) waterColumn.scale.y += 1.0;
    else {
      isWaterDown = true ; 
      if(isWaterDown && waterColumn.scale.y >= 1.0) waterColumn.scale.y -= 0.05;
      else{ isWaterDown = false; isWaterGo = false ; }
    }
  }

  //Zone--------------------------
  landZone.x += 4;
  if(landZone.x >= 0) landZone.x = -4000;
  flowZone.x += 3;
  if(flowZone.x >= 0) flowZone.x = -4000;
  mountainZone.x += 1;
  if(mountainZone.x >= 0) mountainZone.x = -4000;

  //physicsObjects-------------------------------
  randomMovingTimeCount -= 1.0/60.0;
  for(var i = 0 ; i < physicsObjects.length ; i++){
    if(physicsObjects[i].willBeDead && physicsObjects[i].x > 2500.0)
    {
      physicsObjects[i].destroy();
      physicsObjects.splice(i, 1); 
      i -= 1; continue;
    }
    else if(!physicsObjects[i].willBeDead && physicsObjects[i].x > 2500.0){
      physicsObjects[i].x = 1000; physicsObjects[i].y = -400;
      physicsObjects[i].isInFlow = false; physicsObjects[i].isFalling = true;
    }
    else if(physicsObjects[i].dragging){}
    else if(physicsObjects[i].isFiring){}
    else if(physicsObjects[i].isFalling){
      physicsObjects[i].vy += ( 0.07 * physicsObjects[i].aty );
      physicsObjects[i].y += ( physicsObjects[i].vy + physicsObjects[i].aty ) ;  
      physicsObjects[i].x += physicsObjects[i].vx;
      if(i===0||i===1) physicsObjects[i].children[1].texture = physicsObjects[i].textures[3]; 
      if(physicsObjects[i].vy > 0 && physicsObjects[i].y >= physicsObjects[i].horizontalPlane){ 
        physicsObjects[i].isFalling = false;
        physicsObjects[i].vy = 0;
      }
    }
    else if(physicsObjects[i].isInBoat){
      if(!physicsObjects[i].isMoving && randomMovingTimeCount<0.0 && Math.floor(Math.random()*2)<1.0){
        setMoving(physicsObjects[i],true,30,
          Math.floor(Math.random()*300)-150,physicsObjects[i].horizontalPlane-boatZone.y);
      }
      if(physicsObjects[i].isMoving) movingMagic(physicsObjects[i],boatZone);
      if(!boatZone.isStop) physicsObjects[i].x += ( boatZone.vx + boatZone.atx ) ;
    }
    else{ //physicsObjects[i].isInFlow = true
      if(physicsObjects[i].x < (boatZone.x + 280) && physicsObjects[i].x > (boatZone.x - 280) &&
        physicsObjects[i].zIndex <= (sheepZone.zIndex + 15) &&
        physicsObjects[i].zIndex >= (sheepZone.zIndex - 10) )
      { 
          physicsObjects[i].isInBoat = true; physicsObjects[i].isInFlow = false;
          physicsObjects[i].rotationValue = 1;
          if(i===0||i===1){ 
            physicsObjects[i].children[1].texture = physicsObjects[i].textures[0]; 
            setMoving(physicsObjects[i],true,30,0,physicsObjects[i].horizontalPlane-boatZone.y);
          }
          else{
            fireObjects.push(physicsObjects[i]);
            setMoving(physicsObjects[i],true,30,
            0,sheepZone.horizontalPlane + 10 - boatZone.y - Math.floor(fireObjects.length/nodInBoatWidth)*nodInBoatHeight);
            physicsObjects[i].zIndex = 69 - Math.random();
          }
      }
      else{
        physicsObjects[i].isInFlow = true;
        if(i!==0 && i!==1){
          if(!physicsObjects[i].isMoving && physicsObjects[physicsObjects[i].typePW].isInFlow){
            setMoving(physicsObjects[i],true,10,Math.floor(Math.random() * 101)-50,
              Math.floor(Math.random() * 21)-10 + 70);
            physicsObjects[i].zIndex = 70.0 + Math.floor(Math.random() * 2) - 1;
          }
          if(physicsObjects[i].isMoving) 
            movingMagic(physicsObjects[i],physicsObjects[physicsObjects[i].typePW]);
        }
        physicsObjects[i].rotationValue = 3;
        physicsObjects[i].x += flowZone.flowSpeed; 
      }
    }
    rotateMagic(physicsObjects[i]);
    scaleMagic(physicsObjects[i],-1.0);
  }
  if(randomMovingTimeCount < 0.0 ) randomMovingTimeCount = randomMovingTime ;
  
  message.update();
}
function gameLoop(){
  requestAnimationFrame(gameLoop);
  updateState();
  renderer.render(stage);
}
allSetup();