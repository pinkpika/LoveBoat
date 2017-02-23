var zoneProportion = 2000 / 800;
$( window ).ready(function() {
  $( "#zone" ).height( $( "#zone" ).width() / zoneProportion );
  $( ".mountain" ).width( $( "#zone" ).width() * 4 );
  $( ".mountain" ).height( $( "#zone" ).height() );
  $( ".flow" ).width( $( "#zone" ).width() * 4 );
  $( ".flow" ).height( $( "#zone" ).height() );
  $( ".land" ).width( $( "#zone" ).width() * 4 );
  $( ".land" ).height( $( "#zone" ).height() );
});
$( window ).resize(function() {
  $( "#zone" ).height( $( "#zone" ).width() / zoneProportion );
  $( ".mountain" ).width( $( "#zone" ).width() * 4  );
  $( ".mountain" ).height( $( "#zone" ).height() );
  $( ".flow" ).width( $( "#zone" ).width() * 4 );
  $( ".flow" ).height( $( "#zone" ).height() );
  $( ".land" ).width( $( "#zone" ).width() * 4 );
  $( ".land" ).height( $( "#zone" ).height() );
});

function setTransform (element, rotationArg, scaleArg, skewXArg, skewYArg) {
    var transfromString = ("rotate(" + rotationArg + "deg ) scale(" + scaleArg + ") skewX(" + skewXArg + "deg ) skewY(" + skewYArg + "deg )");
    element.style.transform = transfromString;
}

//-------------------------------------------------------------
var idWaterColumnUp,idWaterColumnDown;
var up = 1.0;
function waterColumnUpGo(){
  idWaterColumnUp = setTimeout(waterColumnUp, 15);
  //idWaterColumnUp = setInterval(waterColumnUp, 15);
}
function waterColumnUp() {
  if (up>5.0) {
    clearTimeout(idWaterColumnUp);
    //clearInterval(idWaterColumnUp);
  } else {
    up += 1.0; 
    setTransform($(".waterColumn")[0] , 0 , '1,'+up , 0 , 0 );
    setTimeout(waterColumnUp, 15);
  }
}
idWaterColumnDown = setInterval(waterColumnDown, 15);
function waterColumnDown() {
  if(up>1.0){
    up -= 0.1; 
    setTransform($(".waterColumn")[0] , 0 , '1,'+up , 0 , 0 );
  }
}

//-------------------------------------------------------------
var idBoatGo,idBoatBack,idPaddleGo;
var boatLeft = parseFloat($(".boatZone")[0].style.left);

var sheepLeft = parseFloat($(".sheepZone")[0].style.left);
var sheepTop = parseFloat($(".sheepZone")[0].style.top);
var pinkLeft = parseFloat($(".pinkZone")[0].style.left);
var pinkTop = parseFloat($(".pinkZone")[0].style.top);

var a = 0, roPaddle = 0;
function boatGoGo(){
  idBoatGo = setTimeout(boatGo, 15);
  idPaddleGo = setTimeout(paddleGo, 15);
}
function boatGo(){
  a += 0.1 ;
  if(a > 1.0){
    a = 0.0;
  } 
  else{
    setTimeout(boatGo, 15);
  }
}
function paddleGo(){
  roPaddle -= 20 ;
  setTransform($(".boatPaddle")[0],roPaddle,1,0,0);
  //setTransform($(".pink")[0],roPaddle,1,0,0);
  //setTransform($(".sheep")[0],roPaddle,1,0,0);
  if(roPaddle < -360){
    roPaddle = 0.0;
    setTransform($(".boatPaddle")[0],roPaddle,1,0,0);
    //setTransform($(".pink")[0],roPaddle,1,0,0);
    //setTransform($(".sheep")[0],roPaddle,1,0,0);
  } 
  else{
    setTimeout(paddleGo, 15);
  }
}
var isSheepDrag = false, isPinkDrag = false;
var isSheepFall = false, isPinkFall = false;
idBoatBack = setInterval(boatBack, 15);
function boatBack() {
  if(boatLeft<65.0){
    boatLeft += 0.05;
    if(!isSheepDrag){ sheepLeft += 0.05; }
    if(!isPinkDrag){ pinkLeft += 0.05; }
  }
  boatLeft -= a;
  if(!isSheepFall){ sheepLeft -= a; }
  if(!isPinkFall){ pinkLeft -= a; }
  $(".boatZone")[0].style.left = boatLeft + '%';
  if(!isSheepDrag){
    if(sheepTop<54.0){ sheepTop += 0.5; }
    else { isSheepFall = false; }
    $(".sheepZone")[0].style.left = sheepLeft + '%';
    $(".sheepZone")[0].style.top = sheepTop + '%'; 
  }
  if(!isPinkDrag){ 
    if(pinkTop<54.0){ pinkTop += 0.5; }
    else { isPinkFall = false; }
    $(".pinkZone")[0].style.left = pinkLeft + '%';
    $(".pinkZone")[0].style.top = pinkTop + '%'; 
  }
} 

//-------------------------------------------------------------
/*
var idCreateHeart = setInterval(createHeart, 500);
function createHeart() {
  var index = Math.floor(Math.random() * 4);
  $( "<div class='heart"+ index +"' style='left:-30%; top:10%;'></div>" )
  .appendTo( "#zone" )
  .animate({"left" : "100%"},
           {
                duration : 5000,
                "complete" : function() {
                      $(this).remove();
                }
            });
}
*/
var x, y;
$( document ).on( "mousemove", function( event ) {
    x = event.pageX;
    y = event.pageY;
  });

function nodGo(){
  for(var i=0;i<3;i++){
  var startLeft = x;
  startLeft = startLeft / $( "#zone" ).width() * 100;
  var moveLeft = Math.floor(Math.random() * 60)-30;
  var midLeft = startLeft + moveLeft ,midTop = Math.floor(Math.random() * 50)+10;
  var endLeft = midLeft + moveLeft;
  var moveSize = Math.floor(Math.random() * 6)-3;
  var midSize = 6 + moveSize ,endSize = midSize + moveSize; 
  $( "<div class='nod' style='left:"+startLeft+"%; top:100%;'></div>" )
  .appendTo( "#zone" )
  .animate({"left" : midLeft+"%",
            "top" : midTop+"%",
            "width" : midSize+"%"},
           { duration : 2000,
            })
  .animate({"left" : endLeft+"%",
            "top" : "100%",
            "width" : endSize+"%"},
           {
                duration : 500,
                "complete" : function() {
                      $(this).remove();
                }
            });
  }
}

//-------------------------------------------------------------
var tempX , tempY;
$( function() {
  $( ".sheepZone" ).draggable();
  $( ".pinkZone" ).draggable();
});
$(".sheepZone").on( "mousedown", function( event ) {
    tempX = x ;
    tempY = y ;
    isSheepDrag = true;
});
$(".sheepZone").on( "mouseup", function( event ) {
  sheepTop = sheepTop + (y - tempY) / parseFloat($( "#zone" ).height()) * 100.0 ;
  sheepLeft = sheepLeft + (x - tempX) / $( "#zone" ).width() * 100;
  isSheepDrag = false;
  isSheepFall = true;
});
$(".pinkZone").on( "mousedown", function( event ) {
    tempX = x ;
    tempY = y ;
    isPinkDrag = true;
});
$(".pinkZone").on( "mouseup", function( event ) {
  pinkTop = pinkTop + (y - tempY) / parseFloat($( "#zone" ).height()) * 100.0;
  pinkLeft = pinkLeft + (x - tempX) / $( "#zone" ).width() * 100;
  isPinkDrag = false;
  isPinkFall = true;
});

//-------------------------------------------------------------
var moringTime = 0.0;
var nightTime = 60.0;
var loopTime = nightTime - moringTime;
function clock(){
  var i = new Date("1970-1-1 00:00:00");
  var startDate = new Date();
  var fix = startDate.getTimezoneOffset();
  i.setTime(startDate.getTime() + ((fix+8*60) * 60 * 1000));
  //console.log(i.getFullYear());
  //console.log(i.getMonth()+1);
  //console.log(i.getDate());
  //console.log(i.getDate());
  //console.log(i.getHours());
  //console.log(i.getMinutes());
  //console.log(i.getSeconds());
  var tempTime = i.getMinutes() * 60.0  + i.getSeconds() , nightSkyOp , morningSkyOp; 
  if(Math.floor(tempTime/60)%2==0){
    nightSkyOp = (tempTime - moringTime)%60 / loopTime;
    morningSkyOp = 1.0 - nightSkyOp;
  }
  else{
    morningSkyOp = (tempTime - moringTime)%60 / loopTime;
    nightSkyOp = 1.0 - morningSkyOp;
  }
  $(".morningSky")[0].style.opacity =  morningSkyOp;
  $(".nightSky")[0].style.opacity =  nightSkyOp;
  $(".allLight")[0].style.opacity =  nightSkyOp*0.3;
  setTimeout(clock, 1000);
}
clock();