let basket;
let item;
let bang, finalshow;
let base;
let score;
let accuracy;
let possiblescore;
let time = 60;
let back;
let count;
let display;
let gameover = false;
let timer;
let highscore = 0;

function setup(){
  createCanvas(windowWidth, windowHeight);
  timer = setInterval(() => {
    time--
  }, 1000);

  base = 1;

  count = 0;
  possiblescore = 0;
  score = 0;
  accuracy = 0;
  
  back = new Sprite(100, 0 + windowHeight/20, windowWidth/15, windowHeight/20, "k");
  back.color = "#89C";
  back.text = "Back";
  back.textSize = "18";
  back.strokeColor = "white";
  back.textColor = "white";

  display = new Sprite(windowWidth - windowWidth/14, 0 + windowHeight/20, windowWidth/6, windowHeight/10, "k");
  display.text = "Score: " + score + "\n Accuracy: " + accuracy + "%" + "\n Time: " + time;;
  display.textColor = "white";
  display.textSize = "18";
  display.color = "#89C";
  display.strokeColor = "white";
  
  finalshow = new Sprite(windowWidth/2, windowHeight/2, windowWidth/3, windowHeight/3, "static");
  finalshow.color = "#89C";
  finalshow.text = "Game over" + "\n" + "Start new by clicking anywhere within the border" + "\n" + "Score: " + score + "\n Accuracy: " + accuracy + "%";
  finalshow.strokeColor = "black";
  finalshow.textColor = "white";
  finalshow.visible = false;
  finalshow.collider = "n";
  
  
  world.gravity.y = base;
  
  basket = new Sprite(windowWidth/2, windowHeight - windowHeight/20, windowWidth/5, 10, "static");
  basket.collider = "d";
  basket.color = "beige";
  
  item = new Group();
  item.collider = "k";
  item.color = "yellow";
  item.diameter = 15;
  item.strokeColor = "yellow"
  item.img = "images/coin.png"
  
  bang = new Group();
  bang.collider = "k";
  bang.color = "red";
  bang.strokeColor = "red";
  bang.diameter = 15;
  bang.image = "images/boom.png"
}

function draw(){
  background("#89C")
  movebasket();
  spawnitem();
  removeitem();
  hoversss();
  gameoverr();
}

function hoversss(){
  if(back.mouse.hovering()){
    mouse.cursor = "pointer";
    back.color = "white";
    back.textColor = "black";
  }
  else{
    mouse.cursor = "default";
    back.color = "#89C";
    back.textColor = "white";
  }

  if(back.mouse.presses()){
    window.location.href = "index.html";
  }

  display.text = "Score: " + score + "\n Accuracy: " + accuracy + "%" + "\n Time: " + time;;

  if(finalshow.mouse.hovering()){
    finalshow.color = "#89CFF0";
    mouse.cursor = "pointer";
  }
  else{
    finalshow.color = "#89C";
    mouse.cursor = "default";
  }

  if(finalshow.mouse.presses()){
    score = 0;
    possiblescore = 0;
    base = 1;
    count = 0;
    time = 60;

    finalshow.visible = false;
    finalshow.collider = "n";
    
    timer = setInterval(() => {
      time--
    }, 1000);
    
    gameover = false;
  }
}

function movebasket(){
  // something wrong with this next if statement causing box to show early.
  if(!time > 0){
    gameover = true;
  }

  basket.x = mouse.x;
  basket.y = windowHeight - windowHeight/20;
}

function spawnitem(){
  if(!gameover){
    if(frameCount % 60 == 0){
      let b = new item.Sprite(random(width), -10);
      b.vel.y = random(1, 5);
      count++
      if(count == 2){
        let c = new bang.Sprite(random(width), -10); 
        c.vel.y = (random(1, 10))
        c.color = "red";
        c.strokeColor = "red";
        count = 0;
      }
      possiblescore++
    }
  }
}

function removeitem(){
  for(i of item){
    if(i.y > windowHeight){
      i.remove();
    }
    else if(i.overlapping(basket)>0){
      i.remove();
      score++
      possiblescore++
    }
  }
  for(b of bang){
    if(b.y > windowHeight){
      b.remove();
    }
    else if(b.overlapping(basket)>0){
      b.remove();
      score = parseInt(score / 2);
    }
  }
  console.log(score + " " + possiblescore + " " + accuracy)
  accuracy = parseInt((score/(possiblescore - item.length)*100) * 2);
  if(!accuracy){
    accuracy = 100;
  }
}

function gameoverr(){
  if(gameover){
    clearInterval(timer)
    item.removeAll();
    bang.removeAll();

    if(score > highscore){
      highscore = score;
    }
    
    finalshow.visible = true;
    finalshow.collider = "k";
    finalshow.text = "Game over" + "\n" + "Start new by clicking anywhere within the border" + "\n" + "Score: " + score + "\n Accuracy: " + accuracy + "%" + "\n Highscore: " + highscore;
    
  }
}