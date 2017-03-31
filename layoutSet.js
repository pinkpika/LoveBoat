var Container = PIXI.Container,
    autoDetectRenderer = PIXI.autoDetectRenderer,
    loader = PIXI.loader,
    resources = PIXI.loader.resources,
    TextureCache = PIXI.utils.TextureCache,
    Sprite = PIXI.Sprite,
    Texture = PIXI.Texture,
    Interaction = PIXI.interaction;

var zoneProportion = 2000 / 800;
var renderer = autoDetectRenderer(2000, 800);
document.body.appendChild(renderer.view);
var stage = new Container();
renderer.backgroundColor = 0xF2BDD0;
renderer.render(stage);

$( window ).ready(function() {
  renderer.view.style.width = '100%';
  renderer.view.style.height = $( window ).width() / zoneProportion +"px";
  renderer.view.style.position = 'absolute';
  renderer.view.style.left = '0%';
  renderer.view.style.top = '5%';
});
$( window ).resize(function() {
  renderer.view.style.width = '100%';
  renderer.view.style.height = $( window ).width() / zoneProportion +"px";
  renderer.view.style.position = 'absolute';
  renderer.view.style.left = '0%';
  renderer.view.style.top = '5%';
});
