var message, messageOutput;
var nowDate = new Date();
var goBoatDate = new Date("2016-5-18 00:00:00");
var spantime, d, h, m, s;

message = new PIXI.Text(messageOutput, {font: "28px sans-serif", fill: "white"} );

message.setup = function(){
  this.position.set(10, 10);
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
  message.text += " / 收集(" + fireObjects.length + " 個)";
  message.text += " / 睡覺(" + sleepTimeStart + "~"+ sleepTimeEnd + ")";
  message.text += " / 太陽("+ sunStart + "~"+ sunEnd + ")";
  message.text += " / 月亮("+ moonStart + "~"+ moonEnd + ")";
};