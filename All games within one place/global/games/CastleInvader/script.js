let backdrop, castle, hand1circle;
let hpcastle = 500;
let enemies, timer;
let finaltext;
let score = 0;
let base = 60;
let highscore;
let cooldown;
let display;
let outbox;
let back;
let hand;
let time;
function preload(){
  backdrop = loadImage('images/grasslands.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  highscore = 0;
  timer = 0;
  time = +setInterval(() => {
    timer++
  }, 1000);

  back = new Sprite(50,50, 100);
  back.text = "Press P to exit";
  back.collider = "n";
  back.color = "lightgreen";

  display = new Sprite(windowWidth/2, 40  , windowWidth/2, windowHeight/10, "s");
  display.color = "lightgreen";
  display.text = "kills: " + score + "\n" + "Castle health: " + hpcastle + "\n" + "Time alive: " + timer;

  cooldown = false;

  castle = new Sprite(windowWidth/2, windowHeight/2, 100, 100, "static");
  castle.img = 'images/castle.png';
  castle.scale = 1;

  enemies = new Group();
  enemies.w = 10;
  enemies.h = 10;
  enemies.collider = 'dynamic';
  enemies.image = "images/enemy.png";
  enemies.scale = 0.2;

  mouse.visible = false;

  hand1circle = new Sprite(0,0,50,50, "s");
  hand1circle.diameter = 60;
  hand1circle.strokeColor = "black";
  hand1circle.strokeWeight = 5;
  hand1circle.color = (0,0,0,0);
  hand1circle.visible = false;

  hand2stun = new Sprite(0,0,50,50, "s");
  hand2stun.width = 250;
  hand2stun.height = 250
  hand2stun.image = "images/earthquake.png";
  hand2stun.visible = false;

  finaltext = new Sprite(windowWidth/2, windowHeight/2, windowWidth/3, windowHeight/3, "s")
  finaltext.textSize = 18;
  finaltext.color = "lightgreen";
  finaltext.visible = false;
  finaltext.collider = "n";

  hand = new Sprite(0,0,50,50, "s");
  hand.image = 'images/hand.png';

  enemies.overlaps(castle);
  enemies.overlaps(display);
}

function draw() {
  handmover();
  handkills();
  enemyspawn();
  background(backdrop)
}

function handmover(){
  hand.x = mouse.x;
  hand.y = mouse.y;
}

function handkills(){
  if(kb.pressing("P")){
    window.location.href = "index.html";
  }
  castle.scale = hpcastle/500;

  if(mouse.pressing("left")){
    hand1circle.x = hand.x;
    hand1circle.y = hand.y;

    hand1circle.visible = true;
    hand1circle.collider = "s";
    if(hand1circle){
      if(enemies.length > 0){
        for(e of enemies){
          if(e.overlapping(hand1circle)){
            e.remove();
            score++
          }
        }
      }
    }
  }
  else if(!mouse.pressing("left")){
    hand1circle.visible = false;
    hand1circle.collider = "n";
  }
  if((mouse.presses("right")) && (!cooldown)){
    cooldown = true;
    hand2stun.visible = true;
    hand2stun.collider = "s";


    hand2stun.x = hand.x;
    hand2stun.y = hand.y;

    if(kb.pressing("a")){
      hand2stun.rotation = 270;
    }
    else if(kb.pressing("w")){
      hand2stun.rotation = 0;
    }
    else if(kb.pressing("d")){
      hand2stun.rotation = 90;
    }
    else if(kb.pressing("s")){
      hand2stun.rotation = 180;
    }

    setTimeout(() => {
      hand2stun.visible = false;
      hand2stun.collider = "n";
    }, 3000);

    setTimeout(() => {
      cooldown = false;
    }, 5000);
  }
}

function enemyspawn(){
  display.text = "kills: " + score + "\n" + "Castle health: " + hpcastle + "\n" + "Time alive: " + timer;
  if(hpcastle > 0){
    if(frameCount % base == 0){
      let enemy = new enemies.Sprite();
      enemy.x = random(0, windowWidth);
      enemy.speed = random(1,8);
      let x = random(0,2);
      if(x > 1){
        enemy.y = 0;
      }
      else{
        enemy.y = windowHeight;
      }
    }
  }
  for(e of enemies){
    e.moveTowards(castle, 0.01);
    e.speed = random(1,8);

    if(e.overlapping(castle)>0){
      hpcastle -= 10;
      e.remove()
    }
  }
  for(s of enemies){
    if(hand2stun.collides(s)){
      s.remove();
      score++
    }
  }
  if(score == 20){
    base = 50;
  }
  else if(score == 30){
    base = 40;
  }
  else if(score == 40){
    base = 30;
  }
  else if(score == 50){
    base = 20;
  }
  else if(score == 60){
    base = 10;
  }
  else if(score == 80){
    base = 5;
  }
  else if(score == 120){
    base = 2;
  }

  if(hpcastle <= 0){
    clearInterval(time);
    enemies.removeAll();
    if(score > highscore){
      highscore = score;
    }
    finaltext.visible = true;
    finaltext.collider = "s";
    finaltext.text = "You died " + "" + "\n Kills: " + score + " \n Time alive: " + timer + "\n Highscore: " + highscore + " \n Press R to restart";

    if(kb.presses("R")){
      time = setInterval(() => {
        timer++;
      }, 1000);
      hpcastle = 500;
      score = 0;
      base = 60;
      timer = 0;
      finaltext.visible = false;
      finaltext.collider = "n";
    }
  }
}