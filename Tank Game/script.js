// assigning the game state variables

let game, menu, cpugame, pvpgame, firstpass;

// localStorage.clear();

if (typeof localStorage.getItem("menu") === "string" || localStorage.getItem("menu") instanceof String){
  console.log("string")
}
else{
  console.log("not string")
}

// assigning the states of the variables
console.log(localStorage.getItem("menu"));

if(localStorage.getItem("menu")){
  menu = localStorage.getItem("menu");
  menu = JSON.parse(menu);
}
if(localStorage.getItem("game")){
  game = localStorage.getItem("game");
  game = JSON.parse(game);
}
if(localStorage.getItem("cpugame")){
  cpugame = localStorage.getItem("cpugame")
  cpugame = JSON.parse(cpugame);
}
if(localStorage.getItem("pvpgame")){
  pvpgame = localStorage.getItem("pvpgame");
  pvpgame = JSON.parse(pvpgame);
}
if(localStorage.getItem("firstpass")){
  firstpass = false;
}
else{
  menu = true;
  game = false;
  cpugame = false;
  pvpgame = false;
  firstpass = false;
}

// variables for the menu

let playButton;

// variables for the game

let cpubutton, pvpbutton, backbutton, gtextbox;

// variables for the cpugame
// pathfinding

let matrix;
let path, grid, node;
let counter;
let clearLineOfSight;
counter = 0;
let firsttrackpass = false;

// global game variables
// base is the speed of the tank when pressing movement keys
let base = 3;
let tileMap, block, player, enemy, playerturret, pturretfinder, enemyturret, bullet, muzzle;
let phealth, ehealth;
let pwins, ewins, pvppwins, pvpewins;
let ebullet, emuzzle, eturretfinder;
let set1, enemyshoot;
let firstexitpass = false;

if(localStorage.getItem("pvppwins")){
  pvppwins = localStorage.getItem("pvppwins");
  pvppwins = JSON.parse(pvppwins);
}
if(localStorage.getItem("pvpewins")){
  pvpewins = localStorage.getItem("pvpewins");
  pvpewins = JSON.parse(pvpewins);
}
if(localStorage.getItem("pwins")){
  pwins = localStorage.getItem("pwins");
  pwins = JSON.parse(pwins);
}
if(localStorage.getItem("ewins")){
  ewins = localStorage.getItem("ewins");
  ewins = JSON.parse(ewins);
}
else{
  game = false;
  pvppwins = false;
  pvpewins = false;
  pwins = false;
  ewins = false;
}
enemyshoot = true;

// add a two player mode or against ai mode
// ai mode needs to have random error e.g. random 1-2 if 1 then accurate or less
// make tank explode when destroyed
// gluejoint and joints in general MUST be removed
 
function setup(){
  createCanvas(windowWidth, windowHeight);


}

function draw(){
  background("black");
  
  if(menu){
    if(!firstpass){
      menusetup();
    }
    if(firstpass){
      menudraw();
    }
  }
  if(game){
    if(!firstpass){
      gamesetup();
    }
    if(firstpass){
      gamedraw();
    }
  }
  if(cpugame){
    if(!firstpass){
      cpusetup();
    }
    if(firstpass){
      cpudraw();
    }
  }
  if(pvpgame){
    if(!firstpass){
      pvpsetup();
    }
    if(firstpass){
      pvpdraw();
    }
  }
}

function menusetup(){
  playButton = new Sprite(windowWidth/2, windowHeight/2, windowWidth/2, windowHeight/8, "s");
  playButton.text = "PLAY";
  playButton.textSize = 40;
  playButton.color = "#800020"

  firstpass = true;

}

function menudraw(){
  if(playButton){
    if(playButton.mouse.hovering()){
      mouse.cursor = "pointer";
      playButton.color = "white";
    }
    if(!playButton.mouse.hovering()){
      mouse.cursor = "default";
      playButton.color = "#800020"
    }
    if(playButton.mouse.pressed()){
      //resetting the page
      playButton.remove()

      firstpass = false;
      menu = false;
      game = true;
    }
  }
}

function gamesetup(){
  // this should not be used for the actual game, this should only be used for selecting the variant of game.

  cpubutton = new Sprite(windowWidth/2, windowHeight/2 - (windowHeight/8*2), windowWidth/2, windowHeight/8, "s");
  cpubutton.color = "#800020";
  cpubutton.text = "CPU";
  cpubutton.textSize = 40;

  pvpbutton = new Sprite(windowWidth/2, windowHeight/2, windowWidth/2, windowHeight/8, "s")
  pvpbutton.color = "#800020";
  pvpbutton.text = "Two Player";
  pvpbutton.textSize = 40;

  backbutton = new Sprite(windowWidth/2, windowHeight/2 + (windowHeight/8*2), windowWidth/2, windowHeight/8, "s")
  backbutton.color = "#800020";
  backbutton.text = "Back";
  backbutton.textSize = 40;

  gtextbox = new Sprite(windowWidth/2, cpubutton.y - (windowHeight/8), windowWidth/2, windowHeight/8, "s");
  gtextbox.color = "black";
  gtextbox.textSize = 40;
  gtextbox.textColor = "#800020";
  
  if(ewins){
    gtextbox.text = "Enemy wins";
  }
  if(pwins){
    gtextbox.text = "Player wins";
  }
  if(pvpewins){
    gtextbox.text = "Player 2 wins";
  }
  if(pvppwins){
    gtextbox.text = "Player 1 Wins";
  }
  if((!ewins) && !(pwins) && !(pvpewins) && !(pvppwins)){
    gtextbox.text = "Play!!";
  }

  firstpass = true;

}

function gamedraw(){
  // this should not be used for the actual game, this should only be used for selecting the variant of game.
  if(cpubutton){
    if(cpubutton.mouse.hovering()){
      mouse.cursor = "pointer";
      cpubutton.color = "white";
    }
    if(pvpbutton.mouse.hovering()){
      mouse.cursor = "pointer";
      pvpbutton.color = "white";
    }
    if(backbutton.mouse.hovering()){
      mouse.cursor = "pointer";
      backbutton.color = "white";
    }
    if(!cpubutton.mouse.hovering() && 
      !pvpbutton.mouse.hovering() &&
      !backbutton.mouse.hovering()
    ){
      mouse.cursor = "default";
      cpubutton.color = "#800020";
      pvpbutton.color = "#800020";
      backbutton.color = "#800020";
    }
    if(cpubutton.mouse.pressed()){
      //resetting the page
      cpubutton.remove();
      pvpbutton.remove();
      backbutton.remove();
      backbutton.remove();
      gtextbox.remove();

      mouse.cursor = "default";
      firstpass = false;
      game = false;
      cpugame = true;
    }
    if(pvpbutton.mouse.pressed()){
      //resetting the page
      cpubutton.remove();
      pvpbutton.remove();
      backbutton.remove();
      gtextbox.remove();

      mouse.cursor = "default";
      firstpass = false;
      game = false;
      pvpgame = true;
    }
    if(backbutton.mouse.pressed()){
      //resetting the page
      cpubutton.remove();
      pvpbutton.remove();
      backbutton.remove();
      gtextbox.remove();

      mouse.cursor = "default";
      firstpass = false;
      game = false;
      menu = true;
    }
  }
}

function cpusetup(){

  block = new Group();
  block.tile = "b";
  block.collider = "s";

  bullet = new Group();
  bullet.speed = 5;
  bullet.radius = 5;
  bullet.life = 120;
  bullet.collider = "d";
  bullet.color = "white";
 
  //player
  player = new Sprite();
  player.tile = "p";
  player.collider = "d";
  player.width = 40;
  player.height = 50;
  player.rotationLock = true;
  player.color = "grey";

  pturretfinder = new Sprite(player.x, player.y, 2,2, "n");
  pturretfinder.color = "grey";
  pturretfinder.rotationLock = true;

  playerturret = new Sprite(player.x, player.y, 5, 60, "n");
  playerturret.color = "grey";
  playerturret.rotationLock = true;

  muzzle = new Sprite(playerturret.x, playerturret.y - playerturret.h/2,10,10,"d");
  muzzle.overlaps(playerturret);
  muzzle.overlaps(player);
  muzzle.rotationLock = true;
  muzzle.color = "gray";
  muzzle.overlaps(bullet);

  enemy = new Sprite();
  enemy.width = 40;
  enemy.height = 50;
  enemy.tile = "e";
  enemy.collider = "d";
  enemy.rotationLock = true;
  enemy.color = "red";

  enemyturret = new Sprite(enemy.x, enemy.y, 5, 60, "n");
  enemyturret.color = "red";
  enemyturret.rotationLock = true;

  ebullet = new Group();
  ebullet.speed = 5;
  ebullet.radius = 5;
  ebullet.life = 120;
  ebullet.collider = "d";
  ebullet.color = "yellow";

  emuzzle = new Sprite(enemyturret.x, enemyturret.y - enemyturret.h/2,10,10,"d");
  emuzzle.color = "red";
  emuzzle.overlaps(enemyturret);
  emuzzle.overlaps(enemy);
  emuzzle.rotationLock = true;
  emuzzle.overlaps(ebullet);

  eturretfinder = new Sprite(enemy.x, enemy.y, 2,2, "n");
  eturretfinder.color = "red";
  eturretfinder.rotationLock = true;

  enemy.overlaps(block);

  set1 = setInterval(() => {
    enemyshoot = true;
  }, 500)

  phealth = 100;
  ehealth = 100;

  matrix =     [
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,1],
    [1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1],
    [1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1],
    [1,0,0,0,0,1,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,1,0,0,0,0,1],
    [1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,1,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,1,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,1,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,1,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1],
    [1,0,0,0,0,1,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,1,0,0,0,0,1],
    [1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1],
    [1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1],
    [1,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  ];

  var grid = new PF.Grid(matrix);
  var finder = new PF.BiBreadthFirstFinder();
  path = finder.findPath(parseInt(enemy.pos.x / 50),parseInt(enemy.pos.y / 50), parseInt(player.pos.x / 50), parseInt(player.pos.y / 50), grid);
  node = new Group();
  node.visited = false;
  node.visible = true;
  node.radius = 5;
  node.collider = 'n';
  console.log(path)
  for(p of path){
     let n = new node.Sprite((p[0]*50),(p[1]*50))
      n.visible = false;
      enemy.moveTo(n,5);
  }
 
  set2 = setInterval(() => {
    regeneratemapping();
  }, 100)

  if(tileMap){
    console.log("hello")
    tileMap.remove();
  }
  tileMap = new Tiles(
    [
      "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
      "b.................................b",
      "b.................................b",
      "b.................................b",
      "b....bbbbbb.............bbbbbb....b",
      "b....b.......................b....b",
      "b....b.......................b....b",
      "b....b.....bbbbbbbbbbbbb.....b....b",
      "b....b.......................b....b",
      "b.......b.................b.......b",
      "b.......b.......bbb.......b.......b",
      "b.......b.................b.......b",
      "b..p....b....b.......b....b....e..b",
      "b.......b....b.......b....b.......b",
      "b.......b.................b.......b",
      "b.......b.......bbb.......b.......b",
      "b....b..b.................b.......b",
      "b....b.......................b....b",
      "b....b.....bbbbbbbbbbbbb.....b....b",
      "b....b.......................b....b",
      "b....b.......................b....b",
      "b....bbbbbb.............bbbbbb....b",
      "b.................................b",
      "b.................................b",
      "b.................................b",
      "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
    ],
    0,
    0,
    50,
    50
  );

  firstpass = true;
}

function cpudraw(){
  if(camera){
    camera.x = player.x;
    camera.y = player.y;
  }

  movement();
  playerturretcontroller();
  bulletshots();
  bulletinteractions();
  backgroundinteractions();
  enemyturretcontroller();
  enemybulletshots();
  enemytracking();

}

// functions for the game

function movement(){
  if(kb.pressing("left")){
    player.x -= base;
    player.rotation = 270;
  }
  if(kb.pressing("right")){
    player.x += base;
    player.rotation = 90;
  }
  if(kb.pressing("up")){
    player.y -= base;
    player.rotation = 0;
  }
  if(kb.pressing("down")){
    player.y += base;
    player.rotation = 180;
  }
  if(kb.pressing("up") && kb.pressing("right")){
    player.rotation = 45;
  }
  if(kb.pressing("up") && kb.pressing("left")){
  player.rotation = 315;
  }
  if(kb.pressing("down") && kb.pressing("right")){
    player.rotation = 135;
  }
  if(kb.pressing("down") && kb.pressing("left")){
    player.rotation = 45;
  }

  player.vel.y = 0;
  player.vel.x = 0;
}

function playerturretcontroller(){
  pturretfinder.x = player.x;
  pturretfinder.y = player.y;

  playerturret.x = player.x;
  playerturret.y = player.y;
  playerturret.offset.y = 30;


  pturretfinder.rotateMinTo(mouse, 5, 270);
  playerturret.rotation = pturretfinder.rotation; 
}

function bulletshots(){
  muzzle.x = player.x;
  muzzle.y = player.y;
  if(mouse.pressed()){
    let x = new bullet.Sprite(muzzle.x, muzzle.y);
    x.diameter = 10;
    x.direction = playerturret.rotation + 810;
    x.speed = 5;

    x.overlaps(player);
    x.overlaps(playerturret);
    x.overlaps(pturretfinder);
    x.overlaps(muzzle)
  }
}

function bulletinteractions(){
  for(b of bullet){
    if(b.colliding(enemy)){
      b.remove();
      ehealth -= 20;
    }
    for(o of block){
      if(b.colliding(o)){
        b.remove();
        o.remove();
      }
      if(ehealth == 0 || phealth == 0){
        break;
      }
    }
    for(e of ebullet){
      if(b.colliding(e)){
        let m = new Sprite(b.x, b.y);
        m.collider = "n";
        m.image = "images/explosion.png";
        b.remove();
        e.remove();
        setTimeout(() => {
          m.remove();
        },1250)
      }
    }
  }

  for(e of ebullet){
    if(e.colliding(player)){
      e.remove();
      phealth -= 20;
    }
    for(o of block){
      if(e.colliding(o)){
        e.remove();
        o.remove();
      }
      if(ehealth == 0 || phealth == 0){
        break;
      }
    }
  }
}

function enemyturretcontroller(){
  eturretfinder.x = enemy.x;
  eturretfinder.y = enemy.y;

  enemyturret.x = enemy.x;
  enemyturret.y = enemy.y;
  enemyturret.offset.y = 30;


  eturretfinder.rotateMinTo(player, 5, 270);
  enemyturret.rotation = eturretfinder.rotation;
}

function checkLineOfSight(player, enemy, blocks) {
  let playerPos = createVector(player.x, player.y);
  let enemyPos = createVector(enemy.x, enemy.y);

  // Iterate over each block in the group
  for (let i = 0; i < blocks.length; i++) {
      let block = blocks[i];
      let blockPos = createVector(block.x, block.y);
      let blockSize = createVector(block.width, block.height);

      // Check if the line intersects the block's boundaries
      if (lineIntersectsRect(playerPos.x, playerPos.y, enemyPos.x, enemyPos.y, blockPos.x, blockPos.y, blockSize.x, blockSize.y)) {
          return false; // There is a block between the player and the tank
      }
  }
  return true; // No blocks in the way
}

// Function to check if a line intersects a rectangle
function lineIntersectsRect(x1, y1, x2, y2, rx, ry, rw, rh) {
  let left = lineIntersectsLine(x1, y1, x2, y2, rx, ry, rx, ry + rh);
  let right = lineIntersectsLine(x1, y1, x2, y2, rx + rw, ry, rx + rw, ry + rh);
  let top = lineIntersectsLine(x1, y1, x2, y2, rx, ry, rx + rw, ry);
  let bottom = lineIntersectsLine(x1, y1, x2, y2, rx, ry + rh, rx + rw, ry + rh);

  return left || right || top || bottom;
}

// Function to check if two lines intersect
function lineIntersectsLine(x1, y1, x2, y2, x3, y3, x4, y4) {
  let den = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
  if (den == 0) {
      return false;
  }
  let t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / den;
  let u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / den;
  if (t >= 0 && t <= 1 && u >= 0 && u <= 1) {
      return true;
  }
  return false;
}


function enemybulletshots(){
  emuzzle.x = enemy.x;
  emuzzle.y = enemy.y;



  let distance = dist(player.x, player.y, enemy.x, enemy.y);
    
  clearLineOfSight = checkLineOfSight(player, enemy, block);

  // If distance is within 50 pixels, trigger shooting event
  if (distance <= 500 && clearLineOfSight) {
      // Trigger shooting event for enemy tank
      if (enemyshoot) {
          let x = new ebullet.Sprite(emuzzle.x, emuzzle.y);
          x.diameter = 10;
          x.direction = enemyturret.rotation + 810;
          x.speed = 5;
          x.overlaps(enemy);
          x.overlaps(enemyturret);
          x.overlaps(eturretfinder);
          x.overlaps(emuzzle);
          enemyshoot = false;
      }
    }
}

function enemytracking(){
  if(!firsttrackpass){
  enemy.moveTo(node[counter]);
  counter += 1;
  firsttrackpass = true;
  }

  if(!clearLineOfSight){
    if(node[counter]){
      enemy.moveTo(node[counter],2)
      if(enemy.overlaps(node[counter])){
        counter += 1;
      }
    }
  }
}

function regeneratemapping(){
  node.remove();

  matrix =     [
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,1],
    [1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1],
    [1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1],
    [1,0,0,0,0,1,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,1,0,0,0,0,1],
    [1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,1,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,1,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,1,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,1,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1],
    [1,0,0,0,0,1,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,1,0,0,0,0,1],
    [1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1],
    [1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1],
    [1,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  ]

  var grid = new PF.Grid(matrix);
  var finder = new PF.BiBreadthFirstFinder();
  path = finder.findPath(Math.trunc(enemy.pos.x / 50),Math.trunc(enemy.pos.y / 50), Math.trunc(player.pos.x / 50), Math.trunc(player.pos.y / 50), grid);
  node = new Group()
  node.visited = false;
  node.radius = 5;
  node.collider = 'n'
  for(p of path){
     let n = new node.Sprite((p[0]*50),(p[1]*50))
      n.visible = false;
  }
}

function backgroundinteractions(){
  if(ehealth == 0){
    if(!firstexitpass){
      pwins = true;
      ewins = false;
      pvppwins = false;
      pvpewins = false;
  
      block.removeAll();
      player.remove();
      playerturret.remove();
      pturretfinder.remove();
      muzzle.remove();
      enemy.remove();
      tileMap.removeAll();
      clearInterval(set1);
      clearInterval(set2);
      node.removeAll();
      enemyturret.remove();
      ebullet.removeAll();
      bullet.removeAll();
      eturretfinder.remove();
      emuzzle.remove();
      counter = 0;
  
      firsttrackpass = true;
      firstpass = false;
      camera.x = windowWidth/2;
      camera.y = windowHeight/2;
      camera.zoom = 1;
      cpugame = false;
      game = true;

      ehealth = 100;
      phealth = 100;

      resetprep();
      firstexitpass = true;
    }
  }

  if(phealth == 0){
    if(!firstexitpass){
      pwins = false;
      ewins = true;
      pvppwins = false;
      pvpewins = false;
  
      block.removeAll();
      player.remove();
      playerturret.remove();
      pturretfinder.remove();
      muzzle.remove();
      enemy.remove();
      tileMap.removeAll();
      clearInterval(set1);
      clearInterval(set2);
      node.removeAll();
      enemyturret.remove();
      ebullet.removeAll();
      bullet.removeAll();
      eturretfinder.remove();
      emuzzle.remove();
      counter = 0;
  
      firsttrackpass = true;
      firstpass = false;
      camera.x = windowWidth/2;
      camera.y = windowHeight/2;
      camera.zoom = 1;
      cpugame = false;
      game = true;

      ehealth = 100;
      phealth = 100;

      resetprep();
      firstexitpass = true;
    }
  }
  if(ehealth != 0 || phealth != 0){
    firstexitpass = false;
  }
}

function pvpsetup(){

  block = new Group();
  block.tile = "b";
  block.collider = "s";

  bullet = new Group();
  bullet.speed = 5;
  bullet.radius = 5;
  bullet.life = 120;
  bullet.collider = "d";
  bullet.color = "white";
 
  //player
  player = new Sprite();
  player.tile = "p";
  player.collider = "d";
  player.width = 40;
  player.height = 50;
  player.rotationLock = true;
  player.color = "grey";

  pturretfinder = new Sprite(player.x, player.y, 2,2, "n");
  pturretfinder.color = "grey";
  pturretfinder.rotationLock = true;

  playerturret = new Sprite(player.x, player.y, 5, 60, "n");
  playerturret.color = "grey";
  playerturret.rotationLock = true;

  muzzle = new Sprite(playerturret.x, playerturret.y - playerturret.h/2,10,10,"d");
  muzzle.overlaps(playerturret);
  muzzle.overlaps(player);
  muzzle.rotationLock = true;
  muzzle.color = "gray";
  muzzle.overlaps(bullet);

  enemy = new Sprite();
  enemy.width = 40;
  enemy.height = 50;
  enemy.tile = "e";
  enemy.collider = "d";
  enemy.rotationLock = true;
  enemy.color = "red";

  enemyturret = new Sprite(enemy.x, enemy.y, 5, 60, "n");
  enemyturret.color = "red";
  enemyturret.rotationLock = true;

  ebullet = new Group();
  ebullet.speed = 5;
  ebullet.radius = 5;
  ebullet.life = 120;
  ebullet.collider = "d";
  ebullet.color = "yellow";

  emuzzle = new Sprite(enemyturret.x, enemyturret.y - enemyturret.h/2,10,10,"d");
  emuzzle.color = "red";
  emuzzle.overlaps(enemyturret);
  emuzzle.overlaps(enemy);
  emuzzle.rotationLock = true;
  emuzzle.overlaps(ebullet);

  eturretfinder = new Sprite(enemy.x, enemy.y, 2,2, "n");
  eturretfinder.color = "red";
  eturretfinder.rotationLock = true;

  phealth = 100;
  ehealth = 100;

  tileMap = new Tiles(
    [
      "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
      "b.................................b",
      "b.................................b",
      "b.................................b",
      "b....bbbbbb.............bbbbbb....b",
      "b....b.......................b....b",
      "b....b.......................b....b",
      "b....b.....bbbbbbbbbbbbb.....b....b",
      "b....b.......................b....b",
      "b.......b.................b.......b",
      "b.......b.......bbb.......b.......b",
      "b.......b.................b.......b",
      "b..p....b....b.......b....b....e..b",
      "b.......b....b.......b....b.......b",
      "b.......b.................b.......b",
      "b.......b.......bbb.......b.......b",
      "b....b..b.................b.......b",
      "b....b.......................b....b",
      "b....b.....bbbbbbbbbbbbb.....b....b",
      "b....b.......................b....b",
      "b....b.......................b....b",
      "b....bbbbbb.............bbbbbb....b",
      "b.................................b",
      "b.................................b",
      "b.................................b",
      "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
    ],
    0,
    0,
    50,
    50
  );

  firstpass = true;
}

function pvpdraw(){
  camera.zoom = 0.5;
  camera.x = 850;
  camera.y = 624;

  pvpmovement();
  turretcontrollers();
  pvpbulletshots();
  pvpbulletinteraction();
  pvpbackgroundinteractions();
}

function pvpmovement(){
  if(kb.pressing("A")){
    player.x -= base;
    player.rotation = 270;
  }
  if(kb.pressing("D")){
    player.x += base;
    player.rotation = 90;
  }
  if(kb.pressing("W")){
    player.y -= base;
    player.rotation = 0;
  }
  if(kb.pressing("S")){
    player.y += base;
    player.rotation = 180;
  }
  if(kb.pressing("W") && kb.pressing("D")){
    player.rotation = 45;
  }
  if(kb.pressing("W") && kb.pressing("A")){
  player.rotation = 315;
  }
  if(kb.pressing("S") && kb.pressing("D")){
    player.rotation = 135;
  }
  if(kb.pressing("S") && kb.pressing("A")){
    player.rotation = 45;
  }

  player.vel.y = 0;
  player.vel.x = 0;

  if(kb.pressing("ARROW_LEFT")){
    enemy.x -= base;
    enemy.rotation = 270;
  }
  if(kb.pressing("ARROW_RIGHT")){
    enemy.x += base;
    enemy.rotation = 90;
  }
  if(kb.pressing("ARROW_UP")){
    enemy.y -= base;
    enemy.rotation = 0;
  }
  if(kb.pressing("ARROW_DOWN")){
    enemy.y += base;
    enemy.rotation = 180;
  }
  if(kb.pressing("ARROW_UP") && kb.pressing("ARROW_RIGHT")){
    enemy.rotation = 45;
  }
  if(kb.pressing("ARROW_UP") && kb.pressing("ARROW_LEFT")){
    enemy.rotation = 315;
  }
  if(kb.pressing("ARROW_DOWN") && kb.pressing("ARROW_RIGHT")){
    enemy.rotation = 135;
  }
  if(kb.pressing("ARROW_DOWN") && kb.pressing("ARROW_LEFT")){
    enemy.rotation = 45;
  }

  enemy.vel.y = 0;
  enemy.vel.x = 0;

}

function turretcontrollers(){
  playerturret.rotation = player.rotation - 180;

  enemyturret.rotation = enemy.rotation - 180;
  if(kb.pressing("A") && kb.pressing("S")){
    playerturret.rotation = 45;
  }

  if(kb.pressing("ARROW_LEFT") && kb.pressing("ARROW_DOWN")){
    enemyturret.rotation = 45;
  }

  pturretfinder.x = player.x;
  pturretfinder.y = player.y;

  eturretfinder.x = enemy.x;
  eturretfinder.y = enemy.y;

  playerturret.x = player.x;
  playerturret.y = player.y;
  playerturret.offset.y = 30;

  enemyturret.x = enemy.x;
  enemyturret.y = enemy.y;
  enemyturret.offset.y = 30;
}

function pvpbulletshots(){
  muzzle.x = player.x;
  muzzle.y = player.y;

  emuzzle.x = enemy.x;
  emuzzle.y = enemy.y;

  if(kb.pressed("x")){
    let x = new bullet.Sprite(muzzle.x, muzzle.y);
    x.diameter = 10;
    x.direction = playerturret.rotation + 810;
    x.speed = 5;

    x.overlaps(player);
    x.overlaps(playerturret);
    x.overlaps(pturretfinder);
    x.overlaps(muzzle)
  }

  if(kb.pressed("m")){
    let c = new ebullet.Sprite(emuzzle.x, emuzzle.y);
    c.diameter = 10;
    c.direction = enemyturret.rotation + 810;
    c.speed = 5;

    c.overlaps(enemy);
    c.overlaps(enemyturret);
    c.overlaps(eturretfinder);
    c.overlaps(emuzzle);
  }
}

function pvpbulletinteraction(){
  for(b of bullet){
    if(b.colliding(enemy)){
      b.remove();
      ehealth -= 20;
    }
    for(o of block){
      if(b.colliding(o)){
        b.remove();
        o.remove();
      }
      if(ehealth == 0 || phealth == 0){
        break;
      }
    }
    for(e of ebullet){
      if(b.colliding(e)){
        let m = new Sprite(b.x, b.y);
        m.collider = "n";
        m.image = "images/explosion.png";
        b.remove();
        e.remove();
        setTimeout(() => {
          m.remove();
        },1250)
      }
    }
  }

  for(e of ebullet){
    if(e.colliding(player)){
      e.remove();
      phealth -= 20;
    }
    for(o of block){
      if(e.colliding(o)){
        e.remove();
        o.remove();
      }
      if(ehealth == 0 || phealth == 0){
        break;
      }
    }
  }
}

function pvpbackgroundinteractions(){
  if(ehealth == 0){
    if(!firstexitpass){
      pvppwins = true;
      pvpewins = false;
      pwins = false;
      ewins = false;
  
      block.removeAll();
      player.remove();
      playerturret.remove();
      pturretfinder.remove();
      muzzle.remove();
      enemy.remove();
      tileMap.removeAll();
      clearInterval(set1);
      enemyturret.remove();
      ebullet.removeAll();
      bullet.removeAll();
      eturretfinder.remove();
      emuzzle.remove();
      counter = 0;
  
      firsttrackpass = true;
      firstpass = false;
      camera.x = windowWidth/2;
      camera.y = windowHeight/2;
      camera.zoom = 1;
      pvpgame = false;
      game = true;

      ehealth = 100;
      phealth = 100;

      resetprep();
      firstexitpass = true;
    }
  }

  if(phealth == 0){
    if(!firstexitpass){
      pvppwins = false;
      pvpewins = true;
      pwins = false;
      ewins = false;
  
      block.removeAll();
      player.remove();
      playerturret.remove();
      pturretfinder.remove();
      muzzle.remove();
      enemy.remove();
      tileMap.removeAll();
      clearInterval(set1);
      enemyturret.remove();
      ebullet.removeAll();
      bullet.removeAll();
      eturretfinder.remove();
      emuzzle.remove();
      counter = 0;
  
      firsttrackpass = true;
      firstpass = false;
      camera.x = windowWidth/2;
      camera.y = windowHeight/2;
      camera.zoom = 1;
      pvpgame = false;
      game = true;

      ehealth = 100;
      phealth = 100;

      resetprep();
      firstexitpass = true;
    }
  }
  if(ehealth != 0 || phealth != 0){
    firstexitpass = false;
  }
}

function resetprep(){
  cpugame = false;
  pvpgame = false;
  menu = false;
  game = true;

  localStorage.setItem("game", game);
  localStorage.setItem("cpugame", cpugame);
  localStorage.setItem("pvpgame", pvpgame);
  localStorage.setItem("pvppwins", pvppwins);
  localStorage.setItem("pvpewins", pvpewins);
  localStorage.setItem("pwins", pwins);
  localStorage.setItem("ewins", ewins);
  localStorage.setItem("menu", menu);
  localStorage.setItem("cpugame", cpugame);
  localStorage.setItem("pvpgame", pvpgame);
  localStorage.setItem("firstpass", firstpass);

  window.location.href = "index.html";
}