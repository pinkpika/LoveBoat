var settingTypeZone = new Container();
var NbuttonZone = new Container();
var CbuttonZone = new Container();
var WbuttonZone = new Container();

settingTypeZone.setup = function(){

    this.position.set(2000 - 300, 0);

    var sprite = new PIXI.Sprite(PIXI.Texture.WHITE);
    sprite.tint = 0xff0000; //Change with the color wanted
    sprite.width = 100;
    sprite.height = 100;
    this.addChild(sprite);

    NbuttonZone.setup();
    NbuttonZone.position.set(0, 0);
    this.addChild(NbuttonZone);
    CbuttonZone.setup();
    CbuttonZone.position.set(0, 50);
    this.addChild(CbuttonZone);
    WbuttonZone.setup();
    WbuttonZone.position.set(0, 100);
    this.addChild(WbuttonZone);
    stage.addChild(this);
};

NbuttonZone.setup = function(){
    var NbuttonText = new PIXI.Text("❤️ Normal", {font: "48px sans-serif", fill: "white"} );
    NbuttonText.position.set(0, 0);
    this.addChild(NbuttonText);
    this.on('pointerdown', function(e) { clickButton('N'); });
    setHitArea(this,0,0,300,48);
};

CbuttonZone.setup = function(){
    var CbuttonText = new PIXI.Text("🍫 Valentine", {font: "48px sans-serif", fill: "white"} );
    CbuttonText.position.set(0, 0);
    this.addChild(CbuttonText);
    this.on('pointerdown', function(e) { clickButton('C'); });
    setHitArea(this,0,0,300,48);
};

WbuttonZone.setup = function(){
    var WbuttonText = new PIXI.Text("💍 Wedding", {font: "48px sans-serif", fill: "white"} );
    WbuttonText.position.set(0, 0);
    this.addChild(WbuttonText);
    this.on('pointerdown', function(e) { clickButton('W'); });
    setHitArea(this,0,0,300,48);
};

function clickButton(type) {
    sheepZone.resetTextures(type);
    pinkZone.resetTextures(type);
}