let bg;
let player;
let enemy;
let en;
playerdead= false
let score
function scorecount(){
    if (playerdead = false){
        score +=1
    }

}
function movement(){
    if (kb.pressing("shift")){
        if (kb.pressing("A")){
            player.vel.x=-12
        }
        else if (kb.pressing("D")){
            player.vel.x=12
        }
        else{
            player.vel.x=0
        }
        if (kb.pressing("W")){
            player.vel.y=-12
        }
        else if (kb.pressing("S")){
            player.vel.y=12
        }
        else{
            player.vel.y=0
        }
    }

    if (!kb.pressing("shift")){
    if (kb.pressing("A")){
        player.vel.x=-5
    }
    else if (kb.pressing("D")){
        player.vel.x=5
    }
    else{
        player.vel.x=0
    }
    if (kb.pressing("W")){
        player.vel.y=-5
    }
    else if (kb.pressing("S")){
        player.vel.y=5
    }
    else{
        player.vel.y=0
    }
}
}


function preload(){
    bg = loadImage("assets/road.png")
}

let interavl1;


function setup(){
createCanvas(windowWidth,windowHeight)



player = new Sprite(windowWidth/2,windowHeight-130,10,10,"d");
player.img = "assets/car.png"
player.scale = (windowWidth/800)/8
player.rotation = 270;
player.width = 800*player.scale;
player.height = 397*player.scale;
player.debug = true;


enemy = new Group();
enemy.img = "assets/enemy.png"
enemy.scale =(windowWidth/800)/8
enemy.rotation= 270
enemy.debug= true

interavl1 = setInterval(() => {
    if(enemy){
            if(enemy.length < 6){
                spawnenemy();
            }
    }
}, 1000)
}


function draw(){
background(bg)
movement()
enemymovement()
enemycollide()
textSize(30)
text(score,windowWidth/2,20)
}
function enemymovement(){
    for(e of enemy){
        e.vel.y=1.3
        if (e.y>windowHeight){
            e.remove()
        }
    }
}
function enemycollide(){
    for (e of enemy){
        if (e.collides(player)){
            e.remove()
            endofgame()
        }
    }
}
function endofgame(){
    for (e of enemy){
        e.vel.y=0
        playerdead = true
    }
}

function spawnenemy(){
    if(enemy.length<6){
            let en = new enemy.Sprite(random(0,windowWidth),random(0,300),10,10,"d")
            en.width=800*en.scale
            en.height=400*en.scale
    }
}