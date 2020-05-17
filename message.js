var message, messageOutput;
var messageControl;
var nowDate = new Date();
var endTime = '2016-5-18 00:00:00';
endTime = endTime.replace(/\-/g, '/');
var goBoatDate = new Date(endTime);
var spantime, d, h, m, s;

message = new PIXI.Text(messageOutput, {font: "26px sans-serif", fill: "white"} );
messageControl = new PIXI.Text("點擊'前山'跑出咩凍菌 / 點擊'船帆頭'切換射擊模式 / 可拖移咩凍(咩凍菌會去救掉進水的咩凍)", {font: "26px sans-serif", fill: "white"} );

message.setup = function(){
  this.position.set(10, 10);
  stage.addChild(this);
};

messageControl.setup = function(){
  this.position.set(10, 50);
  stage.addChild(this);
};

message.update = function(){
  nowDate = new Date();
  spantime = (nowDate.getTime() - goBoatDate)/1000;
  d = Math.floor(spantime / (24 * 3600));
  h = Math.floor((spantime % (24*3600))/3600);
	m = Math.floor((spantime % 3600)/(60));
	s = Math.floor(spantime%60);
  var monthCount = 12 * ( nowDate.getFullYear() - goBoatDate.getFullYear() ) +
    nowDate.getMonth() - goBoatDate.getMonth() ;
  if(nowDate.getDate()<18) monthCount -= 1;
	message.text = "航行時間 : " +d+" 日 "+h+" 時 "+m+" 分 "+s+" 秒 (" + monthCount +"個月)";
  message.text += " / 收集愛之物(" + fireObjects.length + " 個)";
  message.text += " / 睡覺時間(" + sleepTimeStart + "~"+ sleepTimeEnd + ")";
  message.text += " / 太陽("+ sunStart + "~"+ sunEnd + ")";
  message.text += " / 月亮("+ moonStart + "~"+ moonEnd + ")";
};