let gameback, shoop, bricks,spawn, tilesGroup, shopmenu, item1, item2, item3, item1d,item2d, item3d, player;
let hppot, currentmag, maxbullet, currentbullet, golddisplay, inventoryy, offhand1, offhand2, bullet, bulletbox, reloading, magbox, staminabox, staminabar, healthbox, healthbar, stampot, base, stamina, health, goldbox, alreadyreloading, wavestartbox, wavenum, wavestart, hoveringwave, waverunning, Enemy, enemybullet, enemyshot, finishedsp, enemyspawn;
var canbuy = true;
let inv = 1;
let gold = 5;

function setup(){
  createCanvas(windowWidth, windowHeight);
  background(0);
  base = 2;
  currentbullet = 12;
  maxbullet = 12;
  currentmag = 3;
  hppot = 2;
  stampot = 2;
  reloading = false;
  stamina = 150;
  health = 150;
  wavenum = 0;
  alreadyreloading = false;
  wavestart = false;
  hoveringwave = false;
  waverunning = false;
  finishedsp = false;

  gameback = new Sprite(windowWidth/60 , windowHeight/40, 20, 40, "s");
  gameback.color = (0,0,0,0);
  gameback.text = "|||";
  gameback.textColor = "white";
  gameback.textSize = "32";
  gameback.rotation = 90;
  gameback.rotationLock = true;
  mouse.cursor = "default";

  shoop = new Group();
  shoop.w = 16;
  shoop.h = 16;
  shoop.tile = "l";
  shoop.image = "images/shop.png";
  shoop.scale = 0.1;
  shoop.collider = "s";
  shoop.w = 16;
  shoop.h = 16;

  bricks = new Group();
  bricks.w = 16;
  bricks.h = 16;
  bricks.tile = "=";
  bricks.collider = "s";
  bricks.image = "images/grass.png";

  spawn = new Group();
  spawn.w = 16;
  spawn.h = 16;
  spawn.tile = "s";
  spawn.collider = "n";
  spawn.color = (0,0,0,0);

  worldborder = new Group();
  worldborder.w = 16;
  worldborder.h = 16;
  worldborder.tile = "b";
  worldborder.collider = "s";
  worldborder.color = "black";
  worldborder.strokecolor = "black";

  enemyspawn = new Group();
  enemyspawn.w = 16;
  enemyspawn.h = 16;
  enemyspawn.tile = "e";
  enemyspawn.collider = "n";
  enemyspawn.color = "black";
  enemyspawn.strokecolor = "black";


  // player.rotationLock = true;

  tilesGroup = new Tiles(
    [
      "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
      "b................................................b",
      "b..e........................................e....b",
      "b................................................b",
      "b................................................b",
      "b................................................b",
      "b................................................b",
      "b................................................b",
      "b................................................b",
      "b................................................b",
      "b................................................b",
      "b................................................b",
      "b................................................b",
      "b................................................b",
      "b................................................b",
      "b................................................b",
      "b................................................b",
      "b................................................b",
      "b................................................b",
      "b....................===.........................b",
      "b....................=l=.........................b",
      "b....................===.........................b",
      "b................................................b",
      "b................................................b",
      "b................................................b",
      "b.....................s..........................b",
      "b................................................b",
      "b................................................b",
      "b................................................b",
      "b................................................b",
      "b................................................b",
      "b................................................b",
      "b................................................b",
      "b................................................b",
      "b................................................b",
      "b................................................b",
      "b................................................b",
      "b................................................b",
      "b................................................b",
      "b................................................b",
      "b................................................b",
      "b................................................b",
      "b................................................b",
      "b................................................b",
      "b................................................b",
      "b................................................b",
      "b................................................b",
      "b..e.........................................e...b",
      "b................................................b",
      "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
    ],
    0,
    0,
    bricks.w,
    bricks.h
  );

  player = new Sprite(0,0,12,8, "d");

  for(p of spawn){
    player.x = p.x;
    player.y = p.y;
  }
  player.rotationLock = true;

  Enemy = new Group();
  Enemy.collider = "d";
  Enemy.image = "images/Enemy.png";
  Enemy.scale = 0.20;  
  Enemy.w = 20;
  Enemy.h = 20;

  inventoryy = new Sprite(0,0,50,50, "n");
  inventoryy.color = "black";

  offhand1 = new Sprite(0,0,25,25, "n");
  offhand1.color = "black";

  offhand2 = new Sprite(0,0,25,25, "n");
  offhand2.color = "black";

  bullet = new Group();
  bullet.collider = "d";
  bullet.color = "yellow";
  bullet.life = 200;
  bullet.speed = 4;

  enemybullet = new Group();
  enemybullet.collider = "d";
  enemybullet.color = "cyan";
  enemybullet.diameter = 5;
  enemybullet.life = 150;
  enemybullet.speed = 6;

  shopmenu = new Sprite(windowWidth/2, windowHeight/2, windowWidth/3, windowHeight/4, "s");
  shopmenu.color = "beige";
  shopmenu.visible = false;

  item1 = new Sprite(shopmenu.x - shopmenu.width/1.25, shopmenu.y, shopmenu.w/5, shopmenu.h/3, "s");
  item1.color = "red";
  item1.visible = false;
  item1.collider = "n";

  item2 = new Sprite(shopmenu.x - shopmenu.width/1.25, shopmenu.y, shopmenu.w/5, shopmenu.h/3, "s");
  item2.color = "Black";
  item2.visible = false; 
  item2.collider = "n";

  item3 = new Sprite(shopmenu.x - shopmenu.width/1.25, shopmenu.y, shopmenu.w/5, shopmenu.h/3, "s");
  item3.color = "gray";
  item3.visible = false; 
  item3.collider = "n";

  bulletbox = new Sprite(player.x + windowWidth/5, player.y + windowHeight/5, 25, 25, "s")
  bulletbox.color = "black";
  bulletbox.text = "bullets: " + currentbullet + "/" + maxbullet;
  bulletbox.textColor = "white";
  bulletbox.textSize = "8";

  magbox = new Sprite(bulletbox.x, bulletbox.y + bulletbox.h/2, 25, 25, "s")
  magbox.color = "black";
  magbox.text = "magazines: " + currentmag;
  magbox.textColor = "white";
  magbox.textSize = "8";

  staminabox = new Sprite(bulletbox.x, bulletbox.y + bulletbox.h/2, 25, 25, "s")
  staminabox.color = "black";
  staminabox.text = "Stamina flasks: " + currentmag;
  staminabox.textColor = "white";
  staminabox.textSize = "8";

  healthbox = new Sprite(player.x + windowWidth/5, player.y + windowHeight/5, 25, 25, "s");
  healthbox.color = "black";
  healthbox.text = "Health flasks: " + hppot;
  healthbox.textColor = "white";
  healthbox.textSize = "8";

  staminabar = new Sprite(0,0, stamina, 10, "s");
  staminabar.color = "#034B03";

  healthbar = new Sprite(0,10,health,10, "s");
  healthbar.color = "#CD001A";

  wavestartbox = new Sprite(0,10,150,50, "s");
  wavestartbox.color = "black";
  wavestartbox.text = "Press X to start wave " + wavenum;
  wavestartbox.textSize = "8";
  wavestartbox.textColor = "white";

  item1d = new Sprite(shopmenu.x - shopmenu.width/1.25, shopmenu.y, shopmenu.w/5, shopmenu.h/3, "s");
  item1d.color = "gray";
  item1d.visible = false; 
  item1d.collider = "n";
  item1d.text = "This is a health\n potion which heals \n one quarter hp \n:: 10 gold"
  item1d.textSize = "7";

  item2d = new Sprite(shopmenu.x - shopmenu.width/1.25, shopmenu.y, shopmenu.w/5, shopmenu.h/3, "s");
  item2d.color = "gray";
  item2d.visible = false; 
  item2d.collider = "n";
  item2d.text = "This is a mag \nfor your gun \n which allows it \n one extra reload \n:: 2 gold"
  item2d.textSize = "7";

  item3d = new Sprite(shopmenu.x - shopmenu.width/1.25, shopmenu.y, shopmenu.w/5, shopmenu.h/3, "s");
  item3d.color = "gray";
  item3d.visible = false; 
  item3d.collider = "n";
  item3d.text = "Extra bullets in\n a mag +1 \n per buy :: 5g";
  item3d.textSize = "7";

  goldbox = new Sprite(gameback.x + windowWidth/2.8, gameback.y, 25, 25, "s");
  goldbox.text = "gold: " + gold;
  goldbox.textSize = "8";
  goldbox.textColor = "white";
  goldbox.color = "black";

  bullet.overlaps(player);
  bullet.overlaps(bricks);
  bullet.overlaps(healthbar);
  bullet.overlaps(healthbox);
  bullet.overlaps(staminabar);
  bullet.overlaps(staminabox);
  bullet.overlaps(magbox);
  bullet.overlaps(bulletbox);
  bullet.overlaps(inventoryy);
  bullet.overlaps(offhand1);
  bullet.overlaps(offhand2);
  bullet.overlaps(gameback);
  bullet.overlaps(wavestartbox);

  enemybullet.overlaps(Enemy);
  enemybullet.overlaps(bricks);
  enemybullet.overlaps(healthbar);
  enemybullet.overlaps(healthbox);
  enemybullet.overlaps(staminabar);
  enemybullet.overlaps(staminabox);
  enemybullet.overlaps(magbox);
  enemybullet.overlaps(bulletbox);
  enemybullet.overlaps(inventoryy);
  enemybullet.overlaps(offhand1);
  enemybullet.overlaps(offhand2);
  enemybullet.overlaps(gameback);
  enemybullet.overlaps(wavestartbox);

  Enemy.overlaps(healthbox);
  Enemy.overlaps(healthbar);
  Enemy.overlaps(staminabar);
  Enemy.overlaps(staminabox);
  Enemy.overlaps(magbox);
  Enemy.overlaps(bulletbox);
  Enemy.overlaps(goldbox);
  Enemy.overlaps(gameback);
  Enemy.overlaps(inventoryy);
  Enemy.overlaps(offhand1);
  Enemy.overlaps(offhand2);

  player.overlaps(shopmenu);
  player.overlaps(item1);
  player.overlaps(bricks);

}

function draw(){
  player.rotateTowards(mouse, 1);
  boxupdater();
  background(0);
  hoverssss();
  camraaa();
  movement();
  brickers();
  inventry();
  enemies();
  bulletcollision();
}

function inventry(){
  inventoryy.x = player.x - windowWidth/5;
  inventoryy.y = player.y + windowHeight/5;

  offhand1.x = inventoryy.x + inventoryy.w*1.25;
  offhand1.y = inventoryy.y;

  offhand2.x = offhand1.x + offhand1.w*3.5;
  offhand2.y = inventoryy.y;

  if(inv == 0){
    inventoryy.img = "images/crimsontears.png";
    inventoryy.scale = 0.5;
    offhand1.img = "images/gu.png";
    offhand1.scale = 0.25;
    offhand2.img = "images/stamina.png";
    offhand2.scale = 0.25;
  }
  else if(inv == 1){
    inventoryy.img = "images/gu.png";
    inventoryy.scale = 0.5;
    offhand1.img = "images/stamina.png";
    offhand1.scale = 0.25;
    offhand2.img = "images/crimsontears.png";
    offhand2.scale = 0.25;
  }
  else if(inv == 2){
    inventoryy.img = "images/stamina.png";
    inventoryy.scale = 0.5;
    offhand1.img = "images/crimsontears.png";
    offhand1.scale = 0.25;
    offhand2.img = "images/gu.png";
    offhand2.scale = 0.25;
  }



  if(kb.presses("ARROW_UP")){
    if(inv === 2){
      inv = 0;
    }
    else{
      inv++
    }
  }
  if(kb.presses("ARROW_DOWN")){
    if(inv === 0){
      inv = 2;
    }
    else{
      inv--
    }
  }
  if(kb.presses("R")){
    if((currentmag > 0) && (!alreadyreloading)){
      reloading = true;
      alreadyreloading = true;
      setTimeout(() => {
        currentbullet = maxbullet;
        currentmag--
        reloading = false
        alreadyreloading = false;
      },1000);
    }
    else{
      // just to catch errors.
      console.log("No magazines left")
    }
  }
  if(health > 150){
    health = 150;
  }
  if(mouse.pressed()){
    if(inv == 0){
      if(hppot > 0){
        health = health + 37;
        hppot--;
      }
      else{
        console.log("no hp pots")
      }
    }
    if((inv == 1) && (currentbullet > 0)){
      //gun
      let b = new bullet.Sprite(player.x, player.y, 5, 5, "d");
      b.d = 5;
      b.direction = player.rotation;
      b.bounciness = 1;
      currentbullet--
    }
    if(inv == 2){
      if(stampot > 0){
        stamina = stamina + 37;
        stampot--;
      }
      else{
        console.log("no staminaa pots")
      }
    }
  }
}

function hoverssss(){
  if(gameback.mouse.hovering()){
    gameback.textColor = "green";
    mouse.cursor = "pointer";
  }
  else{
    gameback.textColor = "white";
    mouse.cursor = "default";
  }

  gameback.x = camera.x - ((windowWidth/2)/2) + 20;
  gameback.y = camera.y - ((windowHeight/4.25))

  if(gameback.mouse.pressed()){
    window.location.href = "index.html";
  }

}

function camraaa(){
  camera.x = player.x;
  camera.y = player.y;
  camera.zoom = 2;
}

function movement(){
  if(kb.pressing("a")){
    player.x -= base;
  }
  if(kb.pressing("d")){
    player.x += base;
  }
  if(kb.pressing("w")){
    player.y -= base;
  }
  if(kb.pressing("s")){
    player.y += base;
  }
  if((!kb.pressing("a")) && (!kb.pressing("d")) && (!kb.pressing("s")) && (!kb.pressing("w"))){
    player.vel.x = 0;
    player.vel.y = 0;
  }

  if((kb.pressing("shift")) && (stamina > 30)){
    base = 4;
    setTimeout(() => {
      if(stamina < 20){
        console.log("stamina too low");
        base = 2
      }
      else{
        stamina = stamina - 5;
      }
    }, 500)
  }
  else if((!kb.pressing("shift")) && (stamina < 150)){
    base = 2;
    setTimeout(() => {
      stamina = stamina + 2.5;
    }, 500)
  }
  if(stamina < 10){
    stamina = 20;
  }
  if(stamina > 150){
    stamina = 150;
  }
}

function brickers(){
  for(b of bricks){
    if(player.overlapping(bricks)>0){
      shopmenu.visible = true;
      shopmenu.x = player.x;
      shopmenu.y = player.y;
      shopmenu.collider = "s";

      item1.collider = "s";
      item1.visible = true;
      item1.pos.x = shopmenu.x - shopmenu.width/2.5;
      item1.pos.y = shopmenu.y - shopmenu.height/3;

      item2.collider = "s";
      item2.pos.x = shopmenu.x;
      item2.pos.y = shopmenu.y - shopmenu.height/3;
      item2.visible = true;

      item3.collider = "s";
      item3.pos.x = shopmenu.x + shopmenu.width/2.5;
      item3.pos.y = shopmenu.y - shopmenu.height/3;
      item3.visible = true;

      item1d.collider = "s";
      item1d.visible = true;
      item1d.pos.x = shopmenu.x - shopmenu.width/2.5;
      item1d.pos.y = shopmenu.y + shopmenu.height/3;

      item2d.collider = "s";
      item2d.visible = true;
      item2d.pos.x = shopmenu.x;
      item2d.pos.y = shopmenu.y + shopmenu.height/3;

      item3d.collider = "s";
      item3d.visible = true;
      item3d.pos.x = shopmenu.x + shopmenu.width/2.5;
      item3d.pos.y = shopmenu.y + shopmenu.height/3;
      if(item1.mouse.hovering()){
        mouse.cursor = "pointer";
        item1.color = "green";
      }
      else if(item2.mouse.hovering()){
        mouse.cursor = "pointer";
        item2.color = "green";
      }
      else if(item3.mouse.hovering()){
        mouse.cursor = "pointer";
        item3.color = "green";
      }
      else{
        mouse.cursor = "default";
        item2.color = "black";
        mouse.cursor = "default";
        item1.color = "red";
        mouse.cursor = "default";
        item3.color = "gray";
      }

      if((item1.mouse.pressed()) && canbuy){
        canbuy = false;
        if(gold >= 10){
          gold = gold - 10;
          hppot++;
          setTimeout(() => {
            canbuy = true;
          }, 1000);
        }
        else{
          console.log("not enough gold");
        }
      }
      if((item2.mouse.pressed()) && canbuy){
        canbuy = false;
        if(!(gold < 2)){
          gold = (gold - 2);
          currentmag = currentmag + 1;
          setTimeout(() => {
            canbuy = true;
          }, 1000);
        }
        else{
          console.log("not enough gold");
        }
      }
      if((item3.mouse.pressed()) && canbuy){
        canbuy = false;
        if(gold >= 5){
          gold = gold - 5;
          maxbullet++;
          setTimeout(() => {
            canbuy = true;
          }, 1000);
        }
        else{
          console.log("not enough gold");
        }
      }
    }
  else{
      shopmenu.visible = false;
      shopmenu.collider = "n";
      item1.visible = false;
      item1.collider = "n";
      item2.visible = false;
      item2.collider = "n";
      item3.visible = false;
      item3.collider = "n";
      item1d.visible = false;
      item1d.collider = "n";
      item2d.visible = false;
      item2d.collider = "n";
      item3d.visible = false;
      item3d.collider = "n";
    }
  }
}

function boxupdater(){
  bulletbox.x = player.x + windowWidth/5;
  bulletbox.y = player.y + windowHeight/5;
  if(!reloading){
    bulletbox.text = "bullets: " + currentbullet + "/" + maxbullet;
  }
  else if(reloading){
    bulletbox.text = "Reloading...";
  }

  magbox.x = bulletbox.x;
  magbox.y = bulletbox.y + bulletbox.h;
  magbox.text = "magazines: " + currentmag;


  // health pots
  healthbox.x = bulletbox.x;
  healthbox.y = bulletbox.y - bulletbox.h;
  healthbox.text = "Health flasks: " + hppot;

  // stamina pots
  staminabox.x = healthbox.x;
  staminabox.y = healthbox.y - healthbox.h;
  staminabox.text = "Stamina flasks: " + stampot;

  // health bar

  healthbar.x = gameback.x + healthbar.w/2 - 15;
  healthbar.y = gameback.y + healthbar.h*3;
  if(!health > 0){
    healthbar.width = 1;
    wavenum = 0;
    for(s of spawn){
      player.x = s.x;
      player.y = s.y
    }
    health = 150;
    gold = 5;

    stampot = 2;
    hppot = 2;
    bullet = 12;
    maxbullet = 12;
    currentmag = 3;
    Enemy.removeAll();
    if(bullet.length > 0){
      if(bullet){
        bullet.removeAll();
      }  
    }
    enemybullet.removeAll();
  }
  else{
    healthbar.width = health
  }

  // stamina bar

  staminabar.x = healthbar.x;
  staminabar.y = healthbar.y + staminabar.h;
  staminabar.width = stamina;

  // gold box

  goldbox.x = gameback.x + windowWidth/2.25
  goldbox.y = gameback.y;
  goldbox.text = "gold: " + gold;

  // wave start box

  wavestartbox.x = gameback.x + windowWidth/4;
  wavestartbox.y = goldbox.y

  if(!hoveringwave){
    wavestartbox.textColor = "white";
    wavestartbox.text = "Press X to start wave " + wavenum;
  }


  if((wavestartbox.mouse.presses()) && (!wavestart)){
    wavestart = true;
  }
  if((wavestartbox.mouse.hovering()) && (!waverunning)){
    hoveringwave = true;
    wavestartbox.textColor = "green";
    mouse.cursor = "pointer";
    wavestartbox.text = "Or click me i guess";
  }
  else{
    hoveringwave = false;
    wavestartbox.textColor = "white";
    mouse.cursor = "default";
  }
  if(waverunning){
    wavestartbox.text = "Enemies left in wave: " + wavenum + " = " + Enemy.length;
  }
  // console.log(Enemy.length);
}

function enemies(){
  if(((kb.presses("x")) || wavestart) && (!waverunning)){
    waverunning = true;
    finishedsp = false;
  }
  if(waverunning){
    if((Enemy.length < ((wavenum * 2) + 1)) && (!finishedsp)){
       new Enemy.Sprite(random(400), random(400));
    }
    if(Enemy.length === ((wavenum * 2) + 1)){
      finishedsp = true;
    }

    if(Enemy.length === 0){
      wavenum++
      waverunning = false;
    }

    // code setting bullet hella broken 
    if(enemybullet.length > 0){
      for(u of enemybullet){
        for(n of Enemy){
          if(b.rotationLock == false){
            if(u.d == 5){
              u.direction = n.rotation;
              u.rotationLock = true;
            }
            else{
              u.direction = n.rotation;
              u.rotationLock = true;
            }
          }
        }
      }
    }

    for(e of Enemy){
      e.rotateTowards(player, 1);
      e.moveTowards(player, 0.05);
      e.speed = 0.5;
      if(e.friction === 0.5){
        e.friction = 0.51;
        let m = new enemybullet.Sprite(e.x, e.y, 5, 5, "d");
        m.diameter = 5;
        setTimeout(() => {
          e.friction = 0.5;
        }, 500);
        e++
      }
    }
    }
  else{
    console.log("boo")
  }
}

function bulletcollision(){
  for(E of Enemy){
    if(bullet.collides(E)){
      E.remove();
      gold++
    }
    for(Y of enemybullet){
      if(Y.collides(player)){
        health = health - 10;
        Y.remove();
      }
    }
  }
}
