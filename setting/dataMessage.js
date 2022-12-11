var dataMessageZone = new Container();
var dataMessage;
var h, m, s; // 目前的小時/分鐘/秒數

dataMessageZone.setup = function(){

  this.position.set(520,23);

  dataMessage = new PIXI.Text("", {font: "26px sans-serif", fill: "white"} );
  dataMessage.position.set(5, 5);
  this.addChild(dataMessage);

  stage.addChild(this);
};

dataMessageZone.update = function(){

  let goBoatDateString = config.goBoatDate;
  goBoatDateString = goBoatDateString.replace(/\-/g, '/');
  let goBoatDate = new Date(goBoatDateString);

  let nowDate = new Date();
  let spantime = (nowDate.getTime() - goBoatDate)/1000;
  let d = Math.floor(spantime / (24 * 3600));
  h = Math.floor((spantime % (24*3600))/3600);
	m = Math.floor((spantime % 3600)/(60));
	s = Math.floor(spantime%60);
  let monthCount = 12 * ( nowDate.getFullYear() - goBoatDate.getFullYear() ) +
    nowDate.getMonth() - goBoatDate.getMonth() ;
  if(nowDate.getDate()<18) monthCount -= 1;
  dataMessage.text = "航行時間 : " +d+" 日 "+h+" 時 "+m+" 分 "+s+" 秒";
  dataMessage.text += " (=" + monthCount + "個月)";
  dataMessage.text += " (=" + Math.floor(monthCount / 12) + "年" + monthCount % 12 + "個月)";
  dataMessage.text += " / 收集愛之物(" + fireObjects.length + " 個)";
};