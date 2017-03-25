var isDebugHitArea = false, hitAreaRecs = [];

function debugSetupHitArea(){
	for(var i = 0;i< hitAreaRecs.length;i++){
    hitAreaRecs[i].hitAreaRec = new PIXI.Graphics();
    hitAreaRecs[i].hitAreaRec.beginFill(0xFFFFFF, 0.5);
    hitAreaRecs[i].hitAreaRec.lineStyle(1, 0x000000, 0.5);
    hitAreaRecs[i].hitAreaRec.drawRect(hitAreaRecs[i].hitArea.x, hitAreaRecs[i].hitArea.y, 
      hitAreaRecs[i].hitArea.width, hitAreaRecs[i].hitArea.height);
    hitAreaRecs[i].addChild(hitAreaRecs[i].hitAreaRec);
  }
};

function debugPrintObjectLength(){
  console.log("stage.children "+stage.children.length);
  console.log("physicsObjects "+physicsObjects.length);
  console.log("hitAreaRecs "+hitAreaRecs.length);
  console.log("fireObjects "+fireObjects.length);
  console.log("firedObjects "+firedObjects.length);
  console.log("---------------------------------");
}