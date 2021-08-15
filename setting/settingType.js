var nowType = 'W'
var settingTypeButton = new Container();
var settingTypeZone = new Container();
var NbuttonZone = new Container();
var CbuttonZone = new Container();
var WbuttonZone = new Container();

settingTypeButton.setup = function(){
    this.position.set(10, 10);

    var bg = new PIXI.Graphics();
    bg.beginFill(0x000000, 0.5);
    bg.drawRoundedRect(0,0,240,66,20);
    this.addChild(bg);

    var text = new PIXI.Text("[設定服裝]", {font: "42px sans-serif", fill: "white"} );
    text.anchor.set(0.5);
    text.position.set(120, 33);
    this.addChild(text);

    this.isShow = false;
    settingTypeZone.visible = false;
    this.on('pointerdown', function(e) { 
        this.isShow = !this.isShow;
        settingTypeZone.visible = this.isShow;
     });
    setHitArea(this,0,0,240,65);
    stage.addChild(this);
};

settingTypeZone.setup = function(){

    this.position.set(settingTypeButton.x, settingTypeButton.y + settingTypeButton.hitArea.height+ 5);

    var bg = new PIXI.Graphics();
    bg.beginFill(0x000000, 0.3);
    bg.drawRoundedRect(0,0,300,180,15);
    this.addChild(bg);

    NbuttonZone.setup();
    NbuttonZone.position.set(5, 10);
    this.addChild(NbuttonZone);
    CbuttonZone.setup();
    CbuttonZone.position.set(5, 65);
    this.addChild(CbuttonZone);
    WbuttonZone.setup();
    WbuttonZone.position.set(5, 120);
    this.addChild(WbuttonZone);
    stage.addChild(this);
};

NbuttonZone.setup = function(){
    var NbuttonText = new PIXI.Text("❤️ Normal", {font: "42px sans-serif", fill: "white"} );
    NbuttonText.position.set(0, 0);
    this.addChild(NbuttonText);
    this.on('pointerdown', function(e) { clickButton('N'); });
    setHitArea(this,0,0,300,48);
};

CbuttonZone.setup = function(){
    var CbuttonText = new PIXI.Text("🍫 Valentine", {font: "42px sans-serif", fill: "white"} );
    CbuttonText.position.set(0, 0);
    this.addChild(CbuttonText);
    this.on('pointerdown', function(e) { clickButton('C'); });
    setHitArea(this,0,0,300,48);
};

WbuttonZone.setup = function(){
    var WbuttonText = new PIXI.Text("💍 Wedding", {font: "42px sans-serif", fill: "white"} );
    WbuttonText.position.set(0, 0);
    this.addChild(WbuttonText);
    this.on('pointerdown', function(e) { clickButton('W'); });
    setHitArea(this,0,0,300,48);
};

function clickButton(type) {
    nowType = type
    sheepZone.resetTextures(type);
    pinkZone.resetTextures(type);
    boatZone.resetTextures(type);
}