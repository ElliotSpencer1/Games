let musicvol = 0;

if(localStorage.getItem("musicval") != null){
  musicvol = localStorage.getItem("musicval");
  musicvol = parseInt(musicvol);
}
else{
  musicvol = 100;
}

let menuscreen = true;
let sizeofmenutext = 40;
let staramount = 0;
let stars, gamestart, options, backop, gametag, optionpage,subtract, addition, opback, gaming, gameback, gameran, bricks, tilesGroup, player, loop2;
let shopmenu, item1, item2, item3, item4, buy1, buy2, buy3, buy4, coins;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255);

  if(menuscreen){
    background(0);

    optionpage = false;
    gaming = false;
    gameran = false;

    gametag = new Sprite(windowWidth/2, windowHeight/6, windowWidth, 200, "s");
    gametag.color = "black";
    gametag.text = "Welcome to RPG!!";
    gametag.textColor = "white";
    gametag.textSize = sizeofmenutext;

    stars = new Group();
    stars.direction = 180;
    stars.speed = 6;
    stars.rotationSpeed = 3;
    stars.color = "white";

    loop2 = false;

    let star = new stars.Sprite(windowWidth, random(windowHeight), 20, 20, "k");

    gamestart = new Sprite(windowWidth/2, windowHeight/3, windowWidth/2, 120, "s");
    gamestart.color = "gray";
    gamestart.text = "Start";
    gamestart.textColor = "white";
    gamestart.textSize = "40";

    options = new Sprite(windowWidth/2, windowHeight/2, windowWidth/2, 120, "s");
    options.color = "gray";
    options.text = "options";
    options.textColor = "white";
    options.textSize = "40";


  }
}


function draw() {
  if(menuscreen){
    background(0);
    for(s of stars){
      if(s.pos.x < 0){
        s.remove();
        staramount--
      }
      if(s.pos.x > windowWidth){
        s.remove();
        staramount--
      }
    }

    if((staramount <= 10) && !gaming){
      let star = new stars.Sprite(windowWidth, random(windowHeight), 20, 20, "k");
      staramount++
    }

    if(gamestart.mouse.hovering()){
      mouse.cursor = "pointer";
      gamestart.color = "green";
    }
    else if(options.mouse.hovering()){
      mouse.cursor = "pointer";
      options.color = "green";
    }
    else{
      mouse.cursor = "default";
      options.color = "gray";
      mouse.cursor = "default";
      gamestart.color = "gray";
    }
    if(gamestart.mouse.pressed()){
      gamestart.visible = false;
      gamestart.collider = "n";
      options.visible = false;
      options.collider = "n";
      gametag.visible = false;
      gametag.collider = "n";
      gaming = true;
      menuscreen = false;
      optionpage = false;
      window.location.href = "wavegame2.html"
    }
    if(options.mouse.pressed()){
      gamestart.visible = false;
      gamestart.collider = "n";
      gametag.text = "Options";
      gametag.collider = "s";
      options.visible = false;
      options.collider = "n";
      subtract = new Sprite(windowWidth/3,  windowHeight/2, 100, 100, "s");
      subtract.textSize = "40";
      subtract.text = "-";
      addition = new Sprite(windowWidth/1.5, windowHeight/2, 100, 100, "s");
      addition.textSize = "40";
      addition.text = "+";
      subtract.color = "gray";
      addition.color = "gray";
      opback = new Sprite(windowWidth/2, windowHeight/1.5, 100, 75, "s");
      opback.text = "Back";
      opback.color = "gray";
      opback.textSize = "28";
      optionpage = true;
      menuscreen = false;
    }
  }
  if(optionpage){
    background(0);
    gametag.text = "options \n \n music volume: " + musicvol + "%";
    if(subtract.mouse.hovering()){
      mouse.cursor = "pointer";
      subtract.color = "green";
    }
    else if(addition.mouse.hovering()){
      mouse.cursor = "pointer";
      addition.color = "green";
    }
    else if(opback.mouse.hovering()){
      mouse.cursor = "pointer";
      opback.color = "green";
    }
    else{
      mouse.cursor = "default";
      addition.color = "gray";
      subtract.color = "gray";
      opback.color = "gray";
    }
    if(subtract.mouse.pressed() && musicvol > 0){
      musicvol -= 20;
    }
    if(addition.mouse.pressed() && musicvol < 200){
      musicvol += 20;
    }
    if(opback.mouse.pressed()){
      addition.visible = false;
      addition.collider = "n";
      subtract.visible = false;
      subtract.collider = "n";
      gametag.text = "Welcome to RPG!!";
      options.visible = true;
      options.collider = "s";
      gamestart.visible = true;
      gamestart.collider = "s";
      opback.visible = false;
      opback.collider = "n";
      optionpage = false;
      menuscreen = true;
      localStorage.setItem("musicval", musicvol);
      var para = new URLSearchParams();
      para.append("KEY", musicvol);
    }
  }
}



