// Controls:
// A & D to move forward but has to be in sequential order so must be d then a then d then a and repeat.
// Space to jump over obstacles
//Click on screen for trivia

let bricks, tilesGroup;
let player;
let stairs;
let ball;
let score = 0;
let canmoveright = true;
let canmoveleft = true;
let moveright = false;
let moveleft = false;
let dead = false;
let ingame = false;
let scoredisplay;
let spawnball = false;
let spawned = false;
let textbox;
let textbox1;
let textbox2;
let back;

function setup(){
  createCanvas(windowWidth, windowHeight);

  world.gravity.y = 9.81;

  back = new Sprite(20, 20, windowWidth/40, windowHeight/40, 'static');
  back.text = "Back";
  back.color = "crimson";
  back.textSize = 8;
  
  scoredisplay = new Sprite(windowWidth/2, 0, 100, 16, "s");
  scoredisplay.color = "crimson";
  scoredisplay.text = "Score: " + score;

  player = new Sprite(20,windowHeight/2,14,14);
  player.color = "blue";
  player.rotationLock = true;

  bricks = new Group();
  bricks.w = 16;
  bricks.h = 16;
  bricks.tile = '=';
  bricks.collider = "static";
  bricks.color = "maroon";

  spawn = new Group();
  spawn.w = 16;
  spawn.h = 16;
  spawn.collider = "static";
  spawn.tile = "s";
  spawn.color = "red";

  finish = new Group();
  finish.w = 16;
  finish.h = 16;
  finish.collider = "static";
  finish.tile = "f";
  finish.color = "green";

  ball = new Group();
  ball.color = "red";
  ball.diameter = 10;

  tilesGroup = new Tiles(
    [
      '.................',
      '............=f=..',
      '...........=.....',
      '..........=......',
      '.........=.......',
      '........=........',
      '.......=.........',
      '......=..........',
      '.....=...........',
      '=s===............'
    ],
    0,
    0,
    bricks.w + 1,
    bricks.h + 1
  );

  textbox = new Sprite(0,0,175,48, "s");
  textbox.color = "beige";
  textbox.visible = false;
  textbox1 = new Sprite(0,0,65,16, "s");
  textbox1.color = "gray";
  textbox1.visible = false;
  textbox2 = new Sprite(0,0,65,16, "s");
  textbox2.color = "gray";
  textbox2.visible = false;

  ball.overlaps(textbox)
  ball.overlaps(textbox1)
  ball.overlaps(textbox2)
  
  for(s of spawn){
    player.pos.x = s.pos.x;
    player.pos.y = s.pos.y - s.h - 1;
  }
}

function draw(){
  background("crimson");
  playermovement();
  CAMERA();
  finito();
  scoredisplays();
  spawnballs();
  jumping();
  ingamer();
  console.log(player.pos.x + "x" + player.pos.y + "y")
  if(back.mouse.pressed()){
    window.location.href = "index.html";
  }
}

function playermovement(){
  if(kb.pressed("left")){
    moveleft = true;
    moveright = false;
  }
  if(kb.pressed("right")){
    moveright = true;
    moveleft = false;
  }
  for(b of bricks){
    if(moveright && !dead && !ingame){
      if(canmoveright){
        if(player.pos.x <= 0 || (player.pos.x >= 0 && player.pos.x <= 16)){
          player.pos.x = 17; 
          player.pos.y = 137.2;
        }
        else if(player.pos.x == 17){
          player.pos.x += 17; 
        }
        else if(player.pos.x == 34){
          player.pos.x += 17; 
        }
        else if(player.pos.x == 51){
          player.pos.x += 17; 
          ingame = true;
        }
        else if(player.pos.x == 68){
          player.pos.x += 17;
          player.pos.y -= 17;
          spawnball = true;
        }
        else if(player.pos.x == 85){
          player.pos.x += 17;
          player.pos.y -= 17;
        }
        else if(player.pos.x == 102){
          player.pos.x += 17;
          player.pos.y -= 17;
        }
        else if(player.pos.x == 119){
          player.pos.x += 17;
          player.pos.y -= 17;
          spawnball = true;
        }
        else if(player.pos.x == 136){
          player.pos.x += 17;
          player.pos.y -= 17;
        }
        else if(player.pos.x == 153){
          player.pos.x += 17;
          player.pos.y -= 17;
        }
        else if(player.pos.x == 170){
          player.pos.x += 17;
          player.pos.y -= 17;
          ingame = true;
        }
        else if(player.pos.x == 187){
          player.pos.x += 17;
          player.pos.y -= 17;
        }
        else if(player.pos.x == 204){
          player.pos.x += 17;
        }
        canmoveright = false;
        canmoveleft = true;
        moveright = false;
      }
      else if(!canmoveright){
        console.log("you died")
        dead = true;
        player.pos.x = 0;
        canmoveright = true;
        canmoveleft = true;
        dead = false;
      }
    }
    if(moveleft && !dead && !ingame){
      if(canmoveleft){
        if(player.pos.x <= 0 || (player.pos.x >= 0 && player.pos.x <= 16)){
          player.pos.x = 17;
          player.pos.y = 137.2;
        }
        else if(player.pos.x == 17){
          player.pos.x += 17;
        }
        else if(player.pos.x == 34){
          player.pos.x += 17; 
        }
        else if(player.pos.x == 51){
          player.pos.x += 17; 
          ingame = true;
        }
        else if(player.pos.x == 68){
          player.pos.x += 17;
          player.pos.y -= 17;
          spawnball = true;
        }
        else if(player.pos.x == 85){
          player.pos.x += 17;
          player.pos.y -= 17;
        }
        else if(player.pos.x == 102){
          player.pos.x += 17;
          player.pos.y -= 17;
        }
        else if(player.pos.x == 119){
          player.pos.x += 17;
          player.pos.y -= 17;
          spawnball = true;
        }
        else if(player.pos.x == 136){
          player.pos.x += 17;
          player.pos.y -= 17;
        }
        else if(player.pos.x == 153){
          player.pos.x += 17;
          player.pos.y -= 17;
        }
        else if(player.pos.x == 170){
          player.pos.x += 17;
          player.pos.y -= 17;
          ingame = true;
        }
        else if(player.pos.x == 187){
          player.pos.x += 17;
          player.pos.y -= 17;
        }
        else if(player.pos.x == 204){
          player.pos.x += 17;
        }
        canmoveleft = false;
        canmoveright = true;
        moveleft = false;
      }
      else if(!canmoveleft){
        console.log("you died")
        dead = true;
        player.pos.x = 0
        canmoveright = true;
        canmoveleft = true;
        dead = false;
      }
    }
  }
}

function CAMERA(){
  camera.x = player.x;
  camera.y = player.y;
  camera.zoom = 3;

  if(back.mouse.hovering()){
    mouse.cursor = "pointer";
  }
  else{
    mouse.cursor = "default";
  }
  
  back.x = player.x - windowWidth/7;
  back.y = player.y - windowHeight/7;
}

function finito(){
  for(f of finish){
    if(player.colliding(f)){
      player.pos.x = 0;
      player.pos.y = 137.119999999999;
      score += 1;
      for(b of ball){
        if(b){
          b.remove();
        }
      }
    }
  }
}

function scoredisplays(){
  scoredisplay.text = "Score: " + score;
  scoredisplay.pos.y = player.pos.y - 125;
  scoredisplay.pos.x = player.pos.x;
}

function spawnballs(){
  if(spawnball){
    n = new ball.Sprite(204,1.179999999997,14,14,"d");
    n.diameter = 10;
    spawnball = false;
  }
  for(b of ball){
    if(b.vel.x == 0){
      b.vel.x += -1;
    }
    if(player.collides(b)){
      b.remove();
      player.pos.x = 0;
      player.pos.y = 137.119999999999;
    }
  }
}

function jumping(){
  if(kb.presses("space")){
    if(player.colliding(bricks)){
      player.vel.y = -5;
    }
  }
}

function ingamer(){
  if(ingame){
    if(!spawned){
      textbox.x = player.pos.x;
      textbox.y = player.pos.y - 40;
      textbox1.collider = "s";
      textbox2.collider = "s";
      textbox.collider = "s";
      textbox.visible = true;
      textbox1.visible = true;
      textbox2.visible = true;
      textbox.text = random(["What is the capital of france? ","(42 + 8) / 5 = ?","Sigma > Alpha?"]);
      textbox1.x = textbox.x + textbox.w/4;
      textbox1.y = textbox.y + textbox.h/2;
      textbox2.x = textbox.x - textbox.w/4;
      textbox2.y = textbox.y + textbox.h/2;
      spawned = true;
    }
    if(textbox.text == "What is the capital of france? "){
      textbox1.text = "Paris";
      textbox2.text = "Milan";
      if(textbox1.mouse.hovering()){
        textbox1.color = "green";
        mouse.cursor = "pointer";
      }
      else if(textbox2.mouse.hovering()){
        textbox2.color = "green";
        mouse.cursor = "pointer";
      }
      else{
        textbox1.color = "gray";
        textbox2.color = "gray";
        mouse.cursor = "default";
      }
      if(textbox1.mouse.pressed()){
        textbox.visible = false;
        textbox1.visible = false;
        textbox2.visible = false;
        textbox1.collider = "n";
        textbox2.collider = "n";
        textbox.collider = "n";
        ingame = false;
        spawned = false;
      }
      else if(textbox2.mouse.pressed()){
        textbox.visible = false;
        textbox1.visible = false;
        textbox2.visible = false;
        textbox1.collider = "n";
        textbox2.collider = "n";
        textbox.collider = "n";
        player.pos.x = 0;
        player.pos.y = 136.928;
        ingame = false;
        spawned = false;
      }
    }
    if(textbox.text == "(42 + 8) / 5 = ?"){
      textbox1.text = "5";
      textbox2.text = "10";
      if(textbox1.mouse.hovering()){
        textbox1.color = "green";
        mouse.cursor = "pointer";
      }
      else if(textbox2.mouse.hovering()){
        textbox2.color = "green";
        mouse.cursor = "pointer";
      }
      else{
        textbox1.color = "gray";
        textbox2.color = "gray";
        mouse.cursor = "default";
      }
      if(textbox2.mouse.pressed()){
        textbox.visible = false;
        textbox1.visible = false;
        textbox2.visible = false;
        textbox1.collider = "n";
        textbox2.collider = "n";
        textbox.collider = "n";
        ingame = false;
        spawned = false;
      }
      else if(textbox1.mouse.pressed()){
        textbox.visible = false;
        textbox1.visible = false;
        textbox2.visible = false;
        textbox1.collider = "n";
        textbox2.collider = "n";
        textbox.collider = "n";
        player.pos.x = 0;
        player.pos.y = 136.928;
        ingame = false;
        spawned = false;
      }
    }
    if(textbox.text == "Sigma > Alpha?"){
      textbox1.text = "True";
      textbox2.text = "False";
      if(textbox1.mouse.hovering()){
        textbox1.color = "green";
        mouse.cursor = "pointer";
      }
      else if(textbox2.mouse.hovering()){
        textbox2.color = "green";
        mouse.cursor = "pointer";
      }
      else{
        textbox1.color = "gray";
        textbox2.color = "gray";
        mouse.cursor = "default";
      }
      if(textbox1.mouse.pressed()){
        textbox.visible = false;
        textbox1.visible = false;
        textbox2.visible = false;
        textbox1.collider = "n";
        textbox2.collider = "n";
        textbox.collider = "n";
        ingame = false;
        spawned = false;
      }
      else if(textbox2.mouse.pressed()){
        textbox.visible = false;
        textbox1.visible = false;
        textbox2.visible = false;
        textbox1.collider = "n";
        textbox2.collider = "n";
        textbox.collider = "n";
        player.pos.x = 0;
        player.pos.y = 136.928;
        ingame = false;
        spawned = false;
      }
    }
  }
}