var nowType = config.settingTypes[0].type;
var settingTypeButton = new Container();
var settingTypeZone = new Container();

settingTypeButton.setup = function(){
    this.position.set(10, 10);

    let bg = new PIXI.Graphics();
    bg.beginFill(0x000000, 0.5);
    bg.drawRoundedRect(0,0,240,66,20);
    this.addChild(bg);

    let text = new PIXI.Text("[設定服裝]", {font: "42px sans-serif", fill: "white"} );
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

    let bg = new PIXI.Graphics();
    bg.beginFill(0x000000, 0.3);
    bg.drawRoundedRect(0,0,300,180,15);
    this.addChild(bg);

    for (var index in config.settingTypes) {
        
        let buttonZone = new Container();
        
        let title = config.settingTypes[index].title;
        let text = new PIXI.Text(title, {font: "42px sans-serif", fill: "white"} );
        text.position.set(0, 0);
        buttonZone.addChild(text);
        let type = config.settingTypes[index].type;
        buttonZone.on('pointerdown', function(e) { clickButton(type); });
        setHitArea(buttonZone,0,0,300,48);

        buttonZone.position.set(5, 10 + index * 55);
        this.addChild(buttonZone);
    }

    stage.addChild(this);
};

function clickButton(type) {
    nowType = type;
    sheepZone.resetTextures(type);
    pinkZone.resetTextures(type);
    boatZone.resetTextures(type);
}