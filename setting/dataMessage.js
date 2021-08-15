var dataMessageZone = new Container();
var dataMessage;
var nowDate = new Date();
var endTime = '2016-5-18 00:00:00'; // 愛之船出航日
endTime = endTime.replace(/\-/g, '/');
var goBoatDate = new Date(endTime);
var spantime, d, h, m, s;

dataMessageZone.setup = function(){

  this.position.set(520,23);

  dataMessage = new PIXI.Text("", {font: "26px sans-serif", fill: "white"} );
  dataMessage.position.set(5, 5);
  this.addChild(dataMessage);

  stage.addChild(this);
};

dataMessageZone.update = function(){
  nowDate = new Date();
  spantime = (nowDate.getTime() - goBoatDate)/1000;
  d = Math.floor(spantime / (24 * 3600));
  h = Math.floor((spantime % (24*3600))/3600);
	m = Math.floor((spantime % 3600)/(60));
	s = Math.floor(spantime%60);
  var monthCount = 12 * ( nowDate.getFullYear() - goBoatDate.getFullYear() ) +
    nowDate.getMonth() - goBoatDate.getMonth() ;
  if(nowDate.getDate()<18) monthCount -= 1;
	dataMessage.text = "航行時間 : " +d+" 日 "+h+" 時 "+m+" 分 "+s+" 秒 (" + monthCount +"個月)";
  dataMessage.text += " / 收集愛之物(" + fireObjects.length + " 個)";
};