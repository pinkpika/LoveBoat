var useMessageButton = new Container();
var useMessageZone = new Container();

useMessageButton.setup = function(){
    this.position.set(260, 10);

    var bg = new PIXI.Graphics();
    bg.beginFill(0x000000, 0.5);
    bg.drawRoundedRect(0,0,240,65,15);
    this.addChild(bg);

    var text = new PIXI.Text("[使用說明]", {font: "48px sans-serif", fill: "white"} );
    text.position.set(5, 5);
    this.addChild(text);

    this.isShow = false;
    useMessageZone.visible = false;
    this.on('pointerdown', function(e) { 
        this.isShow = !this.isShow;
        useMessageZone.visible = this.isShow;
     });
    setHitArea(this,0,0,240,65);
    stage.addChild(this);
};

useMessageZone.setup = function(){

    this.position.set(useMessageButton.x, useMessageButton.y + useMessageButton.hitArea.height);

    var bg = new PIXI.Graphics();
    bg.beginFill(0x000000, 0.3);
    bg.drawRoundedRect(0,0,550,190,15);
    this.addChild(bg);

    var text = new PIXI.Text("", {font: "26px sans-serif", fill: "white"} );
    text.text = "1. 點擊'前山'跑出咩凍菌\n"
    text.text += "2. 點擊'船帆頭'切換射擊模式\n"
    text.text += "3. 可拖移咩凍(咩凍菌會去救掉進水的咩凍)\n"
    text.text += "4. 果凍與咩咩的睡覺時間為 22:00 到 8:00\n"
    text.text += "5. 太陽出現時間為 6:00 到 20:00\n"
    text.text += "6. 月亮出現時間為 18:00 到 8:00\n"
    text.position.set(5, 5);
    this.addChild(text);

    stage.addChild(this);
};