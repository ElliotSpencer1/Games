// defining the basics;
var player, timeplayed, textbox;
var base;
var health;
var Z, mleft, mright;
var game, firstpass;

// enemies
var spawnontop, firework, bigblueboy, redsmall, driftingreds, invincibility, healthdrop;
var canspawnontop, canspawnbigblue, canspawnfirework,cansmallred, candriftingreds, canhealthdrop, caninvincibility, isinvincibility;
var R, RR, RRR, RRRR, RRRRR, RRRRRR;
var big, bighealth, finaltime, timehighscore;
var set1, set2, set3, set4, set5, set6, set7, set8, set9, set10, set11;
var flip, flop, backwards, explosion;


// startup items
var skillshop, startbutton, placeholder, textplacehold, skillshopmenutime;

// if the skills can be performed (cooldowns);

var candos1, candos2, candos3, candos4, candos5, candos6;

candos1 = true;
candos2 = true;
candos3 = true;
candos4 = true;
candos5 = true;
candos6 = true;

//skillshop items

var s1, s2, s3, s4, s5, s6;
var bs1, bs2, bs3, bs4, bs5, bs6;
var is1, is2, is3, is4, is5, is6;
var ts1, ts2, ts3, ts4, ts5, ts6;
var ps1, ps2, ps3, ps4, ps5, ps6;
var skillshoptextbox;

// the ability to be used (below) from left to right then down and same for the bottom row of skillshop.

s1 = true;
s2 = false;
s3 = false;
s4 = false;
s5 = false;
s6 = false;

// ability sprites if needed

var Seradicator;

// end of ability sprites

// end of ability to be used

base = 5;
timeplayed = 0;
mleft = false;
mright = true;
caninvincibility = false;
isinvincibility = false;
game = false;
firstpass = false;
finaltime = 0;
timehighscore = 0;
flip = true;
flop = false;
skillshopmenutime = false;

function setup(){
    new Canvas(windowWidth, windowHeight);

    big = new Group();

    console.log(windowWidth/2 + " " + windowHeight/2)

    spawnontop = new Group();
    spawnontop.width = 40;
    spawnontop.collider = "k";
    spawnontop.height = 40;
    spawnontop.color = "yellow";
    spawnontop.rotationLock = true;

    firework = new Group();
    firework.width = 15;
    firework.height = 15;
    firework.color = "purple";
    firework.collider = "k";
    firework.rotationLock = true;

    redsmall = new Group();
    redsmall.width = 15;
    redsmall.height = 15;
    redsmall.color = "red";
    redsmall.collider = "k";
    redsmall.rotationLock = true;

    //make sure bigblueboy is at the top to make sure everything comes before as it is massive
    bigblueboy = new Group();
    bigblueboy.collider = "k";
    bigblueboy.width = windowWidth/2;
    bigblueboy.height = windowHeight/2;
    bigblueboy.image = "Images/meteor.png";
    bigblueboy.scale = ((windowWidth/2) / 500);
    bigblueboy.rotationLock = true;
    bigblueboy.color = "cyan";

    driftingreds = new Group();
    driftingreds.collider = "k";
    driftingreds.width = 5;
    driftingreds.height = 90;
    driftingreds.color = "red";

    healthdrop = new Group();
    healthdrop.width = 40;
    healthdrop.height = 40;
    healthdrop.image = ("Images/Health.png");
    healthdrop.color = "green";
    healthdrop.collider = "k";
    healthdrop.rotationLock = true;

    invincibility = new Group();
    invincibility.width = 40;
    invincibility.height = 40;
    invincibility.image = "Images/shield.png"
    invincibility.color = "blue";
    invincibility.collider = "k";
    invincibility.rotationLock = true;

    explosion = new Group();
    explosion.x = windowWidth/2;
    explosion.y = windowHeight/2
    explosion.height = windowHeight;
    explosion.width = windowWidth;
    explosion.image = "Images/explo.png";
    explosion.scale = windowHeight / 500;
    explosion.collider = "n";
    explosion.rotationLock = true;

    Seradicator = new Group();
    Seradicator.x = windowWidth/2;
    Seradicator.y = 0;
    Seradicator.diameter = 10;
    Seradicator.collider = "static";
    Seradicator.rotationLock = true;
    Seradicator.color = "cyan";
}

function startup(){

    if(!firstpass){
        player = new Sprite(windowWidth/2, windowHeight - 20, 40,40, "d");
        player.color = "white";
        player.rotationLock = true;

        textbox = new Sprite(70, 30, 200, 100, "n")
        textbox.color = "black";
        textbox.text = "Time Alive: 0";
        textbox.textColor = "white";
        textbox.textSize = "20";

        set1 = setInterval(() => {
            timeplayed++
            player.y = windowHeight - 20;
        }, 1000);

        set2 = setInterval(() => {
            canspawnontop = true;
        }, 5000);

        set3 = setInterval(() => {
            canspawnbigblue = true;
        }, 10000);

        set4 = setInterval(() => {
            canspawnfirework = true;
        }, 7500);

        set5 = setInterval(() => {
            cansmallred = true;
        }, 250);

        set6 = setInterval(() => {
            candriftingreds = true;
        }, 3000);

        set7 = setInterval(() => {
            canhealthdrop = true
        }, 2000);

        set8 = setInterval(() => {
            if(mleft){
                mright = true;
                mleft = false;
            }
            if(mright){
                mleft = true;
                mright = false;
            }
        }, 750);

        set9 = setInterval(() => {
            caninvincibility = true;
        }, 20000)

        health = 100;
        firstpass = true;
    }
}

function notgamestartup(){
    if(!firstpass){

        skillshop = new Sprite(windowWidth/2, windowHeight/2, windowWidth/8, windowHeight/10, "s");
        skillshop.color = "crimson";
        skillshop.text = "Skills!";
        skillshop.textColor = "Black";
        skillshop.textSize = "35";

        startbutton = new Sprite(windowWidth/2, skillshop.y - skillshop.h * 1.5, windowWidth/8, windowHeight/10, "s");
        startbutton.color = "crimson";
        startbutton.text = "Start!";
        startbutton.textColor = "Black";
        startbutton.textSize = "35";

        textplacehold = new Sprite(startbutton.x - startbutton.w, startbutton.y - startbutton.h/1.5, startbutton.w, startbutton.h, "s");
        textplacehold.color = "black";
        textplacehold.rotation = 315;
        textplacehold.textColor = "crimson";
        textplacehold.textSize = "45";
        textplacehold.text = "Best Time: " + timehighscore + "\n" + "Last Time: " + finaltime;

        firstpass = true;
    }
}

function notgamestartupsdraw(){
    if(startbutton.mouse.hovering()){
        startbutton.color = "red";
        startbutton.textColor = "white";
        mouse.cursor = "pointer";

    }
    if(!startbutton.mouse.hovering()){
        startbutton.color = "Crimson";
        startbutton.textColor = "Black";

    }
    if(skillshop.mouse.hovering()){
        skillshop.color = "red";
        skillshop.textColor = "white";
        mouse.cursor = "pointer";

    }
    if(!skillshop.mouse.hovering()){
        skillshop.color = "crimson";
        skillshop.textColor = "Black";
    }


    if(startbutton.mouse.pressed()){
        mouse.cursor = "default";
        startbutton.remove();
        skillshop.remove();
        textplacehold.remove();

        game = true;
        firstpass = false;
    }

    if(skillshop.mouse.pressed()){
        mouse.cursor = "default";
        startbutton.remove();
        skillshop.remove();
        textplacehold.remove();

        backwards = new Sprite(windowWidth/15, windowHeight/15, windowWidth/9, windowHeight/15);
        backwards.color = "crimson";
        backwards.textColor = "black";
        backwards.textSize = "40";
        backwards.text = "Back!"

        skillshopmenutime = true;
        game = false;

        // skillshoptextbox below

        skillshoptextbox = new Sprite(windowWidth/2, backwards.y, windowWidth/4, 30, "s");
        skillshoptextbox.color = "black";
        skillshoptextbox.textColor = "white";
        skillshoptextbox.textSize = 30;
        skillshoptextbox.text = "Best time: " + timehighscore + "!";


        // end of skillshop textbox

        // here is where the shop layout should be made for new skills and the new skills will need to be implemented directly into the code (probably using the shift feature);
        // create a back button to return to the main game page.

        // items for shop

        // var s1, s2, s3, s4, s5, s6; basically unneeded just the booleans which define which skill is being used
        // var bs1, bs2, bs3, bs4, bs5, bs6;
        // var is1, is2, is3, is4, is5, is6;
        // var ts1, ts2, ts3, ts4, ts5, ts6;
        // var ps1, ps2, ps3, ps4, ps5, ps6;

        // backgrounds below

        bs2 = new Sprite(windowWidth/2, windowHeight/3, windowWidth/4, windowHeight/3, "s");
        bs2.color = "crimson";
        
        bs1 = new Sprite(bs2.x - (bs2.width * 1.25), bs2.y, windowWidth/4, windowHeight/3, "s");
        bs1.color = "crimson";

        bs3 = new Sprite(bs2.x + (bs2.width * 1.25), bs2.y, windowWidth/4, windowHeight/3, "s");
        bs3.color = "crimson";

        bs4 = new Sprite(bs1.x, bs1.y * 2.1, windowWidth/4, windowHeight/3, "s");
        bs4.color = "crimson";

        bs5 = new Sprite(bs2.x, bs4.y, windowWidth/4, windowHeight/3, "s");
        bs5.color = "crimson";

        bs6 = new Sprite(bs3.x, bs4.y, windowWidth/4, windowHeight/3, "s");
        bs6.color = "crimson";

        // background end

        // start of images

        // end of images

        // start of text

        ts1 = new Sprite(bs1.x, bs1.y, bs1.w * 7/8, bs1.h * 1/2, "s");
        ts1.text = "Sprint!";
        ts1.color = "black";
        ts1.textColor = "white";
        ts1.textSize = "40";
        
        ts2 = new Sprite(bs2.x, bs1.y, bs1.w * 7/8, bs1.h * 1/2, "s");
        ts2.text = "Teleport!";
        ts2.color = "black";
        ts2.textColor = "white";
        ts2.textSize = "40";

        ts3 = new Sprite(bs3.x, bs3.y, bs1.w * 7/8, bs1.h * 1/2, "s");
        ts3.text = "TBA";
        ts3.color = "black";
        ts3.textColor = "white";
        ts3.textSize = "40";

        ts4 = new Sprite(bs4.x, bs4.y, bs1.w * 7/8, bs1.h * 1/2, "s");
        ts4.text = "TBA";
        ts4.color = "black";
        ts4.textColor = "white";
        ts4.textSize = "40";

        ts5 = new Sprite(bs5.x, bs5.y, bs1.w * 7/8, bs1.h * 1/2, "s");
        ts5.text = "TBA";
        ts5.color = "black";
        ts5.textColor = "white";
        ts5.textSize = "40";

        ts6 = new Sprite(bs6.x, bs6.y, bs1.w * 7/8, bs1.h * 1/2, "s");
        ts6.text = "Eradicator!";
        ts6.color = "black";
        ts6.textColor = "white";
        ts6.textSize = "40";

        // end of text

        // start of purchase buttons

        ps1 = new Sprite(ts1.x, ts1.y * 1.375, ts1.w, bs1.h * 3/16, "s")
        ps1.color = "green";
        ps1.text = "Equipped";
        ps1.textColor = "black";
        ps1.textSize = "20";

        ps2 = new Sprite(ts2.x, ts1.y * 1.375, ts1.w, bs1.h * 3/16, "s")
        ps2.color = "red";
        ps2.text = "Best Time: 40 Req";
        ps2.textColor = "black";
        ps2.textSize = "20";

        ps3 = new Sprite(ts3.x, ts1.y * 1.375, ts1.w, bs1.h * 3/16, "s")
        ps3.color = "red";
        ps3.text = "Best Time: 80 Req";
        ps3.textColor = "black";
        ps3.textSize = "20";

        ps4 = new Sprite(ts4.x, ts4.y + ts4.h * 0.75, ts1.w, bs1.h * 3/16, "s")
        ps4.color = "red";
        ps4.text = "Best Time: 120 Req";
        ps4.textColor = "black";
        ps4.textSize = "20";

        ps5 = new Sprite(ts5.x, ts4.y + ts4.h * 0.75, ts1.w, bs1.h * 3/16, "s")
        ps5.color = "red";
        ps5.text = "Best Time: 250 Req";
        ps5.textColor = "black";
        ps5.textSize = "20";

        ps6 = new Sprite(ts6.x, ts4.y + ts4.h * 0.75, ts1.w, bs1.h * 3/16, "s")
        ps6.color = "red";
        ps6.text = "Best Time: 400 Req";
        ps6.textColor = "black";
        ps6.textSize = "20";
    }

    if(flip){
        if(textplacehold.textSize <= 45){
            textplacehold.textSize--
        }
        if(textplacehold.textSize == 20){
            flop = true;
            flip = false;
        }
    }
    if(flop){
        if(textplacehold.textSize >= 20){
            textplacehold.textSize++
        }
        if(textplacehold.textSize == 45){
            flip = true;
            flop = false;
        }
    }

    if(textplacehold > 45){
        flip = true;
        flop = false;
    }
    if(textplacehold < 20){
        flop = true;
        flip = false;
    }

    if(kb.pressing("r")){
        textplacehold.textSize = 30;
    }

    // if(placeholder.mouse.hovering()){
    //     placeholder.color = "red";
    //     placeholder.textColor = "white";
    //     mouse.cursor = "pointer";

    // }
    // if(!placeholder.mouse.hovering()){
    //     placeholder.color = "crimson";
    //     placeholder.textColor = "Black";

    // }
    if((!skillshop.mouse.hovering()) && (!startbutton.mouse.hovering())){
        mouse.cursor = "default";
    }

    big.removeAll();
    explosion.removeAll();
    

}

function skillshoparea(){
    if(ps1.mouse.hovering()){
        if(s1){
            ps1.textColor = "white";
        }
        if(!s1){
            ps1.color = "yellow";
            ps1.textColor = "black";
        }
        mouse.cursor = "pointer";
    }
    if(ps2.mouse.hovering()){
        if(s2){
            ps2.textColor = "white";
        }
        if(!s2){
            ps2.color = "yellow";
            ps2.textColor = "black";
        }
    }
    if(ps3.mouse.hovering()){
        if(s3){
            ps3.textColor = "white";
        }
        if(!s3){
            ps3.color = "yellow";
            ps3.textColor = "black";
        }
    }
    if(ps4.mouse.hovering()){
        if(s4){
            ps4.textColor = "white";
        }
        if(!s4){
            ps4.color = "yellow";
            ps4.textColor = "black";
        }
    }
    if(ps5.mouse.hovering()){
        if(s5){
            ps5.textColor = "white";
        }
        if(!s5){
            ps5.color = "yellow";
            ps5.textColor = "black";
        }
    }
    if(ps6.mouse.hovering()){
        if(s6){
            ps6.textColor = "white";
        }
        if(!s6){
            ps6.color = "yellow";
            ps6.textColor = "black";
        }
    }
    if((!ps1.mouse.hovering()) && (!ps2.mouse.hovering()) && (!ps3.mouse.hovering()) && (!ps4.mouse.hovering()) && (!ps5.mouse.hovering()) && (!ps6.mouse.hovering())){
        if(s1){
            ps1.textColor = "black";
            ps1.color = "green";
            ps1.text = "Equipped";
        }
        if(!s1){
            ps1.textColor = "black";
            ps1.color = "red";
            ps1.text = "Best time: 0 Req";
        }
        if(s2){
            ps2.textColor = "black";
            ps2.color = "green";
            ps2.text = "Equipped";
        }
        if(!s2){
            ps2.textColor = "black";
            ps2.color = "red";
            ps2.text = "Best time: 40 Req";
        }
        if(s3){
            ps3.textColor = "black";
            ps3.color = "green";
            ps3.text = "Equipped";
        }
        if(!s3){
            ps3.textColor = "black";
            ps3.color = "red";
            ps3.text = "Best time: 80 Req";
        }
        if(s4){
            ps4.textColor = "black";
            ps4.color = "green";
            ps4.text = "Equipped";
        }
        if(!s4){
            ps4.textColor = "black";
            ps4.color = "red";
            ps4.text = "Best time: 120 Req";
        }
        if(s5){
            ps5.textColor = "black";
            ps5.color = "green";
            ps5.text = "Equipped";
        }
        if(!s5){
            ps5.textColor = "black";
            ps5.color = "red";
            ps5.text = "Best time: 250 Req";
        }
        if(s6){
            ps6.textColor = "black";
            ps6.color = "green";
            ps6.text = "Equipped";
        }
        if(!s6){
            ps6.textColor = "black";
            ps6.color = "red";
            ps6.text = "Best time: 400 Req";
        }
        mouse.cursor = "default";
    }

    if(ps1.mouse.pressed()){
        s1 = true;
        s2 = false;
        s3 = false;
        s4 = false;
        s5 = false;
        s6 = false;
    }
    if(ps2.mouse.pressed()){
        if(timehighscore >= 40){
            s1 = false;
            s2 = true;
            s3 = false;
            s4 = false;
            s5 = false;
            s6 = false;
        }
        else{
            // here onward code pal
            skillshoptextbox.textColor = "red";
            skillshoptextbox.textSize = "40";
            setTimeout(() => {
                skillshoptextbox.textColor = "white";
                skillshoptextbox.textSize = "30";
                setTimeout(() => {
                    skillshoptextbox.textColor = "red";
                    skillshoptextbox.textSize = "40";
                    setTimeout(() => {
                        skillshoptextbox.textColor = "white";
                        skillshoptextbox.textSize = "30";
                        setTimeout(() => {
                            skillshoptextbox.textColor = "red";
                            skillshoptextbox.textSize = "40";
                            setTimeout(() => {
                                skillshoptextbox.textColor = "white";
                                skillshoptextbox.textSize = "30";
                            },250)
                        },250)
                    },250)
                },250)
            },250)
        }
    }
    if(ps3.mouse.pressed()){
        if(timehighscore >= 80){
            s1 = false;
            s2 = false;
            s3 = true;
            s4 = false;
            s5 = false;
            s6 = false;
        }
        else{
            // here onward code pal
            skillshoptextbox.textColor = "red";
            skillshoptextbox.textSize = "40";
            setTimeout(() => {
                skillshoptextbox.textColor = "white";
                skillshoptextbox.textSize = "30";
                setTimeout(() => {
                    skillshoptextbox.textColor = "red";
                    skillshoptextbox.textSize = "40";
                    setTimeout(() => {
                        skillshoptextbox.textColor = "white";
                        skillshoptextbox.textSize = "30";
                        setTimeout(() => {
                            skillshoptextbox.textColor = "red";
                            skillshoptextbox.textSize = "40";
                            setTimeout(() => {
                                skillshoptextbox.textColor = "white";
                                skillshoptextbox.textSize = "30";
                            },250)
                        },250)
                    },250)
                },250)
            },250)
        }
    }
    if(ps4.mouse.pressed()){
        if(timehighscore >= 40){
            s1 = false;
            s2 = false;
            s3 = false;
            s4 = true;
            s5 = false;
            s6 = false;
        }
        else{
            // here onward code pal
            skillshoptextbox.textColor = "red";
            skillshoptextbox.textSize = "40";
            setTimeout(() => {
                skillshoptextbox.textColor = "white";
                skillshoptextbox.textSize = "30";
                setTimeout(() => {
                    skillshoptextbox.textColor = "red";
                    skillshoptextbox.textSize = "40";
                    setTimeout(() => {
                        skillshoptextbox.textColor = "white";
                        skillshoptextbox.textSize = "30";
                        setTimeout(() => {
                            skillshoptextbox.textColor = "red";
                            skillshoptextbox.textSize = "40";
                            setTimeout(() => {
                                skillshoptextbox.textColor = "white";
                                skillshoptextbox.textSize = "30";
                            },250)
                        },250)
                    },250)
                },250)
            },250)
        }
    }
    if(ps5.mouse.pressed()){
        if(timehighscore >= 40){
            s1 = false;
            s2 = false;
            s3 = false;
            s4 = false;
            s5 = true;
            s6 = false;
        }
        else{
            // here onward code pal
            skillshoptextbox.textColor = "red";
            skillshoptextbox.textSize = "40";
            setTimeout(() => {
                skillshoptextbox.textColor = "white";
                skillshoptextbox.textSize = "30";
                setTimeout(() => {
                    skillshoptextbox.textColor = "red";
                    skillshoptextbox.textSize = "40";
                    setTimeout(() => {
                        skillshoptextbox.textColor = "white";
                        skillshoptextbox.textSize = "30";
                        setTimeout(() => {
                            skillshoptextbox.textColor = "red";
                            skillshoptextbox.textSize = "40";
                            setTimeout(() => {
                                skillshoptextbox.textColor = "white";
                                skillshoptextbox.textSize = "30";
                            },250)
                        },250)
                    },250)
                },250)
            },250)
        }
    }
    if(ps6.mouse.pressed()){
        if(timehighscore >= 40){
            s1 = false;
            s2 = false;
            s3 = false;
            s4 = false;
            s5 = false;
            s6 = true;
        }
        else{
            // here onward code pal
            skillshoptextbox.textColor = "red";
            skillshoptextbox.textSize = "40";
            setTimeout(() => {
                skillshoptextbox.textColor = "white";
                skillshoptextbox.textSize = "30";
                setTimeout(() => {
                    skillshoptextbox.textColor = "red";
                    skillshoptextbox.textSize = "40";
                    setTimeout(() => {
                        skillshoptextbox.textColor = "white";
                        skillshoptextbox.textSize = "30";
                        setTimeout(() => {
                            skillshoptextbox.textColor = "red";
                            skillshoptextbox.textSize = "40";
                            setTimeout(() => {
                                skillshoptextbox.textColor = "white";
                                skillshoptextbox.textSize = "30";
                            },250)
                        },250)
                    },250)
                },250)
            },250)
        }
    }

    if(backwards.mouse.hovering()){
        backwards.color = "red";
        backwards.textColor = "white";
        mouse.cursor = "pointer";
    }

    if(!backwards.mouse.hovering()){
        backwards.color = "crimson";
        backwards.textColor = "black";
        mouse.cursor = "default";
    }

    if(backwards.mouse.pressed()){
        backwards.remove();
        // background sprites;
        bs1.remove();
        bs2.remove();
        bs3.remove();
        bs4.remove();
        bs5.remove();
        bs6.remove();
        // text sprites;
        ts1.remove();
        ts2.remove();
        ts3.remove();
        ts4.remove();
        ts5.remove();
        ts6.remove();
        // the purchase buttons;
        ps1.remove();
        ps2.remove();
        ps3.remove();
        ps4.remove();
        ps5.remove();
        ps6.remove()
        textplacehold.textSize = 30;
        skillshoptextbox.remove()

        firstpass = false;
        skillshopmenutime = false;
        game = false;
    }

}

function draw(){
    background(0);

    if(!game && skillshopmenutime){
        skillshoparea();
    }

    if(!game && !skillshopmenutime){
        notgamestartup();
        notgamestartupsdraw();
    }

    if(game){
        startup();
        movement();
        textboxupdater();
        enemyspawner();
        backgroundinteractions();
        gooditems();
    }
}

function backgroundinteractions(){
    if(player){
        player.y = windowHeight - 20

        if(player.x >= windowWidth){
            player.x = windowWidth - 20;
        }

        if(player.x <= 0){
            player.x = 20
        }
    }

    if(health > 2000){
        health = 2000;
    }

    if(health <= 0){
        player.remove();
        textbox.remove();
        big.removeAll();
        spawnontop.removeAll();
        firework.removeAll();
        redsmall.removeAll();
        bigblueboy.removeAll();
        driftingreds.removeAll();
        healthdrop.removeAll();
        invincibility.removeAll();
        Seradicator.removeAll();

        clearInterval(set1);
        clearInterval(set2);
        clearInterval(set3);
        clearInterval(set4);
        clearInterval(set5);
        clearInterval(set6);
        clearInterval(set7);
        clearInterval(set8);
        clearInterval(set9);
        clearInterval(set10);


        finaltime = timeplayed;
        if(finaltime > timehighscore){
            timehighscore = finaltime;
        }

        textplacehold.textSize = 30;

        mleft = false;
        mright = true;
        caninvincibility = false;
        isinvincibility = false;
        timeplayed = 0;
        health = 100;

        game = false;
        firstpass = false;
    }
}

function gooditems(){
    //healthdrop
    if(canhealthdrop){
        let P = new healthdrop.Sprite(random(0, windowWidth), 30);
        
        canhealthdrop = false;
    }

    for(h of healthdrop){
        if(mleft){
            h.moveTo(random(0, windowWidth), windowHeight, 5);
        }
        if(mright){
            h.moveTo(random(0, windowWidth), windowHeight, 5);
        }

        if(h.colliding(player)){
            health+= 20;
            h.remove();
        }
        if(h.y >= windowHeight){
            h.remove();
        }
    }

        // end healthdrop

        //invincibility

        if(caninvincibility){
            let I = new invincibility.Sprite(random(0, windowWidth), 30);

            caninvincibility = false;
        }

    for(n of invincibility){
        if(mleft){
            n.moveTo(random(0, windowWidth), windowHeight, 5);
        }
        if(mright){
            n.moveTo(random(0, windowWidth), windowHeight, 5);
        }
    
        if(n.colliding(player)){
            bighealth = health;
            isinvincibility = true;

            setTimeout(() => {
                isinvincibility = false;
            }, 10000)


            n.remove();
        }
        if(n.y >= windowHeight){
            n.remove();
        }
        if(isinvincibility){
            if(health <= 200){
                health = 200;
            }
            else{
                health+=200;
            }
        }

    }
}


function enemyspawner(){
    //yellow thing
    if(canspawnontop){
        let x = new spawnontop.Sprite(player.x, 10);
        setTimeout(() => {
            x.x = player.x;
            x.y = 10;
            setTimeout(() => {
                x.moveTo(player, 50)
            }, 500)
        }, 2000)

        canspawnontop = false;
    }

    for(s of spawnontop){
        if(s.y >= windowHeight - player.height/2){
            s.remove();
            console.log("z")
        }

        if(player.colliding(s)){
            console.log("b")
            let v = player.x;
            s.remove();
            health += -20;
            player.y = windowHeight - 20;
            setTimeout(() => {
                player.speed = 0;
                player.vel.x = 0;
                player.vel.y = 0;
                player.y = windowHeight - 20;
                player.x = v;
            }, 20)
        }
    }
    // end of yellow thing

    // big Blue Thing

    if(canspawnbigblue){
        if(Z != 1 && Z != 2){
            Z = random(1, 2)
            Z = Math.round(Z);
        }
        else if(Z == 1){
            Z = 2;
        }
        else if(Z == 2){
            Z = 1;
        }
        console.log("start")
        if(Z == 1){
            console.log("1")
            let ZZ = new bigblueboy.Sprite(windowWidth, 0);
            ZZ.moveTo(0, windowHeight, 8)
            setTimeout(() => {
                ZZ.remove();
            }, 5000);
        }
        if(Z == 2){
            console.log("2")
            let XX = new bigblueboy.Sprite(0, 0);
            XX.rotation = 270
            XX.moveTo(windowWidth, windowHeight, 8);
            setTimeout(() => {
                XX.remove();
            },5000)
        }

        console.log("exit")
        canspawnbigblue = false;
    }

    for(b of bigblueboy){
        if(b.colliding(player)){
            let V = player.x;
            b.remove();
            let MM = new explosion.Sprite(windowWidth/2, windowHeight/2);
            setTimeout(() => {
                for(e of explosion){
                    e.remove();
                }
            }, 2000)
            health += -50;
            player.y = windowHeight - 20;
            setTimeout(()=>{
                player.vel.x = 0;
                player.vel.y = 0;
                player.x = V;
                player.y = windowHeight - 20;
            },20)
        }
        if(b.y - b.height/2 > windowHeight){
            b.remove();
        }
    }

    // end of big blue
    // firework

    if(canspawnfirework){
        let b = new firework.Sprite(windowWidth/2, 10);
        b.moveTo(windowWidth/2, windowHeight * 1/3, 4);

        canspawnfirework = false;
    }

    for(f of firework){
        if(f.y >= windowHeight * 1/3){
            setTimeout(() => {
                f.color = "white";
                setTimeout(() => {
                    f.color = "gray";
                    setTimeout(() => {
                        f.color = "white";
                        setTimeout(() => {
                            f.color = "gray";
                            setTimeout(() => {
                                f.color = "white";
                                setTimeout(() => {
                                    f.color = "gray";
                                    if(f.y >= windowHeight * 1/3){
                                        let R = new big.Sprite(f.x - f.width, f.y, 10);
                                        R.moveTo(-10,windowHeight,5);
                                        R.life = 300;
                                        R.collider = "k";
                                        R.color = "red";

                                        let RR = new big.Sprite(f.x - f.w, f.y + f.height, 10);
                                        RR.moveTo(windowWidth/8,windowHeight + 50, 5);
                                        RR.life = 300;
                                        RR.collider = "k";
                                        RR.color = "red";

                                        let RRR = new big.Sprite(f.x, f.y + f.height, 10);
                                        RRR.moveTo(windowWidth/3, windowHeight + 50, 5);
                                        RRR.life = 300;
                                        RRR.collider = "k";
                                        RRR.color = "red";

                                        let RRRR = new big.Sprite(f.x, f.y + f.height, 10);
                                        RRRR.moveTo(windowWidth/1.8, windowHeight + 50, 5);
                                        RRRR.life = 300;
                                        RRRR.collider = "k";
                                        RRRR.color = "red";

                                        let RRRRR = new big.Sprite(f.x + f.w, f.y +f.height, 10);
                                        RRRRR.moveTo(windowWidth/1.5, windowHeight + 50, 5);
                                        RRRRR.life = 300;
                                        RRRRR.collider = "k";
                                        RRRRR.color = "red";

                                        let RRRRRR = new big.Sprite(f.x + f.w, f.y, 10);
                                        RRRRRR.moveTo(windowWidth + 10, windowHeight + 50, 5);
                                        RRRRRR.life = 300;
                                        RRRRRR.collider = "k";
                                        RRRRRR.color = "red";

                                        f.remove();
                                    }
                                }, 750)
                            }, 750)
                        }, 750)
                    }, 750)
                }, 750)
            }, 750)
        }
    }
    
    for(b of big){
        if(b.colliding(player)){
            health += -5;
            b.remove();
            player.vel.x = 0;
        }
    }

    // end of firework

    //small red

    if(cansmallred){
        let L = new redsmall.Sprite(random(0, windowWidth), 0);


        cansmallred = false;

    }

    for(s of redsmall){

        let LL = 0;
        let LLL = 0;
        LL = player.x;
        LLL = player.y;

        if(s.y <= windowHeight/2){
            s.moveTo(LL, LLL + 20, 4)
        }

        if(s.y >= player.y - 10){
            s.remove();
        }
        if(s.colliding(player)){
            health += -20;
            s.remove();
        }
    }

    // end of small red
    // drifting reds

    if(candriftingreds){
        let M = new driftingreds.Sprite(random(0, windowWidth), 11);

        candriftingreds = false;
    }

    for(d of driftingreds){
        if(d.colliding(player)){
            d.remove();
            health += -5;
        }


        if((d.x >= windowWidth/2) && (d.y <= 10)){
            d.moveTo(-10, -20, 5);
            setTimeout(() =>{
                d.moveTo(windowWidth + 10, 0, 5);
            }, 2000)
        }

        if((d.x < windowWidth/2) && (d.y <= 10)){
            d.moveTo(windowWidth +10, 0, 5);
            setTimeout(() => {
                d.moveTo(-10, -20, 5);
            }, 2000)
        }

        d.x += random(-2,2);
        d.y+=2;
        d.rotation++;
    }

    // end of drifting reds

}

function textboxupdater(){
    if(textbox){
        textbox.text = "Time Alive: " + timeplayed + "\n" + "Health: " + health + " ";
    }
}

function movement(){
    if(player){
        if((keyboard.pressing("left")) && (player.x - player.width/2 > 0)){
            player.x -= base;
        }
        if((keyboard.pressing("right")) && (player.x + player.width/2 < windowWidth)){
            player.x += base;
        }
        if(keyboard.pressing("shift")){
            if(s1){
                base = 10;
            }
            else if(s2 && candos2){
                if(kb.pressing("a")){
                    player.x -= 200;
                }
                else{
                    player.x += 200;
                }
                candos2 = false;
                setTimeout(() => {
                    candos2 = true;
                }, 1000);
            }
            else if(s3){

            }
            else if(s4){

            }
            else if(s5){

            }
            else if(s6 && candos6){
                //eradicator code
                let BB = new Seradicator.Sprite(player.x, player.y);
                let MMMMX = player.x;
                let MMMMY = player.y;
                player.remove();
                player = new Sprite(MMMMX, MMMMY, 40,40, "d");
                player.color = "white";
                player.rotationLock = true;
                set10 = setInterval(() => {
                    BB.diameter++
                    big.removeAll();
                    spawnontop.removeAll();
                    firework.removeAll();
                    redsmall.removeAll();
                    bigblueboy.removeAll();
                    driftingreds.removeAll();
                }, 5)
                setTimeout(() => {
                    BB.remove();
                    clearInterval(set10);
                    setTimeout(() => {
                        candos6 = true;
                    }, 2000)
                }, 5000)
                player.overlaps(BB);
                BB.overlaps(healthdrop);
                BB.overlaps(invincibility);
                candos6 = false;
            }
        }
        if(!keyboard.pressing("shift")){
            if(s1){
                base = 5;
            }
        }

        if((!keyboard.pressing("left")) && (!keyboard.pressing("right"))){
            player.vel.x = 0;
        }
    }
}